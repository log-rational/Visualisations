data = {
	"title" : "<h2>Building binary search trees</h2>",
	"info" : "<h2>Information</h2><ul><li>Click Next to go to the next step.</li><li>Click Previous to go to the preceding step.</li><li>Select Reset to go back to the start of the visualisation. The steps will vary depending on whether the Random checkbox is checked.</li><li>Toggle Random to select the main script or one based on randomised input.</li><li>Press Audio to toggle audio narration on or off. Note that no audio is available for randomised input.</li></ul>",
	"orderingProperty" : true,
	"forceLandscape" : true,
	"startOffset" : 0,
	"steps" : [
	//0
	{
		"audio" : "data/media/m269_search-trees_01.mp3",
		"clearTree" : true,
		"arrayValues" : [5, 2, 7, 8, 3, 1, 4, 6],
		"treeValues" : [5, 2, 7, 8, 3, 1, 4, 6],
		"description" : "<p>In this visualisation you will see how a list of unique numbers can be transformed into a binary search tree.</p>"
	},
	//1
	{
		"audio" : "data/media/m269_search-trees_02.mp3",
		"clearTree" : true,
		"arrayValues" : [5, 2, 7, 8, 3, 1, 4, 6],
		"treeValues" : [],
		"description" : "<p>Notice that these numbers are in no particular order. The process of building the tree will introduce order to them. In particular we’re going to make sure that the tree satisfies the Binary Search Tree ordering property.</p><p>You must also realise that we are using numbers here for simplicity, but we could use anything for which we can define a greater or less than operation. For example a word can be stored in a binary tree because it can come either before or after another word in the dictionary.</p>"
	},
	//2
	{
		"audio" : "data/media/m269_search-trees_03.mp3",
		"description" : "<p>Initially we start with an empty tree and add the first element 5. The tree is empty so we make a tree node containing 5. This is the root.</p>",
		"clearTree" : true,
		"treeLabels" : ["Root"],
		"arrayValues" : [5, 2, 7, 8, 3, 1, 4, 6],
		"treeValues" : [],
		"arrayHighlights" : [{
			"index" : 0,
			"color" : "red"
		}],
		"rootAnimation" : 0,
		"push" : [0]
	},
	//3
	{
		"audio" : "data/media/m269_search-trees_04.mp3",
		"arrayValues" : [5, 2, 7, 8, 3, 1, 4, 6],
		"treeValues" : [5],
		"description" : "<p>The next number in the list is 2. We go to the root of the tree and find it’s occupied and has the number 5 in it.</p><p>Now, we need to make sure that the new tree satisfies the Binary Search Tree ordering property: in particular all the keys in the left subtree of a node should be less than the node’s key, and all the keys in the right subtree should be greater than the node’s key.</p><p>We test and find 2 is less than 5, so we put 2 in the left subtree.</p>",
		"treeLabels" : [],
		"arrayHighlights" : [{
			"index" : 1,
			"color" : "red"
		}],
		"rootAnimation" : 1,
	},
	//4
	{
		"audio" : "data/media/m269_search-trees_05.mp3",
		"arrayValues" : [5, 2, 7, 8, 3, 1, 4, 6],
		"treeValues" : [5],
		"description" : "<p>The left tree of 5 is empty, so we add 2 there.</p>",
		"animation" : {
			"arrayIndex" : 1,
			"treeIndex" : 0
		},
		"push" : [1],
		"arrayHighlights" : [{
			"index" : 1,
			"color" : "red"
		}]
	},
	//5
	{
		"audio" : "data/media/m269_search-trees_06.mp3",
		"clearTree" : true,
		"arrayValues" : [5, 2, 7, 8, 3, 1, 4, 6],
		"treeValues" : [5, 2],
		"description" : "<p>Next, 7 is in the list. We check the root and find it’s not empty. So we test to see if 7 is greater than 5.</p><p>It is, and as 5's right subtree child is empty we add 7 below 5.</p><p>You might ask yourself what happens if we add 5? It is neither less than or greater than 5 so there is nowhere in a binary search tree to hold it. For this reason we can’t hold duplicate values in a binary search tree.</p>",
		"arrayHighlights" : [{
			"index" : 2,
			"color" : "red"
		}],
		"rootAnimation" : 2
	},
	//6
	{
		"audio" : "data/media/m269_search-trees_07.mp3",
		"clearTree" : true,
		"arrayValues" : [5, 2, 7, 8, 3, 1, 4, 6],
		"treeValues" : [5, 2],
		"treeLabels" : [],
		"description" : "<p>We now can see the various items. The root 5 is the parent of 2 and 7. Equally 2 and 7 are children to 5. Notice this is relative: 7 and 2 can become parents of their own children.</p>",
		"animation" : {
			"arrayIndex" : 2,
			"treeIndex" : 0
		},
		"push" : [2],
		"arrayHighlights" : [{
			"index" : 2,
			"color" : "red"
		}]
	},
	//7
	{
		"audio" : "data/media/m269_search-trees_08.mp3",
		"clearTree" : true,
		"arrayValues" : [5, 2, 7, 8, 3, 1, 4, 6],
		"treeValues" : [5, 2, 7],
		"treeLabels" : ["Parent", "Less-than", "Greater-than"],
		"description" : "<p>Also notice that 2 is the less-than child or left child, and that 7 is the right or greater-than child.</p><p>Let’s continue adding the other items.</p>",
		"arrayHighlights" : [{
			"index" : 2,
			"color" : "red"
		}]
	},
	//9
	{
		"audio" : "data/media/m269_search-trees_09.mp3",
		"clearTree" : true,
		"arrayValues" : [5, 2, 7, 8, 3, 1, 4, 6],
		"treeValues" : [5, 2, 7],
		"treeLabels" : [],
		"description" : "<p>Next we consider adding 8. It gets compared to the root.</p><p>8 is greater 5, so it has to end up in the right subtree. There we find 7.</p>",
		"arrayHighlights" : [{
			"index" : 3,
			"color" : "red"
		}],
		"rootAnimation" : 3
	},
	//10
	{
		"audio" : "data/media/m269_search-trees_10.mp3",
		"clearTree" : true,
		"arrayValues" : [5, 2, 7, 8, 3, 1, 4, 6],
		"treeValues" : [5, 2, 7],
		"treeLabels" : [],
		"description" : "<p>Checking 8 against 7, we find that 8 is bigger than 7. We check 7’s right subtree and find it’s empty.</p>",
		"arrayHighlights" : [{
			"index" : 3,
			"color" : "red"
		}],
		"animation" : {
			"arrayIndex" : 3,
			"treeIndex" : 0
		}
	},
	//11
	{
		"audio" : "data/media/m269_search-trees_11.mp3",
		"clearTree" : true,
		"arrayValues" : [5, 2, 7, 8, 3, 1, 4, 6],
		"treeValues" : [5, 2, 7],
		"treeLabels" : [],
		"description" : "<p>So a new child node is created there with the value of 8.</p>",
		"arrayHighlights" : [{
			"index" : 3,
			"color" : "red"
		}],
		"animation" : {
			"arrayIndex" : 3,
			"treeIndex" : 2
		},
		"push" : [3]
	},
	//12
	{
		"audio" : "data/media/m269_search-trees_12.mp3",
		"clearTree" : true,
		"clearArray" : true,
		"arrayValues" : [5, 2, 7, 8, 3, 1, 4, 6],
		"treeValues" : [5, 2, 7, 8],
		"treeLabels" : ["", "", "", ""],
		"description" : "<p>This is repeated for all the items in the list. The final tree emerges as follows.</p>",
		"arrayHighlights" : []
	},
	//13
	{
		"clearTree" : true,
		"clearArray" : true,
		"arrayValues" : [5, 2, 7, 8, 3, 1, 4, 6],
		"treeValues" : [5, 2, 7, 8],
		"treeLabels" : ["3 < 5", "3 > 2", ""],
		"description" : "",
		"arrayHighlights" : [{
			"index" : 4,
			"color" : "red"
		}],
		"push" : [4]
	},
	//14
	{
		"clearTree" : true,
		"arrayValues" : [5, 2, 7, 8, 3, 1, 4, 6],
		"treeValues" : [5, 2, 7, 8, 3],
		"treeLabels" : ["1 < 5", "1 < 2", ""],
		"description" : "",
		"arrayHighlights" : [{
			"index" : 5,
			"color" : "red"
		}],
		"push" : [5]
	},
	//15
	{
		"clearTree" : true,
		"clearArray" : true,
		"arrayValues" : [5, 2, 7, 8, 3, 1, 4, 6],
		"treeValues" : [5, 2, 7, 8, 3, 1],
		"treeLabels" : ["4 < 5", "4 > 2", "", "", "4 > 3"],
		"description" : "",
		"arrayHighlights" : [{
			"index" : 6,
			"color" : "red"
		}],
		"push" : [6]
	},
	//16
	{
		"clearTree" : true,
		"clearArray" : true,
		"arrayValues" : [5, 2, 7, 8, 3, 1, 4, 6],
		"treeValues" : [5, 2, 7, 8, 3, 1, 4],
		"treeLabels" : ["6 > 5", "", "6 < 7"],
		"description" : "",
		"arrayHighlights" : [{
			"index" : 7,
			"color" : "red"
		}],
		"push" : [7]
	},
	//16.5
	{
		"audio" : "data/media/m269_search-trees_13.mp3",
		"clearTree" : true,
		"clearArray" : true,
		"arrayValues" : [5, 2, 7, 8, 3, 1, 4, 6],
		"treeValues" : [5, 2, 7, 8, 3, 1, 4, 6],
		"treeLabels" : [],
		"description" : "We end up with a tree that conforms to the Binary Search Tree ordering property.</p>",
		"arrayHighlights" : []
	},

	//17
	{
		"audio" : "data/media/m269_search-trees_14.mp3",
		"clearTree" : true,
		"clearArray" : true,
		"arrayValues" : [5, 2, 7, 8, 3, 1, 4, 6],
		"treeValues" : [5, 2, 7, 8, 3, 1, 4, 6],
		"treeLabels" : [],
		"description" : "<h3>Summary</h3><p>In this visualisation you have seen how a list of numbers can be converted to a Binary Search Tree.</p>"
	},
	//18
	{
		"clearTree" : true,
		"clearArray" : true,
		"arrayValues" : [5, 2, 7, 8, 3, 1, 4, 6],
		"treeValues" : [5, 2, 7, 8, 3, 1, 4, 6],
		"treeLabels" : [],
		"description" : "<h3/><p>This concludes the visualisation.</p>"
	}]
}
