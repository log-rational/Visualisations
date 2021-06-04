data = {
    "description": "Instertion sort visualisation.",
    "panelColour": "#FFF",
    "baseColour": "#FFF",
    "backgroundColour": "#FFF",
    "highlight": "#DDD",

    "barCount": 12,
    "timerPause": 40,
    "checkPauseMute": 25,
    "hueStart": 0,
    "hueEnd": 255,
    "goFastInit": 33,
    "animationStepsInit": 20,
    "speedSteps": 5,

    "instructions": 'In this visualisation you will see insertion sort in \
                    action. \
                    <br/><br/> \
                    <p style="font-size:85%;font-style:italic;">Click Sort to start \
                    the simulation of the sorting algorithm.</p>',

    "help": "<h2>Information</h2> \
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
        "audio": "audio/intro.mp3"
    },
    "first": {
        "text": "We begin with the same list as before except we have an area \
                in the list which is already sorted. ",
        "audio": "audio/first.mp3",
        "pause": 200
    },
    "second": {
        "text": "This sorted area can be at the front or the back of the list, \
                it doesn’t matter. We choose the front.",
        "audio": "audio/second.mp3",
        "pause": 200
    },
    "holding": {
        "text": "Now we put the next item to be sorted into a holding area to the \
                right of the sorted area. Let’s call the item in the holding area \
                the ‘current item’. ",
        "audio": "audio/holding.mp3",
        "pause": 170
    },
    "current": {
        "text": "Then we move through the sorted area, from right \
                to left, shifting all the elements that are greater than the current \
                item to the right. ",
        "audio": "audio/current.mp3",
        "pause": 150
    },
    "nomove": {
        "text": "Then we move through the sorted area, from right \
                to left, shifting all the elements that are greater than the current \
                item to the right. In this simple case the current item is greater \
                than the single item in the sorted part, so no shifting is necessary.",
        "audio": "audio/no_move.mp3",
        "pause": 450
    },
    "vacant": {
        "text": "Once we have found the right place for the current item in the \
                sorted area, we move it straight into the vacant space that has \
                been created for it. ",
        "audio": "audio/vacant.mp3",
        "pause": 170
    },
    "next": {
        "text": "Let’s consider the next item.  It is moved to the holding area. Next \
                we check the items in the sorted area for the first item which is \
                smaller than the current item. Remember that the current item is the \
                one in the holding area. ",
        "audio": "audio/next.mp3",
        "pause": 170
    },
    "proceed": {
        "text": "We proceed with the next item, making it the current item. Then we \
                look in the sorted area for the first item that is smaller than the \
                current item. ",
        "audio": "audio/proceed.mp3",
        "pause": 170
    },
    "again": {
        "text": "The next item is put into the holding area. And again we look in the \
                sorted area for the first item that is smaller than the current item. ",
        "audio": "audio/again.mp3",
        "pause": 170
    },
    "again2": {
        "text": "The next item is moved into the holding area. And again we look in \
                the sorted area for the first item that is smaller than the current \
                item in the holding area.  ",
        "audio": "audio/again2.mp3",
        "pause": 170
    },
    "continue": {
        "text": "We continue shifting items in the sorted area to the right until the \
                current item is larger than the item that is being checked. ",
        "audio": "audio/continue.mp3",
        "pause": 170
    },
    "point": {
        "text": "At this point, we move the current item into the position that has \
                become available.",
        "audio": "audio/point.mp3",
        "pause": 120
    },
    "repeat": {
        "text": "We repeat until all the items in the list are part of the sorted area.",
        "audio": "audio/repeat.mp3",
        "pause": 50
    },
    "fast": {
        "text": "Now moving through the rest quickly.",
        "audio": "audio/fast.mp3",
        "pause": ""
    },
    "sorted": {
        "text": "This concludes the visualisation of insertion sort. \
                <br/><br/> \
                <p style='font-size:85%;font-style:italic;'>Click Reset to \
                start with a new random list.</p>",
        "audio": "audio/sorted.mp3",
        "pause": ""
    },
    "notice": {
        "text": "Notice that what the sorted white sub lists is doing is saving \
                on unnecessary comparisons. ",
        "audio": "audio/notice.mp3",
        "pause": 150
    },
    "h5aa": {
        "type": "InsertionSort"
    }
};
