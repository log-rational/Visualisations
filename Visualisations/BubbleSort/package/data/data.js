colors = {
    "code": {
        "O": "#86c3d3",
        "N": "#df797c"
    }
};

data = {
    "description": "Bubble sort visualisation.",
    "panelColour": "#FFF",
    "baseColour": "#FFF",
    "backgroundColour": "#FFF",

    "barCount": 12,
    "timerPause": 40,
    "checkPauseMute": 50,
    "hueStart": 0,
    "hueEnd": 255,
    "goFastInit": 13,
    "animationStepsInit": 20,
    "speedSteps": 5,
    "codeWidthScale": 0.42,

    "algorithmCode": 'def bubbleSort(alist):<br/>\n\
                        <div class="outerCode">\n\
                            <p class="code">&nbsp;&nbsp;&nbsp;&nbsp;for passnum in range(len(alist)-1,0,-1):</p>\n\
                            <div class="innerCode">\n\
                                <p class="code">&nbsp;&nbsp;&nbsp;&nbsp;for i in range(passnum):</p>\n\
                                <p class="code">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if alist[i]>alist[i+1]:</p>\n\
                                <p class="code">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;temp = alist[i]</p>\n\
                                <p class="code">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;alist[i] = alist[i+1]</p>\n\
                                <p class="code">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;alist[i+1] = temp</p>\n\
                            </div>\n\
                        </div>\n\
                    ',
    "algorithmGraph": 'def bubbleSort(alist):<br/>\n\
                        <div class="outerCode">\n\
                            <p class="graph">&nbsp;&nbsp;&nbsp;&nbsp;for passnum in range(len(alist)-1,0,-1):</p>\n\
                            <div class="innerCodeGraph">\n\
                                <p class="graph">&nbsp;&nbsp;&nbsp;&nbsp;for i in range(passnum):</p>\n\
                                <p class="graph">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if alist[i]>alist[i+1]:</p>\n\
                                <p class="graph">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;temp = alist[i]</p>\n\
                                <p class="graph">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;alist[i] = alist[i+1]</p>\n\
                                <p class="graph">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;alist[i+1] = temp</p>\n\
                            </div>\n\
                        </div>\n\
                    ',
    "graphInstructions": '<p style="font-size:85%;font-style:italic;">Mouse over or \n\
                        touch the graph to show the nearest graph values at that point.</p>',
    "instructions": "In this visualisation you will see bubble sort in action.\n\
                    Bubble sort was first written about by Edward Harry Friend \n\
                    all the way back in 1956. He used the term exchange sort \n\
                    to describe it. <br/><br/>\n\
                    Bubble sort has the advantage of being simple but as \n\
                    Computer Science legend Donald Knuth said, '<i>In short, the \n\
                    bubble sort seems to have nothing to recommend it, except a \n\
                    catchy name and the fact that it leads to some interesting \n\
                    theoretical problems.</i>'\n\
                    <br/><br/>\n\
                    <p style='font-size:85%;font-style:italic;'>Click Sort to start \n\
                    the simulation of the sorting algorithm.</p>",

    "help": "<h2>Information</h2>\n\
            <ul style='padding-right:2em;'>\n\
                <li>Click Sort to begin the sorting animation.</li>\n\
                <li>Click Pause to pause the visualisation and then Resume to continue.</li> \n\
                <li>Click Fast to go through the rest of the sort quickly.</li> \n\
                <li>Click Reset to reorder the items randomly.</li>\n\
                <li>Click on Big-O after you have gone through the sort simulation for \n\
                more information on the algorithm code.</li>\n\
                <li>Click on Next when available to move on to the next section.</li>\n\
                <li>Click on Back when available to repeat the previous section.</li>\n\
                <li>Click on the Audio checkbox to toggle the audio on and off.</li>\n\
                <li>Click on the cross button or press the escape key to hide this information.</li>\n\
            </ul>",
    "intro": {
        "audio":  "audio/intro.mp3"
    },
    "first": {
		"text": "Here we see the list of items to be sorted. In this case we want \n\
		to get all the rectangles in height order. To begin with we look at the \n\
		first pair. Are they sorted? ",
		"yes": "In this case they are, so we move on to the next pair.",
		"no": "In this case the answer is ‘No’, so we swap them.",
		"audioYes": "audio/first_yes.mp3",
		"pauseYes": 385,
		"audioNo": "audio/first_no.mp3",
		"pauseNo": 377
    },
    "next": {
        "text1": "Checking the next pair, we ask again, are they in order?",
        "text2": "We check the next pair, are they in order?",
        "text3": "We check the next pair."
    },
    "yes": {
        "text": "Yes are they in order, so we move to the next pair.",
        "text1": "Yes they are in order, so we move to the next pair.",
        "audio1": "audio/yes1.mp3",
        "pause1": 196,
        "text2": "Yes they are in order, so we move to the next pair.",
        "audio2": "audio/yes2.mp3",
        "pause2": 169,
        "text3": "Yes, they are in order, so we move to the next pair.",
        "audio3": "audio/yes3.mp3",
        "pause3": 156
    },
    "no": {
        "text": "No; so we swap them.",
        "text1": "No; so we swap them.",
        "audio1": "audio/no1.mp3",
        "pause1": 170,
        "text2": "No; so we swap them.",
        "audio2": "audio/no2.mp3",
        "pause2": 144,
        "text3": "No, they're not in order; so we swap them.",
        "audio3": "audio/no3.mp3",
        "pause3": 140
    },
    "carrieson": {
        "text": "This carries on until the end of the list is reached.",
        "audio": "audio/carrieson.mp3",
        "pause": 104
    },
    "fast": {
        "text": "Now moving through the rest quickly.",
        "audio": "audio/fast.mp3",
        "pause": ""
    },
    "sorted": {
        "text": 'Basic bubble sort will continue until it has done as many \n\
                passes as the list is long minus one. Short bubble sort, as \n\
                illustrated here, stops after the first pass that requires no \n\
                swapping. \n\
                <br/><br/>\n\
                <p style="font-size:85%;font-style:italic;">Click Reset to start \n\
                with a new random list, or click Big-O to see more explanation of \n\
                the algorithm code.</p>',
        "audio": "audio/sorted.mp3",
        "pause": 150
    },
    "nextSweep": {
        "text": "The algorithm then returns to the beginning of the list. As \n\
                the process continues you will see large values drifting or \n\
                bubbling to the right and low values drifting to the left. ",
		"audio": "audio/nextsweep.mp3",
		"pause": 292
    },
    "code": {
        "text": 'Here is the code for bubble sort. We use the full version rather \n\
                than the short one because its complexity is easier to understand. \n\
                The complexity of the two versions is the same.<br/><br/>\n\
                You can see there are two loops: the outer, red and the inner, nested \n\
                blue loop.\n\
                <br/><br/><p style="font-size:85%;font-style:italic;">Click Next to \n\
                move on or Back for the sort simulation.</p>',
		"audio": "audio/code.mp3",
		"pause": 292
    },
    "graph": {
        "text": 'With a list of <i>n</i> items, the outer loop does <i>n</i>-1 \n\
                passes. Recall that range(<i>n</i>-1, 0, -1) generates the \n\
                numbers <i>n</i>-1, <i>n</i>-2, <i>n</i>-3, …, 1. For the \n\
                <i>n</i>-<i>m</i><sup>th</sup> pass of the outer loop, the \n\
                inner loop does <i>n</i>-<i>m</i> comparisons. This adds up to \n\
                ½ <i>n</i><sup>2</sup> – ½ <i>n</i> comparisons in total (since \n\
                the sum of the first <i>n</i>-1 integers is ½ \n\
                <i>n</i><sup>2</sup> + ½ <i>n</i> – <i>n</i>). The dominant term \n\
                here is ½ <i>n</i><sup>2</sup>, and so, ignoring the coefficient ½, \n\
                bubble sort is \n\
                <i>O</i>(<i>n</i><sup>2</sup>). That is, assuming that we take \n\
                comparisons as the basic unit of computation.\n\
                <br/><br/>\n\
                This concludes this visualisation.',
		"audio": "audio/graph.mp3",
		"pause": 292
    },
    "colors": {
        "code": colors.code
    },
    "h5aa": {
        "type": "BubbleSort"
    }
};
