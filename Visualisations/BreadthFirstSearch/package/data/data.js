var data = {
    description: "Breadth first search",
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
        C: {x: 90,  y: 140},
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

    waveOrder: {C: 0, A: 1, D: 1, B: 2, E: 2, G: 3, F: 3, K: 3, H: 4},

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
        text: "In this visualisation we perform a breadth first search of a graph. \
              <br/><br/> \
              <p style='font-size:90%;font-style:italic;'>Click Next to start the \
              visualisation of the algorithm.</p> ",
        audio: "audio/breadthfirst.mp3"
    },
    page2: {
        text: "We shall search the graph shown, starting at vertex C. \
              <br/><br/>\
              In what follows we use white to designate a vertex that has not been \
              reached yet and grey for a vertex that has been added to the queue but \
              not yet visited. Vertices that have been removed from the front of the \
              queue are coloured black to show they have been visited. ",
        action: {
            highlight: "C",
            black: "",
            grey: "",
            path: "",
            queue: ""
        },
        audio: "audio/inwhatfollows.mp3"
    },
    page3: {
        text: "We begin by adding C to the queue. ",
        action: {
            highlight: "C",
            black: "",
            grey: "C",
            path: "",
            queue: "C"
        },
        audio: "audio/webegin.mp3"
    },
    page4: {
        text: "We immediately remove C and colour it black to indicate that it has been \
                processed. ",
        action: {
            highlight: "C",
            black: "C",
            grey: "",
            path: "",
            queue: ""
        },
        audio: "audio/weimmediately.mp3"
    },
    page5: {
        text: "We now locate all the white neighbours of C, colour them grey and add \
              them to the back of the queue. \
              <br/><br/>\
              In this case that means adding A and D to the queue. Their relative \
              order is not important, so we have arbitrarily added A first. ",
        action: {
            highlight: "C",
            black: "C",
            grey: "AD",
            path: "",
            queue: "AD"
        },
        audio: "audio/inthiscase.mp3"
    },
    page6: {
        text: "We remove A from the queue and mark it as visited. Its white neighbours \
              (in this case there is only B) are coloured grey and added to the queue. ",
        action: {
            highlight: "A",
            black: "AC",
            grey: "D",
            path: "",
            queue: "D"
        },
        action2: {
            highlight: "A",
            black: "AC",
            grey: "BD",
            path: "",
            queue: "DB"
        },
        audio: "audio/weremovea.mp3"
    },
    page7: {
        text: "D is at the front of the queue and so will be the next item removed. ",
        action: {
            highlight: "D",
            black: "AC",
            grey: "BD",
            path: "",
            queue: "DB"
        },
        audio: "audio/disatthefront.mp3"
    },
    page8: {
        text: "D is removed from the queue and marked as visited. ",
        action: {
            highlight: "D",
            black: "ACD",
            grey: "B",
            path: "",
            queue: "B"
        },
        audio: "audio/disremoved.mp3"
    },
    page9: {
        text: "The white neighbours of D, in this case only E, are coloured grey and \
                added to the queue. ",
        action: {
            highlight: "D",
            black: "ACD",
            grey: "BE",
            path: "",
            queue: "BE"
        },
        audio: "audio/thewhite.mp3"
    },
    page10: {
        text: "B is removed from the queue and marked as visited. ",
        action: {
            highlight: "B",
            black: "ABCD",
            grey: "E",
            path: "",
            queue: "E"
        },
        audio: "audio/bisremoved.mp3"
    },
    page11: {
        text: "B’s white neighbours F and G are coloured grey and added to the queue. ",
        action: {
            highlight: "B",
            black: "ABCD",
            grey: "EFG",
            path: "",
            queue: "EGF"
        },
        audio: "audio/bswhite.mp3"
    },
    page12: {
        text: "Next E is removed and marked as visited. ",
        action: {
            highlight: "E",
            black: "ABCDE",
            grey: "FG",
            path: "",
            queue: "GF"
        },
        audio: "audio/nexteisremoved.mp3"
    },
    page13: {
        text: "E’s only white neighbor K  is coloured grey and added to the queue. ",
        action: {
            highlight: "E",
            black: "ABCDE",
            grey: "FGK",
            path: "",
            queue: "GFK"
        },
        audio: "audio/esonlywhite.mp3"
    },
    page14: {
        text: "G is removed and marked as visited. It has no white neighbours \
                so nothing is added to the queue. ",
        action: {
            highlight: "G",
            black: "ABCDEG",
            grey: "FK",
            path: "",
            queue: "FK"
        },
        audio: "audio/gisremoved.mp3"
    },
    page15: {
        text: "F is removed and its white neighbor H joins the queue. ",
        action: {
            highlight: "F",
            black: "ABCDEFG",
            grey: "K",
            path: "",
            queue: "K"
        },
        action2: {
            highlight: "F",
            black: "ABCDEFG",
            grey: "HK",
            path: "",
            queue: "KH"
        },
        audio: "audio/fisremoved.mp3"
    },
    page16: {
        text: "K is removed from the queue and marked as visited.  It has no white \
                neighbours.",
        action: {
            highlight: "K",
            black: "ABCDEFGK",
            grey: "H",
            path: "",
            queue: "H"
        },
        audio: "audio/kisremoved.mp3"
    },
    page17: {
        text: "Finally H is removed from the queue. It has no white neighbours, \
                so nothing is added to the queue and it is now empty. So we’re finished. ",
        action: {
            highlight: "H",
            black: "ABCDEFGHK",
            grey: "",
            path: "",
            queue: ""
        },
        audio: "audio/finallyh.mp3"
    },
    page18: {
        text: "For each vertex of the graph we can calculate its degree of separation \
              from C. This is the smallest number of steps needed to reach it from C, \
              by any route through the graph. ",
        action: {
            highlight: "",
            black: "ABCDEFGHK",
            grey: "",
            path: "",
            queue: "-order"
        },
        audio: "audio/foreachvertex.mp3"
    },
    page19: {
        text: "If we group the vertices by degree of separation we notice they come in a \
              series of phases or waves, and that every vertex in each wave is visited \
              before any vertex further away. This is why we call the search breadth \
              first. ",
        action: {
            highlight: "",
            black: "ABCDEFGHK",
            grey: "",
            path: "",
            queue: "-waves order"
        },
        audio: "audio/ifwegroup.mp3"
    },
    page20: {
        text: "<strong>Learning outcomes</strong> \
              <br/><br/> \
              In this visualisation you saw that we can carry out a breadth first \
              search by adding vertices that have been reached but not yet visited \
              to the back of a queue and then removing them from the front of the \
              queue one by one. \
              You have also seen that vertices are visited in a series of phases, in \
              order of distance from the starting vertex. ",
        action: {
            highlight: "",
            black: "ABCDEFGHK",
            grey: "",
            path: "",
            queue: "-waves"
        },
        audio: "audio/learningoutcomes.mp3"
    },
    sorted: {
        text: "This ends the visualisation. \
              <br/><br/> \
              <p style='font-size:90%;font-style:italic;'>Click Reset to start again.</p>",
        audio: "audio/end.mp3"
    },
    h5aa: {
        type: "BreadthFirstSearch"
    }
};
