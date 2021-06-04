/**
 * @fileOverview Knapsack
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
 * @class Knapsack - A template for activities that extend the OU.util.Activity class
 * @extends OU.util.Activity
 * @param {Object} data - Holds the data content for a specific instance of the activity
 * @param {String} instance - (Optional) A unique identifier name for this instance, defaults to 'a1'
 * @param {OU.util.Controller} controller - (Optional) A reference to the controller that initialised this instance, if undefined, the superclass will generate a new controller and create the reference to it as 'this.controller'
 */
OU.activity.Knapsack = function (data, instance, controller) {
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
    OU.activity.Knapsack.prototype.canvasView = function () {
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
        // get student instruction text from data file and put in text div
        this.textDiv.div.innerHTML = "<div class='headingCount'>" + data.description + " (1/" +
                                        (data.pageCount) + ")</div>" + this.data.intro.text;

        this.audioElement = document.createElement('audio'); // create the audio element

        this.initControls();  // initialise the controls
        this.resetAnimation(); // reset the visualisation
        this.resize(); // resize to put everything in correst place and relative size
        this.resetAnimation(); // reset the visualisation

        this.playAudio(data.intro.audio);
    };

    OU.activity.Knapsack.prototype.playAudio = function (audioFile) {
        if (this.audioPlay) {
            this.audioElement.setAttribute('src', this.dataDir + audioFile); // intro audio
            this.audioElement.play(); // play the audio
        }
    };

    // set the number of steps of movement for the animation for swapping bars
    OU.activity.Knapsack.prototype.setAnimationSteps = function (steps) {
        this.animationSteps = steps; // set the var
        this.initDisplacements(); // calcualate all the animation movement displacements - using cosine for acceleration and deceleration
    };

    // calcualate all the animation movement displacements - using cosine for acceleration and deceleration
    OU.activity.Knapsack.prototype.initDisplacements = function () {
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
    OU.activity.Knapsack.prototype.initControls = function () {
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
    OU.activity.Knapsack.prototype.resetAnimation  = function () {
        this.lastArrow = ["", ""];
        this.lastHighlight = "";
        this.goingBack = false;
        this.highlightValue = null;
        this.action = data.page2.action;
        this.values = ["", "", "", "", "", "", ""];
        this.backList = [];
        this.backBtn.disable();
        this.nextBtn.enable();
        this.resetBtn.disable();
        this.audioElement.pause(); // stop audio playing
        this.dead = true; // kill animation
        this.sorted = true;
        this.position = 0;
        // get student instruction text from data file and put in text div
        this.textDiv.div.innerHTML = "<div class='headingCount'>" + data.description + " (1/" +
                                        (data.pageCount) + ")</div>" + this.data.intro.text;
        this.setNodeDimensions();
        this.render(); // render the module
    };

    OU.activity.Knapsack.prototype.setNodeDimensions = function () {
        var pad,
            h = this.visualisationLayer.h, // get height
            w = this.visualisationLayer.w; // get width

        this.top = h * 0.05; // horizon for reflection - 73% down
        this.bottom = h * 0.60; // horizon for reflection - 73% down
        this.nodeSpace = Math.min(w / 10, h / 8); // the space needed for each bar including padding
        this.nodeSize = Math.min(this.nodeSpace, h / 4);
        pad = this.nodeSpace - this.nodeSize;
        this.halfPad = pad / 2; // half the padding width is the padding at each side of the bar
    };

    /**
     * The main renderer.
     */
    OU.activity.Knapsack.prototype.render = function () {
        this.drawVisualisation();
    };

    OU.activity.Knapsack.prototype.drawVisualisation = function () {
        var ctx = this.visualisationLayer.context, // get the graphics context
            h = this.visualisationLayer.h, // get height
            w = this.visualisationLayer.w; // get width

        // Draw background colour
        ctx.fillStyle = this.data.backgroundColour;
        ctx.fillRect(0, 0, w, h);
        // draw highlights

        // draw weights/value table
        this.drawJewelTable();
        this.drawWeightValueTable();


        if (this.animating >= this.animationSteps) { // if done all animating steps
            this.animating = -1; // set to not animating
            this.animatingFinished(); // do all the stuff after animation finishes
        }
        if (this.animating > -1) { // if still animating
            this.animating++; // next animation step
        }
    };

    OU.activity.Knapsack.prototype.drawWeightValueTable = function () {
        var boxWidth = this.nodeSize,
            boxHeight = this.nodeSize / 2,
            ctx = this.visualisationLayer.context, // get the graphics context
            xLeft = (this.visualisationLayer.w - boxWidth * 10) / 2,
            x1 = xLeft,
            y1 = boxHeight * 4,
            y2 = y1 + boxHeight,
            y3 = y2 + boxHeight * 3.5,
            i,
            text,
            valueText,
            gemText,
            foreground,
            background,
            textColor,
            highlight,
            xHighlight,
            yHighlight,
            gemHighlight;

        ctx.save(); // drawing and changing context so save last context to restore at end

        foreground = data.tableColors.foreground;
        textColor = data.tableColors.text;

        ctx.lineWidth = this.nodeSize / 30;
        // draw the bar above the horizon
        ctx.font = 'bold ' + this.getNodeFontSize() * 0.4 + 'px Arial';

        highlight = null;
        var xHighlightOld = null;
        for (i = 0; i < data.weightLabels.length; i++) {  // for each bar from right to left
            if (i === 0) {
                boxWidth = this.nodeSize * 3;
                background = data.tableColors.backgroundLeft;
                text = data.weightLabels[i] + " (" + data.weightUnit + ")";
                valueText = data.valueLabel + " (" + data.currency + ")";
                gemText = data.gemLabel;
            } else {
                boxWidth = this.nodeSize;
                background = data.tableColors.background;
                valueText = this.getValue(i);
                gemText = this.getGem(i);
                text = data.weightLabels[i];
            }

            this.drawTextBox(ctx, valueText, x1, y2, boxWidth, boxHeight, foreground, background,
                             textColor, null);
            if (this.lastHighlight.substring(0, 1) === "" + (i - 1)) {
                xHighlightOld = x1;
            }
            if (this.action.highlight.substring(0, 1) === "" + (i - 1)) {
                highlight =  data.highlight;
                xHighlight = x1;
                yHighlight = y1;
            }
            this.drawTextBox(ctx, text, x1, y1, boxWidth, boxHeight, foreground, background,
                             textColor, null);

            gemHighlight = null;
            if (gemText === 'r') {
                gemText = 'R';
                gemHighlight = data.highlight;
            }

            if (gemText === 'R' || gemText === 'S' || gemText === 'D') {
                background = data.gems[data.gemLetters[gemText]].color;
            }
            this.drawTextBox(ctx, gemText, x1, y3, boxWidth, boxHeight, foreground, background, textColor, gemHighlight);

            x1 += boxWidth;
        }

        if (xHighlightOld !== null && this.animating > -1) {
                var moveStep = 1 / this.animationSteps * this.displacements[Math.min(this.animationSteps, this.animating * 4)];
                xHighlight = xHighlightOld + (xHighlight - xHighlightOld) * moveStep;
        }

        this.drawHighlight(ctx, xHighlight, yHighlight, boxWidth, boxHeight, highlight);
        this.drawArrows(ctx, xLeft + boxWidth * 3, y1, boxWidth, boxHeight);

        ctx.restore(); // restore the context to previous
    };

    OU.activity.Knapsack.prototype.drawArrows = function (ctx, x, y, boxWidth, boxHeight) {
        var i,
            arrow = this.action.arrow[0],
            fadeIn = arrow !== this.lastArrow[0];

        if (arrow.length > 3) {
            for (i = 0; i < arrow.length / 2; i++) {
                var subArrow = arrow.substring(i * 2, i * 2 + 2);
                this.drawArrow(ctx, subArrow, x, y, boxWidth, boxHeight, true, fadeIn);
            }
        } else {
            this.drawArrow(ctx, arrow, x, y, boxWidth, boxHeight, true, fadeIn);
        }

        arrow = this.action.arrow[1];
        fadeIn = arrow !== this.lastArrow[1];
        this.drawArrow(ctx, arrow, x, y, boxWidth, boxHeight, false, fadeIn);
    };

    OU.activity.Knapsack.prototype.drawArrow = function (ctx, arrow, x, y, boxWidth, boxHeight, over, fadeIn) {
        var x1,
            x2,
            box1,
            box2,
            controlX,
            controlY,
            arrowY,
            direction,
            text,
            textW,
            textY,
            head = boxWidth / 10;

        if (arrow !== "") {
            box1 = parseInt(arrow.substring(0, 1));
            box2 = parseInt(arrow.substring(1));
            x1 = parseFloat(x + box1 * boxWidth + boxWidth / 2);
            x2 = parseFloat(x + box2 * boxWidth + boxWidth / 2);

            // direction of arrow depends on order of ends
            direction = box2 > box1 ? -1 : 1;

            // quadradic curve control point is halfway between ends
            controlX = (x1 + x2) / 2;
            // do arrow over or under, the control point y coord is twice the distance abover or below
            if (over) {
                controlY = y - 3.2 * boxHeight;
                arrowY = y - 1.6 * boxHeight;
            } else {
                y += 2 * boxHeight;
                controlY = y + 1.6 * boxHeight;
                arrowY = y + 0.8 * boxHeight;
            }

            if (this.animating > -1 && fadeIn) {
                ctx.globalAlpha = this.animating / this.animationSteps;
            }

            ctx.fillStyle = data.arrowColor;
            ctx.strokeStyle = data.arrowColor;

            ctx.beginPath();

            // draw curved line
            ctx.moveTo(x1, y);
            ctx.quadraticCurveTo(controlX, controlY, x2, y);

            // draw arrow bits
            ctx.moveTo(controlX, arrowY);
            ctx.lineTo(controlX + head * direction, arrowY - head);
            ctx.moveTo(controlX, arrowY);
            ctx.lineTo(controlX + head * direction, arrowY + head);

            ctx.stroke();

            if (over) {
                text = (box2 - box1) + data.weightUnit;
                textY = (arrowY + y) / 2;
            } else {
                text = data.currency + this.values[box1] + " + " + data.currency + this.highlightValue  ;
                textY = controlY;
            }
            textW = ctx.measureText(text).width / 2;
            ctx.fillText(text, controlX - textW, textY);

            ctx.globalAlpha = 1;
        }
    };

    OU.activity.Knapsack.prototype.getValue = function (i) {
        var value = "";
        i--;
        if (this.action.value.length > i) {
            value = this.action.value.substring(i, i+1);
            this.values[i] = value;
        }
        return value;
    };

    OU.activity.Knapsack.prototype.getGem = function (i) {
        var gem = "";
        i--;
        if (this.action.value.length > i) {
            gem = this.action.gem.substring(i, i+1);
        }
        return gem;
    };

    OU.activity.Knapsack.prototype.drawJewelTable = function () {
        var boxWidth = this.nodeSize,
            boxWidth2 = this.nodeSize * 2,
            boxWidth3 = this.nodeSize * 3,
            boxHeight = this.nodeSize / 2,
            ctx = this.visualisationLayer.context, // get the graphics context
            xLeft = (this.visualisationLayer.w - boxWidth * 10) / 2,
            yTop = boxHeight * 11,
            x,
            y,
            i,
            key,
            text,
            foreground,
            background,
            textColor,
            highlight,
            yHighlight = null;

        ctx.save(); // drawing and changing context so save last context to restore at end

        ctx.lineWidth = this.nodeSize / 30;
        ctx.font = 'bold ' + this.getNodeFontSize() * 0.4 + 'px Arial';
        ctx.strokeStyle = data.gemHeadingColors.background;


        // headings
        x = xLeft;
        y = yTop;
        foreground = data.gemHeadingColors.background;
        background = data.gemHeadingColors.background;
        textColor = data.gemHeadingColors.foreground;

        // do a cell for each heading
        for (i = 0; i < data.gemHeadings.length; i ++) {
            // wider box for first column
            boxWidth = (i === 0) ? boxWidth3 : boxWidth2;
            text = data.gemHeadings[i];
            this.drawTextBox(ctx, text, x, y, boxWidth, boxHeight, foreground, background, textColor);

            x += boxWidth;
        }

        y += boxHeight;

        // border and text colors all the same
        foreground = data.gemHeadingColors.background;
        textColor = data.gemHeadingColors.background;

        var yHighlightOld = -1;

        this.highlightValue = null;
        // draw a row for each jewel with name, weight and value
        for (key in data.gems) {
            // different background color for each gem
            background = data.gems[key].color;

            // jewel name
            x = xLeft;
            text = key;
            this.drawTextBox(ctx, text, x, y, boxWidth3, boxHeight, foreground, background, textColor, null);

            // jewel weight
            highlight = null; ///(this.action.highlight.substring(2, 3) === key.substring(0, 1)) ? data.cellHighlight : null;
            x += boxWidth3;
            text = data.gems[key].weight + data.weightUnit;
            this.drawTextBox(ctx, text, x, y, boxWidth2, boxHeight, foreground, background, textColor, highlight);

            // jewel value
            x += boxWidth2;
            text = data.currency + data.gems[key].value;

            this.drawTextBox(ctx, text, x, y, boxWidth2, boxHeight, foreground, background, textColor);

            if (this.lastHighlight.substring(1, 2) === key.substring(0, 1)) {
                yHighlightOld = y;
            }

            highlight = (this.action.highlight.substring(1, 2) === key.substring(0, 1)) ? data.rowHighlight : null;
            if (highlight !== null) {
                this.highlightValue = data.gems[key].value;
                yHighlight = y;
            }

            // next row
            y += boxHeight;
        }
        if (yHighlight !== null) {
            if (yHighlightOld !== -1 && this.animating > -1) {
                var moveStep = 1 / this.animationSteps *
                    this.displacements[Math.min(this.animationSteps, this.animating * 2)];
                yHighlight = yHighlightOld + (yHighlight - yHighlightOld) * moveStep;
            }
            this.drawHighlight(ctx, xLeft - boxWidth / 16, yHighlight, boxWidth3 + boxWidth2 +
                boxWidth2 + boxWidth / 8, boxHeight, data.highlight);
        }

        ctx.restore(); // restore the context to previous
    };

    OU.activity.Knapsack.prototype.drawTextBox = function (ctx, text, x, y, boxWidth, boxHeight,
                                                     foreground, background, textColor, highlight) {
        var textW = ctx.measureText(text).width / 2;

        ctx.beginPath();
        ctx.strokeStyle = foreground;
        ctx.fillStyle = (highlight != null && highlight !== data.highlight) ? highlight : background;
        ctx.fillRect(x, y, boxWidth, boxHeight);
        ctx.rect(x, y, boxWidth, boxHeight);

        ctx.fillStyle = textColor;
        ctx.fillText(text, x + boxWidth / 2 - textW, y + boxHeight / 2);
        ctx.closePath();
        ctx.stroke();

        if (highlight === data.highlight) {
            this.drawHighlight(ctx, x, y, boxWidth, boxHeight, highlight);
        }
    };

    OU.activity.Knapsack.prototype.drawHighlight = function (ctx, x, y, boxWidth, boxHeight, highlight) {
        var xPad = parseFloat(ctx.lineWidth),
            yPad;

        ctx.save();
        if (highlight !== null) {
            ctx.lineWidth *= 2;
            yPad = parseFloat(ctx.lineWidth);
            ctx.strokeStyle = highlight;
            ctx.beginPath();
            ctx.rect(x + xPad * 2, y - yPad, boxWidth - 4 * xPad, boxHeight + yPad * 2);
            ctx.closePath();
            ctx.stroke();
        }
        ctx.restore();
    };

    OU.activity.Knapsack.prototype.getXPos = function (x) {
        return x / 845 * this.visualisationLayer.w;
    };

    OU.activity.Knapsack.prototype.getYPos = function (y) {
        return y / 383 * this.visualisationLayer.h;
    };

    OU.activity.Knapsack.prototype.getNodeFontSize = function () {
        return Math.min(this.nodeSize * 0.8);
    };

    // caclulate all swaps and then start the replacy of the steps of the algorithm
    OU.activity.Knapsack.prototype.start = function () {
        this.backBtn.enable();
        this.resetBtn.enable();

        // init all the vars to starting values
        this.setAnimationSteps(this.animationStepsInit);

        this.compareStep = 0;
        this.stepCount = 0;
        this.animating = -1;

        this.dead = false;
        this.sorted = false;

        this.recordSearch(); // record all the sorts to then animate them afterwards
        this.drawVisualisation();
    };

    // Record the whole sorting part of the visualation to replay afterwards
    // This should improve performance and keeps the sort algorithm as close to the original as possible
    OU.activity.Knapsack.prototype.recordSearch = function () {
        var i,
            datum,
            key;

        this.replayList = []; // replay information

        for (i = 2; i < data.pageCount; i++) {
            datum = {};
            key = "page" + i;
            datum = data[key];
            datum.key = key;
            datum.pageNumber = i;

            this.replayList.push(datum);
        }
    };

    // the timer loop to create a timeline for replay and animation
    OU.activity.Knapsack.prototype.renderLoop = function () {
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
    OU.activity.Knapsack.prototype.step = function () {
        if (this.sorted && this.animating === -1) { // if all sorted or not animiting then stop animation
            this.dead = true;
        }
        // if not animating a swap or just swapped then pause for user to compare items
        if (!this.dead && this.animating === -1) {
            this.replaySearch(); // replay the sorting step
            this.drawVisualisation(); // redraw the bars
        }
        if (this.animating > 0) {
           this.renderLoop();
        }
    };

    // Replay the recorded sort step by step
    OU.activity.Knapsack.prototype.replaySearch = function () {
        var replay;

        this.checkPause = 10;
        this.audioToPlay = false;

        if (!this.dead && this.replayList.length > 0) { // if not finished and not last step
            replay = this.replayList.shift(); // get the step to replay's information
            this.replay = replay;
            this.action = replay.action;
            if (replay.action2) {
                this.action2 = replay.action2;
                this.actionNumber = 2;
            } else {
                this.action2 = null;
            }
            this.doAction();
            this.playIt(replay.text, replay.audio, replay.pageNumber);
            this.backList.push(replay);
            this.stepCount++; // next step
        } else { // must be all sorted
            this.action = data.sorted.action;
            this.sorted = true; // set flag
            this.nextBtn.disable();
            this.playIt(data.sorted.text, data.sorted.audio, data.pageCount);
        }

        if (this.audioPlay && this.audioToPlay) { // audio checkbox selected
            this.audioElement.play(); // play the audio
        }
    };

    // called when animation is finished
    OU.activity.Knapsack.prototype.animatingFinished = function () {
        this.lastArrow = this.action.arrow;
        this.lastHighlight = this.action.highlight;
        if (this.action2) {
            this.action = this.action2;
            this.actionNumber++;
            if (this.replay["action" + this.actionNumber]) {
                this.action2 = this.replay["action" + this.actionNumber];
            } else {
                this.action2 = null;
            }
            this.doAction();
        }
    };

    OU.activity.Knapsack.prototype.doAction = function () {
        if (this.action.arrow[0] !== this.lastArrow[0] || this.action.arrow[1] !== this.lastArrow[1] ||
            this.action.highlight !== this.lastHighlight || this.action2) {
            this.animating = 0;
        } else {
            this.drawVisualisation();
        }
    };

    OU.activity.Knapsack.prototype.playIt = function (text, audio, pageNumber) {
        if (this.audioPlay) {
            this.audioElement.setAttribute('src', this.dataDir + audio); // set the is sorted audio to no
        }
        this.textDiv.div.innerHTML = "<div class='headingCount'>" + data.description + " (" +
                                        pageNumber + "/" + (data.pageCount) + ")</div>" + text;
        this.audioToPlay = true;
    };

    // speed up button clicked
    OU.activity.Knapsack.prototype.next = function () {
        if (this.dead) {
            this.start();
        }
        if (!this.sorted) { // only speed up if not finished
            this.animating = -1;
            this.action2 = null;
            this.checkPause = 0; // no pausing for more speed
            this.animatingFinished();
            this.audioElement.pause();
            this.step();
        }
    };

    OU.activity.Knapsack.prototype.back = function () {
        if (this.backList.length > 1) {
            if (! this.sorted) {
                this.replayList.unshift(this.backList.pop());
            }
            this.lastHighlight = "";
            this.replayList.unshift(this.backList.pop());
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

    // audio checkbox clicked
    OU.activity.Knapsack.prototype.toggleAudio = function () {
        this.audioPlay = !this.audioPlay; // toggle audio flag
        if (!this.audioPlay) { // if switched off
            this.audioElement.pause(); // pause the audio to stop playing
        }
    };

    /**
     * accessibleView - this function is called instead of canvasView if the browser does not support HTML5 canvas
     */
    OU.activity.Knapsack.prototype.accessibleView = function () {
        OU.activity.Knapsack.superClass_.accessibleView.call(this); // call the superclass method is you want to extend it, remove this line to override the method instead

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
    OU.activity.Knapsack.prototype.resize = function () {
        OU.activity.Knapsack.superClass_.resize.call(this); // call the superclass resize

        document.body.style.fontSize = parseInt(window.innerHeight / 42, 10) + "px";

        var controlctx = this.controlLayer.context, // get the graphics context
            xPad = this.w * 0.02, // padding space between controls
            useWidth = this.w - 2 * xPad, // total usable width when padding removed
            controlHeight = this.h * 0.1, // control panel is 10% of height
            yPad = controlHeight * 0.2, // 2% y padding
            textHeight = controlHeight * 2.3, // height of the text area at top
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

        this.setNodeDimensions();
        // render whole thing
        this.render();
    };

    OU.activity.Knapsack.prototype.playAudio = function (audioFile) {
        if (this.audioPlay) {
            this.audioElement.setAttribute('src', this.dataDir + audioFile); // intro audio
            this.audioElement.play(); // play the audio
        }
    };

    OU.activity.Knapsack.prototype.getFontSize = function () {
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
    OU.activity.Knapsack.prototype.remove = function () {
        OU.activity.Knapsack.superClass_.remove.call(this); // call the superclass remove
        // *Your removal code here*
        // If you have nothing to remove, then this function can be deleted or commented out
        this.dead = true;
    };

    // call the superclass's constructor
    OU.base(this, data, instance, controller);
};

// Call our inherits function to implement the class inheritance
OU.inherits(OU.activity.Knapsack, OU.util.Activity);