var data = {
    description: "Countability",
    panelColour: "#FFF",
    baseColour: "#FFF",
    backgroundColour: "#FFF",
    highlight: "#f00",

    timerPause: 40,
    checkPauseMute: 50,
    animationStepsInit: 25,

    pageCount: 27,

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
        text: "In this visualisation, we will show how to set up a one-to-one correspondence \
              between the natural numbers and the Cartesian product of two countable, infinite \
              sets, which we will call <i>A</i> and <i>B</i>.\
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
        text: "First, we set up a grid containing all the members of <i>A</i> × <i>B</i>. \
              <br/><br/> \
              Let’s say <i>A</i> = {<i>a</i><sub>1</sub>, <i>a</i><sub>2</sub>, <i>a</i><sub>3</sub>, \
              <i>a</i><sub>4</sub>, <i>a</i><sub>5</sub>, <i>a</i><sub>6</sub>, ...} \
              <br/><br/> \
              We put the members of <i>A</i> along one side of the grid.",
        action: {
            headings: { a: "ani", b: "hide" },
            pairs: "hide",
            order: 0
        },
        audio: "audio/firstwewilsetup.mp3"
    },
    page3: {
        text: "Next, let’s say that <i>B</i> = {<i>b</i><sub>1</sub>, <i>b</i><sub>2</sub>, \
              <i>b</i><sub>3</sub>, <i>b</i><sub>4</sub>, <i>b</i><sub>5</sub>, <i>b</i><sub>6</sub>, ...} \
              <br/><br/> \
              We put the members of <i>B</i> along the other side of the grid.  ",
        action: {
            headings: { b: "ani" },
            pairs: "hide",
            order: 0
        },
        audio: "audio/nextletssayb.mp3"
    },
    page4: {
        text: "Next, in every box in the grid, we put the corresponding pair of members of \
              <i>A</i> and <i>B</i>, so that every pair (<i>a</i><sub>i</sub>,<i>b</i><sub>j</sub>) appears \
              in the grid. ",
        action: {
            pairs: "fadein",
            order: 0
        },
        audio: "audio/nextineverybox.mp3"
    },
    page5: {
        text: "We can now start pairing off the elements in the grid with the natural numbers. ",
        action: {
            table: "fadein",
            order: 0
        },
        audio: "audio/wecannowstart.mp3"
    },
    page6: {
        text: "We start with (<i>a</i><sub>1</sub>, <i>b</i><sub>1</sub>). ",
        action: {
            order: 1
        },
        audio: "audio/startwitha1b1.mp3"
    },
    page7: {
        text: "Then, we systematically cover the rest of the grid, following the same path that \
              Cantor used. ",
        action: {
            order: 2
        },
        similar:19,
        audio: "audio/thensystematically.mp3"
    },
    sorted: {
        text: "By following this path, we can be sure that eventually every square is visited. Therefore \
              every pair (<i>a</i><sub>i</sub>,<i>b</i><sub>j</sub>) in the grid is paired \
              off with a natural number. \
              <br/><br/> \
              That concludes this visualisation. \
              <p style='font-size:90%;font-style:italic;'>Click Reset to start again.</p>",
        action: {
            order: 22
        },
        audio: "audio/byfollowing.mp3"
    },
    h5aa: {
        type: "Countability"
    }
};