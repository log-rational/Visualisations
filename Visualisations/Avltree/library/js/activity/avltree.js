/**
 * @fileOverview AvlTree
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
 * @class AvlTree
 * @extends OU.util.Activity
 * @param {Object} data - Holds the data content for a specific instance of the activity
 * @param {String} instance - (Optional) A unique identifier name for this instance, defaults to 'a1'
 * @param {OU.util.Controller} controller - (Optional) A reference to the controller that initialised this instance, if undefined, the superclass will generate a new controller and create the reference to it as 'this.controller'
 */

var STATE_PAUSED = 0;
var STATE_RUNNING = 1;

OU.activity.AvlTree = function(data, instance, controller) {
	OU.activity.AvlTree.prototype.canvasView = function() {
		var bh = OU.controlHeight;
		var self = this;

		//audio defaults to on
		this.audioPlay = true;

		//start in paused mode
		this.state = STATE_PAUSED;

		//fast animation flag
		this.fastAnimation = false;

		//radius
		this.radius = 20;

		//landscape locking
		this.forceLandscape = this.data.forceLandscape;

		//default shuffle state
		this.shuffleOnReset = false;

		//clear to be swapped obj
		this.toBeSwapped = {};

		//global steps management
		this.globalSteps = this.data.steps;
		this.globalStepIndex = 0;

		this.globalRotationArray = [];

		//background
		this.bgLayer = new OU.util.Layer({
			container : this,
			x : 5,
			y : 0,
			w : this.w - 10,
			h : 5 * bh,
			hasEvents : true
		});

		this.arrayWidth = 250;
		this.arrayHeight = bh;
		this.treeWidth = 300;
		this.treeHeight = 225;
		this.overlap = 0;

		//manage top left corners of drawing areas
		this.arrayAdjX = 0;
		this.arrayAdjY = 0;
		this.treeAdjX = 0;
		this.treeAdjY = 0;

		//initialize tree highlight
		this.treeHighlights = [];

		//no tree fade by default
		this.treeFade = false;

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
			h : 5 * bh,
			w : this.w,
			hasEvents : true,
			overflow : "auto",
			showScroll : true,
			zIndex : 999
		});

		this.descriptionDiv.div.innerHTML = data.title + data.steps[0].description;

		this.captionDiv = new OU.util.Div({
			container : this,
			x : 0,
			y : this.h - 2.5 * bh,
			w : this.w
		});

		this.modelLayer = new OU.util.Layer({
			container : this,
			id : 'model-layer',
			x : 0,
			y : 5 * bh,
			w : this.w,
			h : this.h - 5 * bh,
			hasEvents : true
		});

		this.animationLayer = new OU.util.Layer({
			container : this,
			id : 'animation-layer',
			x : 5,
			y : 5 * bh,
			w : this.w - 10,
			h : this.h - 5 * bh,
			hasEvents : false
		});

		this.animationLayer.context.font = 'bold 14px Arial';

		var self = this;
		if (this.data.info !== undefined) {
			this.infoButton = new OU.util.InfoButton({
				layer : this.bgLayer,
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
			generations : 4,
			orderingProperty : data.orderingProperty,
			hideEmptyNodes : true
		});

		// create the audio element
		this.audioElement = document.createElement('audio');

		this.initControls();

		//now pull in step data
		var startOffset = data.startOffset || 0;
		this.loadStep(this.data.steps[startOffset]);

		this.prevButton.disable();

		//render everything
		this.resize();
	};

	OU.activity.AvlTree.prototype.loadStep = function(step) {
		var self = this, bh = OU.controlHeight;

		if (step == undefined) {
			console.log("step undefined");
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

		if (step.caption != undefined && step.caption.length > 0) {
			this.captionDiv.div.innerHTML = step.caption;
		}

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
		else
		{
			this.treelabels = [];
		}

		if (step.treeHighlights != undefined) {
			this.treeHighlights = step.treeHighlights;
		}

		if (step.treeFade != undefined) {
			this.treeFade = step.treeFade;
		} else {
			this.treeFade = false;
		}

		this.colorMap = { };
		var maxVal = 99;
		for (var i = 0; i < 100; i++) {
			var frac = (i + 1) * 1.0 / maxVal * 1.0;
			var col = this.getColorHexHSV(frac * 255, 1.0, 1.0);
			this.colorMap[i] = col;
		}

		//override for step 3
		if (step.prepareStep3 && step.prepareStep3 === true) {
			this.treeValues = this.globalRotationArray;
			this.arrayValues = this.globalRotationArray;

			var bf = this.computeBalanceFactor(0);

			var aux = "";
			if (bf < 2 || bf > 1) {
				aux = "<p>Further rebalancing will be required to achieve a balanced tree.</p>"
			}

			this.descriptionDiv.div.innerHTML = data.title + "<h3>Following rebalancing</h3><p>The balance factor is now " + bf + ".</p>" + aux;
		}

		this.array.setData({
			"values" : this.arrayValues,
			"colorMap" : this.colorMap
		});
		this.tree.setData({
			"values" : this.treeValues,
			"labels" : this.treeLabels,
			"colorMap" : this.colorMap,
			"highlights" : this.treeHighlights,
			"fade" : this.treeFade
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
				var fromDims = this.tree.dims(treeIndex, true);
				var toDims = { };
				if (value < comparison) {
					toDims = this.tree.dims(leftChild, true);
				} else {
					toDims = this.tree.dims(leftChild + 1, true);
				}
			} else {
				value = this.tree.valueAt(treeIndex);
				fromDims = this.tree.dims(treeIndex, true);
				toDims = this.array.dims(arrayIndex);
			}

			this.setAnimation(value, fromDims.x, fromDims.y, toDims.x, toDims.y);

			this.globalSteps[globalStepIndex].description = "<h3>Rotation leads to...</h3>";
		}

		//swap
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
			if (step.refresh != undefined) {
				this.prevButton.disable();
				this.nextButton.disable();
				this.resetButton.disable();
			}

			if (val1 == -1 && val2 == -1) {
				//skip - timers may be firing out of turn
			} else {
				this.setAnimation(val1, arrayDims1.x + arrayXOffset, arrayDims1.y + arrayYOffset, arrayDims2.x + arrayXOffset, arrayDims2.y + arrayYOffset, 0);
				this.setAnimation(val2, arrayDims2.x + arrayXOffset, arrayDims2.y + arrayYOffset, arrayDims1.x + arrayXOffset, arrayDims1.y + arrayYOffset, 1);

				this.setAnimation(val1, treeDims1.x, treeDims1.y, treeDims2.x, treeDims2.y, 2);
				this.setAnimation(val2, treeDims2.x, treeDims2.y, treeDims1.x, treeDims1.y, 3);
			}
		}

		if (step.prepareStep1 && step.prepareStep1 === true) {
			var bf = this.computeBalanceFactor(0);

			var isBalanced = false;

			if (Math.abs(bf) < 2) {
				isBalanced = true;
				while (this.globalSteps.length > 2) {
					this.globalSteps.pop();
				}
				var title = data.title;
				title = title.replace("</h2>", " (1/1)</h2>");

				if (bf == 0) {
					this.descriptionDiv.div.innerHTML = title + "<h3>Perfectly balanced tree</h3><p>This tree is perfectly balanced and so does not require rebalancing.</p>"
				} else {
					this.descriptionDiv.div.innerHTML = title + "<h3>Balanced tree</h3><p>This tree is nearly balanced and so does not require rebalancing.</p>";
				}

				this.prevButton.disable();
				this.nextButton.disable();
			}
			//not balanced - prepare three steps
			else {
				var title = data.title;
				title = title.replace("</h2>", " (1/3)</h2>");

				if (bf < -1) {
					this.descriptionDiv.div.innerHTML = title + "<h3>Tree out of balance</h3><p>This tree needs to be rotated left (anticlockwise).</p>"
				} else if (bf > 1) {
					this.descriptionDiv.div.innerHTML = title + "<h3>Tree out of balance</h3><p>This tree needs to be rotated right (clockwise).</p>"
				}
			}
		}

		if (step.prepareStep2 && step.prepareStep2 === true) {
			var bf = this.computeBalanceFactor(0);

			var title = data.title;
			title = title.replace("</h2>", " (2/3)</h2>");
			this.descriptionDiv.div.innerHTML = title;

			if (bf < -1) {
				step.rotateLeft = true;
			} else if (bf > 1) {
				step.rotateRight = true;
			}
		}

		if (step.prepareStep3 && step.prepareStep3 === true)//see also value setter above
		{
			var bf = this.computeBalanceFactor(0);

			var title = data.title;
			title = title.replace("</h2>", " (3/3)</h2>");
			this.descriptionDiv.div.innerHTML = title;

			var aux = "";
			if (bf < -1 || bf > 1) {
				aux = "<p>Further rebalancing will be required to achieve a perfectly balanced tree.</p>"
			}

			this.descriptionDiv.div.innerHTML = title + "<h3>Following rebalancing</h3><p>The balance factor is now " + bf + ".</p>" + aux;
		}

		//rotation
		var rotate = false;
		var mapping = {};

		var title = data.title;
		title = title.replace("</h2>", " (" + (this.globalStepIndex + 1) + "/" + this.globalSteps.length + ")</h2>");

		if (step.rotateLeft != undefined && step.rotateLeft === true) {
			mapping = this.data.rotateLeftMapping;
			rotate = true;
			this.descriptionDiv.div.innerHTML = title + step.description;//title + "<h3>Balance left</h3>" + (step.rotateLeftDescription) ? step.rotateLeftDescription : "";
		} else if (step.rotateRight != undefined && step.rotateRight === true) {
			mapping = this.data.rotateRightMapping;
			rotate = true;
			this.descriptionDiv.div.innerHTML = title + "<h3>Balance right</h3>";
		}

		if (rotate) {
			//disable Next button but only if push/refresh is defined (so there's a clear re-enabling point)
			if (step.refresh != undefined) {
				this.prevButton.disable();
				this.nextButton.disable();
				this.resetButton.disable();
			}

			var animationCount = 0;
			this.globalRotationArray = [];
			this.globalRotationArray = this.padArray(this.globalRotationArray.slice(0), 15, -1);
			for (var i = 0; i < 15; i++) {
				var val = this.tree.value(i);

				if (val === -1) {
					continue;
				}

				var fromDims, toIndex, toDims;

				fromDims = this.tree.dims(i, true);

				toIndex = mapping[i];

				if (toIndex == 999) {
					continue;
				} else if (toIndex == undefined) {
					continue;
				} else if (toIndex < 0) {
					toDims = this.tree.dims(Math.abs(toIndex), true);
				} else {
					toDims = this.tree.dims(toIndex, true);
				}

				//update globalRotationArray for automated animation
				this.globalRotationArray[Math.abs(toIndex)] = val;

				var highlight = (step.rotateHighlights != undefined && step.rotateHighlights.indexOf(i) != -1);
				this.setAnimation(val, fromDims.x, fromDims.y, toDims.x, toDims.y, animationCount++, highlight);
			}

			this.globalRotationArray = this.filterArray(this.globalRotationArray.slice(0), -1);

			step.refresh = {
				"arrayValues" : this.globalRotationArray,
				"treeValues" : this.globalRotationArray
			};

			//clear tree values
			this.tree.setData({
				labels : [],
				values : [],
				colorMap : []
			});

		}

		if (this.audioPlay) {
			if (step.audio != undefined && step.audio.indexOf(".mp3") != -1) {
				this.audioElement.src = step.audio;
				this.audioElement.play();
			}
		}

		//push happens with time delay - set tree values for immediate painting
		var delay = 500;

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
						self.startButton.enable();
						self.startButton.render();
					}, delay);
				}
			}
		}

		var colorMap = this.colorMap;

		if (step.refresh != undefined && step.refresh != null) {
			setTimeout(function() {
				var bh = OU.controlHeight;
				self.refresh(self, step.refresh, colorMap);
				self.prevButton.enable();
				self.nextButton.enable();
				self.animationLayer.context.clearRect(0, 0, self.w - 10, self.h - 6 * bh);
			}, 1000);

		}

		if (step.toOrdered != undefined && step.toOrdered == true) {
			this.toOrdered();
		}

		if (step.calculateBalanceFactor != undefined && step.calculateBalanceFactor == true) {
			var labels = this.getBalanceFactors();

			this.tree.setData({
				"values" : this.treeValues,
				"labels" : labels,
				"colorMap" : this.colorMap,
				"highlights" : this.treeHighlights,
				"fade" : this.treeFade
			});
		}

		this.fastAnimation = fastAnimationMemory;

		this.resize();
	};

	/*
	 * balance factor for each node in the current tree as an array of strings
	 * (to be used for treeLabels parameter)
	 */

	OU.activity.AvlTree.prototype.getBalanceFactors = function() {
		var arr = [];
		var bf = 0;

		for (var i = 0; i < 15; i++) {
			if (this.tree.value(i) == -1) {
				arr.push("");
			} else {
				bf = this.computeBalanceFactor(i);
				arr.push(bf.toString());
			}
		}

		return arr;
	};

	/*
	 * group of functions for balance factor calculation
	 */
	OU.activity.AvlTree.prototype.computeBalanceFactor = function(node) {

		var leftHeight = this.countLeftGenerations(node);
		var rightHeight = this.countRightGenerations(node);

		return parseInt(leftHeight - rightHeight);
	};

	OU.activity.AvlTree.prototype.countLeftGenerations = function(node) {
		if (!this.tree.leftChildMap.hasOwnProperty(node)) {
			return 0;
		}

		var leftNode = this.tree.leftChildMap[node];
		var leftTotal = this.countGenerations(leftNode, 0);

		if (this.tree.value(leftNode) == -1) {
			return 0;
		}

		return 1 + parseInt(leftTotal);
	};

	OU.activity.AvlTree.prototype.countRightGenerations = function(node) {
		if (!this.tree.leftChildMap.hasOwnProperty(node)) {
			return 0;
		}

		var rightNode = this.tree.leftChildMap[node] + 1;
		var rightTotal = this.countGenerations(rightNode, 0);

		if (this.tree.value(rightNode) == -1) {
			return 0;
		}

		return 1 + parseInt(rightTotal);
	};

	OU.activity.AvlTree.prototype.countGenerations = function(node, total) {
		if (!this.tree.leftChildMap.hasOwnProperty(node)) {
			return total;
		}

		var left = this.tree.leftChildMap[node];
		var right = left + 1;

		var leftTotal = total;
		var rightTotal = total;

		if (this.tree.value(left) != -1) {
			leftTotal = this.countGenerations(left, total + 1);
		}

		if (this.tree.value(right) != -1) {
			rightTotal = this.countGenerations(right, total + 1);
		}

		return Math.max(leftTotal, rightTotal);
	};

	/*
	 * returns all steps req'd for number insertion
	 */
	OU.activity.AvlTree.prototype.toHeap = function(a) {

		var steps = [];

		var step = { };

		//initial state: empty tree and array; input array shown
		step.clearArray = true;
		step.clearTree = true;
		step.arrayValues = [];
		step.treeValues = [];
		step.treeLabels = this.allLabels;
		step.description = "<h2>Heap sorting</h2><p>We begin by adding all elements of the input list to the heap.</p>";
		step.auxArrayValues = a.slice(0);
		step.auxLabel = "Input values:";
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
			step.auxLabel = "Input values:";
			step.description = "<h2>Heap sorting</h2><p>We add " + val + ".";
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
				step.description = "<h2>Heap sorting</h2><p>" + b[this.toBeSwapped.first] + " is greater than " + b[this.toBeSwapped.second] + ", so swap nodes " + this.toBeSwapped.first + " and " + this.toBeSwapped.second + ".</p>";
				step.auxArrayValues = a.slice(0);
				step.auxArrayHighlights = [i];
				step.auxLabel = "Input values:";

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
				step.description = "<h2>Heap sorting</h2>";
				step.auxArrayValues = a.slice(0, i + 1);
				step.auxArrayHighlights = [i];
				step.auxLabel = "Input values:";
				steps.push(step);

				//now swap values
				var tmp = b[this.toBeSwapped.first];
				b[this.toBeSwapped.first] = b[this.toBeSwapped.second];
				b[this.toBeSwapped.second] = tmp;

				this.treeValues = b.slice(0, i + 1);
				this.arrayValues = b.slice(0, i + 1);

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
	OU.activity.AvlTree.prototype.padArray = function(a, len, val) {
		while (a.length < len) {
			a.push(val);
		}
		return a.slice(0);
	}
	/*
	 * filter array a dropping value val
	 */
	OU.activity.AvlTree.prototype.filterArray = function(a, val) {
		var b = [];
		for (var i = 0, count = a.length; i < count; i++) {
			if (a[i] != val) {
				b.push(a[i]);
			}
		}

		return b.slice(0);
	}
	/*
	 * animates full ordered array extraction
	 */
	OU.activity.AvlTree.prototype.toOrdered = function() {

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

			step.description = "<h2>Heap sorting: retrieving numbers in sort order</h2><p>Root key " + values[0] + "...</p>";
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
			step.description = "<h2>Heap sorting: retrieving numbers in sort order</h2><p>...is added to the result list.</p>";
			step.auxArrayValues = ordered.slice(0, ordered.length);
			step.auxArrayHighlights = [];
			step.auxArrayHighlights.push(ordered.length - 1);
			step.auxLabel = "Output values:";

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
					values[i] = -1;
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

			step.description = "<h2>Heap sorting: retrieving numbers in sort order</h2><p>As the last key in the heap, " + last + " becomes the new root.</p>";
			step.auxArrayValues = ordered.slice(0, ordered.length);
			step.auxArrayHighlights = [];
			step.auxLabel = "Output values:";

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
			step.description = "<h2>Heap sorting: retrieving numbers in sort order</h2><p>As the last key in the heap, " + last + " becomes the new root.</p>";
			step.auxArrayValues = ordered.slice(0, ordered.length);
			step.auxArrayHighlights = [];
			step.auxArrayHighlights.push(ordered.length - 1);
			step.auxLabel = "Output values:";

			steps.push(step);

			//show new root with highlight
			step = { };
			step.clearArray = true;
			step.clearTree = true;

			var last = values[lastIndex];

			step.arrayValues = this.padArray(values.slice(0), 15, -1);
			step.arrayValues[0] = last;

			step.treeValues = values.slice(0);
			step.arrayValues[0] = last;

			step.treeLabels = this.allLabels.slice(0);
			step.arrayHighlights = [];
			step.treeHighlights = [];
			step.description = (values[0] != -1) ? "<h2>Heap sorting</h2><p>With " + values[0] + " as root key, the algorithm has to ensure heap order is preserved.</p>" : "<h2>Heap sorting</h2><p>The ordered result list is now complete.</p>";
			step.auxArrayValues = ordered.slice(0, ordered.length);
			step.auxArrayHighlights = [];
			step.auxArrayHighlights.push(ordered.length - 1);
			step.auxLabel = "Output values:";
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
				step.description = "<h2>Heap sorting: retrieving numbers in sort order</h2><p>" + values[this.toBeSwapped.first] + " is greater than " + values[this.toBeSwapped.second] + ", so swap nodes " + this.toBeSwapped.first + " and " + this.toBeSwapped.second + ".</p>";
				step.auxArrayValues = ordered.slice(0, ordered.length);
				step.auxArrayHighlights = [];
				step.auxArrayHighlights.push(ordered.length - 1);
				step.auxLabel = "Output values:";

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
				step.description = "<h2>Heap sorting: retrieving numbers in sort order</h2>";
				step.auxArrayValues = ordered.slice(0, ordered.length);
				step.auxArrayHighlights = [];
				step.auxArrayHighlights.push(ordered.length - 1);
				step.auxLabel = "Output values:";
				steps.push(step);

				//now swap values
				var tmp = values[this.toBeSwapped.first];
				values[this.toBeSwapped.first] = values[this.toBeSwapped.second];
				values[this.toBeSwapped.second] = tmp;

				this.treeValues = gapValues.slice(0);
				//values.slice(0);
				step.arrayValues = this.padArray(gapValues.slice(0, 15, -1));
				//this.padArray(values.slice(0), 15, -1);

				if (--guard < 0) {
					break;
				}
			}
		}

		return steps.slice(0);
	};

	OU.activity.AvlTree.prototype.playSteps = function(self, steps, aux, currentIndex, delay) {

		//at end of animation: (a) disable continue/pause button and (b) don't automatically rewind to the start
		if (currentIndex > steps.length - 1) {
			self.startButton.disable();
			return;
		}

		//generally: when paused, stop here
		if (this.state == STATE_PAUSED) {
			return;
		}

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
	OU.activity.AvlTree.prototype.heapOrderMaintained = function(values) {

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
	OU.activity.AvlTree.prototype.lastValidIndex = function(a) {
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

	OU.activity.AvlTree.prototype.validNodeCount = function(a) {
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

	OU.activity.AvlTree.prototype.refresh = function(self, obj, colorMap) {
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

		this.animations = [];

		self.resize();

		self.prevButton.enable();
		self.nextButton.enable();
		self.resetButton.enable();
	};

	/*
	 * sets off single-object animation
	 */
	OU.activity.AvlTree.prototype.setAnimation = function(txt, x1, y1, x2, y2, layer, highlight) {
		if (x1 == undefined || y1 == undefined || x2 == undefined || y2 == undefined) {
			console.log("setAnimation: p1 or p2 undefined");
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

	OU.activity.AvlTree.prototype.animate = function(self, layer, highlight) {

		if (layer == undefined) {
			return;
		}

		if (self.animations.length == 0) {
			return;
		}

		if (self.animations[layer].p1 == undefined || self.animations[layer].p2 == undefined) {
			self.clearAnimation(layer);
			return;
		}

		var dx = Math.abs(self.animations[layer].p1.x - self.animations[layer].p2.x);
		var dy = Math.abs(self.animations[layer].p1.y - self.animations[layer].p2.y);

		//check values
		if (isNaN(dx) || isNaN(dy) || dx == undefined || dy == undefined || dx == null || dy == null) {
			return;
		}

		if (dy > 5) {
			var step = dy / 20;

			var dRemaining = Math.abs(self.animations[layer].pa.y - self.animations[layer].p2.y);

			if (dRemaining < step) {
				return;
			}

			if (self.animations[layer].pa.y > self.animations[layer].p2.y) {
				self.animations[layer].pa.y -= step;
			} else {
				self.animations[layer].pa.y += step;
			}

			//calculate this.animation.pa.y
			self.animations[layer].pa.x = ((self.animations[layer].pa.y - self.animations[layer].p1.y) / (self.animations[layer].p2.y - self.animations[layer].p1.y)) * (self.animations[layer].p2.x - self.animations[layer].p1.x) + self.animations[layer].p1.x;
		} else {
			var step = dx / 20;
			
			var dRemaining = Math.abs(self.animations[layer].pa.x - self.animations[layer].p2.x);

			if (dRemaining < step) {
				return;
			}

			if (self.animations[layer].p1.x > self.animations[layer].p2.x) {
				self.animations[layer].pa.x = self.animations[layer].pa.x - step;				
			} else {
				self.animations[layer].pa.x = self.animations[layer].pa.x + step;
			}
		}
		

		//only call for last layer
		self.modelLayer.context.clearRect(self.tree.x - 10, self.tree.y - 10, self.tree.w + 20, self.tree.h + 20);
		self.animationLoop();

		setTimeout(function() {
			self.animate(self, layer);
		}, 15);
	};

	OU.activity.AvlTree.prototype.animationLoop = function() {
		var ctx = this.animationLayer.context, bh = OU.controlHeight;

		if (this.animations != undefined) {
			ctx.clearRect(0, 0, this.w, this.h - 6 * bh);

			ctx.beginPath();

			ctx.fillStyle = 'black';
			for (var i = 0; i < this.animations.length; i++) {
				this.renderAnimation(i, ctx);
			}
			ctx.fill();
		}
	};

	OU.activity.AvlTree.prototype.renderAnimation = function(layer, ctx) {
		var bh = OU.controlHeight;

		if (layer == undefined) {
			return;
		}

		if (this.animations.length == 0 || this.animations == undefined || this.animations == null) {
			return;
		}

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

	OU.activity.AvlTree.prototype.clearAnimation = function(layer) {
		this.animations[layer] = { };
	};

	OU.activity.AvlTree.prototype.initControls = function() {
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

/*
		this.randomButton = Utils.newButton((btnSpace * 3 + xPad) + "%", btnTop + "%", "Random", function() {
			self.randomButtonPressed();
		}, cssWidth, "c", "randomButton");
*/

/*
		this.audioButton = Utils.newButton(// init the audio checkbox button
		(btnSpace * 3 + xPad) + "%", (btnTop) + "%", //was btnSpace * 3.7
		"Audio", function() {
			self.audioButtonPressed();
		}, cssWidth, "c", "audioButton");
*/

		//this.randomButton.checked = false;
		//this.audioButton.checked = true;
		this.audioPlay = false;//true;
		// toggle var to play audio

		//tbd: add buttons
		var clickable = this.modelLayer.events.clickable;
		clickable.length = 0;
		clickable.push(this.infoButton);
	};

	OU.activity.AvlTree.prototype.getRandomizedSteps = function() {
		//randomise value array
		var a = [];
		var sum = 0, max = 0;

		for (var i = 0; i < 6; i++) {
			var test = Math.floor(Math.random() * 99);
			while (a.indexOf(test) != -1) {
				test = Math.floor(Math.random() * 99);
			}

			a[i] = test;
			sum += test;
			max += 99;
		}

		var original, sorted, prepared;
		original = a.slice(0);
		sorted = original.sort().slice(0);
		prepared = sorted.slice(0);

		var temp = prepared[0];
		prepared[0] = prepared[2];
		prepared[2] = temp;

		temp = prepared[5];
		prepared[2] = prepared[5];
		prepared[2] = temp;
		
		//pop last
		prepared.pop();

		var steps = [];

		var step1 = {
			"clearArray" : true,
			"clearTree" : true,
			"arrayValues" : prepared,
			"treeValues" : prepared,
			"calculateBalanceFactor" : true,
			"prepareStep1" : true,
			"description" : "<h3><!-- to be replaced --></h3>",
			"caption" : "<p>bf = height(left) - height(right)"
		};

		var step2 = {
			"clearArray" : true,
			"clearTree" : true,
			"arrayValues" : prepared.reverse().slice(0),
			"treeValues" : prepared.reverse().slice(0),
			"prepareStep2" : true,
			"description" : "<h3>Rotation</h3>",
		};

		var step3 = {
			"clearArray" : true,
			"clearTree" : true,
			"arrayValues" : [],
			"treeValues" : [],
			"calculateBalanceFactor" : true,
			"prepareStep3" : true,
			"description" : "<h3><!-- to be replaced --></h3>",
			"caption" : "<p>bf = height(left) - height(right)"
		};

		steps.push(step1);
		steps.push(step2);
		steps.push(step3);

		return steps;
	};

	OU.activity.AvlTree.prototype.resetButtonPressed = function() {
		this.globalStepIndex = 0;
		this.setPaused(true);

		if (this.shuffleOnReset == true) {
			this.globalSteps = this.getRandomizedSteps();

		} else {
			this.globalSteps = this.data.steps;
		}

		this.loadStep(this.globalSteps[0]);

		this.prevButton.disable();
		this.nextButton.enable();

		this.resize();
	};

	OU.activity.AvlTree.prototype.randomButtonPressed = function() {
		this.shuffleOnReset = !this.shuffleOnReset;
		this.prevButton.disable();
		this.nextButton.disable();
	};

	OU.activity.AvlTree.prototype.audioButtonPressed = function() {
		this.audioPlay = !this.audioPlay;

		if (this.audioPlay == false) {
			this.audioElement.pause();
		}
	};

	OU.activity.AvlTree.prototype.setPaused = function(b) {
		this.state = (b == true) ? STATE_PAUSED : STATE_RUNNING;

		var continueString = (this.globalStepIndex == 0) ? "Start" : "Continue";

		var s = (b == true) ? continueString : "Pause";

		this.startButton.modify({
			txt : s
		});
	}

	OU.activity.AvlTree.prototype.accessibleView = function() {
		OU.activity.AvlTree.superClass_.accessibleView.call(this);
	};

	OU.activity.AvlTree.prototype.resize = function() {
		var bh = OU.controlHeight;

		OU.activity.AvlTree.superClass_.resize.call(this);

		this.bgLayer.resize();

		this.descriptionDiv.slideTo({
			"x" : 50,
			"y" : 0,
			"w" : this.w - 100,
			"h" : 5 * bh
		});

		this.captionDiv.slideTo({
			"x" : 50,
			"y" : this.h - 2.5 * bh,
			"w" : this.w - 200,
			"h" : 2 * bh
		});

		this.modelLayer.resize({
			x : 5,
			y : 5.0 * bh,
			w : this.w - 10,
			h : this.h - 5 * bh//this.treeHeight + 1.5 * bh
		});

		this.render();
	};

	OU.activity.AvlTree.prototype.render = function() {
		var ctx = this.ctx, bh = OU.controlHeight, stageHeight = this.h - bh;
		ctx.font = 'bold 14px Arial';

		//layout is side by side in landscape, top and bottom in portrait orientation

		//tree - to compensate for long descriptions at the top, add 2 * bh to adjY if possible
		if (this.forceLandscape == true || (this.w > this.h && this.forcePortrait == false)) {
			this.treeAdjX = (this.w / 2 > this.treeWidth) ? this.w / 4 - this.treeWidth / 2 : 0;
			this.treeAdjY = 25;
			//(stageHeight > this.treeHeight) ? stageHeight / 2 - this.treeHeight / 2 + 2 * bh : 0;
		} else {
			this.treeAdjX = (this.w > this.treeWidth) ? this.w / 2 - this.treeWidth / 2 : 0;
			this.treeAdjY = stageHeight - this.arrayHeight - 3.5 * bh - this.treeHeight;
		}

		this.renderTree();

		//array
		if (this.forceLandscape == true || (this.w > this.h && this.forcePortrait == false)) {
			this.arrayAdjX = (this.w / 2 > this.arrayWidth) ? this.w / 2 + this.w / 4 - this.arrayWidth / 2 : this.w / 2;
			this.arrayAdjY = 0//(stageHeight > this.arrayHeight) ? stageHeight / 2 - this.arrayHeight / 2 + 2 * bh : 0;
		} else {
			this.arrayAdjX = (this.w > this.arrayWidth) ? this.w / 2 - this.arrayWidth / 2 : 0;
			this.arrayAdjY = stageHeight - this.arrayHeight - 1.5 * bh;
		}

		this.renderArray();

		this.infoButton.render();

		//use retained drawing
		var ctx = this.ctx;
		ctx.beginPath();
		if (this.animations != undefined && this.animations.length != 0) {
			for (var i = 0, len = this.animations.length; i < len; i++) {
				this.renderAnimation(i, ctx);
			}
		}
		ctx.fill();
	};

	OU.activity.AvlTree.prototype.prevButtonPressed = function() {
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

	OU.activity.AvlTree.prototype.nextButtonPressed = function() {
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

	OU.activity.AvlTree.prototype.resetButtonPressed = function() {
		this.globalStepIndex = 0;

		this.globalSteps = (this.shuffleOnReset) ? this.getRandomizedSteps() : this.data.steps.slice(0);

		this.array.clearHighlights();

		this.prevButton.disable();
		this.nextButton.enable();

		this.loadStep(this.globalSteps[this.globalStepIndex]);
	};

	OU.activity.AvlTree.prototype.renderArray = function() {
		this.array.resize({
			"x" : this.arrayAdjX,
			"y" : this.arrayAdjY,
			"w" : this.arrayWidth,
			"h" : this.arrayHeight
		});
	};

	OU.activity.AvlTree.prototype.renderTree = function() {
		this.tree.resize({
			"x" : this.treeAdjX,
			"y" : this.treeAdjY,
			"w" : this.treeWidth,
			"h" : this.treeHeight
		});
	};

	OU.activity.AvlTree.prototype.remove = function() {
		OU.activity.AvlTree.superClass_.remove.call(this);
	};

	OU.activity.AvlTree.prototype.showMessage = function(buffer) {
		var el = document.getElementById("messageDiv");
		el.innerHTML = buffer;
		el.style.display = "block";
	};

	// ported from here:
	//http://www.cs.rit.edu/~ncs/color/t_convert.html
	OU.activity.AvlTree.prototype.getColorHexHSV = function(h, s, v) {
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
OU.inherits(OU.activity.AvlTree, OU.util.Activity);

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
	this.fade = params.fade || false;
	this.hideEmptyNodes = params.hideEmptyNodes || false;

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
		this.fade = p.fade || false;

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
		if (index > this.nodes.length - 1 || index < 0) {

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
			"end" : this.nodes[1],
			"from" : 0,
			"to" : 1
		});
		this.arrows.push({
			"start" : this.nodes[0],
			"end" : this.nodes[2],
			"from" : 0,
			"to" : 2
		});

		if (this.generations > 2) {
			this.arrows.push({
				"start" : this.nodes[1],
				"end" : this.nodes[3],
				"from" : 1,
				"to" : 3
			});
			this.arrows.push({
				"start" : this.nodes[1],
				"end" : this.nodes[4],
				"from" : 1,
				"to" : 4
			});

			this.arrows.push({
				"start" : this.nodes[2],
				"end" : this.nodes[5],
				"from" : 2,
				"to" : 5
			});
			this.arrows.push({
				"start" : this.nodes[2],
				"end" : this.nodes[6],
				"from" : 2,
				"to" : 6
			});
		}

		if (this.generations > 3) {
			this.arrows.push({
				"start" : this.nodes[3],
				"end" : this.nodes[7],
				"from" : 3,
				"to" : 7
			});
			this.arrows.push({
				"start" : this.nodes[3],
				"end" : this.nodes[8],
				"from" : 3,
				"to" : 8
			});
			this.arrows.push({
				"start" : this.nodes[4],
				"end" : this.nodes[9],
				"from" : 4,
				"to" : 9
			});
			this.arrows.push({
				"start" : this.nodes[4],
				"end" : this.nodes[10],
				"from" : 4,
				"to" : 10
			});
			this.arrows.push({
				"start" : this.nodes[5],
				"end" : this.nodes[11],
				"from" : 5,
				"to" : 11
			});
			this.arrows.push({
				"start" : this.nodes[5],
				"end" : this.nodes[12],
				"from" : 5,
				"to" : 12
			});
			this.arrows.push({
				"start" : this.nodes[6],
				"end" : this.nodes[13],
				"from" : 6,
				"to" : 13
			});
			this.arrows.push({
				"start" : this.nodes[6],
				"end" : this.nodes[14],
				"from" : 6,
				"to" : 14
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
		var start, end, to, val;
		for (var i = 0; i < this.arrows.length; i++) {

			start = this.arrows[i].start;
			end = this.arrows[i].end;
			to = this.arrows[i].to;

			if (this.hideEmptyNodes && this.value(to) == -1) {
				//don't draw
			} else {
				this.drawArrow(start.x, start.y, end.x, end.y, 0.3, 0.3);
			}
		}

		ctx.stroke();

		ctx.beginPath();

		//draw nodes
		var node;
		for (var i = 0; i < this.nodes.length; i++) {

			//test node has content
			val = this.value(i);
			if (this.hideEmptyNodes && val == -1) {
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

				//test node has content
				val = this.value(i);
				if (this.hideEmptyNodes && val == -1) {
					continue;
				}

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
			//test node has content
			val = this.value(i);
			if (val == -1 || val == -1) {
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

		//draw fade (if set)
		if (this.fade) {

			ctx.rect(this.x - bh, this.y + this.h / 2, this.w + 2 * bh, this.h / 2 + 2 * bh);

			// add linear gradient
			var grd = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.h);
			grd.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
			grd.addColorStop(0.97, 'rgba(255, 255, 255, 0.2)');
			grd.addColorStop(1, 'rgba(255, 255, 255, 1.0)');

			ctx.fillStyle = grd;
			ctx.fill();

			//reset
			ctx.fillStyle = '#ffffff';
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
			//console.log("Tree unbalanced: " + val + " dropped");
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
