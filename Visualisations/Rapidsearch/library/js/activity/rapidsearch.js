/**
 * @fileOverview simple search activity
 *
 * @author Esther Loeliger <estherloeliger@gmail.com>
 * layout and color handling based on bubblesort.js by
 * @author Callum Lester <callum.lester@open.ac.uk>
 */

// Load in any util elements that are required
OU.require('OU.util.Layer');
OU.require('OU.util.HtmlBox');
OU.require('OU.util.InfoButton');
OU.require('OU.util.PopUpInfo');
OU.require('OU.util.Div');

/**
 * @class RapidSearch
 * @extends OU.util.Activity
 * @param {Object} data - Holds the data content for a specific instance of the activity
 * @param {String} instance - (Optional) A unique identifier name for this instance, defaults to 'a1'
 * @param {OU.util.Controller} controller - (Optional) A reference to the controller that initialised this instance, if undefined, the superclass will generate a new controller and create the reference to it as 'this.controller'
 */

OU.activity.RapidSearch = function(data, instance, controller) {
	OU.activity.RapidSearch.prototype.canvasView = function() {
		var bh = OU.controlHeight;
		var self = this;

		//audio defaults to on
		this.audioPlay = true;

		//arrows
		this.arrows = [];

		//radius
		this.radius = 20;

		//optional hiding of top array (to create room for copy)
		this.hideArray = false;

		//glow array
		this.glow = [];

		//default shuffle state
		this.shuffleOnReset = false;
		this.forceStartDisabled = false;
		//required for dynamically generated single-step sequences

		//global steps management
		this.globalSteps = this.data.steps;
		this.globalStepIndex = 0;

		this.globalRotationArray = [];

		//background
		this.bgLayer = new OU.util.Layer({
			container : this
		});
		this.bgLayer.context.gradRect();

		this.arrayWidth = 500;
		this.arrayHeight = bh;
		this.overlap = 0;

		//manage top left corners of drawing areas
		this.arrayAdjX = 0;
		this.arrayAdjY = 0;

		//animation settings plus temp storage between loadStep and resize/render
		this.animations = [];

		//control dimensions
		this.buttonWidth = 200;

		//responsive design or fixed
		this.forcePortrait = this.data.forcePortrait || false;

		//default label array
		this.allLabels = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"];

		this.descriptionDiv = new OU.util.Div({
			container : this,
			x : 0,
			y : 0,
			h : "50px",
			w : this.w,
			showScroll : true
		});

		this.descriptionDiv.div.innerHTML = data.title + data.steps[0].description;

		this.captionDiv = new OU.util.Div({
			container : this,
			x : 0,
			y : this.h - 2 * bh,
			w : this.w
		});

		this.modelLayer = new OU.util.Layer({
			container : this,
			id : 'model-layer',
			x : 0,
			y : bh,
			w : this.w,
			h : this.h - bh,
			hasEvents : true
		});

		var self = this;
		if (this.data.info !== undefined) {
			this.infoButton = new OU.util.InfoButton({
				layer : this.modelLayer,
				x : 16,
				y : 16,
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

		this.searchArray = new OU.util.BoxArray({
			"context" : this.ctx,
			"object" : this,
			"x" : 100,
			"y" : 100,
			"w" : this.arrayWidth,
			"h" : this.arrayHeight,
			"overlap" : this.overlap
		});

		this.targetArray = new OU.util.BoxArray({
			"context" : this.ctx,
			"object" : this,
			"x" : 100,
			"y" : 100,
			"w" : this.arrayWidth,
			"h" : this.arrayHeight,
			"overlap" : this.overlap,
			"hideEmptyCells" : true
		});

		this.target2Array = new OU.util.BoxArray({
			"context" : this.ctx,
			"object" : this,
			"x" : 100,
			"y" : 100,
			"w" : this.arrayWidth,
			"h" : this.arrayHeight,
			"overlap" : this.overlap,
			"hideEmptyCells" : true
		});

		this.resultsArray = new OU.util.BoxArray({
			"context" : this.ctx,
			"object" : this,
			"x" : 100,
			"y" : 100,
			"w" : this.arrayWidth,
			"h" : this.arrayHeight,
			"overlap" : this.overlap,
			"hideEmptyCells" : true
		});

		this.searchArrayValues = [];
		this.targetArrayValues = [];
		this.target2ArrayValues = [];
		this.resultsArrayValues = [];

		// create the audio element
		this.audioElement = document.createElement('audio');

		this.initControls();
		this.prevButton.disable();

		//populate values
		this.resize();

		//now pull in step data
		var startOffset = data.startOffset || 0;
		this.globalStepIndex = startOffset;
		this.loadStep(this.data.steps[this.globalStepIndex]);

		//render everything
		this.resize();
	};

	OU.activity.RapidSearch.prototype.loadStep = function(step) {
		var self = this, bh = OU.controlHeight;

		if (step == undefined) {
			//console.log("step undefined");
			return;
		}

		//pause all running audio
		this.audioElement.pause();

		this.searchArray.clearHighlights();
		this.targetArray.clearHighlights();

		var title = data.title;
		title = title.replace("</h2>", " (" + (this.globalStepIndex + 1) + "/" + this.globalSteps.length + ")</h2>");

		this.descriptionDiv.div.innerHTML = title + step.description;

		if (step.caption != undefined && step.caption.length > 0) {
			this.captionDiv.div.innerHTML = step.caption;
		}

		if (step.clearArray) {
			this.searchArray.clearValues();
			this.targetArray.clearValues();
		}

		//load array values if any
		if (step.searchArrayValues != undefined) {
			this.searchArrayValues = step.searchArrayValues;
		}

		if (step.targetArrayValues != undefined) {
			this.targetArrayValues = step.targetArrayValues;
		}

		if (step.target2ArrayValues != undefined) {
			this.target2ArrayValues = step.target2ArrayValues;
		}

		if (step.resultsArrayValues != undefined) {
			this.resultsArrayValues = step.resultsArrayValues;
		}

		this.colorMap = { };

		var maxVal = 99;
		for (var i = 0; i < 100; i++) {
			var frac = (i + 1) * 1.0 / maxVal * 1.0;
			var col = this.getColorHexHSV(frac * 255, 1.0, 1.0);
			this.colorMap[i] = col;
		}

		this.searchArray.setData({
			"values" : this.searchArrayValues,
			"colorMap" : this.colorMap
		});

		this.targetArray.setData({
			"values" : this.targetArrayValues,
			"colorMap" : this.colorMap
		});

		this.target2Array.setData({
			"values" : this.target2ArrayValues,
			"colorMap" : this.colorMap
		});

		this.resultsArray.setData({
			"values" : this.resultsArrayValues,
			"colorMap" : {}
		});

		if (step.searchArrayHighlights) {
			this.searchArray.setHighlights(step.arrayHighlights);
		}

		if (step.targetArrayHighlights) {
			this.targetArray.setHighlights(step.targetArrayHighlights);
		}

		if (step.resultsArrayHighlights) {
			this.resultsArray.setHighlights(step.resultsArrayHighlights);
		}

		this.searchArray.setGlow((step.glow) ? step.glow : []);
		this.targetArray.setGlow((step.glow) ? step.glow : []);

		this.searchArray.setAuxValues(this.data.searchAux);
		this.targetArray.setAuxValues((step.targetAuxArrayValues) ? step.targetAuxArrayValues : []);
		this.target2Array.setAuxValues((step.target2AuxArrayValues) ? step.target2AuxArrayValues : []);

		this.targetArray.setAuxLabel((step.auxLabel) ? step.auxLabel : "");
		this.searchArray.setLabel((step.searchArrayLabel) ? step.searchArrayLabel : "");
		this.targetArray.setLabel((step.targetArrayLabel) ? step.targetArrayLabel : "");

		this.searchArray.setDisabledFrom((step.searchArrayDisabledFrom != undefined) ? step.searchArrayDisabledFrom : 999);
		this.targetArray.setDisabledFrom((step.targetArrayDisabledFrom != undefined) ? step.targetArrayDisabledFrom : 999);
		this.target2Array.setDisabledFrom((step.target2ArrayDisabledFrom != undefined) ? step.target2ArrayDisabledFrom : 999);

		this.searchArray.setAuxHighlights((step.searchAuxArrayHighlights) ? step.searchAuxArrayHighlights : []);
		this.targetArray.setAuxHighlights((step.targetAuxArrayHighlights) ? step.targetAuxArrayHighlights : []);

		if (step.arrows != undefined) {
			this.arrows = step.arrows.slice(0);
		}

		if (step.transpose != undefined) {
			var offset = step.transpose;
			var layer = 0;
			var gapArray = [];
			for (var i = 0; i < this.targetArrayValues.length; i++) {
				var val = this.targetArrayValues[i];

				gapArray.push(-1);
				//has to match length of input

				if (val == -1) {
					continue;
				}
				var dims1 = this.targetArray.dims(i);
				var dims2 = this.targetArray.dims(i + offset);

				var xOffset = this.targetArray.boxWidth() / 2;
				var yOffset = bh / 2;
				this.setAnimation(val, dims1.x + xOffset, dims1.y + yOffset, dims2.x + xOffset, dims2.y + yOffset, layer++);
			}

			this.targetArray.setData({
				values : gapArray.slice(0),
				labels : gapArray.slice(1),
				colorMap : this.colorMap
			});
			this.targetArray.setLabel(step.targetArrayLabel);
		}

		if (this.audioPlay) {
			if (step.audio != undefined && step.audio.indexOf(".mp3") != -1) {
				this.audioElement.src = step.audio;
				this.audioElement.play();
			}
		}
		//push happens with time delay - set tree values for immediate painting
		var delay = 500;

		var colorMap = this.colorMap;

		if (step.refresh != undefined && step.refresh != null) {
			setTimeout(function() {
				self.refresh(self, step.refresh, colorMap);
				self.prevButton.enable();
				self.nextButton.enable();
			}, delay);

		}

		this.hideArray = (step.hideArray != undefined && step.hideArray == true) ? true : false;

		this.resize();
	};

	/*
	 * pad array a to length len with value val
	 */
	OU.activity.RapidSearch.prototype.padArray = function(a, len, val) {
		while (a.length < len) {
			a.push(val);
		}
		return a.slice(0);
	}
	/*
	 * filter array a dropping value val
	 */
	OU.activity.RapidSearch.prototype.filterArray = function(a, val) {
		var b = [];
		for (var i = 0, count = a.length; i < count; i++) {
			if (a[i] != val) {
				b.push(a[i]);
			}
		}

		return b.slice(0);
	}
	/*
	 * refreshes arrays
	 */

	OU.activity.RapidSearch.prototype.refresh = function(self, obj, colorMap) {
		self.searchArray.setData({
			values : obj.searchArrayValues,
			colorMap : colorMap
		});

		this.searchArray.setAuxValues(this.data.searchAux);

		if (obj.searchArrayLabel) {
			self.searchArray.setLabel(obj.searchArrayLabel);
		}

		self.targetArray.setData({
			values : obj.targetArrayValues,
			colorMap : colorMap
		});

		self.targetArray.setAuxValues(obj.targetAuxArrayValues);

		if (obj.targetArrayLabel) {
			self.targetArray.setLabel(obj.targetArrayLabel);
		}

		self.target2Array.setAuxValues(obj.target2AuxArrayValues);

		self.target2Array.setData({
			values : obj.target2ArrayValues,
			colorMap : colorMap
		});

		self.resultsArray.setData({
			values : obj.resultsArrayValues,
			colorMap : {}
		});

		self.resultsArray.setHighlights(obj.resultsArrayHighlights);

		this.animations = [];

		self.resize();
	};

	/*
	 * sets off single-object animation
	 */
	OU.activity.RapidSearch.prototype.setAnimation = function(txt, x1, y1, x2, y2, layer, highlight) {
		if (x1 == undefined || y1 == undefined || x2 == undefined || y2 == undefined) {
			//console.log("setAnimation: p1 or p2 undefined");
			return;
		}

		if (layer == undefined) {
			layer = 0;
		}

		if (highlight == undefined) {
			highlight = false;
		}

		this.animations[layer] = {
			"text" : txt,
			"textWidth" : this.ctx.measureText(txt).width,
			"highlight" : highlight,
			"p1" : {
				x : x1,
				y : y1
			},
			"p2" : {
				x : x2,
				y : y2
			},
			"pa" : {
				x : x1,
				y : y1
			},
		};
		this.animate(this, layer, highlight);
	};

	/*
	 * low level recursive animation
	 */
	OU.activity.RapidSearch.prototype.animate = function(self, layer, highlight) {

		if (layer == undefined) {
			//console.log("animate: layer undefined");
			return;
		}

		if (self.animations.length == 0) {
			return;
		}

		if (self.animations[layer].p1 == undefined || self.animations[layer].p2 == undefined) {
			//console.log("animate: p1 and/or p2 undefined");
			self.clearAnimation(layer);
			return;
		}

		var dx = Math.abs(self.animations[layer].p1.x - self.animations[layer].p2.x);
		var dy = Math.abs(self.animations[layer].p1.y - self.animations[layer].p2.y);

		//check values
		if (isNaN(dx) || isNaN(dy) || dx == undefined || dy == undefined || dx == null || dy == null) {
			//console.log("animate: dx/dy invalid - p2.x = " + self.animations[layer].p2.x + "; p2.y = " + self.animations[layer].p2.y);
			return;
		}

		var step = dx / 15;

		var dRemaining = Math.abs(self.animations[layer].pa.x - self.animations[layer].p2.x);

		if (dRemaining < step) {
			self.clearAnimation(layer);
			return;
		}

		if (self.animations[layer].pa.x > self.animations[layer].p2.x) {
			self.animations[layer].pa.x -= step;
		} else {
			self.animations[layer].pa.x += step;
		}

		//calculate this.animation.pa.y
		self.animations[layer].pa.y = ((self.animations[layer].pa.x - self.animations[layer].p1.x) / (self.animations[layer].p2.x - self.animations[layer].p1.x)) * (self.animations[layer].p2.y - self.animations[layer].p1.y) + self.animations[layer].p1.y;

		//only call for last layer
		self.resize();

		setTimeout(function() {
			self.animate(self, layer);
		}, 15);
	};

	OU.activity.RapidSearch.prototype.clearAnimation = function(layer) {
		this.animations[layer] = { };
	};

	OU.activity.RapidSearch.prototype.initControls = function() {
		var bh = OU.controlHeight, self = this;

		//taken from InsertionSort
		var btnSpace = 100 / 5;
		var btnWidth = btnSpace * 0.9;
		var cssWidth = "width:" + btnWidth + "%;";
		var xPad = btnSpace * 0.05;
		var btnTop = 91;

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

		this.randomButton = Utils.newButton((btnSpace * 3 + xPad) + "%", btnTop + "%", "Random", function() {
			self.randomButtonPressed();
		}, cssWidth, "c", "randomButton");

		this.audioButton = Utils.newButton(// init the audio checkbox button
		(btnSpace * 3.7 + xPad) + "%", (btnTop) + "%", //left,top
		"Audio", function() {
			self.audioButtonPressed();
		}, cssWidth, "c", "audioButton");

		this.randomButton.checked = false;
		this.audioButton.checked = true;
		this.audioPlay = true;
		// toggle var to play audio

		var clickable = this.modelLayer.events.clickable;
		clickable.length = 0;
		clickable.push(this.infoButton);
	};

	/*
	 * button handlers
	 */
	OU.activity.RapidSearch.prototype.prevButtonPressed = function() {
		if (this.globalStepIndex == 0) {
			return;
		}

		this.globalStepIndex = this.globalStepIndex - 1;

		if (this.globalStepIndex == 0) {
			this.prevButton.disable();
			this.nextButton.enable();
		} else {
			this.prevButton.enable();
			this.nextButton.enable();
		}

		this.loadStep(this.globalSteps[this.globalStepIndex]);
	};

	OU.activity.RapidSearch.prototype.nextButtonPressed = function() {
		if (this.globalStepIndex >= this.globalSteps.length - 1) {
			return;
		}

		this.globalStepIndex = this.globalStepIndex + 1;

		if (this.globalStepIndex >= this.globalSteps.length - 1) {
			this.nextButton.disable();
			this.prevButton.enable();
		} else {
			this.nextButton.enable();
			this.prevButton.enable();
		}
		this.loadStep(this.globalSteps[this.globalStepIndex]);
	};

	OU.activity.RapidSearch.prototype.resetButtonPressed = function() {
		this.globalStepIndex = 0;

		this.globalSteps = (this.shuffleOnReset) ? this.getRandomizedSteps() : this.data.steps.slice(0);

		this.prevButton.disable();
		this.nextButton.enable();

		this.loadStep(this.globalSteps[this.globalStepIndex]);
	};

	OU.activity.RapidSearch.prototype.randomButtonPressed = function() {
		this.shuffleOnReset = !this.shuffleOnReset;
		this.prevButton.disable();
		this.nextButton.disable();
	};

	OU.activity.RapidSearch.prototype.audioButtonPressed = function() {
		this.audioPlay = !this.audioPlay;

		if (this.audioPlay == false) {
			this.audioElement.pause();
		}
	};

	/*
	 * return DNA fragment string
	 * imitate distribution found in scripted sample
	 */
	OU.activity.RapidSearch.prototype.getDnaFragment = function() {
		var rand = Math.floor(Math.random() * 99);
		if (rand <= 35) {
			return "G";
		} else if (rand <= 70) {
			return "T";
		} else if (rand <= 90) {
			return "A";
		}
		return "C";
	};

	OU.activity.RapidSearch.prototype.getRandomizedSteps = function() {
		//randomise value array
		var s = [];
		//search array
		var t = [];
		//target array
		var aux = [];
		
		var arrayLength = 24;

		//populate s with genome-like values
		for (var i = 0; i < arrayLength; i++) {
			s.push(this.getDnaFragment());
		}

		//target
		var t = ["G", "T", "G"];
		var targetLength = t.length;
		
		//result array
		var res = [-999, 1, 2];

		t = this.padArray(t, arrayLength, -1);
		res = this.padArray(res, arrayLength, -1);

		//now build steps
		var steps = [];

		var step = {
			clearArray : true,
			searchArrayValues : s.slice(0),
			searchArrayLabel : "Search string:",
			targetArrayValues : t.slice(0),
			targetArrayLabel : "Target string:",
			targetAuxArrayValues : [],
			searchAuxArrayValues : this.searchAux,
			searchArrayHighlights : [],
			targetArrayHighlights : [],
			resultsArrayValues : res.slice(0),
			auxLabel : "",
			description : "<h3>Knuth–Morris–Pratt string searching with randomised search strings</h3><p>Reset the visualisation to generate new randomised search string.</p>"
		};
		steps.push(step);

		var completeMatch = false;

		//now go through the string one character at a time
		for (var i = 0; i <= (s.length - targetLength); i++) {
			if (i > 0) {
				t.unshift(-1);
				t.pop();
				
				res.unshift(-1);
				res.pop();
			}

			var aux = [];
			var matches = [];
			var mismatch = -1;

			var partialMatch = false;
			for (var j = 0; j < s.length; j++) {
				if (t[j] == -1) {
					if (partialMatch != true) {
						aux.push(-1);
					} else {
						completeMatch = true;
						break;
					}
				} else if (t[j] == s[j]) {
					aux.push("✔");
					matches.push(j);
					partialMatch = true;
				} else {
					aux.push("✘");
					mismatch = j;
					partialMatch = false;
					break;
				}
			}
			
			step = {
				clearArray : true,
				searchArrayValues : s.slice(0),
				targetArrayValues : t.slice(0),
				searchArrayLabel : "Search string:",
				targetArrayLabel : "Target string:",
				targetAuxArrayValues : aux.slice(0),
				searchAuxArrayValues : this.searchAux,
				resultsArrayValues : res.slice(0),
				searchArrayHighlights : [],
				targetArrayHighlights : [],
				auxLabel : ""
			};
			
			if (completeMatch) {
				step.description = "The search has matched the target string at position " + (i + 1) + ".";
			} else {
				step.description = "Position " + (i + 1) + " is not a match.";
			}

			steps.push(step);

			if (completeMatch) {
				break;
			}
		}

		//summary
		step = {
			clearArray : true,
			searchArrayValues : s.slice(0),
			targetArrayValues : t.slice(0),
			searchArrayLabel : "Search string:",
			targetArrayLabel : "Target string:",
			targetAuxArrayValues : aux.slice(0),
			searchAuxArrayValues : this.searchAux,
			searchArrayHighlights : [],
			targetArrayHighlights : [],
			auxLabel : ""
		};

		step.description = (completeMatch) ? "This concludes the visualisation." : "The end of the search string has been reached without a match, so the search ends with a result of ‘not found’.";
		steps.push(step);

		return steps;

};

OU.activity.RapidSearch.prototype.accessibleView = function() {
	OU.activity.RapidSearch.superClass_.accessibleView.call(this);
};

OU.activity.RapidSearch.prototype.resize = function() {
	var bh = OU.controlHeight;

	OU.activity.RapidSearch.superClass_.resize.call(this);

	this.bgLayer.resize();
	this.bgLayer.context.gradRect();

	this.descriptionDiv.slideTo({
		"x" : 100,
		"y" : 0,
		"w" : this.w - 200,
		"h" : 2 * bh
	});

	this.captionDiv.slideTo({
		"x" : 100,
		"y" : this.h - 2 * bh,
		"w" : this.w - 200,
		"h" : 2 * bh
	});

	this.modelLayer.resize({});

	this.render();
};

OU.activity.RapidSearch.prototype.render = function() {
	var ctx = this.ctx, bh = OU.controlHeight, stageHeight = this.h - bh;
	ctx.font = 'bold 14px Arial';

	//layout is side by side in landscape, top and bottom in portrait orientation
	this.searchArrayAdjX = this.w / 2 - this.arrayWidth / 2;
	this.searchArrayAdjY = this.h * 0.3;

	this.targetArrayAdjX = this.searchArrayAdjX;
	this.targetArrayAdjY = this.searchArrayAdjY + 2 * bh;

	this.target2ArrayAdjX = this.searchArrayAdjX;
	this.target2ArrayAdjY = this.searchArrayAdjY + 4 * bh;

	this.resultsArrayAdjX = this.searchArrayAdjX;
	this.resultsArrayAdjY = this.searchArrayAdjY + 6 * bh;

	if (this.hideArray == false) {
		this.renderArrays();
	}

	this.infoButton.render();

	//draw arrows
	for (var i = 0; i < this.arrows.length; i++) {
		var arrow = this.arrows[i];
		var start, end, label;
		var startIndex = arrow.start;
		var endIndex = arrow.end;
		var label = arrow.label;
		var yShift = arrow.yShift;

		var fromX = this.targetArray.dims(startIndex).x;
		var fromY = this.targetArray.dims(endIndex).y + yShift * bh;
		var toX = this.targetArray.dims(endIndex).x;
		var toY = this.targetArray.dims(endIndex).y + yShift * bh;

		this.drawArrow(fromX, fromY, toX, toY, 0, 0, label);

		var ctx = this.ctx;

		ctx.fillStyle = 'black';
		ctx.font = "14px Arial";

		var textDims = ctx.measureText(label);

		ctx.fillText(label, fromX + (toX - fromX) / 2 - textDims.width / 2, fromY - 0.5 * bh);
	}

	//animate
	if (this.animations != undefined && this.animations.length != 0) {
		for (var i = 0; i < this.animations.length; i++) {
			this.renderAnimation(i);
		}
	}
};

/*
 * let BoxArray resize logic take care of drawing
 */
OU.activity.RapidSearch.prototype.renderArrays = function() {
	this.searchArray.resize({
		"x" : this.searchArrayAdjX,
		"y" : this.searchArrayAdjY,
		"w" : this.arrayWidth,
		"h" : this.arrayHeight
	});

	this.targetArray.resize({
		"x" : this.targetArrayAdjX,
		"y" : this.targetArrayAdjY,
	});

	this.target2Array.resize({
		"x" : this.target2ArrayAdjX,
		"y" : this.target2ArrayAdjY
	});

	this.resultsArray.resize({
		"x" : this.resultsArrayAdjX,
		"y" : this.resultsArrayAdjY
	})
};

OU.activity.RapidSearch.prototype.renderAnimation = function(layer) {
	var ctx = this.ctx, bh = OU.controlHeight;

	if (layer == undefined) {
		return;
	}

	if (this.animations.length == 0 || this.animations == undefined || this.animations == null) {
		return;
	}

	var p1 = this.animations[layer].p1;
	var p2 = this.animations[layer].p2;
	var pa = this.animations[layer].pa;
	var text = this.animations[layer].text;
	var textWidth = this.animations[layer].textWidth;
	var isHighlighted = this.animations[layer].highlight;

	if (pa != null) {
		ctx.fillStyle = (isHighlighted) ? 'red' : 'black';
		ctx.font = (isHighlighted) ? "bold 14px Arial" : "14px Arial";
		ctx.fillText(text, pa.x - textWidth / 2, pa.y);
		ctx.fillStyle = 'black';
		ctx.font = "14px Arial";
	}
};

OU.activity.RapidSearch.prototype.remove = function() {
	OU.activity.RapidSearch.superClass_.remove.call(this);
};

OU.activity.RapidSearch.prototype.showMessage = function(buffer) {
	var el = document.getElementById("messageDiv");
	el.innerHTML = buffer;
	el.style.display = "block";
};

// ported from here:
//http://www.cs.rit.edu/~ncs/color/t_convert.html
OU.activity.RapidSearch.prototype.getColorHexHSV = function(h, s, v) {
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

	return "rgba(" + (Math.round(r * 255)) + "," + (Math.round(g * 255)) + "," + (Math.round(b * 255) + ",0.5)");
};

/**
 * Draws arrow with arrow head at a distance from the start and end points
 */
OU.activity.RapidSearch.prototype.drawArrow = function(x1, y1, x2, y2, frac1, frac2) {
	var ctx = this.ctx;

	ctx.lineWidth = 1.5;
	ctx.strokeStyle = '#aaaaaa';

	//points a and b are on line, but not at start or end points (which would be covered up by nodes)
	xa = frac1 * (x2 - x1) + x1;
	ya = frac1 * (y2 - y1) + y1;

	xb = -frac2 * (x2 - x1) + x2;
	yb = -frac2 * (y2 - y1) + y2;

	//adapted from: stuff.titus-c.ch/arrow.html
	var headlen = 10;
	// length of head in pixels
	var dx = xb - xa;
	var dy = yb - ya;
	var angle = Math.atan2(dy, dx);
	ctx.moveTo(xa, ya);
	ctx.lineTo(xb, yb);
	ctx.lineTo(xb - headlen * Math.cos(angle - Math.PI / 6), yb - headlen * Math.sin(angle - Math.PI / 6));
	ctx.moveTo(xb, yb);
	ctx.lineTo(xb - headlen * Math.cos(angle + Math.PI / 6), yb - headlen * Math.sin(angle + Math.PI / 6));

	ctx.stroke();

	ctx.lineWidth = 1;
	ctx.strokeStyle = 'black';
};

// call the superclass's constructor
OU.base(this, data, instance, controller);
};
OU.inherits(OU.activity.RapidSearch, OU.util.Activity);

/**
 * @fileOverview BoxArray - Creates an array of boxes - candidate for OU.util inclusion
 *
 * @author Esther Loeliger <estherloeliger@gmail.com> based on OU.util.Slider by
 */

/**
 * @class This utility shows an array of boxes with numerical values. It is non-interactive, but it is possible to highlight individual cells
 *
 * @param {object} params - options:
 * <ul>
 * <li><strong>{canvas.context} context:</strong> (required) Context of the canvas/layer to render to</li>
 * <li><strong>{object} container:</strong> (required) Calling object, typically an OU.util.Activity object</li>
 * <li><strong>{int} x:</strong> X co-ordinate</li>
 * <li><strong>{int} y:</strong> Y co-ordinate</li>
 * <li><strong>{int} w:</strong> Width</li>
 * <li><strong>{int} h:</strong> Height</li>
 * <li><strong>{int} overlap:</strong> highlight overlap</li>
 * </ul>
 */

OU.util.BoxArray = function(params) {
	this.params = params;
	this.context = params.context;
	this.frames = OU.IS_IPAD ? 2 : 5;
	this.x = params.x || 10;
	this.y = params.y || 10;
	this.w = params.w || 100;
	this.h = params.h || 20;
	this.disabled = false;
	this.container = params.container || {};
	this.overlap = params.overlap || 0;
	this.length = params.length;
	this.hideEmptyCells = params.hideEmptyCells || false;

	this.values = [];
	this.colorMap = {};
	this.highlights = [];
	this.auxValues = [];
	this.auxHighlights = [];
	this.auxLabel = "";
	this.disabledFrom = 999;

	OU.addRemovable(this, this.container.zOffset || 0);

	/**
	 * Removes the array
	 */
	OU.util.BoxArray.prototype.remove = function() {
		OU.util.BoxArray.superClass_.remove.call(this);
		// call the parent class method
		OU.removables.removeType(this.instanceId);
	};
	/**
	 * Resizes the array
	 * @param {object} p - new dims:
	 * <ul>
	 * <li><strong>{int} x:</strong> X co-ordinate</li>
	 * <li><strong>{int} y:</strong> Y co-ordinate</li>
	 * <li><strong>{int} w:</strong> Width</li>
	 * <li><strong>{int} h:</strong> Height</li>
	 * </ul>
	 */
	OU.util.BoxArray.prototype.resize = function(p) {
		this.x = p.x || this.x;
		this.y = p.y || this.y;
		this.w = p.w || this.w;
		this.h = p.h || this.h;

		this.render();
	};

	/**
	 * Setter for node values, colors and labels
	 * @param {object} p - new values and properties:
	 * <ul>
	 * <li><strong>{array of string} values:</strong> Node values</li>
	 * <li><strong>{object} colorMap:</strong> Node colors keyed to node value</li>
	 * </ul>
	 */
	OU.util.BoxArray.prototype.setData = function(p) {
		this.values = p.values || [];
		this.labels = p.labels || [];
		this.colorMap = p.colorMap || { };
	};

	/**
	 * Sets a value in the array
	 */
	OU.util.BoxArray.prototype.setValue = function(index, val) {
		this.values[index] = val;
		this.resize({
			x : this.x,
			y : this.y,
			h : this.h,
			w : this.w
		});
	};

	/**
	 * Clears all array values
	 */
	OU.util.BoxArray.prototype.clearValues = function() {
		var len = this.values.length;
		this.values = [];
		for (var i = 0; i < len; i++) {
			this.values[i] = -1;
		}
	};

	/**
	 * Sets highlights
	 */
	OU.util.BoxArray.prototype.setHighlights = function(highlights) {
		this.highlights = highlights || [];
	};

	/**
	 * Sets aux highlights
	 */
	OU.util.BoxArray.prototype.setAuxHighlights = function(highlights) {
		this.auxHighlights = highlights || [];
	};

	/*
	 *
	 */
	OU.util.BoxArray.prototype.setDisabledFrom = function(index) {
		this.disabledFrom = index;
	}

	OU.util.BoxArray.prototype.clearHighlights = function() {
		this.highlights = [];
	};

	OU.util.BoxArray.prototype.setAuxLabel = function(label) {
		this.auxLabel = label;
	};

	OU.util.BoxArray.prototype.setLabel = function(label) {
		this.label = label;
	};

	/**
	 * Sets aux settings
	 */
	OU.util.BoxArray.prototype.setAuxValues = function(a) {
		this.auxValues = a;
	};

	/**
	 * Sets glow array
	 */
	OU.util.BoxArray.prototype.setGlow = function(a) {
		this.glow = a;
	}
	/**
	 * Returns dims of requested box
	 */

	OU.util.BoxArray.prototype.dims = function(index, forceCentered) {
		var bh = OU.controlHeight;
		var boxWidth = this.w / this.values.length;

		var x = this.x + index * boxWidth;
		var y = this.y;

		var centered = forceCentered || false;
		if (centered == true) {
			x += boxWidth / 2;
			y += bh / 2;
		}
		var w = boxWidth;
		var h = OU.controlHeight;

		var dims = {
			"x" : x,
			"y" : y,
			"w" : w,
			"h" : h
		};

		return dims;
	};

	/**
	 * Renders the array
	 * @private
	 */
	OU.util.BoxArray.prototype.render = function() {
		var ctx = this.context, bh = OU.controlHeight;

		if (this.length < 1) {
			return;
		}

		var len = this.values.length;
		var boxWidth = this.w / len;

		for (var i = 0; i < len; i++) {
			var val = this.values[i];

			//letters are used for genome strings, so map for legibility
			if (typeOf(val) == 'string') {
				if (val[0] == 'A') {
					val = 0;
				} else if (val[0] == 'C') {
					val = 25;
				} else if (val[0] == 'T') {
					val = 50;
				} else//G
				{
					val = 75;
				}
			}

			var calcX = this.x + i * boxWidth;
			var textWidth = ctx.measureText(val).width;

			if (val != -1 && val in this.colorMap) {
				var col = this.colorMap[val];
				ctx.fillStyle = (i >= this.disabledFrom) ? 'rgba(200, 200, 200, 0.2)' : col;
				ctx.fillRect(calcX - this.overlap, this.y - this.overlap, boxWidth + 2 * this.overlap, bh + 2 * this.overlap);

			}

			ctx.beginPath();
			ctx.fillStyle = (i >= this.disabledFrom) ? 'rgba(200, 200, 200, 1.0)' : 'black';

			if (!(this.hideEmptyCells == true && val == '-1')) {
				ctx.strokeStyle = (i >= this.disabledFrom) ? 'rgba(200, 200, 200, 02)' : 'black';
				ctx.strokeRect(calcX, this.y, boxWidth, bh);
			}

			//special case -999: draw box but not label
			if (val != '-1' && val != '-999') {
				ctx.fillText(this.values[i], calcX + boxWidth / 2 - textWidth / 2, this.y + bh / 2);
			}
			ctx.closePath();
		}

		if (this.highlights != undefined && this.highlights.length > 0) {
			var highlight;
			for (var i = 0; i < this.highlights.length; i++) {
				highlight = this.highlights[i];
				this.renderHighlight(highlight.index, highlight.color);
			}
		}

		if (this.auxValues != undefined && this.auxValues.length > 0) {
			for (var i = 0; i < this.auxValues.length; i++) {
				var dims = this.dims(i);
				var val = this.auxValues[i];
				if (val == -1 || val == undefined) {
					continue;
				}

				ctx.font = (~this.auxHighlights.indexOf(i)) ? "bold 14px Arial" : "14px Arial";
				var auxWidth = ctx.measureText(val).width;

				ctx.beginPath();
				ctx.fillStyle = (i >= this.disabledFrom) ? 'rgba(200, 200, 200, 1.0)' : 'black';
				ctx.fillText(val, dims.x + boxWidth / 2 - auxWidth / 2, dims.y - bh / 2);
				ctx.closePath();
			}
			ctx.font = "bold 14px Arial";
		}

		//aux label
		if (this.auxLabel != undefined && this.auxLabel.length > 0) {
			var dims = this.dims(0);

			var auxWidth = ctx.measureText(this.auxLabel).width;

			ctx.beginPath();
			ctx.fillStyle = 'black';
			ctx.fillText(this.auxLabel, dims.x - boxWidth / 2 - auxWidth, dims.y - bh / 2);
			ctx.closePath
		}

		//main label
		if (this.label != undefined && this.label.length > 0) {
			var dims = this.dims(0);

			var labelWidth = ctx.measureText(this.label).width;

			ctx.beginPath();
			ctx.fillStyle = 'black';
			ctx.fillText(this.label, dims.x - boxWidth / 2 - labelWidth, dims.y + bh / 2);
		}
	};

	/**
	 * Returns current box width
	 */
	OU.util.BoxArray.prototype.boxWidth = function() {
		var len = this.values.length;
		return this.w / len;
	};

	/**
	 * Draws an arrow pointing to an array element
	 * based on OU.activity.BubbleSort by
	 * @author Callum Lester
	 */
	OU.util.BoxArray.prototype.renderHighlight = function(index, color) {
		var ctx = this.context, bh = OU.controlHeight;

		var len = this.values.length;

		if (len == 0) {
			len++;
			//prevent division by zero
		}

		var boxWidth = this.w / len;

		ctx.save();

		ctx.fillStyle = color;

		ctx.beginPath();

		ctx.strokeStyle = 'black';

		//top
		ctx.moveTo(this.x + index * boxWidth + boxWidth * 0.5, this.y + bh);
		ctx.lineTo(this.x + index * boxWidth + boxWidth, this.y + 1.5 * bh);
		ctx.lineTo(this.x + index * boxWidth + boxWidth * 0.75, this.y + 1.5 * bh);
		ctx.lineTo(this.x + index * boxWidth + boxWidth * 0.75, this.y + 2.5 * bh);
		ctx.lineTo(this.x + index * boxWidth + boxWidth * 0.25, this.y + 2.5 * bh);
		ctx.lineTo(this.x + index * boxWidth + boxWidth * 0.25, this.y + 1.5 * bh);
		ctx.lineTo(this.x + index * boxWidth, this.y + 1.5 * bh);
		ctx.lineTo(this.x + index * boxWidth + boxWidth * 0.5, this.y + bh);

		ctx.closePath();

		ctx.stroke();
		ctx.fill();

		ctx.restore();
	};

	OU.base(this, params);
};
OU.inherits(OU.util.BoxArray, OU.util);

