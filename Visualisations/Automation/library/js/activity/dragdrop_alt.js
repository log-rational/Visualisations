/**
 * @fileOverview DragDrop - Drag and drop onto defined areas on a background graphic
 * @params {JSON array} data Data as included in the data/data.js file
 * @author Greg Black
 */

// Load in any util elements that are required
OU.require('OU.util.Div');
OU.require('OU.util.ImageLoader');
OU.require('OU.util.Layer');

//constants for key codes
KEY_LEFT=37;
KEY_UP=38;
KEY_RIGHT=39;
KEY_DOWN=40;

/**
 * @class DragDrop - An activity implementing drag and drop onto a background graphic
 * @extends OU.util.Activity
 * @param {Object} data - Holds the data content for a specific instance of the activity
 * @param {String|undefined} instance - A unique identifier name for this instance, defaults to 'a1'
 * @param {Controller Object|undefined} controller - A reference to the controller that initialised this instance, if undefined, the superclass will generate a new controller and create the reference to it as 'this.controller'
 */
OU.activity.DragDrop = function(data, instance, controller) {
   
    OU.activity.DragDrop.prototype.canvasView =  function() {
        var bH = OU.controlHeight, self = this, i;

        this.doRender = true;
        this.bgLayer = new OU.util.Layer({
            container:this
        });
        this.bgLayer.context.gradRect();
        this.itemsLayer = new OU.util.Layer({
            container:this,
            hasEvents:true
        });
        this.controlLayer = new OU.util.Layer({
            x:0,///this.w-bH*5,
            y:this.h - bH,
            w:this.controller.w,
            h:bH,
            container:this,
            hasEvents:true
        });
        this.dragboxes = [];
        //load the images for the background and the dragboxes
        this.images = {};
        this.images.dragboxes = [];
        this.images.background = {
            img:this.data.background
        };
        if(this.data.answer!=undefined){
            this.images.answer = {
                img:this.data.answer
            };
        }
        for(i=0;i<this.data.dragboxes.length; i++){
            this.images.dragboxes[i] = {
                img:this.data.dragboxes[i].img
            };
        }
        this.imageLoader = new OU.util.ImageLoader({
            container:this,
            data:this.images,
            progressWindow:{
                y:-500 //get progress window off screen to avoid ugly flicker (see redmine #5324)
            },
            onLoad:function () {
                self.start();
                self.started = true;
            }
        });
        this.textDiv = new OU.util.Div({
            x:this.w*.025,
            y:this.h*.025,
            w:this.w*0.85,
            h:this.h*.1,
            container:this
        });
        this.textDiv.div.innerHTML = this.data.instructions;
        this.response = [];
        this.renderLoop();
    };
    /**
     * Initialise components, also called when Redo button is pressed.
     */
    OU.activity.DragDrop.prototype.start = function () {
        var self= this, bH = OU.controlHeight, i;
        this.feedbackLevel = 0;
        this.end = false;
        if(this.doneButton) this.doneButton.remove();
        if(this.redoButton) this.redoButton.remove();
        this.doneButton = new OU.util.Button({
            txt:"Check your answer",
            x:this.controller.w * 0.15,
            y:0,
            w:this.controller.w * 0.3,
            h:bH,
            layer:this.controlLayer,
            onClick:function () {
                self.feedback();
            }
        });
        this.revealButton = new OU.util.Button({
            txt:"Reveal answer",
            x:this.controller.w * 0.45,
            y:0,
            w:this.controller.w * 0.2,
            h:bH,
            layer:this.controlLayer,
            onClick:function () {
                self.renderAnswer();
            }
        });
        this.redoButton = new OU.util.Button({
            txt:"Reset",
            x:this.controller.w * 0.65,
            y:0,
            w:this.controller.w * 0.2,
            h:bH,
            layer:this.controlLayer,
            onClick:function () {
                self.start();
            }
        });

        this.dropboxes = [];
        var drop;
        for(i = this.data.dropboxes.length; i--;){
            drop = this.data.dropboxes[i];
            this.dropboxes.push(drop);
        }
        this.initScale();
        for(i = this.dragboxes.length; i--;){
            this.dragboxes[i].remove();
        }

        this.dragboxes = [];
        for(i = this.data.dragboxes.length; i--;){
            this.dragboxes[i] = new this.DraggableItem({
                parent:this,
                xStart:this.data.dragboxes[i].x,                 //origin of dragBox relative to unscaled background image
                yStart:this.data.dragboxes[i].y,
                x:this.offsetx + this.data.dragboxes[i].x * this.scale,
                y:this.offsety + this.data.dragboxes[i].y * this.scale,
                w:this.data.dragboxes[i].w,
                h:this.data.dragboxes[i].h,
                name:this.data.dragboxes[i].name,
                image:this.images.dragboxes[i].image,
                caption:this.data.dragboxes[i].label
            });
        }
        this.resize();
    }
    /**
     * Scale and position the background image and the dropboxes.
     */
    OU.activity.DragDrop.prototype.initScale = function () {
        var i, dd, d, bg = this.images.background.image,
        fitW = this.w / bg.width,
        fitH = this.h / bg.height,
        s = (fitW < fitH ? fitW : fitH),
        x = this.w*.05,
        y = this.h*.05;       
        s*=0.9;        
        this.scale = s;
        this.offsetx = x;
        this.offsety = y;
        if(this.end && this.data.answer!=undefined) bg = this.images.answer.image;
        this.bgLayer.context.drawImage(bg, x, y, bg.width * s, bg.height * s);
        if(this.data._doneResize===undefined){
            this.data._doneResize = true;
            for(i = this.dropboxes.length; i--;){ //scale dropbox dimensions to background
                d = this.dropboxes[i];
                d._x = d.x;
                d._y = d.y;
                d._w = d.w;
                d._h = d.h;
                d.c = '#0f0';
            }
        }
        for(i = this.dropboxes.length; i--;){ //scale dropbox dimensions to background
            d = this.dropboxes[i];
            d.x = x + d._x * s;
            d.y = y + d._y * s;
            d.w = d._w * s;
            d.h = d._h * s;
        //debug:draw green outlines to check dims of dropboxes
        //this.bgLayer.context.strokeStyle=d.c;
        //this.bgLayer.context.strokeRect(d.x,d.y,d.w,d.h);
        }
    };
    /**
     * The main renderer.
     */
    OU.activity.DragDrop.prototype.render = function() {
        if (!this.started){
            return;
        }
        var i;
        this.itemsLayer.clear();
        for(i=this.dragboxes.length; i--;){
            var drag = this.dragboxes[i];
            drag.inbox = false;
            var x,y;
            if(drag.draggable.dragId==0 && !drag.hasFocus){
                for(var j=this.dropboxes.length; j--;){
                    if(!this.dropboxes[j].occupied && this.collide(drag,this.dropboxes[j])){
                        x=this.dropboxes[j].x;
                        y=this.dropboxes[j].y;
                        drag.current = this.dropboxes[i];
                        drag.move(x,y);
                    }
                }
            }
        }
        for(i=this.dropboxes.length; i--;){
            this.dropboxes[i].occupied = false;
            for(j=this.dragboxes.length; j--;){
                if(Math.abs(this.dragboxes[j].x-this.dropboxes[i].x)<1
                    && Math.abs(this.dragboxes[j].y-this.dropboxes[i].y)<1){
                    this.dropboxes[i].occupied = true;
                }
            }
        }
        if(!this.dragging&&this.mouseUp){
            for(i=this.dragboxes.length; i--;){
                drag = this.dragboxes[i];
                for(j=this.dropboxes.length; j--;){
                    if(!this.dropboxes[j].occupied && this.collide(drag,this.dropboxes[j])&& !drag.hasFocus){
                        x=this.dropboxes[j].x;
                        y=this.dropboxes[j].y;
                        drag.move(x,y);
                    }
                }
            }
            for(i=this.dragboxes.length; i--;){
                drag = this.dragboxes[i];
                for(j=this.dropboxes.length; j--;){
                    if(this.collide(drag,this.dropboxes[j])){
                        drag.inbox=true;
                    }
                }
                if(!this.dragboxes[i].inbox){  // not in a box so return to starting position
                    x = this.offsetx + this.dragboxes[i].xStart * this.scale;
                    y = this.offsety + this.dragboxes[i].yStart * this.scale;
                    this.dragboxes[i].move(x,y);
                }
            }
            this.mouseUp = false;
        }
        for(i=this.data.dragboxes.length; i--;){
            this.dragboxes[i].render();    
        }

        this.doRender=false;
    };
    /**
     * Function to detect overlap between two objects (in this case dragboxes and dropboxes).
     */
    OU.activity.DragDrop.prototype.collide = function ( a, b ) {
        var ArX = a.x + a.w,
        AbY = a.y + a.h,
        BrX = b.x + b.w,
        BbY = b.y + b.h,
        collide = true;
        if (a.x > BrX)
            collide = false;
        if (ArX < b.x)
            collide = false;
        if (a.y > BbY)
            collide = false;
        if (AbY < b.y)
            collide = false;
        return collide;
    };
    /**
     * Render loop which calls main render function if doRender=true.
     */  
    OU.activity.DragDrop.prototype.renderLoop = function() {       
        var self = this;        
        if (this.doRender) this.render();
        setTimeout(function () {
            self.renderLoop();
        }, 40);
    };
    /**
     * Resize function.
     */
    OU.activity.DragDrop.prototype.resize = function() {
        OU.activity.DragDrop.superClass_.resize.call(this); // call the superclass resize
        if(!this.started){
            return;
        }
        var bH = OU.controlHeight;//, bg = this.images.background.image;
        this.bgLayer.resize();
        this.itemsLayer.resize();
        this.controlLayer.resize();
        if(this.data.preload===true){
            this.controlLayer.resize({
                x:0,
                y:this.h - bH,
                w:this.controller.w,
                h:bH
            });
            this.doneButton.resize({
                x:this.controller.w * 0.15,
                y:0,
                w:this.controller.w * 0.3,
                h:bH
            });
            this.revealButton.resize({
                x:this.controller.w * 0.45,
                y:0,
                w:this.controller.w * 0.2,
                h:bH
            });
            this.redoButton.resize({
                x:this.controller.w * 0.65,
                y:0,
                w:this.controller.w * 0.2,
                h:bH
            });

            this.doneButton.render();
            this.revealButton.render();
            this.redoButton.render();
        }
        var oldScale = this.scale;
        var oldOffsetx = this.offsetx;
        var oldOffsety = this.offsety;
        this.initScale();
        for(var i = this.dragboxes.length; i--;){ // scale dragbox dimensions to background
            var g = this.dragboxes[i];
            g._y = (g.y-oldOffsety)/oldScale;
            g._x = (g.x-oldOffsetx)/oldScale;
            g.y = this.offsety + g._y * this.scale; 
            g.w = this.dropboxes[0].w; 
            g.h = this.dropboxes[0].h; 
            g.x = this.offsetx + g._x * this.scale; 
            g.render();
        }
        this.textDiv.resize({
            x:this.w*.025,
            y:this.h*.025,
            w:this.w*0.85,
            h:this.h*.1
        });
        this.doRender = true;
    };
    /**
     * Remove function to clean up memory if necessary. Can be commented out if nothing to remove.
     */
    OU.activity.DragDrop.prototype.remove = function() {
        OU.activity.DragDrop.superClass_.remove.call(this); // call the superclass remove
        this.doRender = false;
        var i;
        for(i=this.dragboxes.length; i--;){
            this.dragboxes[i].remove();//=undefined;
        }
        for(i=this.dropboxes.length; i--;){
            this.dropboxes[i].remove();//=undefined;
        }
    };
    /**
     * Function to check answer and display feedback.
     */
    OU.activity.DragDrop.prototype.feedback = function () {
        var rsp='', h = '', i, j, idx, dX, dY, dW, dH, fA = this.data.feedbackArea,
        bCorrect=false, bSpecific=false, ev = this.itemsLayer.events;
        if(this.end || this.feedbackVisible){
            return;
        }
        this.feedbackVisible = true;
        this.feedbackLevel++;
        if(this.end || this.feedbackLevel>=this.data.maxAttempts){
          this.end = true;
          this.itemsLayer.events.clickable=[];
        }
        for(i=this.dropboxes.length; i--;){
            this.response[i]="empty";
            this.dropboxes[i].occupied = false;
            for(j=this.dragboxes.length; j--;){
                if(Math.abs(this.dragboxes[j].x-this.dropboxes[i].x)<1
                    && Math.abs(this.dragboxes[j].y-this.dropboxes[i].y)<1){
                    this.dropboxes[i].occupied = true;
                    this.response[i]=this.dragboxes[j].name;
                }
            }
        }
        for(i=this.dropboxes.length; i--;){
            rsp+=this.response[i]+(i>0?",":"");
        }
        for(i=this.data.correctAnswers.length; i--;){
            if(rsp==this.data.correctAnswers[i].ans){
                bCorrect = true;
                this.end = true;
                this.itemsLayer.events.clickable=[];
            }
        }
        h+= "<p>Your answer is "+(this.feedbackLevel>1&&!bCorrect?"still ":"")+(bCorrect?"":"in")+"correct.</p><p>";
        if(this.end&&!bCorrect){
            h+=this.data.finalFeedback+'</p>';
            this.renderAnswer();
        }
        else{
            if(!bCorrect){
                if(this.data.specificIncorrectAnswers){
                    for(i=this.data.specificIncorrectAnswers.length; i--;){
                        if(rsp==this.data.specificIncorrectAnswers[i].ans){
                            idx = this.data.specificIncorrectAnswers[i].fbid
                            h+=this.data.specificFeedbacks[idx]+'</p><p>';
                            bSpecific = true;
                        }
                    }
                }
                if(!bSpecific && this.feedbackLevel>=2){
                    h+=this.data.generalFeedback+'</p><p>';
                }
            }
            else if(bCorrect){
                h+=this.data.correctFeedback+'</p><p>';
                //this.renderAnswer();
            }
        }
        h+="</p>";
        if (fA!==undefined) {
            dX = fA.x * this.w;
            dY = fA.y * this.h;
            dW = fA.w * this.w;
            dH = fA.h * this.h;
        }
        else {
            dX = 0.1 * this.w;
            dY = 0.1 * this.h;
            dW = 0.8 * this.w;
            dH = 0.8 * this.h;
        }
        ev.flush();
        if(this.feedbackBox) this.feedbackBox.remove();
        this.feedbackBox = new OU.util.PopUpInfo({
            container:this,
            txt:h,
            x:dX,
            y:dY,
            w:dW,
            h:dH,
            onClose:this.feedbackVisible = false
        });
    };
    /**
     * Function to render answer image.
     */
    OU.activity.DragDrop.prototype.renderAnswer = function () {
        var i;
        this.dropboxes = [];
        var drop;
        for(i = this.data.dropboxes.length; i--;){
            drop = this.data.dropboxes[i];
            this.dropboxes.push(drop);
        }
        this.initScale();
        for(i = this.data.dragboxes.length; i--;){
            this.dragboxes[i].remove();
        }
        //this.dragboxes = [];
        for(i = this.data.dragboxes.length; i--;){
            this.dragboxes[i] = new this.DraggableItem({
                parent:this,
                xStart:this.data.dragboxes[i].x,                 //origin of dragBox relative to unscaled background image
                yStart:this.data.dragboxes[i].y,
                x:this.offsetx + this.data.dragboxes[i].x * this.scale,
                y:this.offsety + this.data.dragboxes[i].y * this.scale,
                w:this.data.dragboxes[i].w,
                h:this.data.dragboxes[i].h,
                name:this.data.dragboxes[i].name,
                image:this.images.dragboxes[i].image,
                caption:this.data.dragboxes[i].label
            });
            this.dragboxes[i].disable();
        }
        for(i=this.data.showCorrect.length; i--;){
            if(this.data.showCorrect[i]!=99){
                this.dragboxes[this.data.showCorrect[i]].x = this.dropboxes[i].x;
                this.dragboxes[this.data.showCorrect[i]].y = this.dropboxes[i].y;
            }
            this.doRender = true;
        }

        this.resize();
    };
    /**
     * Dragbox class.
     */
    OU.activity.DragDrop.prototype.DraggableItem = function (dragParams) {
        this.x = dragParams.x;
        this.y = dragParams.y;
        this.w = dragParams.w;
        this.h = dragParams.h;
        this.xStart = dragParams.xStart;
        this.yStart = dragParams.yStart;
        this.name = dragParams.name;
        this.caption = dragParams.caption;
        this.parent = dragParams.parent;
        this.image = dragParams.image;
        if(this.image!==undefined){
            this.w = this.image.width * this.parent.scale;
            this.h = this.image.height * this.parent.scale;
        }
        /**
         * Dragbox render function.
         */
        OU.activity.DragDrop.prototype.DraggableItem.prototype.render = function() {
            var ctx = this.parent.itemsLayer.context,bg,
            //sF = (this.draggable.dragId!=0 ? 1.4 : 1),//make bigger while dragging
            x = this.x, //- (this.w * (sF - 1) / 2),
            y = this.y, //- (this.h * (sF - 1) / 2),
            w = this.w, //* sF,
            h = this.h; //* sF;
            if(this.image!==undefined){
                ctx.drawImage(this.image, x, y, w, h);
            }
            if(this.hasFocus){
                ctx.lineWidth = 3;
                ctx.strokeStyle = '#cc0000';
                ctx.strokeRect(this.x,this.y,this.w,this.h);
            }
            this.draggable.x = x;
            this.draggable.y = y;
            this.draggable.w = w;
            this.draggable.h = h;
        };
        OU.activity.DragDrop.prototype.DraggableItem.prototype.enable = function () {
            this.draggable.disabled=false;
        };
        OU.activity.DragDrop.prototype.DraggableItem.prototype.disable = function () {
            this.draggable.disabled=true;
        };
        /**
         * Called when dragbox gets focus.
         */
        OU.activity.DragDrop.prototype.DraggableItem.prototype.focus = function () {
            if(this.draggable.disabled){
                return false;
            }
            this.hasFocus = true;
            this.render();
            this.parent.render();
            return false;
        };
        /**
         * Called when dragbox loses focus.
         */
        OU.activity.DragDrop.prototype.DraggableItem.prototype.blur = function () {
            if(this.draggable.disabled){
                return false;
            }
            this.hasFocus = false;
            this.render();
            this.parent.render();
            return false;
        };
        /**
         * Called when arrow key is pressed.
         */
        OU.activity.DragDrop.prototype.DraggableItem.prototype.arrowKey = function (k) {
            if(this.draggable.disabled){
                return false;
            }
            switch(k){
                case KEY_UP:
                    this.move(this.x,this.y-10);
                    break;
                case KEY_DOWN:
                    this.move(this.x,this.y+10);
                    break;
                case KEY_LEFT:
                    this.move(this.x-10,this.y);
                    break;
                case KEY_RIGHT:
                    this.move(this.x+10,this.y);
                    break;
            }
            //this.dragging = true;
            this.parent.doRender=true;
        };
        /**
         * Called when dragging starts.
         */
        OU.activity.DragDrop.prototype.DraggableItem.prototype.startDrag = function ( p ) {
            p.me.parent.dragboxes.sort(function ( a, b ) {
                return b.draggable.dragId - a.draggable.dragId;
            });
            this.inbox = false;
            p.me.parent.dragging = true;
            p.me.parent.doRender = true;
        };
        /**
         * Called when dragging ends.
         */
        OU.activity.DragDrop.prototype.DraggableItem.prototype.endDrag = function ( p ) {
            p.me.parent.dragging = false;
            p.me.parent.mouseUp = true;
            p.me.parent.doRender = true;
        };
        /**
         * Called when the separate draggable object moves.
         */
        OU.activity.DragDrop.prototype.DraggableItem.prototype.newPos = function ( p ) {
            p.me.x = p.x;
            p.me.y = p.y;
            p.me.parent.doRender = true;
        };
        /**
         * Move the dragbox to a given x,y position.
         */
        OU.activity.DragDrop.prototype.DraggableItem.prototype.move = function ( x, y ) {
            this.x = x;
            this.y = y;
            this.draggable.x = x;
            this.draggable.y = y;
        };
        /**
         * Create a draggable object on top of the dragbox to actually make it draggable.
         */
        this.draggable = new OU.util.Draggable({
            "me":this,
            "events":this.parent.itemsLayer.events,
            "x":this.x,
            "y":this.y,
            "h":this.h,
            "w":this.w,
            "onStart":this.startDrag,
            "onEnd":this.endDrag,
            "onMove":this.newPos
        });
        this.parent.itemsLayer.events.clickable.push(this.draggable);
        OU.base(this, dragParams);
    };
    OU.inherits(OU.activity.DragDrop.prototype.DraggableItem, OU.util.Tabbable);
    
    //call the superclass's constructor
    OU.base(this,data,instance,controller);
};
//call our inherits function to implement the class inheritance
OU.inherits(OU.activity.DragDrop,OU.util.Activity);