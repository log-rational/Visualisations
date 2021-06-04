var data = {
    description: "Diagonalisation",
    panelColour: "#FFF",
    baseColour: "#FFF",
    backgroundColour: "#FFF",
    highlight: "#f00",
    arrowColor: "#f00",
    rowHighlight: "#f00",
    cellHighlight: "#fc0",
    tableColors: {
        heading: "#FFF",
        foreground: "#BBB",
        background: "#4f81bd",
        backgroundLeft: "#4f81bd",
        backgroundStripeOdd: "d0d8e8",
        backgroundStripeEven: "e9edf4",
        text: "#000",
        highlight: "#f00"
    },

    timerPause: 40,
    checkPauseMute: 50,
    animationStepsInit: 25,

    gridSize: 12,

    pageCount: 16,

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
        text: "In this visualisation, we will show that it is impossible to set up a one-to-one \
              correspondence between the natural numbers and the real numbers. \
              <br/><br/> \
              For the proof, we assume that it <i>is</i> possible to set up the correspondence, \
              and then show that this assumption leads to a contradiction. \
              <p style='font-size:90%;font-style:italic;'>Click Next to start the visualisation \
              of the algorithm.</p> ",
        action: {
            headings: { a: "hide", b: "hide" },
            pairs: "hide",
            newNumber: "hide",
            order: 0
        },
        audio: "audio/intro.mp3"
    },
    page2: {
        text: "We start by assuming that the real numbers can be placed in a one-to-one correspondence \
              with the natural numbers. \
              <br/><br/> \
              So we can create a list of the real numbers, where each real number is paired \
              off with a natural number. ",
        action: {
            headings: { a: "ani", b: "ani" },
            pairs: "fadein",
            newNumber: "hide",
            order: 0
        },
        audio: "audio/start.mp3"
    },
    page3: {
        text: "Now we will construct a new number, <i>R</i><sup>-</sup>, and show that it cannot appear on \
              the list of real numbers. \
              <br/><br/> \
              If we can find a number that does not appear in the list of real numbers, then we \
              will have shown that the initial assumption is incorrect. ",
        action: {
            newNumber: "fadein",
            order: 0
        },
        audio: "audio/now.mp3"
    },
    page4: {
        text: "Look at the first decimal place of the first real number. \
              <br/><br/> \
              If it is 1, then let the first decimal place of <i>R</i><sup>-</sup> be 2. \
              <br/><br/> \
              Otherwise, let the first decimal place of <i>R</i><sup>-</sup> be 1. ",
        action: {
            order: 2
        },
        audio: "audio/look.mp3"
    },
    page5: {
        text: "Look at the second decimal place of the second real number. \
              <br/><br/> \
              If it is 1, then let the second decimal place of <i>R</i><sup>-</sup> be 2. \
              <br/><br/> \
              Otherwise, let the second decimal place of <i>R</i><sup>-</sup> be 1. ",
        action: {
            order: 3
        },
        audio: "audio/look2.mp3"
    },
    page6: {
        text: "Look at the third decimal place of the third real number. \
              <br/><br/> \
              If it is 1, then let the third decimal place of <i>R</i><sup>-</sup> be 2. \
              <br/><br/> \
              Otherwise, let the third decimal place of <i>R</i><sup>-</sup> be 1. ",
        action: {
            order: 4
        },
        audio: ""
    },
    page7: {
        text: "Look at the fourth decimal place of the fourth real number. \
              <br/><br/> \
              If it is 1, then let the fourth decimal place of <i>R</i><sup>-</sup> be 2. \
              <br/><br/> \
              Otherwise, let the fourth decimal place of <i>R</i><sup>-</sup> be 1. ",
        action: {
            order: 5
        },
        audio: ""
    },
    page8: {
        text: "Look at the fifth decimal place of the fifth real number. \
              <br/><br/> \
              If it is 1, then let the fifth decimal place of <i>R</i><sup>-</sup> be 2. \
              <br/><br/> \
              Otherwise, let the fifth decimal place of <i>R</i><sup>-</sup> be 1. ",
        action: {
            order: 6
        },
        audio: ""
    },
    page9: {
        text: "Look at the sixth decimal place of the sixth real number. \
              <br/><br/> \
              If it is 1, then let the sixth decimal place of <i>R</i><sup>-</sup> be 2. \
              <br/><br/> \
              Otherwise, let the sixth decimal place of <i>R</i><sup>-</sup> be 1. ",
        action: {
            order: 7
        },
        audio: ""
    },
    page10: {
        text: "And so on. We always look at the <i>i</i><sup>th</sup> decimal place of the <i>i</i><sup>th</sup> number. \
              <br/><br/> \
              If it is 1, then the <i>i</i><sup>th</sup> decimal place of <i>R</i><sup>-</sup> is 2. \
              <br/><br/> \
              Otherwise, the <i>i</i><sup>th</sup> decimal place of <i>R</i><sup>-</sup> is 1. ",
        action: {
            order: 8
        },
        similar:3,
        audio: "audio/andsoon.mp3"
    },
    page14: {
        text: "And so <i>R</i><sup>-</sup> cannot appear in the list of real numbers. \
              <br/><br/> \
              <i>R</i><sup>-</sup> always differs from the <i>i</i><sup>th</sup> member of the list in the <i>i</i><sup>th</sup> decimal place. ",
        action: {
            order: 12
        },
        audio: "audio/andsor.mp3"
    },
    page15: {
        text: "Therefore, our initial assumption that all the real numbers could be put into a one-to-one \
              correspondence with the natural numbers has been shown to be incorrect. There will always be at \
              least one real number which has been left out of the list. ",
        action: {
            order: 99
        },
        audio: "audio/therefore.mp3"
    },
    sorted: {
        text: "This argument works no matter how we try to set up the initial correspondence \
              between the real numbers and the natural numbers. There will always be some real \
              numbers that have been left out of the list. \
              <br/><br/> \
              We describe the set of real numbers as uncountable, because the size of the set \
              of real numbers is greater than the size of the set of natural numbers. \
              <br/><br/> \
              That concludes this visualisation. \
              <p style='font-size:90%;font-style:italic;'>Click Reset to start again.</p>",
        action: {
            order: 99
        },
        audio: "audio/concludes.mp3"
    },
    h5aa: {
        type: "Diagonalisation"
    }
};