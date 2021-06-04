var data = {
    "description": "Dijkstra’s algorithm",
    "panelColour": "#FFF",
    "baseColour": "#FFF",
    "backgroundColour": "#FFF",
    "highlight": "#DDD",

    timerPause: 40,
    checkPauseMute: 50,
    animationStepsInit: 40,

    "nodeCount": 9,
    "nodeNames": ["A", "B", "C", "D", "E", "F", "G", "H", "K"],
    "connectionCount": 11,
    "pageCount": 19,

    "nodes": {
        "A": {"x": 300, "y": 40},
        "B": {"x": 420, "y": 60},
        "C": {"x": 90,  "y": 140},
        "D": {"x": 300, "y": 240},
        "E": {"x": 520, "y": 250},
        "F": {"x": 630, "y": 40},
        "G": {"x": 520, "y": 120},
        "H": {"x": 740, "y": 110},
        "K": {"x": 650, "y": 190}
    },

    "connections" : {
        "AB": 4,
        "AC": 20,
        "BF": 1,
        "BG": 3,
        "CD": 2,
        "DE": 2,
        "EG": 3,
        "EK": 3,
        "FH": 1,
        "GK": 5,
        "HK": 3
    },

    "help": "<h2>Information</h2> \
            <ul style='padding-right:2em;'> \
                <li>Click Next to move to the next step the visualisation.</li> \
                <li>Click Back to move to the previosu step.</li> \
                <li>Click Reset to go back to the start of the visualisation.</li> \
                <li>Click Audio to toggle the audio narration on or off.</li> \
                <li>Click on the cross button or press the escape key to hide this information.</li> \
            </ul>",

    "intro": {
        "text": "In this visualisation we look at Dijkstra’s algorithm for finding the \
                minimum distance from a given start vertex to every other vertex in a graph. \
                <br/><br/> \
                <p style='font-size:90%;font-style:italic;'>Click Next to start the visualisation of the algorithm.</p>",
        "audio": "audio/intro.mp3"
    },
    "page2": {
        "text": "To demonstrate the algorithm we apply it to the graph shown, beginning \
                at vertex C.",
        "action": {
            "highlight": "C",
            "black": "",
            "grey": "",
            "red": "",
            "distance": ["A∞", "B∞", "C∞", "D∞", "E∞", "F∞", "G∞", "H∞", "K∞"],
            "path": "",
            "queue": []
        },
        "audio": "audio/todemonstrate.mp3"
    },
    "page3": {
        "text": "The shortest known distance to each vertex from the start vertex is \
                shown as the number below each vertex. Initially the distance to C is \
                set to 0 (since the distance from C to C is obviously 0). All the other \
                vertices have their distances set to infinity, which is just a conventional \
                way to show we have no information about their distances yet: of course \
                we don’t mean the distance is literally infinite. ",
        "action": {
            "highlight": "C",
            "black": "",
            "grey": "",
            "red": "C",
            "distance": ["A∞", "B∞", "C0", "D∞", "E∞", "F∞", "G∞", "H∞", "K∞"],
            "path": "",
            "queue": []
        },
        "audio": "audio/theshortest.mp3"
    },
    "page4": {
        "text": "The blue numbers on the edges represent weights attached to each edge. \
                In our example we shall assume they are the distances between vertices \
                but in other cases they could represent something different, for instance \
                the time taken to travel along a road, or a charge for using it. ",
        "action": {
            "highlight": "C",
            "black": "",
            "grey": "",
            "red": "",
            "distance": ["A∞", "B∞", "C0", "D∞", "E∞", "F∞", "G∞", "H∞", "K∞"],
            "path": "",
            "queue": []
        },
        "audio": "audio/theblue.mp3"
    },
    "page5": {
        "text": "Lastly the grid below the graph represents a priority queue. This is \
                kept sorted by shortest known distance from C, from smallest on the left \
                to largest on the right. ",
        "action": {
            "highlight": "C",
            "black": "",
            "grey": "",
            "red": "",
            "distance": ["A∞", "B∞", "C0", "D∞", "E∞", "F∞", "G∞", "H∞", "K∞"],
            "path": "",
            "queue": []
        },
        "audio": "audio/lastlythegrid.mp3"
    },
    "page6": {
        "text": "In the following frames each vertex is white, grey or black, \
                to help follow the progress of the algorithm. White vertices have not \
                been reached yet and their distance remains infinity. Grey vertices have \
                been visited but have still to be removed from the queue. Black vertices \
                are those that have been removed from the queue and whose minimum \
                distance from C has been found. ",
        "action": {
            "highlight": "C",
            "black": "",
            "grey": "",
            "red": "",
            "distance": ["A∞", "B∞", "C0", "D∞", "E∞", "F∞", "G∞", "H∞", "K∞"],
            "path": "",
            "queue": []
        },
        "audio": "audio/inthefollowingframes.mp3"
    },
    "page7": {
        "text": "The algorithm begins by putting all the vertices and their shortest known \
                distances from C into the priority queue. Initially C is at the front with \
                distance 0 and all the other vertices are in arbitrary order with distance \
                infinity.",
        "action": {
            "highlight": "C",
            "black": "",
            "grey": "C",
            "red": "",
            "distance": ["A∞", "B∞", "C0", "D∞", "E∞", "F∞", "G∞", "H∞", "K∞"],
            "path": "",
            "queue": ["C0", "A∞", "B∞", "D∞", "E∞", "F∞", "G∞", "H∞", "K∞"]
        },
        "audio": "audio/thealgorithm.mp3"
    },
    "page8": {
        "text": "We remove the vertex at the front of the priority queue, which is C, \
                and look at its neighbouring vertices, in this case A and D. \
                <br/><br/> \
                The distance of these is the distance to vertex C, which is 0, plus the \
                distance represented by the blue number on the respective edge. We \
                can therefore update their distances.",
        "action": {
            "highlight": "C",
            "black": "C",
            "grey": "AD",
            "red": "AD",
            "distance": ["A20", "B∞", "C0", "D2", "E∞", "F∞", "G∞", "H∞", "K∞"],
            "path": "",
            "queue": ["D2", "A20", "B∞", "E∞", "F∞", "G∞", "H∞", "K∞"]
        },
        "audio": "audio/weremove.mp3"
    },
    "page9": {
        "text": "The procedure is repeated. We remove the vertex at the head of the \
                priority queue, which is D. This is the vertex that has the smallest \
                distance from C. \
                <br/><br/> \
                We examine any neighbours of D to see if their distances should be \
                updated. There is only one neighbour E and we see its distance should \
                become 2 + 2 = 4. Because E is now the vertex in the priority queue \
                with the shortest known distance from C, it is put at the front of \
                the priority queue.",
        "action": {
            "highlight": "D",
            "black": "CD",
            "grey": "AE",
            "red": "E",
            "distance": ["A20", "B∞", "C0", "D2", "E4", "F∞", "G∞", "H∞", "K∞"],
            "path": "",
            "queue": ["E4", "A20", "B∞", "F∞", "G∞", "H∞", "K∞"]
        },
        "audio": "audio/theprocedure.mp3"
    },
    "page10": {
        "text": "Next we remove E and update the distances of both G and K. They both \
                have the same distance 7, so their relative order in the queue doesn’t \
                matter, but they both come ahead of A with distance 20.",
        "action": {
            "highlight": "E",
            "black": "CDE",
            "grey": "AGK",
            "red": "GK",
            "distance": ["A20", "B∞", "C0", "D2", "E4", "F∞", "G7", "H∞", "K7"],
            "path": "",
            "queue": ["G7", "K7", "A20", "B∞", "F∞", "H∞"]
        },
        "audio": "audio/next.mp3"
    },
    "page11": {
        "text": "Removing and processing G updates B’s distance to 10. ",
        "action": {
            "highlight": "G",
            "black": "CDEG",
            "grey": "ABK",
            "red": "B",
            "distance": ["A20", "B10", "C0", "D2", "E4", "F∞", "G7", "H∞", "K7"],
            "path": "",
            "queue": ["K7", "B10", "A20", "F∞", "H∞"]
        },
        "audio": "audio/removing.mp3"
    },
    "page12": {
        "text": "We next process K which updates H’s distance to 10. ",
        "action": {
            "highlight": "K",
            "black": "CDEGK",
            "grey": "ABH",
            "red": "H",
            "distance": ["A20", "B10", "C0", "D2", "E4", "F∞", "G7", "H10", "K7"],
            "path": "",
            "queue": ["B10", "H10", "A20", "F∞"]
        },
        "audio": "audio/wenext.mp3"
    },
    "page13": {
        "text": "Removing and processing B updates the distances of F and A. Although \
                A’s distance has reduced, it is still behind H and F. ",
        "action": {
            "highlight": "B",
            "black": "BCDEGK",
            "grey": "AFH",
            "red": "AF",
            "distance": ["A14", "B10", "C0", "D2", "E4", "F11", "G7", "H10", "K7"],
            "path": "",
            "queue": ["H10", "F11", "A14"]
        },
        "audio": "audio/removingand.mp3"
    },
    "page14": {
        "text": "Removing and processing H doesn’t change any distances. ",
        "action": {
            "highlight": "H",
            "black": "BCDEGHK",
            "grey": "AF",
            "red": "",
            "distance": ["A14", "B10", "C0", "D2", "E4", "F11", "G7", "H10", "K7"],
            "path": "",
            "queue": ["F11", "A14"]
        },
        "audio": "audio/removingandprocessing.mp3"
    },
    "page15": {
        "text": "Removing and processing F doesn’t change any distances. ",
        "action": {
            "highlight": "F",
            "black": "BCDEFGHK",
            "grey": "A",
            "red": "",
            "distance": ["A14", "B10", "C0", "D2", "E4", "F11", "G7", "H10", "K7"],
            "path": "",
            "queue": ["A14"]
        },
        "audio": "audio/removingandprocessingf.mp3"
    },
    "page16": {
        "text": "The final vertex processed is A. This does not change any distances. \
                The algorithm has now found the shortest distance from C to each of \
                the other vertices. \
                <br/><Br/> \
                The queue is now empty and the algorithm stops. ",
        "action": {
            "highlight": "A",
            "black": "ABCDEFGHK",
            "grey": "",
            "red": "",
            "distance": ["A14", "B10", "C0", "D2", "E4", "F11", "G7", "H10", "K7"],
            "path": "",
            "queue": []
        },
        "audio": "audio/thefinal.mp3"
    },
    "page17": {
        "text": "There are various ways to get the actual route from C to another \
                vertex, say H, as opposed to just the distance. Here is one.\
                <br/><br/> \
                First run Dijkstra's algorithm starting from C until we reach H and \
                have removed it from the priority queue. At this point the shortest \
                distance from C to H is known, so there is no need to visit any \
                further vertices. ",
        "action": {
            "highlight": "CH",
            "black": "BCDEGHK",
            "grey": "AF",
            "red": "",
            "distance": ["A14", "B10", "C0", "D2", "E4", "F11", "G7", "H10", "K7"],
            "path": "",
            "queue": ["F11", "A14"]
        },
        "audio": "audio/therearevarious.mp3"
    },
    "page18": {
        "text": "Start at H and work backwards. Find the neighbour of H whose distance from \
                C, plus the length of the edge that joins it to H, equals H’s distance from \
                C. This is K, since K’s distance, 7, plus the length of the edge, 3, gives 10. \
                Next, find the neighbour of K whose distance from C, plus the length of the \
                edge that joins it to K, equals K’s distance from C. This is E, since E’s \
                distance, 4, plus the length of the edge, 3, gives 7. \
                In the same way we find D, then C. Finally, reversing the order we get the \
                shortest path, which is CDEKH with total distance 10. ",
        "action": {
            "highlight": "CH",
            "black": "BCDEGHK",
            "grey": "AF",
            "red": "",
            "distance": ["A14", "B10", "C0", "D2", "E4", "F11", "G7", "H10", "K7"],
            "path": "CDEKH",
            "queue": ["F11", "A14"]
        },
        "audio": "audio/startath.mp3"
    },
    "sorted": {
        "text": "In this section you have seen how Dijkstra’s algorithm successively \
                calculates the shortest path from the source vertex to each of the \
                other vertices. \
                <br/><br/> \
                This concludes the visualisation. \
                <br/><br/> \
                <p style='font-size:90%;font-style:italic;'>Click Reset to start again.</p>",
        "audio": "audio/inthissection.mp3"
    },
    "h5aa": {
        "type": "ShortestPath"
    }
};
