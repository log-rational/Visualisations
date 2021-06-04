data = {
	"title" : "<h2>Hashing and hash tables</h2>",
	"info" : "<h2>Information</h2><ul><li>Click Next to go to the next step.</li><li>Click Previous to go to the preceding step.</li><li>Select Reset to go back to the start of the visualisation. The steps will vary depending on whether the Random checkbox is checked.</li><li>Toggle Random to select the main script or one based on randomised input.</li><li>Press Audio to toggle audio narration on or off. Note that no audio is available for randomised input.</li></ul>",
	"startOffset" : 0,
	"defaultValues" : [54, 26, 93, 17, 77, 31, 44, 44, 55, 20],
	"steps" : [
	//0
	{
		"audio" : "data/audio/hashtables-audio-001.mp3",
		"clearArray" : true,
		"arrayValues" : [54, 26, 93, 17, 77, 31, 44, 55, 20],
		"hashArrayValues" : [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"arrayHighlights" : [],
		"hashArrayHighlights" : [],
		"auxArrayHighlights" : [],
		"auxLabel" : "Slots:",
		"description" : "<h3>Hashing in action</h3><p>Let’s begin with the simple case of storing some numbers in a hash table with 11 slots. Here we see the list of numbers we wish to store (54, 26, 93, etc.). Below it the hash function, using the remainder method, and at the bottom is the empty hash table.</p>"
	},
	//1
	{
		"audio" : "data/audio/hashtables-audio-002.mp3",
		"clearArray" : true,
		"valueIndex" : 0,
		"arrayValues" : [54, 26, 93, 17, 77, 31, 44, 55, 20],
		"arrayHighlights" : [{
			"index" : 0,
			"color" : "yellow"
		}],
		"hashArrayValues" : [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"auxArrayHighlights" : [],
		"auxLabel" : "",
		"description" : "<h3>Hashing in action</h3><p>Let’s start with trying to put 54 into the table.</p>"
	},
	//2
	{
		"audio" : "data/audio/hashtables-audio-003.mp3",
		"clearArray" : true,
		"valueIndex" : 0,
		"value" : 77,
		"arrayValues" : [54, 26, 93, 17, 77, 31, 44, 55, 20],
		"arrayHighlights" : [{
			"index" : 0,
			"color" : "yellow"
		}],
		"hashArrayValues" : [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"auxArrayHighlights" : [],
		"auxLabel" : "",
		"description" : "<h3>Hashing in action</h3><p>The remainder method works as follows. Given a number, it returns the remainder of when the number is integer divided by the size of the table. It is guaranteed to return a remainder that corresponds with a slot in the table. In this case, the table size is 11 and the result of the remainder method is in the range 0 to 10 inclusive.</p><!--<p>We put 54 in to the hash function. The hash function takes a number and applies the % function to it. % 11 just asks what the remainder is after dividing by 11. So 22 % 11 is 22 divided by 11, which is 2 with no remainder, so 22 % 11 is zero. Similarly, 36 % 11 is 36 divided by 11 which is 3 with remainder 3.</p><p>Using % 11 will guarantee that any non-negative number will end up between zero and 10.</p>-->"
	},
	//3
	{
		"audio" : "data/audio/hashtables-audio-004.mp3",
		"clearArray" : true,
		"valueIndex" : 0,
		"arrayValues" : [54, 26, 93, 17, 77, 31, 44, 55, 20],
		"arrayHighlights" : [{
			"index" : 0,
			"color" : "yellow"
		}],
		"hashArrayHighlights" : [{
			"index" : 10,
			"color" : "red"
		}],
		"hashArrayValues" : [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"auxArrayHighlights" : [],
		"auxLabel" : "",
		"showResult" : true,
		"description" : "<h3>Hashing in action</h3><p>In this case 54 % 11 = 10. Why so? If we integer divide 54 by 11, we get 4. Since 4 × 11 = 44, the remainder is 54 – 44, which equals 10.</p>"
	},
	//4
	{
		"audio" : "data/audio/hashtables-audio-005.mp3",
		"clearArray" : true,
		"valueIndex" : 0,
		"arrayValues" : [54, 26, 93, 17, 77, 31, 44, 55, 20],
		"arrayHighlights" : [{
			"index" : 0,
			"color" : "yellow"
		}],
		"hashArrayHighlights" : [{
			"index" : 10,
			"color" : "red"
		}],
		"addToTableIndex" : 0,
		"hashArrayValues" : [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"auxArrayHighlights" : [],
		"auxLabel" : "",
		"showResult" : true,
		"refresh" : {
			"arrayValues" : [-1, 26, 93, 17, 77, 31, 44, 55, 20],
			"hashArrayValues" : [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 54]
		},
		"description" : "<h3>Hashing in action</h3><p>So 54 is put into slot 10.</p>"
	},
	//5
	{
		"audio" : "data/audio/hashtables-audio-006.mp3",
		"clearArray" : true,
		"valueIndex" : 1,
		"arrayValues" : [-1, 26, 93, 17, 77, 31, 44, 55, 20],
		"arrayHighlights" : [{
			"index" : 1,
			"color" : "yellow"
		}],
		"hashArrayHighlights" : [{
			"index" : 4,
			"color" : "red"
		}],
		"hashArrayValues" : [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"auxArrayHighlights" : [],
		"auxLabel" : "",
		"showResult" : true,
		"description" : "<h3>Hashing in action</h3><p>Next we look at 26. 26 % 11 is 4.</p>"
	},
	//6
	{
		"audio" : "data/audio/hashtables-audio-007.mp3",
		"clearArray" : true,
		"valueIndex" : 1,
		"arrayValues" : [-1, 26, 93, 17, 77, 31, 44, 55, 20],
		"arrayHighlights" : [{
			"index" : 1,
			"color" : "yellow"
		}],
		"hashArrayHighlights" : [{
			"index" : 4,
			"color" : "red"
		}],
		"addToTableIndex" : 1,
		"hashArrayValues" : [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 54],
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"auxArrayHighlights" : [],
		"auxLabel" : "",
		"showResult" : true,
		"refresh" : {
			"arrayValues" : [-1, -1, 93, 17, 77, 31, 44, 55, 20],
			"hashArrayValues" : [-1, -1, -1, -1, 26, -1, -1, -1, -1, -1, 54]
		},
		"description" : "<h3>Hashing in action</h3><p>So 26 goes into slot 4.</p>"
	},
	//7
	{
		"audio" : "data/audio/hashtables-audio-008.mp3",
		"clearArray" : true,
		"valueIndex" : 2,
		"arrayValues" : [-1, -1, 93, 17, 77, 31, 44, 55, 20],
		"arrayHighlights" : [{
			"index" : 2,
			"color" : "yellow"
		}],
		"hashArrayHighlights" : [{
			"index" : 5,
			"color" : "red"
		}],
		"addToTableIndex" : 2,
		"hashArrayValues" : [-1, -1, -1, -1, 26, -1, -1, -1, -1, -1, 54],
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"auxArrayHighlights" : [],
		"auxLabel" : "",
		"showResult" : true,
		"refresh" : {
			"arrayValues" : [-1, -1, -1, 17, 77, 31, 44, 55, 20],
			"hashArrayValues" : [-1, -1, -1, -1, 26, 93, -1, -1, -1, -1, 54]
		},
		"description" : "<h3>Hashing in action</h3><p>Next we look at 93. This gives 5, so it goes into slot 5.</p>"
	},
	//8
	{
		"audio" : "data/audio/hashtables-audio-009.mp3",
		"clearArray" : true,
		"valueIndex" : 3,
		"arrayValues" : [-1, -1, -1, 17, 77, 31, 44, 55, 20],
		"arrayHighlights" : [{
			"index" : 3,
			"color" : "yellow"
		}],
		"hashArrayHighlights" : [{
			"index" : 6,
			"color" : "red"
		}],
		"addToTableIndex" : 3,
		"hashArrayValues" : [-1, -1, -1, -1, 26, 93, -1, -1, -1, -1, 54],
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"auxArrayHighlights" : [],
		"auxLabel" : "",
		"showResult" : true,
		"refresh" : {
			"arrayValues" : [-1, -1, -1, -1, 77, 31, 44, 55, 20],
			"hashArrayValues" : [-1, -1, -1, -1, 26, 93, 17, -1, -1, -1, 54]
		},
		"description" : "<h3>Hashing in action</h3><p>17 gives 6. So far we have been lucky and there have been no collisions.</p>"
	},
	//9
	{
		"audio" : "data/audio/hashtables-audio-010.mp3",
		"clearArray" : true,
		"valueIndex" : 4,
		"arrayValues" : [-1, -1, -1, -1, 77, 31, 44, 55, 20],
		"arrayHighlights" : [{
			"index" : 4,
			"color" : "yellow"
		}],
		"hashArrayHighlights" : [{
			"index" : 0,
			"color" : "red"
		}],
		"addToTableIndex" : 4,
		"hashArrayValues" : [-1, -1, -1, -1, 26, 93, 17, -1, -1, -1, 54],
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"auxArrayHighlights" : [],
		"auxLabel" : "",
		"showResult" : true,
		"refresh" : {
			"arrayValues" : [-1, -1, -1, -1, -1, 31, 44, 55, 20],
			"hashArrayValues" : [77, -1, -1, -1, 26, 93, 17, -1, -1, -1, 54]
		},
		"description" : "<h3>Hashing in action</h3><p>77 next. 77 % 11 is 0. So it goes in slot 0.</p>"
	},
	//10
	{
		"audio" : "data/audio/hashtables-audio-011.mp3",
		"clearArray" : true,
		"valueIndex" : 5,
		"arrayValues" : [-1, -1, -1, -1, -1, 31, 44, 55, 20],
		"hashArrayValues" : [77, -1, -1, -1, 26, 93, 17, -1, -1, -1, 54],
		"arrayHighlights" : [{
			"index" : 5,
			"color" : "yellow"
		}],
		"hashArrayHighlights" : [{
			"index" : 9,
			"color" : "red"
		}],
		"addToTableIndex" : 5,
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"auxArrayHighlights" : [],
		"auxLabel" : "",
		"showResult" : true,
		"refresh" : {
			"arrayValues" : [-1, -1, -1, -1, -1, -1, 44, 55, 20],
			"hashArrayValues" : [77, -1, -1, -1, 26, 93, 17, -1, -1, 31, 54]
		},
		"description" : "<h3>Hashing in action</h3><p>31 goes into slot 9. Let’s stop there and think about finding out whether a number is stored somewhere in the hash table.</p>"
	},
	//11
	{
		"audio" : "data/audio/hashtables-audio-012.mp3",
		"clearArray" : true,
		"arrayValues" : [-1, -1, -1, -1, -1, -1, 44, 55, 20],
		"hashArrayValues" : [77, -1, -1, -1, 26, 93, 17, -1, -1, 31, 54],
		"arrayHighlights" : [],
		"hashArrayHighlights" : [],
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"auxArrayHighlights" : [],
		"auxLabel" : "",
		"search" : 77,
		"showResult" : false,
		"description" : "<h3>Finding</h3><p>Suppose we want to see if item 77 is in the list.</p>"
	},
	//12
	{
		"audio" : "data/audio/hashtables-audio-013.mp3",
		"clearArray" : true,
		"arrayValues" : [-1, -1, -1, -1, -1, -1, 44, 55, 20],
		"hashArrayValues" : [77, -1, -1, -1, 26, 93, 17, -1, -1, 31, 54],
		"arrayHighlights" : [],
		"hashArrayHighlights" : [],
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"auxArrayHighlights" : [],
		"auxLabel" : "",
		"showResult" : true,
		"searchValue" : 77,
		"searchString" : "<span>Find: <strong>77</strong></span>",
		"showResult" : true,
		"description" : "<h3>Finding</h3><p>We use the hash for finding as well as storing. Putting 77 into the hash function returns 0, so we look in slot 0.</p>"
	},
	//13
	{
		"audio" : "data/audio/hashtables-audio-014.mp3",
		"clearArray" : true,
		"arrayValues" : [-1, -1, -1, -1, -1, -1, 44, 55, 20],
		"hashArrayValues" : [77, -1, -1, -1, 26, 93, 17, -1, -1, 31, 54],
		"arrayHighlights" : [],
		"hashArrayHighlights" : [{
			index : 0,
			color : "yellow"
		}],
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"auxArrayHighlights" : [],
		"auxLabel" : "",
		"showResult" : true,
		"searchValue" : 77,
		"searchString" : "<span>Find: <strong>77</strong></span>",
		"showResult" : true,
		"description" : "<h3>Finding</h3><p>When we look in slot 0 we find 77 there, so we return true.</p>"
	},
	//14
	{
		"audio" : "data/audio/hashtables-audio-015.mp3",
		"clearArray" : true,
		"arrayValues" : [-1, -1, -1, -1, -1, -1, 44, 55, 20],
		"hashArrayValues" : [77, -1, -1, -1, 26, 93, 17, -1, -1, 31, 54],
		"arrayHighlights" : [],
		"hashArrayHighlights" : [{
			index : 1,
			color : "yellow"
		}],
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"auxArrayHighlights" : [],
		"auxLabel" : "",
		"showResult" : true,
		"searchValue" : 12,
		"searchString" : "<span>Find: <strong>12</strong></span>",
		"showResult" : true,
		"description" : "<h3>Finding</h3><p>Let’s also try this with 12. 12 % 11 gives 1 and as slot 1 is empty we return false.</p><p>Now let’s go back to filling the hash table with the remaining numbers.</p>"
	},
	//15
	{
		"audio" : "data/audio/hashtables-audio-016.mp3",
		"clearArray" : true,
		"valueIndex" : 6,
		"arrayValues" : [-1, -1, -1, -1, -1, -1, 44, 55, 20],
		"hashArrayValues" : [77, -1, -1, -1, 26, 93, 17, -1, -1, 31, 54],
		"arrayHighlights" : [{
			"index" : 6,
			"color" : "yellow"
		}],
		"hashArrayHighlights" : [],
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"auxArrayHighlights" : [],
		"auxLabel" : "",
		"searchString" : "",
		"showResult" : false,
		"description" : "<h3>Collisions</h3><p>We are now going to add 44 to the hash table.</p>"
	},
	//16
	{
		"audio" : "data/audio/hashtables-audio-017.mp3",
		"clearArray" : true,
		"valueIndex" : 6,
		"arrayValues" : [-1, -1, -1, -1, -1, -1, 44, 55, 20],
		"hashArrayValues" : [77, -1, -1, -1, 26, 93, 17, -1, -1, 31, 54],
		"arrayHighlights" : [{
			"index" : 6,
			"color" : "yellow"
		}],
		"hashArrayHighlights" : [{
			index : 0,
			color : "red"
		}],
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"auxArrayHighlights" : [0],
		"auxLabel" : "",
		"showResult" : true,
		"description" : "<h3>Collisions</h3><p>Putting 44 into the hash function gives 0.</p><p>But slot 0 already has 77 in it. So we have a collision that needs resolving.</p>"
	},
	//17
	{
		"audio" : "data/audio/hashtables-audio-018.mp3",
		"clearArray" : true,
		"valueIndex" : 6,
		"arrayValues" : [-1, -1, -1, -1, -1, -1, 44, 55, 20],
		"hashArrayValues" : [77, -1, -1, -1, 26, 93, 17, -1, -1, 31, 54],
		"arrayHighlights" : [{
			"index" : 6,
			"color" : "yellow"
		}],
		"hashArrayHighlights" : [{
			"index" : 0,
			"color" : "rgba(255,0,0,0.3)"
		}, {
			index : 1,
			color : "red"
		}],
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"auxArrayHighlights" : [1],
		"auxLabel" : "",
		"showResult" : true,
		"description" : "<h3>Collisions</h3><p>We use the linear probing method, which involves looking sequentially for the next empty slot. This is known as an ‘open addressing technique’.</p>"
	},
	//18
	{
		"audio" : "data/audio/hashtables-audio-019.mp3",
		"clearArray" : true,
		"valueIndex" : 6,
		"arrayValues" : [-1, -1, -1, -1, -1, -1, 44, 55, 20],
		"hashArrayValues" : [77, -1, -1, -1, 26, 93, 17, -1, -1, 31, 54],
		"arrayHighlights" : [{
			"index" : 6,
			"color" : "yellow"
		}],
		"hashArrayHighlights" : [{
			"index" : 0,
			"color" : "rgba(255, 0, 0, 0.3)"
		}, {
			index : 1,
			color : "red"
		}],
		"addToTableIndex" : 6,
		"targetIndex" : 1,
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"auxArrayHighlights" : [1],
		"auxLabel" : "",
		"showResult" : true,
		"refresh" : {
			"arrayValues" : [-1, -1, -1, -1, -1, -1, -1, 55, 20],
			"hashArrayValues" : [77, 44, -1, -1, 26, 93, 17, -1, -1, 31, 54],
		},
		"description" : "<h3>Collisions</h3><p>This leaves the hash table like this.</p>"
	},
	//19
	{
		"audio" : "data/audio/hashtables-audio-020.mp3",
		"clearArray" : true,
		//"valueIndex" : 6,
		"arrayValues" : [-1, -1, -1, -1, -1, -1, -1, 55, 20],
		"hashArrayValues" : [77, 44, -1, -1, 26, 93, 17, -1, -1, 31, 54],
		"arrayHighlights" : [],
		"hashArrayHighlights" : [],
		"targetIndex" : 1,
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"auxArrayHighlights" : [],
		"auxLabel" : "",
		"showResult" : true,
		/*
		 "refresh" : {
		 "arrayValues" : [-1, -1, -1, -1, -1, -1, -1, 55, 20],
		 "hashArrayValues" : [77, 44, -1, -1, 26, 93, 17, -1, -1, 31, 54],
		 },
		 */
		"description" : "<h3>Finding with open addressing</h3><p>Let’s now think about how to find out whether an item is stored in the hash table, when we use open addressing.</p>"
	},
	//20
	{
		"audio" : "data/audio/hashtables-audio-021.mp3",
		"clearArray" : true,
		"arrayValues" : [-1, -1, -1, -1, -1, -1, -1, 55, 20],
		"hashArrayValues" : [77, 44, -1, -1, 26, 93, 17, -1, -1, 31, 54],
		"hashArrayHighlights" : [{
			index : 0,
			color : "red"
		}],
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"auxArrayHighlights" : [0],
		"auxLabel" : "",
		"showResult" : true,
		"searchValue" : 44,
		"searchString" : "<span>Find: <strong>44</strong></span>",
		"description" : "<h3>Finding with open addressing</h3><p>Let’s look to see if 44 is in the table. Putting 44 into the hash function gives 0, so we look in slot 0.</p>"
	},
	//21
	{
		"audio" : "data/audio/hashtables-audio-022.mp3",
		"clearArray" : true,
		"arrayValues" : [-1, -1, -1, -1, -1, -1, -1, 55, 20],
		"hashArrayValues" : [77, 44, -1, -1, 26, 93, 17, -1, -1, 31, 54],
		"hashArrayHighlights" : [{
			index : 0,
			color : "red"
		}],
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"auxArrayHighlights" : [0],
		"auxLabel" : "",
		"showResult" : true,
		"searchValue" : 44,
		"searchString" : "<span>Find: <strong>44</strong></span>",
		"description" : "<h3>Finding with open addressing</h3><p>We check slot 0. It’s got something in it, but it’s 77. With open addressing we have to move along checking each slot sequentially.</p>"
	},
	//22
	{
		"audio" : "data/audio/hashtables-audio-023.mp3",
		"clearArray" : true,
		"arrayValues" : [-1, -1, -1, -1, -1, -1, -1, 55, 20],
		"hashArrayValues" : [77, 44, -1, -1, 26, 93, 17, -1, -1, 31, 54],
		"hashArrayHighlights" : [{
			"index" : 0,
			color : "rgba(255, 0, 0, 0.3)"
		}, {
			index : 1,
			color : "red"
		}],
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"auxArrayHighlights" : [1],
		"auxLabel" : "",
		"showResult" : true,
		"searchValue" : 44,
		"searchString" : "<span>Find: <strong>44</strong></span>",
		"description" : "<h3>Finding with open addressing</h3><p>Moving one step forward we succeed in finding 44, so we return true.</p>"
	},
	//23
	{
		"audio" : "data/audio/hashtables-audio-024.mp3",
		"clearArray" : true,
		"arrayValues" : [-1, -1, -1, -1, -1, -1, -1, 55, 20],
		"hashArrayValues" : [77, 44, -1, -1, 26, 93, 17, -1, -1, 31, 54],
		"hashArrayHighlights" : [],
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"auxArrayHighlights" : [],
		"auxLabel" : "",
		"showResult" : true,
		"description" : "<h3>Finding 66 with open addressing</h3><p>Let’s try the case of a number not in the hash table. Let’s pick a number at random like 66.</p>"
	},
	//24
	{
		"audio" : "data/audio/hashtables-audio-025.mp3",
		"clearArray" : true,
		"arrayValues" : [-1, -1, -1, -1, -1, -1, -1, 55, 20],
		"hashArrayValues" : [77, 44, -1, -1, 26, 93, 17, -1, -1, 31, 54],
		"hashArrayHighlights" : [{
			"index" : 0,
			"color" : "red"
		}],
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"auxArrayHighlights" : [],
		"auxLabel" : "",
		"showResult" : false,
		"searchValue" : 66,
		"searchString" : "<span>Find: <strong>66</strong></span>",
		"description" : "<h3>Finding 66 with open addressing</h3><p>By putting 66 into the hash function we get slot 0. We check slot 0 and it’s occupied.</p>"
	},
	//25
	{
		"audio" : "data/audio/hashtables-audio-026.mp3",
		"clearArray" : true,
		"arrayValues" : [-1, -1, -1, -1, -1, -1, -1, 55, 20],
		"hashArrayValues" : [77, 44, -1, -1, 26, 93, 17, -1, -1, 31, 54],
		"hashArrayHighlights" : [{
			"index" : 0,
			"color" : "red"
		}],
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"auxArrayHighlights" : [0],
		"auxLabel" : "",
		"showResult" : false,
		"searchValue" : 66,
		"searchString" : "<span>Find: <strong>66</strong></span>",
		"description" : "<h3>Finding 66 with open addressing</h3><p>We look at what is in the slot and find 77 – not what we are looking for. With linear probing we have to check the next slot.</p>"
	},
	//26
	{
		"audio" : "data/audio/hashtables-audio-027.mp3",
		"clearArray" : true,
		"arrayValues" : [-1, -1, -1, -1, -1, -1, -1, 55, 20],
		"hashArrayValues" : [77, 44, -1, -1, 26, 93, 17, -1, -1, 31, 54],
		"hashArrayHighlights" : [{
			"index" : 1,
			"color" : "red"
		}],
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"auxArrayHighlights" : [1],
		"auxLabel" : "",
		"showResult" : false,
		"searchValue" : 66,
		"searchString" : "<span>Find: <strong>66</strong></span>",
		"description" : "<h3>Finding 66 with open addressing</h3><p>The next slot is occupied by 44. This still isn’t what we are looking for, so we move on.</p>"
	},
	//27
	{
		"audio" : "data/audio/hashtables-audio-028.mp3",
		"clearArray" : true,
		"arrayValues" : [-1, -1, -1, -1, -1, -1, -1, 55, 20],
		"hashArrayValues" : [77, 44, -1, -1, 26, 93, 17, -1, -1, 31, 54],
		"hashArrayHighlights" : [{
			"index" : 2,
			"color" : "red"
		}],
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"auxArrayHighlights" : [2],
		"auxLabel" : "",
		"showResult" : false,
		"searchValue" : 66,
		"searchString" : "<span>Find: <strong>66</strong></span>",
		"description" : "<h3>Finding 66 with open addressing</h3><p>The next slot is empty so we can be sure 66 is not in the table, otherwise it would have been stored in this slot. So we return false.</p>"
	},
	//28
	{
		"audio" : "data/audio/hashtables-audio-029.mp3",
		"clearArray" : true,
		"valueIndex" : 7,
		"arrayValues" : [-1, -1, -1, -1, -1, -1, -1, 55, 20],
		"hashArrayValues" : [77, 44, -1, -1, 26, 93, 17, -1, -1, 31, 54],
		"hashArrayHighlights" : [{
			"index" : 0,
			"color" : "rgba(255, 0, 0, 0.1)"
		}, {
			"index" : 1,
			"color" : "rgba(255, 0, 0, 0.3)"
		}, {
			"index" : 2,
			"color" : "rgba(255, 0, 0, 1.0)"
		}],
		"targetIndex" : 2,
		"addToTableIndex" : 7,
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"auxArrayHighlights" : [2],
		"auxLabel" : "",
		"showResult" : true,
		"searchValue" : 66,
		"refresh" : {
			"arrayValues" : [-1, -1, -1, -1, -1, -1, -1, -1, 20],
			"hashArrayValues" : [77, 44, 55, -1, 26, 93, 17, -1, -1, 31, 54],
		},
		"description" : "<h3>Extending linear probing</h3><p>If we carry on adding elements you will notice that we end up clustering around slot 0. We can try to avoid this by extending the linear probing technique by skipping slots.</p>"
	},
	//29 - going back a few steps, so don't pick up from prev. refresh state
	{
		"audio" : "data/audio/hashtables-audio-030.mp3",
		"clearArray" : true,
		"valueIndex" : 6,
		"arrayValues" : [-1, -1, -1, -1, -1, -1, 44, 55, 20],
		"arrayHighlights" : [{
			"index" : 6,
			"color" : "yellow"
		}],
		"hashArrayValues" : [77, -1, -1, -1, 26, 93, 17, -1, -1, 31, 54],
		"hashArrayHighlights" : [{
			"index" : 0,
			"color" : "rgba(255, 0, 0, 1.0)"
		}],
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"auxArrayHighlights" : [0],
		"auxLabel" : "",
		"showResult" : true,
		"description" : "<h3>Extending linear probing</h3><p>Let’s go back to storing numbers using linear probing. We go back to adding in 44. In this case we get slot 0. Again, we look in slot 0 and find it’s occupied. This time instead of looking in the next slot we use the probe distance of 3.</p>"
	},
	//30
	{
		"audio" : "data/audio/hashtables-audio-031.mp3",
		"clearArray" : true,
		"valueIndex" : 6,
		"arrayValues" : [-1, -1, -1, -1, -1, -1, 44, 55, 20],
		"arrayHighlights" : [{
			"index" : 6,
			"color" : "yellow"
		}],
		"hashArrayValues" : [77, -1, -1, -1, 26, 93, 17, -1, -1, 31, 54],
		"hashArrayHighlights" : [{
			"index" : 0,
			"color" : "rgba(255, 0, 0, 0.3)"
		}, {
			"index" : 3,
			"color" : "rgba(255, 0, 0, 1.0)"
		}],
		"addToTableIndex" : 6,
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"auxArrayHighlights" : [3],
		"targetIndex" : 3,
		"auxLabel" : "",
		"showResult" : true,
		"description" : "<h3>Extending linear probing</h3><p>Slot 3 is empty so we store the value there.</p>",
		"refresh" : {
			"arrayValues" : [-1, -1, -1, -1, -1, -1, -1, 55, 20],
			"hashArrayValues" : [77, -1, -1, 44, 26, 93, 17, -1, -1, 31, 54]
			//[77, -1, 44, -1, 26, 93, 17, -1, -1, 31, 54]
		}
	},
	//31
	{
		"audio" : "data/audio/hashtables-audio-032.mp3",
		"clearArray" : true,
		"valueIndex" : 7,
		"arrayValues" : [-1, -1, -1, -1, -1, -1, -1, 55, 20],
		"arrayHighlights" : [{
			"index" : 7,
			"color" : "yellow"
		}],
		"hashArrayValues" : [77, -1, -1, 44, 26, 93, 17, -1, -1, 31, 54],
		"hashArrayHighlights" : [{
			"index" : 0,
			"color" : "rgba(255, 0, 0, 0.1)"
		}, {
			"index" : 3,
			"color" : "rgba(255, 0, 0, 0.3)"
		}, {
			"index" : 6,
			"color" : "rgba(255, 0, 0, 0.5)"
		}, {
			"index" : 9,
			"color" : "rgba(255, 0, 0, 0.7)"
		}, {
			"index" : 1,
			"color" : "rgba(255, 0, 0, 1.0)"
		}],
		"addToTableIndex" : 7,
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"auxArrayHighlights" : [1],
		"targetIndex" : 1,
		"auxLabel" : "",
		"showResult" : true,
		"description" : "<h3>Extending linear probing</h3><p>55 cannot go in slot 0 because it is occupied. Nor can it go in slot 3 because that is also occupied. We continue moving 3 steps and find 6 and 9 are occupied as well. When we reach the end of the hash table we wrap round and continue from the start, so the slot to try after 9 is 1. This slot is empty, so we insert 55 there.</p>",
		"refresh" : {
			"arrayValues" : [-1, -1, -1, -1, -1, -1, -1, -1, 20],
			"hashArrayValues" : [77, 55, -1, 44, 26, 93, 17, -1, -1, 31, 54]
		}
	},
	//32 - extending linear probing cont.?
	{
		"audio" : "data/audio/hashtables-audio-033.mp3",
		"clearArray" : true,
		"valueIndex" : 8,
		"arrayValues" : [-1, -1, -1, -1, -1, -1, -1, -1, 20],
		"hashArrayValues" : [77, 55, -1, 44, 26, 93, 17, -1, -1, 31, 54],
		"arrayHighlights" : [{
			"index" : 8,
			"color" : "yellow"
		}],
		"hashArrayHighlights" : [{
			"index" : 9,
			"color" : "rgba(255, 0, 0, 0.1)"
		}, {
			"index" : 1,
			"color" : "rgba(255, 0, 0, 0.3)"
		}, {
			"index" : 4,
			"color" : "rgba(255, 0, 0, 0.5)"
		}, {
			"index" : 7,
			"color" : "rgba(255, 0, 0, 1.0)"
		}],
		"addToTableIndex" : 8,
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"auxArrayHighlights" : [7],
		"targetIndex" : 7,
		"auxLabel" : "",
		"showResult" : true,
		"description" : "<h3>Extending linear probing</h3><p>In a similar way we cannot insert 20 in slot 9, so we count on 3 which with wrap-around brings us to slot 1, which we have just used. Counting on 3 again, slot 4 is occupied, so we move on another 3, which brings us to slot 7. Slot 7 is empty so finally we store the value there.</p>",
		"refresh" : {
			"arrayValues" : [-1, -1, -1, -1, -1, -1, -1, -1, -1],
			"hashArrayValues" : [77, 55, -1, 44, 26, 93, 17, 20, -1, 31, 54],
		}
	},
	//33
	{
		"audio" : "data/audio/hashtables-audio-034.mp3",
		"clearArray" : true,
		"arrayValues" : [-1, -1, -1, -1, -1, -1, -1, -1, -1],
		"hashArrayValues" : [77, 55, -1, 44, 26, 93, 17, 20, -1, 31, 54],
		"arrayHighlights" : [],
		"hashArrayHighlights" : [],
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"auxArrayHighlights" : [],
		"auxLabel" : "",
		"showResult" : true,
		"description" : "<h3>Extending linear probing</h3><p>As we have seen, simple ‘try the one next door’ mechanisms create blocks which slow searching down. We want to keep an even spacing of gaps if we can.</p><p>Using linear probing, but now moving several steps forward instead of just one, results in a better spacing between clusters. But we can do even better …</p>"
	},
	//34
	{
		"audio" : "data/audio/hashtables-audio-035.mp3",
		"clearArray" : true,
		"arrayValues" : [-1, -1, -1, -1, -1, -1, -1, -1, -1],
		"hashArrayValues" : [77, 44, 20, 55, 26, 93, 17, -1, -1, 31, 54],//[77, 55, -1, 44, 26, 93, 17, 20, -1, 31, 54],
		"arrayHighlights" : [],
		"hashArrayHighlights" : [],
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"auxArrayHighlights" : [],
		"auxLabel" : "",
		"showResult" : true,
		"description" : "<h3>Quadratic probing</h3><p>With quadratic probing we use a formula to grow the step we use each time: 1, 3, 5, 7 and so on. Provided we are consistent between storing information and checking for its location, this works reliably.</p>"
	},
	//35 - chaining
	{
		"audio" : "data/audio/hashtables-audio-036.mp3",
		"clearArray" : true,
		"valueIndex" : 6,
		"arrayValues" : [-1, -1, -1, -1, -1, -1, 44, 55, 20],
		"arrayHighlights" : [{
			"index" : 6,
			"color" : "yellow"
		}],
		"hashArrayValues" : [77, -1, -1, -1, 26, 93, 17, -1, -1, 31, 54],
		"hashArrayHighlights" : [{
			"index" : 0,
			"color" : "red"
		}],
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"auxArrayHighlights" : [0],
		"targetIndex" : 0,
		"auxLabel" : "",
		"showResult" : true,
		"description" : "<h3>Chaining</h3><p>Another method used in many tables is to point to a collection or chain of items. When a collision occurs the item is added to the chain.</p><p>Let’s go back to the case of storing 44 in the hash table again.</p>"
	},
	//36 - animate
	{
		"audio" : "data/audio/hashtables-audio-037.mp3",
		"chainedCollisions" : true,
		"clearArray" : true,
		"valueIndex" : 6,
		"arrayValues" : [-1, -1, -1, -1, -1, -1, 44, 55, 20],
		"arrayHighlights" : [{
			"index" : 6,
			"color" : "yellow"
		}],
		"hashArrayValues" : [77, -1, -1, -1, 26, 93, 17, -1, -1, 31, 54],
		"hashArrayHighlights" : [{
			"index" : 0,
			"color" : "red"
		}],
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"auxArrayHighlights" : [0],
		"addToTableIndex" : 6,
		"targetIndex" : 0,
		"auxLabel" : "",
		"showResult" : true,
		"description" : "<h3>Chaining</h3><p>In this case when a collision occurs we save a collection such as a list. This is known as chaining.</p>",
		"refresh" : {
			"arrayValues" : [-1, -1, -1, -1, -1, -1, -1, 55, 20],
			"hashArrayValues" : [-1, -1, -1, -1, 26, 93, 17, -1, -1, 31, 54],
			"hashArrayNextValues" : [77, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			"hashArrayLastValues" : [44, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
		}
	},
	//37 - deletion
	{
		"audio" : "data/audio/hashtables-audio-038.mp3",
		"clearArray" : true,
		"arrayValues" : [-1, -1, -1, -1, -1, -1, -1, 55, 20],
		"arrayHighlights" : [],
		"hashArrayValues" : [-1, -1, -1, -1, 26, 93, 17, -1, -1, 31, 54],
		"hashArrayHighlights" : [],
		"hashArrayNextValues" : [77, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"hashArrayLastValues" : [44, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"auxArrayHighlights" : [],
		"targetIndex" : 0,
		"auxLabel" : "",
		"showResult" : true,
		"description" : "<h3>Deletion</h3><p>We have added and searched but what about forgetting about or deleting an item?</p>",
	},
	//38
	{
		"audio" : "data/audio/hashtables-audio-039.mp3",
		"clearArray" : true,
		"arrayValues" : [-1, -1, -1, -1, -1, -1, -1, 55, 20],
		"arrayHighlights" : [],
		"hashArrayValues" : [-1, -1, -1, -1, 26, 93, 17, -1, -1, 31, 54],
		"hashArrayHighlights" : [],
		"hashArrayNextValues" : [77, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"hashArrayLastValues" : [44, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"auxArrayHighlights" : [],
		"targetIndex" : 0,
		"auxLabel" : "",
		"showResult" : true,
		"searchValue" : 54,
		"searchString" : "<span>Find: <strong>54</strong></span>",
		"description" : "<h3>Deletion</h3><p>Deletion begins with searching. In this example we want to delete item 54.</p>"
	},
	//39
	{
		"audio" : "data/audio/hashtables-audio-040.mp3",
		"clearArray" : true,
		"arrayValues" : [-1, -1, -1, -1, -1, -1, -1, 55, 20],
		"arrayHighlights" : [],
		"hashArrayValues" : [-1, -1, -1, -1, 26, 93, 17, -1, -1, 31, 54],
		"hashArrayHighlights" : [{
			"index" : 10,
			"color" : "red"
		}],
		"hashArrayNextValues" : [77, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"hashArrayLastValues" : [44, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"auxArrayHighlights" : [10],
		"auxLabel" : "",
		"showResult" : true,
		"searchValue" : 54,
		"searchString" : "<span>Find: <strong>54</strong></span>",
		"description" : "<h3>Deletion</h3><p>We use the hash function to find the slot and check that the slot is occupied with the correct value.</p>",
	},
	//40
	{
		"audio" : "data/audio/hashtables-audio-041.mp3",
		"clearArray" : true,
		"arrayValues" : [-1, -1, -1, -1, -1, -1, -1, 55, 20],
		"arrayHighlights" : [],
		"hashArrayValues" : [-1, -1, -1, -1, 26, 93, 17, -1, -1, 31, 54],
		"hashArrayHighlights" : [{
			"index" : 10,
			"color" : "white"
		}],
		"hashArrayNextValues" : [77, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"hashArrayLastValues" : [44, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"auxArrayHighlights" : [10],
		"auxLabel" : "",
		"showResult" : true,
		"searchValue" : 54,
		"deleteHashIndex" : 10,
		"searchString" : "<span>Find and delete: <strong>54</strong></span>",
		"description" : "<h3>Deletion</h3><p>Next we empty the slot leaving it ready for reuse.</p>",
	},
	//41 - real world hashing
	{
		"audio" : "data/audio/hashtables-audio-042.mp3",
		"clearArray" : true,
		"arrayValues" : [54, 26, 93, 17, 77, 31, 44, 55, 20, 29, 33],
		"hashArrayValues" : [77, 44, 55, 20, 26, 93, 17, 29, 33, 31, 54],
		"hashArrayNextValues" : [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"hashArrayLastValues" : [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		"arrayHighlights" : [],
		"auxArrayHighlights" : [],
		"auxLabel" : "",
		"description" : "<h3>Real world hashing</h3><p>Eventually a point may come when the hash table is full, especially if it doesn’t use chaining.</p><p>In this case well-written hash tables won’t fail. Like a hermit crab that’s outgrown its shell they find a bigger home and move in.</p>",
		"searchString" : ""
	},
	//42
	{
		"audio" : "data/audio/hashtables-audio-043.mp3",
		"clearArray" : true,
		"arrayValues" : [54, 26, 93, 17, 77, 31, 44, 55, 20, 29, 33],
		"hashArrayValues" : [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"hashArrayNextValues" : [77, 44, 55, 20, 26, 93, 17, 29, 33, 31, 54],
		"hashArrayLastValues" : [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
		"arrayHighlights" : [],
		"auxArrayHighlights" : [],
		"auxLabel" : "Slots:",
		"rehash" : [[0, 8], [1, 3], [2, 1], [3, 17], [4, 9], [5, 10], [6, 21], [7, 11], [8, 20], [9, 6], [10, 12]],
		"description" : "<h3>Real world hashing</h3><p>In this case a second much larger hash table is created. All the elements are hashed into the new table in different positions. This is why in some hash tables, as they grow, you will find the order of elements changes as you add more elements. For this reason you should never rely on the order of elements in a hash table being the same.</p>",
		"refresh" : {
			"arrayValues" : [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			"hashArrayValues" : [-1, 93, -1, 26, -1, -1, 29, -1, 54, 77, 31, 55, 33, -1, -1, -1, -1, 17, -1, -1, 20, 44, -1],
			"hashArrayNextValues" : [77, 44, 55, 20, 26, 93, 17, 29, 33, 31, 54],
			"hashArrayLastValues" : [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
		}
	},
	//43
	{
		"audio" : "data/audio/hashtables-audio-044.mp3",
		"clearArray" : true,
		"arrayValues" : [54, 26, 93, 17, 77, 31, 44, 55, 20, 29, 33],
		"hashArrayValues" : [-1, 93, -1, 26, -1, -1, 29, -1, 54, 77, 31, 55, 33, -1, -1, -1, -1, 17, -1, -1, 20, 44, -1],
		"hashArrayNextValues" : [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"hashArrayLastValues" : [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
		"arrayHighlights" : [],
		"auxArrayHighlights" : [],
		"auxLabel" : "Slots:",
		"description" : "<h3>Real world hashing</h3><p>In practice this isn’t triggered when the hash table is full but when the load factor – the ratio of filled slots to empty slots – goes above a critical level.</p>"
	},
	//44
	{
		"audio" : "data/audio/hashtables-audio-045.mp3",
		"clearArray" : true,
		"hideArray" : true,
		"arrayValues" : [54, 26, 93, 17, 77, 31, 44, 55, 20, 29, 33],
		"hashArrayValues" : [-1, 93, -1, 26, -1, -1, 29, -1, 54, 77, 31, 55, 33, -1, -1, -1, -1, 17, -1, -1, 20, 44, -1],
		"hashArrayNextValues" : [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"hashArrayLastValues" : [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
		"arrayHighlights" : [],
		"auxArrayHighlights" : [],
		"auxLabel" : "Slots:",
		"description" : "<h3 style='margin-top:-10px'>Summary</h3><ul><li>You have learned how hash tables use a hash function to find a slot.</li><li>You have learned about collisions.</li><li>You have learned how to deal with collisions using linear probing.</li><li>You have seen how rehashing using linear and quadratic probes can help stop clustering.</li><li>You have seen how chaining can also be used to cope with collisions.</li><li>You have seen how to delete an element when using chaining.</li><li>You have seen how real hash tables automatically expand when they get too full.</li></ul>"
	},
	//45
	{
		"audio" : "data/audio/hashtables-audio-046.mp3",
		"clearArray" : true,
		"hideArray" : true,
		"arrayValues" : [54, 26, 93, 17, 77, 31, 44, 55, 20, 29, 33],
		"hashArrayValues" : [-1, 93, -1, 26, -1, -1, 29, -1, 54, 77, 31, 55, 33, -1, -1, -1, -1, 17, -1, -1, 20, 44, -1],
		"hashArrayNextValues" : [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"hashArrayLastValues" : [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"auxArrayValues" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
		"arrayHighlights" : [],
		"auxArrayHighlights" : [],
		"auxLabel" : "Slots:",
		"description" : "<h3></h3><p>That concludes this visualisation.</p>"
	}]
};
