	data = {
	"title" : "<h2>Rapid string searching algorithms</h2>",
	"info" : "<h2>Information</h2><ul><li>Click Next to go to the next step.</li><li>Click Previous to go to the preceding step.</li><li>Select Reset to go back to the start of the visualisation. The steps will vary depending on whether the Random checkbox is checked.</li><li>Toggle Random to select the main script or one based on randomised input.</li><li>Press Audio to toggle audio narration on or off. Note that no audio is available for randomised input.</li></ul>",
	"startOffset" : 0,
	//search string char numbering
	"searchAux" : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
	"steps" : [
	//0
	{
		"audio" : "data/audio/rapidsearch-audio-001.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "F", "T", "C", "A", "A", "C", "G", "C", "A", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : ["G", "T", "G", "G", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [],
		"searchArrayHighlights" : [],
		"targetArrayHighlights" : [],
		"targetAuxArrayHighlights" : [],
		"auxLabel" : "",
		"arrows" : [],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>In this visualisation we are going to look at quicker, but more complex, string searching algorithms including the Knuth-Morris-Pratt algorithm.</p>"
	},
	//1
	{
		"audio" : "data/audio/rapidsearch-audio-002.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "F", "T", "C", "A", "A", "C", "G", "C", "A", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : ["G", "T", "G", "G", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [],
		"searchArrayHighlights" : [],
		"targetArrayHighlights" : [],
		"targetAuxArrayHighlights" : [],
		"auxLabel" : "",
		"arrows" : [],
		"description" : "<h3>Searching</h3><p>It’s hard to imagine anything which is faster than just comparing each string character by character.</p><p>Before beginning, it might be helpful to look at this simple case. Imagine we are searching along the top search string for the bottom target string.</p><p><p>In this visualisation we are looking at a simple alphabet like DNA. With DNA the strings are very, very long and anything which can speed things up is going to be of a huge benefit.</p>"
	},
	//2
	{
		"audio" : "data/audio/rapidsearch-audio-003.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "F", "T", "C", "A", "A", "C", "G", "C", "A", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : ["G", "T", "G", "G", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [],
		"searchArrayHighlights" : [],
		"targetArrayHighlights" : [],
		"targetAuxArrayHighlights" : [],
		"auxLabel" : "",
		"arrows" : [],
		"description" : "<h3>Searching</h3><p>Like the brute force case we begin with the first letter of the target and compare it to the first letter of the search string.</p>"
	},
	//3 - Sunday string searching
	{
		"audio" : "data/audio/rapidsearch-audio-004.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "C", "T", "G", "T", "G", "C", "G", "C", "A", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : ["G", "T", "G", "G", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : ["✔"],
		"searchArrayHighlights" : [],
		"targetArrayHighlights" : [],
		"targetAuxArrayHighlights" : [],
		"auxLabel" : "",
		"arrows" : [],
		"description" : "<h3>Sunday string searching</h3><p>In this simple example we see the elements of the target line up the elements of the source really well until we to reach the last letter of the target G which doesn’t match the search string ‘C’.</p>"
	},
	//4 - Sunday string searching
	{
		"audio" : "data/audio/rapidsearch-audio-005.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "C", "T", "G", "T", "G", "C", "G", "C", "A", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : ["G", "T", "G", "G", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : ["✔", "✔", "✔", "✔", "✔", "✔", "✘"],
		"searchArrayHighlights" : [],
		"targetArrayHighlights" : [],
		"targetAuxArrayHighlights" : [],
		"auxLabel" : "",
		"arrows" : [],
		"description" : "<h3>Sunday string searching</h3><p>In the simple brute force we would shift along one letter and begin again.</p><p>But what happens if we look at the letters that are not matching and think about them. In this case the mismatch letter is ‘C’.</p>"
	},
	//5 - Sunday string searching
	{
		"audio" : "data/audio/rapidsearch-audio-006.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "C", "T", "G", "T", "G", "C", "G", "C", "A", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : ["G", "T", "G", "G", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : ["✔", "✔", "✔", "✔", "✔", "✔", "✘"],
		"searchArrayHighlights" : [],
		"targetArrayHighlights" : [],
		"targetAuxArrayHighlights" : [],
		"auxLabel" : "",
		"arrows" : [],
		"description" : "<h3>Sunday string searching</h3><p>We know that ‘C’ is not in our target string. So there is no use in trying to move just along 1. ‘C’ still not going to be found.</p><p>Because C is not in our target string, we know we can move the entire string past to the other side of C in one go and start again.</p>"
	},
	//6 - Sunday string searching
	{
		"audio" : "data/audio/rapidsearch-audio-007.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "C", "T", "G", "T", "G", "C", "G", "C", "A", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : ["G", "T", "G", "G", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [],
		"searchArrayHighlights" : [],
		"targetArrayHighlights" : [],
		"targetAuxArrayHighlights" : [],
		"auxLabel" : "",
		"transpose" : 7,
		"arrows" : [],
		"description" : "<h3>Sunday string searching</h3><p>If we find a letter that’s not in our target string we can move all the way past it, which is a considerable saving. Remember we are avoiding doing many letter comparisons.</p>",
		"refresh" : {
			"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "C", "T", "G", "T", "G", "C", "G", "C", "A", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
			"searchArrayLabel" : "Search string S:",
			"targetArrayValues" : [-1, -1, -1, -1, -1, -1, -1, "G", "T", "G", "G", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			"targetAuxArrayValues" : [],
			"targetArrayLabel" : "Target string T:"
		}
	},
	//7
	{
		"audio" : "data/audio/rapidsearch-audio-008.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "C", "T", "G", "T", "G", "C", "G", "C", "A", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : [-1, -1, -1, -1, -1, -1, -1, "G", "T", "G", "G", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [],
		"searchArrayHighlights" : [],
		"targetArrayHighlights" : [],
		"targetAuxArrayHighlights" : [],
		"auxLabel" : "",
		"arrows" : [{
			"start" : 0,
			"end" : 7,
			"label" : "P",
			"yShift" : 2
		}, {
			"start" : 7,
			"end" : 8,
			"label" : "1",
			"yShift" : 2
		}],
		"description" : "<h3>Sunday string searching</h3><p>Analytically, this saves us doing comparisons for the length of the target which is denoted by P plus one for the ‘C’ miss matching characters. This looking at what to do with failed characters is the beginning of the Sunday Algorithm, which you have seen covered in the course text.</p><p>It does show that we can speed up the basic search algorithms. In this case we would get a 7 times speed improvement.</p>"
	},
	//8
	{
		"audio" : "data/audio/rapidsearch-audio-009.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"arrows" : [],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>So if the saving is big can we use the technique of skipping the target string along if the letter <i>is</i> in the target string?</p><p>Finding ways to skip and not bother checking is also the basis for the Knuth-Morris-Pratt algorithm.</p>"
	},
	//9
	{
		"audio" : "data/audio/rapidsearch-audio-010.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"arrows" : [],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>Let’s begin another search. We begin like brute force at the beginning and look for comparisons one by one.</p>"
	},
	//10
	{
		"audio" : "data/audio/rapidsearch-audio-011.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : ["✔", "✔", "✔", "✘"],
		"arrows" : [],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>In this case we get to the fourth element C when a mismatch occurs. Remember, we are using zero based strings so this is character 3.</p>"
	},
	//11
	{
		"audio" : "data/audio/rapidsearch-audio-012.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchAuxArrayHighlights" : [3],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : ["✔", "✔", "✔", "✘"],
		"arrows" : [],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>In this case we have found a G which does occur in the target string. This means we can’t just move past it. But we know about the target string so we don’t have to move by just one. </p>"
	},
	//12
	{
		"audio" : "data/audio/rapidsearch-audio-013.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchAuxArrayHighlights" : [],
		"searchArrayLabel" : "Search string S:",
		"searchArrayDisabledFrom" : 0,
		"targetArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [],
		"arrows" : [],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>If we forget about the source string for a second and just think about matching the target string against itself.</p>",
		"refresh" : {
			"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
			"searchArrayLabel" : "Search string S:",
			"searchArrayDisabledFrom" : 0,
			"targetArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			"targetArrayLabel" : "Target string T:",
			"target2ArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
		}
	},
	//13
	{
		"audio" : "data/audio/rapidsearch-audio-014.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchAuxArrayHighlights" : [],
		"targetArrayHighlights" : [],
		"target2ArrayHighlights" : [],
		"targetAuxArrayHighlights" : [],
		"searchArrayLabel" : "Search string S:",
		"searchArrayDisabledFrom" : 0,
		"targetArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [],
		"target2ArrayValues" : [-1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayDisabledFrom" : 3,
		"target2ArrayDisabledFrom" : 4,
		"arrows" : [],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>If we look at the target string we can see if the target string is wrong there is no way the target shifted by one will be correct.</p>",
	},
	//14
	{
		"audio" : "data/audio/rapidsearch-audio-015.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchAuxArrayHighlights" : [],
		"searchArrayLabel" : "Search string S:",
		"searchArrayDisabledFrom" : 0,
		"targetArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [],
		"target2AuxArrayValues" : [-1, "✘"],
		"target2ArrayValues" : [-1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayDisabledFrom" : 3,
		"target2ArrayDisabledFrom" : 4,
		"arrows" : [],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>So we can forget moving forwards by one if the first three letters match.</p>",
	},
	//15
	{
		"audio" : "data/audio/rapidsearch-audio-016.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchAuxArrayHighlights" : [],
		"searchArrayLabel" : "Search string S:",
		"searchArrayDisabledFrom" : 0,
		"targetArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [],
		"target2AuxArrayValues" : [-1, -1, "✔"],
		"target2ArrayValues" : [-1, -1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayDisabledFrom" : 3,
		"target2ArrayDisabledFrom" : 5,
		"arrows" : [],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>Using the Knuth Morris Pratt Algorithm, we know that we will have to move by at least two steps even get a chance of a match.</p>"
	},
	//16
	{
		"audio" : "data/audio/rapidsearch-audio-017.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchAuxArrayHighlights" : [],
		"searchArrayLabel" : "Search string S:",
		"searchArrayDisabledFrom" : 0,
		"targetArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [],
		"target2AuxArrayValues" : [-1, -1, "✔"],
		"target2ArrayValues" : [-1, -1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayDisabledFrom" : 3,
		"target2ArrayDisabledFrom" : 5,
		"arrows" : [{
			"start" : 0,
			"end" : 2,
			"label" : "2",
			"yShift" : 2.5
		}],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>Going back to our compare this means we can skip forward two elements. This might look small, but it is double the speed we had previously.</p>"
	},
	//17
	{
		"audio" : "data/audio/rapidsearch-audio-018.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchAuxArrayHighlights" : [],
		"searchArrayLabel" : "Search string S:",
		"searchArrayDisabledFrom" : 0,
		"targetArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [],
		"target2AuxArrayValues" : [],
		"target2ArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"resultsArrayValues" : [-999, -999, -999, 2, -999, -999, -999, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayDisabledFrom" : 3,
		"target2ArrayDisabledFrom" : 3,
		"arrows" : [],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>So if before we begin matching we go through the target string testing against itself, building up a table of how far to skip if a miss of that length occurs.</p>"
	},
	//18
	{
		"audio" : "data/audio/rapidsearch-audio-019.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchAuxArrayHighlights" : [],
		"searchArrayLabel" : "Search string S:",
		"searchArrayDisabledFrom" : 0,
		"targetArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [],
		"target2AuxArrayValues" : [],
		"target2ArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"resultsArrayValues" : [-999, -999, -999, 2, -999, -999, -999, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayDisabledFrom" : 4,
		"target2ArrayDisabledFrom" : 4,
		"arrows" : [],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>So in the case of a mismatch at the fourth zero based letter.</p>"
	},
	//19
	{
		"audio" : "data/audio/rapidsearch-audio-020.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchAuxArrayHighlights" : [],
		"searchArrayLabel" : "Search string S:",
		"searchArrayDisabledFrom" : 0,
		"targetArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [],
		"target2AuxArrayValues" : [-1, "✘"],
		"target2ArrayValues" : [-1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"resultsArrayValues" : [-999, -999, -999, 2, -999, -999, -999, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayDisabledFrom" : 4,
		"target2ArrayDisabledFrom" : 5,
		"arrows" : [],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>As in the previous case this can never match.</p>"
	},
	//20
	{
		"audio" : "data/audio/rapidsearch-audio-021.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchAuxArrayHighlights" : [],
		"searchArrayLabel" : "Search string S:",
		"searchArrayDisabledFrom" : 0,
		"targetArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [],
		"target2AuxArrayValues" : [-1, -1, "✘"],
		"target2ArrayValues" : [-1, -1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"resultsArrayValues" : [-999, -999, -999, 2, -999, -999, -999, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayDisabledFrom" : 4,
		"target2ArrayDisabledFrom" : 6,
		"arrows" : [],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>Unlike the previous case this can never match either.</p>"
	},
	//21
	{
		"audio" : "data/audio/rapidsearch-audio-022.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchAuxArrayHighlights" : [],
		"searchArrayLabel" : "Search string S:",
		"searchArrayDisabledFrom" : 0,
		"targetArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [],
		"target2AuxArrayValues" : [-1, -1, -1, "✘"],
		"target2ArrayValues" : [-1, -1, -1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"resultsArrayValues" : [-999, -999, -999, 2, -999, -999, -999, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayDisabledFrom" : 4,
		"target2ArrayDisabledFrom" : 7,
		"arrows" : [],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>This won’t work either.</p>"
	},
	//22
	{
		"audio" : "data/audio/rapidsearch-audio-023.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchAuxArrayHighlights" : [],
		"searchArrayLabel" : "Search string S:",
		"searchArrayDisabledFrom" : 0,
		"targetArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [],
		"target2AuxArrayValues" : [],
		"target2ArrayValues" : [-1, -1, -1, -1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"resultsArrayValues" : [-999, -999, -999, 2, 4, -999, -999, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayDisabledFrom" : 4,
		"target2ArrayDisabledFrom" : 8,
		"arrows" : [{
			"start" : 0,
			"end" : 4,
			"label" : "4",
			"yShift" : 2.5
		}],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>In the case of the first four elements matching you will have to move the whole four elements along before you can even think about the strings beginning to move.</p>"
	},
	//23
	{
		"audio" : "data/audio/rapidsearch-audio-024.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchAuxArrayHighlights" : [],
		"searchArrayLabel" : "Search string S:",
		"searchArrayDisabledFrom" : 0,
		"targetArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [],
		"target2AuxArrayValues" : [],
		"target2ArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"resultsArrayValues" : [-999, -999, -999, 2, 4, -999, -999, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayDisabledFrom" : 5,
		"target2ArrayDisabledFrom" : 5,
		"arrows" : [],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>Looking at the case for the first five letters matching.</p>"
	},
	//24
	{
		"audio" : "data/audio/rapidsearch-audio-025.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchAuxArrayHighlights" : [],
		"searchArrayLabel" : "Search string S:",
		"searchArrayDisabledFrom" : 0,
		"targetArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [],
		"target2AuxArrayValues" : [-1, "✘"],
		"target2ArrayValues" : [-1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"resultsArrayValues" : [-999, -999, -999, 2, 4, -999, -999, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayDisabledFrom" : 5,
		"target2ArrayDisabledFrom" : 6,
		"arrows" : [],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>Again thinking about the case of moving the string forward by one we can see it will  never match.</p>"
	},
	//25
	{
		"audio" : "data/audio/rapidsearch-audio-026.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchAuxArrayHighlights" : [],
		"searchArrayLabel" : "Search string S:",
		"searchArrayDisabledFrom" : 0,
		"targetArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [],
		"target2AuxArrayValues" : [-1, -1, -1, "✘"],
		"target2ArrayValues" : [-1, -1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"resultsArrayValues" : [-999, -999, -999, 2, 4, -999, -999, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayDisabledFrom" : 5,
		"target2ArrayDisabledFrom" : 7,
		"arrows" : [],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>Neither does this.</p>"
	},
	//26
	{
		"audio" : "data/audio/rapidsearch-audio-027.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchAuxArrayHighlights" : [],
		"searchArrayLabel" : "Search string S:",
		"searchArrayDisabledFrom" : 0,
		"targetArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [],
		"target2AuxArrayValues" : [-1, -1, -1, "✘"],
		"target2ArrayValues" : [-1, -1, -1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"resultsArrayValues" : [-999, -999, -999, 2, 4, -999, -999, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayDisabledFrom" : 5,
		"target2ArrayDisabledFrom" : 8,
		"arrows" : [],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>Nor does this.</p>"
	},
	//27
	{
		"audio" : "data/audio/rapidsearch-audio-028.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchAuxArrayHighlights" : [],
		"searchArrayLabel" : "Search string S:",
		"searchArrayDisabledFrom" : 0,
		"targetArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [],
		"target2AuxArrayValues" : [-1, -1, -1, -1, "✘"],
		"target2ArrayValues" : [-1, -1, -1, -1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"resultsArrayValues" : [-999, -999, -999, 2, 4, -999, -999, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayDisabledFrom" : 5,
		"target2ArrayDisabledFrom" : 9,
		"arrows" : [],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>Nor this.</p>"
	},
	//28
	{
		"audio" : "data/audio/rapidsearch-audio-029.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchAuxArrayHighlights" : [],
		"searchArrayLabel" : "Search string S:",
		"searchArrayDisabledFrom" : 0,
		"targetArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [],
		"target2AuxArrayValues" : [],
		"target2ArrayValues" : [-1, -1, -1, -1, -1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"resultsArrayValues" : [-999, -999, -999, 2, 4, -999, -999, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayDisabledFrom" : 5,
		"target2ArrayDisabledFrom" : 10,
		"arrows" : [],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>We have to move all the way past it before we can even begin to think about finding something.</p>"
	},
	//29
	{
		"audio" : "data/audio/rapidsearch-audio-030.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchAuxArrayHighlights" : [],
		"searchArrayLabel" : "Search string S:",
		"searchArrayDisabledFrom" : 0,
		"targetArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [],
		"target2AuxArrayValues" : [],
		"target2ArrayValues" : [-1, -1, -1, -1, -1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"resultsArrayValues" : [-999, -999, -999, 2, 4, 5, -999, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayDisabledFrom" : 5,
		"target2ArrayDisabledFrom" : 10,
		"arrows" : [{
			"start" : 0,
			"end" : 5,
			"label" : "5",
			"yShift" : 2.5
		}],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>If the first 5 characters match we are OK to bring the search 5 letters forward.</p>"
	},
	//30
	{
		"audio" : "data/audio/rapidsearch-audio-031.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchAuxArrayHighlights" : [],
		"searchArrayLabel" : "Search string S:",
		"searchArrayDisabledFrom" : 0,
		"targetArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [],
		"target2AuxArrayValues" : [],
		"target2ArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"resultsArrayValues" : [-999, -999, -999, 2, 4, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayDisabledFrom" : 6,
		"target2ArrayDisabledFrom" : 6,
		"arrows" : [],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>If the first six letters match ...</p>"
	},
	//31
	{
		"audio" : "data/audio/rapidsearch-audio-032.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchAuxArrayHighlights" : [],
		"searchArrayLabel" : "Search string S:",
		"searchArrayDisabledFrom" : 0,
		"targetArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [],
		"target2AuxArrayValues" : [],
		"target2ArrayValues" : [-1, -1, -1, -1, -1, -1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"resultsArrayValues" : [-999, -999, -999, 2, 4, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayDisabledFrom" : 6,
		"target2ArrayDisabledFrom" : 12,
		"arrows" : [{
			"start" : 0,
			"end" : 6,
			"label" : "6",
			"yShift" : 2.5
		}],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>... then we can move forward 6.</p>"
	},
	//32
	{
		"audio" : "data/audio/rapidsearch-audio-033.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchAuxArrayHighlights" : [],
		"searchArrayLabel" : "Search string S:",
		"searchArrayDisabledFrom" : 0,
		"targetArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [],
		"target2AuxArrayValues" : [],
		"target2ArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"resultsArrayValues" : [-999, -999, -999, 2, 4, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayDisabledFrom" : 7,
		"target2ArrayDisabledFrom" : 7,
		"arrows" : [],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>What about all 7? We don’t have to do anything. We have found a match in the string anyway.</p>"
	},
	//33
	{
		"audio" : "data/audio/rapidsearch-audio-034.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchAuxArrayHighlights" : [],
		"searchArrayLabel" : "Search string S:",
		"searchArrayDisabledFrom" : 0,
		"targetArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [],
		"target2AuxArrayValues" : [],
		"target2ArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"resultsArrayValues" : [-999, -999, -999, 2, 4, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayDisabledFrom" : 2,
		"target2ArrayDisabledFrom" : 2,
		"arrows" : [],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>For completeness, let’s look at the case of a mismatch after the first two characters.</p>"
	},
	//34
	{
		"audio" : "data/audio/rapidsearch-audio-035.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchAuxArrayHighlights" : [],
		"searchArrayLabel" : "Search string S:",
		"searchArrayDisabledFrom" : 0,
		"targetArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [],
		"target2AuxArrayValues" : [-1, "✘"],
		"target2ArrayValues" : [-1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"resultsArrayValues" : [-999, -999, -999, 2, 4, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayDisabledFrom" : 2,
		"target2ArrayDisabledFrom" : 2,
		"arrows" : [],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>We can see that shifting by one isn’t going to work.</p>"
	},
	//35
	{
		"audio" : "data/audio/rapidsearch-audio-036.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchAuxArrayHighlights" : [],
		"searchArrayLabel" : "Search string S:",
		"searchArrayDisabledFrom" : 0,
		"targetArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [],
		"target2AuxArrayValues" : [],
		"target2ArrayValues" : [-1, -1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"resultsArrayValues" : [-999, -999, 2, 2, 4, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayDisabledFrom" : 2,
		"target2ArrayDisabledFrom" : 4,
		"arrows" : [{
			"start" : 0,
			"end" : 2,
			"label" : "2",
			"yShift" : 2.5
		}],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>So in this case you will have to move by at least 2 before any match can happen.</p>"
	},
	//36
	{
		"audio" : "data/audio/rapidsearch-audio-037.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchAuxArrayHighlights" : [],
		"searchArrayLabel" : "Search string S:",
		"searchArrayDisabledFrom" : 0,
		"targetArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [],
		"target2AuxArrayValues" : [],
		"target2ArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"resultsArrayValues" : [-999, -999, 2, 2, 4, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayDisabledFrom" : 1,
		"target2ArrayDisabledFrom" : 1,
		"arrows" : [],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>The most common case - a failure to match on the first letter means you have to move by one.</p>"
	},
	//37 - lookup complete
	{
		"audio" : "data/audio/rapidsearch-audio-038.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchAuxArrayHighlights" : [],
		"searchArrayLabel" : "Search string S:",
		"searchArrayDisabledFrom" : 0,
		"targetArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [],
		"target2AuxArrayValues" : [],
		"target2ArrayValues" : [-1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"resultsArrayValues" : [-999, 1, 2, 2, 4, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayDisabledFrom" : 1,
		"target2ArrayDisabledFrom" : 2,
		"arrows" : [{
			"start" : 0,
			"end" : 1,
			"label" : "1",
			"yShift" : 2.5
		}],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>This gives a complete table. Notice we have to compare at least one item so the first entry is blank.</p>"
	},
	//38 - now start KMP search
	{
		"audio" : "data/audio/rapidsearch-audio-039.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"target2ArrayValues" : [],
		"arrows" : [],
		"resultsArrayValues" : [-999, 1, 2, 2, 4, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>Armed with this table we can now search the string.</p>"
	},
	//39 - now start KMP search
	{
		"audio" : "data/audio/rapidsearch-audio-040.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : ["✔", "✔", "✔", "✘"],
		"target2ArrayValues" : [],
		"arrows" : [],
		"resultsArrayValues" : [-999, 1, 2, 2, 4, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"resultsArrayHighlights" : [{
			"index" : 3,
			"color" : "yellow"
		}],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>When a mismatch occurs, we look up in the table how far to move forwards.</p>"
	},
	//39 - transpose - note: script incorrect to jump by three steps: should be 2 steps then 1 step; outcome unchanged so follow script
	{
		"audio" : "data/audio/rapidsearch-audio-041.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [],
		"target2ArrayValues" : [],
		"arrows" : [],
		"transpose" : 3,
		"resultsArrayValues" : [-999, 1, 2, 2, 4, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"resultsArrayHighlights" : [],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3>",
		"refresh" : {
			"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
			"searchArrayLabel" : "Search string S:",
			"targetArrayValues" : [-1, -1, -1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			"targetArrayLabel" : "Target string T:",
			"resultsArrayValues" : [-1, -1, -1, -999, 1, 2, 2, 4, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		}
	},
	//40 - lookup a
	{
		"audio" : "data/audio/rapidsearch-audio-042.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : [-1, -1, -1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"resultsArrayValues" : [-1, -1, -1, -999, 1, 2, 2, 4, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetAuxArrayValues" : [-1, -1, -1, "✔", "✔", "✘"],
		"target2ArrayValues" : [],
		"arrows" : [],
		"resultsArrayHighlights" : [],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>Then begin checking again.</p>"
	},
	//40 - lookup b
	{
		"audio" : "data/audio/rapidsearch-audio-043.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : [-1, -1, -1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"resultsArrayValues" : [-1, -1, -1, -999, 1, 2, 2, 4, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetAuxArrayValues" : [-1, -1, -1, "✔", "✔", "✘"],
		"target2ArrayValues" : [],
		"arrows" : [],
		"resultsArrayHighlights" : [{
			"index" : 5,
			"color" : "yellow"
		}],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>When that fails we skip forward by the amount in the table.</p>"
	},
	//41 - transpose #2
	{
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : [-1, -1, -1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [],
		"target2ArrayValues" : [],
		"arrows" : [],
		"transpose" : 2,
		"resultsArrayValues" : [-1, -1, -1, -999, 1, 2, 2, 4, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"resultsArrayHighlights" : [],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>&nbsp;</p>",
		"refresh" : {
			"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
			"searchArrayLabel" : "Search string S:",
			"targetArrayValues" : [-1, -1, -1, -1, -1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			"targetArrayLabel" : "Target string T:",
			"resultsArrayValues" : [-1, -1, -1, -1, -1, -999, 1, 2, 2, 4, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		}
	},
	//42 - lookup a
	{
		"audio" : "data/audio/rapidsearch-audio-045.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : [-1, -1, -1, -1, -1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"resultsArrayValues" : [-1, -1, -1, -1, -1, -999, 1, 2, 2, 4, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>And start again.</p>",

	},
	//43 - lookup b
	{
		"audio" : "data/audio/rapidsearch-audio-046.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : [-1, -1, -1, -1, -1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"resultsArrayValues" : [-1, -1, -1, -1, -1, -999, 1, 2, 2, 4, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetAuxArrayValues" : [-1, -1, -1, "-1", "-1", "✘"],
		"resultsArrayHighlights" : [{
			"index" : 5,
			"color" : "yellow"
		}],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>At worst when the first letter fails repeatedly we are doing no worse than the brute compare ...</p>",
	},
	//44 - transpose #3
	{
		"audio" : "data/audio/rapidsearch-audio-047.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : [-1, -1, -1, -1, -1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [],
		"resultsArrayValues" : [-1, -1, -1, -1, -1, -999, 1, 2, 2, 4, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"resultsArrayHighlights" : [{
			"index" : 5,
			"color" : "yellow"
		}],
		"transpose" : 1,
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>... and move by only one.</p>",
		"refresh" : {
			"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
			"searchArrayLabel" : "Search string S:",
			"targetArrayValues" : [-1, -1, -1, -1, -1, -1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			"targetArrayLabel" : "Target string T:",
			"resultsArrayValues" : [-1, -1, -1, -1, -1, -1, -999, 1, 2, 2, 4, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
		}
	},
	//45 - lookup (no a/b)
	{
		"audio" : "data/audio/rapidsearch-audio-048.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : [-1, -1, -1, -1, -1, -1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [-1, -1, -1, -1, -1, "-1", "✔", "✔", "✔", "✘"],
		"resultsArrayValues" : [-1, -1, -1, -1, -1, -1, -999, 1, 2, 2, 4, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"resultsArrayHighlights" : [{
			"index" : 9,
			"color" : "yellow"
		}],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>At best we move much faster; the longer the target string the faster we move.</p>"
	},
	//46 - transition (final)
	{
		"audio" : "data/audio/rapidsearch-audio-049.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : [-1, -1, -1, -1, -1, -1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [],
		"resultsArrayValues" : [-1, -1, -1, -1, -1, -1, -999, 1, 2, 2, 4, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"transpose" : 2,
		"resultsArrayHighlights" : [{
			"index" : 9,
			"color" : "yellow"
		}],
		"description" : "<h3>The Knuth-Morris-Pratt algorithm</h3><p>This continues until we skip past the end of the search string or a match is found.</p>",
		"refresh" : {
			"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
			"searchArrayLabel" : "Search string S:",
			"targetArrayValues" : [-1, -1, -1, -1, -1, -1, -1, -1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1],
			"targetArrayLabel" : "Target string T:",
			"resultsArrayValues" : [-1, -1, -1, -1, -1, -1, -1, -1, -999, 1, 2, 2, 4, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		}
	},
	//47
	{
		"audio" : "data/audio/rapidsearch-audio-050.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : [-1, -1, -1, -1, -1, -1, -1, -1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [-1, -1, -1, -1, -1, "-1", "-1", "-1", "✔", "✔", "✔", "✔", "✔", "✔", "✔"],
		"resultsArrayValues" : [],
		"description" : "<h3>Learning outcomes</h3><p>In this example you have seen that by carefully preprocessing the target string, impossible comparisons can be skipped over.</p><p>Notice that once we have prepared the table we can use it for any search string.</p>"
	},
	//48
	{
		"audio" : "data/audio/rapidsearch-audio-051.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "G", "T", "T", "G", "G", "G", "C", "G", "G"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : [-1, -1, -1, -1, -1, -1, -1, -1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [-1, -1, -1, -1, -1, "-1", "-1", "-1", "✔", "✔", "✔", "✔", "✔", "✔", "✔"],
		"resultsArrayValues" : [],
		"description" : "<h3>End</h3><p>This concludes the visualisation.</p>"
	}]
};
