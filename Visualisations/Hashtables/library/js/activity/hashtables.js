/**
 * @fileOverview HashTables
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
 * @class HashTables
 * @extends OU.util.Activity
 * @param {Object} data - Holds the data content for a specific instance of the activity
 * @param {String} instance - (Optional) A unique identifier name for this instance, defaults to 'a1'
 * @param {OU.util.Controller} controller - (Optional) A reference to the controller that initialised this instance, if undefined, the superclass will generate a new controller and create the reference to it as 'this.controller'
 */

var STATE_PAUSED = 0;
var STATE_RUNNING = 1;

OU.activity.HashTables = function(data, instance, controller) {
	OU.activity.HashTables.prototype.canvasView = function() {
		var bh = OU.controlHeight;
		var self = this;

		//audio defaults to on
		this.audioPlay = false;//true;

		//start in paused mode
		this.state = STATE_PAUSED;

		//radius
		this.radius = 20;

		//optional hiding of top array (to create room for copy)
		this.hideArray = false;

		//default shuffle state
		this.shuffleOnReset = false;
		this.forceStartDisabled = false;
		//required for dynamically generated single-step sequences

		//clear to be swapped obj
		this.toBeSwapped = {};

		//global steps management
		this.globalSteps = this.data.steps;
		this.globalStepIndex = 0;

		this.globalRotationArray = [];

		this.arrayWidth = 500;
		this.arrayHeight = bh;
		this.overlap = 0;
		this.functionWidth = 240;
		this.functionHeight = 100;

		//manage top left corners of drawing areas
		this.arrayAdjX = 0;
		this.arrayAdjY = 0;

		this.hashArrayAdjX = 0;
		this.hashArrayAdjY = 0;

		this.functionAdjX = 0;
		this.functionAdjY = 0;

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
			h : 5.5 * bh,
			w : this.w,
			hasEvents : true,
			overflow : "auto",
			showScroll : true,
			zIndex : 999
		});

		this.descriptionDiv.div.innerHTML = data.title + data.steps[0].description;

		this.searchDiv = new OU.util.Div({
			container : this,
			x : 0,
			y : 0,
			h : "auto",
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
			y : 5.5 * bh,
			w : this.w,
			h : this.h - 6 * bh,
			hasEvents : true
		});

		this.animationLayer = new OU.util.Layer({
			container : this,
			id : 'animation-layer',
			x : 0,
			y : 5.5 * bh,
			w : this.w,
			h : this.h - 5 * bh,
			hasEvents : false
		});

		this.animationLayer.context.font = 'bold 14px Arial';

		//background for infobutton
		this.bgLayer = new OU.util.Layer({
			container : this,
			x : 5,
			y : 0,
			w : 100,//this.w - 10,
			h : 5.5 * bh,
			hasEvents : true
		});

		var self = this;
		if (this.data.info !== undefined) {
			this.infoButton = new OU.util.InfoButton({
				layer : this.bgLayer,//this.modelLayer,
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

		this.functionDiv = new OU.util.Div({
			container : this,
			x : 0,
			y : 0,
			h : this.functionHeight,
			w : this.functionWidth,
			overflow : "overflow",
			showScroll : true
		});
		this.functionDiv.div.innerHTML = this.functionSpan("value");

		this.hashArray = new OU.util.BoxArray({
			"context" : this.ctx,
			"object" : this,
			"x" : 100,
			"y" : 100,
			"w" : this.arrayWidth,
			"h" : this.arrayHeight,
			"overlap" : this.overlap
		});

		this.hashArrayNext = new OU.util.BoxArray({
			"context" : this.ctx,
			"object" : this,
			"x" : 100,
			"y" : 100,
			"w" : this.arrayWidth,
			"h" : this.arrayHeight,
			"overlap" : this.overlap,
			"hideEmptyCells" : true
		});

		this.hashArrayLast = new OU.util.BoxArray({
			"context" : this.ctx,
			"object" : this,
			"x" : 100,
			"y" : 100,
			"w" : this.arrayWidth,
			"h" : this.arrayHeight,
			"overlap" : this.overlap,
			"hideEmptyCells" : true
		})

		this.arrayValues = [];
		this.hashArrayValues = [];

		// create the audio element
		//this.audioElement = document.createElement('audio');

		this.initControls();

		//populate values
		this.resize();

		//now pull in step data
		var startOffset = 0;
		this.loadStep(this.data.steps[startOffset]);

		//render everything
		this.resize();
	};

	OU.activity.HashTables.prototype.cellDims1 = function(index) {
		var x, y, w, h;
		w = this.arrayWidth / this.arrayValues.length;
		h = OU.controlHeight;
		x = this.arrayAdjX + w * index + w / 2;
		y = this.arrayAdjY + h / 2;

		return {
			"x" : x,
			"y" : y,
			"w" : w,
			"h" : h
		};
	};

	OU.activity.HashTables.prototype.cellDims2 = function(index) {
		var x, y, w, h;
		w = this.arrayWidth / this.hashArrayValues.length;
		h = OU.controlHeight;

		x = this.hashArrayAdjX + (w * index) + (w / 2);
		y = this.hashArrayAdjY + h / 2;

		return {
			"x" : x,
			"y" : y,
			"w" : w,
			"h" : h
		};
	};

	OU.activity.HashTables.prototype.functionSpan = function(val, calc) {
		var calcString = (calc) ? "<span style='color:red; font-weight:bold;'> = " + (val % 11) + "</span>" : "";

		return "<span id='functionSpan'>h(<strong>" + val + "</strong>) = <strong>" + val + "</strong> % 11" + calcString + "</span>";
	};

	OU.activity.HashTables.prototype.loadStep = function(step) {
		var self = this, bh = OU.controlHeight;

		if (step == undefined) {
			console.log("step undefined");
			return;
		}

		//pause all running audio
		//this.audioElement.pause();

		//if swapping in current step, remember values
		if (step.swap != undefined) {
			var swapValueFirst = this.arrayValues[step.swap.first];
			var swapValueSecond = this.arrayValues[step.swap.second];
		}

		this.array.clearHighlights();
		this.hashArray.clearHighlights();

		var title = data.title;
		title = title.replace("</h2>", " (" + (this.globalStepIndex + 1) + "/" + this.globalSteps.length + ")</h2>");

		this.descriptionDiv.div.innerHTML = title + step.description;

		if (step.caption != undefined && step.caption.length > 0) {
			this.captionDiv.div.innerHTML = step.caption;
		}

		if (step.clearArray) {
			this.array.clearValues();
			this.hashArray.clearValues();
			this.hashArrayNext.clearValues();
			this.hashArrayLast.clearValues();
		}

		//load arrayValues/treeValues if any
		if (step.arrayValues != undefined) {
			this.arrayValues = step.arrayValues;
		}

		if (step.hashArrayValues != undefined) {
			this.hashArrayValues = step.hashArrayValues;
		}

		this.colorMap = { };
		var maxVal = 99;
		for (var i = 0; i < 100; i++) {
			var frac = (i + 1) * 1.0 / maxVal * 1.0;
			var col = this.getColorHexHSV(frac * 255, 1.0, 1.0);
			this.colorMap[i] = col;
		}

		this.array.setData({
			"values" : this.arrayValues,
			"colorMap" : this.colorMap
		});

		this.hashArray.setData({
			"values" : this.hashArrayValues,
			"colorMap" : this.colorMap
		});

		var nextArray = (step.hashArrayNextValues != undefined) ? step.hashArrayNextValues : [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
		this.hashArrayNext.setData({
			"values" : nextArray,
			"colorMap" : this.colorMap
		});

		var lastArray = (step.hashArrayLastValues != undefined) ? step.hashArrayLastValues : [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
		this.hashArrayLast.setData({
			"values" : lastArray,
			"colorMap" : this.colorMap
		});

		if (step.arrayHighlights) {
			this.array.setHighlights(step.arrayHighlights);
		}

		if (step.hashArrayHighlights) {
			this.hashArray.setHighlights(step.hashArrayHighlights);
		}

		this.hashArray.setAuxValues((step.auxArrayValues) ? step.auxArrayValues : []);
		this.hashArray.setAuxHighlights((step.auxArrayHighlights) ? step.auxArrayHighlights : []);
		this.hashArray.setAuxLabel((step.auxLabel) ? step.auxLabel : "");

		//check for search mode
		if (step.searchString != undefined) {
			this.searchDiv.div.innerHTML = step.searchString;
		} else {
			this.searchDiv.div.innerHTML = '';
		}

		var valueAvailable = (step.searchValue != undefined);

		if (valueAvailable) {
			this.functionDiv.div.innerHTML = this.functionSpan(step.searchValue, true);
		} else {
			this.functionDiv.div.innerHTML = this.functionSpan("value", false);
		}

		//update function
		if (step.valueIndex != undefined) {
			var val = this.arrayValues[step.valueIndex];
			this.functionDiv.div.innerHTML = this.functionSpan(val, (step.showResult != undefined && step.showResult == true));
		}

		//add to hash table
		if (step.addToTableIndex != undefined) {
			var fromIndex = step.addToTableIndex;
			var val = this.arrayValues[fromIndex];
			var dims1 = this.cellDims1(fromIndex);

			var toIndex = val % 11;

			if (step.targetIndex != undefined) {
				toIndex = step.targetIndex;
			}

			if (this.hashArrayValues[toIndex] != -1 && step.chainedCollisions != undefined) {
				var dims2 = this.cellDims2(toIndex);
				dims2.y -= 3 * bh;

				var dims3 = this.cellDims2(toIndex);
				var dims4 = this.cellDims2(toIndex);
				dims4.y -= 2 * bh;

				hashArrayVal = this.hashArrayValues[toIndex];

				this.setAnimation(val, dims1.x, dims1.y, dims2.x, dims2.y, 0);
				this.setAnimation(hashArrayVal, dims3.x, dims3.y, dims4.x, dims4.y, 1);

				var gapHashArrayValues = this.hashArrayValues.slice(0);
				gapHashArrayValues[toIndex] = -1;

				this.hashArray.setData({
					values : gapHashArrayValues,
					colorMap : this.colorMap
				});

			} else {
				var dims2 = this.cellDims2(toIndex);

				this.setAnimation(val, dims1.x, dims1.y, dims2.x, dims2.y);
			}

			var gapArrayValues = this.arrayValues.slice(0);
			gapArrayValues[fromIndex] = -1;

			this.array.setData({
				values : gapArrayValues,
				colorMap : this.colorMap
			});

		}

		//deletion
		if (step.deleteHashIndex != undefined) {
			var index = step.deleteHashIndex;
			var val = this.hashArrayValues[index];
			var dims = this.cellDims2(index);

			var gapArray = this.hashArrayValues.slice(0);
			gapArray[index] = -1;
			this.hashArray.setData({
				values : gapArray,
				colorMap : this.colorMap
			});

			this.setAnimation(val, dims.x, dims.y, dims.x, dims.y + 150);
		}

		if (step.rehash != undefined) {
			for (var i = 0; i < step.rehash.length; i++) {
				var fromIndex, toIndex, val, dims1, dims2;
				fromIndex = step.rehash[i][0];
				toIndex = step.rehash[i][1];

				val = this.arrayValues[fromIndex];

				dims1 = this.cellDims1(fromIndex);
				dims2 = this.cellDims2(toIndex);

				this.setAnimation(val, dims1.x, dims1.y, dims2.x, dims2.y, i);
			}

			var emptyArray = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];

			this.array.setData({
				values : emptyArray,
				colorMap : this.colorMap
			});
		}

		//swap
		if (step.swap != undefined) {
			var first = step.swap.first, second = step.swap.second;
			var val1 = swapValueFirst;
			var val2 = swapValueSecond;

			var arrayDims1 = this.array.dims(first);
			var arrayDims2 = this.array.dims(second);

			var arrayXOffset = this.array.boxWidth() / 2;
			var arrayYOffset = bh / 2;

			//disable Next button but only if push/refresh is defined (so there's a clear re-enabling point)
			if (step.push != undefined || step.refresh != undefined) {
				this.prevButton.disable();
				this.nextButton.disable();
				this.resetButton.disable();
			}

			if (val1 == -1 && val2 == -1) {
				//skip - timers may be firing out of turn
			} else {
				this.setAnimation(val1, arrayDims1.x + arrayXOffset, arrayDims1.y + arrayYOffset, arrayDims2.x + arrayXOffset, arrayDims2.y + arrayYOffset, 0);
				this.setAnimation(val2, arrayDims2.x + arrayXOffset, arrayDims2.y + arrayYOffset, arrayDims1.x + arrayXOffset, arrayDims1.y + arrayYOffset, 1);
			}
		}

		/*
		if (this.audioPlay) {
			if (step.audio != undefined && step.audio.indexOf(".mp3") != -1) {
				this.audioElement.src = step.audio;
				this.audioElement.play();
			}
		}
		*/

		//push happens with time delay - set tree values for immediate painting
		var colorMap = this.colorMap;

		if (step.refresh != undefined && step.refresh != null) {

			this.prevButton.disable();
			this.nextButton.disable();
			this.resetButton.disable();

			setTimeout(function() {
				self.refresh(self, step.refresh, colorMap);
				self.prevButton.enable();
				self.nextButton.enable();
				self.resetButton.enable();
				self.animationLayer.context.clearRect(0, 0, self.w - 10, self.h - 6 * bh);

				this.prevButton.enable();
				this.nextButton.enable();
				this.resetButton.enable();

			}, 1000);

		}

		if (step.toOrdered != undefined && step.toOrdered == true) {
			this.toOrdered();
		}

		this.hideArray = (step.hideArray != undefined && step.hideArray == true) ? true : false;

		this.resize();
	};

	/*
	 * balance factor for each node in the current tree as an array of strings
	 * (to be used for treeLabels parameter)
	 */

	OU.activity.HashTables.prototype.getBalanceFactors = function() {
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
	OU.activity.HashTables.prototype.computeBalanceFactor = function(node) {

		var leftHeight = this.countLeftGenerations(node);
		var rightHeight = this.countRightGenerations(node);

		return parseInt(leftHeight - rightHeight);
	};

	OU.activity.HashTables.prototype.countLeftGenerations = function(node) {
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

	OU.activity.HashTables.prototype.countRightGenerations = function(node) {
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

	OU.activity.HashTables.prototype.countGenerations = function(node, total) {
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
	OU.activity.HashTables.prototype.toHeap = function(a) {

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
	OU.activity.HashTables.prototype.padArray = function(a, len, val) {
		while (a.length < len) {
			a.push(val);
		}
		return a.slice(0);
	}
	/*
	 * filter array a dropping value val
	 */
	OU.activity.HashTables.prototype.filterArray = function(a, val) {
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
	OU.activity.HashTables.prototype.toOrdered = function() {

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
			//this.count() - 1;
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
				step.arrayValues = this.padArray(gapValues.slice(0, 15, -1));

				if (--guard < 0) {
					break;
				}
			}
		}

		return steps.slice(0);
	};

	OU.activity.HashTables.prototype.playSteps = function(self, steps, aux, currentIndex, delay) {

		//at end of animation: (a) disable continue/pause button and (b) don't automatically rewind to the start
		if (currentIndex > steps.length - 1) {
			self.startButton.disable();
			return;
		}

		//generally: when paused, stop here
		if (this.state == STATE_PAUSED) {
			return;
		}

		if (!this.forceStartDisabled) {
			self.startButton.enable();
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
	OU.activity.HashTables.prototype.heapOrderMaintained = function(values) {

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
	OU.activity.HashTables.prototype.lastValidIndex = function(a) {
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

	OU.activity.HashTables.prototype.validNodeCount = function(a) {
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

	OU.activity.HashTables.prototype.refresh = function(self, obj, colorMap) {
		self.array.setData({
			values : obj.arrayValues,
			colorMap : colorMap
		});

		self.hashArray.setData({
			values : obj.hashArrayValues,
			colorMap : colorMap,
			labels : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
		});

		self.hashArrayNext.setData({
			values : obj.hashArrayNextValues,
			colorMap : colorMap
		});

		self.hashArrayLast.setData({
			values : obj.hashArrayLastValues,
			colorMap : colorMap
		});

		this.animations = [];

		self.resize();
	};

	/*
	 * sets off single-object animation
	 */
	OU.activity.HashTables.prototype.setAnimation = function(txt, x1, y1, x2, y2, layer, highlight) {
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

		this.animationLayer.context.font = "bold 14px Arial";

		this.animations[layer] = {
			"text" : txt,
			"textWidth" : this.animationLayer.context.measureText(txt).width, //this.ctx.measureText(txt).width,
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

	OU.activity.HashTables.prototype.animate = function(self, layer, highlight) {

		if (layer == undefined) {
			console.log("animate: layer undefined");
			return;
		}

		if (self.animations.length == 0) {
			return;
		}

		if (self.animations[layer].p1 == undefined || self.animations[layer].p2 == undefined) {
			console.log("animate: p1 and/or p2 undefined");
			self.clearAnimation(layer);
			return;
		}

		var dx = Math.abs(self.animations[layer].p1.x - self.animations[layer].p2.x);
		var dy = Math.abs(self.animations[layer].p1.y - self.animations[layer].p2.y);

		//check values
		if (isNaN(dx) || isNaN(dy) || dx == undefined || dy == undefined || dx == null || dy == null) {
			console.log("animate: dx/dy invalid - p2.x = " + self.animations[layer].p2.x + "; p2.y = " + self.animations[layer].p2.y);
			return;
		}

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

		//only call for last layer
		self.animationLayer.context.font = "bold 14px Arial";
		self.animationLoop();

		setTimeout(function() {
			self.animate(self, layer);
		}, 15);
	};

	OU.activity.HashTables.prototype.clearAnimation = function(layer) {
		this.animations[layer] = { };
	};

	OU.activity.HashTables.prototype.initControls = function() {
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

		prevButton.disable();

		this.nextButton = Utils.newButton((btnSpace * 1 + xPad) + "%", btnTop + "%", "Next", function() {
			self.nextButtonPressed();
		}, cssWidth, 'b', "nextButton");

		this.resetButton = Utils.newButton((btnSpace * 2 + xPad) + "%", btnTop + "%", "Reset", function() {
			self.resetButtonPressed();
		}, cssWidth, 'b', "resetButton");

		this.randomButton = Utils.newButton((btnSpace * 3 + xPad) + "%", btnTop + "%", "Random", function() {
			self.randomButtonPressed();
		}, cssWidth, "c", "randomButton");

		/*
		this.audioButton = Utils.newButton(// init the audio checkbox button
		(btnSpace * 3.7 + xPad) + "%", (btnTop) + "%", //left,top
		"Audio", function() {
			self.audioButtonPressed();
		}, cssWidth, "c", "audioButton");
		this.audioButton.checked = true;
		*/
		this.audioPlay = false;//true;

		this.randomButton.checked = false;

		var clickable = this.modelLayer.events.clickable;
		clickable.length = 0;
		clickable.push(this.infoButton);
	};

	OU.activity.HashTables.prototype.getRandomizedSteps = function() {
		//randomise value array
		var a = [];
		//input array
		var h = [];
		//hash table
		var aux = [];
		//aux labels
		var sum = 0, max = 0;

		var backup = [];

		//populate a
		for (var i = 0; i < 8; i++) {
			var test = Math.floor(Math.random() * 99);
			while (a.indexOf(test) != -1) {
				test = Math.floor(Math.random() * 99);
			}

			a[i] = test;
			sum += test;
			max += 99;
		}

		backup = a.slice(0);

		//populate h
		h = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];

		//populate aux
		aux = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

		//now build steps
		var steps = [];

		var step = {
			clearArray : true,
			arrayValues : a.slice(0),
			hashArrayValues : h.slice(0),
			auxArrayValues : aux.slice(0),
			arrayHighlights : [],
			auxArrayHighlights : [],
			auxLabel : "Slots:",
			description : "<h3>Hashing with linear probing using a randomised array as input</h3><p>Reset the visualisation to create a new randomised input array.</p>"
		};
		steps.push(step);

		var myA = [];
		var myH = [];
		var myAux = [];
		for (var i = 0; i < a.length; i++) {
			myA = a.slice(0);
			myH = h.slice(0);
			myAux = aux.slice(0);

			var val = myA[i];
			var hashVal = val % 11;

			var targetIndex;
			var probingArray = [];

			if (myH[hashVal] == -1) {
				targetIndex = hashVal;
			} else {
				for (var test = 0; test < h.length; test++) {
					probingArray.push(test);
					if (myH[test] == -1) {
						targetIndex = test;
						break;
					}
				}
			}

			var analysis = ((val % 11) == targetIndex) ? "Value " + val + " resolves to slot " + val % 11 + " which is free." : "Value " + val + " resolves to slot " + val % 11 + " which is not free. With linear probing the value is placed in slot " + targetIndex + ".";

			step = {
				clearArray : true,
				valueIndex : i,
				arrayValues : myA,
				arrayHighlights : [{
					index : i,
					color : "yellow"
				}],
				addToTableIndex : i,
				targetIndex : targetIndex,
				hashArrayValues : myH,
				auxArrayValues : myAux,
				auxArrayHighlights : [targetIndex],
				auxLabel : "Slots:",
				showResult : true,
				description : "<h3>Step " + i + " of " + myA.length + "</h3><p>Adding " + val + " to the hash table. " + analysis + "</p>"
			};

			//expand arrayHighlights
			var hashArrayHighlights = [];
			var alphaStep = 0.2 / probingArray.length;

			if (probingArray.length == 0) {
				obj = {};
				obj.index = targetIndex;
				obj.color = "red";

				hashArrayHighlights.push(obj);
			} else {
				for (var j = 0; j < probingArray.length; j++) {
					obj = {};
					obj.index = j;

					var alpha = (j == targetIndex) ? 1.0 : 0.2 + j * alphaStep;

					obj.color = "rgba(255, 0, 0, " + alpha + ")";

					hashArrayHighlights.push(obj);
				}
			}

			step.hashArrayHighlights = hashArrayHighlights.slice(0);

			//push new step - now delayed
			//steps.push(step);

			//update state
			a[i] = -1;
			h[targetIndex] = val;

			var refreshA = myA.slice(0);
			refreshA[i] = -1;
			var refreshH = h.slice(0);

			step.refresh = {
				arrayValues : refreshA,
				hashArrayValues : refreshH
			};

			steps.push(step);
		}
		step = {
			arrayValues : a.slice(0),
			hashArrayValues : h.slice(0),
			arrayHighlights : [],
			hashArrayHighlights : [],
			showResult : false,
			hideArray : false,
			description : "<h3></h3><p>This concludes the visualisation.</p>"
		}

		steps.push(step);

		a = backup.slice(0);
		return steps;
	};

	OU.activity.HashTables.prototype.prevButtonPressed = function() {
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

	OU.activity.HashTables.prototype.nextButtonPressed = function() {
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

	OU.activity.HashTables.prototype.resetButtonPressed = function() {
		this.globalStepIndex = data.startOffset || 0;

		this.globalSteps = (this.shuffleOnReset) ? this.getRandomizedSteps() : this.data.steps.slice(0);

		this.prevButton.disable();
		this.nextButton.enable();

		this.loadStep(this.globalSteps[this.globalStepIndex]);

		this.resize();
	};

	OU.activity.HashTables.prototype.randomButtonPressed = function() {
		this.shuffleOnReset = !this.shuffleOnReset;
		this.prevButton.disable();
		this.nextButton.disable();
	};

	OU.activity.HashTables.prototype.audioButtonPressed = function() {
		this.audioPlay = !this.audioPlay;

		if (this.audioPlay == false) {
			this.audioElement.pause();
		}
	};

	OU.activity.HashTables.prototype.accessibleView = function() {
		OU.activity.HashTables.superClass_.accessibleView.call(this);
	};

	OU.activity.HashTables.prototype.resize = function() {
		var bh = OU.controlHeight;

		OU.activity.HashTables.superClass_.resize.call(this);

		this.bgLayer.resize();

		this.descriptionDiv.slideTo({
			"x" : 50,
			"y" : 0,
			"w" : this.w - 100,
			"h" : 5 * bh//2 * bh
		});

		this.captionDiv.slideTo({
			"x" : 50,
			"y" : 15 * bh, //this.h - 2 * bh,
			"w" : this.w - 200,
			"h" : 2 * bh
		});

		this.modelLayer.resize();

		this.animationLayer.resize(/*{
			x : 0,
			y : 5.5 * bh,
			w : this.w,
			h : this.h - 5 * bh,
		}*/);

		this.render();
	};

	OU.activity.HashTables.prototype.render = function() {
		var ctx = this.ctx, bh = OU.controlHeight, stageHeight = this.h - bh;
		ctx.font = 'bold 14px Arial';

		this.arrayAdjX = this.w / 2 - this.arrayWidth / 2;
		this.arrayAdjY = 5 * bh;

		this.functionAdjX = this.w / 2 - this.functionWidth / 2;
		this.functionAdjY = 7 * bh;

		this.hashArrayAdjX = this.w / 2 - this.arrayWidth / 2;
		this.hashArrayAdjY = 11 * bh;

		this.hashArrayNextAdjY = 9 * bh;

		this.hashArrayLastAdjY = 8 * bh;

		this.functionDiv.slideTo({
			x : this.functionAdjX,
			y : this.functionAdjY,
			w : this.functionWidth,
			h : this.functionHeight
		});

		this.searchDiv.slideTo({
			"x" : 100,
			"y" : this.functionAdjY,
			"w" : 200,
			"h" : bh
		});

		if (this.hideArray == true) {
			//don't show function, don't render arrays
			this.functionDiv.div.innerHTML = "";
		} else {
			//keep function text as is, render arrays
			this.renderArrays();
		}

		this.infoButton.render();

		/*
		 if (this.animations != undefined && this.animations.length != 0) {
		 for (var i = 0; i < this.animations.length; i++) {
		 this.renderAnimation(i);
		 }
		 }
		 */
	};

	OU.activity.HashTables.prototype.renderArrays = function() {
		this.array.resize({
			"x" : this.arrayAdjX,
			"y" : this.arrayAdjY,
			"w" : this.arrayWidth,
			"h" : this.arrayHeight
		});

		this.hashArray.resize({
			"x" : this.hashArrayAdjX,
			"y" : this.hashArrayAdjY,
			"w" : this.hashArrayWidth,
			"h" : this.hashArrayHeight
		});

		this.hashArrayNext.resize({
			"x" : this.hashArrayAdjX,
			"y" : this.hashArrayNextAdjY,
			"w" : this.hashArrayWidth,
			"h" : this.hashArrayHeight
		});

		this.hashArrayLast.resize({
			"x" : this.hashArrayAdjX,
			"y" : this.hashArrayLastAdjY,
			"w" : this.hashArrayWidth,
			"h" : this.hashArrayHeight
		});
	};

	OU.activity.HashTables.prototype.animationLoop = function() {
		var ctx = this.animationLayer.context, bh = OU.controlHeight;

		if (this.animations != undefined) {

			ctx.beginPath();
			ctx.clearRect(0, 0, this.w, this.h);

			for (var i = 0; i < this.animations.length; i++) {
				this.renderAnimation(i, ctx);
			}
			ctx.fill();
		}
		ctx.fillStyle = 'black';
	};

	OU.activity.HashTables.prototype.renderAnimation = function(layer) {
		var ctx = this.animationLayer.context, bh = OU.controlHeight;

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
			//ctx.font = "bold 14px Arial";
			ctx.fillText(text, pa.x - textWidth / 2, pa.y);
		}
	};

	OU.activity.HashTables.prototype.remove = function() {
		OU.activity.HashTables.superClass_.remove.call(this);
	};

	OU.activity.HashTables.prototype.showMessage = function(buffer) {
		var el = document.getElementById("messageDiv");
		el.innerHTML = buffer;
		el.style.display = "block";
	};

	// ported from here:
	//http://www.cs.rit.edu/~ncs/color/t_convert.html
	OU.activity.HashTables.prototype.getColorHexHSV = function(h, s, v) {
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
OU.inherits(OU.activity.HashTables, OU.util.Activity);

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

			if (val != -1 && val in this.colorMap) {
				var col = this.colorMap[val];
				ctx.fillStyle = col;
				ctx.fillRect(calcX - this.overlap, this.y - this.overlap, boxWidth + 2 * this.overlap, bh + 2 * this.overlap);
			}

			ctx.beginPath();
			ctx.fillStyle = 'black';

			if (!(this.hideEmptyCells == true && val == '-1')) {
				ctx.strokeRect(calcX, this.y, boxWidth, bh);
			}

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

		ctx.fillStyle = color;

		ctx.strokeStyle = 'black';

		ctx.beginPath();

		//top

		/*
		ctx.moveTo(this.x + index * boxWidth + boxWidth * 0.5, this.y + bh);
		ctx.lineTo(this.x + index * boxWidth + boxWidth, this.y + 1.25 * bh);
		ctx.lineTo(this.x + index * boxWidth + boxWidth * 0.75, this.y + 1.25 * bh);
		ctx.lineTo(this.x + index * boxWidth + boxWidth * 0.75, this.y + 1.75 * bh);
		ctx.lineTo(this.x + index * boxWidth + boxWidth * 0.25, this.y + 1.75 * bh);
		ctx.lineTo(this.x + index * boxWidth + boxWidth * 0.25, this.y + 1.25 * bh);
		ctx.lineTo(this.x + index * boxWidth, this.y + 1.25 * bh);
		ctx.lineTo(this.x + index * boxWidth + boxWidth * 0.5, this.y + bh);
		*/

		//adjust for wider cell width
		ctx.moveTo(this.x + index * boxWidth + boxWidth * 0.5, this.y + bh);
		ctx.lineTo(this.x + index * boxWidth + boxWidth * 0.75, this.y + 1.25 * bh);
		ctx.lineTo(this.x + index * boxWidth + boxWidth * 0.6, this.y + 1.25 * bh);
		ctx.lineTo(this.x + index * boxWidth + boxWidth * 0.6, this.y + 1.75 * bh);
		ctx.lineTo(this.x + index * boxWidth + boxWidth * 0.4, this.y + 1.75 * bh);
		ctx.lineTo(this.x + index * boxWidth + boxWidth * 0.4, this.y + 1.25 * bh);
		ctx.lineTo(this.x + index * boxWidth + boxWidth * 0.25, this.y + 1.25 * bh);
		ctx.lineTo(this.x + index * boxWidth + boxWidth * 0.5, this.y + bh);

		ctx.closePath();

		ctx.stroke();
		ctx.fill();
	};

	OU.base(this, params);
};
OU.inherits(OU.util.BoxArray, OU.util);

