data = {
	"title" : "<h2>Heap sort</h2>",
	"info" : "<h2>Information</h2><ul><li>Click Next to go to the next step.</li><li>Click Previous to go to the preceding step.</li><li>Select Reset to go back to the start of the visualisation. The steps will vary depending on whether the Random checkbox is checked.</li><li>Toggle Random to select the main script or one based on randomised input.</li><li>Press Audio to toggle audio narration on or off. Note that no audio is available for randomised input.</li></ul>",
	"startOffset" : 0,
	"orderingProperty" : false,
	"forcePortrait" : false,
	"forceLandscape" : true,
	"defaultValues" : [54, 26, 93, 44, 77, 31, 18, 55, 9],
	"steps" : [
	//0
	{
		"audio" : "data/audio/m269_heapsort_01.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
		"treeValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
		"treeHighlights" : [],
		"treeLabels" : [],
		"indexColors" : true,
		"description" : "<h3>Introduction</h3><p>In this visualisation we will see heap sorting in action.</p>"
	},
	//1
	{
		"audio" : "data/audio/m269_heapsort_02.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"treeValues" : [0],
		"treeHighlights" : [],
		"treeLabels" : [],
		"indexColors" : true,
		"description" : "<h3>The heap</h3><p>To understand heap sort, we need to first understand heaps. We look at the heap represented both as a list and as a tree.</p>"
	},
	//2
	{
		"audio" : "data/audio/m269_heapsort_03a.mp3",
		"arrayValues" : [0, 1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"treeValues" : [0, 1, 2],
		"treeHighlights" : [],
		"indexColors" : true,
		"description" : "<h3>The heap</h3><p>Numbering the nodes in the tree 0, 1, 2, ... as depicted gives us a mapping between positions in the tree and positions in the list.</p>"
	},
	//2a
	{
		"audio" : "data/audio/m269_heapsort_03b.mp3",
		"arrayValues" : [0, 1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"treeValues" : [0, 1, 2],
		"treeHighlights" : [],
		"indexColors" : true,
		"description" : "<h3>The heap</h3><p>Note that here the numbers represent indexes into the list, not keys or values that are to be stored. We will come to those later.</p>"
	},
	//3
	{
		"audio" : "data/audio/m269_heapsort_04.mp3",
		"arrayValues" : [0, 1, 2, 3, 4, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1],
		"treeValues" : [0, 1, 2, 3, 4, 5, 6],
		"treeHighlights" : [],
		"indexColors" : true,
		"description" : "<h3>The heap</h3><p>This specific numbering of nodes makes it simple to convert position in the tree to position in the list.</p>"
	},
	//4
	{
		"arrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
		"treeValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
		"treeHighlights" : [],
		"indexColors" : true,
		"description" : "<h3>The heap</h3>"
	},
	//5
	{
		"audio" : "data/audio/m269_heapsort_05.mp3",
		"arrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
		"treeValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
		"treeLabels" : ["", "", "p = 2"],
		"treeHighlights" : [{
			"index" : 2,
			"color" : 'red'
		}],
		"arrayHighlights" : [{
			"index" : 2,
			"color" : "red"
		}],
		"indexColors" : true,
		"description" : "<h3>The heap</h3><p>There is a fixed relationship between the index of a parent and its index in the list.</p><p>Given a parent at index p in this case 2 ...</p>"
	},
	//6
	{
		"audio" : "data/audio/m269_heapsort_06.mp3",
		"arrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
		"treeValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
		"treeLabels" : ["", "", "p = 2", "", "", "2p + 1 = 5"],
		"treeHighlights" : [{
			"index" : 2,
			"color" : "red"
		}, {
			"index" : 5,
			"color" : "green"
		}],
		"arrayHighlights" : [{
			"index" : 2,
			"color" : "red"
		}, {
			"index" : 5,
			"color" : "green"
		}],
		"indexColors" : true,
		"description" : "<h3>The heap</h3><p>... the left child is at index 2p + 1. Note that our approach is slightly different from that in Miller and Ranum. There, the left child is stored at index 2p. They achieve this through a cheat: they associate the root of the tree with the index 1 and store a dummy at index 0 in the list, which is never used.</p>"
	},
	//7
	{
		"audio" : "data/audio/m269_heapsort_07.mp3",
		"arrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
		"treeValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
		"treeLabels" : ["", "", "p = 2", "", "", "2p + 1 = 5", "2p + 2 = 6"],
		"treeHighlights" : [{
			"index" : 2,
			"color" : "red"
		}, {
			"index" : 5,
			"color" : "green"
		}, {
			"index" : 6,
			"color" : "yellow"
		}],
		"arrayHighlights" : [{
			"index" : 2,
			"color" : "red"
		}, {
			"index" : 5,
			"color" : "green"
		}, {
			"index" : 6,
			"color" : "yellow"
		}],
		"indexColors" : true,
		"description" : "<h3>The heap</h3><p>The right child is at 2p + 2. Note again the difference with Miller and Ranum, who store the child at 2p + 1 in the list.</p><p>Naturally, if you have a child, you can reverse the formulas to give you the parent index in the list."
	},
	//8
	{
		"audio" : "data/audio/m269_heapsort_08.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [9, 26, 18, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"treeValues" : [9, 26, 18],
		"treeLabels" : ["", "26 > 9", "18 > 9"],
		"treeHighlights" : [],
		"description" : "<h3>Rules of the heap tree</h3><p>The heap is a special case of the complete binary tree. We store the keys in a heap with the following rule: the key stored in each child must be greater than the key of the parent. In other words, we maintain what is known as the heap order property.</p>"
	},
	//9 - #54
	{
		"audio" : "data/audio/m269_heapsort_09.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [54, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"treeValues" : [54],
		"treeLabels" : ["0"],
		"arrayHighlights" : [{
			"index" : 0,
			"color" : "red"
		}],
		"treeHighlights" : [{
			"index" : 0,
			"color" : "red"
		}],
		"auxArrayValues" : [54, 26, 93, 44, 77, 31, 18, 55, 9],
		"auxArrayHighlights" : [0],
		"description" : "<h3>Heap sorting: adding numbers</h3><p>Let’s begin by adding all the numbers in this list to the heap. Let’s start with 54. We place the element in the first available space, which in this case is 0, at the root of the heap.</p>"
	},
	//10 - #26
	{
		"audio" : "data/audio/m269_heapsort_10.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [54, 26, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"treeValues" : [54, 26],
		"treeLabels" : ["0", "1"],
		"arrayHighlights" : [{
			"index" : 1,
			"color" : "red"
		}, {
			"index" : 0,
			"color" : "yellow"
		}],
		"treeHighlights" : [{
			"index" : 1,
			"color" : "red"
		}, {
			"index" : 0,
			"color" : "yellow"
		}],
		"auxArrayValues" : [54, 26, 93, 44, 77, 31, 18, 55, 9],
		"auxArrayHighlights" : [1],
		"description" : "<h3>Heap sorting: adding numbers</h3><p>Now we want to add 26. We place it in the next available slot which is position 1.</p><p>Then we apply the rule that each parent must be smaller than its child. It isn’t so we swap them.</p>",
	}, {
		"audio" : "data/audio/m269_heapsort_11.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"treeValues" : [-1],
		"treeLabels" : ["0", "1"],
		"arrayHighlights" : [],
		"treeHighlights" : [],
		"auxArrayValues" : [54, 26, 93, 44, 77, 31, 18, 55, 9],
		"auxArrayHighlights" : [1],
		"description" : "<h3>Heap sorting: adding numbers</h3><p>This leaves the heap in its correct state. Notice that the ordering changes both in the tree and in the list representation of the heap.</p>",
		"swap" : {
			"first" : 0,
			"second" : 1
		},
		"refresh" : {
			"delay" : 1500,
			"arrayValues" : [26, 54, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			"treeValues" : [26, 54],
			"treeLabels" : ["0", "1"]
		}
	},
	//93
	{
		"audio" : "data/audio/m269_heapsort_12.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [26, 54, 93, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"treeValues" : [26, 54, 93],
		"treeLabels" : ["0", "1", "2"],
		"arrayHighlights" : [{
			"index" : 2,
			"color" : "red"
		}],
		"treeHighlights" : [{
			"index" : 2,
			"color" : "red"
		}],
		"auxArrayValues" : [54, 26, 93, 44, 77, 31, 18, 55, 9],
		"auxArrayHighlights" : [2],
		"description" : "<h3>Heap sorting: adding numbers</h3><p>Adding 93 doesn’t require a swap.</p>"
	},
	//44
	{
		"audio" : "data/audio/m269_heapsort_13.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [26, 54, 93, 44, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"treeValues" : [26, 54, 93, 44],
		"treeLabels" : ["0", "1", "2", "3"],
		"arrayHighlights" : [{
			"index" : 3,
			"color" : "red"
		}, {
			"index" : 1,
			"color" : "yellow"
		}],
		"treeHighlights" : [{
			"index" : 3,
			"color" : "red"
		}, {
			"index" : 1,
			"color" : "yellow"
		}],
		"auxArrayValues" : [54, 26, 93, 44, 77, 31, 18, 55, 9],
		"auxArrayHighlights" : [3],
		"description" : "<h3>Heap sorting: adding numbers</h3><p>Adding 44 requires one swap with its parent.</p>",

	}, {
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [26, -1, 93, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"treeValues" : [26, -1, 93],
		"treeLabels" : ["0", "1", "2", "3"],
		"arrayHighlights" : [],
		"treeHighlights" : [],
		"auxArrayValues" : [54, 26, 93, 44, 77, 31, 18, 55, 9],
		"auxArrayHighlights" : [3],
		"description" : "<h3>Heap sorting: adding numbers</h3>",
		"swap" : {
			"first" : 1,
			"second" : 3
		},
		"refresh" : {
			"delay" : 1500,
			"arrayValues" : [26, 44, 93, 54, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			"treeValues" : [26, 44, 93, 54],
			"treeLabels" : ["0", "1", "2", "3"]
		}
	},
	//77
	{
		"audio" : "data/audio/m269_heapsort_14.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [26, 44, 93, 54, 77, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"treeValues" : [26, 44, 93, 54, 77],
		"treeLabels" : ["0", "1", "2", "3", "4"],
		"arrayHighlights" : [{
			"index" : 4,
			"color" : "red"
		}],
		"treeHighlights" : [{
			"index" : 4,
			"color" : "red"
		}],
		"auxArrayValues" : [54, 26, 93, 44, 77, 31, 18, 55, 9],
		"auxArrayHighlights" : [4],
		"description" : "<h3>Heap sorting: adding numbers</h3><p>We add 77. No swaps are needed.</p>"
	},
	//31
	{
		"audio" : "data/audio/m269_heapsort_15.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [26, 44, 93, 54, 77, 31, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"treeValues" : [26, 44, 93, 54, 77, 31],
		"treeLabels" : ["0", "1", "2", "2", "3", "4", "5"],
		"arrayHighlights" : [{
			"index" : 2,
			"color" : "yellow"
		}, {
			"index" : 5,
			"color" : "red"
		}],
		"treeHighlights" : [{
			"index" : 2,
			"color" : "yellow"
		}, {
			"index" : 5,
			"color" : "red"
		}],
		"auxArrayValues" : [54, 26, 93, 44, 77, 31, 18, 55, 9],
		"auxArrayHighlights" : [5],
		"description" : "<h3>Heap sorting: adding numbers</h3><p>We add 31 which has one swap.</p>",
	}, {
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [26, 44, -1, 54, 77, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"treeValues" : [26, 44, -1, 54, 77],
		"treeLabels" : ["0", "1", "2", "2", "3", "4", "5"],
		"arrayHighlights" : [],
		"treeHighlights" : [],
		"auxArrayValues" : [54, 26, 93, 44, 77, 31, 18, 55, 9],
		"auxArrayHighlights" : [5],
		"description" : "<h3>Heap sorting: adding numbers</h3>",
		"swap" : {
			"first" : 2,
			"second" : 5
		},
		"refresh" : {
			"delay" : 1500,
			"arrayValues" : [26, 44, 31, 54, 77, 93, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			"treeValues" : [26, 44, 31, 54, 77, 93],
			"treeLabels" : ["0", "1", "2", "3", "4", "5"]
		}
	},
	//18
	{
		"audio" : "data/audio/m269_heapsort_16.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [26, 44, 31, 54, 77, 93, 18, -1, -1, -1, -1, -1, -1, -1, -1],
		"treeValues" : [26, 44, 31, 54, 77, 93, 18],
		"treeLabels" : ["0", "1", "2", "3", "4", "5", "6"],
		"arrayHighlights" : [{
			"index" : 6,
			"color" : "red"
		}, {
			"index" : 2,
			"color" : "yellow"
		}],
		"treeHighlights" : [{
			"index" : 6,
			"color" : "red"
		}, {	
			"index" : 2,
			"color" : "yellow"
		}],
		"auxArrayValues" : [54, 26, 93, 44, 77, 31, 18, 55, 9],
		"auxArrayHighlights" : [6],
		"description" : "<h3>Heap sorting: adding numbers</h3><p>We add 18 which is swapped with its parent.</p>"
	}, {
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [26, 44, -1, 54, 77, 93, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"treeValues" : [26, 44, -1, 54, 77, 93],
		"treeLabels" : ["0", "1", "2", "3", "4", "5", "6"],
		"arrayHighlights" : [],
		"treeHighlights" : [],
		"auxArrayValues" : [54, 26, 93, 44, 77, 31, 18, 55, 9],
		"auxArrayHighlights" : [6],
		"description" : "<h3>Heap sorting</h3>",
		"swap" : {
			"first" : 2,
			"second" : 6
		},
		"refresh" : {
			"delay" : 1500,
			"arrayValues" : [26, 44, 18, 54, 77, 93, 31, -1, -1, -1, -1, -1, -1, -1, -1],
			"treeValues" : [26, 44, 18, 54, 77, 93, 31],
			"treeLabels" : ["0", "1", "2", "3", "4", "5", "6"]
		}
	}, {
		"audio" : "data/audio/m269_heapsort_17.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [26, 44, 18, 54, 77, 93, 31, -1, -1, -1, -1, -1, -1, -1, -1],
		"treeValues" : [26, 44, 18, 54, 77, 93, 31],
		"treeLabels" : ["0", "1", "2", "3", "4", "5", "6"],
		"arrayHighlights" : [{
			"index" : 0,
			"color" : "red"
		}, {
			"index" : 2,
			"color" : "yellow"
		}],
		"treeHighlights" : [{
			"index" : 2,
			"color" : "red"
		}, {
			"index" : 0,
			"color" : "yellow"
		}],
		"auxArrayValues" : [54, 26, 93, 44, 77, 31, 18, 55, 9],
		"auxArrayHighlights" : [6],
		"description" : "<h3>Heap sorting: adding numbers</h3><p>Then another swap with its parent follows.</p>"
	}, {
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [-1, 44, -1, 54, 77, 93, 31, -1, -1, -1, -1, -1, -1, -1, -1],
		"treeValues" : [-1, 44, -1, 54, 77, 93, 31],
		"treeLabels" : ["0", "1", "2", "3", "4", "5", "6"],
		"arrayHighlights" : [],
		"treeHighlights" : [],
		"auxArrayValues" : [54, 26, 93, 44, 77, 31, 18, 55, 9],
		"auxArrayHighlights" : [6],
		"description" : "<h3>Heap sorting: adding numbers</h3>",
		"swap" : {
			"first" : 0,
			"second" : 2
		},
		"refresh" : {
			"delay" : 1500,
			"arrayValues" : [18, 44, 26, 54, 77, 93, 31, -1, -1, -1, -1, -1, -1, -1, -1],
			"treeValues" : [18, 44, 26, 54, 77, 93, 31],
			"treeLabels" : ["0", "1", "2", "3", "4", "5", "6"]
		}
	}, {
		"audio" : "data/audio/m269_heapsort_18.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [18, 44, 26, 54, 77, 93, 31, -1, -1, -1, -1, -1, -1, -1, -1],
		"treeValues" : [18, 44, 26, 54, 77, 93, 31],
		"treeLabels" : ["0", "1", "2", "3", "4", "5", "6"],
		"arrayHighlights" : [],
		"treeHighlights" : [],
		"auxArrayValues" : [54, 26, 93, 44, 77, 31, 18, 55, 9],
		"auxArrayHighlights" : [6],
		"description" : "<h3>Heap sorting: adding numbers</h3><p>This makes 18 the root element. This continues, i.e. 55 and 9 are added as well."
	},
	//55
	{
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [18, 44, 26, 54, 77, 93, 31, 55, -1, -1, -1, -1, -1, -1, -1],
		"treeValues" : [18, 44, 26, 54, 77, 93, 31, 55],
		"treeLabels" : ["0", "1", "2", "3", "4", "5", "6", "7"],
		"arrayHighlights" : [{
			"index" : 7,
			"color" : "red"
		}],
		"treeHighlights" : [{
			"index" : 7,
			"color" : "red"
		}],
		"auxArrayValues" : [54, 26, 93, 44, 77, 31, 18, 55, 9],
		"auxArrayHighlights" : [7],
		"description" : "<h3>Heap sorting: adding numbers</h3>"
	},
	//9
	{
		"audio" : "data/audio/m269_heapsort_19.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [9, 18, 26, 44, 77, 93, 31, 55, 54, -1, -1, -1, -1, -1, -1],
		"treeValues" : [9, 18, 26, 44, 77, 93, 31, 55, 54],
		"treeLabels" : ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
		"arrayHighlights" : [{
			"index" : 0,
			"color" : "red"
		}],
		"treeHighlights" : [{
			"index" : 0,
			"color" : "red"
		}],
		"auxArrayValues" : [54, 26, 93, 44, 77, 31, 18, 55, 9],
		"auxArrayHighlights" : [8],
		"description" : "<h3>Heap sorting: adding numbers</h3><p>At this point we have added all the items. Note that we have a complete tree: at each level it has its maximum number of nodes, except for the lowest level. At that level, new leaf nodes are added from left to right.</p>"
	},
	//9
	{
		"audio" : "data/audio/m269_heapsort_20.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [9, 18, 26, 44, 77, 93, 31, 55, 54, -1, -1, -1, -1, -1, -1],
		"treeValues" : [9, 18, 26, 44, 77, 93, 31, 55, 54],
		"treeLabels" : ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
		"auxArrayValues" : [54, 26, 93, 44, 77, 31, 18, 55, 9],
		"auxArrayHighlights" : [],
		"description" : "<h3>Heap sorting: adding numbers</h3><p>It should be obvious that the smallest element, 9, is at the root.</p><p>Hopefully that gives you a clue for how we can exploit the heap to do sorting.</p>"
	},
	//retrieving numbers
	{
		"audio" : "data/audio/m269_heapsort_21.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [9, 18, 26, 44, 77, 93, 31, 55, 54, -1, -1, -1, -1, -1, -1],
		"treeValues" : [9, 18, 26, 44, 77, 93, 31, 55, 54],
		"treeLabels" : ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
		"treeHighlights" : [{
			"index" : 0,
			"color" : 'red'
		}],
		"arrayHighlights" : [{
			"index" : 0,
			"color" : 'red'
		}],
		"auxArrayValues" : [],
		"auxArrayHighlights" : [],
		"auxLabel" : "Output:",
		"description" : "<h3>Heap sorting: retrieving numbers in sort order</h3><p>Remember that as a result of the mapping between nodes and list indexes, we can store the heap simply as a list.</p><p>To start sorting we remove the smallest or root element, 9.</p><!--<p>For clarity we will put 9 at the other end of the list.</p>-->"
	}, {
		"audio" : "",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [9, 18, 26, 44, 77, 93, 31, 55, 54, -1, -1, -1, -1, -1, -1],
		"treeValues" : [9, 18, 26, 44, 77, 93, 31, 55, 54],
		"treeLabels" : ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
		"treeHighlights" : [{
			"index" : 0,
			"color" : 'red'
		}],
		"arrayHighlights" : [{
			"index" : 0,
			"color" : 'red'
		}],
		"auxArrayValues" : [],
		"auxArrayHighlights" : [],
		"auxLabel" : "Output:",
		"description" : "<h3>Heap sorting: retrieving numbers in sort order</h3>"
	}, {
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [-1, 18, 26, 44, 77, 93, 31, 55, 54, -1, -1, -1, -1, -1, -1],
		"treeValues" : [-1, 18, 26, 44, 77, 93, 31, 55, 54],
		"treeLabels" : ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
		"treeHighlights" : [],
		"arrayHighlights" : [],
		"auxArrayValues" : [9],
		"auxArrayHighlights" : [0],
		"auxLabel" : "Output:",
		"description" : "<h3>Heap sorting: retrieving numbers in sort order</h3>"
	},
	//54 highlighted
	{
		"audio" : "data/audio/m269_heapsort_22.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [-1, 18, 26, 44, 77, 93, 31, 55, 54, -1, -1, -1, -1, -1, -1],
		"treeValues" : [-1, 18, 26, 44, 77, 93, 31, 55, 54],
		"treeLabels" : ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
		"treeHighlights" : [{
			"index" : 8,
			"color" : "red"
		}],
		"arrayHighlights" : [{
			"index" : 8,
			"color" : "red"
		}],
		"auxArrayValues" : [9],
		"auxArrayHighlights" : [0],
		"auxLabel" : "Output:",
		"description" : "<h3>Heap sorting: retrieving numbers in sort order</h3><p>Having removed 9 we choose the number at the other end of the list to take its place.</p>"
	},
	//54 in root pos
	{
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [54, 18, 26, 44, 77, 93, 31, 55, -1, -1, -1, -1, -1, -1, -1],
		"treeValues" : [54, 18, 26, 44, 77, 93, 31, 55],
		"treeLabels" : ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
		"treeHighlights" : [{
			"index" : 0,
			"color" : "red"
		}],
		"arrayHighlights" : [{
			"index" : 0,
			"color" : "red"
		}],
		"auxArrayValues" : [9],
		"auxArrayHighlights" : [0],
		"auxLabel" : "Output:",
		"description" : "<h3>Heap sorting: retrieving numbers in sort order</h3>"
	},
	//now re-establish heap order
	//intro
	{
		"audio" : "data/audio/m269_heapsort_23a.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [54, 18, 26, 44, 77, 93, 31, 55, -1, -1, -1, -1, -1, -1, -1],
		"treeValues" : [54, 18, 26, 44, 77, 93, 31, 55],
		"treeLabels" : ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
		"treeHighlights" : [{
			"index" : 0,
			"color" : "red"
		}, {
			"index" : 1,
			"color" : "yellow"
		}],
		"arrayHighlights" : [{
			"index" : 1,
			"color" : "red"
		}],
		"auxArrayValues" : [9],
		"auxArrayHighlights" : [0],
		"auxLabel" : "Output:",
		"description" : "<h3>Heap sorting: retrieving numbers in sort order</h3><p>But like when we added an item, we must make sure the rules of the heap are still applied.</p>"
	},
	//swap 0 and 1
	{
		"audio" : "data/audio/m269_heapsort_23b.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [-1, -1, 26, 44, 77, 93, 31, 55, -1, -1, -1, -1, -1, -1, -1],
		"treeValues" : [-1, -1, 26, 44, 77, 93, 31, 55],
		"treeLabels" : ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
		"treeHighlights" : [{
			"index" : 0,
			"color" : "red"
		}, {
			"index" : 1,
			"color" : "yellow"
		}],
		"arrayHighlights" : [{
			"index" : 0,
			"color" : "red"
		}, {
			"index" : 1,
			"color" : "yellow"
		}],
		"auxArrayValues" : [9],
		"auxArrayHighlights" : [0],
		"auxLabel" : "Output:",
		"description" : "<h3>Heap sorting: retrieving numbers in sort order</h3><p>We must swap the parent with the smallest child.</p><p>In this case we swap 54 with 18.</p>",
		"swap" : {
			"first" : 0,
			"second" : 1
		},
		"refresh" : {
			"delay" : 1500,
			"arrayValues" : [18, 54, 26, 44, 77, 93, 31, 55, -1, -1, -1, -1, -1, -1, -1],
			"treeValues" : [18, 54, 26, 44, 77, 93, 31, 55],
			"treeLabels" : ["0", "1", "2", "3", "4", "5", "6", "7", "8"]
		}
	},
	//prepare swap #1 + #3
	{
		"audio" : "data/audio/m269_heapsort_24.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [18, 54, 26, 44, 77, 93, 31, 55, -1, -1, -1, -1, -1, -1, -1],
		"treeValues" : [18, 54, 26, 44, 77, 93, 31, 55],
		"treeLabels" : ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
		"treeHighlights" : [{
			"index" : 1,
			"color" : "red"
		}, {
			"index" : 3,
			"color" : "yellow"
		}],
		"arrayHighlights" : [{
			"index" : 1,
			"color" : "red"
		}, {
			"index" : 3,
			"color" : "yellow"
		}],
		"auxArrayValues" : [9],
		"auxArrayHighlights" : [0],
		"auxLabel" : "Output:",
		"description" : "<h3>Heap sorting: retrieving numbers in sort order</h3><p>We must keep applying the rule until it does not apply.</p>"
	},
	//now swap #1 and #3
	{
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [18, -1, 26, -1, 77, 93, 31, 55, -1, -1, -1, -1, -1, -1, -1],
		"treeValues" : [18, -1, 26, -1, 77, 93, 31, 55],
		"treeLabels" : ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
		"treeHighlights" : [],
		"arrayHighlights" : [],
		"swap" : {
			"first" : 1,
			"second" : 3
		},
		"refresh" : {
			"arrayValues" : [18, 44, 26, 54, 77, 93, 31, 55, -1, -1, -1, -1, -1, -1, -1],
			"treeValues" : [18, 44, 26, 54, 77, 93, 31, 55],
			"treeLabels" : ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
		},
		"auxArrayValues" : [9],
		"auxArrayHighlights" : [0],
		"auxLabel" : "Output:",
		"description" : "<h3>Heap sorting: retrieving numbers in sort order</h3>"
	},
	//retrieve 18 - highlight
	{
		"audio" : "data/audio/m269_heapsort_25.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [18, 44, 26, 54, 77, 93, 31, 55, -1, -1, -1, -1, -1, -1, -1],
		"treeValues" : [18, 44, 26, 54, 77, 93, 31, 55],
		"treeLabels" : ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
		"treeHighlights" : [{
			"index" : 0,
			"color" : "red"
		}],
		"arrayHighlights" : [{
			"index" : 0,
			"color" : "red"
		}],
		"auxArrayValues" : [9],
		"auxArrayHighlights" : [],
		"auxLabel" : "Output:",
		"description" : "<h3>Heap sorting: retrieving numbers in sort order</h3><p>Once this has finished the root now has the smallest number again and we can repeat the process of removing the smallest number.</p>"
	}, {
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [-1, 44, 26, 54, 77, 93, 31, 55, -1, -1, -1, -1, -1, -1, -1],
		"treeValues" : [-1, 44, 26, 54, 77, 93, 31, 55],
		"treeLabels" : ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
		"treeHighlights" : [],
		"arrayHighlights" : [],
		"auxArrayValues" : [9, 18],
		"auxArrayHighlights" : [1],
		"auxLabel" : "Output:",
		"description" : "<h3>Heap sorting: retrieving numbers in sort order</h3>"
	},
	//55 becomes root
	{
		"audio" : "data/audio/m269_heapsort_26.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [-1, 44, 26, 54, 77, 93, 31, 55, -1, -1, -1, -1, -1, -1, -1],
		"treeValues" : [-1, 44, 26, 54, 77, 93, 31, 55],
		"treeLabels" : ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
		"treeHighlights" : [{
			"index" : 7,
			"color" : "red"
		}],
		"arrayHighlights" : [{
			"index" : 7,
			"color" : "red"
		}],
		"auxArrayValues" : [9, 18],
		"auxArrayHighlights" : [1],
		"auxLabel" : "Output:",
		"description" : "<h3>Heap sorting: retrieving numbers in sort order</h3><p>The vacant position is taken up by the number at the end of the heap, 55 in this case.</p>"
	}, {
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [55, 44, 26, 54, 77, 93, 31, 55, -1, -1, -1, -1, -1, -1, -1],
		"treeValues" : [55, 44, 26, 54, 77, 93, 31, 55],
		"treeLabels" : ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
		"treeHighlights" : [{
			"index" : 0,
			"color" : "red"
		}],
		"arrayHighlights" : [{
			"index" : 0,
			"color" : "red"
		}],
		"auxArrayValues" : [9, 18],
		"auxArrayHighlights" : [1],
		"auxLabel" : "Output:",
		"description" : "<h3>Heap sorting: retrieving numbers in sort order</h3>"
	}, {
		"audio" : "data/audio/m269_heapsort_27.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [55, 44, 26, 54, 77, 93, 31, -1, -1, -1, -1, -1, -1, -1, -1],
		"treeValues" : [55, 44, 26, 54, 77, 93, 31, -1],
		"treeLabels" : ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
		"treeHighlights" : [{
			"index" : 0,
			"color" : "red"
		}],
		"arrayHighlights" : [{
			"index" : 0,
			"color" : "red"
		}],
		"auxArrayValues" : [9, 18],
		"auxArrayHighlights" : [1],
		"auxLabel" : "Output:",
		"description" : "<h3>Heap sorting: retrieving numbers in sort order</h3><p>Then we apply the rule again.</p>"
	},
	//mark 55 and 26
	{
		"audio" : "data/audio/m269_heapsort_28.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [55, 44, 26, 54, 77, 93, 31, -1, -1, -1, -1, -1, -1, -1, -1],
		"treeValues" : [55, 44, 26, 54, 77, 93, 31, -1],
		"treeLabels" : ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
		"treeHighlights" : [{
			"index" : 0,
			"color" : "red"
		}, {
			"index" : 2,
			"color" : "yellow"
		}],
		"arrayHighlights" : [{
			"index" : 0,
			"color" : "red"
		}, {
			"index" : 2,
			"color" : "yellow"
		}],

		"auxArrayValues" : [9, 18],
		"auxArrayHighlights" : [1],
		"auxLabel" : "Output:",
		"description" : "<h3>Heap sorting: retrieving numbers in sort order</h3><p>We swap with the smallest child which is 26.</p>"
	},
	//now swap them
	{
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [-1, 44, -1, 54, 77, 93, 31, -1, -1, -1, -1, -1, -1, -1, -1],
		"treeValues" : [-1, 44, -1, 54, 77, 93, 31, -1],
		"treeLabels" : ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
		"treeHighlights" : [],
		"arrayHighlights" : [],
		"auxArrayValues" : [9, 18],
		"auxArrayHighlights" : [1],
		"auxLabel" : "Output:",
		"description" : "<h3>Heap sorting: retrieving numbers in sort order</h3>",
		"swap" : {
			"first" : 0,
			"second" : 2
		},
		"refresh" : {
			"arrayValues" : [26, 44, 55, 54, 77, 93, 31, -1, -1, -1, -1, -1, -1, -1, -1],
			"treeValues" : [26, 44, 55, 54, 77, 93, 31, -1],
		}
	},
	//now move on to 55 and 31
	{
		"audio" : "data/audio/m269_heapsort_29.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [26, 44, 55, 54, 77, 93, 31, -1, -1, -1, -1, -1, -1, -1, -1],
		"treeValues" : [26, 44, 55, 54, 77, 93, 31, -1],
		"treeLabels" : ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
		"treeHighlights" : [{
			"index" : 2,
			"color" : "red"
		}, {
			"index" : 6,
			"color" : "yellow"
		}],
		"arrayHighlights" : [{
			"index" : 2,
			"color" : "red"
		}, {
			"index" : 6,
			"color" : "yellow"
		}],
		"auxArrayValues" : [9, 18],
		"auxArrayHighlights" : [1],
		"auxLabel" : "Output:",
		"description" : "<h3>Heap sorting: retrieving numbers in sort order</h3><p>Apply the rule again if necessary ...</p>",
	},
	//now swap 55 and 31
	{
		"audio" : "data/audio/m269_heapsort_30.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [26, 44, 55, 54, 77, 93, 31, -1, -1, -1, -1, -1, -1, -1, -1],
		"treeValues" : [26, 44, 55, 54, 77, 93, 31, -1],
		"treeLabels" : ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
		"treeHighlights" : [],
		"arrayHighlights" : [],
		"auxArrayValues" : [9, 18],
		"auxArrayHighlights" : [1],
		"auxLabel" : "Output:",
		"description" : "<h3>Heap sorting: retrieving numbers in sort order</h3><p>... this time between 55 and its child 31 ...</p>",
		"refresh" : {
			"arrayValues" : [26, 44, 31, 54, 77, 93, 55, -1, -1, -1, -1, -1, -1, -1, -1],
			"treeValues" : [26, 44, 31, 54, 77, 93, 55, -1]
		}
	},
	//narration continues
	{
		"audio" : "data/audio/m269_heapsort_31.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [26, 44, 31, 54, 77, 93, 55, -1, -1, -1, -1, -1, -1, -1, -1],
		"treeValues" : [26, 44, 31, 54, 77, 93, 55, -1],
		"treeLabels" : ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
		"treeHighlights" : [],
		"arrayHighlights" : [],
		"auxArrayValues" : [9, 18],
		"auxArrayHighlights" : [1],
		"auxLabel" : "Output:",
		"description" : "<h3>Heap sorting: retrieving numbers in sort order</h3><p>... until the heap is again ordered.</p>"
	},
	//speeding up now: snapshots for remaining: 26
	{
		"audio" : "data/audio/m269_heapsort_32.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"treeValues" : [55, 44, 31, 54, 77, 93],
		"arrayValues" : [55, 44, 31, 54, 77, 93, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"treeLabels" : ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
		"treeHighlights" : [],
		"arrayHighlights" : [],
		"auxArrayValues" : [9, 18, 26],
		"auxArrayHighlights" : [2],
		"auxLabel" : "Output:",
		"description" : "<h3>Heap sorting: retrieving numbers in sort order</h3><p>This process of removing and heapifying continues until the heap is empty. We quickly move through the remaining steps.</p>"
	},
	//31
	{
		"clearArray" : true,
		"clearTree" : true,
		"treeValues" : [93, 44, 55, 54, 77],
		"arrayValues" : [93, 44, 55, 54, 77, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"treeLabels" : ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
		"treeHighlights" : [],
		"arrayHighlights" : [],
		"auxArrayValues" : [9, 18, 26, 31],
		"auxArrayHighlights" : [3],
		"auxLabel" : "Output:",
		"description" : "<h3>Heap sorting: retrieving numbers in sort order</h3>"
	},
	//44
	{
		"clearArray" : true,
		"clearTree" : true,
		"treeValues" : [54, 55, 93, 77],
		"arrayValues" : [54, 55, 93, 77, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"treeLabels" : ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
		"treeHighlights" : [],
		"arrayHighlights" : [],
		"auxArrayValues" : [9, 18, 26, 31, 44],
		"auxArrayHighlights" : [4],
		"auxLabel" : "Output:",
		"description" : "<h3>Heap sorting: retrieving numbers in sort order</h3>"				
	},
	//54
	{
		"clearArray" : true,
		"clearTree" : true,
		"treeValues" : [55, 93, 77],
		"arrayValues" : [55, 93, 77, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"treeLabels" : ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
		"treeHighlights" : [],
		"arrayHighlights" : [],
		"auxArrayValues" : [9, 18, 26, 31, 44, 54],
		"auxArrayHighlights" : [5],
		"auxLabel" : "Output:",
		"description" : "<h3>Heap sorting: retrieving numbers in sort order</h3>"				
	},
	//55
	{
		"clearArray" : true,
		"clearTree" : true,
		"treeValues" : [77, 93],
		"arrayValues" : [77, 93, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"treeLabels" : ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
		"treeHighlights" : [],
		"arrayHighlights" : [],
		"auxArrayValues" : [9, 18, 26, 31, 44, 54, 55],
		"auxArrayHighlights" : [6],
		"auxLabel" : "Output:",
		"description" : "<h3>Heap sorting: retrieving numbers in sort order</h3>"						
	},
	//77
	{
		"clearArray" : true,
		"clearTree" : true,
		"treeValues" : [93],
		"arrayValues" : [93, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"treeLabels" : ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
		"treeHighlights" : [],
		"arrayHighlights" : [],
		"auxArrayValues" : [9, 18, 26, 31, 44, 54, 55, 77],
		"auxArrayHighlights" : [7],
		"auxLabel" : "Output:",
		"description" : "<h3>Heap sorting: retrieving numbers in sort order</h3>"
	},
	//93
	{
		"clearArray" : true,
		"clearTree" : true,
		"treeValues" : [],
		"arrayValues" : [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"treeLabels" : ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
		"treeHighlights" : [],
		"arrayHighlights" : [],
		"auxArrayValues" : [9, 18, 26, 31, 44, 54, 55, 77, 93],
		"auxArrayHighlights" : [8],
		"auxLabel" : "Output:",
		"description" : "<h3>Heap sorting: retrieving numbers in sort order</h3><p>This results in an output list with the items from the heap in sorted order.</p>"		
	},	
	//script error
	//learning outcomes
	{
		"clearArray" : true,
		"clearTree" : true,
		"treeValues" : [],
		"arrayValues" : [],
		"treelabels" : [],
		"treeHighlights" : [],
		"description" : "<h3>Summary</h3><ul><li>You have seen it is possible to represent a heap as a list.</li><li>As a virtue of the heap order property, the root is always the smallest item.</li><li>By repeatedly removing the smallest item and heapifying,  it is possible to create, item by item, a sorted list.</li></ul>"
	},
	//learning outcomes
	{
		"clearArray" : true,
		"clearTree" : true,
		"treeValues" : [],
		"arrayValues" : [],
		"treelabels" : [],
		"treeHighlights" : [],
		"description" : "<h3>The end</h3>"
	}]
}
