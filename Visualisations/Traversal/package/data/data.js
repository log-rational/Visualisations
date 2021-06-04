data = {
	"title" : "<h2>Binary tree traversal: pre-order, post-order, in-order</h2>",
	"info" : "<h2>Information</h2><p>This screen shows detailed help for the activity. It could explain technical terms or clarify areas in which the simulation simplifies the process of building binary trees.</p>",
	"orderingProperty" : true,
	"forcePortrait" : true,
	"steps" : [{
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [10, 20, 30, 50, 60, 70, 80],
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"treeHighlights" : [],
		"treeLabels" : ["", "", ""],
		"description" : "<h3>Introduction</h3><p>In this visualisation we are going to look at binary trees and how to traverse them, visiting all the items.</p>"
	}, {
		"clearArray" : true,
		"clearTree" : true,
		"arrayValues" : [10, 20, 30, 50, 60, 70, 80],
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"treeHighlights" : [0, 1, 2],
		"treeLabels" : ["Root", "Less-than child", "Greater-than child"],
		"description" : "<h3>Binary search tree ordering property</h3><p>We will look at the special case of a binary search tree. In a binary search tree, all items are stored such that the Binary Search Tree ordering property holds: all the keys in the left subtree of a node should be less than the node’s key, and all the keys in the right subtree should be greater than or equal to the node’s key.</p><p>For example 20 is less than 50 and 70 is greater than 50.</p>"
	}, //pre-order
	{
		"arrayValues" : [],
		"treeHighlights" : [0],
		"treeLabels" : [],
		"description" : "<h3>Pre-order</h3><p>Let's begin with a preorder traversal.</p><p>To traverse a tree in preorder you begin at the root of the tree. At this point we don’t yet print the item; we look at the children first.</p><p>For preorder we look at the left subtree first.</p><p>So beginning at the root 50 we move to the node with key 20.</p>"
	}, {
		"arrayValues" : [],
		"treeHighlights" : [1],
		"treeLabels" : [],
		"description" : "<h3>Pre-order</h3><p>The node 20 also has children so the algorithm moves to its left child.</p>"
	}, {
		"clearArray" : true,
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [-1, -1, -1, -1, -1, -1, -1],
		"treeHighlights" : [3],
		"description" : "<h3>Pre-order</h3><p>We reach the node with key 10. Node 10 has no left children so it gets printed. You can see the values printed below the tree.</p>",
		"animation" : {
			"treeIndex" : 3,
			"arrayIndex" : 0,
			"arrayToTree" : false
		},
		"push" : {
			"values" : [3],
			"offset" : 0
		}
	}, {
		"clearArray" : true,
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [10, -1, -1, -1, -1, -1, -1],
		"treeHighlights" : [1],
		"description" : "<h3>Pre-order</h3><p>Node 10 has no children so the program moves back to the parent which is 20. Once the left node has been processed we can print the value.</p>",
		"animation" : {
			"treeIndex" : 1,
			"arrayIndex" : 1,
			"arrayToTree" : false
		},
		"push" : {
			"values" : [1],
			"offset" : 1
		}
	}, {
		"clearArray" : true,
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [10, 20, -1, -1, -1, -1, -1],
		"treeHighlights" : [1],
		"description" : "<h3>Pre-order</h3><p>Once we have processed the node we can proceed to the right child.</p>",
	}, {
		"clearArray" : true,
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [10, 20, -1, -1, -1, -1, -1],
		"treeHighlights" : [4],
		"description" : "<h3>Pre-order</h3><p>When we reach 30 it has no left children so we can print the node with key 30.</p>",
		"animation" : {
			"treeIndex" : 4,
			"arrayIndex" : 2,
			"arrayToTree" : false
		},
		"push" : {
			"values" : [4],
			"offset" : 2
		}
	}, {
		"clearArray" : true,
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [10, 20, 30, -1, -1, -1, -1],
		"treeHighlights" : [1],
		"description" : "<h3>Pre-order</h3><p>Node 30 has no right child so we return to the parent node 20.</p>"
	}, {
		"clearArray" : true,
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [10, 20, 30, -1, -1, -1, -1],
		"treeHighlights" : [1],
		"description" : "<h3>Pre-order</h3><p>On returning from the right child node we know the parent node 20 has already been processed so we return to its parent.</p>"
	}, {
		"clearArray" : true,
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [10, 20, 30, -1, -1, -1, -1],
		"treeHighlights" : [0],
		"description" : "<h3>Pre-order</h3><p>The left subtree for root node 50 has been processed so we can process node 50 itself.</p>",
		"animation" : {
			"treeIndex" : 0,
			"arrayIndex" : 3,
			"arrayToTree" : false
		},
		"push" : {
			"values" : [0],
			"offset" : 3
		}
	}, {
		"clearArray" : true,
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [10, 20, 50, -1, -1, -1, -1],
		"treeHighlights" : [2],
		"description" : "<h3>Pre-order</h3><p>Finally we can move to the right child of the root.</p>"
	}, {
		"clearArray" : true,
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [10, 20, 30, 50, -1, -1, -1],
		"treeHighlights" : [5],
		"description" : "<h3>Pre-order</h3><p>We continue, but now in fast forward mode.</p>"
	}, {
		"clearArray" : true,
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [10, 20, 30, 50, -1, -1, -1],
		"treeHighlights" : [5],
		"description" : "<h3>Pre-order</h3>",
		"animation" : {
			"treeIndex" : 5,
			"arrayIndex" : 4,
			"arrayToTree" : false,
			"fast" : true
		},
		"push" : {
			"values" : [5],
			"offset" : 4
		}
	}, {
		"clearArray" : true,
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [10, 20, 30, 50, 60, -1, -1],
		"treeHighlights" : [2],
		"description" : "<h3>Pre-order</h3>",
		"animation" : {
			"treeIndex" : 2,
			"arrayIndex" : 5,
			"arrayToTree" : false,
			"fast" : true
		},
		"push" : {
			"values" : [2],
			"offset" : 5
		}
	}, {
		"clearArray" : true,
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [10, 20, 30, 50, 60, 70, -1],
		"treeHighlights" : [6],
		"description" : "<h3>Pre-order</h3><p>Finally all elements are processed but the algorithm has to finish.</p>",
		"animation" : {
			"treeIndex" : 6,
			"arrayIndex" : 6,
			"arrayToTree" : false,
			"fast" : true
		},
		"push" : {
			"values" : [6],
			"offset" : 6
		}
	}, {
		"clearArray" : true,
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [10, 20, 30, 50, 60, 70, 80],
		"treeHighlights" : [2],
		"description" : "<h3>Pre-order</h3><p></p>"
	}, {
		"clearArray" : true,
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [10, 20, 30, 50, 60, 70, 80],
		"treeHighlights" : [0],
		"description" : "<h3>Pre-order</h3><p>We can see from the list below the tree that the nodes were processed in ascending order. This is as a result of the combination of preorder traversal with the Binary Search Tree ordering property. Of course, we can also apply preorder traversal to binary trees that don’t have the BST ordering property, but in that case, we can’t expect the keys to come out in numerical order.</p>"
	},
	//post-order
	{
		//"clearArray" : true,
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [],
		"treeHighlights" : [],
		"description" : "<h3>Post-order</h3><p>Now, let’s look at postorder traversal.</p>",
	}, {
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [],
		"treeHighlights" : [0],
		"description" : "<h3>Post-order</h3><p>With postorder traversal we begin at the root again. In this case we apply the rule that we move to the right child first.</p>"
	}, {
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [],
		"treeHighlights" : [2],
		"description" : "<h3>Post-order</h3><p>Node 70 has a right child so we proceed to it.</p>"
	}, {
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [-1, -1, -1, -1, -1, -1, -1],
		"treeHighlights" : [6],
		"description" : "<h3>Post-order</h3><p>Node 80 has no right child so it gets processed. It also has no left children, so we return.</p>",
		"animation" : {
			"treeIndex" : 6,
			"arrayIndex" : 0,
			"arrayToTree" : false,
			"fast" : false//true
		},
		"push" : {
			"values" : [6],
			"offset" : 0
		}
	}, {
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [80, -1, -1, -1, -1, -1, -1],
		"treeHighlights" : [2],
		"description" : "<h3>Post-order</h3><p></p><p>With its right child processed, 70 can now process itself. This is followed by visiting its left child.</p>",
		"animation" : {
			"treeIndex" : 2,
			"arrayIndex" : 1,
			"arrayToTree" : false,
			"fast" : false
		},
		"push" : {
			"values" : [2],
			"offset" : 1
		}
	}, {
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [80, 70, -1, -1, -1, -1, -1],
		"treeHighlights" : [5],
		"description" : "<h3>Post-order</h3><p>When the left child is processed we return to the parent which is node 70.</p>",
		"animation" : {
			"treeIndex" : 5,
			"arrayIndex" : 2,
			"arrayToTree" : false,
			"fast" : false
		},
		"push" : {
			"values" : [5],
			"offset" : 2
		}
	}, {
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [80, 70, 60, -1, -1, -1, -1],
		"treeHighlights" : [2],
		"description" : "<h3>Post-order</h3><p>With both the right child, the node and the left child processed we return to the parent node 50.</p>"
	}, {
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [80, 70, 60, -1, -1, -1, -1],
		"treeHighlights" : [0],
		"description" : "<h3>Post-order</h3><p>50 is now processed and the left child is visited. The algorithm continues and we will speed up.</p>",
		"animation" : {
			"treeIndex" : 0,
			"arrayIndex" : 3,
			"arrayToTree" : false,
			"fast" : true
		},
		"push" : {
			"values" : [0],
			"offset" : 3
		}
	}, {
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [80, 70, 60, 50, -1, -1, -1],
		"treeHighlights" : [1],
		"description" : "<h3>Post-order</h3><p></p>",
	}, {
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [80, 70, 60, 50, -1, -1, -1],
		"treeHighlights" : [4],
		"description" : "<h3>Post-order</h3><p></p>",
		"animation" : {
			"treeIndex" : 4,
			"arrayIndex" : 4,
			"arrayToTree" : false,
			"fast" : true
		},
		"push" : {
			"values" : [4],
			"offset" : 4
		}

	}, {
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [80, 70, 60, 50, 30, -1, -1],
		"treeHighlights" : [1],
		"description" : "<h3>Post-order</h3><p></p>",
		"animation" : {
			"treeIndex" : 1,
			"arrayIndex" : 5,
			"arrayToTree" : false,
			"fast" : true
		},
		"push" : {
			"values" : [1],
			"offset" : 5
		}

	}, {
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [80, 70, 60, 50, 30, 20, -1],
		"treeHighlights" : [3],
		"description" : "<h3>Post-order</h3><p>Notice that all the elements are in reverse order from highest to lowest and we can do this without changing the binary search tree.</p>",
		"animation" : {
			"treeIndex" : 3,
			"arrayIndex" : 6,
			"arrayToTree" : false,
			"fast" : true
		},
		"push" : {
			"values" : [3],
			"offset" : 6
		}
	}, {
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [80, 70, 60, 50, 30, 20, 10],
		"treeHighlights" : [1],
		"description" : "<h3>Post-order</h3><p></p>"
	}, {
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [80, 70, 60, 50, 30, 20, 10],
		"treeHighlights" : [0],
		"description" : "<h3>Post-order</h3><p>And by returning to the starting point we reach the end.</p>"
	}, {
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [-1, -1, -1, -1, -1, -1, -1],
		"treeHighlights" : [],
		"description" : "<h3>In-order</h3><p>Finally, we look at in-order traversal.</p>"
	}, {
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [-1, -1, -1, -1, -1, -1, -1],
		"treeHighlights" : [0],
		"description" : "<h3>In-order</h3><p>With pre-order traversal we looked left first, with post-order we looked right and with in order we start with the parent node first.</p>"
	}, {
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [-1, -1, -1, -1, -1, -1, -1],
		"treeHighlights" : [0],
		"description" : "<h3>In-order</h3><p>In this case we start with the root which is node 50 and process it.</p><p>We can then move to a child. In this version we move to the left child node 20.</p>",
		"animation" : {
			"treeIndex" : 0,
			"arrayIndex" : 0,
			"arrayToTree" : false,
			"fast" : false
		},
		"push" : {
			"values" : [0],
			"offset" : 0
		}
	}, {
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [50, -1, -1, -1, -1, -1, -1],
		"treeHighlights" : [1],
		"description" : "<h3>In-order</h3><p>Node 20 is another parent so we process it first. Then we move to its left child node 10.</p>",
		"animation" : {
			"treeIndex" : 1,
			"arrayIndex" : 1,
			"arrayToTree" : false,
			"fast" : false
		},
		"push" : {
			"values" : [1],
			"offset" : 1
		}
	}, {
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [50, 20, -1, -1, -1, -1, -1],
		"treeHighlights" : [3],
		"description" : "<h3>In-order</h3><p>Node 10 has no children. It is printed and then we move back to the parent which is node 20.</p>",
		"animation" : {
			"treeIndex" : 3,
			"arrayIndex" : 2,
			"arrayToTree" : false,
			"fast" : false
		},
		"push" : {
			"values" : [3],
			"offset" : 2
		}
	}, {
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [50, 20, 10, -1, -1, -1, -1],
		"treeHighlights" : [1],
		"description" : "<h3>In-order</h3><p>Node 20 has been processed already so we visit the right child.</p>"
	}, {
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [50, 20, 10, -1, -1, -1, -1],
		"treeHighlights" : [4],
		"description" : "<h3>In-order</h3><p>This is processed and then we move back to the parent and then back to its parent.</p>",
		"animation" : {
			"treeIndex" : 4,
			"arrayIndex" : 3,
			"arrayToTree" : false,
			"fast" : false
		},
		"push" : {
			"values" : [4],
			"offset" : 3
		}
	}, {
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [50, 20, 10, 30, -1, -1, -1],
		"treeHighlights" : [1],
		"description" : "<h3>In-order</h3><p></p>"
	}, {
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [50, 20, 10, 30, -1, -1, -1],
		"treeHighlights" : [0],
		"description" : "<h3>In-order</h3><p>Now we can visit the right subtree of the root. We will speed up slightly for the rest.</p>"
	},
	//fast from here
	{
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [50, 20, 10, 30, -1, -1, -1],
		"treeHighlights" : [2],
		"description" : "<h3>In-order</h3><p></p>",
		"animation" : {
			"treeIndex" : 2,
			"arrayIndex" : 4,
			"arrayToTree" : false,
			"fast" : true
		},
		"push" : {
			"values" : [2],
			"offset" : 4
		}
	}, {
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [50, 20, 10, 30, 70, -1, -1],
		"treeHighlights" : [2],
		"description" : "<h3>In-order</h3><p></p>",
		"animation" : {
			"treeIndex" : 5,
			"arrayIndex" : 5,
			"arrayToTree" : false,
			"fast" : true
		},
		"push" : {
			"values" : [5],
			"offset" : 5
		}
	}, {
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [50, 20, 10, 30, 70, 60, -1],
		"treeHighlights" : [2],
		"description" : "<h3>In-order</h3><p></p>"
	}, {
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [50, 20, 10, 30, 70, 60, -1],
		"treeHighlights" : [6],
		"description" : "<h3>In-order</h3><p></p>",
		"animation" : {
			"treeIndex" : 6,
			"arrayIndex" : 6,
			"arrayToTree" : false,
			"fast" : true
		},
		"push" : {
			"values" : [6],
			"offset" : 6
		}
	}, {
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [50, 20, 10, 30, 70, 60, 80],
		"treeHighlights" : [2],
		"description" : "<h3>In-order</h3><p></p>"
	}, {
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [50, 20, 10, 30, 70, 60, 80],
		"treeHighlights" : [0],
		"description" : "<h3>In-order</h3><p>Finally we return to the beginning which means the algorithm has ended. Notice that the in-order traversal doesn’t produce obvious numerical ordering of the keys.</p>"
	}, {
		"treeValues" : [50, 20, 70, 10, 30, 60, 80],
		"arrayValues" : [],
		"treeHighlights" : [],
		"description" : "<h3>Conclusion</h3><p>In this visualisation you have seen that the items of a binary tree can be traversed in pre-order (left first), post-order (right first) and in-order, or parent first.</p><p>That concludes the animation.</p>"
	}],
	//animation script
	"script" : [
	
	//pre-order
	{
		"description" : "<h3>Pre-order</h3>",
		"index" : 0,
		"push" : false
	}, {
		"description" : "<h3>Pre-order</h3>",
		"index" : 1,
		"push" : false
	}, {
		"description" : "<h3>Pre-order</h3>",
		"index" : 3,
		"push" : true
	}, {
		"description" : "<h3>Pre-order</h3>",
		"index" : 1,
		"push" : true
	}, {
		"description" : "<h3>Pre-order</h3>",
		"index" : 4,
		"push" : true
	}, {
		"description" : "<h3>Pre-order</h3>",
		"index" : 1,
		"push" : false
	}, {
		"description" : "<h3>Pre-order</h3>",
		"index" : 0,
		"push" : true
	}, {
		"description" : "<h3>Pre-order</h3>",
		"index" : 2,
		"push" : false
	}, {
		"description" : "<h3>Pre-order</h3>",
		"index" : 5,
		"push" : true
	}, {
		"description" : "<h3>Pre-order</h3>",
		"index" : 2,
		"push" : true
	}, {
		"description" : "<h3>Pre-order</h3>",
		"index" : 6,
		"push" : true
	}, {
		"description" : "<h3>Pre-order</h3>",
		"index" : 2,
		"push" : false
	}, {
		"description" : "<h3>Pre-order</h3>",
		"index" : 0,
		"push" : false
	},
	
	//post-order
	{
		"description" : "<h3>Post-order</h3>",
		"index" : 0,
		"push" : false,
		"sectionStart" : true
	}, {
		"description" : "<h3>Post-order</h3>",
		"index" : 2,
		"push" : false
	}, {
		"description" : "<h3>Post-order</h3>",
		"index" : 6,
		"push" : true
	}, {
		"description" : "<h3>Post-order</h3>",
		"index" : 2,
		"push" : true
	}, {
		"description" : "<h3>Post-order</h3>",
		"index" : 5,
		"push" : true
	}, {
		"description" : "<h3>Post-order</h3>",
		"index" : 2,
		"push" : false
	}, {
		"description" : "<h3>Post-order</h3>",
		"index" : 0,
		"push" : true
	}, {
		"description" : "<h3>Post-order</h3>",
		"index" : 1,
		"push" : false
	}, {
		"description" : "<h3>Post-order</h3>",
		"index" : 4,
		"push" : true
	}, {
		"description" : "<h3>Post-order</h3>",
		"index" : 1,
		"push" : true
	}, {
		"description" : "<h3>Post-order</h3>",
		"index" : 3,
		"push" : true
	}, {
		"description" : "<h3>Post-order</h3>",
		"index" : 1,
		"push" : false
	}, {
		"description" : "<h3>Post-order</h3>",
		"index" : 0,
		"push" : false
	},
	
	//in-order
	{
		"description" : "<h3>In-order</h3>",
		"index" : 0,
		"push" : true,
		"sectionStart" : true
	}, {
		"description" : "<h3>In-order</h3>",
		"index" : 1,
		"push" : true
	}, {
		"description" : "<h3>In-order</h3>",
		"index" : 3,
		"push" : true
	}, {
		"description" : "<h3>In-order</h3>",
		"index" : 1,
		"push" : false
	}, {
		"description" : "<h3>In-order</h3>",
		"index" : 4,
		"push" : true
	}, {
		"description" : "<h3>In-order</h3>",
		"index" : 1,
		"push" : false
	}, {
		"description" : "<h3>In-order</h3>",
		"index" : 0,
		"push" : false
	}, {
		"description" : "<h3>In-order</h3>",
		"index" : 2,
		"push" : true
	}, {
		"description" : "<h3>In-order</h3>",
		"index" : 5,
		"push" : true
	}, {
		"description" : "<h3>In-order</h3>",
		"index" : 2,
		"push" : false
	}, {
		"description" : "<h3>In-order</h3>",
		"index" : 6,
		"push" : true
	}, {
		"description" : "<h3>In-order</h3>",
		"index" : 2,
		"push" : false
	}, {
		"description" : "<h3>In-order</h3>",
		"index" : 0,
		"push" : false
	}]
};
