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
 * @class RecursiveInsertionSort - A template for activities that extend the OU.util.Activity class
 * @extends OU.util.Activity
 * @param {Object} data - Holds the data content for a specific instance of the activity
 * @param {String} instance - (Optional) A unique identifier name for this instance, defaults to 'a1'
 * @param {OU.util.Controller} controller - (Optional) A reference to the controller that initialised this instance, if undefined, the superclass will generate a new controller and create the reference to it as 'this.controller'
 */
OU.activity.MergeSort = function (data, instance, controller) {
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
    OU.activity.MergeSort.prototype.canvasView = function () {
        this.paused = false; // paused flag to pause or resume animation and stop current audio

        this.barCount = this.data.barCount; // number of items (bars) to sort
        this.timerPause = this.data.timerPause; // 25 frames per second for timer pause
        this.checkPauseMute = this.data.checkPauseMute; // pause for each comparison when no audio
        this.hueStart = this.data.hueStart; // color of left hand bar
        this.hueEnd = this.data.hueEnd; // color of right hand bar
        this.goFastInit = this.data.goFastInit; // large number for when to speed up animation
        this.animationStepsInit = this.data.animationStepsInit; // number of steps to do for swap animation
        this.speedSteps = this.data.speedSteps; // number of steps for animation when speed up clicked - less for faster

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
        this.textDiv.div.innerHTML = this.data.intro.text; // get student instruction text from data file and put in text div

        this.codeDiv = new OU.util.Div({ // put in a div for text info
            container: this.visualisationLayer
        });
        this.codeDiv.div.innerHTML = data.code;

        this.leftDiv = this.getLabelDiv("left");
        this.rightDiv = this.getLabelDiv("right");
        this.listDiv = this.getLabelDiv("list");

        this.audioElement = document.createElement('audio'); // create the audio element

        this.initControls();  // initialise the controls
        this.resetAnimation(); // reset the visualisation
        this.initBoxDimensions();
        this.resize(); // resize to put everything in correst place and relative size

        this.playAudio(data.intro.audio);
    };

    OU.activity.MergeSort.prototype.getLabelDiv = function (which) {
        var div = new OU.util.Div({ // put in a div for text info
            container: this.visualisationLayer,
            style: "font-size:100%;font-weight:bold;text-align:center;margin-top:1em;"
        });

        div.div.style.background  = '#fff';
        div.div.innerHTML = data.label[which];
        return div;
    };

    OU.activity.MergeSort.prototype.playAudio = function (audioFile) {
        if (this.audioPlay) {
            this.audioElement.setAttribute('src', this.dataDir + audioFile); // intro audio
            this.audioElement.play(); // play the audio
        }
    };

    // set the number of steps of movement for the animation for swapping bars
    OU.activity.MergeSort.prototype.setAnimationSteps = function (steps) {
        this.animationSteps = steps; // set the var
        this.initDisplacements(); // calcualate all the animation movement displacements - using cosine for acceleration and deceleration
    };

    // calcualate all the animation movement displacements - using cosine for acceleration and deceleration
    OU.activity.MergeSort.prototype.initDisplacements = function () {
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
        this.displacements.push(this.animationSteps);  // last one is full distance - better this way to avoid rounding errors
    };

    // initialise the controls - buttons and checkbox on bottom of module
    OU.activity.MergeSort.prototype.initControls = function () {
		var self = this,
			bH = OU.controlHeight,
			btnSpace = 100 / 5,
			btnWidth = btnSpace * 0.9,
			cssWidth = "width:" + btnWidth + "%;",
			xPad = btnSpace * 0.05,
			btnTop = 91;

        this.sortBtn = Utils.newButton( // init sort button
            xPad + "%",
            btnTop + "%", //left,top
            "Merge",
            function () {
                self.start();
            },
            cssWidth, //specific css
            'b', //default a tag, b button, r radio, "c" checkbox
            "sortButton" //component id
        );

        this.pauseBtn = Utils.newButton(
            (btnSpace + xPad) + "%",
            btnTop + "%", //left,top
            "Pause",
            function () {
                self.pause();
            },
            cssWidth, //specific css
            'b', //default a tag, b button, r radio, "c" checkbox
            "pauseButton"//component id
        );

        this.fastBtn = Utils.newButton( // init the speed up button
            (btnSpace * 2 + xPad) + "%",
            btnTop + "%", //left,top
            "Fast",
            function () {
                self.speedUp();
            },
            cssWidth,//specific css
            'b', //default a tag, b button, r radio, "c" checkbox
            "fastButton"//component id
        );

        this.resetBtn = Utils.newButton( // init the reset button
            (btnSpace * 3 + xPad) + "%",
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
            (btnSpace * 4 + xPad) + "%",
            (btnTop) + "%", //left,top
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
                    h : self.h * 0.7,
                    onClose : function () {
                    }
                });
            }
        });
    };

    OU.activity.MergeSort.prototype.togglePause = function () {
        this.paused = !this.paused; // toggle pause flag
        this.pauseBtn.value = this.paused ? "Resume" : "Pause";
    };

    // Pause/Resume the animation and change the Pause button text to Resume/Pause
    OU.activity.MergeSort.prototype.pause = function () {
        this.togglePause();
        if (this.audioPlay) { // if switched off
            if (this.paused) { // if paused
                this.audioElement.pause(); // pause the audio to stop playing
            } else {
                this.audioElement.play(); // restart the audio
            }
        }
    };

    // reset the animation by going back to the beginning and randomly sorting the items
    OU.activity.MergeSort.prototype.resetAnimation = function () {
        this.sortBtn.enable();
        this.pauseBtn.disable();
        this.fastBtn.disable();
        this.fastBtn.value = "Fast";
        if (this.paused) {
            this.togglePause();
        }
        this.audioElement.pause(); // stop audio playing
        this.dead = true; // kill animation
        this.sorted = true;
        this.position = 0;
        this.initVisualisation(); // initilise visualisation with random order
        this.textDiv.div.innerHTML = this.data.intro.text; // re post the intructions
        this.codeDiv.div.style.display = "none";
        this.setBoxDimensions(this.visualisationLayer.w, this.visualisationLayer.h);
        this.labelsResize();
        this.render(); // render the module
    };

    // init the visualisation part
    OU.activity.MergeSort.prototype.initVisualisation = function () {
        this.getValidRandomSet();
        this.list = [-1, -1, -1, -1, -1, -1];
        this.leftHi = -1;
        this.rightHi = -1;
        this.initColors(); // init the bars
    };

    OU.activity.MergeSort.prototype.getValidRandomSet = function () {
        do {
            this.getRandomSet();
        } while (this.leftHalf[data.listLength / 2 - 1] < this.rightHalf[0]
                || this.rightHalf[data.listLength / 2 - 1] < this.leftHalf[0]);
    };

    OU.activity.MergeSort.prototype.getRandomSet = function () {
		var i, numbers, random, number,
			listLength = data.listLength,
			numberSetSize = data.numberSetSize;

        numbers = [];
        this.leftHalf = [];
        this.rightHalf = [];

        for (i = 1; i <= numberSetSize; i++) {
            numbers.push(i);
        }
        for (i = 0; i < listLength; i++) {
            random = Math.floor(Math.random() * numbers.length);
            number = numbers.splice(random, 1);
            if (i % 2 === 0) {
                this.leftHalf.push(number);
            } else {
                this.rightHalf.push(number);
			}
        }
        this.leftHalf.sort();
        this.rightHalf.sort();
    };

    // init the actual pixel count for the base number for heights of bars on screen
    OU.activity.MergeSort.prototype.initBoxDimensions = function () {
        var h = this.visualisationLayer.h, // get height
			w = this.visualisationLayer.w; // get width
        this.setBoxDimensions(w, h);
    };

    OU.activity.MergeSort.prototype.setBoxDimensions = function (w, h) {
        this.top = h * 0.05; // horizon for reflection - 73% down
        this.bottom = h * 0.60; // horizon for reflection - 73% down
        this.boxSpace = w / (this.data.listLength + 4); // the space needed for each bar including padding
        this.boxSize = Math.min(0.875 * this.boxSpace, h / 4);
        var pad = this.boxSpace - this.boxSize;
        this.halfPad = pad / 2; // half the padding width is the padding at each side of the bar
    };

    // initialise the visual bars whcih are sorted into order
    OU.activity.MergeSort.prototype.initColors = function () {
        var colorCount = data.numberSetSize,
			hue1 = this.hueStart, // paint bars with colours through the rainbow so start at red
			hue2 = this.hueEnd, // and work through to blue
			hueInc = (hue2 - hue1) / colorCount, // increment through the spectrum divided by the number of bars
			i,
			hue;

        this.colors = [0]; // holds the info for all the bars
        for (i = 0; i < colorCount; i++) {  // for all the bars
            hue = (hue1 + hueInc * i); // calc the bar's colour
            this.colors.push(this.getRGB(hue, 1, 1)); // change hue to rgb and assign to bar
        }
    };

    // initialise the gradients which show the reflection of the bars
    // this needs to be done when reseting or resizing
    OU.activity.MergeSort.prototype.initBarGradients = function () {
        var ctx = this.visualisationLayer.context, // get graphics context
			pos;

        for (pos = 0; pos < this.barCount; pos++) {  // for each position left to right
            // Create Linear Gradients for each bar for reflections
            this.bars[pos].gradFill = ctx.createLinearGradient(0, this.horizon, 0, this.horizon +
										this.bars[pos].height * 0.4 * this.barHeightUnit);
            this.bars[pos].gradFill.addColorStop(0, this.bars[pos].color.replace("1)", "0.3)")); // change to 0.3 alpha for 30% transparency at top as reflection is always weaker
            this.bars[pos].gradFill.addColorStop(0.9, this.bars[pos].color.replace("1)", "0)")); // to fade to invisible replace with 0 alpha near bottom

            this.bars[pos].gradStroke = ctx.createLinearGradient(0, this.horizon, 0, this.horizon +
											this.bars[pos].height * 0.4 * this.barHeightUnit); // do the same with black outline
            this.bars[pos].gradStroke.addColorStop(0, 'rgba(0,0,0,0.3)');
            this.bars[pos].gradStroke.addColorStop(0.9, 'rgba(0,0,0,0)');
        }
    };

    // return RGB value string from HSV numbers
    // ported from here:
    //http://www.cs.rit.edu/~ncs/color/t_convert.html 
    OU.activity.MergeSort.prototype.getRGB = function (h, s, v) {
        var r, g, b, i, f, p, q, t;

	    if (s === 0) {
		    r = g = b = v;
		    return "rgba(" + (Math.round(r * 255)) + "," +
							 (Math.round(g * 255)) + "," +
							 (Math.round(b * 255) + ", 1)");
	    }

	    h /= 60;
	    i = Math.floor(h);
	    f = h - i;
	    p = v * (1 - s);
	    q = v * (1 - s * f);
	    t = v * (1 - s * (1 - f));

	    switch (i) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        default:        // case 5:
            r = v;
            g = p;
            b = q;
            break;
	    }

	    return "rgba(" + (Math.round(r * 255)) + "," +
						 (Math.round(g * 255)) + "," +
						 (Math.round(b * 255) + ", 1)"); // return rgb as string with 1 alpha
    };

    /**
     * The main renderer.
     */
    OU.activity.MergeSort.prototype.render = function () {
        this.drawVisualisation();
    };

    // draw the bars, reflections and arrows
    OU.activity.MergeSort.prototype.drawVisualisation = function () {
        var ctx = this.visualisationLayer.context, // get the graphics context
			h = this.visualisationLayer.h, // get height
			w = this.visualisationLayer.w, // get width
			newW,
			newH,
			codeX,
			boxCount = this.list.length - 1, // the number of bars to draw
			position,
			i,
			index,
			box,
			positionStart,
			positionStop,
			x,
			y;

        if (this.action === "shrink") {
            if (this.animating > -1 && !this.sorted) { // if anmating and not all sorted
                newW = w - (w / this.animationSteps * this.displacements[this.animating] / 2);
                newH = h - (h / this.animationSteps * this.displacements[this.animating] / 2);
                this.setBoxDimensions(newW, newH);
                this.labelsResize();

                codeX = w * 1.3 - w * 0.8 / this.animationSteps * this.displacements[this.animating];
                this.codeDiv.resize({
                    x: codeX
                });

            }
        }
        if (this.action === "unshrink") {
            if (this.animating > -1 && !this.sorted) { // if anmating and not all sorted
                newW = w / 2 + (w / this.animationSteps * this.displacements[this.animating] / 2);
                newH = h / 2 + (h / this.animationSteps * this.displacements[this.animating] / 2);
                this.setBoxDimensions(newW, newH);
                this.labelsResize();
                codeX = w * 0.5 + w * 0.8 / this.animationSteps * this.displacements[this.animating];
                this.codeDiv.resize({
                    x: codeX
                });
            }
        }
        // Draw background colour
        ctx.fillStyle = this.data.backgroundColour;
        ctx.fillRect(0, 0, w, h);
        // draw highlights

        if (this.leftHi > -1) {
            position = this.getPosition("left", this.leftHi);
            this.drawHighlight(position, this.which === "left" && this.action.substring(0, 4) === "move");
        }
        if (this.rightHi > -1) {
            position = this.getPosition("right", this.rightHi);
            this.drawHighlight(position, this.which === "right" && this.action.substring(0, 4) === "move");
        }
        // draw boxes
        for (i = boxCount; i >= 0; i--) {  // for each bar from right to left
            if (i < this.leftHalf.length) {
                position = this.getPosition("left", i);
                this.drawBox(this.leftHalf[i], position, false);
            }
            if (i < this.rightHalf.length) {
                position = this.getPosition("right", i);
                this.drawBox(this.rightHalf[i], position, false);
            }
            position = this.getPosition("list", i);
            this.drawBox(this.list[i], position, this.action === "sorted");
        }

        // draw moving boxes
        if (this.animating > -1 && !this.sorted) { // if anmating and not all sorted
            index = this.state[this.which];
            box = this.which === "left" ? this.leftHalf[index] : this.rightHalf[index];
            positionStart = this.getPosition(this.which, index);
            positionStop = this.getPosition("list", this.state.list);
            x = positionStart.x + (positionStop.x - positionStart.x) / this.animationSteps * this.displacements[this.animating];
            y = positionStart.y + (positionStop.y - positionStart.y) / this.animationSteps * this.displacements[this.animating];
            position = {"x": x, "y": y};
            this.drawBox(box, position);
        }

        if (this.animating >= this.animationSteps) { // if done all animating steps
            this.animating = -1; // set to not animating
            this.animatingFinished(); // do all the stuff after animation finishes
        }
        if (this.animating > -1) { // if still animating
            this.animating++; // next animation step
        }
    };

    // draw individual bar
    OU.activity.MergeSort.prototype.getPosition = function (whichList, index) {
        var boxSpace = this.boxSpace,
			halfPad = this.halfPad,
			x,
			y;

        switch (whichList) {
		case "left":
			y = this.top;
			x = boxSpace * (index + 1.2);
			break;
		case "right":
			y = this.top;
			x = boxSpace * (index + 2.8 + this.leftHalf.length);
			break;
		case "list":
			y = this.bottom;
			x = boxSpace * (index + 2) + halfPad;
			break;
        }
        return {"x": x, "y": y};
    };

    OU.activity.MergeSort.prototype.drawBox = function (number, position, glow) {
        var ctx = this.visualisationLayer.context, // get the graphics context
			x = position.x,
			y = position.y,
			size = this.boxSize,
			alpha;

        ctx.save(); // drawing and changing context so save last context to restore at end

        ctx.strokeStyle = "#000"; // black outline
        ctx.fillStyle = this.colors[number]; // get fill color

        if (glow) { // if "glow"
            alpha = 1 - Math.cos(2 * Math.PI * this.animating / this.animationSteps); // alpha depends on animation step for increase and decrease glow as cosine
            ctx.shadowColor =  'rgba(255, 225, 0,' + alpha + ')'; // shadow color is gold with the above alpha
            ctx.shadowBlur = size; // for glow the shadow has a blur value which set the how diffuse it is
        } else {
            ctx.shadowColor =  this.colors[number]; // else no glow
		}

        // draw the bar above the horizon
        ctx.beginPath(); // to make it all work properly seem to need to open and close path for each element

        ctx.roundRect(x, y, size, size, size / 15); // draw the bar rectangle in the path

        ctx.closePath();
        ctx.globalAlpha = 0.3;
        ctx.fill();  // fill the bar
        ctx.globalAlpha = 1;
        ctx.stroke(); // draw the outline

        if (number !== -1) {
            ctx.fillStyle = 'black';
            ctx.font = 'bold ' + this.getBoxFontSize() + 'px Arial';
            ctx.fillText(number, x + size * 0.3, y + size / 2);
        }

        ctx.restore(); // restore the context to previous
    };

    OU.activity.MergeSort.prototype.drawHighlight = function (position, glow) {
        var ctx = this.visualisationLayer.context, // get the graphics context
			x = position.x,
			y = position.y,
			size = this.boxSize,
			border = size / 15;

        size += 2 * border;
        x -= border;
        y -= border;

        ctx.save(); // drawing and changing context so save last context to restore at end
        ctx.lineWidth = border / 2;
        ctx.strokeStyle = "#F00"; // black outline

        if (glow) {
            ctx.shadowColor =  'rgba(255, 0, 0, 1)'; // shadow color is gold with the above alpha
            ctx.shadowBlur = 15; // for glow the shadow has a blur value which set the how diffuse it is
        }
        // draw the bar above the horizon
        ctx.beginPath(); // to make it all work properly seem to need to open and close path for each element

        ctx.roundRect(x, y, size, size, size / 15); // draw the bar rectangle in the path

        ctx.closePath();
        ctx.fill();
        ctx.stroke(); // draw the outline

        ctx.restore(); // restore the context to previous
    };

    OU.activity.MergeSort.prototype.getBoxFontSize = function () {
        return Math.min(this.boxSize * 0.8);
    };

    // caclulate all swaps and then start the replacy of the steps of the algorithm
    OU.activity.MergeSort.prototype.start = function () {
        this.sortBtn.disable();
        this.pauseBtn.enable();
        this.fastBtn.enable();
        if (this.paused) {
            this.togglePauseBtn();
        }

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
        this.renderLoop(); // animate all the sort steps
    };

    // Record the whole sorting part of the visualation to replay afterwards
    // This should improve performance and keeps the sort algorithm as close to the original as possible
    OU.activity.MergeSort.prototype.recordSort = function () {

        this.replay = []; // replay information

        this.mergeSort(this.leftHalf, this.rightHalf);
    };

    OU.activity.MergeSort.prototype.mergeSort = function (leftHalf, rightHalf) {
        var list = [],
			i = 0,
			j = 0,
			k = 0;

        this.replay.push({"action": "shrink", "state": {"left": -1, "right": -1, "list": k}});
        this.replay.push({"action": "begin", "state": {"left": i, "right": j, "list": k}});
        this.replay.push({"action": "unshrink", "state": {"left": i, "right": j, "list": k}});
        ////this.replay.push({"action": "start", "state": {"left": i, "right": j, "list": k}});

        while (i < leftHalf.length && j < rightHalf.length) {
            if (leftHalf[i] < rightHalf[j]) {
                list[k] = leftHalf[i];
                this.replay.push({"action": "move", "which": "left", "state": {"left": i, "right": j, "list": k}});
                i++;
                this.replay.push({"action": "continue", "which": "left", "state": {"left": i, "right": j, "list": k}});
            } else {
                list[k] = rightHalf[j];
                this.replay.push({"action": "move", "which": "right", "state": {"left": i, "right": j, "list": k}});
                j++;
                this.replay.push({"action": "continue", "which": "right", "state": {"left": i, "right": j, "list": k}});
            }
            k++;
        }

        while (i < leftHalf.length) {
            list[k] = leftHalf[i];
            this.replay.push({"action": "move_rest", "which": "left", "state": {"left": i, "right": j, "list": k}});
            i++;
            this.replay.push({"action": "continue", "which": "left", "state": {"left": i, "right": j, "list": k}});
            k++;
        }

        while (j < rightHalf.length) {
            list[k] = rightHalf[j];
            this.replay.push({"action": "move_rest", "which": "right", "state": {"left": i, "right": j, "list": k}});
            j++;
            this.replay.push({"action": "continue", "which": "right", "state": {"left": i, "right": j, "list": k}});
            k++;
        }
    };

/*    OU.activity.MergeSort.prototype.mergeSort = function (list) {
        var length = list.length;
        if (length > 1) {
            var mid = length / 2;
            var leftHalf = list.splice(0, mid);
            var rightHalf = list.splice(0, length);
            leftHalf = this.mergeSort(leftHalf);
            rightHalf = this.mergeSort(rightHalf);

            var i = 0, j = 0; k = 0;
            while (i < leftHalf.length && j < rightHalf.length) {
                if (leftHalf[i] < rightHalf[j]) {
                    list[k] = leftHalf[i];
                    i++;
                } else {
                    list[k] = rightHalf[j];
                    j++;
                }
                k++;
            }

            while (i < leftHalf.length) {
                list[k] = leftHalf[i];
                i++;
                k++;
            }

            while (j < rightHalf.length) {
                list[k] = rightHalf[j];
                j++;
                k++;
            }
        }
        return list;

    };*/

    /*OU.activity.MergeSort.prototype.mergeSort = function (list) {
        var record = new Array();
        var lengths = new Array();

        lengths.push(list.length);

        var divide = 1;
        var length = list.length;
        while (divide < length) {
            var newLengths = new Array();
            while (lengths.length > 0) {
                var width = lengths.shift();
                var left = Math.floor(width / 2);
                var right = width - left;
                newLengths.push(left);
                newLengths.push(right);
            }
            lengths = newLengths.slice(0);           // clone the array
            record.push(newLengths);
            divide *= 2;
            this.replay.push({"action":"split", "list":newLengths})
        }

        while (record.length > 0) {
            var newList = new Array();
            lengths = record.pop();
            var count = 0;
            while (lengths.length > 0) {
                var leftHalf = lengths.shift();
                var rightHalf = lengths.shift();
                var i = 0, j = 0;
                while (i < leftHalf && j < rightHalf) {
                    if (list[count + i] < list[count + leftHalf + j]) {
                        newList.push(list[count + i]);
                        i++;
                    } else {
                        newList.push(list[count + leftHalf + j]);
                        j++;
                    }
                }

                while (i < leftHalf) {
                    newList.push(list[count + i]);
                    i++;
                }

                while (j < rightHalf) {
                    newList.push(list[count + leftHalf + j]);
                    j++;
                }

                count += leftHalf + rightHalf;
            }
            list = newList;
        }
        return list;
    }*/

    // the timer loop to create a timeline for replay and animation
    OU.activity.MergeSort.prototype.renderLoop = function () {
        this.renderCount++; // count each render to avoid anomalies
        var self = this;
        if (!this.dead) {
            this.step(); // step through the replay of sorting
            if (this.renderCount === this.callRenderCount) { // make sure each render matches the call to the function
                this.callRenderCount++; // inc the call count
                setTimeout(function () {
                    self.renderLoop(); // set timer for next render
                }, this.timerPause);
            }
        }
    };

    // step through the sort and animate the swaps
    OU.activity.MergeSort.prototype.step = function () {
        if (this.paused) {// if paused then do nothing
            return;
		}

        if (this.sorted && this.animating === -1) { // if all sorted or not animiting then stop animation
            this.dead = true;
        }
        // if not animating a swap or just swapped then pause for user to compare items
        if (!this.dead && this.animating === -1) {
            this.pauseCount--; // count down the pause for each timer slot

            if (this.pauseCount <= 0) { // Once the pause count has counted down
                this.replaySort(); // replay the sorting step
                this.pauseCount = this.checkPause; // set the new pause count
                this.drawVisualisation(); // redraw the bars
            }
        }
        // if first step of animating a swap
        if (this.animating === 1) {
            this.pauseCount--; // count down the pause timer
            if (this.pauseCount <= 0) { // when it reaches zero
                this.pauseCount = this.checkPauseMute; // reset the pausecount
                this.drawVisualisation(); // redraw the bars
            }
        }
        // if animating a swap
        if (this.animating > 1) {
            this.drawVisualisation(); // redraw the bars to show the movement
        }
    };

    // Replay the recorded sort step by step
    OU.activity.MergeSort.prototype.replaySort = function () {
		var self = this,
			replay,
			display;

        this.checkPause = 10;
        this.audioToPlay = false;

        if (!this.dead && this.replay.length > 0) { // if not finished and not last step
            replay = this.replay.shift(); // get the step to replay's information
			display = 'none';

            this.action = replay.action;

            this.state = replay.state;
            this.leftHi = this.state.left;
            this.rightHi = this.state.right;
            this.listIndex = this.state.list;
            this.which = replay.which;

            this.audioToPlay = false;

            switch (this.action) {
			case "begin":
				this.animating = 0; // first animation step
				display = "block";
				this.playIt(this.action);
				break;
			case "start":
				this.playIt(this.action);
				break;
			case "move":
			case "move_rest":
				this.animating = 0; // first animation step
				this.playIt(this.action + "_" + this.which);
				break;
			case "continue": // swap back in
				this.playIt(this.action + "_" + this.which);
				this.list[this.state.list] = this.which === "left" ?
						this.leftHalf[this.state[this.which] - 1] :
						this.rightHalf[this.state[this.which] - 1];
				break;
			case "unshrink":
			case "shrink":
				display = "block";
				this.animating = 0;
				break;
            }
            this.codeDiv.div.style.display = display;

            if (this.stepCount >= this.goFast) {
                if (this.stepCount === this.goFast) { // if first step after speed up
                    this.textDiv.div.innerHTML = this.data.fast.text; // change text to say speeding up
                    this.audioElement.setAttribute('src', this.dataDir + this.data.fast.audio); // set audio for same
                }
            }
            this.stepCount++; // next step
        } else { // must be all sorted
            this.action = "sorted";
            this.sorted = true; // set flag
            this.animationSteps = this.animationStepsInit; // reset animation steps for glow animation
            this.animating = 0; // first setp of glow animation
            this.playIt(this.action);
        }

        if (this.audioPlay && this.audioToPlay) { // audio checkbox selected
            if (this.stepCount <= this.goFast || this.sorted) {  // if not sped up or if sorted
                this.audioElement.addEventListener('ended', function () {
                    if (self.pauseCount > 0) {
                        self.pauseCount = 0; // set pauseCount to zero to end any pause
                    }
                });
                this.audioElement.play(); // play the audio
            } else {
                this.checkPause = 0;
            }
        } else {
            this.checkPause = this.stepCount < this.goFast ? this.checkPauseMute : 0; // set the pause - none if sped up
        }
    };

    OU.activity.MergeSort.prototype.playIt = function (part) {
        this.audioElement.setAttribute('src', this.dataDir + data[part].audio); // set the is sorted audio to no
        this.textDiv.div.innerHTML = this.data[part].text;
        this.checkPause = 9999; // pause for audio
        this.audioToPlay = true;
    };

    // speed up button clicked
    OU.activity.MergeSort.prototype.speedUp = function () {
        if (!this.sorted) { // only speed up if not finished
            if (this.animationSteps === this.speedSteps) {
                this.setAnimationSteps(this.animationStepsInit);
                this.goFast = this.goFastInit;
                this.goFast = 9999;
                this.fastBtn.value = "Fast";
            } else {
                this.setAnimationSteps(this.speedSteps); // less animation steps to speed it up
                this.checkPause = 0; // no pausing for more speed
                this.goFast = this.stepCount; // speed up from this step
                this.audioElement.pause();
                if (this.pauseCount > 0) {
                    this.pauseCount = 0; // set pauseCount to zero to end any pause
                }
                this.fastBtn.value = "Slow";
            }
        }
    };

    // called when animation is finished
    OU.activity.MergeSort.prototype.animatingFinished = function () {
        this.step(); // do one more step
    };

    // audio checkbox clicked
    OU.activity.MergeSort.prototype.toggleAudio = function () {
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
    OU.activity.MergeSort.prototype.accessibleView = function () {
        OU.activity.MergeSort.superClass_.accessibleView.call(this); // call the superclass method is you want to extend it, remove this line to override the method instead

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
    OU.activity.MergeSort.prototype.resize = function () {
        OU.activity.MergeSort.superClass_.resize.call(this); // call the superclass resize

        document.body.style.fontSize = parseInt(window.innerHeight / 38, 10) + "px";

        var controlctx = this.controlLayer.context, // get the graphics context
			xPad = this.w * 0.02, // padding space between controls
			useWidth = this.w - 2 * xPad, // total usable width when padding removed
			controlHeight = this.h * 0.1, // control panel is 10% of height
			yPad = controlHeight * 0.2, // 2% y padding
			textHeight = controlHeight * 2.8, // height of the text area at top
			// useable height for visualisation layer after conrols, textarea and padding subtracted
			useHeight = this.h - controlHeight - textHeight - 2 * yPad,
			codeW;

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

        codeW = useWidth * this.data.codeWidthScale * 1.5;
        this.codeDiv.resize({
            x: this.visualisationLayer.w * 0.5,
            y: this.visualisationLayer.y * 0.6,
            w: codeW,
            h: useHeight - yPad * 3
        });
        this.codeDiv.div.innerHTML = '<div class="code" style="font-size:' +
             this.getFontSize() + 'px">' + this.data.code + '</div>';

        this.initBoxDimensions();

        this.codeDiv.div.style.display = this.action === "begin" ? "block" : "none";
        if (this.action === "begin" || this.action === "shrink") {
            this.setBoxDimensions(this.w / 2, this.h / 2);
        }
        this.labelsResize();

        // render whole thing
        this.render();
    };

    OU.activity.MergeSort.prototype.labelsResize = function () {
        this.leftDiv.resize({
            x: this.boxSpace * 1.2 + this.visualisationLayer.x,
            y: this.top + this.visualisationLayer.y + this.boxSize,
            w: this.boxSpace * this.leftHalf.length - this.halfPad * 2,
            h: 'auto'
        });
        this.rightDiv.resize({
            x: this.boxSpace * (2.8 + this.leftHalf.length) + this.visualisationLayer.x,
            y: this.top + this.visualisationLayer.y + this.boxSize,
            w: this.boxSpace * this.rightHalf.length - this.halfPad * 2,
            h: 'auto'
        });
        this.listDiv.resize({
            x: this.boxSpace * 2 + this.halfPad  + this.visualisationLayer.x,
            y: this.bottom + this.visualisationLayer.y + this.boxSize,
            w: this.boxSpace * this.list.length - this.halfPad * 2,
            h: 'auto'
        });
    };

    OU.activity.MergeSort.prototype.playAudio = function (audioFile) {
        if (this.audioPlay) {
            this.audioElement.setAttribute('src', this.dataDir + audioFile); // intro audio
            this.audioElement.play(); // play the audio
        }
    };

    OU.activity.MergeSort.prototype.getFontSize = function () {
        return parseInt(window.innerHeight / 40, 10);
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
    OU.activity.MergeSort.prototype.remove = function () {
        OU.activity.MergeSort.superClass_.remove.call(this); // call the superclass remove
        // *Your removal code here*
        // If you have nothing to remove, then this function can be deleted or commented out
        this.dead = true;
    };

    // call the superclass's constructor
    OU.base(this, data, instance, controller);
};

// Call our inherits function to implement the class inheritance
OU.inherits(OU.activity.MergeSort, OU.util.Activity);