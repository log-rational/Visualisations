/**
 * @fileOverview Traversal
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

var STATE_PAUSED = 0;
var STATE_RUNNING = 1;

/**
 * @class Traversal
 * @extends OU.util.Activity
 * @param {Object} data - Holds the data content for a specific instance of the activity
 * @param {String} instance - (Optional) A unique identifier name for this instance, defaults to 'a1'
 * @param {OU.util.Controller} controller - (Optional) A reference to the controller that initialised this instance, if undefined, the superclass will generate a new controller and create the reference to it as 'this.controller'
 */
OU.activity.Traversal = function(data, instance, controller) {

	OU.activity.Traversal.prototype.canvasView = function() {
		var bh = OU.controlHeight;
		var self = this;

		//start in paused mode
		this.state = STATE_PAUSED;

		//initialize step index and count
		this.currentStep = 0;
		this.steps = data.steps.length;

		//global
		this.globalSteps = data.steps;
		this.globalScript = data.script;
		this.globalStepIndex = 0;
		this.globalDelay = 2500;

		//fast animation flag
		this.fastAnimation = false;

		//default shuffle state
		this.shuffleOnReset = false;

		//background
		this.bgLayer = new OU.util.Layer({
			container : this
		});
		this.bgLayer.context.gradRect();

		this.arrayWidth = 400;
		this.arrayHeight = bh;
		this.treeWidth = 400;
		this.treeHeight = 300;
		this.overlap = 0;

		//manage top left corners of drawing areas
		this.arrayAdjX = 0;
		this.arrayAdjY = 0;
		this.treeAdjX = 0;
		this.treeAdjY = 0;

		//initialize tree highlight
		this.treeHighlights = [];

		//animation settings plus temp storage between loadStep and resize/render
		this.animation = { };

		//control dimensions
		this.buttonWidth = 200;

		//responsive design or fixed
		this.forcePortrait = this.data.forcePortrait || false;

		this.descriptionDiv = new OU.util.Div({
			container : this,
			x : 0,
			y : 0,
			h : "auto",
			w : this.w,
			showScroll : true
		});

		this.descriptionDiv.div.innerHTML = data.title + data.steps[0].description;

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

		this.array = new OU.util.BoxArray({
			"context" : this.ctx,
			"object" : this,
			"x" : 100,
			"y" : 100,
			"w" : this.arrayWidth,
			"h" : this.arrayHeight,
			"overlap" : this.overlap
		});

		this.arrayValues = [];

		//default to search tree
		if (data.orderingProperty == undefined) {
			data.orderingProperty = true;
		}

		this.tree = new OU.util.BinaryTree({
			context : this.ctx,
			object : this,
			x : 100,
			y : 100,
			w : this.treeWidth,
			h : this.treeHeight,
			overlap : this.overlap,
			generations : 3,
			orderingProperty : data.orderingProperty
		});

		this.initControls();

		//now pull in step data
		this.loadStep(data.steps[this.currentStep]);

		//render everything
		this.resize();
	};

	OU.activity.Traversal.prototype.loadStep = function(step) {
		var self = this;

		var bh = OU.controlHeight;

		//control animation speed
		var fastAnimationMemory = this.fastAnimation;
		if (step.animation != undefined && step.animation.fast != undefined && step.animation.fast == true) {
			this.fastAnimation = true;
		}

		this.array.clearHighlights();

		this.descriptionDiv.div.innerHTML = data.title + step.description;

		if (step.clearArray) {
			this.array.clearValues();
		}

		if (step.clearTree) {
			this.tree.clearValues();
		}

		//load arrayValues/treeValues if any
		if (step.arrayValues != undefined) {
			this.arrayValues = step.arrayValues;
		}

		if (step.treeValues != undefined) {
			this.treeValues = step.treeValues;
		}

		if (step.treeLabels != undefined) {
			this.treeLabels = step.treeLabels;
		}

		if (step.treeHighlights != undefined) {
			this.treeHighlights = step.treeHighlights;
		}

		this.colorMap = {};
		this.refreshColorMap();

		this.array.setData({
			values : this.arrayValues,
			colorMap : this.colorMap
		});
		this.tree.setData({
			"values" : this.treeValues,
			"labels" : this.treeLabels,
			"colorMap" : this.colorMap,
			"highlights" : this.treeHighlights
		});

		if (step.arrayHighlights) {
			this.array.setHighlights(step.arrayHighlights);
		}

		//new array value added to tree
		if (step.rootAnimation != undefined) {
			var arrayIndex = step.rootAnimation;
			var fromDims = this.array.dims(arrayIndex);
			var text = this.array.values[arrayIndex];

			var toDims = this.tree.dims(0);

			this.setAnimation(text, fromDims.x, fromDims.y + bh / 2, toDims.x, toDims.y);
		}

		//array value moving down the tree
		if (step.animation != undefined) {
			var arrayToTree = (step.animation.arrayToTree == undefined) ? true : step.animation.arrayToTree;
			var arrayIndex = step.animation.arrayIndex;
			var treeIndex = step.animation.treeIndex;
			var comparison = this.tree.values[treeIndex];
			var value = '', fromDims = { }, toDims = { };
			if (arrayToTree == true) {
				value = this.array.values[arrayIndex];
				var leftChild = this.tree.leftChild(treeIndex);
				var fromDims = this.tree.dims(treeIndex);
				var toDims = { };
				if (value < comparison) {
					toDims = this.tree.dims(leftChild);
				} else {
					toDims = this.tree.dims(leftChild + 1);
				}
			} else {
				value = this.tree.valueAt(treeIndex);
				fromDims = this.tree.dims(treeIndex, true);
				toDims = this.array.dims(arrayIndex, true);
			}

			this.setAnimation(value, fromDims.x, fromDims.y, toDims.x, toDims.y);
		}

		//push happens with time delay - set tree values for immediate painting
		var delay = (this.fastAnimation == true) ? 500 : 2000;

		if (step.push != undefined) {

			var arrayToTree = (step.animation.arrayToTree == undefined) ? true : step.animation.arrayToTree;

			if (arrayToTree == true) {
				var val;
				for (var i = 0; i < step.push.length; i++) {
					value = this.array.values[step.push[i]];
					setTimeout(function() {
						self.tree.pushOrdered(value, 0);
					}, delay);
				}

			} else {
				var val;
				for (var i = 0; i < step.push.values.length; i++) {
					value = this.tree.valueAt(step.push.values[i]);
					var offset = step.push.offset + i;
					setTimeout(function() {
						self.array.setValue(offset, value);
					}, delay);
				}
			}
		}

		this.fastAnimation = fastAnimationMemory;

		this.resize();
	};

	OU.activity.Traversal.prototype.refreshColorMap = function() {
		//sort a copy of the larger array to set the color map
		var inOrder = [];
		if (this.arrayValues.length > this.treeValues.length) {
			inOrder = this.arrayValues.slice(0);
		} else {
			inOrder = this.treeValues.slice(0);
		}

		inOrder = inOrder.sort();

		//don't initialise: add to existing color values
		for (var i = 0; i < inOrder.length; i++) {
			var val = inOrder[i];
			var frac = (i + 1) * 1.0 / inOrder.length * 1.0;
			var col = this.getColorHexHSV(frac * 255, 1.0, 1.0);
			this.colorMap[val] = col;
		}
	};

	OU.activity.Traversal.prototype.setAnimation = function(txt, x1, y1, x2, y2) {

		this.animation = {
			text : txt,
			textWidth : this.ctx.measureText(txt).width,
			p1 : {
				x : x1,
				y : y1
			},
			p2 : {
				x : x2,
				y : y2
			},
			pa : {
				x : x1,
				y : y1
			},
		};
		this.animate(this);
	};

	OU.activity.Traversal.prototype.animate = function(self) {

		if (self.animation.p1 == undefined || self.animation.p2 == undefined) {
			return;
		}

		var dx = Math.abs(self.animation.p1.x - self.animation.p2.x);
		var dy = Math.abs(self.animation.p1.y - self.animation.p2.y);

		if (dx > dy) {
			var step = (this.fastAnimation == true) ? dx / 5 : dx / 20;

			var dRemaining = Math.abs(self.animation.pa.x - self.animation.p2.x);

			if (dRemaining < step) {
				this.clearAnimation();
				return;
			}

			if (self.animation.pa.x > self.animation.p2.x) {
				self.animation.pa.x -= step;
			} else {
				self.animation.pa.x += step;
			}

			//calculate this.animation.pa.y
			self.animation.pa.y = ((self.animation.pa.x - self.animation.p1.x) / (self.animation.p2.x - self.animation.p1.x)) * (self.animation.p2.y - self.animation.p1.y) + self.animation.p1.y;
		} else//portrait
		{
			var step = (this.fastAnimation == true) ? dy / 5 : dy / 20;

			var dRemaining = Math.abs(self.animation.pa.y - self.animation.p2.y);

			if (dRemaining < step) {
				this.clearAnimation();
				return;
			}

			if (self.animation.pa.y > self.animation.p2.y) {
				self.animation.pa.y -= step;
			} else {
				self.animation.pa.y += step;
			}

			//calculate this.animation.pa.y
			self.animation.pa.x = ((self.animation.pa.y - self.animation.p1.y) / (self.animation.p2.y - self.animation.p1.y)) * (self.animation.p2.x - self.animation.p1.x) + self.animation.p1.x;
		}

		self.resize();

		setTimeout(function() {
			self.animate(self);
		}, 60);
	}

	OU.activity.Traversal.prototype.clearAnimation = function() {
		this.animation = { };
	};

	OU.activity.Traversal.prototype.initControls = function() {
		var bh = OU.controlHeight, self = this;

		this.startButton = new OU.util.Button({
			txt : "Start",
			padding : 0,
			verticalPadding : 0,
			layer : this.modelLayer,
			onClick : function() {
				self.startButtonPressed();
			}
		});

		this.resetButton = new OU.util.Button({
			txt : "Home",
			padding : 0,
			verticalPadding : 0,
			layer : this.modelLayer,
			onClick : function() {
				self.resetButtonPressed();
			}
		});

		OU.activity.Traversal.prototype.setPaused = function(b, endOfSequence) {
			this.state = (b == true) ? STATE_PAUSED : STATE_RUNNING;

			var continueString = (this.globalStepIndex == 0 || (endOfSequence != undefined && endOfSequence == true)) ? "Start" : "Continue";

			var s = (b == true) ? continueString : "Pause";

			this.startButton.modify({
				txt : s
			});
		}

		this.resetButton = new OU.util.Button({
			txt : "Reset",
			padding : 0,
			verticalPadding : 0,
			layer : this.modelLayer,
			onClick : function() {
				self.resetButtonPressed();
			}
		});

		this.shuffleButton = new OU.util.CheckBoxButton({
			txt : "Random",
			fontSize : 12,
			x : 0,
			y : 0,
			w : this.buttonWidth,
			h : bh,
			layer : this.modelLayer,
			state : this.shuffleOnReset,
			onClick : function() {
				self.shuffleButtonPressed();
			}
		});

		//tbd: add buttons
		var clickable = this.modelLayer.events.clickable;
		clickable.length = 0;
		clickable.push(this.startButton);
		clickable.push(this.resetButton);
		clickable.push(this.shuffleButton);
		clickable.push(this.infoButton);
	};

	/*
	 OU.activity.Traversal.prototype.defaults = function() {
	 //match brief exactly
	 this.arrayValues = [5, 2, 7, 8, 3, 1, 4, 6];
	 };
	 */

	OU.activity.Traversal.prototype.startButtonPressed = function() {

		if (this.state == STATE_PAUSED) {
			this.setPaused(false);

			//random + at start
			if (this.shuffleOnReset == true && this.globalStepIndex == 0) {
				var array = [];
				array[0] = Math.floor(50 + Math.random() * 9);
				array[1] = Math.floor(30 + Math.random() * 9);
				array[2] = Math.floor(70 + Math.random() * 9);
				array[3] = Math.floor(20 + Math.random() * 9);
				array[4] = Math.floor(80 + Math.random() * 9);
				array[5] = Math.floor(40 + Math.random() * 9);
				array[6] = Math.floor(60 + Math.random() * 9);
				this.traverseScript(array);
			}
			//otherwise follow steps as usual
			else {
				this.traverseSteps();
			}

		} else//this state == STATE_RUNNING
		{
			this.setPaused(true);
		}
	};

	OU.activity.Traversal.prototype.resetButtonPressed = function() {
		this.currentStep = 0;
		this.globalStepIndex = 0;
		this.array.clearValues();
		this.loadStep(data.steps[this.currentStep]);
		this.setPaused(true);
		this.startButton.enable();
		this.resize();
	};

	OU.activity.Traversal.prototype.traverseSteps = function() {
		var self = this;

		//start screen shown, so move on to next frame
		this.globalstepIndex++;

		this.playSteps(this, this.globalSteps, this.globalStepIndex, this.globalDelay);
	};

	OU.activity.Traversal.prototype.playSteps = function(self, steps, currentIndex, delay) {

		//at end of animation: (a) disable continue/pause button and (b) don't automatically rewind to the start
		if (currentIndex > steps.length - 1) {
			self.setPaused(true, true);
			//is paused, is last frame

			self.globalStepIndex = 0;
			self.globalSteps = steps;
			return;
		}

		//generally: when paused, stop here
		if (this.state == STATE_PAUSED) {

			self.globalStepIndex = currentIndex;
			self.globalSteps = steps;

			return;
		}

		self.startButton.enable();

		self.loadStep(steps[currentIndex]);

		var combinedDelay = delay + steps[currentIndex].description.length * 25;

		setTimeout(function() {
			self.playSteps(self, steps, currentIndex + 1, delay);
		}, combinedDelay);
	};

	OU.activity.Traversal.prototype.traverseScript = function(treeValues) {
		var self = this;

		//refresh class-wide colorMap
		this.treeValues = treeValues;
		this.refreshColorMap();

		if (this.state == STATE_PAUSED) {
			this.globalStepIndex = currentIndex;
			return;
		}

		var currentNode = 0;
		var arrayValues = [-1, -1, -1, -1, -1, -1, -1];
		var description = "<h3>Pre-order, post-order, in-order traversal</h3>";
		var duration = (this.fastAnimation) ? 500 : 1000;
		var step = {
			"clearArray" : true,
			"clearTree" : true,
			"treeValues" : treeValues,
			"arrayValues" : arrayValues,
			"treeHighlights" : [currentNode],
			"description" : description
		};

		//create steps array, then call traverseSteps

		var script = [];
		var steps = [];

		script = this.globalScript.slice(0);
		steps.push(step);

		var arrayIndex = 0;
		for (var i = 0, len = script.length; i < len; i++) {
			var frame = script[i];
			var node = frame.index;

			//if new section, clear array
			var sectionStart = (script[i].sectionStart != undefined && script[i].sectionStart == true);
			arrayValues = (sectionStart) ? [-1, -1, -1, -1, -1, -1, -1] : arrayValues;

			var myStep = {
				"clearArray" : false,
				"clearTree" : false,
				"treeValues" : treeValues,
				"arrayValues" : arrayValues,
				"treeHighlights" : [node],
				"description" : script[i].description
			};

			var addAnimation = (script[i].push != undefined && script[i].push == true);

			if (addAnimation) {
				var animationObj = {};
				var pushObj = {};

				var index = arrayIndex % 7;

				animationObj.treeIndex = node;
				animationObj.arrayIndex = index;
				animationObj.arrayToTree = false;
				animationObj.fast = true;

				var values = [];
				values.push(node);

				pushObj.values = values;
				pushObj.offset = index;

				myStep.animation = animationObj;
				myStep.push = pushObj;

				arrayIndex++;
			}
			steps.push(myStep);
		}
		this.globalSteps = steps;
		this.traverseSteps();
	};

	OU.activity.Traversal.prototype.shuffleButtonPressed = function() {
		this.shuffleOnReset = !this.shuffleOnReset;
		this.shuffleButton.state(this.shuffleOnReset);
		this.globalStepIndex = 0;
	};

	OU.activity.Traversal.prototype.accessibleView = function() {
		OU.activity.Traversal.superClass_.accessibleView.call(this);
	};

	OU.activity.Traversal.prototype.resize = function() {
		var bh = OU.controlHeight;

		OU.activity.Traversal.superClass_.resize.call(this);

		this.bgLayer.resize();
		this.bgLayer.context.gradRect();

		//this.descriptionDiv.resize({
		this.descriptionDiv.slideTo({
			"x" : 100,
			"y" : 0, //bh,
			"w" : this.w - 200,
			"h" : 2 * bh
		});

		this.modelLayer.resize({
		});
		this.render();
	};

	OU.activity.Traversal.prototype.render = function() {
		var ctx = this.ctx, bh = OU.controlHeight, stageHeight = this.h - bh;
		ctx.font = 'bold 14px Arial';

		//layout is side by side in landscape, top and bottom in portrait orientation

		//array - to compensate for long descriptions at the top, add 2 * bh to adjY if possible
		if (this.w > this.h && this.forcePortrait == false) {
			this.treeAdjX = (this.w / 2 > this.treeWidth) ? this.w / 4 - this.treeWidth / 2 : 0;
			this.treeAdjY = (stageHeight > this.treeHeight) ? stageHeight / 2 - this.treeHeight / 2 : 0;
			//+ 2 * bh : 0;
		} else {
			this.treeAdjX = (this.w > this.treeWidth) ? this.w / 2 - this.treeWidth / 2 : 0;
			this.treeAdjY = stageHeight - this.arrayHeight - 1.5 * bh - this.treeHeight;
		}

		this.renderTree();

		//tree
		if (this.w > this.h && this.forcePortrait == false) {
			this.arrayAdjY = (stageHeight > this.arrayHeight) ? stageHeight / 2 - this.arrayHeight / 2 : 0;
		} else {
			this.arrayAdjX = (this.w > this.arrayWidth) ? this.w / 2 - this.arrayWidth / 2 : 0;
			this.arrayAdjY = stageHeight - this.arrayHeight - bh / 2;
		}

		this.renderArray();

		this.startButton.resize({
			x : this.w / 2 - 1.5 * this.buttonWidth,
			y : this.h - bh,
			w : this.buttonWidth,
			h : bh
		});

		this.resetButton.resize({
			x : this.w / 2 - 0.5 * this.buttonWidth,
			y : this.h - bh,
			w : this.buttonWidth,
			h : bh
		});

		this.shuffleButton.resize({
			x : this.w / 2 + 0.5 * this.buttonWidth,
			y : this.h - bh,
			w : this.buttonWidth,
			h : bh
		});

		this.startButton.render();
		this.resetButton.render();
		this.shuffleButton.render();
		this.infoButton.render();

		this.renderAnimation();
	};

	OU.activity.Traversal.prototype.renderArray = function() {
		this.array.resize({
			"x" : this.arrayAdjX,
			"y" : this.arrayAdjY,
			"w" : this.arrayWidth,
			"h" : this.arrayHeight
		});
	};

	OU.activity.Traversal.prototype.renderTree = function() {
		this.tree.resize({
			"x" : this.treeAdjX,
			"y" : this.treeAdjY,
			"w" : this.treeWidth,
			"h" : this.treeHeight
		});
	};

	OU.activity.Traversal.prototype.renderAnimation = function() {
		var ctx = this.ctx, bh = OU.controlHeight;

		var p1 = this.animation.p1;
		var p2 = this.animation.p2;
		var pa = this.animation.pa;
		var text = this.animation.text;
		var textWidth = this.animation.textWidth;

		if (pa != null) {
			ctx.fillStyle = 'black';
			ctx.fillText(text, pa.x - textWidth / 2, pa.y);
		}
	};

	OU.activity.Traversal.prototype.remove = function() {
		OU.activity.Traversal.superClass_.remove.call(this);
	};

	OU.activity.Traversal.prototype.showMessage = function(buffer) {
		var el = document.getElementById("messageDiv");
		el.innerHTML = buffer;
		el.style.display = "block";
	};

	// ported from here:
	//http://www.cs.rit.edu/~ncs/color/t_convert.html
	OU.activity.Traversal.prototype.getColorHexHSV = function(h, s, v) {
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

	// call the superclass's constructor
	OU.base(this, data, instance, controller);
};
OU.inherits(OU.activity.Traversal, OU.util.Activity);

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

	this.values = [];
	this.colorMap = {};
	this.highlights = [];

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
	}
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
	}

	OU.util.BoxArray.prototype.clearHighlights = function() {
		this.highlights = [];
	}
	/**
	 * Returns dims of requested box
	 */

	OU.util.BoxArray.prototype.dims = function(index, forceCentered) {
		var bh = OU.controlHeight;
		var boxWidth = this.w / this.values.length;
		//includes -1 entries
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
			var calcX = this.x + i * boxWidth;
			var textWidth = ctx.measureText(val).width;

			if ( val in this.colorMap) {
				var col = this.colorMap[val];
				ctx.fillStyle = col;
				ctx.fillRect(calcX - this.overlap, this.y - this.overlap, boxWidth + 2 * this.overlap, bh + 2 * this.overlap);
			}

			ctx.fillStyle = 'black';
			ctx.strokeRect(calcX, this.y, boxWidth, bh);
			if (val != '-1') {
				ctx.fillText(this.values[i], calcX + boxWidth / 2 - textWidth / 2, this.y + bh / 2);
			}
		}

		if (this.highlights != undefined && this.highlights.length > 0) {
			var highlight;
			for (var i = 0; i < this.highlights.length; i++) {
				highlight = this.highlights[i];
				this.renderHighlight(highlight.index, highlight.color);
			}
		}
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
		ctx.strokeStyle = 'black';
		ctx.shadowColor = 'orange';
		ctx.shadowBlur = 10;

		ctx.beginPath();

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

/**
 * @fileOverview BinaryTree - Creates a binary tree - candidate for OU.util inclusion
 *
 * @author Esther Loeliger <estherloeliger@gmail.com>
 */

/**
 * @class This utility shows a binary tree with numerical values. It is non-interactive, but it is possible to highlight individual nodes.
 *
 * @param {object} params - options:
 * <ul>
 * <li><strong>{canvas.context} context:</strong> (required) Context of the canvas/layer to render to</li>
 * <li><strong>{object} container:</strong> (required) Calling object, typically an OU.util.Activity object</li>
 * <li><strong>{int} x:</strong> X co-ordinate</li>
 * <li><strong>{int} y:</strong> Y co-ordinate</li>
 * <li><strong>{int} w:</strong> Width</li>
 * <li><strong>{int} h:</strong> Height</li>
 * <li><strong>{int} radius:</strong> Node radius</li>
 * <li><strong>{int} generations:</strong> Generations including root</li>
 * <li><strong>{bool} orderingProperty:</strong> Apply ordering property to tree (true/false)</li>
 * </ul>
 */

OU.util.BinaryTree = function(params) {
	this.params = params;
	this.context = params.context;
	this.frames = OU.IS_IPAD ? 2 : 5;
	this.x = params.x || 10;
	this.y = params.y || 10;
	this.w = params.w || 400;
	this.h = params.h || 300;
	this.radius = params.radius || 20;
	this.generations = params.generations || 4;
	this.disabled = false;
	this.container = params.container || {};
	this.orderingProperty = params.orderingProperty || true;

	OU.addRemovable(this, this.container.zOffset || 0);

	this.leftChildMap = {
		"0" : 1,
		"1" : 3,
		"2" : 5,
		"3" : 7,
		"4" : 9,
		"5" : 11,
		"6" : 13
	};

	this.parentMap = {
		"0" : -1,
		"1" : 0,
		"2" : 0,
		"3" : 1,
		"4" : 1,
		"5" : 2,
		"6" : 2
	}

	//adjust parameters - new fewer than 2, no more than 4 generations
	if (this.generations < 2)
		this.generations = 2;
	if (this.generations > 4)
		this.generations = 4;

	//calculated based on dimensions
	this.nodes = [];
	this.arrows = [];

	//can be set externally
	this.values = [];
	this.colorMap = { };
	this.labels = [];

	/**
	 * Removes the tree
	 */
	OU.util.BinaryTree.prototype.remove = function() {
		OU.util.BinaryTree.superClass_.remove.call(this);
		// call the parent class method
		OU.removables.removeType(this.instanceId);
	};

	/**
	 * Assigns data to the tree - approach depends on orderingProperty
	 */
	OU.util.BinaryTree.prototype.setData = function(p) {

		this.clearValues();

		this.labels = p.labels;
		this.colorMap = p.colorMap;
		this.highlights = p.highlights || [];

		if (this.orderingProperty) {
			for (var i = 0; i < p.values.length; i++) {
				pos = this.pushOrdered(p.values[i]);
			}
		} else {
			this.values = p.values;
		}
	};

	/**
	 * Clears tree's values array and initializes values to -1
	 */
	OU.util.BinaryTree.prototype.clearValues = function() {
		this.values = [];
		for (var i = 0; i < 15; i++) {
			this.values.push(-1);
		}
	};

	/**
	 * Public getter: obtain dimensions of node with given index
	 */
	OU.util.BinaryTree.prototype.dims = function(index, forceCentered) {
		if (index > this.nodes.length - 1) {
			return {
				"x" : 100,
				"y" : 100,
				"w" : 50,
				"h" : 50
			};
		}

		var node = this.nodes[index];
		var centered = forceCentered || false;

		var x = node.x;
		var y = node.y;
		var w = 2 * this.radius;
		var h = 2 * this.radius;

		if (this.values[index] != -1 && !centered) {
			x -= this.radius * 2;
		}

		var dims = {
			"x" : x,
			"y" : y,
			"w" : w,
			"h" : h
		};

		return dims;
	};

	/**
	 * Public getter: obtain value at index
	 */
	OU.util.BinaryTree.prototype.valueAt = function(index) {
		var ret = this.values[index];
		return (ret == undefined) ? "-1" : ret;
	}
	/**
	 * Public getter: obtain index of left child of node with given index
	 */
	OU.util.BinaryTree.prototype.leftChild = function(index) {
		var ret = this.leftChildMap[index];

		return (ret == undefined) ? -1 : ret;
	};

	/**
	 * Resizes the tree
	 * @param {object} p - new dims:
	 * <ul>
	 * <li><strong>{int} x:</strong> X co-ordinate of the tree</li>
	 * <li><strong>{int} y:</strong> Y co-ordinate of the tree</li>
	 * <li><strong>{int} w:</strong> Width of the tree</li>
	 * <li><strong>{int} h:</strong> Height of the tree</li>
	 * </ul>
	 */
	OU.util.BinaryTree.prototype.resize = function(p) {
		this.x = p.x || this.x;
		this.y = p.y || this.y;
		this.w = p.w || this.w;
		this.h = p.h || this.h;

		//refresh positional arrays
		this.nodes = [];
		this.arrows = [];

		this.generationHeight = this.h / (this.generations - 1);

		//refresh nodes array
		//root
		this.nodes.push({
			"x" : this.x + this.w / 2,
			"y" : this.y
		});

		//1st gen
		for (var i = 3; i < 19; i += 8) {
			this.nodes.push({
				"x" : this.x + this.w * (i / 14),
				"y" : this.y + this.generationHeight
			});
		}

		if (this.generations > 2) {
			//2nd gen
			for (var i = 1; i < 17; i += 4) {
				this.nodes.push({
					"x" : this.x + this.w * (i / 14),
					"y" : this.y + 2 * this.generationHeight
				});
			}
		}

		if (this.generations > 3) {
			//3rd gen
			for (var i = 0; i < 8; i++) {
				this.nodes.push({
					"x" : this.x + this.w * (i / 7),
					"y" : this.y + 3 * this.generationHeight
				});
			}
		}

		//refresh arrows array
		//root
		this.arrows.push({
			"start" : this.nodes[0],
			"end" : this.nodes[1]
		});
		this.arrows.push({
			"start" : this.nodes[0],
			"end" : this.nodes[2]
		});

		if (this.generations > 2) {
			this.arrows.push({
				"start" : this.nodes[1],
				"end" : this.nodes[3]
			});
			this.arrows.push({
				"start" : this.nodes[1],
				"end" : this.nodes[4]
			});

			this.arrows.push({
				"start" : this.nodes[2],
				"end" : this.nodes[5]
			});
			this.arrows.push({
				"start" : this.nodes[2],
				"end" : this.nodes[6]
			});
		}

		if (this.generations > 3) {
			this.arrows.push({
				"start" : this.nodes[3],
				"end" : this.nodes[7]
			});
			this.arrows.push({
				"start" : this.nodes[3],
				"end" : this.nodes[8]
			});
			this.arrows.push({
				"start" : this.nodes[4],
				"end" : this.nodes[9]
			});
			this.arrows.push({
				"start" : this.nodes[4],
				"end" : this.nodes[10]
			});
			this.arrows.push({
				"start" : this.nodes[5],
				"end" : this.nodes[11]
			});
			this.arrows.push({
				"start" : this.nodes[5],
				"end" : this.nodes[12]
			});
			this.arrows.push({
				"start" : this.nodes[6],
				"end" : this.nodes[13]
			});
			this.arrows.push({
				"start" : this.nodes[6],
				"end" : this.nodes[14]
			});
		}

		this.render();
	};

	/**
	 * Renders the tree
	 * @private
	 */
	OU.util.BinaryTree.prototype.render = function() {
		var ctx = this.context, bh = OU.controlHeight;

		var nodeCount = 0;

		ctx.strokeStyle = 'black';
		ctx.fillStyle = 'white';

		ctx.beginPath();

		//draw arrows
		var start, end, val;
		for (var i = 0; i < this.arrows.length; i++) {

			//test node has content (arrow n always points to node n + 1)
			val = this.values[i + 1];
			if (val == -1) {
				continue;
			}

			start = this.arrows[i].start;
			end = this.arrows[i].end;
			this.drawArrow(start.x, start.y, end.x, end.y, 0.3, 0.3);
		}

		ctx.stroke();

		ctx.beginPath();

		//draw nodes
		var node;
		for (var i = 0; i < this.nodes.length; i++) {

			//test node has content
			val = this.values[i];
			if (val == -1) {
				continue;
			}

			node = this.nodes[i];
			ctx.moveTo(node.x + this.radius, node.y);
			ctx.arc(node.x, node.y, this.radius, 0, 2 * Math.PI, false);
		}

		ctx.fill();
		ctx.stroke();

		//draw background colors
		if (this.colorMap != undefined) {
			var color;

			for (var i = 0; i < this.values.length; i++) {
				if (i >= this.nodes.length) {
					break;
				}

				val = this.values[i];

				if (val == -1) {
					continue;
				}

				color = this.colorMap[val];

				if (color != undefined && color.length > 0) {
					ctx.beginPath();
					ctx.fillStyle = color;
					node = this.nodes[i];
					ctx.moveTo(node.x + this.radius, node.y)
					ctx.arc(node.x, node.y, this.radius, 0, 2 * Math.PI, false);
					ctx.fill();
					ctx.stroke();
				} else {
					console.log("Value " + val + " does not have a color assigned to it");
				}
			}
		}

		//draw values
		var val;
		for (var i = 0; i < this.values.length; i++) {
			if (i >= this.nodes.length) {
				break;
			}

			node = this.nodes[i];
			val = this.values[i];

			if (val == -1) {
				continue;
			}

			var textWidth = ctx.measureText(val).width;
			var textHeight = ctx.measureText(val).height;

			ctx.fillStyle = 'black';
			ctx.fillText(val, node.x - textWidth / 2, node.y);

		}

		//draw highlights (if any)
		if (this.highlights != undefined && this.highlights.length > 0) {

			ctx.beginPath();
			ctx.lineWidth = 4;
			ctx.strokeStyle = 'red';
			ctx.shadowColor = 'orange';
			ctx.shadowBlur = 10;
			var highlightNode;
			for (var i = 0; i < this.highlights.length; i++) {
				highlightNode = this.nodes[this.highlights[i]];

				if (highlightNode != undefined) {
					ctx.moveTo(highlightNode.x + this.radius, highlightNode.y);
					ctx.arc(highlightNode.x, highlightNode.y, this.radius, 0, 2 * Math.PI, false);
					ctx.stroke();
				} else {
					console.log("tree highlight node " + i + " not defined");
				}
			}
			ctx.lineWidth = 1;
			ctx.strokeStyle = 'black';
			ctx.shadowColor = 'orange';
			ctx.shadowBlur = 0;
			ctx.closePath();
		}

		//draw labels (if any)
		if (this.labels != undefined) {
			var label;
			for (var i = 0; i < this.labels.length; i++) {
				label = this.labels[i];
				if (label.length == 0 || this.values[i] == -1) {
					continue;
				}

				node = this.nodes[i];
				ctx.fillStyle = '#555555';
				ctx.fillText(label, node.x + this.radius * 1.5, node.y);
			}
		}
	};

	/**
	 * Draws arrow with arrow head at a distance from the start and end points
	 */
	OU.util.BinaryTree.prototype.drawArrow = function(x1, y1, x2, y2, frac1, frac2) {
		var ctx = this.context;

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

	OU.util.BinaryTree.prototype.pushOrdered = function(val, node) {

		//assume root if no node given
		if (node == undefined) {
			node = 0;
		}

		//if node is blank, add value
		var currentValue = this.values[node];
		if (currentValue == -1) {
			this.values[node] = val;
			this.render();
			return;
		}

		var leftChild = this.leftChildMap[node];
		if (leftChild == undefined) {
			console.log("Tree unbalanced: " + val + " dropped");
			return;
		}

		//unique values, so val must be <> currentValue
		if (val < currentValue) {
			this.pushOrdered(val, leftChild);
		} else if (val > currentValue) {
			this.pushOrdered(val, leftChild + 1);
		}
	};

	OU.util.BinaryTree.prototype.value = function(node) {
		var val = this.values[node];

		return (val == undefined) ? -1 : val;
	}

	OU.util.BinaryTree.prototype.clear = function() {
		var ctx = this.context, bh = OU.controlHeight;

		ctx.clearRect(this.x - this.radius, this.y - this.radius, this.w + 2 * this.radius, this.h + 2 * this.radius);
	};

	OU.base(this, params);
};
OU.inherits(OU.util.BinaryTree, OU.util);
