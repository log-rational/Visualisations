/**
 * @fileOverview HeapSort
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
 * @class HeapSort
 * @extends OU.util.Activity
 * @param {Object} data - Holds the data content for a specific instance of the activity
 * @param {String} instance - (Optional) A unique identifier name for this instance, defaults to 'a1'
 * @param {OU.util.Controller} controller - (Optional) A reference to the controller that initialised this instance, if undefined, the superclass will generate a new controller and create the reference to it as 'this.controller'
 */

var STATE_PAUSED = 0;
var STATE_RUNNING = 1;

OU.activity.HeapSort = function(data, instance, controller) {
	OU.activity.HeapSort.prototype.canvasView = function() {
		var bh = OU.controlHeight;
		var self = this;

		//audio defaults to on
		this.audioPlay = true;

		//start in paused mode
		this.state = STATE_PAUSED;

		//initialize step index and count
		//this.globalStepIndex = 0;
		//25 is end of build phase
		this.steps = data.steps.length;

		//fast animation flag
		this.fastAnimation = false;

		//default shuffle state
		this.shuffleOnReset = false;

		//clear to be swapped obj
		this.toBeSwapped = {};

		//global steps management
		this.globalSteps = [];
		this.globalStepIndex = 0;

		//ordered steps
		this.orderedSteps = [];

		//background
		this.bgLayer = new OU.util.Layer({
			container : this,
			x : 5,
			y : 0,
			w : this.w - 10,
			h : 5 * bh,
			hasEvents : true
		});

		this.arrayWidth = 300;
		this.arrayHeight = bh;
		this.treeWidth = 440;
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
		this.animations = [];

		//control dimensions
		this.buttonWidth = 200;

		//responsive design or fixed
		this.forcePortrait = this.data.forcePortrait || false;
		this.forceLandscape = this.data.forceLandscape || false;

		//default label array
		this.allLabels = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"];

		this.descriptionDiv = new OU.util.Div({
			container : this,
			x : 0,
			y : 0,
			h : 5 * bh,
			w : this.w,
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
			y : bh,
			w : this.w,
			h : this.h - bh,
			hasEvents : true
		});

		this.animationLayer = new OU.util.Layer({
			container : this,
			id : 'animation-layer',
			x : 0,
			y : 4 * bh,
			w : this.w,
			h : this.h - 5 * bh,
			hasEvents : true
		});

		this.animationLayer.context.font = 'bold 14px Arial';

		var self = this;
		if (this.data.info !== undefined) {
			this.infoButton = new OU.util.InfoButton({
				layer : this.bgLayer,
				x : 5,
				y : 5, //16,
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
			"x" : 0,
			"y" : 0,
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
			generations : 4,
			orderingProperty : data.orderingProperty
		});

		this.audioElement = document.createElement('audio');
		// create the audio element

		this.initControls();

		//ensure steps are available before showing anything
		this.refreshGlobalSteps();

		//now pull in step data
		this.loadStep(this.data.steps[0]);

		this.prevButton.disable();

		//render everything
		this.resize();
	};

	OU.activity.HeapSort.prototype.loadStep = function(step) {
		var self = this, bh = OU.controlHeight;

		if (step == undefined) {
			return;
		}

		//pause all running audio
		this.audioElement.pause();

		//control animation speed
		var fastAnimationMemory = this.fastAnimation;
		if (step.animation != undefined && step.animation.fast != undefined && step.animation.fast == true) {
			this.fastAnimation = true;
		}

		//if swapping in current step, remember values
		if (step.swap != undefined) {
			var swapValueFirst = this.arrayValues[step.swap.first];
			var swapValueSecond = this.arrayValues[step.swap.second];
		}

		this.array.clearHighlights();

		var tmp = data.title;
		tmp = tmp.replace("</h2>", " (" + (this.globalStepIndex + 1) + "/" + this.globalSteps.length + ")</h2>");

		this.descriptionDiv.div.innerHTML = tmp + step.description;

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

		//sort a copy of the larger array to set the color map
		var inOrder = [];
		if (this.arrayValues.length > this.treeValues.length) {
			inOrder = this.arrayValues.slice(0);
		} else {
			inOrder = this.treeValues.slice(0);
		}

		//override if refresh has been defined
		if (step.refresh != undefined) {
			inOrder = step.refresh.arrayValues.slice(0);
		}

		inOrder = inOrder.sort();

		this.colorMap = { };

		//retain in case inOrder has shrunk and we need to reinsert values
		if (step.indexColors != undefined && step.indexColors == true) {
			var max = 16;
			for (var i = 0; i <= max; i++) {
				var val = i;
				var frac = (i + 1) * 1.0 / max * 1.0;
				var col = this.getColorHexHSV(frac * 255, 1.0, 1.0);
				this.colorMap[val] = col;
			}
		} else {
			var max = 100;
			for (var i = 0; i <= 100; i++) {
				var val = i;
				var frac = (i + 1) * 1.0 / max * 1.0;
				var col = this.getColorHexHSV(frac * 255, 1.0, 1.0);
				this.colorMap[val] = col;
			}
		}

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

		this.array.setAuxValues((step.auxArrayValues) ? step.auxArrayValues : []);
		this.array.setAuxHighlights((step.auxArrayHighlights) ? step.auxArrayHighlights : []);
		this.array.setAuxLabel((step.auxLabel) ? step.auxLabel : "");

		//new array value added to tree
		if (step.rootAnimation != undefined) {
			var arrayIndex = step.rootAnimation;
			var fromDims = this.array.dims(arrayIndex);
			var text = this.array.values[arrayIndex];

			var toDims = this.tree.dims(0, true);

			this.setAnimation(text, fromDims.x, fromDims.y + bh / 2, toDims.x, toDims.y);
		}

		if (step.swap != undefined) {
			var first = step.swap.first, second = step.swap.second;
			var val1 = swapValueFirst;
			var val2 = swapValueSecond;

			var arrayDims1 = this.array.dims(first);
			var arrayDims2 = this.array.dims(second);

			var treeDims1 = this.tree.dims(first, true);
			var treeDims2 = this.tree.dims(second, true);

			var arrayXOffset = this.array.boxWidth() / 2;
			var arrayYOffset = bh / 2;

			//disable Next button but only if push/refresh is defined (so there's a clear re-enabling point)
			if (step.push != undefined || step.refresh != undefined) {
				this.prevButton.disable();
				this.nextButton.disable();
			}

			if (val1 == -1 && val2 == -1) {
				//skip - timers may be firing out of turn
			} else {
				this.setAnimation(val1, arrayDims1.x + arrayXOffset, arrayDims1.y + arrayYOffset, arrayDims2.x + arrayXOffset, arrayDims2.y + arrayYOffset, 0);
				this.setAnimation(val2, arrayDims2.x + arrayXOffset, arrayDims2.y + arrayYOffset, arrayDims1.x + arrayXOffset, arrayDims1.y + arrayYOffset, 1);

				this.setAnimation(val1, treeDims1.x, treeDims1.y, treeDims2.x, treeDims2.y, 2);
				this.setAnimation(val2, treeDims2.x, treeDims2.y, treeDims1.x, treeDims1.y, 3);

				this.prevButton.disable();
				this.nextButton.disable();
				this.resetButton.disable();
			}
		}

		if (this.audioPlay) {
			if (step.audio != undefined && step.audio.indexOf(".mp3") != -1) {
				this.audioElement.src = step.audio;
				this.audioElement.play();
			}
		}

		//push happens with time delay - set tree values for immediate painting
		var delay = 750;
		//1000;

		var colorMap = this.colorMap;

		if (step.refresh != undefined) {
			setTimeout(function() {
				var bh = OU.controlHeight;
				
				self.refresh(self, step.refresh, colorMap);
				self.prevButton.enable();
				self.nextButton.enable();
				self.resetButton.enable();
				self.animations = [];
				self.animationLayer.context.clearRect(0, 0, self.w, self.h - 6 * bh);
			}, delay);
		}

		//avoid for now
		if (step.toOrdered != undefined && step.toOrdered == true) {
			this.toOrdered();
		}

		this.fastAnimation = fastAnimationMemory;

		this.resize();
	};

	/*
	 * returns all steps req'd for number insertion
	 */
	OU.activity.HeapSort.prototype.toHeap = function(a) {

		var steps = [];

		var step = { };

		//initial state: empty tree and array; input array shown
		step.clearArray = true;
		step.clearTree = true;
		step.arrayValues = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
		step.arrayHighlights = [];
		step.treeHighlights = [];
		step.treeValues = [];
		step.treeLabels = this.allLabels;
		step.description = "<h3>Heap sorting</h3><p>We begin by adding all elements of the input list to the heap.</p>";
		step.auxArrayValues = a.slice(0);
		step.auxLabel = "Input:";
		steps.push(step);

		var b = [];

		for (var i = 0; i < a.length; i++) {
			var val = a[i];
			b[i] = val;

			step = { };
			step.clearArray = true;
			step.clearTree = true;

			step.arrayValues = b.slice(0, i + 1);
			step.treeValues = b.slice(0, i + 1);

			step.arrayValues = this.padArray(step.arrayValues.slice(0), 15, -1);
			step.treeValues = this.padArray(step.treeValues.slice(0), 15, -1);
			b = this.padArray(b.slice(0), 15, -1);

			step.arrayHighlights = [{
				index : i,
				color : "red"
			}];
			step.treeHighlights = [{
				index : i,
				color : "red"
			}];
			step.auxArrayValues = a.slice(0);
			step.auxArrayHighlights = [i];
			step.auxLabel = "Input:";
			step.description = "<h3>Heap sorting</h3><p>We add " + val + ".";
			steps.push(step);

			this.arrayValues = step.arrayValues.slice(0);
			this.treeValues = step.treeValues.slice(0);
			b = this.arrayValues.slice(0);

			//tbd: while loop checking ordering principle still applies
			var guard = 20;
			while (i > 0 && !this.heapOrderMaintained(this.arrayValues.slice(0))) {
				//highlight
				step = { };

				step.clearArray = true;
				step.clearTree = true;

				step.arrayValues = b.slice(0, i + 1);
				step.treeValues = b.slice(0, i + 1);

				step.arrayValues = this.padArray(step.arrayValues.slice(), 15, -1);
				step.treeValues = this.padArray(step.treeValues.slice(), 15, -1);

				step.treeLabels = this.allLabels.slice(0);
				step.arrayHighlights = [{
					index : this.toBeSwapped.first,
					color : "green"
				}, {
					index : this.toBeSwapped.second,
					color : "red"
				}];
				step.treeHighlights = [{
					index : this.toBeSwapped.first,
					color : "green"
				}, {
					index : this.toBeSwapped.second,
					color : "red"
				}];
				step.description = "<h3>Heap sorting</h3><p>" + b[this.toBeSwapped.first] + " is greater than " + b[this.toBeSwapped.second] + ", so swap nodes " + this.toBeSwapped.first + " and " + this.toBeSwapped.second + ".</p>";
				step.auxArrayValues = a.slice(0);
				step.auxArrayHighlights = [i];
				step.auxLabel = "Input:";

				steps.push(step);

				//then swap
				step = { };

				var gapValues = b.slice(0, i + 1);
				gapValues[this.toBeSwapped.first] = -1;
				gapValues[this.toBeSwapped.second] = -1;

				step.clearArray = true;
				step.clearTree = true;
				step.arrayValues = gapValues;
				step.treeValues = gapValues;

				step.arrayValues = this.padArray(step.arrayValues.slice(0), 15, -1);
				step.treeValues = this.padArray(step.treeValues.slice(0), 15, -1);

				step.treeLabels = this.allLabels.slice(0);

				step.swap = {
					first : this.toBeSwapped.first,
					second : this.toBeSwapped.second
				};

				step.arrayHighlights = {};
				step.treeHighlights = {};
				step.description = "<h3>Heap sorting</h3>";
				step.auxArrayValues = a.slice(0);
				//, i + 1);
				step.auxArrayHighlights = [i];
				step.auxLabel = "Input:";

				//now swap values
				var tmp = b[this.toBeSwapped.first];
				b[this.toBeSwapped.first] = b[this.toBeSwapped.second];
				b[this.toBeSwapped.second] = tmp;

				this.treeValues = b.slice(0, i + 1);
				this.arrayValues = b.slice(0, i + 1);

				//add refresh object as we're no longer moving on to next step automatically
				if (step.swap) {
					var padded = this.padArray(this.arrayValues.slice(0), 15, -1);

					step.refresh = {
						arrayValues : this.padArray(this.arrayValues.slice(0), 15, -1),
						treeValues : this.treeValues.slice(0),
						treeLabels : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
					};
				}

				steps.push(step);

				if (--guard < 0) {
					break;
				}
			}
		}

		return steps;
	}
	/*
	 * pad array a to length len with value val
	 */
	OU.activity.HeapSort.prototype.padArray = function(a, len, val) {
		while (a.length < len) {
			a.push(val);
		}
		return a.slice(0);
	}
	/*
	 * animates full ordered array extraction
	 */
	OU.activity.HeapSort.prototype.toOrdered = function() {

		var steps = [];

		var values = this.treeValues.slice(0);
		var ordered = [];

		var step = { };
		var count = this.validNodeCount(values.slice(0));

		for (var i = 0; i < count; i++) {

			if (this.validNodeCount(values.slice(0)) == 0) {
				break;
			}

			//highlight root
			step = { };
			step.clearArray = true;
			step.clearTree = true;
			step.arrayValues = this.padArray(values.slice(0), 15, -1);
			step.treeValues = values.slice(0);
			step.treeLabels = this.allLabels.slice(0);
			step.arrayHighlights = {
				index : 0,
				color : "red"
			};
			step.treeHighlights = {
				index : 0,
				color : "red"
			};
			step.auxArrayValues = ordered.slice(0, ordered.length);
			step.auxLabel = "Output:";
			step.description = "<h3>Heap sorting: retrieving numbers in sort order</h3><p>Root key " + values[0] + "...</p>";
			steps.push(step);

			//show former root bold in result array, no array/tree highlights
			ordered.push(values[0]);
			step = { };
			step.clearArray = true;
			step.clearTree = true;

			var lastIndex = this.lastValidIndex(values.slice(0));
			var last = values[lastIndex];

			values[0] = -1;

			step.arrayValues = this.padArray(values.slice(0), 15, -1);
			step.treeValues = values.slice(0);

			step.treeLabels = this.allLabels.slice(0);
			step.arrayHighlights = [];
			step.treeHighlights = [];
			step.description = "<h3>Heap sorting: retrieving numbers in sort order</h3><p>...is added to the result list.</p>";
			step.auxArrayValues = ordered.slice(0, ordered.length);
			step.auxArrayHighlights = [];
			step.auxArrayHighlights.push(ordered.length - 1);
			step.auxLabel = "Output:";

			steps.push(step);

			if (this.validNodeCount(values.slice(0)) == 0) {
				break;
			}

			//take away root, show in bold under results, highlight last
			step = { };
			step.clearArray = true;
			step.clearTree = true;

			//remove root key
			values[0] = -1;

			var lastIndex = this.lastValidIndex(values.slice(0));
			var last = values[lastIndex];

			//to prevent three nodes remaining in the value arrays,
			//remove any elements also found in ordered
			for (var j = 0; j < values.length; j++) {
				var val = values[j];

				if (val == -1) {
					continue;
				}

				if ((ordered.indexOf(val)) != -1) {
					values[j] = -1;
				}
			}

			step.arrayValues = this.padArray(values.slice(0), 15, -1);
			step.treeValues = values.slice(0);

			step.treeLabels = this.allLabels.slice(0);
			step.arrayHighlights = [{
				index : lastIndex,
				color : "yellow"
			}];
			step.treeHighlights = [{
				index : lastIndex,
				color : "yellow"
			}];

			step.description = "<h3>Heap sorting: retrieving numbers in sort order</h3><p>As the last key in the heap, " + last + " becomes the new root.</p>";
			step.auxArrayValues = ordered.slice(0, ordered.length);
			step.auxArrayHighlights = [];
			step.auxLabel = "Output:";

			if (ordered.length > 0) {
				step.auxArrayHighlights.push(ordered.length - 1);
			}

			steps.push(step);

			//highlight new root
			step = { };
			step.clearArray = true;
			step.clearTree = true;

			var lastIndex = this.lastValidIndex(values.slice(0));
			var last = values[lastIndex];

			values[0] = last;
			values[lastIndex] = -1;

			step.arrayValues = this.padArray(values.slice(0), 15, -1);
			step.treeValues = values.slice(0);

			step.treeLabels = this.allLabels.slice(0);
			step.arrayHighlights = [{
				index : 0,
				color : "yellow"
			}];
			step.treeHighlights = [{
				index : 0,
				color : "yellow"
			}];
			step.description = "<h3>Heap sorting: retrieving numbers in sort order</h3><p>As the last key in the heap, " + last + " becomes the new root.</p>";
			step.auxArrayValues = ordered.slice(0, ordered.length);
			step.auxArrayHighlights = [];
			step.auxArrayHighlights.push(ordered.length - 1);
			step.auxLabel = "Output:";

			steps.push(step);

			//show new root with highlight
			step = { };

			step.clearArray = true;
			step.clearTree = true;

			//taken from prev. step
			step.arrayValues = this.padArray(values.slice(0), 15, -1);
			step.treeValues = values.slice(0);

			step.treeLabels = this.allLabels.slice(0);
			step.arrayHighlights = [];
			step.treeHighlights = [];
			step.description = "<h3>Heap sorting</h3><p>With " + values[0] + " as root key, the algorithm has to ensure heap order is preserved.</p>";
			step.auxArrayValues = ordered.slice(0, ordered.length);
			step.auxArrayHighlights = [];
			step.auxArrayHighlights.push(ordered.length - 1);
			step.auxLabel = "Output:";
			steps.push(step);

			var guard = 20;
			while (!this.heapOrderMaintained(values.slice(0))) {
				//highlight
				step = { };

				step.clearArray = true;
				step.clearTree = true;
				step.arrayValues = this.padArray(values.slice(0), 15, -1);
				step.treeValues = values.slice(0);
				step.treeLabels = this.allLabels.slice(0);
				step.arrayHighlights = [{
					index : this.toBeSwapped.first,
					color : "red"
				}, {
					index : this.toBeSwapped.second,
					color : "green"
				}];
				step.treeHighlights = [{
					index : this.toBeSwapped.first,
					color : "red"
				}, {
					index : this.toBeSwapped.second,
					color : "green"
				}];
				step.description = "<h3>Heap sorting: retrieving numbers in sort order</h3><p>" + values[this.toBeSwapped.first] + " is greater than " + values[this.toBeSwapped.second] + ", so swap nodes " + this.toBeSwapped.first + " and " + this.toBeSwapped.second + ".</p>";
				step.auxArrayValues = ordered.slice(0, ordered.length);
				step.auxArrayHighlights = [];
				step.auxArrayHighlights.push(ordered.length - 1);
				step.auxLabel = "Output:";

				steps.push(step);

				//then swap
				step = { };

				var gapValues = values.slice(0);
				gapValues[this.toBeSwapped.first] = -1;
				gapValues[this.toBeSwapped.second] = -1;

				step.clearArray = true;
				step.clearTree = true;
				step.arrayValues = this.padArray(gapValues.slice(0), 15, -1);
				step.treeValues = gapValues.slice(0);
				step.treeLabels = this.allLabels.slice(0);

				step.swap = {
					first : this.toBeSwapped.first,
					second : this.toBeSwapped.second
				};

				step.arrayHighlights = {};
				step.treeHighlights = {};
				step.description = "<h3>Heap sorting: retrieving numbers in sort order</h3>";
				step.auxArrayValues = ordered.slice(0, ordered.length);
				step.auxArrayHighlights = [];
				step.auxArrayHighlights.push(ordered.length - 1);
				step.auxLabel = "Output:";

				//now swap values
				var tmp = values[this.toBeSwapped.first];
				values[this.toBeSwapped.first] = values[this.toBeSwapped.second];
				values[this.toBeSwapped.second] = tmp;

				//add refresh object as we're no longer moving on to next step automatically
				if (step.swap) {
					step.refresh = {
						arrayValues : this.padArray(values.slice(0), 15, -1),
						treeValues : values.slice(0),
						treeLabels : this.allLabels
					};
				}

				steps.push(step);

				if (--guard < 0) {
					break;
				}
			}
		}

		return steps.slice(0);
	};

	OU.activity.HeapSort.prototype.playSteps = function(self, steps, aux, currentIndex, delay) {

		//at end of animation: (a) disable continue/pause button and (b) don't automatically rewind to the start
		if (currentIndex > steps.length - 1) {
			self.startButton.disable();
			return;
		}

		//generally: when paused, stop here
		if (this.state == STATE_PAUSED) {
			return;
		}

		self.startButton.enable();

		//update global index
		self.globalStepIndex = currentIndex;
		//end

		self.loadStep(steps[currentIndex]);

		setTimeout(function() {
			self.playSteps(self, steps, aux, currentIndex + 1, delay);
		}, delay);
	};

	/*
	 * checks if heap order property maintained
	 */
	OU.activity.HeapSort.prototype.heapOrderMaintained = function(values) {

		var count = this.lastValidIndex(values.slice(0)) + 1;
		for (var i = 0; i < count; i++) {

			var val = values[i];
			if (val == -1 || val == undefined) {// || comp1 == -1 || comp2 == undefined || comp1 == -1 || comp2 == undefined) {
				continue;
			}

			var childIndexL = i * 2 + 1;
			var childIndexR = i * 2 + 2;

			//L < R
			if (values[childIndexL] < values[childIndexR]) {
				var comp1 = values[childIndexL];
				var comp2 = values[childIndexR];

				if (comp1 < val && comp1 != -1 && comp1 != undefined && !isNaN(comp1)) {
					this.toBeSwapped = {
						first : i,
						second : childIndexL
					};
					return false;
				} else if (comp2 < val && comp2 != -1 && comp2 != undefined && !isNan(comp2)) {
					this.toBeSwapped = {
						first : i,
						second : childIndexR
					}
					return false;
				}

			}
			//R < L
			else {
				var comp1 = values[childIndexR];
				var comp2 = values[childIndexL];

				if (comp1 < val && comp1 != -1 && comp1 != undefined && !isNaN(comp1)) {
					this.toBeSwapped = {
						first : i,
						second : childIndexR
					};
					return false;
				} else if (comp2 < val && comp2 != -1 && comp2 != undefined && !isNaN(comp2)) {
					this.toBeSwapped = {
						first : i,
						second : childIndexL
					}
					return false;
				}
			}
		}
		return true;
	};

	/*
	 * returns valid element count
	 */
	OU.activity.HeapSort.prototype.lastValidIndex = function(a) {
		if (a == undefined) {
			a = this.treeValues.slice(0);
		}

		var last = -1;
		for (var i = 0; i < a.length; i++) {
			var el = a[i];
			if (el != -1 && el != undefined && el.length != 0 && !isNaN(el)) {
				last = i;
			}
		}
		return last;
	};

	OU.activity.HeapSort.prototype.validNodeCount = function(a) {
		if (a == undefined) {
			a = this.treeValues;
		}
		var count = 0;
		for (var i = 0; i < a.length; i++) {
			var el = a[i];
			if (el != -1 && el != undefined && el.length != 0 && !isNaN(el)) {
				count++;
			}
		}
		return count;
	}
	/*
	 * refreshes tree and array
	 */

	OU.activity.HeapSort.prototype.refresh = function(self, obj, colorMap) {

		self.array.setData({
			values : obj.arrayValues,
			colorMap : colorMap,
			labels : obj.treeLabels
		});
		self.tree.setData({
			values : obj.treeValues,
			colorMap : colorMap,
			labels : obj.treeLabels
		});

		self.resize();
	};

	/*
	 * sets off single-object animation
	 */
	OU.activity.HeapSort.prototype.setAnimation = function(txt, x1, y1, x2, y2, layer) {
		if (layer == undefined) {
			layer = 0;
		}

		this.animations[layer] = {
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

		this.prevButton.disable();
		this.nextButton.disable();
		this.resetButton.disable();

		this.animate(this, layer);
	};

	OU.activity.HeapSort.prototype.animate = function(self, layer) {

		if (layer == undefined) {
			layer = 0;
		}

		var dx = Math.abs(self.animations[layer].p1.x - self.animations[layer].p2.x);
		var dy = Math.abs(self.animations[layer].p1.y - self.animations[layer].p2.y);

		var step = dx / 20;

		var dRemaining = Math.abs(self.animations[layer].pa.x - self.animations[layer].p2.x);

		if (dRemaining < step) {
			//self.clearAnimation(layer);
			return;
		}

		if (self.animations[layer].pa.x > self.animations[layer].p2.x) {
			self.animations[layer].pa.x -= step;
		} else {
			self.animations[layer].pa.x += step;
		}

		//calculate this.animation.pa.y
		self.animations[layer].pa.y = ((self.animations[layer].pa.x - self.animations[layer].p1.x) / (self.animations[layer].p2.x - self.animations[layer].p1.x)) * (self.animations[layer].p2.y - self.animations[layer].p1.y) + self.animations[layer].p1.y;
		//}

		//only redraw animation layer
		self.animationLoop();

		setTimeout(function() {
			self.animate(self, layer);
		}, 20);
	};

	OU.activity.HeapSort.prototype.clearAnimation = function(layer) {
		this.animations[layer] = { };
	};

	OU.activity.HeapSort.prototype.initControls = function() {
		var bh = OU.controlHeight, self = this;

		//taken from InsertionSort
		var btnSpace = 100 / 5;
		var btnWidth = btnSpace * 0.9;
		var cssWidth = "width:" + btnWidth + "%;";
		var xPad = btnSpace * 0.05;
		var btnTop = 92.5;

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

		//tbd: add buttons
		var clickable = this.modelLayer.events.clickable;
		clickable.length = 0;
		clickable.push(this.infoButton);
	};

	OU.activity.HeapSort.prototype.refreshGlobalSteps = function() {
		this.globalSteps = [];

		if (this.shuffleOnReset == true) {
			//randomise value array
			var a = [];
			for (var i = 0; i < 9; i++) {
				var test = Math.floor(Math.random() * 99);
				while (a.indexOf(test) != -1) {
					test = Math.floor(Math.random() * 99);
				}

				a[i] = test;
			}

			var toHeapSteps = this.toHeap(a);
			var toOrderedSteps = this.toOrdered();
			this.globalSteps = toHeapSteps.concat(toOrderedSteps);

		} else {
			this.globalSteps = this.data.steps.slice(0);
		}
	}

	OU.activity.HeapSort.prototype.resetButtonPressed = function() {
		this.refreshGlobalSteps();
		this.globalStepIndex = this.data.startOffset;
		//0;
		this.loadStep(this.globalSteps[this.data.startOffset]);
		//set to 0 in data on release
		this.prevButton.disable();
		//already at start
		this.nextButton.enable();
		this.resize();
	};

	OU.activity.HeapSort.prototype.shuffleButtonPressed = function() {
		this.shuffleOnReset = !this.shuffleOnReset;
		this.shuffleButton.state(this.shuffleOnReset);
	};

	//HTML button handlers
	OU.activity.HeapSort.prototype.prevButtonPressed = function() {
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

	OU.activity.HeapSort.prototype.nextButtonPressed = function() {
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

	OU.activity.HeapSort.prototype.randomButtonPressed = function() {
		this.shuffleOnReset = !this.shuffleOnReset;

		if (!this.shuffleOnReset) {
			return;
		}

		this.prevButton.disable();
		this.nextButton.disable();
	};

	OU.activity.HeapSort.prototype.audioButtonPressed = function() {
		this.audioPlay = !this.audioPlay;

		if (this.audioPlay == false) {
			this.audioElement.pause();
		}
	};

	OU.activity.HeapSort.prototype.accessibleView = function() {
		OU.activity.HeapSort.superClass_.accessibleView.call(this);
	};

	OU.activity.HeapSort.prototype.resize = function() {
		var bh = OU.controlHeight;

		OU.activity.HeapSort.superClass_.resize.call(this);

		this.bgLayer.resize();

		this.descriptionDiv.slideTo({
			"x" : 50,
			"y" : 0,
			"w" : this.w - 100,
			"h" : 4 * bh
		});

		this.modelLayer.resize({
			x : 5,
			y : 4.0 * bh,
			w : this.w - 10,
			h : this.treeHeight + 1.5 * bh
		});
		this.render();
	};

	OU.activity.HeapSort.prototype.render = function() {
		var ctx = this.ctx, bh = OU.controlHeight, stageHeight = this.h - bh;
		ctx.font = 'bold 14px Arial';

		//layout is side by side in landscape, top and bottom in portrait orientation

		//array
		if (this.data.forceLandscape || (this.w > this.h && this.forcePortrait == false)) {
			this.arrayAdjX = 65;
			//allow room for left-hand label
			this.arrayAdjY = 1.25 * bh;
			//this.treeHeight / 2;
		} else {
			this.arrayAdjX = (this.w > this.arrayWidth) ? this.w / 2 - this.arrayWidth / 2 : 0;
			this.arrayAdjY = stageHeight - this.arrayHeight - 1.5 * bh;
		}

		//tree
		if (this.data.forceLandscape || (this.w > this.h && this.forcePortrait == false)) {
			this.treeAdjX = 65 + this.arrayWidth;
			// + 25;
			this.treeAdjY = 0.75 * bh;
		} else {
			this.treeAdjX = (this.w > this.treeWidth) ? this.w / 2 - this.treeWidth / 2 : 0;
			this.treeAdjY = stageHeight - this.arrayHeight - 3.5 * bh - this.treeHeight;
		}

		this.renderArray();
		this.renderTree();

		this.infoButton.render();

		this.animationLoop();
	};

	OU.activity.HeapSort.prototype.animationLoop = function() {
		var ctx = this.animationLayer.context, bh = OU.controlHeight;

		if (this.animations != undefined) {
			ctx.clearRect(0, 0, this.w, this.h - 6 * bh);

			ctx.beginPath();

			ctx.fillStyle = 'black';
			for (var i = 0; i < this.animations.length; i++) {
				this.renderAnimation(i);
			}
			ctx.fill();
		}
	};

	OU.activity.HeapSort.prototype.renderArray = function() {
		this.array.resize({
			"x" : this.arrayAdjX,
			"y" : this.arrayAdjY,
			"w" : this.arrayWidth,
			"h" : this.arrayHeight
		});
	};

	OU.activity.HeapSort.prototype.renderTree = function() {
		this.tree.resize({
			"x" : this.treeAdjX,
			"y" : this.treeAdjY,
			"w" : this.treeWidth,
			"h" : this.treeHeight
		});
	};

	OU.activity.HeapSort.prototype.renderAnimation = function(layer) {
		var ctx = this.animationLayer.context, bh = OU.controlHeight;

		layer = (layer == undefined) ? 0 : layer;

		var pa = this.animations[layer].pa;
		var text = this.animations[layer].text;
		var textWidth = this.animations[layer].textWidth;

		if (pa != null) {
			ctx.fillText(text, pa.x - textWidth / 2, pa.y);
		}
	};

	OU.activity.HeapSort.prototype.remove = function() {
		OU.activity.HeapSort.superClass_.remove.call(this);
	};

	OU.activity.HeapSort.prototype.showMessage = function(buffer) {
		var el = document.getElementById("messageDiv");
		el.innerHTML = buffer;
		el.style.display = "block";
	};

	// ported from here:
	//http://www.cs.rit.edu/~ncs/color/t_convert.html
	OU.activity.HeapSort.prototype.getColorHexHSV = function(h, s, v) {
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
OU.inherits(OU.activity.HeapSort, OU.util.Activity);

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
	this.auxValues = [];
	this.auxHighlights = [];
	this.auxLabel = "";

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

	OU.util.BoxArray.prototype.clearHighlights = function() {
		this.highlights = [];
	};

	OU.util.BoxArray.prototype.setAuxLabel = function(label) {
		this.auxLabel = label;
	};

	/**
	 * Sets aux settings
	 */
	OU.util.BoxArray.prototype.setAuxValues = function(a) {
		this.auxValues = a;
	};

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

			if (val != -1 && val in this.colorMap) {//(val != -1 && val in this.colorMap) {
				var col = this.colorMap[val];
				ctx.fillStyle = col;
				ctx.fillRect(calcX - this.overlap, this.y - this.overlap, boxWidth + 2 * this.overlap, bh + 2 * this.overlap);
			}

			ctx.beginPath();
			ctx.fillStyle = 'black';
			ctx.strokeRect(calcX, this.y, boxWidth, bh);
			if (val != '-1') {
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
				ctx.fillStyle = 'black';
				ctx.fillText(val, dims.x + boxWidth / 2 - auxWidth / 2, dims.y - bh / 2);
				ctx.closePath();
			}
			ctx.font = "bold 14px Arial";
		}

		if (this.auxLabel != undefined && this.auxLabel.length > 0) {
			var dims = this.dims(0);

			var auxWidth = ctx.measureText(this.auxLabel).width;

			ctx.beginPath();
			ctx.fillStyle = 'black';
			ctx.fillText(this.auxLabel, dims.x - boxWidth / 2 - auxWidth, dims.y - bh / 2);
			ctx.closePath
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
		ctx.strokeStyle = 'black';
		//ctx.shadowColor = 'orange';
		//ctx.shadowBlur = 10;

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
	if (params.orderingProperty != undefined) {
		this.orderingProperty = params.orderingProperty;
	} else {
		this.orderingProperty = true;
	}

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

	OU.util.BinaryTree.prototype.setValue = function(index, val) {
		this.values[index] = val;
		this.resize();
	}
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
				//continue? keep drawing arrows for now
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

				color = (val != -1) ? this.colorMap[val] : 'white';

				if (color != undefined && color.length > 0) {
					ctx.beginPath();
					ctx.fillStyle = color;
					node = this.nodes[i];
					ctx.moveTo(node.x + this.radius, node.y)
					ctx.arc(node.x, node.y, this.radius, 0, 2 * Math.PI, false);
					ctx.fill();
					ctx.stroke();
					ctx.closePath();
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

			ctx.lineWidth = 4;
			ctx.shadowColor = 'orange';
			ctx.shadowBlur = 10;
			var highlightNode;
			for (var i = 0; i < this.highlights.length; i++) {
				ctx.beginPath();
				highlightNode = this.nodes[this.highlights[i].index];

				//if (highlightNode == undefined) {
				if (highlightNode != undefined) {
					ctx.strokeStyle = this.highlights[i].color;
					ctx.moveTo(highlightNode.x + this.radius, highlightNode.y);
					ctx.arc(highlightNode.x, highlightNode.y, this.radius, 0, 2 * Math.PI, false);
					ctx.stroke();
					ctx.closePath();
				}
			}
			ctx.lineWidth = 1;
			ctx.strokeStyle = 'black';
			ctx.shadowBlur = 0;
		}

		//draw labels (if any)
		if (this.labels != undefined) {
			var label;
			for (var i = 0; i < this.labels.length; i++) {
				label = this.labels[i];
				if (label.length == 0) {
					continue;
				}

				node = this.nodes[i];
				if (node == undefined) {
					continue;
				}
				ctx.fillStyle = '#555555';
				ctx.fillText(label, node.x + this.radius * 1.2, node.y);
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
