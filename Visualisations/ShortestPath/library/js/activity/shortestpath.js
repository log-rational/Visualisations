/**
 * @fileOverview RecursiveInsertionSort - A template for activities that extend the OU.util.Activity class
 *
 * Additional functions that are not defined in this file but are available to all activities:
 * <ul>
 * <li> this.header(h) - changes current H1 and H2 tags, where parameter h is of format: { h1: 'optional H1', h2: 'optional H2' }</li>
 * <li> this.loadCSSFile(f) - loads additional CSS from the file f - which is a file path relative to the activity data folder</li>
 * <li> this.addMessengerParams(paramsArray) - See documentation for Messenger functions in OU.js</li>
 * <li> this.defineActivityAPI(json object) - defines an API for this activity
 * </ul>
 *
 * @author Callum Lester <callum.lester@open.ac.uk>
 */

// Load in any util elements that are required
OU.require('OU.util.Layer');
OU.require('OU.util.InfoButton');

/**
 * @class ShortestPath
 * @extends OU.util.Activity
 * @param {Object} data - Holds the data content for a specific instance of the activity
 * @param {String} instance - (Optional) A unique identifier name for this instance, defaults to 'a1'
 * @param {OU.util.Controller} controller - (Optional) A reference to the controller that initialised this instance, if undefined, the superclass will generate a new controller and create the reference to it as 'this.controller'
 */
OU.activity.ShortestPath = function (data, instance, controller) {
    /**
     * canvasView - this is the function that is first called when the activity is launched,
     *              assuming you are in a browser that supports canvas.
     *
     * Typical tasks for this function are:
     * <ul>
     * <li> Define and initialise and activity wide variables</li>
     * <li> Initialise Layers & Divs</li>
     * <li> Call a loading function</li>
     * <li> Initiating the activity by calling any methods that</li>
     * </ul>
     */
    OU.activity.ShortestPath.prototype.canvasView = function () {
        this.barCount = this.data.barCount; // number of items (bars) to sort
        this.timerPause = this.data.timerPause; // 25 frames per second for timer pause
        this.animationStepsInit = this.data.animationStepsInit; // number of steps to do for swap animation

        this.setAnimationSteps(this.animationStepsInit); // set the number of steps to do for swap animation

        var bH = OU.controlHeight; // bad name copied from another module

        // Most activities should have a background layer
        this.bgLayer = new OU.util.Layer({
            container: this
        });

        // create a layer for the visualisation to be "painted" on
        this.visualisationLayer = new OU.util.Layer({
            container: this, // put it in current container
            id: 'visualisationLayer', // give it a meaningful id
            x: this.w * 0.02, // put it a tenth of the width in
            y: this.h * 0.02 + bH, // put it a tenth of the height down plus control height
            w: this.w * 0.98, // 80% width
            h: this.h * 0.76, // 60% height
            hasEvents: true, // standard event and pinch stuff
            pinch: this.pinch,
            pinchMe: this // remember no comma for last param
        });

        // create a layer for the controls
        this.controlLayer = new OU.util.Layer({
            container: this, // put it in current container
            id: 'controlLayer', // give it a meaningful id
            x: this.w * 0.1, // put it a tenth of the width in
            y: this.visualisationLayer.y + this.visualisationLayer.h, // put it under the visualisation layer
            w: this.visualisationLayer.w, // make it the same width as visualiation
            h: this.h * 0.2, // 20% height
            hasEvents: true, // standard event and pinch stuff
            pinch: this.pinch,
            pinchMe: this
        });

        this.modelLayer = new OU.util.Layer({
            container : this,
            id : 'model-layer',
            x : 0,
            y : 0,
            w : 50,
            h : 60,
            hasEvents : true
        });

        this.controlLayer.context.gradRect(); // use default background

        this.textDiv = new OU.util.Div({ // put in a div for text info
            container: this,
            style: "font-size:100%;"
        });

        this.textDiv.div.innerHTML = "<h2>" + data.description + " (1/" + (data.pageCount) + ")</h2>" + this.data.intro.text; // get student instruction text from data file and put in text div

        this.audioElement = document.createElement('audio'); // create the audio element

        this.initControls();  // initialise the controls
        this.resetAnimation(); // reset the visualisation
        this.initNodeDimensions();
        this.resize(); // resize to put everything in correst place and relative size

        this.playAudio(data.intro.audio);
    };

    OU.activity.ShortestPath.prototype.playAudio = function (audioFile) {
        if (this.audioPlay) {
            this.audioElement.setAttribute('src', this.dataDir + audioFile); // intro audio
            this.audioElement.play(); // play the audio
        }
    };

    // set the number of steps of movement for the animation for swapping bars
    OU.activity.ShortestPath.prototype.setAnimationSteps = function (steps) {
        this.animationSteps = steps; // set the var
        this.initDisplacements(); // calcualate all the animation movement displacements - using cosine for acceleration and deceleration
    };

    // calcualate all the animation movement displacements - using cosine for acceleration and deceleration
    OU.activity.ShortestPath.prototype.initDisplacements = function () {
        var i, inc,
            total = 0; // total displacement is addition of all steps
        // init animation relative displacements with accelerationa and deceleration
        this.displacements = []; // store the displacements

        for (i = 0; i < this.animationSteps; i++) {
            // use a (1 - cos) function over 360' to create the different displacesments for acceleration and deceleration
            inc = 1 - Math.cos(i / this.animationSteps * 2 * Math.PI);
            total += inc; // get the total displacement
            this.displacements[i] = total; // store the displacement
        }
        this.displacements.push(this.animationSteps);
    };

    // initialise the controls - buttons and checkbox on bottom of module
    OU.activity.ShortestPath.prototype.initControls = function () {
        var self = this,
            bH = OU.controlHeight,
            btnSpace = 100 / 4,
            btnWidth = btnSpace * 0.9,
            cssWidth = "width:" + btnWidth + "%;",
            xPad = btnSpace * 0.05,
            btnTop = 91;

        this.backBtn = Utils.newButton(
            xPad + "%",
            btnTop + "%", //left,top
            "Back",
            function () {
                self.back();
            },
            cssWidth, //specific css
            'b', //default a tag, b button, r radio, "c" checkbox
            "backButton" //component id
        );

        this.nextBtn = Utils.newButton(
            (btnSpace + xPad) + "%",
            btnTop + "%", //left,top
            "Next",
            function () {
                self.next();
            },
            cssWidth, //specific css
            'b', //default a tag, b button, r radio, "c" checkbox
            "nextButton"//component id
        );

        this.resetBtn = Utils.newButton( // init the reset button
            (btnSpace * 2 + xPad) + "%",
            btnTop + "%", //left,top
            "Reset",
            function () {
                self.resetAnimation();
            },
            cssWidth, //specific css
            'b', //default a tag, b button, r radio, "c" checkbox
            "resetButton"//component id
        );

        this.audioBtn = Utils.newButton( // init the audio chechbox button
            (btnSpace * 3 + xPad) + "%",
            btnTop + "%", //left,top
            "Audio",
            function () {
                self.toggleAudio();
            },
            cssWidth,
            "c",
            "audioButton"
        );

        this.audioBtn.checked = true;
        this.audioPlay = true; // toggle var to play audio

        this.infoButton = new OU.util.InfoButton({
            layer : this.modelLayer,
            x : 16,
            y : bH - 16,
            w : 32,
            h : 32,
            autoWidth : false,
            padding : 10,
            onClick : function () {
                new OU.util.PopUpInfo({
                    container : self,
                    txt : self.data.help,
                    x : self.w * 0.20,
                    y : self.h * 0.15,
                    w : self.w * 0.6,
                    h : self.h * 0.7
                    /*onClose : function () {
                    }*/
                });
            }
        });
    };

    // reset the animation by going back to the beginning and randomly sorting the items
    OU.activity.ShortestPath.prototype.resetAnimation  = function () {
        this.goingBack = false;
        if (this.highlight) {
            this.nodes[this.highlight].highlight = false;
        }
        this.backList = [];
        this.path = "";
        this.showDistance = false;
        this.backBtn.disable();
        this.nextBtn.enable();
        this.resetBtn.disable();
        this.audioElement.pause(); // stop audio playing
        this.dead = true; // kill animation
        this.sorted = true;
        this.position = 0;
        this.initVisualisation(); // initilise visualisation with random order
        this.textDiv.div.innerHTML = "<h2>" + data.description + " (1/" + (data.pageCount) + ")</h2>" + this.data.intro.text; // get student instruction text from data file and put in text div
        this.setNodeDimensions(this.visualisationLayer.w, this.visualisationLayer.h);
        this.render(); // render the module
    };

    // init the visualisation part
    OU.activity.ShortestPath.prototype.initVisualisation = function () {
        this.nodes = data.nodes;
        this.connections = data.connections;
        this.initNodeDistance();
        this.queue = [];
        this.highlight = "C";
    };

    OU.activity.ShortestPath.prototype.initNodeDistance = function () {
        var key, node;
        for (key in this.nodes) {
            if (this.nodes.hasOwnProperty(key)) {
                node = this.nodes[key];
                node.distance = "∞";
                node.black = false;
                node.grey = false;
            }
        }
    };

    // init the actual pixel count for the base number for heights of bars on screen
    OU.activity.ShortestPath.prototype.initNodeDimensions = function () {
        var h = this.visualisationLayer.h, // get height
            w = this.visualisationLayer.w, // get width
            key,
            node;

        for (key in this.nodes) {  // for each bar from right to left
            if (this.nodes.hasOwnProperty(key)) {
                node = this.nodes[key];
                node.xPos = node.x / 845 * this.visualisationLayer.w;
                node.yPos = node.y / 383 * this.visualisationLayer.h;
            }
        }

        this.setNodeDimensions(w, h);
    };

    OU.activity.ShortestPath.prototype.setNodeDimensions = function (w, h) {
        var pad;

        this.top = h * 0.05; // horizon for reflection - 73% down
        this.bottom = h * 0.60; // horizon for reflection - 73% down
        this.nodeSpace = Math.min(w / 10, h / 6); // the space needed for each bar including padding
        this.nodeSize = Math.min(0.875 * this.nodeSpace, h / 4);
        pad = this.nodeSpace - this.nodeSize;
        this.halfPad = pad / 2; // half the padding width is the padding at each side of the bar
    };

    /**
     * The main renderer.
     */
    OU.activity.ShortestPath.prototype.render = function () {
        this.drawVisualisation();
    };

    OU.activity.ShortestPath.prototype.drawVisualisation = function () {
        var ctx = this.visualisationLayer.context, // get the graphics context
            h = this.visualisationLayer.h, // get height
            w = this.visualisationLayer.w, // get width
            key;

        // Draw background colour
        ctx.fillStyle = this.data.backgroundColour;
        ctx.fillRect(0, 0, w, h);
        // draw highlights

        // draw channel
        this.drawChannel();

        // draw connections
        for (key in this.connections) {  // for each bar from right to left
            if (this.connections.hasOwnProperty(key)) {
                this.drawConnection(key);
            }
        }

        // draw nodes
        var i = 0;

        for (key in data.nodes) {  // for each bar from right to left
            if (data.nodes.hasOwnProperty(key)) {
                this.drawNode(key, i, false);
                i++;
            }
        }

        if (this.animating >= this.animationSteps) { // if done all animating steps
            this.animating = -1; // set to not animating
            this.animatingFinished(); // do all the stuff after animation finishes
        }
        if (this.animating > -1) { // if still animating
            this.animating++; // next animation step
        }
    };

    OU.activity.ShortestPath.prototype.drawChannel = function () {
        var boxWidth = this.nodeSize * 1.3,
			boxHeight = this.nodeSize,
            fullWidth = boxWidth * data.nodeCount,
            ctx = this.visualisationLayer.context, // get the graphics context
            pad = this.nodeSize / 10,
            x1 = (this.visualisationLayer.w - fullWidth) / 2,
            y1 = this.visualisationLayer.h - 2 * pad,
            y2 = y1 - boxHeight,
            i;

        ctx.save(); // drawing and changing context so save last context to restore at end

        ctx.strokeStyle = "#444"; // black outline
        ctx.lineWidth = this.nodeSize / 20;
        // draw the bar above the horizon
        ctx.beginPath(); // to make it all work properly seem to need to open and close path for each element

        for (i = 0; i < data.nodeCount; i++) {
            ctx.rect(x1 + i * boxWidth, y2, boxWidth, boxHeight);
        }

        ctx.stroke(); // draw the outline

        this.drawQueue(ctx, x1, y1, y2, pad, boxWidth);

        ctx.restore(); // restore the context to previous
    };

    OU.activity.ShortestPath.prototype.drawQueue = function (ctx, x1, y1, y2, pad, boxWidth) {
        var i,
            textW,
            letter,
            xOld,
            xNew,
            index,
            node,
            xPos,
            moveStep,
            number,
            fontScale;

        y1 = (y1 + y2) / 2;
        y2 = y1 + 2 * pad;
        x1 = x1 + pad * 2;

        if (this.animating > -1) {
            moveStep = 1 / this.animationSteps * this.displacements[this.animating];
            for (i = 0; i < this.queue.length; i++) {
                ctx.fillStyle = '#000';
                ctx.font = 'bold ' + this.getNodeFontSize() + 'px Arial';

                letter = this.queue[i].substring(0, 1);
                number = this.queue[i].substring(1);
                textW = ctx.measureText(letter).width;

                index = this.queueOld.indexOf(letter);      // find out where the letter was previously in the queue
                if (index !== -1) {
                    xOld = x1 + index * boxWidth;
                } else {
                    node = this.nodes[letter];
                    xOld = node.xPos;
                }
                xNew = x1 + i * boxWidth;

                xPos = xOld + (xNew - xOld) * moveStep;

                ctx.fillText(letter, xPos, y1);
                xPos += textW;
                fontScale = (number === "?") ? 1.5 : 2.5;
                ctx.fillStyle = this.nodes[letter].red ?  '#F00' : '#000';
                ctx.font = 'bold ' + this.getNodeFontSize() / fontScale + 'px Verdana';
                ctx.fillText(number, xPos, y2);
            }

            letter = this.queueOld.substring(0, 1);
            number = this.queueOldNumber;
            if (this.queue.indexOf(letter) === -1) {
                ctx.fillStyle = '#000';
                ctx.font = 'bold ' + this.getNodeFontSize() + 'px Arial';
                textW = ctx.measureText(letter).width;

                xOld = x1;
                xNew = x1 - boxWidth;
                xPos = xOld + (xNew - xOld) * moveStep;

                ctx.globalAlpha = (this.animationSteps - this.animating) / this.animationSteps;
                ctx.fillText(letter, xPos, y1);
                fontScale = (number === "?") ? 1.5 : 2.5;
                ctx.fillStyle = this.nodes[letter].red ?  '#F00' : '#000';
                ctx.font = 'bold ' + this.getNodeFontSize() / fontScale + 'px Verdana';
                ctx.fillText(number, xPos + textW, y2);
                ctx.globalAlpha = 1;
            }
        } else {
            for (i = 0; i < this.queue.length; i++) {
                ctx.fillStyle = '#000';
                ctx.font = 'bold ' + this.getNodeFontSize() + 'px Arial';

                letter = this.queue[i].substring(0, 1);
                number = this.queue[i].substring(1);
                textW = ctx.measureText(letter).width;

                ctx.fillText(letter, x1, y1);
                fontScale = (number === "?") ? 1.5 : 2.5;
                ctx.fillStyle = this.nodes[letter].red ?  '#F00' : '#000';
                ctx.font = 'bold ' + this.getNodeFontSize() / fontScale + 'px Verdana';
                ctx.fillText(number, x1 + textW, y2);
                x1 += boxWidth;
            }
        }
    };

    OU.activity.ShortestPath.prototype.drawNode = function (nodeName, number, glow) {
        var ctx = this.visualisationLayer.context, // get the graphics context
            alpha,
            node = this.nodes[nodeName],
            x = node.xPos,
            y = node.yPos,
            size = this.nodeSize,
            radius,
            distanceFontScale,
            textW,
            textColor,
            border = size / 15;


        radius = size / 2;

        ctx.save(); // drawing and changing context so save last context to restore at end

        ctx.strokeStyle = "#444444"; // black outline
        if (node.black) {
            ctx.fillStyle = "#000"; // get fill color
            textColor = "#FFF";
        } else if (node.grey) {
            ctx.fillStyle = "#aaaaaa"; // get fill color
            textColor = "#000";
        } else {
            ctx.fillStyle = "#FFF"; // get fill color
            textColor = "#000";
        }
        ctx.shadowColor = ctx.fillStyle;


        if (glow) { // if "glow"
            alpha = 1 - Math.cos(2 * Math.PI * this.animating / this.animationSteps); // alpha depends on animation step for increase and decrease glow as cosine
            ctx.shadowColor =  'rgba(255, 225, 0,' + alpha + ')'; // shadow color is gold with the above alpha
            ctx.shadowBlur = size; // for glow the shadow has a blur value which set the how diffuse it is
        }

        // draw the bar above the horizon
        ctx.beginPath(); // to make it all work properly seem to need to open and close path for each element

        ctx.arc(x, y, radius, 0, 2 * Math.PI, false);

        ctx.closePath();
        ctx.fill();  // fill the bar
        ctx.stroke(); // draw the outline

        ctx.fillStyle = textColor;
        ctx.font = 'bold ' + this.getNodeFontSize() + 'px Arial';
        textW = ctx.measureText(nodeName).width / 2;
        ctx.fillText(nodeName, x - textW, y);

        if (this.showDistance) {
            // draw distance number
            ctx.fillStyle = node.red ? '#F00' : '#000';
            distanceFontScale = (node.distance === "?") ? 1.7 : 2.5;
            ctx.font = 'bold ' + this.getNodeFontSize() / distanceFontScale + 'px Verdana';
            textW = ctx.measureText(node.distance).width / 2;
            ctx.fillText(node.distance, x - textW, y + radius * 1.5);
        }

        if (node.highlight) { // draw highlight
            ctx.lineWidth = border / 2;
            ctx.strokeStyle = "#F00"; // red outline
            ctx.shadowColor =  'rgba(255, 0, 0, 1)'; // shadow color is gold with the above alpha
            ctx.shadowBlur = 10; // for glow the shadow has a blur value which set the how diffuse it is

            ctx.beginPath(); // to make it all work properly seem to need to open and close path for each element
            ctx.arc(x, y, radius + border, 0, 2 * Math.PI, false);
            ctx.closePath();
            ctx.stroke(); // draw the outline
        }

        ctx.restore(); // restore the context to previous
    };

    OU.activity.ShortestPath.prototype.drawConnection = function (nodeNames) {
        var ctx = this.visualisationLayer.context, // get the graphics context
            node1 = this.nodes[nodeNames.substring(0, 1)],
            node2 = this.nodes[nodeNames.substring(1, 2)],
            distance = this.connections[nodeNames].toString(),
            x1 = node1.xPos,
            y1 = node1.yPos,
            x2 = node2.xPos,
            y2 = node2.yPos;

        ctx.save(); // drawing and changing context so save last context to restore at end

        ctx.strokeStyle = this.pathContains(nodeNames) ? "#C66" : "#CCC"; // black outline

        ctx.lineWidth = this.nodeSize / 10;
        // draw the bar above the horizon
        ctx.beginPath(); // to make it all work properly seem to need to open and close path for each element

        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);

        ctx.closePath();
        ctx.stroke(); // draw the outline

        ctx.fillStyle = 'blue';
        ctx.font = 'bold ' + (this.getNodeFontSize() / 2) + 'px Arial';
        var w = ctx.measureText(distance).width / 2;
        ctx.fillText(distance, x1 + (x2 - x1) / 2 - w, y1 + (y2 - y1) / 2);

        ctx.restore(); // restore the context to previous
    };

    OU.activity.ShortestPath.prototype.pathContains = function (nodeNames) {
        return this.path.indexOf(nodeNames) !== -1 ||
            this.path.indexOf(nodeNames.substring(1, 2) + nodeNames.substring(0, 1)) !== -1;
    };

    OU.activity.ShortestPath.prototype.getNodeFontSize = function () {
        return Math.min(this.nodeSize * 0.8);
    };

    // caclulate all swaps and then start the replacy of the steps of the algorithm
    OU.activity.ShortestPath.prototype.start = function () {
        this.backBtn.enable();
        this.resetBtn.enable();

        // init all the vars to starting values
        this.setAnimationSteps(this.animationStepsInit);
        this.goFast = this.goFastInit;

        this.compareStep = 0;
        this.stepCount = 0;
        this.animating = -1;

        this.renderCount = 0;
        this.callRenderCount = 0;

        this.pauseCount = 0;
        this.dead = false;
        this.sorted = false;

        this.recordSort(); // record all the sorts to then animate them afterwards

        this.callRenderCount++; // count for the number of times render() is called to stop anomalies
        this.renderLoop();
    };

    // Record the whole sorting part of the visualation to replay afterwards
    // This should improve performance and keeps the sort algorithm as close to the original as possible
    OU.activity.ShortestPath.prototype.recordSort = function () {
        var i, datum, key;
        this.replay = []; // replay information

        for (i = 2; i < data.pageCount; i++) {
            datum = {};
            key = "page" + i;
            datum = data[key];
            datum.key = key;
            datum.pageNumber = i;

            this.replay.push(datum);
        }
    };

    // the timer loop to create a timeline for replay and animation
    OU.activity.ShortestPath.prototype.renderLoop = function () {
        var self = this;
        if (!this.dead) {
            this.drawVisualisation();
            if (this.animating > -1) {
                setTimeout(function () {
                    self.renderLoop(); // set timer for next render
                }, this.timerPause);
            }
        }
    };

    // step through the sort and animate the swaps
    OU.activity.ShortestPath.prototype.step = function () {
        if (this.sorted && this.animating === -1) { // if all sorted or not animiting then stop animation
            this.dead = true;
        }
        // if not animating a swap or just swapped then pause for user to compare items
        if (!this.dead && this.animating === -1) {
            this.replaySort(); // replay the sorting step
            this.drawVisualisation(); // redraw the bars
        }
        if (this.animating > 0) {
            this.renderLoop();
        }
    };

    // Replay the recorded sort step by step
    OU.activity.ShortestPath.prototype.replaySort = function () {
        var replay,
            key,
            letter,
            number,
            node,
            nodeDist,
            action,
            i;

        this.checkPause = 10;
        this.audioToPlay = false;

        if (!this.dead && this.replay.length > 0) { // if not finished and not last step
            replay = this.replay.shift(); // get the step to replay's information

            action = replay.action;

            this.showDistance = replay.key !== "page2";

            for (key in this.nodes) {
                if (this.nodes.hasOwnProperty(key)) {
                    node = this.nodes[key];
                    node.highlight = action.highlight.indexOf(key) !== -1;
                    if (node.highlight) {
                        this.highlight = key;
                    }
                    node.black = action.black.indexOf(key) !== -1;
                    node.grey = action.grey.indexOf(key) !== -1;
                    node.red = action.red.indexOf(key) !== -1;
                }
            }

            for (i = 0; i < action.distance.length; i++) {
                nodeDist = action.distance[i];
                letter = nodeDist.substring(0, 1);
                number = nodeDist.substring(1);
                this.nodes[letter].distance = number;
            }
            this.queueOld = "";
            for (i = 0; i < this.queue.length; i++) {
                if (i == 0) {
                    this.queueOldNumber = this.queue[i].substring(1);
                }
                this.queueOld += this.queue[i].substring(0,1);
            }
            this.queue = action.queue;
            this.queueNew = "";
            for (i = 0; i < this.queue.length; i++) {
                this.queueNew += this.queue[i].substring(0,1);
            }
            this.path = action.path;
            if (!this.goingBack) {
                if (this.queueNew !== this.queueOld && this.queueOld !== "") {
                    this.animating = 0;
                }
            }

            this.playIt(replay.text, replay.audio, replay.pageNumber);
            this.backList.push(replay);
            this.stepCount++; // next step
        } else { // must be all sorted
            this.sorted = true; // set flag
            this.nextBtn.disable();
            this.playIt(data.sorted.text, data.sorted.audio, data.pageCount);
        }

        if (this.audioPlay && this.audioToPlay) { // audio checkbox selected
            this.audioElement.play(); // play the audio
        }
    };

    OU.activity.ShortestPath.prototype.playIt = function (text, audio, pageNumber) {
        this.audioElement.setAttribute('src', this.dataDir + audio); // set the is sorted audio to no
        this.textDiv.div.innerHTML = "<h2>" + data.description + " (" + pageNumber + "/" + (data.pageCount) + ")</h2>" + text;
        this.audioToPlay = true;
    };

    // speed up button clicked
    OU.activity.ShortestPath.prototype.next = function () {
        if (this.dead) {
            this.start();
        }
        if (!this.sorted) { // only speed up if not finished
            this.checkPause = 0; // no pausing for more speed
            this.audioElement.pause();
            this.pauseCount = 0; // set pauseCount to zero to end any pause
            this.step();
        }
    };

    OU.activity.ShortestPath.prototype.back = function () {
        if (this.backList.length > 1) {
            if (! this.sorted) {
                this.replay.unshift(this.backList.pop());
            }
            this.replay.unshift(this.backList.pop());
            this.sorted = false;
            this.dead = false;
            this.nextBtn.enable();
            this.goingBack = true;
            this.next();
            this.goingBack = false;
        } else {
            this.resetAnimation();
        }
    };

    // called when animation is finished
    OU.activity.ShortestPath.prototype.animatingFinished = function () {

    };

    // audio checkbox clicked
    OU.activity.ShortestPath.prototype.toggleAudio = function () {
        this.audioPlay = !this.audioPlay; // toggle audio flag
        if (!this.audioPlay) { // if switched off
            this.audioElement.pause(); // pause the audio to stop playing
            if (this.pauseCount > 0) {
                this.pauseCount = 0; // set pauseCount to zero to end any pause
            }

        }
    };

    /**
     * accessibleView - this function is called instead of canvasView if the browser does not support HTML5 canvas
     */
    OU.activity.ShortestPath.prototype.accessibleView = function () {
        OU.activity.ShortestPath.superClass_.accessibleView.call(this); // call the superclass method is you want to extend it, remove this line to override the method instead

    // Note this function can be removed or commented out if you want to use the default accessibleView method

    // *Your code starts here*
    };

    /**
     * resize - called whenever the outer bounds of the activity change, ie when the browser window is resized, or a mobile device is rotated.
     *
     * This function should do the following:
     * <ul>
     * <li>Resize all visible elements</li>
     * <li>Re-layout all visible elements</li>
     * <li>Actually re-render the current view of the activity</li>
     * </ul>
     */
    OU.activity.ShortestPath.prototype.resize = function () {
        OU.activity.ShortestPath.superClass_.resize.call(this); // call the superclass resize

        document.body.style.fontSize = parseInt(window.innerHeight / 38, 10) + "px";

        var controlctx = this.controlLayer.context, // get the graphics context
            xPad = this.w * 0.02, // padding space between controls
            useWidth = this.w - 2 * xPad, // total usable width when padding removed
            controlHeight = this.h * 0.1, // control panel is 10% of height
            yPad = controlHeight * 0.2, // 2% y padding
            textHeight = controlHeight * 2.5, // height of the text area at top
            // useable height for visualisation layer after conrols, textarea and padding subtracted
            useHeight = this.h - controlHeight - textHeight - 2 * yPad;

        this.bgLayer.resize(); // resize the background
        if (this.data.backgroundColour !== undefined) { // if a background color is defined
            this.bgLayer.context.gradRect({ // paint a gradient rectanglke
                col1: this.data.backgroundColour, // start color
                col2: this.data.backgroundColour  // end color - both just the background color for one color
            }); // use specified background colour
        } else {
            this.bgLayer.context.gradRect(); // otherwise use default background
        }

        controlctx.font = OU.theme.font; // set the font for the controls
        controlctx.lineWidth = 2; // outline width
        controlctx.strokeStyle = '#c00'; // outline color
        controlctx.fillStyle = '#c00'; // fill color
        controlctx.textAlign = 'center'; // alignment of text

        // resize the control layer
        this.controlLayer.resize({
            x: xPad, // leave padding at left
            y: this.h - controlHeight, // bottom - control panel height ie at bottom
            w: useWidth, // width after padding removed
            h: controlHeight // height
        });

        // color the control layer
        if (this.data.panelColour !== undefined) {
            controlctx.gradRect({
                col1: this.data.panelColour,
                col2: this.data.panelColour
            }); // use specified background colour
        } else {
            controlctx.gradRect(); // use default background
        }
        // resize the text area
        this.textDiv.resize({
            x: xPad + 40,
            y: yPad,
            w: useWidth - 40,
            h: textHeight
        });
        // resize visualisation layer
        this.visualisationLayer.resize({
            x: xPad,
            y: this.textDiv.y + this.textDiv.h + yPad, // under text and padding
            w: useWidth,
            h: useHeight
        });

        this.initNodeDimensions();

        if (this.action === "begin") {
            this.setNodeDimensions(this.w / 2, this.h / 2);
        }

        // render whole thing
        this.render();
    };

    OU.activity.ShortestPath.prototype.playAudio = function (audioFile) {
        if (this.audioPlay) {
            this.audioElement.setAttribute('src', this.dataDir + audioFile); // intro audio
            this.audioElement.play(); // play the audio
        }
    };

    OU.activity.ShortestPath.prototype.getFontSize = function () {
        return parseInt(Math.min(window.innerHeight / 40, window.innerWidth / 60), 10);
    };

    /**
     * remove - called when the activity is being removed by a controller.
     *
     * This function should do the following:
     * <ul>
     * <li> Remove any elements that may remain in memory</li>
     * <li> Stop any animation loops, including killing any Intervals </li>
     * </ul>
     * You do not need to remove most library elements, such as Layers, Divs, etc. as they are removed automatically
     */
    OU.activity.ShortestPath.prototype.remove = function () {
        OU.activity.ShortestPath.superClass_.remove.call(this); // call the superclass remove
        // *Your removal code here*
        // If you have nothing to remove, then this function can be deleted or commented out
        this.dead = true;
    };

    // call the superclass's constructor
    OU.base(this, data, instance, controller);
};

// Call our inherits function to implement the class inheritance
OU.inherits(OU.activity.ShortestPath, OU.util.Activity);