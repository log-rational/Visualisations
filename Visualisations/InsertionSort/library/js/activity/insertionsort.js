/**
 * @fileOverview InsertionSort - A template for activities that extend the OU.util.Activity class
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
 * @class InsertionSort - A template for activities that extend the OU.util.Activity class
 * @extends OU.util.Activity
 * @param {Object} data - Holds the data content for a specific instance of the activity
 * @param {String} instance - (Optional) A unique identifier name for this instance, defaults to 'a1'
 * @param {OU.util.Controller} controller - (Optional) A reference to the controller that initialised this instance, if undefined, the superclass will generate a new controller and create the reference to it as 'this.controller'
 */
OU.activity.InsertionSort = function (data, instance, controller) {

	/**
	 * canvasView - this is the function that is first called when the activity is launched,
	 *			  assuming you are in a browser that supports canvas.
	 *
	 * Typical tasks for this function are:
	 * <ul>
	 * <li> Define and initialise and activity wide variables</li>
	 * <li> Initialise Layers & Divs</li>
	 * <li> Call a loading function</li>
	 * <li> Initiating the activity by calling any methods that</li>
	 * </ul>
	 */
	OU.activity.InsertionSort.prototype.canvasView = function () {
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
		var bH =  OU.controlHeight; // bad name copied from another module

		// Most activities should have a background layer
		this.bgLayer = new OU.util.Layer({
			container: this
		});

		// create a layer for the visualisation to be "painted" on
		this.visualisationLayer = new OU.util.Layer({
			container: this, // put it in current container
			id: 'visualisationLayer', // give it a meaningful id
			x: this.w * 0.1, // put it a tenth of the width in
			y: this.h * 0.1 + bH, // put it a tenth of the height down plus control height
			w: this.w * 0.8, // 80% width
			h: this.h * 0.6, // 60% height
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

		this.audioElement = document.createElement('audio'); // create the audio element

		this.initControls();  // initialise the controls
		this.resetAnimation(); // reset the visualisation
		this.resize(); // resize to put everything in correst place and relative size

		if (this.audioPlay) {
			this.audioElement.setAttribute('src', this.dataDir + data.intro.audio); // intro audio
			this.audioElement.play(); // play the audio
		}
	};

	// set the number of steps of movement for the animation for swapping bars
	OU.activity.InsertionSort.prototype.setAnimationSteps = function (steps) {
		this.animationSteps = steps; // set the var
		this.initDisplacements(); // calcualate all the animation movement displacements - using cosine for acceleration and deceleration
	};

	// calcualate all the animation movement displacements - using cosine for acceleration and deceleration
	OU.activity.InsertionSort.prototype.initDisplacements = function () {
		var i, inc, total = 0; // total displacement is addition of all steps
		// init animation relative displacements with accelerationa and deceleration
		this.displacements = []; // store the displacements
		for (i = 0; i < this.animationSteps; i++) {
			// use a (1 - cos) function over 360' to create the different displacesments for acceleration and deceleration
			inc = 1 - Math.cos(i / this.animationSteps * 2 * Math.PI);
			////var inc =2*(1 - Math.abs((2* i - animationSteps) / animationSteps)); // triangular "sawtooth" function instead?
			total += inc; // get the total displacement
			this.displacements[i] = total; // store the displacement
		}
		this.displacements.push(this.animationSteps);  // last one is full distance - better this way to avoid rounding errors
	};

	// initialise the controls - buttons and checkbox on bottom of module
	OU.activity.InsertionSort.prototype.initControls = function () {
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

	// Pause/Resume the animation and change the Pause button text to Resume/Pause
	OU.activity.InsertionSort.prototype.pause = function () {
		this.togglePause();
		if (this.audioPlay) { // if switched off
			if (this.paused) { // if paused
				this.audioElement.pause(); // pause the audio to stop playing
			} else {
				this.audioElement.play(); // restart the audio
			}
		}
	};

	OU.activity.InsertionSort.prototype.togglePause = function () {
		this.paused = !this.paused; // toggle pause flag
		this.pauseBtn.value = this.paused ? "Resume" : "Pause";
	};

	// reset the animation by going back to the beginning and randomly sorting the items
	OU.activity.InsertionSort.prototype.resetAnimation = function () {
		this.sortBtn.enable();
		this.pauseBtn.disable();
		this.fastBtn.disable();
		this.fastBtn.value = "Fast";
		if (this.paused) {
			this.togglePause();
		}
		this.current = -1;
		this.animating = -1;
		this.audioElement.pause(); // stop audio playing
		this.dead = true; // kill animation
		this.sorted = true;
		this.position = 0;
		this.initVisualisation(); // initilise visualisation with random order
		this.textDiv.div.innerHTML = this.data.instructions; // re post the intructions
		this.render(); // render the module
	};

	// init the visualisation part
	OU.activity.InsertionSort.prototype.initVisualisation = function () {
		this.initBarHeight(); // calc base bar height
		this.initBars(); // init the bars
		this.initBarGradients(); // init the reflections
	};

	// init the actual pixel count for the base number for heights of bars on screen
	OU.activity.InsertionSort.prototype.initBarHeight = function () {
		this.horizon = this.visualisationLayer.h * 0.73; // horizon for reflection - 73% down
		this.barHeightUnit = this.horizon / (this.barCount + 1); // height for each unit of bar height to multiply
	};

	// initialise the visual bars whcih are sorted into order
	OU.activity.InsertionSort.prototype.initBars = function () {
		var i, j, hue,
			rand, // random number for initialising positions
			pos, // holds the current bar's position
			hue1 = this.hueStart, // paint bars with colours through the rainbow so start at red
			hue2 = this.hueEnd, // and work through to blue
			hueInc = (hue2 - hue1) / this.barCount, // increment through the spectrum divided by the number of bars
			positions = []; // keep note of order positions available for the bars ie 1st to Nth

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

		this.barSave = [];
		this.barSave.height = 0;
	};

	// initialise the gradients which show the reflection of the bars
	// this needs to be done when reseting or resizing
	OU.activity.InsertionSort.prototype.initBarGradients = function () {
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
	OU.activity.InsertionSort.prototype.getRGB = function (h, s, v) {
		var r, g, b, i, f, p, q, t;

	    if (s === 0) {
	        r = g = b = v;
	        return "rgba(" + (Math.round(r * 255)) + "," +
							(Math.round(g * 255)) + "," +
							(Math.round(b * 255) + ",1)");
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
						(Math.round(b * 255) + ",1)"); // return rgb as string with 1 alpha
	};

	/**
	 * The main renderer.
	 */
	OU.activity.InsertionSort.prototype.render = function () {
		this.drawVisualisation(); // draw the bars in current state
	};

	OU.activity.InsertionSort.prototype.drawVisualisation = function () {
		var ctx = this.visualisationLayer.context, // get the graphics context
			h = this.visualisationLayer.h, // get height
			w = this.visualisationLayer.w, // get width
			PAD = w / this.barCount / 8, // the padding space between each bar
			barSpace = (w - 1) / (this.bars.length + 2), // the space needed for each bar including padding
			barWidth = barSpace - PAD, // subtract the padding to give bar width
			halfPad = PAD / 2, // half the padding width is the padding at each side of the bar
			barCount = this.bars.length - 1, // the number of bars to draw
			i,
			outUnit,
			outDisplacement,
			unit,
			displacement,
			inUnit,
			inDisplacement;

		// Draw background colour
		ctx.fillStyle = this.data.backgroundColour;
		ctx.fillRect(0, 0, w, h);

		ctx.fillStyle = this.data.highlight;
		ctx.fillRect(0, 0, barSpace * (this.current + 1), this.horizon + halfPad);

		// draw bars
		for (i = barCount; i >= 0; i--) {  // for each bar from right to left
			if (this.bars[i].height !== 0) {
				this.bars[i].width = barWidth; // set the width of the bar
				this.bars[i].x = barSpace * i + halfPad; // calc the x coord
				this.bars[i].y = this.getBarY(this.bars[i].height); // get y coord from height
			}

			// draw non-moving bars without
			if (this.animating > -1 && this.sorted) { // if still animating but all sorted
				this.drawBar(ctx, this.bars[i], true); // draw bar with "glow""
			} else if (this.animating === -1) {
				this.drawBar(ctx, this.bars[i], false); // draw bar without glow
			} else if (this.action === "save" && i !== this.current) {
				this.drawBar(ctx, this.bars[i], false); // draw bar without glow
			} else if (this.action === "movedown" && i !== this.comparitor && i !== (this.comparitor - 1)) {
				this.drawBar(ctx, this.bars[i], false); // draw bar without glow
			} else if (this.action === "retrieve" && i !== this.comparitor) {
				this.drawBar(ctx, this.bars[i], false); // draw bar without glow
			} else if (this.action === "other") {
				this.drawBar(ctx, this.bars[i], false); // draw bar without glow
			}
		}
		if (this.action === "movedown" || this.action === "nomovedown") {
			this.drawBar(ctx, this.barSave, false); // draw bar without glow
		}

		// draw moving bars
		if (this.animating > -1 && !this.sorted) { // if anmating and not all sorted
			if (this.action === "save") {
				outUnit = (barCount + 2 - this.current) / this.animationSteps; // calc base unit for movement based on distance and number of steps
				outDisplacement =  outUnit * this.displacements[this.animating]; // calc how far to move
				this.barSave.x = barSpace * (this.current + outDisplacement) + halfPad; // calc x coord
				this.drawBar(ctx, this.barSave); // draw the right hand bar
			} else if (this.action === "movedown") {
				unit = 1 / this.animationSteps; // calc base unit for movement based on distance and number of steps
				displacement =  unit * this.displacements[this.animating]; // calc how far to move
				this.bars[this.comparitor].x = barSpace * (this.comparitor - 1 + displacement) + halfPad; // calc x coord
				this.drawBar(ctx, this.bars[this.comparitor]); // draw the right hand bar
			} else if (this.action === "retrieve") {/////
				inUnit = (barCount + 2 - this.comparitor) / this.animationSteps; // calc base unit for movement based on distance and number of steps
				inDisplacement =  inUnit * this.displacements[this.animating]; // calc how far to move
				this.bars[this.comparitor].x = barSpace * (barCount + 2 - inDisplacement) + halfPad; // calc x coord
				this.drawBar(ctx, this.bars[this.comparitor]); // draw the right hand bar
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

	// draw individual bar
	OU.activity.InsertionSort.prototype.drawBar = function (ctx, bar, shadow) {
		var height = bar.height * this.barHeightUnit, // get the drawing height from height of bar and the basic unit
			y = this.horizon - height, // y coord is height above the refelection horizon
			alpha;

		ctx.save(); // drawing and changing context so save last context to restore at end

		ctx.strokeStyle = "#000"; // black outline
		ctx.fillStyle = bar.color; // get fill color

		if (shadow) { // if "glow"
			alpha = 1 - Math.cos(2 * Math.PI * this.animating / this.animationSteps); // alpha depends on animation step for increase and decrease glow as cosine
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
	OU.activity.InsertionSort.prototype.getBarY = function (height) {
		return this.horizon - height;
	};

	// draw a single arrow
	OU.activity.InsertionSort.prototype.drawArrow = function (ctx, bar, color) {
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
		ctx.shadowColor = 'orange'; // glow
		ctx.shadowBlur = 10; // small blur, small glow

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
	OU.activity.InsertionSort.prototype.start = function () {
		// init all the vars to starting values
		this.sortBtn.disable();
		this.pauseBtn.enable();
		this.fastBtn.enable();
		if (this.paused) {
			this.togglePauseBtn();
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
	OU.activity.InsertionSort.prototype.recordSort = function () {
		var i, j, k, save,
			list = [], // list of bar heights from left to right
			total = this.bars.length - 1; // total number of bars which is the number of passes for testing the swaps

		for (k = 0; k < this.bars.length; k++) { // for all the bars
			list[k] = this.bars[k].height; // put in their heights
		}

		this.replay = []; // replay information
		this.replay.push({
			"action": "other",
			"vo": "first"
		}); // record information for swap test

		this.replay.push({
			"action": "other",
			"vo": "second",
			"i": 0,
			"j": 0
		}); // record information for swap test
		for (i = 1; i <= total; i++) { // for all passes
			save = list[i];
			list[i] = ' ';
			this.replay.push({
				"action": "save",
				"i": i,
				"j": j
			}); // record information for swap test
			j = i;
			if (i === 1 && j === 1 && list[j - 1] < save) {
				this.replay.push({
					"action": "nomovedown",
					"i": i,
					"j": j
				}); // record information for swap test
			}
			while (j > 0 && list[j - 1] > save) { // for each pair of bars to test in each pass (bars above total - i are already sorted)
				list[j] = list[j - 1];
				list[j - 1] = ' ';
				this.replay.push({
					"action": "movedown",
					"i": i,
					"j": j
				}); // record information for swap test
				j--;
			}

			list[j] = save;
			this.replay.push({
				"action": "retrieve",
				"i": i,
				"j": j
			}); // record information for swap test
		}
	};

	// the timer loop to create a timeline for replay and animation
	OU.activity.InsertionSort.prototype.renderLoop = function () {
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
	OU.activity.InsertionSort.prototype.step = function () {
		if (this.paused) {// if paused then do nothing
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
	OU.activity.InsertionSort.prototype.replaySort = function () {
        var self = this,
			replay,
			voice,
			temp;

		if (!this.dead && this.stepCount < this.replay.length) { // if not finished and not last step
			replay = this.replay[this.stepCount]; // get the step to replay's information
			voice = replay.vo;

			this.action = replay.action;
			this.current = replay.i;
			this.comparitor = replay.j;

			this.audioToPlay = false;
			switch (this.action) {
			case "save": // swap out
				temp = this.barSave;
				this.barSave = this.bars[this.current];
				this.bars[this.current] = temp;
				this.animating = 0; // first animation step
				switch (this.current) {
				case 1:
					this.playIt("holding");
					break;
				case 2:
					this.playIt("next");
					break;
				case 3:
					this.playIt("proceed");
					break;
				case 4:
					this.playIt("again");
					break;
				case 5:
					this.playIt("continue");
					break;
				case 6:
					this.playIt("repeat");
					break;
				}
				break;

			case "movedown": // move space to left
				temp = this.bars[this.comparitor];
				this.bars[this.comparitor] = this.bars[this.comparitor - 1];
				this.bars[this.comparitor - 1] = temp;
				this.animating = 0; // first animation step
				if (this.current === 1) {
					this.playIt("current");
				}
				break;
			case "nomovedown":
				this.playIt("nomove");
				break;
			case "retrieve": // swap back in
				temp = this.bars[this.comparitor];
				this.bars[this.comparitor] = this.barSave;
				this.barSave = temp;
				this.animating = 0; // first animation step
				if (this.current === 1) {
					this.playIt("vacant");
				}
				if (this.current === 5) {
					this.playIt("point");
				}
				break;
			case "other":
				this.playIt(voice);
				break;
			}

			// show the correct text
			/*if (this.stepCount >= this.goFast) {
				if (this.stepCount === this.goFast) { // if first step after speed up
					this.textDiv.div.innerHTML = this.data.fast.text; // change text to say speeding up
					this.audioElement.setAttribute('src', this.dataDir + this.data.fast.audio); // set audio for same
				}
			}*/
			this.stepCount++; // next step
		} else { // must be all sorted
			this.sorted = true; // set flag
			this.animationSteps = this.animationStepsInit; // reset animation steps for glow animation
			this.animating = 0; // first setp of glow animation
			this.textDiv.div.innerHTML = this.data.sorted.text; // set sorted text
			this.audioElement.setAttribute('src', this.dataDir + this.data.sorted.audio); // do sorted audio
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
			this.checkPause = this.stepCount < this.goFast && this.action !== "movedown" ? this.checkPauseMute : 0; // set the pause - none if sped up
		}
	};

	OU.activity.InsertionSort.prototype.playIt = function (part) {
		this.audioElement.setAttribute('src', this.dataDir + data[part].audio); // set the is sorted audio to no
		this.textDiv.div.innerHTML = this.data[part].text;
		this.checkPause = this.data[part].pause; // pause for audio
		this.audioToPlay = true;
	};

	// speed up button clicked
	OU.activity.InsertionSort.prototype.speedUp = function () {
		if (!this.sorted) { // only speed up if not finished
			if (this.animationSteps === this.speedSteps) {
				this.setAnimationSteps(this.animationStepsInit);
				this.goFast = this.goFastInit;
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
	OU.activity.InsertionSort.prototype.animatingFinished = function () {
		this.step(); // do one more step
	};


	// audio checkbox clicked
	OU.activity.InsertionSort.prototype.toggleAudio = function () {
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
	OU.activity.InsertionSort.prototype.accessibleView = function () {
		OU.activity.InsertionSort.superClass_.accessibleView.call(this); // call the superclass method is you want to extend it, remove this line to override the method instead

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
	OU.activity.InsertionSort.prototype.resize = function () {
		OU.activity.InsertionSort.superClass_.resize.call(this); // call the superclass resize

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

		// init the bar heights and gradients to take change into account
		this.initBarHeight();
		this.initBarGradients();

		// render whole thing
		this.render();
	};

	OU.activity.InsertionSort.prototype.playAudio = function (audioFile) {
		if (this.audioPlay) {
			this.audioElement.setAttribute('src', this.dataDir + audioFile); // intro audio
			this.audioElement.play(); // play the audio
		}
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
	OU.activity.InsertionSort.prototype.remove = function () {
		OU.activity.InsertionSort.superClass_.remove.call(this); // call the superclass remove
		// *Your removal code here*
		// If you have nothing to remove, then this function can be deleted or commented out
		this.dead = true;
	};

	// call the superclass's constructor
	OU.base(this, data, instance, controller);
};

// Call our inherits function to implement the class inheritance
OU.inherits(OU.activity.InsertionSort, OU.util.Activity);