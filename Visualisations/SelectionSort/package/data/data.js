/*jshint multistr: true */
data = {
    "description": "Selection sort visualisation.",
    "panelColour": "#FFF",
    "baseColour": "#FFF",
    "backgroundColour": "#FFF",
    "highlight": "#DDD",

    "barCount": 12, // number of coloured bars to sort
    "frameTime": 40, // normal timer pause (40 to give 25 frames a second)
    "pauseTimeMute": 25, // the general pause count for when audio is off
    "hueStart": 0, // the starting hue for the smallest bar
    "hueEnd": 255, // the end hue for the largest bar - colours are calculated in between
    "goFastInit": 10000, // the inital number of the step before going fast - usually then set by the Fast button
    "animationStepsInit": 20, // Number of discrete steps used to animate the swap
    "speedSteps": 5, // Number of steps for animation when sped up
    "codeWidthScale": 0.4,

    "help":"<h2>Information</h2> \
            <ul style='padding-right:2em;'> \
                <li>Click Sort to begin the sorting visualisation.</li> \
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
        "audio": "audio/intro.mp3",
        "text": "In this visualisation you will see selection sort in action. \
                <br/><br/> \
                <p style='font-size:90%;font-style:italic;'>Click Sort to start the simulation of the sorting algorithm.</p>"
    },
    "first": {
        "text":"For this algorithm we have three markers. The right-most marker, \
                in red, is the position we want to fill with the largest item \
                in the list. The left-most is the position of the largest known \
                value, in blue, and the orange marker is the item we are \
                considering. The algorithm is simple. Look for the largest element \
                in the list and put it in the next slot to fill. ",
        "audio": "audio/first.mp3",
        "pause": 9999
    },
    "second": {
        "text":"We start with the item encountered on the \
                left. The location marker in orange tests to see if this is the \
                largest item so far. As this is the first item it is \
                automatically the largest.",
        "audio": "audio/second.mp3",
        "pause": 9999
    },
    "third": {
        "text":"The orange position marker now moves up one to check if the next \
                item is largest so far. ",
        "yesText":" It is so the blue maximum position marker is moved to point \
                    to that item. ",
        "noText":" It isn't so the blue maximum position marker stays where it is \
                  and the orange marker moves on. ",
        "yesAudio": "audio/thirdyes.mp3",
        "noAudio": "audio/thirdno.mp3",
        "yesPause": 9999,
        "noPause": 9999
    },
    "fourth": {
        "text":"The orange position marker now continues sweeping up looking for \
                an even larger item.",
        "audio": "audio/fourth.mp3",
        "pause": 9999
    },
    "lastInSweep": {
        "text":"Once we reach the slot marker we know the largest item in the \
                list is pointed to by the blue maximum marker. So the item can \
                be swapped.",
        "audio": "audio/lastinsweep.mp3",
        "pause": 9999
    },
    "nextLargest": {
        "text": "The next largest item is found and swapped for the top of the list. ",
        "audio": "audio/nextlargest.mp3",
        "pause": 9999
    },
    "nextSweep2": {
        "text":"Once found, the sorted area expands. The next-slot-to-fill marker \
                in red moves to the left and the search begins again. ",
        "audio": "audio/nextsweep2.mp3",
        "pause": 9999
    },
    "next": {
        "text": "Moving on to the next one, is this larger than the current largest?"
    },
    "found": {
        "text":"Yes, we find a new largest item and it is now highlighted with \
                the blue arrow."
    },
    "notFound": {
        "text": "No, it's smaller so the orange arrow continues."
    },
    "swap": {
        "text":"We have found the largest item so it is swapped with the one \
            in the current position."
    },
    "noSwap": {
        "text":"The largest item is already in place and therefore no swap \
                is necessary."
    },
    "fast": {
        "text": "Now moving through the rest quickly.",
        "audio": "audio/fast.mp3",
        "pause": 9999
    },
    "sorted": {
        "text":"When the red next-slot-to-fill marker reaches the beginning of the \
                list, the algorithm ends. \
                <br/><br/> \
                This ends the visualisation. \
                <br/><br/>\
                <p style='font-size:90%;font-style:italic;'>Click Reset to start with \
                a new random list.</p>",
        "audio": "audio/sorted.mp3",
        "pause": 9999
    },
    "nextSweep": {
        "text":"The next slot-marker in red is moved to the bar on the left. Effectively \
                it marks the beginning of the sorted area with the grey \
                background. The largest marker and the current marker are reset \
                back to the beginning and the algorithm continues from the \
                start. ",
        "audio": "audio/nextsweep.mp3",
        "pause": 9999
    },
    "last": {
        "text":"The blue arrow has to go to the end to be sure it has found the \
                largest."
    },

    "h5aa": {
        "type": "SelectionSort"
    }
};
