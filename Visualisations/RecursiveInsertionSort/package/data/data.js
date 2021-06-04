data = {
    "description": "Recursive insertion sort visualisation.",
    "panelColour": "#FFF",
    "baseColour": "#FFF",
    "backgroundColour": "#FFF",
    "highlight": "#DDD",

    "barCount": 12,
    "timerPause": 40,
    "checkPauseMute": 12,
    "hueStart": 0,
    "hueEnd": 255,
    "goFastInit": 10000,
    "animationStepsInit": 20,
    "speedSteps": 5,

    "help": "<h2>Information</h2>\n\
            <ul style='padding-right:2em;'>\n\
                <li>Click Sort to begin the sorting visualisation.</li>\n\
                <li>Click Pause to pause the visualisation and then Resume \n\
                    to continue.</li> \n\
                <li>Click Fast to speed up the visualisation. Then click \n\
                    Slow to go back to normal speed.</li> \n\
                <li>Click Reset to go back to the start of the visualisation \n\
                    with the items in a new random order.</li>\n\
                <li>Click Audio to toggle the audio narration on or off.</li>\n\
                <li>Click on the cross button or press the escape key to hide this information.</li>\n\
            </ul>",

    "intro": {
        "text": "In this visualisation we will see the recursive insertion sort. \n\
                <br/><br/>\n\
                <p style='font-size:85%;font-style:italic;'>Click Sort to start \n\
                the simulation of the sorting algorithm.</p>",
        "audio":  "audio/intro.mp3"
    },
    "begin": {
        "text": "We begin with the unsorted list. Recursive insertion sort is called \n\
                for this list. The algorithm then applies the recursive step. It \n\
                recursively calls itself on the sub-list that consists of the entire \n\
                list minus the final item.",
        "audio": "audio/begin.mp3",
        "pause": 9999
    },
    "recurse11": {
        "text": "The algorithm repeatedly applies the recursive step. Each time \n\
                recursive insertion sort is called, the list on which it is called \n\
                is one item shorter. The items that are not part of the new recursive \n\
                call are greyed out.",
        "audio": "audio/recurse11.mp3",
        "pause": 9999
    },
    "recurse10": {
        "text": "So, the next time recursive insertion sort is called, the list is \n\
                again one item shorter. ",
        "audio": "audio/recurse10.mp3",
        "pause": 9999
    },
    "recurse9": {
        "text": "This continues following the recursive step, reducing the list \n\
                by one each time.",
        "audio": "audio/recurse9.mp3",
        "pause": 9999
    },
    "recurse1": {
        "text": "Eventually, we're left with a list of only a single item. A list \n\
                with only a single item must be sorted – so we have reached \n\
                the base case. ",
        "audio": "audio/recurse1.mp3",
        "pause": 9999
    },
    "sort1": {
        "text": "We are going to show the sorted area with a grey background.",
        "audio": "audio/sort1.mp3",
        "pause": 9999
    },
    "unwind2": {
        "text": "The sorted area is expanded by one item. ",
        "audio": "audio/unwind2.mp3",
        "pause": 9999
    },
    "sort2": {
        "text": "From here on, the recursion unwinds. The algorithm sees a sorted \n\
                list. There is an item that is adjacent to the sorted area that now \n\
                has to be put into its correct place in the sorted area.",
        "audio": "audio/sort2.mp3",
        "pause": 9999
    },
    "sort3": {
        "text": "Next, the recursion unwinds further. The next item that is adjacent \n\
                to the sorted area is moved to the correct position. ",
        "audio": "audio/sort3.mp3",
        "pause": 9999
    },
    "save": {
        "text": "Like classic \n\
                insertion sort this is done in two steps. First the items that are \n\
                greater than the new item are shifted to the right. ",
        "audio": "audio/save.mp3",
        "pause": 110
    },
    "retrieve": {
        "text": "Second, the item is moved into the open position.",
        "audio": "audio/retrieve.mp3",
        "pause": 75
    },
    "sort4": {
        "text": "This continues popping stack frames off the stack as it goes.",
        "audio": "audio/sort4.mp3",
        "pause": 9999
    },

    "fast": {
        "text": "Now moving through the rest quickly.",
        "audio": "audio/fast.mp3",
        "pause": ""
    },
    "sorted": {
        "text": "Eventually the list returns to the original call of recursive insertion \n\
                sort. At this point the sorted area includes all the items except for \n\
                the last one. The final step is to insert the last item at the correct \n\
                position in the sorted area. This results in a fully sorted list.\n\
                <br/><br/><p style='font-size:85%;font-style:italic;'>Click Reset to \n\
                start with a new random list.</p>",
        "audio": "audio/sorted.mp3",
        "pause": 300
    },
    "h5aa": {
        "type": "RecursiveInsertionSort"
    }
};
