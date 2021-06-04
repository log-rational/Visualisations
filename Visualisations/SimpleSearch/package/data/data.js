data = {
	"title" : "<h2>Simple string searching</h2>",
	"info" : "<h2>Information</h2><ul><li>Click Next to go to the next step.</li><li>Click Previous to go to the preceding step.</li><li>Select Reset to go back to the start of the visualisation. The steps will vary depending on whether the Random checkbox is checked.</li><li>Toggle Random to select the main script or one based on randomised input.</li><li>Press Audio to toggle audio narration on or off. Note that no audio is available for randomised input.</li></ul>",
	"startOffset" : 0,
	"searchAux" : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
	"steps" : [
	//0
	{
		"audio" : "data/audio/simplesearch-audio-001.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "A", "G", "T"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [],
		"searchArrayHighlights" : [],
		"targetArrayHighlights" : [],
		"targetAuxArrayHighlights" : [],
		"auxLabel" : "",
		"description" : "<p>This section will introduce the basic string search strategy.</p>"
	},
	//1
	{
		"audio" : "data/audio/simplesearch-audio-002.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "A", "G", "T"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [],
		"searchArrayHighlights" : [],
		"targetArrayHighlights" : [],
		"targetAuxArrayHighlights" : [],
		"auxLabel" : "",
		"description" : "<p>In this case we are searching one string for a DNA sequence of the other.</p><p>Let’s consider two strings: the search string <i>S</i> – the string we are searching – and the target string <i>T</i>, the thing we are looking for.</p><p>Clearly the target must be smaller than the source.</p>"
	},
	//2
	{
		"audio" : "data/audio/simplesearch-audio-003.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "A", "G", "T"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : ["✔"],
		"searchArrayHighlights" : [],
		"targetArrayHighlights" : [{
			"index" : 0,
			"color" : "rgba(255, 255, 0, 0.35)"
		}],
		"targetAuxArrayHighlights" : [],
		"auxLabel" : "",
		"description" : "<p>We begin at the beginning of each string.</p>"
	},
	//3
	{
		"audio" : "data/audio/simplesearch-audio-004.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "A", "G", "T"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : ["✔", "✔"],
		"searchArrayHighlights" : [],
		"targetArrayHighlights" : [{
			"index" : 1,
			"color" : "rgba(255, 255, 0, 0.35)"
		}],
		"targetAuxArrayHighlights" : [],
		"auxLabel" : "",
		"description" : "<p>We then go down each letter of the target string looking at the corresponding letter in the search string.</p>"
	},
	//4
	{
		"audio" : "data/audio/simplesearch-audio-005.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "A", "G", "T"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : ["✔", "✔", "✔"],
		"searchArrayHighlights" : [],
		"targetArrayHighlights" : [{
			"index" : 2,
			"color" : "rgba(255, 255, 0, 0.35)"
		}],
		"targetAuxArrayHighlights" : [],
		"auxLabel" : "",
		"description" : ""
	},
	//5 - mismatch
	{
		"audio" : "data/audio/simplesearch-audio-006.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "A", "G", "T"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : ["G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : ["✔", "✔", "✔", "✘"], //hex val? ✗✘
		"searchArrayHighlights" : [],
		"targetArrayHighlights" : [{
			"index" : 3,
			"color" : "red"
		}],
		"targetAuxArrayHighlights" : [],
		"auxLabel" : "",
		"description" : "<p>We continue until all of the letters in the target match the search or a mismatch in letters is found.</p>"
	},
	//6 - move along one
	{
		"audio" : "data/audio/simplesearch-audio-007.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "A", "G", "T"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : [-1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [],
		"searchArrayHighlights" : [],
		"targetArrayHighlights" : [],
		"targetAuxArrayHighlights" : [],
		"auxLabel" : "",
		"description" : "<p>If a mismatch is found then the target string moves along one letter and the process is repeated.</p>"
	},
	//7
	{
		"audio" : "data/audio/simplesearch-audio-008.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "A", "G", "T"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : [-1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [-1, "✘"], //hex val? ✗✘
		"searchArrayHighlights" : [],
		"targetArrayHighlights" : [{
			"index" : 1,
			"color" : "red"
		}],
		"targetAuxArrayHighlights" : [],
		"auxLabel" : "",
		"description" : "<p>If this fails the process is repeated.</p>"
	},
	//8 - offset: 2
	{
		"audio" : "data/audio/simplesearch-audio-009.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "A", "G", "T"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : [-1, -1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [-1, -1, "✔", "✘"], //hex val? ✗✘
		"searchArrayHighlights" : [],
		"targetArrayHighlights" : [{
			"index" : 2,
			"color" : "rgba(255, 255, 0, 0.35)"
		}, {
			"index" : 3,
			"color" : "red"
		}],
		"targetAuxArrayHighlights" : [],
		"auxLabel" : "",
		"description" : "<p>This process continues ...</p>",
		"animation" : {
			"fast" : true
		}
	},
	//9 - offset: 3
	{
		"audio" : "data/audio/simplesearch-audio-010.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "A", "G", "T"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : [-1, -1, -1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [-1, -1, -1, "✔", "✔", "✘"], //hex val? ✗✘
		"searchArrayHighlights" : [],
		"targetArrayHighlights" : [{
			"index" : 3,
			"color" : "rgba(255, 255, 0, 0.30)"
		}, {
			"index" : 4,
			"color" : "rgba(255, 255, 0, 0.35)"
		}, {
			"index" : 5,
			"color" : "red"
		}],
		"targetAuxArrayHighlights" : [],
		"auxLabel" : "",
		"description" : "<p>This process continues ...</p>",
		"animation" : {
			"fast" : true
		}
	},
	//10 - offset: 4
	{
		"audio" : "data/audio/simplesearch-audio-011.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "A", "G", "T"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : [-1, -1, -1, -1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [-1, -1, -1, -1, "✘"], //hex val? ✗✘
		"searchArrayHighlights" : [],
		"targetArrayHighlights" : [{
			"index" : 4,
			"color" : "red"
		}],
		"targetAuxArrayHighlights" : [],
		"auxLabel" : "",
		"description" : "<p>This process continues ...</p>",
		"animation" : {
			"fast" : true
		}
	},
	//11 - offset: 5
	{
		"audio" : "data/audio/simplesearch-audio-012.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "A", "G", "T"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : [-1, -1, -1, -1, -1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [-1, -1, -1, -1, -1, "✘"], //hex val? ✗✘
		"searchArrayHighlights" : [],
		"targetArrayHighlights" : [{
			"index" : 5,
			"color" : "red"
		}],
		"targetAuxArrayHighlights" : [],
		"auxLabel" : "",
		"description" : "<p>This process continues ...</p>",
		"animation" : {
			"fast" : true
		}
	},
	//12 - offset: 6
	{
		"audio" : "data/audio/simplesearch-audio-013.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "A", "G", "T"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : [-1, -1, -1, -1, -1, -1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [-1, -1, -1, -1, -1, -1, "✔", "✔", "✔", "✘"], //hex val? ✗✘
		"searchArrayHighlights" : [],
		"targetArrayHighlights" : [{
			"index" : 6,
			"color" : "rgba(255, 255, 0, 0.25)"
		}, {
			"index" : 7,
			"color" : "rgba(255, 255, 0, 0.30)"
		}, {
			"index" : 8,
			"color" : "rgba(255, 255, 0, 0.35)"
		}, {
			"index" : 9,
			"color" : "red"
		}],
		"targetAuxArrayHighlights" : [],
		"auxLabel" : "",
		"description" : "<p>This process continues ...</p>",
		"animation" : {
			"fast" : true
		}
	},
	//13 - offset: 7
	{
		"audio" : "data/audio/simplesearch-audio-014.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "A", "G", "T"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : [-1, -1, -1, -1, -1, -1, -1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [-1, -1, -1, -1, -1, -1, -1, "✘"],
		"searchArrayHighlights" : [],
		"targetArrayHighlights" : [{
			"index" : 7,
			"color" : "red"
		}],
		"targetAuxArrayHighlights" : [],
		"auxLabel" : "",
		"description" : "<p>This process continues ...</p>",
		"animation" : {
			"fast" : true
		}
	},
	//14 - offset: 8 - match made
	{
		"audio" : "data/audio/simplesearch-audio-015.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "A", "G", "T"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : [-1, -1, -1, -1, -1, -1, -1, -1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [-1, -1, -1, -1, -1, -1, -1, -1, "✔", "✔", "✔", "✔", "✔", "✔", "✔"],
		"searchArrayHighlights" : [],
		"targetArrayHighlights" : [{
			"index" : 8,
			"color" : "rgba(255, 255, 0, 0.1)"
		}, {
			"index" : 9,
			"color" : "rgba(255, 255, 0, 0.15)"
		}, {
			"index" : 10,
			"color" : "rgba(255, 255, 0, 0.2)"
		}, {
			"index" : 11,
			"color" : "rgba(255, 255, 0, 0.25)"
		}, {
			"index" : 12,
			"color" : "rgba(255, 255, 0, 0.3)"
		}, {
			"index" : 13,
			"color" : "rgba(255, 255, 0, 0.35)"
		}, {
			"index" : 14,
			"color" : "rgba(255, 255, 0, 1.0)"
		}],
		"glow" : [8, 9, 10, 11, 12, 13, 14],
		"targetAuxArrayHighlights" : [],
		"auxLabel" : "",
		"description" : "<p>... until every letter of the target string matches up with the search string.</p>"
	},
	//15
	{
		"audio" : "data/audio/simplesearch-audio-016.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "A", "G", "T"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : [-1, -1, -1, -1, -1, -1, -1, -1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [-1, -1, -1, -1, -1, -1, -1, -1, "✔", "✔", "✔", "✔", "✔", "✔", "✔"],
		"searchArrayHighlights" : [],
		"targetArrayHighlights" : [],
		"glow" : [8, 9, 10, 11, 12, 13, 14],
		"targetAuxArrayHighlights" : [],
		"auxLabel" : "",
		"description" : "<p>In most cases we are looking for the position which matches. So when all the elements of the target appear in order in the source then the algorithm stops.</p><p>The other case is when we are looking for all matches, in which case the algorithm stops when the end of the target reaches the end of the search string.</p>"
	},
	//16
	{
		"audio" : "data/audio/simplesearch-audio-017.mp3",
		"clearArray" : true,
		"searchArrayValues" : ["G", "T", "G", "G", "T", "A", "G", "T", "G", "T", "G", "C", "T", "A", "G", "A", "G", "T"],
		"searchArrayLabel" : "Search string S:",
		"targetArrayValues" : [-1, -1, -1, -1, -1, -1, -1, -1, "G", "T", "G", "C", "T", "A", "G", -1, -1, -1],
		"targetArrayLabel" : "Target string T:",
		"targetAuxArrayValues" : [-1, -1, -1, -1, -1, -1, -1, -1, "✔", "✔", "✔", "✔", "✔", "✔", "✔"],
		"searchArrayHighlights" : [],
		"targetArrayHighlights" : [],
		"glow" : [8, 9, 10, 11, 12, 13, 14],
		"targetAuxArrayHighlights" : [],
		"auxLabel" : "",
		"description" : "<h3>Summary</h3><p>In this visualisation you have seen how a simple string matching looks at each possible position in turn until a match is found.</p>"
	}]
};
