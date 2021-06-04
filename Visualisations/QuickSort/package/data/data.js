/*jshint multistr: true */
data = {
    "description": "Quick sort visualisation.",
    "panelColour": "#FFF",
    "baseColour": "#FFF",
    "backgroundColour": "#FFF",
    "highlight": "#DDD",

    "barCount": 13, // number of coloured bars to sort
    "frameTime": 40, // normal timer pause (40 to give 25 frames a second)
    "pauseTimeMute": 50, // the general pause count for when audio is off
    "hueStart": 0, // the starting hue for the smallest bar
    "hueEnd": 255, // the end hue for the largest bar - colours are calculated in between
    "goFastInit": 48, // the inital number of the step before going fast - usually then set by the Fast button
    "animationStepsInit": 20, // Number of discrete steps used to animate the swap
    "speedSteps": 10, // Number of steps for animation when sped up
    "speedPause": 5,

    "help": "<h2>Information</h2> \
            <ul style='padding-right:2em;'> \
                <li>Click Sort to begin the sorting visualisation.</li> \
                <li>Click Pause to pause the visualisation and then Resume \
                    to continue.</li> \
                <li>Click Fast to speed up the visualisation. Then click \
                    Slow to go back to normal speed.</li> \
                <li>Click Reset to go back to the start of the visualisation. \
                    The dataset and level of description will depend on whether the \
                    Random option is selected.</li> \
                <li>Click Random to select or deselected the random option. If the \
                    Random option is deselected, clicking Reset will start the visualisation \
                    again with specific data and provide a more in-depth description. \
                    With the Random option selected, clicking Reset will provide a new, \
                    random data set and provide less description. \
                <li>Click Audio to toggle the audio narration on or off.</li> \
                <li>Click on the cross button or press the escape key to hide this information.</li> \
            </ul>",


    "intro": {
        "text": "In this visualisation you're going to see an algorithm called quick sort \
                in action. Quick sort was first published in 1960 by Sir Tony Hoare, \
                computing legend. \
                <br/><br/> \
                <p style='font-size:90%;font-style:italic;'>Click Sort to start the \
                visualisation of the sorting algorithm.</p>",
        "audio":  "audio/intro.mp3"
    },
    "intro1": {
        "text": "Quick sort uses a partition function  which  divides the list to be \
                sorted into two shorter lists. It makes sure that all the items in \
                the second list are greater than those in the first list. Then it \
                sorts each of the smaller lists. It does this recursively until the \
                smaller lists are of length one or less and therefore already sorted. \
                At the end of this, the original list is sorted. <br/><br/>For the \
                function to divide the list into two shorter lists, it needs to have \
                a value at which the lists are split – this is called the split point.",
        "audio": "audio/intro1.mp3",
        "pause": 9999
    },
    "intro2": {
        "text": "To decide where the split point will come the function begins by \
                choosing a value called the pivot value. The position where the pivot \
                value should come in the sorted list is where we place the split point. \
                <br/><br/> \
                There are different ways to choose the pivot but the simplest is to \
                just take the first item on the list and that’s what we do here. \
                The blue arrow points to the pivot value. \
                <br/><br/> \
                For simplicity we assume that none of the items to be sorted are equal \
                to another, although the algorithm still works if this is not the case. ",
        "audio": "audio/intro2.mp3",
        "pause": 9999
    },
    "intro3": {
        "text": "The process works by splitting the list into two sublists. All the \
                items smaller than the pivot (the ones whose tops are below the horizontal \
                line) are placed in a list to the left of the split point. All the \
                items greater than the pivot (the ones whose tops are above the horizontal \
                line) are placed in a list to the right of the split point. \
                <br/><br/> \
                To do this the function uses two markers, the left marker and the \
                right marker. The left marker, represented by the orange arrow, looks \
                for items that are larger than the pivot. The right marker, represented \
                by the red arrow, looks for ones that are smaller. Each marker \
                steps through the list scanning the items as it goes, the left \
                marker moving to the right, and the right marker to the left. \
                <br/><br/> \
                The markers eventually converge and then the function has found the \
                split point.  ",
        "audio": "audio/intro3.mp3",
        "pause": 9999
    },
    "searchGT": {
        "text": "The left marker moves to the right looking for a value which \
                is greater than the pivot value.",
        "audio": "audio/searchgt.mp3",
        "pause": 9999
    },
    "searchLT": {
        "text": "The right marker now looks for a value which is smaller than \
                the pivot value.",
        "audio": "audio/searchlt.mp3",
        "pause": 9999
    },
    "foundGT": {
        "text": "It finds one and then stops, handing over to the right marker. \
                The right marker now looks for a value which is smaller than \
                the pivot value.",
        "audio": "audio/foundgt.mp3",
        "pause": 9999
    },
    "foundLT": {
        "text": "It finds one and the helper is now ready to swap the values over. ",
        "audio": "audio/foundlt.mp3",
        "pause": 9999
    },
    "done": {
        "text": "As it does it notices it is now left of the left marker and \
                knows that all the swapping that can happen has happened. ",
        "audio": "audio/done.mp3",
        "pause": 9999
    },
    "swap": {
        "text": "The values are swapped over.",
        "audio": "audio/swap.mp3",
        "pause": 9999
    },
    "swapPivot": {
        "text": "The partition moves the pivot value to the right most marker \
                and then returns the position of the pivot value. ",
        "audio": "audio/swappivot.mp3",
        "pause": 9999
    },
    "noSwapPivot": {
        "text": "The pivot value is exchanged for the value under the right \
                marker which given it’s at the same position means it does \
                not move.",
        "audio": "audio/noswappivot.mp3",
        "pause": 9999
    },
    "valuesLeft": {
        "text": "At this point there are three lists. All the values up to \
                the right marker are less than or equal to the pivot value. ",
        "audio": "audio/valuesleft.mp3",
        "pause": 9999
    },
    "valuesRight": {
        "text": "And all the values to the right of the right marker which \
                are greater than the pivot value and the pivot value itself \
                which must be in the correct position. ",
        "audio": "audio/valuesright.mp3",
        "pause": 9999
    },
    "firstgo3": {
        "text": "The left marker starts at the value one position to the right of the \
                pivot value, and looks for an item greater than the pivot value. ",
        "audio": "audio/firstgo3.mp3",
        "pause": 9999
    },
    "firstgo4": {
        "text": "In this case it finds one straight away and then stops, handing over \
                to the right marker. ",
        "audio": "audio/firstgo4.mp3",
        "pause": 9999
    },
    "firstgo5": {
        "text": "The right marker starts at the end of the list and scans the items \
                looking for a value which is smaller than the pivot value. In this \
                case one is identified straight away.",
        "audio": "audio/firstgo5.mp3",
        "pause": 9999
    },
    "firstgo6": {
        "text": "The function has now identified two items that are each on the \
                wrong side of the split point. \
                <br/><br/> \
                The left marker has found an item that belongs on the right of the \
                split point, because it is greater than the pivot value. \
                <br/><br/> \
                The right marker has found an item that belongs on the left of the \
                split point, because it is less than the pivot value. \
                <br/><br/> \
                These items are now swapped and after the swap both will be on the \
                correct side of the split point.",
        "audio": "audio/firstgo6.mp3",
        "pause": 9999
    },
    "firstgo7": {
        "text": "The left marker resumes moving to the right, again looking for a value \
                which is greater than the pivot value. ",
        "audio": "audio/firstgo7.mp3",
        "pause": 525
    },
    "firstgo8": {
        "text": "It finds one and then stops, handing over to the right marker.",
        "audio": "audio/firstgo8.mp3",
        "pause": 9999
    },
    "firstgo9": {
        "text": "The right marker now looks for a value which is smaller than the pivot \
                value. ",
        "audio": "audio/firstgo9.mp3",
        "pause": 9999
    },
    "firstgo10": {
        "text": "It finds one and the function has now identified a second pair of \
                values that should be swapped. ",
        "audio": "audio/firstgo10.mp3",
        "pause": 9999
    },
    "firstgo11": {
        "text": "It swaps them and they are now both on the correct side of the split \
                point.",
        "audio": "audio/firstgo11.mp3",
        "pause": 9999
    },
    "firstgo12": {
        "text": "The left marker moves to the right again looking for a value which is \
                greater than the pivot value. ",
        "audio": "audio/firstgo12.mp3",
        "pause": 9999
    },
    "firstgo13": {
        "text": "It finds one and then stops, handing over to the right marker. ",
        "audio": "audio/firstgo13.mp3",
        "pause": 9999
    },
    "firstgo14": {
        "text": "The right marker now looks for a value which is smaller than the \
                pivot value. ",
        "audio": "audio/firstgo14.mp3",
        "pause": 9999
    },
    "firstgo15": {
        "text": "The right marker continues looking for a value which is smaller than \
                the pivot value. ",
        "audio": "audio/firstgo15.mp3",
        "pause": 9999
    },
    "firstgo16": {
        "text": "The right marker continues looking for a value which is smaller than \
                the pivot value. ",
        "audio": "audio/firstgo15.mp3",
        "pause": 9999
    },
    "firstgo17": {
        "text": "The right marker continues looking for a value which is smaller than \
                the pivot value. ",
        "audio": "audio/firstgo15.mp3",
        "pause": 9999
    },
    "firstgo18": {
        "text": "The right marker continues looking for a value which is smaller than \
                the pivot value. ",
        "audio": "audio/firstgo15.mp3",
        "pause": 9999
    },
    "firstgo19": {
        "text": "The right marker continues looking for a value which is smaller than \
                the pivot value. ",
        "audio": "audio/firstgo15.mp3",
        "pause": 9999
    },
    "firstgo20": {
        "text": "It finds one and the function now swaps the values over.",
        "audio": "audio/firstgo20.mp3",
        "pause": 9999
    },
    "firstgo21": {
        "text": "It finds one and the function now swaps the values over.",
        "audio": "audio/blank.mp3",
        "pause": 9999
    },
    "firstgo22": {
        "text": "The left marker moves to the right looking for a value which is greater \
                than the pivot value. ",
        "audio": "audio/firstgo22.mp3",
        "pause": 9999
    },
    "firstgo23": {
        "text": "The left marker moves to the right looking for a value which is greater \
                than the pivot value. ",
        "audio": "audio/firstgo22.mp3",
        "pause": 9999
    },
    "firstgo24": {
        "text": "It finds one and then stops, handing over to the right marker. ",
        "audio": "audio/firstgo23.mp3",
        "pause": 9999
    },
    "firstgo25": {
        "text": "The right marker now looks for a value which is smaller than the pivot \
                value. ",
        "audio": "audio/firstgo14.mp3",
        "pause": 9999
    },
    "firstgo26": {
        "text": "At this point the markers have crossed over, so they have converged \
                on the split point. ",
        "audio": "audio/firstgo26.mp3",
        "pause": 9999
    },
    "firstgo27": {
        "text": "The right marker is at the position where the split point should go. \
                Remember that this is the position where the pivot should be in the \
                sorted list. The algorithm therefore exchanges the current value at \
                the split point with the pivot value.",
        "audio": "audio/firstgo27.mp3",
        "pause": 9999
    },
    "firstgo28": {
        "text": "At this stage the list is not sorted but all the values up to the split \
                point (indicated by the blue pivot marker) are less than the pivot value. \
                <br/><br/> \
                All the values to the right of the split point are greater than the \
                pivot value. \
                <br/><br/> \
                The pivot value itself is at the split point and is at its correct \
                position in the sorted list. ",
        "audio": "audio/firstgo28.mp3",
        "pause": 9999
    },
    "firstgo29": {
        "text": "The same procedure is now carried out recursively on the left and right \
                sublists that have been created. So now we look at the left sublist.",
        "audio": "audio/firstgo29.mp3",
        "pause": 9999
    },
    "firstgo30": {
        "text": "As before the first item is chosen as the pivot and the left and right \
                markers placed at the ends of the remaining list.",
        "audio": "audio/firstgo30.mp3",
        "pause": 9999
    },
    "firstgo31": {
        "text": "The left marker immediately identifies the item greater than the pivot, \
                so it hands over to the right marker. ",
        "audio": "audio/firstgo31.mp3",
        "pause": 9999
    },
    "firstgo32": {
        "text": "The right marker now scans for a value which is less than the pivot value. ",
        "audio": "audio/firstgo32.mp3",
        "pause": 9999
    },
    "firstgo33": {
        "text": "The right marker continues looking for a value which is smaller than \
                the pivot value. ",
        "audio": "audio/firstgo15.mp3",
        "pause": 9999
    },
    "firstgo34": {
        "text": "The right marker continues scanning for a value which is less than \
                the pivot value and crosses over with the left marker. This means \
                there can be no more swaps.",
        "audio": "audio/firstgo35.mp3",
        "pause": 9999
    },
    "firstgo35": {
        "text": "In this case you will also notice \
                the right marker, which will become the split point, has ended up \
                right on top of the pivot! So when the pivot value and the value at \
                the split point are exchanged they are one and the same value and \
                hence on this occasion nothing happens to the list. ",
        "audio": "audio/firstgo36.mp3",
        "pause": 9999
    },
    "firstgo36": {
        "text": "In this case you will also notice \
                the right marker, which will become the split point, has ended up \
                right on top of the pivot! So when the pivot value and the value at \
                the split point are exchanged they are one and the same value and \
                hence on this occasion nothing happens to the list. ",
        "audio": "audio/blank.mp3",
        "pause": 9999
    },
    "firstgo37": {
        "text": "At this point we have split the sublist, and the pivot value is in its \
                correct position, but since it happened to be the smallest value that \
                means it comes right at the start! So the list to the left the pivot \
                (items smaller than the pivot) is empty and there is nothing to do to \
                it.<br/><br/>The function is then called recursively on the list to \
                the right of the pivot.<br/><br/>A new pivot value is found and the \
                left and right markers are placed at either ends of the remaining list.",
        "audio": "audio/firstgo37.mp3",
        "pause": 9999
    },
    "firstgo38": {
        "text": "The value at the left marker is greater than the pivot value, \
                so a value greater than the pivot has been identified straight away.",
        "audio": "audio/firstgo38.mp3",
        "pause": 9999
    },
    "firstgo39": {
        "text": "The right marker scans for a value which is less than the pivot value. \
                As happened before it crosses over with the left marker before one is \
                found.",
        "audio": "audio/firstgo39.mp3",
        "pause": 9999
    },
    "firstgo40": {
        "text": "The right marker ends up on top of the pivot so the pivot value and \
                the value at the split point 'swap on the spot' again.<br/><br/>Again \
                the left sublist is empty, so the algorithm is called on the right-hand \
                sublist which contains just two items. ",
        "audio": "audio/firstgo40.mp3",
        "pause": 9999
    },
    "firstgo41": {
        "text": "The right marker ends up on top of the pivot so the pivot value and \
                the value at the split point 'swap on the spot' again.<br/><br/>Again \
                the left sublist is empty, so the algorithm is called on the right-hand \
                sublist which contains just two items. ",
        "audio": "audio/blank.mp3",
        "pause": 9999
    },
    "firstgo42": {
        "text": "The right marker ends up on top of the pivot so the pivot value and \
                the value at the split point 'swap on the spot' again.<br/><br/>Again \
                the left sublist is empty, so the algorithm is called on the right-hand \
                sublist which contains just two items. ",
        "audio": "audio/blank.mp3",
        "pause": 9999
    },
    "firstgo43": {
        "text": "The pivot value is the first item. The left and right markers are set \
                to the same item. ",
        "audio": "audio/firstgo43.mp3",
        "pause": 9999
    },
    "firstgo44": {
        "text": "The right marker moves to the left looking for an item less than \
                the pivot value.",
        "audio": "audio/firstgo44.mp3",
        "pause": 9999
    },
    "firstgo45": {
        "text": "The markers have now crossed over. \
                <br/><br/> \
                The pivot value and the value at the split point are exchanged. ",
        "audio": "audio/firstgo45.mp3",
        "pause": 9999
    },
    "firstgo46": {
        "text": "The sublist to the left of the split point now consists of a single item, \
                so it is sorted. The sublist to the right is empty. So the recursion \
                cannot go any further and the left sublist of four items is sorted. \
                The fifth value, which was the original pivot, moved to the corresponding \
                split point, is also at its correct position in the sorted order.",
        "audio": "audio/firstgo46.mp3",
        "pause": 9999
    },
    "firstgo47": {
        "text": "Now the sublist to the left of the original split point has been sorted, \
                the same process is applied to the right sublist.",
        "audio": "audio/firstgo47.mp3",
        "pause": 9999
    },

    "fast": {
        "text": "Now moving through the rest quickly.",
        "audio": "audio/fast.mp3",
        "pause": 9999
    },
    "sorted": {
        "text": "Once the right-hand sublist has been sorted the sort is complete and \
                the entire list is in order. \
                <br/><br/> \
                This ends the visualisation. \
                <br/><br/>\
                <p style='font-size:90%;font-style:italic;'>Click Reset to restart \
                the visualisation of the sorting algorithm. If Random is selected then \
                a new random set will appear for sorting, but with less explanation.</p>",
        "audio": "audio/sorted.mp3",
        "pause": 9999
    },
    "h5aa": {
        "type": "QuickSort"
    }
};
