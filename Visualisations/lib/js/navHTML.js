var navData = {
    "Unit 1": {
        "Exploratory activity 1.9:": {
            link: "Automation",
            title: "Automation drag and drop"
        }
    },
    "Unit 3": {
        "Exploratory activity 3.1:": {
            link: "BubbleSort",
            title: "Bubble sort"
        },
        "Exploratory activity 3.2:": {
            link: "SelectionSort",
            title: "Selection sort"
        },
        "Exploratory activity 3.3:": {
            link: "InsertionSort",
            title: "Insertion sort"
        },
        "Exploratory activity 3.5:": {
            link: "Recursion",
            title: "Recursion and factorials"
        },
        "Exploratory activity 3.7:": {
            link: "RecursiveInsertionSort",
            title: "Recursive insertion sort"
        },
        "Exploratory activity 3.8:": {
            link: "Merging",
            title: "Merging"
        },
        "Exploratory activity 3.9:": {
            link: "QuickSort",
            title: "Quick sort"
        },
        "Exploratory activity 3.10:": {
            link: "HeapifyingAndSorting",
            title: "Heapifying and sorting"
        }
    },
    "Unit 4": {
        "Exploratory activity 4.3:": {
            link: "BasicStringSearchAlgorithm",
            title: "Basic string search algorithm"
        },
        "Exploratory activity 4.5:": {
            link: "HashingAndHashTables",
            title: "Hashing and hash tables"
        },
        "Exploratory activity 4.7:": {
            link: "BinarySearchTrees",
            title: "Binary search trees (BSTs)"
        },
        "Exploratory activity 4.11:": {
            link: "AVLtreeRebalancing",
            title: "AVL tree rebalancing"
        }
    },
    "Unit 5": {
        "Exploratory activity 5.5:": {
            link: "BreadthFirstSearch",
            title: "Breadth first search (BFS)"
        },
        "Exploratory activity 5.6:": {
            link: "DepthFirstSearch",
            title: "Depth first search (DFS)"
        },
        "Exploratory activity 5.8:": {
            link: "DijkstrasAlgorithm",
            title: "Dijkstra&#x27;s algorithm"
        },
        "Exploratory activity 5.9:": {
            link: "Knapsack",
            title: "Knapsack problem"
        }
    },
    "Unit 6": {
        "Section 4.2:": {
            link: "Countability",
            title: "Countability"
        },
        "Self-assessment activity 17:": {
            link: "Triples",
            title: "Triples"
        },
        "Section 4.3:": {
            link: "Diagonalisation",
            title: "Diagonalisation"
        }
    }
};


function getWelcomeHTML(isIndex) {
    var welcome = isIndex ?
        "               <h2>Welcome</h2>                                                                     "
        :
        "               <h2><a href='../index.html'>Welcome</a></h2>                                        ";
    return (
        "       <div class='header'>                                                                             " +

            welcome +

        "       </div>                                                                                       "
    );
}

function getUnitHTML(unit) {
    return (
        "       <div class='header'>                                                                            " +
        "           <div class='title' onclick=\"showActivities('" + unit + "');\" style='cursor: pointer;'>    " +
        "               <h2>" + unit + "</h2>                                                                   " +
        "           </div>                                                                                      " +
        "       </div>                                                                                          "
    );
}

function getActivitiesHTML(unit, activities, display) {
    return (
        "       <div id='" + unit + "' class='content' style='display: " + display + ";'>                       " +
        "           <ul>                                                                                        " +
        "           " + activities + "                                                                          " +
        "           </ul>                                                                                       " +
        "       </div>                                                                                          "
    );
}

function getActivityHTML(activity, link, title, currentActivity, unit, currentUnit) {
    return (activity === currentActivity && unit === currentUnit ?

        "               <li class='tree-current'>                                                     " +
        "                   <span class='accesshide'>Current section: </span>                                   " +
        "                   " + activity + "<br/>" + title + "                                                      " +
        "               </li>                                                                                   "

        :

        "               <li>                                                                                    " +
        "                   <a href='" + link + ".html'>                                                        " +
        "                   " + activity + "<br/>" + title + "                                                      " +
        "                   </a>                                                                                " +
        "               </li>                                                                                   "
    );
}


function getNavHTML(currentUnit, currentActivity) {
    var html = "",
        unit,
        activity,
        activities,
        activitiesHTML,
        activityInfo,
        isCurrentActivity,
        link,
        title,
        unitHTML,
        display,
        isIndex = currentUnit === "index" && currentActivity === "index";

    for (unit in navData) {
        if (navData.hasOwnProperty(unit)) {
            activities = navData[unit];
            activitiesHTML = "";
            isCurrentActivity = false;

            for (activity in activities) {
                if (activities.hasOwnProperty(activity)) {
                    activityInfo = activities[activity];
                    link = activityInfo.link;
                    title = activityInfo.title;

                    if (isIndex) {
                        link = "Visualisations/" + link;
                    }

                    activitiesHTML += getActivityHTML(activity, link, title, currentActivity, unit, currentUnit);
                    if (activity === currentActivity) {
                        isCurrentActivity = true;
                    }
                }
            }

            unitHTML = getUnitHTML(unit);
            display = currentUnit === unit && isCurrentActivity ? "block" : "none";
            activitiesHTML = getActivitiesHTML(unit, activitiesHTML, display);

            html += unitHTML + activitiesHTML;
        }
    }
    return getWelcomeHTML(isIndex) + html;
}

//This is used as an onclick in created html
//noinspection JSUnusedGlobalSymbols
function showActivities(currentUnit) {
    var unit;
    for (unit in navData) {
        if (navData.hasOwnProperty(unit)) {
            document.getElementById(unit).style.display = currentUnit === unit ? "block" : "none";
        }
    }
}

function setNavHTML(currentUnit, currentActivity) {
    document.getElementById("navigation").innerHTML = getNavHTML(currentUnit, currentActivity);
}