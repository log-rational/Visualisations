var data = {
    description: "Knapsack problem",
    panelColour: "#FFF",
    baseColour: "#FFF",
    backgroundColour: "#FFF",
    highlight: "#f00",

    timerPause: 40,
    checkPauseMute: 50,
    animationStepsInit: 80,

    pageCount: 24,

    tableColors: {
        foreground: "#000",
        background: "#ddd",
        backgroundLeft: "#FFF",
        text: "#000",
        highlight: "#ff8c82"
    },
    arrowColor: "#f00",
    rowHighlight: "#f00",
    cellHighlight: "#fc0",
    currency: "£",
    weightUnit: "g",
    weightLabels: ["Weight limit", "0", "1", "2", "3", "4", "5", "6"],
    valueLabel: "Value",
    gemLabel: "Gem",
    gemHeadings: ["Jewel", "Weight", "Value"],
    gemHeadingColors: {foreground: "#fff", background: "#000"},
    gemLetters: {
        R: "ruby",S: "sapphire",
        D: "diamond"
    },
    gems: {
        ruby: {color:"#ff8c82", weight: 2, value: 3},
        sapphire: {color:"#76d6ff", weight: 4, value: 6},
        diamond: {color:"#eee", weight: 5, value: 7}
    },

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
        text: "In this visualisation we look at an example of the unbounded knapsack problem. \
              <br/><br/> \
              We've used different units to those in the module text but this doesn't matter \
              as they are only used to illustrate how the algorithm works. \
              <br/><br/> \
              <p style='font-size:90%;font-style:italic;'>Click Next to start the visualisation \
              of the algorithm.</p> ",
        audio: "audio/inthisvisualisation.mp3"
    },
    page2: {
        text: "The objective is to find the optimal combination of gems which can fit in a \
              bag with a weight limit of 6 grams. We want to maximise the total value of the \
              gems in the bag (the 'knapsack'). \
              <br/><br/> \
              It’s called the unbounded problem because we can use any number of each type \
              of jewel. ",
        action: {
            highlight: "",
            value: "0000000",
            gem: "",
            arrow: ["", ""]
        },
        audio: "audio/theobjectiveistofind.mp3"
    },
    page3: {
        text: "In our example the gems have weights of 2, 4 and 5 grams. \
              <br/><br/> \
              We’re going to keep track of the optimal value for bags that can contain at \
              most 0 grams, 1 gram, 2 grams, 3 grams … 6 grams. \
              <br/><br/> \
              This is done in the value row. In the unit, the b list (for best value) is \
              used for this together with the variables \
              <span style='font-size:120%;font-family: \"courier new\",courier,fixed,monospace'>currentbest</span> \
              and \
              <span style='font-size:120%;font-family: \"courier new\",courier,fixed,monospace'>possiblebest</span> \
              for \
              intermediate results. To enable us to identify the corresponding jewels later \
              on we also keep track of the type of gem most recently added to each bag. This \
              is done in the gem row. ",
        action: {
            highlight: "",
            value: "0000000",
            gem: "",
            arrow: ["", ""]
        },
        audio: "audio/inourexample.mp3"
    },
    page4: {
        text: "We know the bag with a weight limit of 0 grams will be empty, so the \
              algorithm starts by looking to fill a bag with a weight limit of 1 gram, looking \
              for the optimal combination of gems that doesn’t exceed this limit. \
              <br/><br/> \
              The algorithm tries a ruby, a sapphire and a diamond. Nothing will fit. So the \
              entry in the value row remains 0 and there is no entry in the gem row. ",
        action: {
            highlight: "1 r",
            value: "0000000",
            gem: "",
            arrow: ["", ""]
        },
        action2: {
            highlight: "1rr",
            value: "0000000",
            gem: "",
            arrow: ["", ""]
        },
        action3: {
            highlight: "1sr",
            value: "0000000",
            gem: "",
            arrow: ["", ""]
        },
        action4: {
            highlight: "1dr",
            value: "0000000",
            gem: "",
            arrow: ["", ""]
        },
        action5: {
            highlight: "1 r",
            value: "0000000",
            gem: "",
            arrow: ["", ""]
        },
        audio: "audio/weknowthebag.mp3"
    },
    page5: {
        text: "The algorithm next looks at what gems can fit in a bag with a weight \
              limit of 2 grams. \
              <br/><br/> \
              Suppose a ruby was the last jewel added to the bag. \
              <br/><br/> \
              What could have been in the bag before that? There would only be 0 grams to \
              fit it in because the ruby takes up 2 grams and 2 - 2 equals 0. ",
        action: {
            highlight: "2rr",
            value: "0000000",
            gem: "",
            arrow: ["", ""]
        },
        action2: {
            highlight: "2rr",
            value: "0000000",
            gem: "",
            arrow: ["20", ""]
        },
        audio: "audio/thealgorithmnextlooks.mp3"
    },
    page6: {
        text: "The remaining capacity of 0 grams is associated with a value of £0. So \
              we now have a total value of £0 + £3 = £3. \
              <br/><br/> \
              The value row holds the highest value found so far and if we have a bag that \
              can only hold a weight of 2 grams then a ruby gives a value of £3 which is \
              better than the current value of £0. \
              <br/><br/> \
              So we store £3 in the value row and we store R (for ruby) in the gem row. ",
        action: {
            highlight: "2rr",
            value: "0000000",
            gem: "",
            arrow: ["20", "02"]
        },
        action2: {
            highlight: "2rr",
            value: "0030000",
            gem: "  R",
            arrow: ["20", "02"]
        },
        audio: "audio/theremainingcapacity.mp3"
    },
    page7: {
        text: "Next the algorithm tries a sapphire, which weighs 4 grams. Because the bag \
              can hold only 2 grams it won’t fit and we move on. ",
        action: {
            highlight: "2sr",
            value: "0030000",
            gem: "  R",
            arrow: ["", ""]
        },
        audio: "audio/nextthealgorithm.mp3"
    },
    page8: {
        text: "The diamond will not fit either. \
              <br/><br/> \
              So we know that for a knapsack with a weight limit of 2 grams the optimal value \
              is £3. ",
        action: {
            highlight: "2dr",
            value: "0030000",
            gem: "  R",
            arrow: ["", ""]
        },
        audio: "audio/thediamondwillnotfit.mp3"
    },
    page9: {
        text: "The algorithm next looks at what gems can fit in a bag with a weight limit \
              of 3 grams. A ruby, which weighs 2 grams, will fit in a bag with a capacity \
              of 3 grams. This leaves 1 gram free. \
              <br/><br/> \
              We then look back to see the optimal value for a bag with a weight limit of 1 \
              gram. We’ve already found the value is £0. So the value we get by using a ruby \
              is £0 + £3 = £3. \
              <br/><br/> \
              This is better than £0 so we enter £3 in the value row and R in the gem row \
              and move on to the next gem, the sapphire. ",
        action: {
            highlight: "3rr",
            value: "0030000",
            gem: "  R",
            arrow: ["31", ""]
        },
        action2: {
            highlight: "3rr",
            value: "0030000",
            gem: "  R",
            arrow: ["31", "13"]
        },
        action3: {
            highlight: "3rr",
            value: "0033000",
            gem: "  RR",
            arrow: ["31", "13"]
        },
        audio: "audio/thealgorithmnextlooksat.mp3"
    },
    page10: {
        text: "A sapphire weighs 4 grams so it won’t fit in a bag with a capacity of 3 grams. \
              <br/><br/> \
              We move on to the next gem, the diamond. ",
        action: {
            highlight: "3sr",
            value: "0033000",
            gem: "  RR",
            arrow: ["", ""]
        },
        audio: "audio/asapphireweighs.mp3"
    },
    page11: {
        text: "A diamond weighs 5 grams so it won’t fit either. So for a bag with a weight \
              limit of 3 grams the optimal value is £3. ",
        action: {
            highlight: "3dr",
            value: "0033000",
            gem: "  RR",
            arrow: ["", ""]
        },
        audio: "audio/adiamondweighs.mp3"
    },
    page12: {
        text: "The algorithm next looks at what gems can fit in a bag with a weight limit \
              of 4 grams. \
              <br/><br/> \
              A ruby weighs 2 grams so it will fit in a bag with a capacity of 4 grams. ",
        action: {
            highlight: "4rr",
            value: "0033000",
            gem: "  RR",
            arrow: ["", ""]
        },
        audio: "audio/thealgorithmnextlooksatwhat.mp3"
    },
    page13: {
        text: "We subtract the weight of the ruby, which is 2 grams, from the capacity of \
              the bag. This leaves us with a remaining capacity of 2 grams. We look back to \
              see what the optimal value is for a bag with a weight limit of 2 grams. The \
              value row tells us that the optimal value for 2 grams is £3. \
              <br/><br/> \
              We add £3 to the current value of £3 to get £6 and this is entered into the \
              value row below 4 grams. We also enter R in the gem row. ",
        action: {
            highlight: "4rr",
            value: "0033000",
            gem: "  RR",
            arrow: ["42", ""]
        },
        action2: {
            highlight: "4rr",
            value: "0033000",
            gem: "  RR",
            arrow: ["42", "24"]
        },
        action3: {
            highlight: "4rr",
            value: "0033600",
            gem: "  RRR",
            arrow: ["42", "24"]
        },
        audio: "audio/wesubtract.mp3"
    },
    page14: {
        text: "We move on to a sapphire. This weighs 4 grams, so it can be fitted into the \
               bag with a capacity of 4 grams. \
               <br/><br/> \
               Next, we need to check the bag with a weight limit of 0 grams. Its value of \
               £0 together with the £6 for the sapphire gives a total of £6. \
               <br/><br/> \
               This is no better than the £6 which is our current best so we leave the value \
               and gem rows unchanged. Now we move on to the next gem, the diamond. ",
        action: {
            highlight: "4sr",
            value: "0033600",
            gem: "  RRR",
            arrow: ["", ""]
        },
        action2: {
            highlight: "4sr",
            value: "0033600",
            gem: "  RRR",
            arrow: ["40", ""]
        },
        action3: {
            highlight: "4sr",
            value: "0033600",
            gem: "  RRR",
            arrow: ["40", "04"]
        },
        audio: "audio/wemoveontoasapphire.mp3"
    },
    page15: {
        text: "A diamond weighs 5 grams so it can’t fit into a bag with a capacity of 4 grams. \
              <br/><br/> \
              So the optimal value for a bag that can hold 4 grams remains £6. ",
        action: {
            highlight: "4dr",
            value: "0033600",
            gem: "  RRR",
            arrow: ["", ""]
        },
        audio: "audio/adiamondweighs5.mp3"
    },
    page16: {
        text: "We now move on to a bag with a weight limit of 5 grams and test it with a ruby. \
              <br/><br/> \
              Will it fit? Yes it will, so we look back to a bag with a capacity of 3 grams \
              and find the optimal value for that weight is £3, giving a total value of £6. ",
        action: {
            highlight: "5rr",
            value: "0033600",
            gem: "  RRR",
            arrow: ["", ""]
        },
        action2: {
            highlight: "5rr",
            value: "0033600",
            gem: "  RRR",
            arrow: ["53", ""]
        },
        action3: {
            highlight: "5rr",
            value: "0033600",
            gem: "  RRR",
            arrow: ["53", "35"]
        },
        action4: {
            highlight: "5rr",
            value: "0033660",
            gem: "  RRRR",
            arrow: ["53", "35"]
        },
        audio: "audio/wenowmoveon.mp3"
    },
    page17: {
        text: "Moving on to a sapphire we find that this will fit into a bag with a capacity \
              of 5 grams leaving a remaining capacity of 1 gram. Looking back we see that \
              this adds nothing so the total value is £6 which is the same as the current \
              optimal value and we leave the value and gem rows unchanged. ",
        action: {
            highlight: "5sr",
            value: "0033660",
            gem: "  RRRR",
            arrow: ["51", ""]
        },
        action2: {
            highlight: "5sr",
            value: "0033660",
            gem: "  RRRR",
            arrow: ["51", "15"]
        },
        audio: "audio/movingontoasapphire.mp3"
    },
    page18: {
        text: "Moving on to a diamond we find that this will fit into a bag with a capacity \
              of 5 grams leaving a remaining capacity of 0 grams. Looking back we see that \
              this adds nothing so the total value is £7. £7 is greater than the current best \
              value of £6 so we use the higher value and update R to D in the gem row. \
              <br/><br/> \
              So the optimal value for a bag that can hold 5 grams is £7. ",
        action: {
            highlight: "5dd",
            value: "0033670",
            gem: "  RRRR",
            arrow: ["", ""]
        },
        action2: {
            highlight: "5dd",
            value: "0033670",
            gem: "  RRRR",
            arrow: ["50", ""]
        },
        action3: {
            highlight: "5dd",
            value: "0033670",
            gem: "  RRRR",
            arrow: ["50", "05"]
        },
        action4: {
            highlight: "5dd",
            value: "0033670",
            gem: "  RRRD",
            arrow: ["50", "05"]
        },
        audio: "audio/movingontoadiamond.mp3"
    },
    page19: {
        text: "We now move on to a bag with a weight limit of 6 grams and test it with a ruby. \
              <br/><br/> \
              This has a weight of 2 grams. We look back at the bag that is 2 grams lighter \
              and see we can get £6 worth of gems in it, so we add that to the value of a \
              ruby giving a total value of £9 for a bag with a weight limit of 6 grams. ",
        action: {
            highlight: "6rr",
            value: "0033670",
            gem: "  RRRD",
            arrow: ["", ""]
        },
        action2: {
            highlight: "6rr",
            value: "0033670",
            gem: "  RRRD",
            arrow: ["64", ""]
        },
        action3: {
            highlight: "6rr",
            value: "0033670",
            gem: "  RRRD",
            arrow: ["64", "46"]
        },
        action4: {
            highlight: "6rr",
            value: "0033679",
            gem: "  RRRDR",
            arrow: ["64", "46"]
        },
        audio: "audio/wenowmoveonto.mp3"
    },
    page20: {
        text: "We look at putting a sapphire in. This will fit and leaves a remaining capacity \
              of 2 grams. \
              <br/><br/> \
              Looking in the value row we get £3 for a bag with a capacity of 2 grams which \
              gives a total value of £9. \
              <br/><br/> \
              This is the same as the current value,  so we leave the value and gem rows \
              unchanged. We move on to the next gem, the diamond. ",
        action: {
            highlight: "6sr",
            value: "0033679",
            gem: "  RRRDR",
            arrow: ["", ""]
        },
        action2: {
            highlight: "6sr",
            value: "0033679",
            gem: "  RRRDR",
            arrow: ["62", ""]
        },
        action3: {
            highlight: "6sr",
            value: "0033679",
            gem: "  RRRDR",
            arrow: ["62", "26"]
        },
        audio: "audio/welookatputting.mp3"
    },
    page21: {
        text: "Looking at the diamond we see that this leaves a bag with a capacity of 1 gram \
              which has a value of £0. \
              <br/><br/> \
              This would add up to £7 which is smaller than the current best of £9, so we \
              leave the value and gem rows unchanged. ",
        action: {
            highlight: "6dr",
            value: "0033679",
            gem: "  RRRDR",
            arrow: ["", ""]
        },
        action2: {
            highlight: "6dr",
            value: "0033679",
            gem: "  RRRDR",
            arrow: ["61", ""]
        },
        action3: {
            highlight: "6dr",
            value: "0033679",
            gem: "  RRRDR",
            arrow: ["61", "16"]
        },
        audio: "audio/lookingatthediamond.mp3"
    },
    page22: {
        text: "We now know the optimal value of each bag with a weight limit from 1 to 6 \
              grams so we know that £9 is the optimal value for a bag with a weight limit \
              of 6 grams. \
              <br/><br/> \
              As we kept a record of the gem type that was added to the bag to achieve the \
              optimal value for that weight limit, we can now look back and see which \
              combination of gems was added to the bag and in what order. \
              <br/><br/> \
              We start with the last gem that was added to obtain the optimal value for a \
              6 gram bag. According to the gem row this was a ruby of 2 grams. We look back \
              to the result for a bag with a weight limit of 4 grams. ",
        action: {
            highlight: "6",
            value: "0033679",
            gem: "  RRRDR",
            arrow: ["", ""]
        },
        action2: {
            highlight: "6",
            value: "0033679",
            gem: "  RRRDR",
            arrow: ["64", ""]
        },
        audio: "audio/wenowknowtheoptimal.mp3"
    },
    page23: {
        text: "Again we find that the last item added was a ruby. So, from 4 grams we look \
              back to a bag with a capacity of 2 grams.  Again, it was a 2 gram ruby that \
              was added. Finally we end up with a bag that has a capacity of 0 grams and we \
              don’t need to look further back. \
              <br/><br/> \
              Each time we looked back we found the type of gem that was added, so now \
              we can see that 3 rubies is an optimal combination which gives the optimal \
              value of £9. ",
        action: {
            highlight: "6",
            value: "0033679",
            gem: "  rRrDr",
            arrow: ["644220", ""]
        },
        audio: "audio/againwefindthatthelast.mp3"
    },
    sorted: {
        text: "<p style='font-size:100%;font-weight:bold;'>Learning outcomes</p> \
              In this visualisation you saw how an optimal solution for the value of the \
              gems that can fit in a bag of a given weight limit can be computed by considering \
              the optimal combination to fit in bags of capacity 0 grams, 1 gram, 2 grams, \
              3 grams … and so on successively until we reach the given bag weight limits. \
              <br/><br/> \
              <p style='font-size:90%;font-style:italic;'>Click Reset to start again.</p>",
        action: {
            highlight: "",
            value: "0033679",
            gem: "  RRRDR",
            arrow: ["", ""]
        },
        audio: "audio/learningoutcomes.mp3"
    },
    h5aa: {
        type: "Knapsack"
    }
};