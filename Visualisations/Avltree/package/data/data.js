data = {
	"title" : "<h2>Rebalancing an AVL tree</h2>",
	"info" : "<h2>Information</h2><ul><li>Click Next to go to the next step.</li><li>Click Previous to go to the preceding step.</li><li>Select Reset to go back to the start of the visualisation. The steps will vary depending on whether the Random checkbox is checked.</li><li>Toggle Random to select the main script or one based on randomised input.</li><li>Press Audio to toggle audio narration on or off. Note that no audio is available for randomised input.</li></ul>",
	"startOffset" : 0,
	"orderingProperty" : true,
	"forcePortrait" : false,
	"forceLandscape" : true,
	"defaultValues" : [50, 20, 70, 10, 30, 60, 80],
	"steps" : [
	//0
	{
		"audio" : "data/audio/avltree-audio-001.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [50, 20, 70, 10, 30, 60, 80],
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"treeHighlights" : [],
		"treeLabels" : ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		"description" : "<p>In this visualisation we will look at what happens when good binary search trees go wrong, and how this can be automatically adjusted by using balancing.</p><p>As mentioned in the unit, balanced trees can be searched most efficiently.</p>"
	},
	//1
	{
		"audio" : "data/audio/avltree-audio-002.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [50, 20, 70, 10, 30, 60, 80],
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"description" : "<p>For some orderings, such as the one on the right-hand side, we get a balanced tree like this one. When it comes to searching, a balanced tree such as this one is most efficient.</p>"
	},
	//2
	{
		"audio" : "data/audio/avltree-audio-003.mp3",		
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [10, 20, 30, 50, 60, 70, 80],
		"treeValues" : [10, 20, 30, 50, 60, 70, 80],
		"treeFade" : true,
		"description" : "<p>However, if the elements are ordered, as shown here, we get a highly unbalanced tree. This wouldn't be more efficient to search than a simple list. For many other orderings, we get something which is in between the extremes of a fully balanced and a highly unbalanced tree.</p><p>To deal with this, Adelson-Velskii and Landis invented a way to keep a tree balanced.</p>"
	},
	//3
	{
		"audio" : "data/audio/avltree-audio-004.mp3",

		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [],
		"treeValues" : [],
		"description" : "<p>The term AVL comes from their initials: AV and L.</p>"
	},
	//4
	{
		"audio" : "data/audio/avltree-audio-005.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [50, 20, 70, 60, 80, 90],
		"treeValues" : [50, 20, 70, 60, 80, 90],
		"description" : "<p>The aim of  AVL is to keep the tree balanced and to do that we rotate it whenever it becomes unbalanced. Let’s begin with this unbalanced tree.</p>"
	},
	//5
	{
		"audio" : "data/audio/avltree-audio-006.mp3",		
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [50, 20, 70, 60, 80, 90],
		"treeValues" : [50, 20, 70, 60, 80, 90],
		"description" : "<p>By rotating the tree anticlockwise, 70 ends up as the root node. The tree has been rebalanced.</p>",
		"rotateLeft" : true,
		"rotateHighlights" : [2, 5],
		"refresh" : {
			"arrayValues" : [70, 50, 80, 20, 60, 90],
			"treeValues" : [70, 50, 80, 20, 60, 90]
		}
	},
	//6
	{
		"audio" : "data/audio/avltree-audio-007.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [70, 50, 80, 20, 60, 90],
		"treeValues" : [70, 50, 80, 20, 60, 90],
		"treeLabels" : ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		"treeHighlights" : [],
		"description" : "<p>When a tree is balanced it can be searched more efficiently.</p>"
	},
	//7
	{
		"audio" : "data/audio/avltree-audio-008.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [50, 20, 70, 60, 80, 90],
		"treeValues" : [50, 20, 70, 60, 80, 90],
		"treeHighlights" : [{
			index : 14,
			color : "yellow"
		}],
		"treeLabels" : ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "0"],
		"description" : "<p>To determine whether a tree is balanced, we calculate the balance factor bf as follows:</p><p>bf = height(left) – height(right)</p><p>A tree is balanced if no node has a balance factor outside the range –1, 0 or +1.</p><p>Let’s begin with node 90. There are no children, so the heights of the left and right subtrees are 0 and 0. So, the balance factor is 0 – 0, which equals 0.</p>"
		//"caption" : "<p>bf = height(left) – height(right)"
	},
	//8
	{
		"audio" : "data/audio/avltree-audio-009.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [50, 20, 70, 60, 80, 90],
		"treeValues" : [50, 20, 70, 60, 80, 90],
		"treeHighlights" : [{
			index : 6,
			color : "yellow"
		}],
		"treeLabels" : ["", "", "", "", "", "", "–1", "", "", "", "", "", "", "", "0"],
		"description" : "<p>For 80 the left subtree has a height of 0 and the right subtree height of 1,  so bf = 0 – 1 = –1.</p>"
		//"caption" : "<p>bf = height(left) – height(right)"
	},
	//9
	{
		"audio" : "data/audio/avltree-audio-010.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [50, 20, 70, 60, 80, 90],
		"treeValues" : [50, 20, 70, 60, 80, 90],
		"treeHighlights" : [{
			index : 2,
			color : "yellow"
		}],
		"treeLabels" : ["", "", "–1", "", "", "", "–1", "", "", "", "", "", "", "", "0"],
		"description" : "<p>For 70, the height of its left subtree is 1 and the right subtree is 2. So the balance factor is –1.</p>"
		//"caption" : "<p>bf = height(left) – height(right)"
	},
	//10
	{
		"audio" : "data/audio/avltree-audio-011.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [50, 20, 70, 60, 80, 90],
		"treeValues" : [50, 20, 70, 60, 80, 90],
		"treeHighlights" : [{
			index : 0,
			color : "yellow"
		}],
		"treeLabels" : ["–2", "", "–1", "", "", "", "–1", "", "", "", "", "", "", "", "0"],
		"description" : "<p>50’s left subtree has height 1 and its right subtree has height 3 so the balance factor is –2.</p>"
		//"caption" : "<p>bf = height(left) – height(right)"
	},
	//11
	{
		"audio" : "data/audio/avltree-audio-012.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [50, 20, 70, 60, 80, 90],
		"treeValues" : [50, 20, 70, 60, 80, 90],
		"treeHighlights" : [{
			index : 1,
			color : "yellow"
		}, {
			index : 5,
			color : "yellow"
		}, {
			index : 14,
			color : "yellow"
		}],
		//"treeLabels" : ["–2", "0", "–1", "", "", "0", "–1", "", "", "", "", "", "", "", "0"],
		"calculateBalanceFactor" : true,
		"description" : "<p>The other child nodes, 20, 60 and 90, have balance factors of 0.</p><p>Now we have calculated the balance factors for all of the nodes. This allows us to determine whether the tree is out of balance. If a node has a balance factor of –2 or less, a left rotation is required. If a node has a balance factor of 2 or more, a right rotation is required.</p>"
		//"caption" : "<p>bf = height(left) – height(right)"
	},
	//type 1 #1 - 12
	{
		"audio" : "data/audio/avltree-audio-013.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [50, 70, 80],
		"treeValues" : [50, 70, 80],
		"treeLabels" : ["–2", "", "–1", "", "", "", "0"],
		"treeHighlights" : [],
		"description" : "<h3>Balance left</h3><p>In practice there are four types of rotation. Let’s start with the simple tree below.</p><p>In this case we rotate to the left: 70 becomes the new root and 50 becomes the left child of 70.</p>"
	},
	//type 1 #2 - 13
	{
		"audio" : "data/audio/avltree-audio-014.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [50, 70, 80],
		"treeValues" : [50, 70, 80],
		"treeLabels" : ["–2", "", "–1", "", "", "", "0"],
		"description" : "<h3>Balance left</h3>",
		"rotateLeft" : true,
		"rotateHighlights" : [],
		"refresh" : {
			"arrayValues" : [70, 50, 80],
			"treeValues" : [70, 50, 80]
		}
	},
	//type 1 #3 - 14
	{
		"audio" : "data/audio/avltree-audio-015.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [70, 50, 80],
		"treeValues" : [70, 50, 80],
		"calculateBalanceFactor" : true,
		"description" : "<h3>Balance left</h3><p>This is quite simple.</p>"
	},
	//type 2 #1 - 15
	{
		"audio" : "data/audio/avltree-audio-016.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [80, 70, 50],
		"treeValues" : [80, 70, 50],
		"calculateBalanceFactor" : true,
		"treeHighlights" : [],
		"description" : "<h3>Balance right</h3><p>The next example needs to be rotated right.</p>"
	},
	//type 2 #2 - 16
	{
		"audio" : "data/audio/avltree-audio-017.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [80, 70, 50],
		"treeValues" : [80, 70, 50],
		"description" : "<h3>Balance right</h3>",
		"rotateRight" : true,
		"rotateHighlights" : [],
		"refresh" : {
			"arrayValues" : [70, 50, 80],
			"treeValues" : [70, 50, 80]
		}
	},
	//type 2 #3 - 17
	{
		"audio" : "data/audio/avltree-audio-018.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [70, 50, 80],
		"treeValues" : [70, 50, 80],
		"calculateBalanceFactor" : true,
		"description" : "<h3>Balance right</h3><p>By rotating right the tree ends up being balanced.</p>"
	},
	//type 3 #1 - 18
	{
		"audio" : "data/audio/avltree-audio-019.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [80, 60, 90, 50, 70, 20],
		"treeValues" : [80, 60, 90, 50, 70, 20],
		"calculateBalanceFactor" : true,
		"description" : "<h3>Balance right</h3><p>The next two types of rotation are more complex. For the current tree, we need to rotate right or clockwise, because the balance factor of the root node 80 is 2: 60 will become the new root,  with 80 as its right child and 50 as its left child. This raises a problem. What happens to 70? The solution is to detach it from 60 and make it the left child of 80.  You can see that since 70 is greater than 60 but less than 80 this meets the binary search tree property as required.</p>"
	},
	//type 3 #2 - 19
	{
		"audio" : "data/audio/avltree-audio-020.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [80, 60, 90, 50, 70, 20],
		"treeValues" : [80, 60, 90, 50, 70, 20],
		"rotateRight" : true,
		"description" : "<h3>Balance right</h3>",
		"refresh" : {
			"arrayValues" : [60, 50, 80, 20, 70, 90],
			"treeValues" : [60, 50, 80, 20, 70, 90]
		}
	},
	//type 3 #3 - 20
	{
		"audio" : "data/audio/avltree-audio-021.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [60, 50, 80, 20, 70, 90],
		"treeValues" : [60, 50, 80, 20, 70, 90],
		"calculateBalanceFactor" : true,
		"description" : "<h3>Balance right</h3><p>After this more complex rotation, the tree is balanced again.</p>"
	},
	//type 4 #1 - 21
	{
		"audio" : "data/audio/avltree-audio-022.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [50, 20, 70, 60, 80, 90],
		"treeValues" : [50, 20, 70, 60, 80, 90],
		"calculateBalanceFactor" : true,
		"description" : "<h3>Balance left</h3><p>Let’s now look at the other left or anticlockwise rotation. For the current tree, we need to rotate left or anticlockwise, because the balance factor of the root node 50 is –2: 70 will become the new root note. When 70 becomes the root we have to find somewhere to attach 60 and so we detach it from 70 and it becomes a new right child of 50.</p>"
	},
	//type 4 #2 - 22
	{
		"audio" : "data/audio/avltree-audio-023.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [50, 20, 70, 60, 80, 90],
		"treeValues" : [50, 20, 70, 60, 80, 90],
		"rotateLeft" : true,
		"rotateHighlights" : [2, 5],
		"description" : "<h3>Balance left</h3",
		"refresh" : {
			"arrayValues" : [70, 50, 80, 20, 60, 90],
			"treeValues" : [70, 50, 80, 20, 60, 90]
		}
	},
	//type 4 #3 - 23
	{
		"audio" : "data/audio/avltree-audio-024.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [70, 50, 80, 20, 60, 90],
		"treeValues" : [70, 50, 80, 20, 60, 90],
		"calculateBalanceFactor" : true,
		"description" : "<h3>Balance left</h3><p>Again, after the rotation, the tree is balanced.</p>"
	},
	//learning outcomes - 24
	{
		"audio" : "data/audio/avltree-audio-025.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [],//[70, 50, 80, 20, 60, 90],
		"treeValues" : [],//[70, 50, 80, 20, 60, 90],
		"calculateBalanceFactor" : true,
		"treeHighlights" : [],
		"treeLabels" : [],
		"description" : "<h3>Summary</h3><p>The goal of an AVL tree is to remain balanced at all times. AVL trees are implemented so that whenever a new node is added (or deleted) the balance factors of the nodes in the tree are calculated and if necessary one or more rotations of the kind we have demonstrated are used to bring the tree back into balance. AVL trees are self-balancing.</p>"
	},
	//the end - 25
	{
		"audio" : "data/audio/avltree-audio-26.mp3",
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [],//[70, 50, 80, 20, 60, 90],
		"treeValues" : [],//[70, 50, 80, 20, 60, 90],
		"calculateBalanceFactor" : true,
		"treeHighlights" : [],
		"treeLabels" : [],
		"description" : "<h3></h3><p>This concludes the visualisation.</p>"
	}],
	//scripts (like the steps above) assume that rotation is node1=>node0 or node2=>node0
	"rotateLeftMapping" : {
		0 : 1,
		1 : 3,
		2 : 0,
		3 : 7,
		4 : 8,
		5 : -4, //negative, so detach
		6 : 2,
		7 : 999, //out of range
		8 : 999,
		9 : 999,
		10 : 999,
		11 : -9,
		12 : -10,
		13 : 5,
		14 : 6
	},
	"rotateRightMapping" : {
		0 : 2,
		1 : 0,
		2 : 6,
		3 : 1,
		4 : -5,
		5 : 13,
		6 : 14,
		7 : 3,
		8 : 4,
		9 : -1,
		10 : -1,
		11 : 999,
		12 : 999,
		13 : 999,
		14 : 999
	}
};
