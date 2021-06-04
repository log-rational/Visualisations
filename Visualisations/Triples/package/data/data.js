var data = {
    description: "Triples",
    panelColour: "#FFF",
    baseColour: "#FFF",
    backgroundColour: "#FFF",
    highlight: "#f00",

    timerPause: 40,
    checkPauseMute: 50,
    animationStepsInit: 25,

    pageCount: 25,

    tableColors: {
        foreground: "#000",
        background: "#fcfcfc",
        backgroundLeft: "#fafaff",
        text: "#000",
        highlight: "#f00"
    },
    gridSize: 6,
    arrowColor: "#f00",
    rowHighlight: "#f00",
    cellHighlight: "#fc0",
    orderMax: 21,

    pairs: ["(1,1)", "(1,2)", "(2,1)", "(3,1)", "(2,2)", "(1,3)"],

    order: [
        [1, 2, 6, 7, 15, 16],
        [3, 5, 8, 14, 17],
        [4, 9, 13, 18],
        [10, 12, 19],
        [11, 20],
        [21]
    ],

    help: "<h3>Information</h3>\
            <br/><br/> \
            <ul style='padding-right:2em;'> \
                <li>Click Next to move to the next step of the visualisation.</li> \
                <li>Click Back to move to the previous step.</li> \
                <li>Click Reset to go back to the start of the visualisation.</li> \
                <li>Click Audio to toggle the audio narration on or off.</li> \
                <li>Click on the cross button or press the escape key to hide this \
                    information.</li> \
            </ul> ",

    intro: {
        text: "In this visualisation, we will build the set of all triples of natural numbers, \
              and show that the members of the set can be placed in a one-to-one correspondence \
              with the natural numbers. \
              <p style='font-size:90%;font-style:italic;'>Click Next to start the visualisation \
              of the algorithm.</p> ",
        action: {
            headings: { a: "hide", b: "hide" },
            pairs: "hide",
            order: 0
        },
        audio: "audio/inthisvisualisation.mp3"
    },
    page2: {
        text: "To build the set of all triples of natural numbers, we will say that <i>A</i> is \
              the set of pairs of natural numbers (which we already know is countable). \
              <br/><br/> \
              So <i>A</i> is the set of pairs: {(1,1), (1,2), (2,1), (3,1), (2,2), (1,3), \
              ...} ",
        action: {
            headings: { a: "ani", b: "hide" },
            pairs: "hide",
            order: 0
        },
        audio: "audio/tobuildtheset.mp3"
    },
    page3: {
        text: "We then say that <i>B</i> is just the set of natural numbers. \
              <br/><br/> \
              So <i>B</i> is the set of: {1, 2, 3, 4, 5, \
              <i>6</i>, ...} ",
        action: {
            headings: { b: "ani" },
            pairs: "hide",
            order: 0
        },
        audio: "audio/wethensay.mp3"
    },
    page4: {
        text: "Now in every box in the grid, we put a triple, where the first two elements \
              are taken from the pair on the vertical axis, and the third element is the \
              number on the top axis. ",
        action: {
            pairs: "fadein",
            order: 0
        },
        audio: "audio/nowineverybox.mp3"
    },
    page5: {
        text: "Finally, we enumerate the squares in the grid, using the same path that we \
              used when showing that the pairs of natural numbers were countable. ",
        action: {
            order: 1
        },
        similar:20,
        audio: "audio/finallyenumerate.mp3"
    },
    sorted: {
        text: "By following this path, we can be sure that eventually every square is visited. \
              Therefore, every triple in the grid is paired off with a natural number.  \
              <br/><br/> \
              That concludes this visualisation. \
              <p style='font-size:90%;font-style:italic;'>Click Reset to start again.</p>",
        action: {
            order: 22
        },
        audio: "audio/concludes.mp3"
    },
    h5aa: {
        type: "Triples"
    }
};