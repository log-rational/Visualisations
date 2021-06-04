/**
 * @fileOverview BinarySearchTree
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
 * @class Binary search tree
 * @extends OU.util.Activity
 * @param {Object} data - Holds the data content for a specific instance of the activity
 * @param {String} instance - (Optional) A unique identifier name for this instance, defaults to 'a1'
 * @param {OU.util.Controller} controller - (Optional) A reference to the controller that initialised this instance, if undefined, the superclass will generate a new controller and create the reference to it as 'this.controller'
 */
OU.activity.BinarySearchTree = function(data, instance, controller) {
	OU.activity.BinarySearchTree.prototype.canvasView = function() {
		var bh = OU.controlHeight;
		var self = this;

		//main steps containers
		this.mainSteps = data.steps.slice(0);
		this.globalSteps = this.mainSteps.slice(0);
		this.randomSteps = [];

		this.randomArray = [];

		var startOffset = data.startOffset || 0;

		//start in paused mode
		this.state = STATE_PAUSED;

		//default shuffle state
		this.shuffleOnReset = false;

		//initialize step index and count
		this.currentStep = 0;
		this.steps = this.globalSteps.length;

		//background
		this.bgLayer = new OU.util.Layer({
			container : this,
			hasEvents : true
		});
		this.bgLayer.context.gradRect();

		this.arrayWidth = 250;
		this.arrayHeight = bh;
		this.treeWidth = 250;
		this.treeHeight = 250;
		this.overlap = 0;

		//manage top left corners of drawing areas
		this.arrayAdjX = 0;
		this.arrayAdjY = 0;
		this.treeAdjX = 0;
		this.treeAdjY = 0;

		//animation settings plus temp storage between loadStep and resize/render
		this.animation = { };

		//control dimensions
		this.buttonWidth = 200;

		this.descriptionDiv = new OU.util.Div({
			container : this,
			x : 0,
			y : 0,
			h : "auto",
			w : this.w,
			showScroll : true,
			hasEvents : true,
			overflow : "auto",
			zIndex : 999
		});
		this.descriptionDiv.div.innerHTML = data.title + this.globalSteps[0].description;

		this.modelLayer = new OU.util.Layer({
			container : this,
			id : 'model-layer',
			x : 5,
			y : 4 * bh,
			w : this.w - 10,
			h : this.treeHeight + 1.5 * bh,
			hasEvents : true
		});

		this.animationLayer = new OU.util.Layer({
			container : this,
			id : 'animation-layer',
			x : 5,
			y : 4 * bh,
			w : this.w - 10,
			h : this.treeHeight + 1.5 * bh
		});
		this.animationLayer.context.font = 'bold 14px Arial';
		this.animationLayer.context.fillStyle = 'black';

		var self = this;
		if (this.data.info !== undefined) {
			this.infoButton = new OU.util.InfoButton({
				layer : this.bgLayer,//this.modelLayer,
				x : 5,//16,
				y : 5,//16,
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
			x : 0,//100,
			y : 0,//100,
			w : this.treeWidth,
			h : this.treeHeight,
			overlap : this.overlap,
			generations : 4,
			orderingProperty : data.orderingProperty
		});

		this.audioElement = document.createElement('audio');
		// create the audio element

		this.initControls();
		// initialise the controls

		//now pull in step data
		this.currentStep = startOffset;
		this.loadStep(this.globalSteps[this.currentStep]);

		//render everything
		this.resize();
	};

	OU.activity.BinarySearchTree.prototype.playSteps = function(self, steps, currentIndex, delay) {

		//at end of animation: (a) disable continue/pause button and (b) don't automatically rewind to the start
		if (currentIndex > steps.length - 1) {
			self.setPaused(true, true);
			//is paused, is last frame

			self.currentStep = 0;
			self.steps = steps;
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
		self.resize();

		var combinedDelay = delay + steps[currentIndex].description.length * 5;

		setTimeout(function() {
			self.playSteps(self, steps, currentIndex + 1, delay);

		}, combinedDelay);
	};

	OU.activity.BinarySearchTree.prototype.loadStep = function(step) {
		var self = this;
		var bh = OU.controlHeight;

		//stop any sound that's playing
		this.audioElement.pause();

		this.array.clearHighlights();

		var tmp = data.title;
		tmp = tmp.replace("</h2>", " (" + (this.currentStep + 1) + "/" + this.globalSteps.length + ")</h2>");

		this.descriptionDiv.div.innerHTML = tmp + step.description;

		if (step.clearArray) {
			this.array.clearValues();
			this.array.clear();
		}

		if (step.clearTree) {
			this.tree.clearValues();
			this.tree.labels = [];
			this.tree.clear();
		}

		//load arrayValues/treeValues if any
		if (step.arrayValues != undefined) {
			this.arrayValues = step.arrayValues.slice(0);
		}

		if (step.treeValues != undefined) {
			this.treeValues = step.treeValues.slice(0);
		}

		if (step.treeLabels != undefined) {
			this.treeLabels = step.treeLabels.slice(0);
		}

		//sort a copy of the array to set the color map
		var inOrder = this.arrayValues.slice(0);
		inOrder = inOrder.sort();

		this.colorMap = { };
		for (var i = 0; i < inOrder.length; i++) {
			var val = inOrder[i];
			var frac = (i + 1) * 1.0 / inOrder.length * 1.0;
			var col = this.getColorHexHSV(frac * 255, 1.0, 1.0);
			this.colorMap[val] = col;
		}

		this.array.setData({
			values : this.arrayValues,
			colorMap : this.colorMap
		});
		this.tree.setData({
			"values" : this.treeValues,
			"labels" : this.treeLabels,
			"colorMap" : this.colorMap,
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
			var arrayIndex = step.animation.arrayIndex;
			var treeIndex = step.animation.treeIndex;
			var value = this.array.values[arrayIndex];
			var comparison = this.tree.values[treeIndex];
			var leftChild = this.tree.leftChild(treeIndex);

			var fromDims = this.tree.dims(treeIndex);
			var toDims = { };
			if (value < comparison) {
				toDims = this.tree.dims(leftChild);
			} else {
				toDims = this.tree.dims(leftChild + 1);
			}

			this.setAnimation(value, fromDims.x, fromDims.y, toDims.x, toDims.y);
		}

		//push happens with time delay - set tree values for immediate painting
		if (step.push != undefined) {
			var val;
			for (var i = 0; i < step.push.length; i++) {
				value = this.array.values[step.push[i]];
				setTimeout(function() {
					self.tree.pushOrdered(value, 0);
					self.animation = {};
					self.animationLayer.context.clearRect(0, 0, self.animationLayer.w, self.animationLayer.h);
				}, 1000);
			}
		}

		this.prevButton.setEnabled(this.currentStep > 0);
		this.nextButton.setEnabled(this.currentStep < (this.globalSteps.length - 1));
		this.resetButton.setEnabled(true);

		if (this.audioPlay) {
			if (step.audio != undefined && step.audio.indexOf(".mp3") != -1) {
				this.audioElement.src = step.audio;
				this.audioElement.play();
			}
		}

		this.resize();
	};

	OU.activity.BinarySearchTree.prototype.setAnimation = function(txt, x1, y1, x2, y2) {
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
			}
		};
		this.prevButton.setEnabled(false);
		this.nextButton.setEnabled(false);
		this.resetButton.setEnabled(false);

		this.animate(this);
	};

	OU.activity.BinarySearchTree.prototype.setPaused = function(b, endOfSequence) {
		this.state = (b == true) ? STATE_PAUSED : STATE_RUNNING;

		var continueString = (this.currentStep == 0) ? "Start" : "Continue";

		var s = (b == true) ? continueString : "Pause";

		this.startButton.modify({
			txt : s
		});
	}

	OU.activity.BinarySearchTree.prototype.animate = function(self) {

		if (self.animation.length == 0 || self.animation.p1 == undefined || self.animation.p2 == undefined) {
			return;
		}
		var dx = Math.abs(self.animation.p1.x - self.animation.p2.x);

		var step = dx / 15;

		var dRemaining = Math.abs(self.animation.pa.x - self.animation.p2.x);

		if (dRemaining < step) {
			this.clearAnimation();
			this.prevButton.setEnabled((this.currentStep > 0) ? true : false);
			this.nextButton.setEnabled((this.currentStep < this.data.steps.length - 1) ? true : false);
			this.resetButton.setEnabled(true);
			return;
		}

		if (self.animation.pa.x > self.animation.p2.x) {
			self.animation.pa.x -= step;
		} else {
			self.animation.pa.x += step;
		}

		//calculate this.animation.pa.y
		self.animation.pa.y = ((self.animation.pa.x - self.animation.p1.x) / (self.animation.p2.x - self.animation.p1.x)) * (self.animation.p2.y - self.animation.p1.y) + self.animation.p1.y;

		//self.resize();
		self.renderAnimation();

		setTimeout(function() {
			self.animate(self);
		}, 15);
	}

	OU.activity.BinarySearchTree.prototype.clearAnimation = function() {
		this.animation = { };
	};

	OU.activity.BinarySearchTree.prototype.initControls = function() {
		var bh = OU.controlHeight, self = this;

		var adjX, adjY;
		adjX = (this.w / 2 > this.graphWidth) ? this.w / 2 + this.w / 4 - this.graphWidth / 2 : this.w / 2;
		adjY = (this.h / 2 > this.graphHeight) ? this.h / 2 + this.h / 4 - this.graphHeight / 2 : this.h / 2;

		//taken from InsertionSort
		var btnSpace = 100 / 5;
		var btnWidth = btnSpace * 0.9;
		var cssWidth = "width:" + btnWidth + "%;";
		var xPad = btnSpace * 0.05;
		var btnTop = 92.5;//91;

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
		//clickable.push(this.descriptionDiv.div);
	};

	OU.activity.BinarySearchTree.prototype.defaults = function() {
		//match brief exactly
		this.arrayValues = [5, 2, 7, 8, 3, 1, 4, 6];
	};

	OU.activity.BinarySearchTree.prototype.prevButtonPressed = function() {
		if (this.currentStep == 0) {
			return;
		}

		this.currentStep = this.currentStep - 1;
		this.loadStep(this.globalSteps[this.currentStep]);
	};

	OU.activity.BinarySearchTree.prototype.nextButtonPressed = function() {
		if (this.currentStep >= this.globalSteps.length - 1) {
			return;
		}

		this.currentStep = this.currentStep + 1;
		this.loadStep(this.globalSteps[this.currentStep]);
	};

	OU.activity.BinarySearchTree.prototype.startButtonPressed = function() {
		if (this.state == STATE_PAUSED) {
			this.setPaused(false);

			this.globalSteps = (this.shuffleOnReset) ? this.randomSteps.slice(0) : this.mainSteps.slice(0);

			this.state = STATE_RUNNING;
			this.playSteps(this, this.globalSteps, this.currentStep + 1, 2000);

		} else//this state == STATE_RUNNING
		{
			this.setPaused(true);
		}
	};

	OU.activity.BinarySearchTree.prototype.resetButtonPressed = function() {
		this.currentStep = 0;

		this.refreshRandomSteps();

		this.globalSteps = (this.shuffleOnReset) ? this.randomSteps.slice(0) : this.mainSteps.slice(0);

		this.array.clearHighlights();

		this.loadStep(this.globalSteps[this.currentStep]);
	};

	OU.activity.BinarySearchTree.prototype.refreshRandomSteps = function() {

		//randomise value array - but start with 4 or 5 to improve chance of a balanced tree
		var array = [];

		array[0] = (Math.random() < 0.5) ? 4 : 5;
		for (var i = 1; i < 8; i++) {
			rand = Math.random();
			var ok = false;
			var test;
			while (!ok) {
				test = Math.floor((Math.random() * 10) + 1);
				if (array.indexOf(test) == -1) {
					break;
				}
			}
			array[i] = test;
		}

		//assign to class-wide array
		this.randomArray = array.slice(0);

		this.randomSteps = [];

		var firstStep = {
			"clearArray" : true,
			"clearTree" : true,
			"arrayValues" : array,
			"treeValues" : [],
			"treeLabels" : [],
			"description" : "<h3>Introduction</h3><p>Here is a binary tree being built from a randomised list of unique numbers.</p><p>Note that the root is either 4 or 5 to help balance the tree.</p>"
		}
		this.randomSteps.push(firstStep);

		for (var i = 0, count = array.length; i < count; i++) {
			var step = {
				"clearArray" : true,
				"clearTree" : true,
				"arrayValues" : array,
				"treeValues" : array.slice(0, i + 1),
				"treeLabels" : [],
				"description" : "",
				"arrayHighlights" : [{
					"index" : i,
					"color" : "red"
				}]
			};
			this.randomSteps.push(step);
		}
		var finalStep = {
			"clearArray" : true,
			"clearTree" : true,
			"arrayValues" : array,
			"treeValues" : array.slice(0),
			"treeLabels" : [],
			"description" : "<h3/><p>This concludes the visualisation.</p>"
		};
		this.randomSteps.push(finalStep);
	}

	OU.activity.BinarySearchTree.prototype.randomButtonPressed = function() {
		this.shuffleOnReset = !this.shuffleOnReset;

		if (!this.shuffleOnReset) {
			return;
		}

		this.prevButton.disable();
		this.nextButton.disable();

		this.refreshRandomSteps();

		//reset position for the next playSteps() call
		this.currentStep = 0;

	};

	OU.activity.BinarySearchTree.prototype.audioButtonPressed = function() {
		this.audioPlay = !this.audioPlay;

		if (this.audioPlay == false) {
			this.audioElement.pause();
		}
	};

	OU.activity.BinarySearchTree.prototype.accessibleView = function() {
		OU.activity.BinarySearchTree.superClass_.accessibleView.call(this);
	};

	OU.activity.BinarySearchTree.prototype.resize = function() {
		var bh = OU.controlHeight;

		OU.activity.BinarySearchTree.superClass_.resize.call(this);

		this.bgLayer.resize({
			"x" : 0,
			"y" : 0,
			"w" : this.w,
			"h" : 5 * bh
		});
		
		this.descriptionDiv.slideTo({
			"x" : 50,
			"y" : 0,
			"w" : this.w - 100,
			"h" : 5 * bh
		});

		this.modelLayer.resize({
			x : 5,
			y : 4 * bh,
			w : this.w - 10,
			h : this.treeHeight + 1.5 * bh
		});
		
		this.render();
	};

	OU.activity.BinarySearchTree.prototype.render = function() {
		var ctx = this.ctx, bh = OU.controlHeight, stageHeight = this.h - 5 * bh;
		ctx.font = 'bold 14px Arial';

		//layout is side by side in landscape, top and bottom in portrait orientation

		//array
		if (this.data.forceLandscape || this.w > this.h) {
			this.arrayAdjX = 50;
			this.arrayAdjY = this.treeHeight/2;

		} else {
			this.arrayAdjX = (this.w > this.arrayWidth) ? this.w / 2 - this.arrayWidth / 2 : 0;
			this.arrayAdjY = (stageHeight / 2 > this.arrayHeight) ? stageHeight / 2 - stageHeight / 4 - this.arrayHeight / 2 + 2 * bh : 0;
		}

		//graph
		if (this.data.forceLandscape || this.w > this.h) {
			this.treeAdjX = 50 + this.arrayWidth + 30;
			this.treeAdjY = 0.75 * bh;
		} else {
			this.treeAdjX = (this.w > this.treeWidth) ? this.w / 2 - this.treeWidth / 2 : 0;
			this.treeAdjY = (stageHeight / 2 > this.treeHeight) ? stageHeight / 2 + stageHeight / 4 - this.treeHeight / 2 : treeHeight / 2;
		}

		this.renderArray();
		this.renderTree();
		this.renderAnimation();
		this.infoButton.render();
	};

	OU.activity.BinarySearchTree.prototype.renderArray = function() {
		this.array.resize({
			"x" : this.arrayAdjX,
			"y" : this.arrayAdjY,
			"w" : this.arrayWidth,
			"h" : this.arrayHeight
		});
	};

	OU.activity.BinarySearchTree.prototype.renderTree = function() {
		this.tree.resize({
			"x" : this.treeAdjX,
			"y" : this.treeAdjY,
			"w" : this.treeWidth,
			"h" : this.treeHeight
		});
	};

	OU.activity.BinarySearchTree.prototype.renderAnimation = function() {
		var ctx = this.animationLayer.context, bh = OU.controlHeight;

		var pa = this.animation.pa;
		var text = this.animation.text;
		var textWidth = this.animation.textWidth;

		ctx.clearRect(0, 0, this.animationLayer.w, this.animationLayer.h);

		if (pa != null) {
			ctx.fillText(text, pa.x - textWidth / 2, pa.y);
		}
	};

	OU.activity.BinarySearchTree.prototype.remove = function() {
		OU.activity.BinarySearchTree.superClass_.remove.call(this);
	};

	OU.activity.BinarySearchTree.prototype.showMessage = function(buffer) {
		var el = document.getElementById("messageDiv");
		el.innerHTML = buffer;
		el.style.display = "block";
	};

	// ported from here:
	//http://www.cs.rit.edu/~ncs/color/t_convert.html
	OU.activity.BinarySearchTree.prototype.getColorHexHSV = function(h, s, v) {
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
OU.inherits(OU.activity.BinarySearchTree, OU.util.Activity);

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
	 * Clears all array values
	 */
	OU.util.BoxArray.prototype.clearValues = function() {
		this.values = [];
	};

	/**
	 * Redraws array background
	 */
	OU.util.BoxArray.prototype.clear = function() {
		var ctx = this.context, bh = OU.controlHeight;
		ctx.clearRect(this.x - this.radius, this.y - this.radius, this.w + 2 * this.radius, this.h + 2 * this.radius);
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

	OU.util.BoxArray.prototype.dims = function(index) {
		var boxWidth = this.w / this.values.length;
		//includes -1 entries
		var x = this.x + index * boxWidth;
		var y = this.y;
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

		/*
		 if (this.length < 1) {
		 return;
		 }
		 */

		var len = this.values.length;
		var boxWidth = this.w / len;

		ctx.save();

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

			ctx.strokeStyle = 'black';
			ctx.fillStyle = 'black';

			ctx.fillText(this.values[i], calcX + boxWidth / 2 - textWidth / 2, this.y + bh / 2);
		}

		if (this.highlights != undefined && this.highlights.length > 0) {
			var highlight;
			for (var i = 0; i < this.highlights.length; i++) {
				highlight = this.highlights[i];
				this.renderHighlight(highlight.index, highlight.color);
			}
		}

		ctx.restore();
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

		ctx.fillStyle = color;
		ctx.strokeStyle = 'black';

		ctx.beginPath();

		//top
		ctx.moveTo(this.x + index * boxWidth + boxWidth * 0.5, this.y + bh);
		ctx.lineTo(this.x + index * boxWidth + boxWidth, this.y + 1.5 * bh);
		ctx.lineTo(this.x + index * boxWidth + boxWidth * 0.75, this.y + 1.5 * bh);
		ctx.lineTo(this.x + index * boxWidth + boxWidth * 0.75, this.y + 2.5 * bh);
		ctx.lineTo(this.x + index * boxWidth + boxWidth * 0.25, this.y + 2.5 * bh);
		ctx.lineTo(this.x + index * boxWidth + boxWidth * 0.25, this.y + 1.5 * bh);
		ctx.lineTo(this.x + index * boxWidth, this.y + 1.5 * bh);
		//ctx.lineTo(this.x + index * boxWidth + boxWidth * 0.5, this.y + bh);
		ctx.closePath();

		ctx.stroke();
		ctx.fill();
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
	OU.util.BinaryTree.prototype.dims = function(index) {
		var node = this.nodes[index];

		var x = node.x;
		var y = node.y;
		var w = 2 * this.radius;
		var h = 2 * this.radius;

		if (this.values[index] != -1) {
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

		ctx.closePath();

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

		ctx.closePath();

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

				if (color.length > 0) {
					ctx.beginPath();
					ctx.fillStyle = color;
					node = this.nodes[i];
					ctx.moveTo(node.x + this.radius, node.y)
					ctx.arc(node.x, node.y, this.radius, 0, 2 * Math.PI, false);
					ctx.fill();
					ctx.stroke();
				}
			}
		}

		ctx.beginPath();

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

		ctx.closePath();
	};

	/**
	 * Draws arrow with arrow head at a distance from the start and end points
	 */
	OU.util.BinaryTree.prototype.drawArrow = function(x1, y1, x2, y2, frac1, frac2) {
		var ctx = this.context;

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
