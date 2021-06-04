var data = {
    description: "Depth first search",
    panelColour: "#FFF",
    baseColour: "#FFF",
    backgroundColour: "#FFF",
    highlight: "#DDD",

    timerPause: 40,
    checkPauseMute: 50,
    animationStepsInit: 40,

    nodeCount: 9,
    nodeNames: ["A", "B", "C", "D", "E", "F", "G", "H", "K"],
    connectionCount: 10,
    pageCount: 21,

    nodes: {
        A: {x: 300, y: 40},
        B: {x: 420, y: 60},
        C: {x: 110, y: 140},
        D: {x: 300, y: 240},
        E: {x: 520, y: 250},
        F: {x: 630, y: 40},
        G: {x: 520, y: 120},
        H: {x: 740, y: 110},
        K: {x: 650, y: 190}
    },

    waves: [
        {x1: 90,  y1: 0,   xc: 360, yc: 140, x2: 90,  y2: 280, color: "#800"},
        {x1: 390, y1: 0,   xc: 280, yc: 140, x2: 430, y2: 280, color: "#D70"},
        {x1: 530, y1: 0,   xc: 400, yc: 140, x2: 520, y2: 185, color: "#080"},
        {x1: 520, y1: 185, xc: 640, yc: 232, x2: 600, y2: 280, color: "#080"},
        {x1: 740, y1: 40,  xc: 600, yc: 115, x2: 740, y2: 190, color: "#00F"}
    ],

    connections: [
        "AB",
        "AC",
        "BF",
        "BG",
        "CD",
        "DE",
        "EG",
        "EK",
        "FH",
        "GK",
        "HK"
    ],

    order: {C: 1, D: 2, E: 3, K: 4, H: 5, F: 6, B: 7, G: 8, A: 9},

    help: "<h3>Information</h3>\
            <br/><br/> \
            <ul style='padding-right:2em;'> \
                <li>Click Next to move to the next step of the visualisation.</li> \
                <li>Click Back to move to the previous step.</li> \
                <li>Click Reset to go back to the start of the visualisation.</li> \
                <li>Click Audio to toggle the audio narration on or off.</li> \
                <li>Click on the cross button or press the escape key to hide this information.</li> \
            </ul> ",

    intro: {
        text: "In this visualisation we perform a depth first search of a graph. \
              <br/><br/> \
              <p style='font-size:90%;font-style:italic;'>Click Next to start the \
              visualisation of the algorithm.</p> ",
        audio: "audio/depthfirst.mp3"
    },
    page2: {
        text: "We shall search the graph shown, starting at vertex C. \
              <br/><br/> \
              Rather than carrying out the search by recursively calling a function, as \
              in the unit, we will use this visualisation to demonstrate an alternative \
              approach using a stack. ",
        action: {
            highlight: "C",
            black: "",
            grey: "",
            path: "",
            queue: ""
        },
        audio: "audio/ratherthan.mp3"
    },
    page3: {
        text: "In what follows we use white to designate a vertex that has not been \
              reached yet and grey for a vertex that has been put on the stack but \
              not yet visited. Vertices that have been popped from the stack are \
              coloured black to show they have been visited. ",
        action: {
            highlight: "C",
            black: "",
            grey: "",
            path: "",
            queue: ""
        },
        audio: "audio/inwhatfollows.mp3"
    },
    page4: {
        text: "We begin by pushing the start vertex C on the stack. ",
        action: {
            highlight: "C",
            black: "",
            grey: "C",
            path: "",
            queue: "C"
        },
        audio: "audio/webegin.mp3"
    },
    page5: {
        text: "We immediately pop C from the top of the stack and colour it black.  ",
        action: {
            highlight: "C",
            black: "C",
            grey: "",
            path: "",
            queue: ""
        },
        audio: "audio/weimmediately.mp3"
    },
    page6: {
        text: "We now locate all the white neighbours of C, colour them grey and \
              push them on the stack.  ",
        action: {
            highlight: "C",
            black: "C",
            grey: "AD",
            path: "",
            queue: "DA"
        },
        audio: "audio/wenowlocate.mp3"
    },
    page7: {
        text: "We pop D off the stack, mark it as visited and then add its white \
              neighbours (in this case there is only E) to the stack. ",
        action: {
            highlight: "D",
            black: "CD",
            grey: "A",
            path: "",
            queue: "A"
        },
        action2: {
            highlight: "D",
            black: "CD",
            grey: "AE",
            path: "",
            queue: "EA"
        },
        audio: "audio/wepopd.mp3"
    },
    page8: {
        text: "E is popped from the stack and marked as visited. ",
        action: {
            highlight: "E",
            black: "CDE",
            grey: "A",
            path: "",
            queue: "A"
        },
        audio: "audio/eispopped.mp3"
    },
    page9: {
        text: "The white neighbours of E, in this case G and K, are coloured grey \
              and pushed on the stack. Their relative order doesn’t matter. ",
        action: {
            highlight: "E",
            black: "CDE",
            grey: "AGK",
            path: "",
            queue: "KGA"
        },
        audio: "audio/thewhiteneighbours.mp3"
    },
    page10: {
        text: "The next vertex to be popped from the stack and coloured black is K. ",
        action: {
            highlight: "K",
            black: "CDEK",
            grey: "AG",
            path: "",
            queue: "GA"
        },
        audio: "audio/thenextvertex.mp3"
    },
    page11: {
        text: "The white neighbours of K (in this case only H) are coloured grey and \
              pushed on the stack. ",
        action: {
            highlight: "K",
            black: "CDEK",
            grey: "AGH",
            path: "",
            queue: "HGA"
        },
        audio: "audio/thewhiteneighboursofk.mp3"
    },
    page12: {
        text: "H is popped from the stack and coloured black. ",
        action: {
            highlight: "H",
            black: "CDEHK",
            grey: "AG",
            path: "",
            queue: "GA"
        },
        audio: "audio/hispopped.mp3"
    },
    page13: {
        text: "The white neighbours of H (which in this case is only F) are coloured \
              grey and pushed on the stack. ",
        action: {
            highlight: "H",
            black: "CDEHK",
            grey: "AFG",
            path: "",
            queue: "FGA"
        },
        audio: "audio/thewhiteneighboursofh.mp3"
    },
    page14: {
        text: "F is now popped from the stack and coloured black. ",
        action: {
            highlight: "F",
            black: "CDEFHK",
            grey: "AG",
            path: "",
            queue: "GA"
        },
        audio: "audio/fisnowpopped.mp3"
    },
    page15: {
        text: "All its white neighbours are pushed on to the stack. In this case, \
              there’s only B. Notice that we have almost gone all the way back but \
              still haven't processed A yet, because this is depth first search.",
        action: {
            highlight: "F",
            black: "CDEFHK",
            grey: "ABG",
            path: "",
            queue: "BGA"
        },
        audio: "audio/allitswhite.mp3"
    },
    page16: {
        text: "B is popped from the stack and coloured black. Notice all its neighbours \
              are grey. So there’s nothing to push onto the stack. ",
        action: {
            highlight: "B",
            black: "BCDEFHK",
            grey: "AG",
            path: "",
            queue: "GA"
        },
        audio: "audio/bispopped.mp3"
    },
    page17: {
        text: "Now G is at the top of the stack. We pop it off and colour it black. \
              It has no white neighbours, so there’s nothing to go on the stack. ",
        action: {
            highlight: "G",
            black: "BCDEFGHK",
            grey: "A",
            path: "",
            queue: "A"
        },
        audio: "audio/nowg.mp3"
    },
    page18: {
        text: "Finally we find A at the top of the stack. \
              <br/><br/> \
              Vertex A has no white neighbours and there’s nothing left on the stack, \
              so we’re finished. ",
        action: {
            highlight: "A",
            black: "ABCDEFGHK",
            grey: "",
            path: "",
            queue: ""
        },
        audio: "audio/finally.mp3"
    },
    page19: {
        text: "The numbers next to the vertices show the order in which they were visited. ",
        action: {
            highlight: "",
            black: "ABCDEFGHK",
            grey: "",
            path: "",
            queue: "-order"
        },
        audio: "audio/thenumbers.mp3"
    },
    page20: {
        text: "<strong>Learning outcomes</strong> \
              <br/><br/> \
              In this visualisation you saw that we can carry out a depth-first search \
              by pushing vertices that have been reached but not yet visited on to a \
              stack and then popping them off again one by one. ",
        action: {
            highlight: "",
            black: "ABCDEFGHK",
            grey: "",
            path: "",
            queue: "-"
        },
        audio: "audio/learning.mp3"
    },
    sorted: {
        text: "This ends the visualisation. \
              <br/><br/> \
              <p style='font-size:90%;font-style:italic;'>Click Reset to start again.</p>",
        audio: "audio/end.mp3"
    },
    h5aa: {
        type: "DepthFirstSearch"
    }
};
