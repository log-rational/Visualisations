/*jshint multistr: true */
data = {
    "description": "Merge sort visualisation.",
    "panelColour": "#FFF",
    "baseColour": "#FFF",
    "backgroundColour": "#FFF",
    "highlight": "#DDD",

    "barCount": 13,
    "timerPause": 40,
    "checkPauseMute": 12,
    "hueStart": 0,
    "hueEnd": 255,
    "goFastInit": 10000,
    "animationStepsInit": 40,
    "speedSteps": 5,
    "listLength": 6,
    "numberSetSize": 9,
    "codeWidthScale": 0.32,

    "label": {
        "left": "Sorted list A",
        "right": "Sorted list B",
        "list": "Merged list"
    },

    "code": '<div class="outerCode"> \
                <p class="code">i = 0</p> \
                <p class="code">j = 0</p> \
                <p class="code">k = 0</p> \
                <p class="code">while i &lt; len(lefthalf) and j &lt; len(righthalf):</p> \
                <div class="innerCode"> \
                    <p class="code">&nbsp;&nbsp;&nbsp;&nbsp;if lefthalf[i] &lt; righthalf[j]:</p> \
                    <p class="code">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;alist[k] = lefthalf[i]</p> \
                    <p class="code">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;i = i + 1</p> \
                    <p class="code">&nbsp;&nbsp;&nbsp;&nbsp;else:</p> \
                    <p class="code">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;alist[k] = righthalf[j]</p> \
                    <p class="code">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;j = j + 1</p> \
                    <p class="code">&nbsp;&nbsp;&nbsp;&nbsp;k = k + 1</p> \
                </div> \
                <p class="code">while i &lt; len(lefthalf):</p> \
                <div class="innerCode"> \
                    <p class="code">&nbsp;&nbsp;&nbsp;&nbsp;alist[k] = lefthalf[i]</p> \
                    <p class="code">&nbsp;&nbsp;&nbsp;&nbsp;i = i + 1</p> \
                    <p class="code">&nbsp;&nbsp;&nbsp;&nbsp;k = k + 1</p> \
                </div> \
                <p class="code">while j &lt; len(righthalf):</p> \
                <div class="innerCode"> \
                    <p class="code">&nbsp;&nbsp;&nbsp;&nbsp;alist[k] = righthalf[j]</p> \
                    <p class="code">&nbsp;&nbsp;&nbsp;&nbsp;j = j + 1</p> \
                    <p class="code">&nbsp;&nbsp;&nbsp;&nbsp;k = k + 1</p> \
                </div> \
            </div>',


    "help": "<h2>Information</h2> \
            <ul style='padding-right:2em;'> \
                <li>Click Merge to begin the sorting visualisation.</li> \
                <li>Click Pause to pause the visualisation and then Resume \
                    to continue.</li> \
                <li>Click Fast to speed up the visualisation. Then click \
                    Slow to go back to normal speed.</li> \
                <li>Click Reset to go back to the start of the visualisation \
                    with the items in a new random order.</li> \
                <li>Click Audio to toggle the audio narration on or off.</li> \
                <li>Click on the cross button or press the escape key to hide this information.</li> \
            </ul>",

    "intro": {
        "text": "Merging two sorted lists \
                <br/><br/> \
                <p style='font-size:90%;font-style:italic;'>Click Merge to start the \
                visualisation of the sorting algorithm.</p>",
        "audio": "audio/intro.mp3"
    },
    "begin": {
        "text":"In this visualisation, we will look at one particular part of the merge \
                sort algorithm. We’ll focus on how it merges two lists that are already \
                sorted. This part of the algorithm is shown here. We are going to mark the \
                items with these red borders to indicate they are the ones under \
                consideration. They correspond to the variables i and j in the code extract. \
                At each step we shall compare the two marked elements representing i and j \
                and  identify the smaller as the one to add to the merged list.",
        "audio": "audio/begin.mp3"
    },
    "start": {
        "text":"We start by looking at items at the beginning of each of the two \
                sorted lists. ",
        "audio": "audio/start.mp3"
    },
    "move_left": {
        "text": "In this case the item from list A is the lowest so it gets put into the merged list. ",
        "audio": "audio/move_left.mp3"
    },
    "move_right": {
        "text": "In this case the item from list B is the lowest so it gets put into the merged list. ",
        "audio": "audio/move_right.mp3"
    },
    "move_rest_left": {
        "text":"So in this case the item from list A has no item left from list B to compare \
                with, so it's the next item in the list. ",
        "audio": "audio/move_rest_left.mp3"
    },
    "move_rest_right": {
        "text":"In this case the item from list B has no item left from list A to compare \
                with and so is the next item in the list. ",
        "audio": "audio/move_rest_right.mp3"
    },
    "continue_left": {
        "text": "The first marker moves forward.",
        "audio": "audio/continue_left.mp3"
    },
    "continue_right": {
        "text": "The second marker moves forward.",
        "audio": "audio/continue_right.mp3"
    },
    "fast": {
        "text": "Now moving through the rest quickly.",
        "audio": "audio/fast.mp3"
    },
    "sorted": {
        "text":"We continue until both the marker for sorted list A and the marker \
                for sorted list B has scanned its list from the beginning till end. \
                <br/><br/> \
                This ends the visualisation. \
                <br/><br/><p style='font-size:90%;font-style:italic;'>Click Reset to start with new random lists.</p>",
        "audio": "audio/sorted.mp3"
    },
    "h5aa": {
        "type": "MergeSort"
    }
};
