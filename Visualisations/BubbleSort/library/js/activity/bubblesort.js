/**
 * @fileOverview BubbleSort - A template for activities that extend the OU.util.Activity class
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
 * @class BubbleSort - A template for activities that extend the OU.util.Activity class
 * @extends OU.util.Activity
 * @param {Object} data - Holds the data content for a specific instance of the activity
 * @param {String} instance - (Optional) A unique identifier name for this instance, defaults to 'a1'
 * @param {OU.util.Controller} controller - (Optional) A reference to the controller that initialised this instance, if undefined, the superclass will generate a new controller and create the reference to it as 'this.controller'
 */
OU.activity.BubbleSort = function (data, instance, controller) {
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
    OU.activity.BubbleSort.prototype.canvasView = function () {
        this.mode = 'sort';
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
            container: this,
            id: 'model-layer',
            x: 0,
            y: 0,
            w: 50,
            h: 60,
            hasEvents: true
        });

        this.controlLayer.context.gradRect(); // use default background

        this.textDiv = new OU.util.Div({ // put in a div for text info
            container: this,
            style: "font-size:100%;"
        });
        this.textDiv.div.innerHTML = this.data.instructions; // get student instruction text from data file and put in text div

        this.codeDiv = new OU.util.Div({ // put in a div for text info
            container: this.visualisationLayer
        });
        this.codeDiv.div.innerHTML = "";

        this.graphDiv = new OU.util.Div({ // put in a div for text info
            container: this.visualisationLayer
        });
        this.graphDiv.div.style.background = '#fff';
        this.graphDiv.div.innerHTML = "";

        this.audioElement = document.createElement('audio'); // create the audio element

        this.initControls();  // initialise the controls
        this.resetAnimation(); // reset the visualisation
        this.resize(); // resize to put everything in correst place and relative size

        this.playAudio(data.intro.audio);
    };

    OU.activity.BubbleSort.prototype.playAudio = function (audioFile) {
        if (this.audioPlay) {
            this.audioElement.setAttribute('src', this.dataDir + audioFile); // intro audio
            this.audioElement.play(); // play the audio
        }
    };

    // set the number of steps of movement for the animation for swapping bars
    OU.activity.BubbleSort.prototype.setAnimationSteps = function (steps) {
        this.animationSteps = steps; // set the var
        this.initDisplacements(); // calcualate all the animation movement displacements - using cosine for acceleration and deceleration
    };

    // calcualate all the animation movement displacements - using cosine for acceleration and deceleration
    OU.activity.BubbleSort.prototype.initDisplacements = function () {
		var i,
			inc,
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
    OU.activity.BubbleSort.prototype.initControls = function () {
		var self = this,
			bH = OU.controlHeight,
			btnSpace = 100 / 6,
			btnWidth = btnSpace * 0.9,
			cssWidth = "width: " + btnWidth + "%;",
			xPad = btnSpace * 0.05,
			btnTop = 91;

        this.sortBtn = Utils.newButton( // init sort button
            xPad + "%",
            btnTop + "%", //left,top
            "Sort",
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

        this.nextBtn = Utils.newButton( // init sort button
            (btnSpace * 4 + xPad) + "%",
            btnTop + "%", //left,top
            "Big-O",
            function () {
                self.next();
            },
            cssWidth, //specific css
            'b', //default a tag, b button, r radio, "c" checkbox
            "nextButton" //component id
        );

        this.audioBtn = Utils.newButton( // init the audio chechbox button
            (btnSpace * 5 + xPad) + "%",
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
            layer: this.modelLayer,
            x: 16,
            y: bH - 16,
            w: 32,
            h: 32,
            autoWidth: false,
            padding: 10,
            onClick: function () {
                new OU.util.PopUpInfo({
                    container: self,
                    txt: self.data.help,
                    x: self.w * 0.20,
                    y: self.h * 0.15,
                    w: self.w * 0.6,
                    h: self.h * 0.7,
                    onClose: function () {
                    }
                });
            }
        });
    };

    OU.activity.BubbleSort.prototype.togglePause = function () {
        this.paused = !this.paused; // toggle pause flag
        this.pauseBtn.value = this.paused ? "Resume" : "Pause";
    };

    // Pause/Resume the animation and change the Pause button text to Resume/Pause
    OU.activity.BubbleSort.prototype.pause = function () {
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
    OU.activity.BubbleSort.prototype.resetAnimation = function () {
        if (this.mode === 'sort') {
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
            this.initVisualisation(); // initilise visualisation with random order
            this.textDiv.div.innerHTML = this.data.instructions; // re post the intructions
            this.render(); // render the module
        } else {
            this.back();
        }
    };

    // init the visualisation part
    OU.activity.BubbleSort.prototype.initVisualisation = function () {
        this.initBarHeight(); // calc base bar height
        this.initBars(); // init the bars
        this.initBarGradients(); // init the reflections
    };

    // init the actual pixel count for the base number for heights of bars on screen
    OU.activity.BubbleSort.prototype.initBarHeight = function () {
        this.horizon = this.visualisationLayer.h * 0.73; // horizon for reflection - 73% down
        this.barHeightUnit = this.horizon / (this.barCount + 1); // height for each unit of bar height to multiply
    };

    // initialise the visual bars whcih are sorted into order
    OU.activity.BubbleSort.prototype.initBars = function () {
        var hue1 = this.hueStart, // paint bars with colours through the rainbow so start at red
            hue2 = this.hueEnd, // and work through to blue
            hueInc = (hue2 - hue1) / this.barCount, // increment through the spectrum divided by the number of bars
            rand, // random number for initialising positions
            pos, // holds the current bar's position
            positions = [], // keep note of order positions available for the bars ie 1st to Nth
            hue,
            i,
            j;

        for (j = 0; j < this.barCount; j++) {
            positions[j] = j; // increment through each position
        }

        this.bars = []; // holds the info for all the bars
        for (i = 0; i < this.barCount; i++) {  // for all the bars
            rand = Math.floor(Math.random() * positions.length); // get a random position from those available
            pos = positions[rand]; // take that position for the current bar
            positions.splice(rand, 1); // take the position out of the remaining positions to choose from

            this.bars[pos] = []; // init the array to hold the current bar info
            this.bars[pos].height = i + 1; // init the bar's height
            hue = (hue1 + hueInc * i); // calc the bar's colour
            this.bars[pos].color = this.getRGB(hue, 1, 1); // change hue to rgb and assign to bar
        }
    };

    // initialise the gradients which show the reflection of the bars
    // this needs to be done when reseting or resizing
    OU.activity.BubbleSort.prototype.initBarGradients = function () {
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
    OU.activity.BubbleSort.prototype.getRGB = function (h, s, v) {
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
    OU.activity.BubbleSort.prototype.render = function () {
        this.drawVisualisation();
    };

    // draw the bars, reflections and arrows
    OU.activity.BubbleSort.prototype.drawVisualisation = function () {
        switch (this.mode) {
		case "sort":
			this.drawSort();// draw the bars in current state
			break;
		case "code":
			this.drawCode();
			break;
		case "graph":
			this.drawGraphInit();
			this.drawGraph();
			break;
        }
    };

    OU.activity.BubbleSort.prototype.drawSort = function () {
        var ctx = this.visualisationLayer.context, // get the graphics context
			h = this.visualisationLayer.h, // get height
			w = this.visualisationLayer.w, // get width
			PAD = w / this.barCount / 8, // the padding space between each bar
			barSpace = (w - 1) / this.bars.length, // the space needed for each bar including padding
			barWidth = barSpace - PAD, // subtract the padding to give bar width
			halfPad = PAD / 2, // half the padding width is the padding at each side of the bar
			barCount = this.bars.length - 1, // the number of bars to draw
			unit,
			displacement,
			i;

        // Draw background colour
        ctx.fillStyle = this.data.backgroundColour;
        ctx.fillRect(0, 0, w, h);

        for (i = barCount; i >= 0; i--) {  // for each bar from right to left
            this.bars[i].width = barWidth; // set the width of the bar
            this.bars[i].x = barSpace * i + halfPad; // calc the x coord
            this.bars[i].y = this.getBarY(this.bars[i].height); // get y coord from height

            // draw non-moving bars without
            if (this.animating > -1 && this.sorted) { // if still animating but all sorted
                this.drawBar(ctx, this.bars[i], true); // draw bar with "glow""
            } else if (this.animating === -1 || (this.right !== i && this.left !== i)) { // still animating, not all sorted but not moving bars
                this.drawBar(ctx, this.bars[i], false); // draw bar without glow
            }
        }

        // draw moving bars
        if (this.animating > -1 && !this.sorted) { // if anmating and not all sorted
            unit = (this.right - this.left) / this.animationSteps; // calc base unit for movement based on distance and number of steps
            displacement =  unit * this.displacements[this.animating]; // calc how far to move
            // draw right hand bar moving right
            this.bars[this.right].x = barSpace * (this.left + displacement) + halfPad; // calc x coord
            this.bars[this.right].y = this.getBarY(this.bars[this.right].height); // calc y coord
            this.drawBar(ctx, this.bars[this.right]); // draw the right hand bar
            // draw left hand bar moving left
            this.bars[this.left].x = barSpace * (this.right - displacement) + halfPad; // calc x coord
            this.bars[this.left].y = this.getBarY(this.bars[this.left].height); // calc y coord
            this.drawBar(ctx, this.bars[this.left]); // draw the left hand bar
        }

        if (this.animating >= this.animationSteps) { // if done all animating steps
            this.animating = -1; // set to not animating
            this.animatingFinished(); // do all the stuff after animation finishes
        }
        if (this.animating > -1) { // if still animating
            this.animating++; // next animation step
        }
        // draw arrows
        if (!this.sorted) {///} && this.left !== undefined) {//} && this.stepCount > 0) { // if not yet all sorted
            this.drawArrow(ctx, this.bars[this.left], this.getRGB(this.hueStart, 1, 1)); // draw arrow under left bar in start color
            this.drawArrow(ctx, this.bars[this.right], this.getRGB(this.hueEnd, 1, 1)); // draw arrow under right bar in stop color
        }
    };

    // draw individual bar
    OU.activity.BubbleSort.prototype.drawBar = function (ctx, bar, shadow) {
        var height = bar.height * this.barHeightUnit, // get the drawing height from height of bar and the basic unit
			y = this.horizon - height, // y coord is height above the refelection horizon
			alpha;

        ctx.save(); // drawing and changing context so save last context to restore at end

        ctx.strokeStyle = "#000"; // black outline
        ctx.fillStyle = bar.color; // get fill color

        if (shadow) { // if "glow"
            alpha = 1 - Math.cos(2 * Math.PI * this.animating / this.animationSteps); // alpha depends on anumation step for increase and decrease glow as cosine
            ctx.shadowColor =  'rgba(255, 225, 0,' + alpha + ')'; // shadow color is gold with the above alpha
            ctx.shadowBlur = 30; // for glow the shadow has a blur value which set the how diffuse it is
        } else {
            ctx.shadowColor =  'rgba(0, 0, 0, 0)'; // else no glow
		}

        // draw the bar above the horizon
        ctx.beginPath(); // to make it all work properly seem to need to open and close path for each element

        ctx.rect(bar.x, y, bar.width, height); // draw the bar rectangle in the path

        ctx.closePath();
        ctx.fill();  // fill the bar
        ctx.stroke(); // draw the outline

        // draw the reflection
        ctx.fillStyle = bar.gradFill; // fill gradient for bar - already calculated
        ctx.strokeStyle = bar.gradStroke; // outline gradient for bar

        ctx.beginPath();

        ctx.rect(bar.x, this.horizon + 1, bar.width, height * 0.4); // draw outline
        ctx.fillRect(bar.x, this.horizon + 1, bar.width, height * 0.4); // fill in

        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.restore(); // restore the context to previous
    };

    // calc y using bar height and horizon
    // using funciton to keep consistent any changes
    OU.activity.BubbleSort.prototype.getBarY = function (height) {
        return this.horizon - height;
    };

    // draw a single arrow
    OU.activity.BubbleSort.prototype.drawArrow = function (ctx, bar, color) {
        var thickness = (bar.width) / 10,  // half thickness of the stem
			padX = thickness, // the padding left and right
			padY = (this.visualisationLayer.h - this.horizon) / 10, // the padding top and bottom
			left = bar.x + padX, // extreme left of arrowhead
			centre = bar.x + bar.width / 2, // centre point of arrow and location of tip
			right = bar.x + bar.width - padX, // extreme right of arrowhead
			top = this.horizon + padY, // top of arrow
			bottom = this.visualisationLayer.h - padY, // bottom of arrow
			mid = top + (bottom - top) / 4; // bottom of arrowhead

        ctx.save();

        ctx.fillStyle = color;
        ctx.strokeStyle = "rgba(0,0,0,1)"; // black outline
        ///ctx.shadowColor = 'orange'; // glow
        ///ctx.shadowBlur = 10; // small blur, small glow

        ctx.beginPath();

        ctx.moveTo(centre, top); // top/centre point of vertically up arrow
        ctx.lineTo(right, mid); // down first slope to right point of arrow head
        ctx.lineTo(centre  + thickness, mid); // straight back into arrow shaft
        ctx.lineTo(centre  + thickness, bottom); // down to bottom right corner
        ctx.lineTo(centre  - thickness, bottom); // left to bottom left corner
        ctx.lineTo(centre  - thickness, mid); // up to bottom of arrow head
        ctx.lineTo(left, mid); // left point of arrow head
        ctx.lineTo(centre, top); // top of arrow

        ctx.closePath();

        ctx.stroke();
        ctx.fill();

        ctx.restore();
    };

    // caclulate all swaps and then start the replacy of the steps of the algorithm
    OU.activity.BubbleSort.prototype.start = function () {
        // init all the vars to starting values
        this.sortBtn.disable();
        this.pauseBtn.enable();
        this.fastBtn.enable();
        if (this.paused) {
            this.togglePause();
        }

        this.setAnimationSteps(this.animationStepsInit);
        this.goFast = this.goFastInit;

        this.compareStep = 0;
        this.stepCount = 0;
        this.animating = -1;
        this.swapped = false;
        this.swapTest = false;

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
    OU.activity.BubbleSort.prototype.recordSort = function () {
        var list = [], // list of bar heights from left to right
			total = this.bars.length - 1, // total number of bars which is the number of passes for testing the swaps
			i,
			j,
			k,
			temp,
			swapTest;

        for (k = 0; k < this.bars.length; k++) { // for all the bars
            list[k] = this.bars[k].height; // put in their heights
        }
        this.replay = []; // replay information


        for (i = 0; i < total; i++) { // for all passes
            swapTest = false; // init the test for swapping round

            for (j = 0; j < total - i; j++) { // for each pair of bars to test in each pass (bars above total - i are already sorted)
                if (list[j] > list[j + 1]) { // test whether bars should be swapped
                    temp = list[j]; // if so then swap
                    list[j] = list[j + 1];
                    list[j + 1] = temp;
                    swapTest = true; // mark whether there has been a swap in this sweep

                    // record step;
                    this.replay.push({
                        "left": j + 1,
                        "right": j,
                        "swap": true,
                        "pair": j,
                        "sweep": i
                    }); // record information for swap test
                } else {
                    // record step;
                    this.replay.push({
                        "left": j,
                        "right": j + 1,
                        "swap": false,
                        "pair": j,
                        "sweep": i
                    }); // record information for swap test
                }
            }
            if (!swapTest) {
                break; // if no swaps in this sweep then must be all sorted so stop
            }
        }
    };

    // the timer loop to create a timeline for replay and animation
    OU.activity.BubbleSort.prototype.renderLoop = function () {
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
    OU.activity.BubbleSort.prototype.step = function () {
        if (this.paused) { // if paused then do nothing
            return;
		}

        if (this.sorted && this.animating === -1) { // if all sorted or not animiting then stop animation
            this.dead = true;
        }
        // if not animating a swap or just swapped then pause for user to compare items
        if (!this.dead && this.animating === -1 && !this.swapped) {
            this.pauseCount--; // count down the pause for each timer slot

            if (this.pauseCount <= 0) { // Once the pause count has counted down
                this.replaySort(); // replay the sorting step
                this.pauseCount = this.checkPause; // set the new pause count
                this.drawVisualisation(); // redraw the bars
            }
        }
        // if not animating and there is a swap
        if (this.animating === -1 && this.swapped) {
            this.replaySort(); // replay the sorting step
            this.pauseCount = this.checkPause; // set the pause count
        }
        // if first step of animating a swap
        if (this.animating === 1) {
            this.pauseCount--; // count down the pause timer
            if (this.pauseCount <= 0) { // when it reaches zero
                this.pauseCount = this.checkPause; // reset the pausecount
                this.drawVisualisation(); // redraw the bars
            }
        }
        // if animating a swap
        if (this.animating > 1) {
            this.drawVisualisation(); // redraw the bars to show the movement
        }
    };

    // Replay the recorded sort step by step
    OU.activity.BubbleSort.prototype.replaySort = function () {
		var self = this,
            replay,
			left,
			right,
			swap,
			sweep,
			temp,
			bar,
			para,
			which,
			audioToPlay,
			swapText;

        if (!this.dead && this.stepCount < this.replay.length) { // if not finished and not last step
            replay = this.replay[this.stepCount]; // get the step to replay's information				
			left = replay.left; // the left bar being compared
			right = replay.right; // the right bar
			swap = replay.swap; // whether they were swapped
			sweep = replay.sweep;

            if (swap) { // if they were swapped
                temp = left; // swap the local vars
                left = right;
                right = temp;

                // swap bars
                bar = this.bars[left];         // temp swap var
                this.bars[left] = this.bars[right];
                this.bars[right] = bar;
                this.animating = 0; // first animation step
            }
            // set global vars for left, right and swapped
            this.left = left;
            this.right = right;
            this.swapped = swap;

            // set the text for which bars are being compared
            para = '<br/><br/>';
            which = para;

            audioToPlay = true;

            // show the correct text
            if (this.stepCount < this.goFast) { // if not going fast yet then display the comparision text
                swapText = swap ? this.data.no.text : this.data.yes.text; // set the text for whether swapped

                if (this.stepCount === 0) { // if first step in animation then do initial text and audio for info and then whether sorted

                    if (swap) {
                        this.audioElement.setAttribute('src', this.dataDir + data.first.audioNo); // set the is sorted audio to no
                        this.textDiv.div.innerHTML = this.data.first.text + para + this.data.first.no; // set the text div
                        this.checkPause = this.data.first.pauseNo; // pause for audio
                    } else {
                        this.audioElement.setAttribute('src', this.dataDir + data.first.audioYes); // the is sorted audio to yes
                        this.checkPause = this.data.first.pauseYes; // pause for audio
                        this.textDiv.div.innerHTML = this.data.first.text + para + this.data.first.yes; // set the text div
                    }
                } else if (replay.pair === 0) { // if not first step overall but first step in sweep
                    this.textDiv.div.innerHTML = this.data.nextSweep.text; // change text to give this info
                    this.audioElement.setAttribute('src', this.dataDir + this.data.nextSweep.audio); // and do audio
                    this.checkPause = this.data.nextSweep.pause; // pause for audio
                } else { // if not first comparision in sweep
                    if (this.left <= 3 && sweep === 0) {
                        if (swap) {
                            this.audioElement.setAttribute('src', this.dataDir + data.no["audio" + this.left]); // no sorted audio
                            this.checkPause = this.data.no["pause" + this.left]; // pause for audio
                        } else {
                            this.audioElement.setAttribute('src', this.dataDir + data.yes["audio" + this.left]); // yes sorted audio
                            this.checkPause = this.data.yes["pause" + this.left]; // pause for audio
                        }
                        swapText = swap ? this.data.no["text" + this.left] : this.data.yes["text" + this.left]; // set the text for whether swapped
                        this.textDiv.div.innerHTML = this.data.next["text" + this.left] + which + swapText; // set the text appropriately
                    } else if (this.left === 4 && sweep === 0) {
                        this.audioElement.setAttribute('src', this.dataDir + data.carrieson.audio); // yes sorted audio
                        this.checkPause = this.data.carrieson.pause; // pause for audio
                        this.textDiv.div.innerHTML = this.data.carrieson.text; // set the text appropriately
                    } else {
                        audioToPlay = false;
                        this.checkPause = this.checkPauseMute; // pause for audio
                    }

                }
            } else { // go fast now
                if (this.stepCount === this.goFast) { // if first step after speed up
                    this.textDiv.div.innerHTML = this.data.fast.text; // change text to say speeding up
                    this.audioElement.setAttribute('src', this.dataDir + this.data.fast.audio); // set audio for same
                }
            }
            this.stepCount++; // next step
        } else { // must be all sorted
            this.sorted = true; // set flag
            this.animationSteps = this.animationStepsInit; // reset animation steps for glow animation
            this.animating = 0; // first setp of glow animation
            this.textDiv.div.innerHTML = this.data.sorted.text; // set sorted text
            this.audioElement.setAttribute('src', this.dataDir + this.data.sorted.audio); // do sorted audio
            audioToPlay = true;
        }

        if (this.audioPlay && audioToPlay) { // audio checkbox selected
            if (this.stepCount <= this.goFast + 1 || this.sorted) {  // if not sped up or if sorted                
                this.audioElement.addEventListener('ended', function () {
                    if (self.pauseCount > 0) {
                        self.pauseCount = 0; // set pauseCount to zero to end any pause
                    }
                });
                this.audioElement.play(); // play the audio
            }
        } else {
            this.checkPause = this.stepCount < this.goFast ? this.checkPauseMute : 0; // set the pause - none if sped up
        }
    };

    // DEPRICATED: the actual sort algorithm - depricated by recording and replaying
    OU.activity.BubbleSort.prototype.sort__ = function () {
        // if instead of for - counting will be done outside the function to allow animation
        if (!this.dead && this.stepCount < this.bars.length - 1) {
            // counter for this 'for' loop
            var j = this.compareStep,
				bar;

            if (j < this.bars.length - this.stepCount - 1) {
                // choose left and right bars for animation
                this.left = j;
                this.right = j + 1;

                // compare items - in this case the bars' heights
                // if swap needed
                if (this.bars[j].height > this.bars[j + 1].height) {
                    // first step of the animation - making it >0 effectively turns the animation on
                    this.animating = 0;

                    // swap bars
                    bar = this.bars[j];         // temp swap var
                    this.bars[j] = this.bars[j + 1];
                    this.bars[j + 1] = bar;

                    // at least one swap done in this iteration so don't stop
                    this.swapTest = true;
                }
                // inc the counter for the loop to move to the next pair next time
                this.compareStep++;
            } else {
                // end of inner loop so reset counter and increase outer loop counter
                this.compareStep = 0;
                this.stepCount++;

                if (this.swapTest === false) {
                    // if no swaps at all in inner loop then list must be sorted
                    this.dead = true;
                    this.sorted = true;
                }
                this.swapTest = false;
            }
        } else {
            // sorted
            this.dead = true;
            this.sorted = true;
        }
    };

    // speed up button clicked
    OU.activity.BubbleSort.prototype.speedUp = function () {
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
    OU.activity.BubbleSort.prototype.animatingFinished = function () {
        this.step(); // do one more step
    };

    // audio checkbox clicked
    OU.activity.BubbleSort.prototype.toggleAudio = function () {
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
    OU.activity.BubbleSort.prototype.accessibleView = function () {
        OU.activity.BubbleSort.superClass_.accessibleView.call(this); // call the superclass method is you want to extend it, remove this line to override the method instead

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
    OU.activity.BubbleSort.prototype.resize = function () {
        OU.activity.BubbleSort.superClass_.resize.call(this); // call the superclass resize

        document.body.style.fontSize = parseInt(window.innerHeight / 38, 10) + "px";

        var controlctx = this.controlLayer.context, // get the graphics context
			xPad = this.w * 0.02, // padding space between controls
			useWidth = this.w - 2 * xPad, // total usable width when padding removed
			controlHeight = this.h * 0.1, // control panel is 10% of height
			yPad = controlHeight * 0.2, // 2% y padding
			textHeight = controlHeight * 2.8, // height of the text area at top
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

        this.codeWidth = useWidth * this.data.codeWidthScale * 1.5;
        this.codeGraphWidth = useWidth * this.data.codeWidthScale;
        this.codeLeftCode = (useWidth - (this.codeWidth)) / 2;
        this.codeLeftGraph = this.w * 0.02;
        codeW = this.mode === 'code' ? this.codeWidth : this.codeGraphWidth;
        // resize the text area
        this.codeDiv.resize({
            x: this.codeLeft,
            y: this.textDiv.y + this.textDiv.h + yPad * 3,
            w: codeW,
            h: useHeight - yPad * 3
        });

        if (this.mode === "code") {
            this.codeDiv.div.innerHTML = '<div class="code" style="font-size: ' +
                 this.getFontSize() + 'px">' + this.data.algorithmCode + '</div>';
        } else if (this.mode === "graph") {
            this.codeDiv.div.innerHTML = '<div class="graph" style="font-size: ' +
                   this.getFontSize() * 0.8 + 'px">' + this.data.algorithmCode + '</div>' +
                   this.data.graphInstructions;
        }
        this.graphDiv.resize({
            x: this.codeLeft,
            y: this.textDiv.y + this.textDiv.h + yPad * 3,
            w: 'auto',
            h: 'auto'
        });
        this.graphDiv.div.style.fontSize = '100%';
        // init the bar heights and gradients to take change into account
        this.initBarHeight();
        this.initBarGradients();
        // render whole thing
        this.render();
    };

    OU.activity.BubbleSort.prototype.next = function () {
        this.clearVisualisation();
        switch (this.mode) {
		case 'sort':
			this.sortBtn.disable();
			this.pauseBtn.disable();
			this.fastBtn.disable();
			this.resetBtn.value = 'Back';
			this.nextBtn.value = 'Next';
			this.codeStart();
			break;
		case 'code':
			this.nextBtn.setVisible(false);
			this.graphStart();
			break;
        }
    };

    OU.activity.BubbleSort.prototype.back = function () {
        this.clearVisualisation();

        switch (this.mode) {
		case 'code':
			this.sortBtn.enable();
			this.pauseBtn.enable();
			this.fastBtn.enable();
			this.resetBtn.value = 'Reset';
			this.nextBtn.value = 'Big-O';
			this.mode = 'sort';
			this.codeDiv.div.innerHTML = "";
			this.graphDiv.div.innerHTML = "";
			this.resetAnimation();
			break;
		case 'graph':
			this.codeStart();
			this.nextBtn.setVisible(true);
			break;
        }
    };

    OU.activity.BubbleSort.prototype.codeStart = function () {
        this.mode = 'code';
        this.textDiv.div.innerHTML = this.data.code.text;
        this.graphDiv.div.innerHTML = '';
        this.codeDiv.slideTo({
            'x': this.codeLeftCode,
            'w': this.codeWidth
        });
        this.codeDiv.div.innerHTML = '<div class="code" style="font-size: ' +
                 this.getFontSize() + 'px">' + this.data.algorithmCode + '</div>';
        this.codeDiv.div.style.fontSize = this.getFontSize() + 'px';
        this.playAudio(data.code.audio);
    };

    OU.activity.BubbleSort.prototype.graphStart = function () {
        this.visualisationLayer.events.clickable.push(this);

        this.mode = 'graph';
        this.textDiv.div.innerHTML = this.data.graph.text;
        this.codeDiv.slideTo({
            'x': this.codeLeftGraph,
            'w': this.codeGraphWidth
        });
        this.codeDiv.div.innerHTML = '<div class="graph" style="font-size: ' +
                   this.getFontSize() * 0.8 + 'px">' + this.data.algorithmCode + '</div>' +
                   this.data.graphInstructions;
        this.drawGraphInit();
        this.drawGraph();
        this.playAudio(data.graph.audio);
    };

    OU.activity.BubbleSort.prototype.clearVisualisation = function () {
        this.visualisationLayer.clear(); // get the graphics context
    };

    OU.activity.BubbleSort.prototype.drawGraphInit = function () {
        this.setupGraph();
        this.nCount = 5;
    };

    OU.activity.BubbleSort.prototype.drawGraph = function () {
        var ctx = this.visualisationLayer.context, // get the graphics context
			h = this.visualisationLayer.h, // get height
			w = this.visualisationLayer.w, // get width
			xPos,
			xText,
			yText,
			text,
			textWidth;

        ctx.fillStyle = this.data.backgroundColour;
        ctx.fillRect(0, 0, w, h);////(this.xOffset - 30, this.yOffset -30, w - this.xOffset + 20, h - this.yOffset + 25);

        this.drawAxes(ctx);
        this.drawFunc("O", ctx);
        this.drawFunc("N", ctx);
        this.drawIntersect("O", this.nCount, ctx);

        xPos = (this.xAxisMax + this.xAxisMin) / 2;
        xText = this.paintX(xPos);
        ctx.fillStyle = 'black';

        ctx.font = 'bold ' + this.getFontSize() + 'px Arial';
        text = 'Total number of comparisons';
        textWidth = ctx.measureText(text).width;

        yText = this.paintY(this.getY('O', xPos));
        ctx.fillText(text, xText - textWidth / 2, yText - this.getFontSize() * 1.5);

        ctx.font = 'bold italic ' + this.getFontSize() + 'px Arial';
        text = 'T(n) = ½ n - ½ n';
        textWidth = ctx.measureText(text).width;
        ctx.fillText(text, xText - textWidth / 2, yText);
        ctx.font = 'bold ' + parseInt(this.getFontSize() * 0.6, 10)  + 'px Arial';
        ctx.fillText('2', xText + textWidth / 6, yText - h / 50);

        ctx.font = 'bold ' + this.getFontSize() + 'px Arial';
        text = 'Number of passes outer loop';
        textWidth = ctx.measureText(text).width;
        yText = this.paintY(this.getY('N', xPos));
        ctx.fillText(text, xText  - textWidth / 2, yText);
    };

    OU.activity.BubbleSort.prototype.setupGraph = function () {
        var h = this.visualisationLayer.h, // get height
			w = this.visualisationLayer.w, // get width
			yPad = h / 10;

        this.xOffset = w * (this.data.codeWidthScale + 0.05);
        this.xAxisLength = w - this.xOffset - w * 0.07;
        this.yOffset = yPad;
        this.yAxisHeight = h - 2.5 * yPad;

        this.xAxisMin = 1;
        this.xAxisMax = 10;
        this.yAxisMin = 0;
        this.yAxisMax = 45;

        this.radius = w / 100;
    };

    OU.activity.BubbleSort.prototype.paintX = function (x) {
        var xPixelsPerUnit = Math.abs(this.xAxisMax - this.xAxisMin) / this.xAxisLength,
			xPlot = this.xOffset + (x - this.xAxisMin) / xPixelsPerUnit;
        return xPlot;
    };

    OU.activity.BubbleSort.prototype.paintY = function (y) {
        var yPixelsPerUnit = Math.abs(this.yAxisMax - this.yAxisMin) / this.yAxisHeight,
			yPlot = this.yOffset + this.yAxisHeight - (y - this.yAxisMin) / yPixelsPerUnit;
        return yPlot;
    };

    OU.activity.BubbleSort.prototype.graphX = function (x) {
        var xTrue = x - this.xOffset,
			xPixelsPerUnit = Math.abs(this.xAxisMax - this.xAxisMin) / this.xAxisLength,
			xGraph = xTrue * xPixelsPerUnit + this.xAxisMin;
        return xGraph;
    };

    OU.activity.BubbleSort.prototype.graphY = function (y) {
        var yTrue = this.yOffset + this.yAxisHeight - y,
			yPixelsPerUnit = Math.abs(this.yAxisMax - this.yAxisMin) / this.yAxisHeight,
			yGraph = yTrue * yPixelsPerUnit + this.yAxisMin;
        return yGraph;
    };

    OU.activity.BubbleSort.prototype.drawFunc = function (which, ctx) {
		var n,
			xPlot,
			y;

        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = "rgba(0,0,0,1)"; // black outline
        ctx.fillStyle = this.data.colors.code[which];

        for (n = 0; n < this.xAxisLength; n++) {
            xPlot = n + this.xOffset;
            y = this.getY(which, this.graphX(xPlot));
            if (n === 0) {
                ctx.moveTo(xPlot, this.paintY(y));
			} else {
                ctx.lineTo(xPlot, this.paintY(y));
			}
        }
        ctx.lineTo(xPlot, this.paintY(0));
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    };

    OU.activity.BubbleSort.prototype.getY = function (which, x) {
        switch (which) {
		case "O":
			return x * x / 2 - x / 2;
		case "N":
			return x < 1 ? x = 0 : x - 1;
        }
    };

    OU.activity.BubbleSort.prototype.drawIntersect = function (which, x, ctx) {
        ctx.save();

        var visX = this.visualisationLayer.x, // get height
			visY = this.visualisationLayer.y, // get width
			y = this.getY(which, x),
			xPlot = this.paintX(x),
			yPlot = this.paintY(y),
			bottom = this.yOffset + this.yAxisHeight * 1.1,
			text = "<span style='font:bold " + this.getFontSize() + "px Arial;'><i>n</i> = " + x + ", <i>T</i>(<i>n</i>) = " + y + "</span>";

        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        ctx.moveTo(xPlot, this.yOffset);
        ctx.lineTo(xPlot, bottom);

        this.graphDiv.div.innerHTML = text;
        this.graphDiv.resize({
            'x': xPlot + visX - this.graphDiv.div.clientWidth / 2,
            'y': visY + bottom
        });

        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(xPlot, yPlot, this.radius, 0, 2 * Math.PI, false);
        ctx.shadowColor = 'orange';
        ctx.shadowBlur = 10;
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'yellow';
        ctx.stroke();

        ctx.restore();
    };

    OU.activity.BubbleSort.prototype.drawAxes = function (ctx) {
        var rect = [],
			arrowSize,
			text,
			textWidth;

        rect.left = this.xOffset;
        rect.right = this.xOffset + this.xAxisLength * 1.05;
        rect.top = this.yOffset;
        rect.bottom = this.yOffset + this.yAxisHeight; // bottom of arrow
        rect.w = rect.right - rect.left;
        rect.h = rect.bottom - rect.top;

        // Draw background colour
        arrowSize = rect.w / 100;

        ctx.save();

        ctx.strokeStyle = "rgba(0,0,0,1)"; // black outline
        ctx.beginPath();

        ctx.fillText("O", rect.left - 10, rect.top);
        ctx.lineWidth = 2;
        ctx.moveTo(rect.left - arrowSize, rect.top + arrowSize); // down first slope to left side of arrow head
        ctx.lineTo(rect.left, rect.top); // top/centre point of vertically up arrow
        ctx.lineTo(rect.left + arrowSize, rect.top + arrowSize); // down first slope to right side of arrow head

        ctx.moveTo(rect.left, rect.top); // top/centre point of vertically up arrow
        ctx.lineTo(rect.left, rect.bottom); // down first slope to right point of arrow head
        ctx.lineTo(rect.right, rect.bottom); // straight back into arrow shaft
        ctx.lineTo(rect.right - arrowSize, rect.bottom + arrowSize); // straight back into arrow shaft
        ctx.moveTo(rect.right, rect.bottom); // straight back into arrow shaft
        ctx.lineTo(rect.right - arrowSize, rect.bottom - arrowSize); // straight back into arrow shaft

        ctx.closePath();
        ctx.stroke();

        ctx.font = 'bold italic ' + this.getFontSize() + 'px Arial';
        ctx.fillStyle = 'black';
        text = 'n';
        textWidth = ctx.measureText(text).width;
        ctx.fillText(text, rect.right + textWidth / 2, rect.bottom);

        ctx.restore();

        this.drawTicks(ctx);
    };

    OU.activity.BubbleSort.prototype.drawTicks = function (ctx) {
        var x, y, text, textWidth,
			yTick = [10, 20, 30, 40],
			xTick = [1, 4, 7, 10],
			tickSize = this.yAxisHeight / 40,
			numberLeft = tickSize * 1.7,
			numberDown = tickSize * 1.9,
			i,
			j;

        ctx.save();
        ctx.strokeStyle = "rgba(0,0,0,1)"; // black outline
        ctx.font = 'bold italic ' + this.getFontSize() + 'px Arial';
        ctx.fillStyle = 'black';

        for (i = 0; i < yTick.length; i++) {
            x = this.xOffset;
            y = this.paintY(yTick[i]);
            ctx.moveTo(x, y);
            ctx.lineTo(x - tickSize, y);
            text = yTick[i];
            textWidth = ctx.measureText(text).width;
            ctx.fillText(text, x - textWidth - numberLeft, y);
        }
        for (j = 0; j < xTick.length; j++) {
            x = this.paintX(xTick[j]);
            y = this.paintY(0);
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + tickSize);
            text = xTick[j];
            textWidth = ctx.measureText(text).width;
            ctx.fillText(text, x - textWidth / 2, y + numberDown * 1.3);
        }
        ctx.stroke();
        ctx.restore();
    };

    OU.activity.BubbleSort.prototype.drawCode = function () {
        this.visualisationLayer.clear();
    };

    OU.activity.BubbleSort.prototype.isHit = function (x, y, evState) {
        if (this.mode === 'graph') {
            this.nCount = Math.min(this.xAxisMax, Math.max(this.xAxisMin, Math.round(this.graphX(x))));
            this.drawGraph();
        }
    };

    OU.activity.BubbleSort.prototype.getFontSize = function () {
        return parseInt(window.innerHeight / 38, 10);
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
    OU.activity.BubbleSort.prototype.remove = function () {
        OU.activity.BubbleSort.superClass_.remove.call(this); // call the superclass remove
        // *Your removal code here*
        // If you have nothing to remove, then this function can be deleted or commented out
        this.dead = true;
    };

    // call the superclass's constructor
    OU.base(this, data, instance, controller);
};

// Call our inherits function to implement the class inheritance
OU.inherits(OU.activity.BubbleSort, OU.util.Activity);