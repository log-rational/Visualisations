/**
 * @fileOverview Recursion
 *
 * @author Esther Loeliger <estherloeliger@gmail.com>
 */

// Load in any util elements that are required
OU.require('OU.util.Layer');
OU.require('OU.util.HtmlBox');
OU.require('OU.util.InfoButton');
OU.require('OU.util.PopUpInfo');
OU.require('OU.util.Div');

/**
 * @class Recursion
 * @extends OU.util.Activity
 * @param {Object} data - Holds the data content for a specific instance of the activity
 * @param {String} instance - (Optional) A unique identifier name for this instance, defaults to 'a1'
 * @param {OU.util.Controller} controller - (Optional) A reference to the controller that initialised this instance, if undefined, the superclass will generate a new controller and create the reference to it as 'this.controller'
 */

var STATE_PAUSED = 0;
var STATE_RUNNING = 1;

OU.activity.Recursion = function(data, instance, controller) {
	OU.activity.Recursion.prototype.canvasView = function() {
		var bh = OU.controlHeight;
		var self = this;

		var startOffset = data.startOffset || 0;

		//start in paused mode
		this.state = STATE_PAUSED;

		//initialize step index and count
		this.steps = data.steps.length;

		//fast animation flag
		this.fastAnimation = false;

		//default shuffle state
		this.shuffleOnReset = false;

		//global steps management
		this.globalSteps = this.data.steps;
		this.globalStepIndex = 0;

		//limit stack size
		this.maxStackSize = 8;

		//base step delay
		this.delay = 2000;

		//background
		this.bgLayer = new OU.util.Layer({
			x : 0,
			y : 0,
			h : 4 * bh,
			w : this.w,
			container : this,
			hasEvents : true
		});
		this.bgLayer.context.gradRect();

		this.codeWidth = 400;
		this.codeHeight = 200;
		this.stackWidth = 400;
		this.stackHeight = 200;
		this.overlap = 0;

		//manage top left corners of drawing areas
		this.codeAdjX = 0;
		this.codeAdjY = 0;
		this.stackAdjX = 0;
		this.stackAdjY = 0;

		//set up the global color map
		this.colorMap = { };
		for (var i = 0; i < this.maxStackSize; i++) {
			var frac = (i + 1) * 1.0 / this.maxStackSize * 1.0;
			var col = this.getColorHexHSV(frac * 255, 1.0, 1.0);
			this.colorMap[i] = col;
		}

		//control dimensions
		this.buttonWidth = 200;

		//responsive design or fixed
		this.forcePortrait = this.data.forcePortrait || false;

		this.descriptionDiv = new OU.util.Div({
			container : this,
			x : 0,
			y : 0,
			h : 0,
			w : 0,
			showScroll : true,
			hasEvents : true,
			overflow : "auto",
			zIndex : 999
		});
		this.descriptionDiv.div.innerHTML = data.title + data.steps[0].description;

		this.modelLayer = new OU.util.Layer({
			container : this,
			id : 'model-layer',
			x : 0,
			y : 4 * bh + this.codeHeight,
			w : this.w,
			h : this.h - 5 * bh,
			hasEvents : true
		});

		this.codeDiv = new OU.util.Div({
			container : this.modelLayer,
			x : 0,
			y : 0,
			h : "auto",
			w : this.w,
			overflow : "overflow",
			showScroll : true
		});
		this.codeDiv.div.innerHTML = "";

		this.stackDiv = new OU.util.Div({
			container : this.modelLayer,
			x : 0,
			y : 0,
			h : "auto",
			w : this.w,
			overflow : "overflow",
			showScroll : true
		});
		this.stackDiv.div.innerHTML = "";

		var self = this;
		if (this.data.info !== undefined) {
			this.infoButton = new OU.util.InfoButton({
				layer : this.bgLayer, //modelLayer,
				x : 5,
				y : 5,
				w : 32,
				h : 32,
				autoWidth : false,
				padding : 10,
				onClick : function() {
					new OU.util.PopUpInfo({
						container : self,
						txt : self.data.info,
						x : self.w * .20,
						y : self.h * .15,
						w : self.w * .6,
						h : self.h * .7,
						onClose : function() {
						}
					});
				}
			});
			this.hasInfo = true;
		}

		this.ctx = this.modelLayer.context;

		// create the audio element
		this.audioElement = document.createElement('audio');

		this.initControls();

		//now pull in step data
		this.loadStep(this.data.steps[this.data.startOffset]);
		this.prevButton.disable();
		//already at beginning

		//render everything
		this.resize();
	};

	OU.activity.Recursion.prototype.loadStep = function(step) {
		var self = this, bh = OU.controlHeight;

		if (step == undefined) {
			return;
		}

		//stop any sound that's playing
		this.audioElement.pause();

		var codeMarkup = "<div id='codeId'><pre><code>";
		if (step.codeLines.length > 0) {
			for (var i = 0, count = step.codeLines.length; i < count; i++) {

				//manage highlight
				var highlightStart = "";
				var highlightEnd = "";

				var color = step.codeHighlights[i];
				if (color != undefined) {
					highlightStart = "<span style=\"font-family:courier; background:" + color + "\">";
					highlightEnd = "</span>";
				}
				else
				{
					highlightStart = "<span class='line'>";
					highlightEnd = "</span>";
				}

				//no blank line at start
				if (i > 0) {
					codeMarkup += "\n";
				}

				var line = step.codeLines[i];
				var ws = 0;
				var copy = line;
				while (copy.charAt(0) === "\t" || copy.charAt(0) === " ") {
					ws++;
					copy = copy.substr(1);
				}

				var s = line.substr(0, ws) + highlightStart + line.substr(ws) + highlightEnd;

				codeMarkup += s;
			}
			codeMarkup += "\n</code></pre></div>";
		}

		this.codeDiv.div.innerHTML = codeMarkup;
		//run highlight.js
		hljs.highlightBlock(this.codeDiv.div);

		var stackMarkup = "<div id='stackId'>";
		var stackOffset = step.stackOffset || 0;
		if (step.stack.length > 0) {

			for (var i = step.stack.length - 1; i >= 0; i--) {
				var color = this.colorMap[i + stackOffset];
				stackMarkup += "<div class=\"custom-highlight\" style=\"background:" + color + ";font-family:monotype;\">";
				stackMarkup += step.stack[i];
				stackMarkup += "</div>";
			}

			stackMarkup += "</div>";
		} else {
			//draw empty stack indicator
			if (step.codeLines.length > 0) {
				stackMarkup += "<div id='stack'><span style='color: grey; background: white; border-color: grey; border-style: dotted; border-width: 2px;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Stack empty&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>";
			}
		}

		this.stackDiv.div.innerHTML = stackMarkup;

		var tmp = data.title;
		tmp = tmp.replace("</h2>", " (" + (this.globalStepIndex + 1) + "/" + this.globalSteps.length + ")</h2>");

		this.descriptionDiv.div.innerHTML = tmp + step.description;

		//control animation speed
		var fastAnimationMemory = this.fastAnimation;
		if (step.animation != undefined && step.animation.fast != undefined && step.animation.fast == true) {
			this.fastAnimation = true;
		}

		this.fastAnimation = fastAnimationMemory;
		
		//play step audio
		if (this.audioPlay) {
			if (step.audio != undefined && step.audio.indexOf(".mp3") != -1) {
				this.audioElement.src = step.audio;
				this.audioElement.play();
			}
		}

		this.resize();
	};

	/*
	 * pad array a to length len with value val
	 */
	OU.activity.Recursion.prototype.padArray = function(a, len, val) {
		while (a.length < len) {
			a.push(val);
		}
		return a.slice(0);
	}

	OU.activity.Recursion.prototype.initControls = function() {
		var bh = OU.controlHeight, self = this;

		//taken from InsertionSort
		var btnSpace = 100 / 5;
		var btnWidth = btnSpace * 0.9;
		var cssWidth = "width:" + btnWidth + "%;";
		var xPad = btnSpace * 0.05;
		var btnTop = 92.5;
		//91;

		this.prevButton = Utils.newButton(// init sort button
		(btnSpace * 0 + xPad) + "%", btnTop + "%", //left,top
		"Previous", function() {
			self.prevButtonPressed();
		}, cssWidth, //specific css
		'b', //default a tag, b button, r radio, "c" checkbox
		"prevButton" //component id
		);

		this.nextButton = Utils.newButton((btnSpace * 1 + xPad) + "%", btnTop + "%", "Next", function() {
			self.nextButtonPressed();
		}, cssWidth, 'b', "nextButton");

		this.resetButton = Utils.newButton((btnSpace * 2 + xPad) + "%", btnTop + "%", "Reset", function() {
			self.resetButtonPressed();
		}, cssWidth, 'b', "resetButton");

		this.audioButton = Utils.newButton(// init the audio checkbox button
		(btnSpace * 3 + xPad) + "%", (btnTop) + "%", //left,top
		"Audio", function() {
			self.audioButtonPressed();
		}, cssWidth, "c", "audioButton");

		this.audioButton.checked = true;
		this.audioPlay = true;
		// toggle var to play audio

		var clickable = this.modelLayer.events.clickable;
		clickable.length = 0;
		clickable.push(this.infoButton);
	};

	//HTML button handlers
	OU.activity.Recursion.prototype.prevButtonPressed = function() {
		if (this.globalStepIndex == 0) {
			return;
		}

		this.globalStepIndex = this.globalStepIndex - 1;

		if (this.globalStepIndex <= 0) {
			this.prevButton.disable();
		} else {
			this.prevButton.enable();
		}

		if (this.globalStepIndex >= this.globalSteps.length - 1) {
			this.nextButton.disable();
		} else {
			this.nextButton.enable();
		}

		this.loadStep(this.globalSteps[this.globalStepIndex]);
	};

	OU.activity.Recursion.prototype.nextButtonPressed = function() {
		if (this.globalStepIndex > this.globalSteps.length - 1) {
			return;
		}

		this.globalStepIndex = this.globalStepIndex + 1;

		if (this.globalStepIndex >= this.globalSteps.length - 1) {
			this.nextButton.disable();
		} else {
			this.nextButton.enable();
		}

		if (this.globalStepIndex <= 0) {
			this.prevButton.disable();
		} else {
			this.prevButton.enable();
		}
		this.loadStep(this.globalSteps[this.globalStepIndex]);
	};

	OU.activity.Recursion.prototype.resetButtonPressed = function() {
		//no random button, so no need to refresh this.globalSteps

		this.globalStepIndex = this.data.startOffset;
		this.loadStep(this.globalSteps[this.data.startOffset]);
		//set to 0 in data on release
		this.prevButton.disable();
		//already at start
		this.nextButton.enable();
		this.resize();
	};

	OU.activity.Recursion.prototype.audioButtonPressed = function() {
		this.audioPlay = !this.audioPlay;

		if (this.audioPlay == false) {
			this.audioElement.pause();
		}
	};

	OU.activity.Recursion.prototype.accessibleView = function() {
		OU.activity.Recursion.superClass_.accessibleView.call(this);
	};

	OU.activity.Recursion.prototype.resize = function() {
		var bh = OU.controlHeight;

		OU.activity.Recursion.superClass_.resize.call(this);

		this.bgLayer.resize();
		this.bgLayer.context.gradRect();

		this.descriptionDiv.slideTo({
			"x" : 50,
			"y" : 0,
			"w" : this.w - 100,
			"h" : 4.25 * bh
		});

		this.modelLayer.resize({
			x : 5,
			y : 4 * bh, // + this.codeHeight,
			w : this.w - 10,
			h : this.h - 5 * bh//this.codeHeight
		});

		this.render();
	};

	OU.activity.Recursion.prototype.render = function() {
		var ctx = this.ctx, bh = OU.controlHeight, stageHeight = this.h - bh;
		ctx.font = 'bold 14px Arial';

		//layout is side by side in landscape, top and bottom in portrait orientation
		this.stackHeight = 170 + this.globalSteps[this.globalStepIndex].stack.length * 30;
		//table-based + multiline

		//code - to compensate for long descriptions at the top, add 2 * bh to adjY if possible
		if (this.forceLandscape == true || (this.w > this.h && this.forcePortrait == false)) {
			this.codeAdjX = 5;
			this.codeAdjY = 4 * bh;
		} else {
			this.codeAdjX = (this.w > this.codeWidth) ? this.w / 2 - this.codeWidth / 2 : 0;
			this.codeAdjY = stageHeight - this.stackHeight - 3.5 * bh - this.codeHeight;
		}

		this.renderCode();

		//stack
		if (this.forceLandscape == true || (this.w > this.h && this.forcePortrait == false)) {
			this.stackAdjX = 5 + this.codeWidth + 10;
			this.stackAdjY = (stageHeight > this.stackHeight) ? stageHeight / 2 - this.stackHeight / 2 + 3 * bh : 0;
		} else {
			this.stackAdjX = (this.w > this.stackWidth) ? this.w / 2 - this.stackWidth / 2 : 0;
			this.stackAdjY = stageHeight - this.stackHeight - 1 * bh;
		}

		this.renderStack();

		this.infoButton.render();
	};

	OU.activity.Recursion.prototype.renderCode = function() {
		this.codeDiv.slideTo({
			"x" : this.codeAdjX,
			"y" : this.codeAdjY,
			"w" : this.codeWidth,
			"h" : this.codeHeight
		});
	};

	OU.activity.Recursion.prototype.renderStack = function() {
		this.stackDiv.slideTo({
			"x" : this.stackAdjX,
			"y" : this.stackAdjY,
			"w" : this.stackWidth,
			"h" : this.stackHeight
		});
	};

	OU.activity.Recursion.prototype.remove = function() {
		OU.activity.Recursion.superClass_.remove.call(this);
	};

	OU.activity.Recursion.prototype.showMessage = function(buffer) {
		var el = document.getElementById("messageDiv");
		el.innerHTML = buffer;
		el.style.display = "block";
	};

	// ported from here:
	//http://www.cs.rit.edu/~ncs/color/t_convert.html
	OU.activity.Recursion.prototype.getColorHexHSV = function(h, s, v) {
		var r, g, b;
		var i;
		var f, p, q, t;

		if (s == 0) {
			r = g = b = v;
			return "rgba(" + (Math.round(r * 255)) + "," + (Math.round(g * 255)) + "," + (Math.round(b * 255) + ",1)");
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
			default:
				// case 5:
				r = v;
				g = p;
				b = q;
				break;
		}

		return "rgba(" + (Math.round(r * 255)) + "," + (Math.round(g * 255)) + "," + (Math.round(b * 255) + ",0.3)");
	};

	// call the superclass's constructor
	OU.base(this, data, instance, controller);
};
OU.inherits(OU.activity.Recursion, OU.util.Activity);
