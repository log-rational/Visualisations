/**
 * @fileOverview Countability
 *
 * Additional functions that are not defined in this file but are available to all activities:
 * <ul>
 * <li> this.header(h) - changes current H1 and H2 tags, where parameter h is of format: { h1: 'optional H1', h2: 'optional H2' }</li>
 * <li> this.loadCSSFile(f) - loads additional CSS from the file f - which is a file path relative to the activity data folder</li>
 * <li> this.addMessengerParams(paramsArray) - See documentation for Messenger functions in OU.js</li>
 * <li> this.defineActivityAPI(json object) - defines an API for this activity
 * </ul>
 *
 * @author Callum Lester <callum.lester@open.ac.uk>
 */

// Load in any util elements that are required
OU.require('OU.util.Layer');
OU.require('OU.util.InfoButton');

/**
 * @class Countability - A template for activities that extend the OU.util.Activity class
 * @extends OU.util.Activity
 * @param {Object} data - Holds the data content for a specific instance of the activity
 * @param {String} instance - (Optional) A unique identifier name for this instance, defaults to 'a1'
 * @param {OU.util.Controller} controller - (Optional) A reference to the controller that initialised this instance, if undefined, the superclass will generate a new controller and create the reference to it as 'this.controller'
 */
OU.activity.Countability = function (data, instance, controller) {
    /**
     * canvasView - this is the function that is first called when the activity is launched,
     *              assuming you are in a browser that supports canvas.
     *
     * Typical tasks for this function are:
     * <ul>
     * <li> Define and initialise and activity wide variables</li>
     * <li> Initialise Layers & Divs</li>
     * <li> Call a loading function</li>
     * <li> Initiating the activity by calling any methods that</li>
     * </ul>
     */
    OU.activity.Countability.prototype.canvasView = function () {
        this.barCount = this.data.barCount; // number of items (bars) to sort
        this.timerPause = this.data.timerPause; // 25 frames per second for timer pause
        this.animationStepsInit = this.data.animationStepsInit; // number of steps to do for swap animation

        this.setAnimationSteps(this.animationStepsInit); // set the number of steps to do for swap animation

        var bH = OU.controlHeight; // bad name copied from another module

        // Most activities should have a background layer
        this.bgLayer = new OU.util.Layer({
            container: this
        });

        // create a layer for the visualisation to be "painted" on
        this.visualisationLayer = new OU.util.Layer({
            container: this, // put it in current container
            id: 'visualisationLayer', // give it a meaningful id
            x: this.w * 0.02, // put it a tenth of the width in
            y: this.h * 0.02 + bH, // put it a tenth of the height down plus control height
            w: this.w * 0.98, // 80% width
            h: this.h * 0.76, // 60% height
            hasEvents: true, // standard event and pinch stuff
            pinch: this.pinch,
            pinchMe: this // remember no comma for last param
        });

        // create a layer for the controls
        this.controlLayer = new OU.util.Layer({
            container: this, // put it in current container
            id: 'controlLayer', // give it a meaningful id
            x: this.w * 0.1, // put it a tenth of the width in
            y: this.visualisationLayer.y + this.visualisationLayer.h, // put it under the visualisation layer
            w: this.visualisationLayer.w, // make it the same width as visualiation
            h: this.h * 0.2, // 20% height
            hasEvents: true, // standard event and pinch stuff
            pinch: this.pinch,
            pinchMe: this
        });

        this.modelLayer = new OU.util.Layer({
            container : this,
            id : 'model-layer',
            x : 0,
            y : 0,
            w : 50,
            h : 60,
            hasEvents : true
        });

        this.controlLayer.context.gradRect(); // use default background

        this.textDiv = new OU.util.Div({ // put in a div for text info
            container: this,
            style: "font-size:100%;"
        });
        this.textDiv.div.innerHTML = "<div class='headingCount'>" + data.description + " (1/" + (data.pageCount) + ")</div>" + this.data.intro.text; // get student instruction text from data file and put in text div

        this.audioElement = document.createElement('audio'); // create the audio element

        this.initControls();  // initialise the controls
        this.resetAnimation(); // reset the visualisation
        this.resize(); // resize to put everything in correst place and relative size
        this.resetAnimation(); // reset the visualisation

        this.playAudio(data.intro.audio);
    };

    OU.activity.Countability.prototype.playAudio = function (audioFile) {
        if (this.audioPlay) {
            this.audioElement.setAttribute('src', this.dataDir + audioFile); // intro audio
            this.audioElement.play(); // play the audio
        }
    };

    // set the number of steps of movement for the animation for swapping bars
    OU.activity.Countability.prototype.setAnimationSteps = function (steps) {
        this.animationSteps = steps; // set the var
        this.initDisplacements(); // calcualate all the animation movement displacements - using cosine for acceleration and deceleration
    };

    // calcualate all the animation movement displacements - using cosine for acceleration and deceleration
    OU.activity.Countability.prototype.initDisplacements = function () {
        var i, inc,
            total = 0; // total displacement is addition of all steps
        // init animation relative displacements with accelerationa and deceleration
        this.displacements = []; // store the displacements

        for (i = 0; i < this.animationSteps; i++) {
            // use a (1 - cos) function over 360' to create the different displacesments for acceleration and deceleration
            inc = 1 - Math.cos(i / this.animationSteps * 2 * Math.PI);
            total += inc; // get the total displacement
            this.displacements[i] = total; // store the displacement
        }
        this.displacements.push(this.animationSteps);
    };

    // initialise the controls - buttons and checkbox on bottom of module
    OU.activity.Countability.prototype.initControls = function () {
        var self = this,
            bH = OU.controlHeight,
            btnSpace = 100 / 4,
            btnWidth = btnSpace * 0.9,
            cssWidth = "width:" + btnWidth + "%;",
            xPad = btnSpace * 0.05,
            btnTop = 91;

        this.backBtn = Utils.newButton(
            xPad + "%",
            btnTop + "%", //left,top
            "Back",
            function () {
                self.back();
            },
            cssWidth, //specific css
            'b', //default a tag, b button, r radio, "c" checkbox
            "backButton" //component id
        );

        this.nextBtn = Utils.newButton(
            (btnSpace + xPad) + "%",
            btnTop + "%", //left,top
            "Next",
            function () {
                self.next();
            },
            cssWidth, //specific css
            'b', //default a tag, b button, r radio, "c" checkbox
            "nextButton"//component id
        );

        this.resetBtn = Utils.newButton( // init the reset button
            (btnSpace * 2 + xPad) + "%",
            btnTop + "%", //left,top
            "Reset",
            function () {
                self.resetAnimation();
            },
            cssWidth, //specific css
            'b', //default a tag, b button, r radio, "c" checkbox
            "resetButton"//component id
        );

        this.audioBtn = Utils.newButton( // init the audio chechbox button
            (btnSpace * 3 + xPad) + "%",
            btnTop + "%", //left,top
            "Audio",
            function () {
                self.toggleAudio();
            },
            cssWidth,
            "c",
            "audioButton"
        );

        this.audioBtn.checked = true;
        this.audioPlay = true; // toggle var to play audio

        this.infoButton = new OU.util.InfoButton({
            layer : this.modelLayer,
            x : 16,
            y : bH - 16,
            w : 32,
            h : 32,
            autoWidth : false,
            padding : 10,
            onClick : function () {
                new OU.util.PopUpInfo({
                    container : self,
                    txt : self.data.help,
                    x : self.w * 0.20,
                    y : self.h * 0.15,
                    w : self.w * 0.6,
                    h : self.h * 0.7
                    /*onClose : function () {
                    }*/
                });
            }
        });
    };

    // reset the animation by going back to the beginning and randomly sorting the items
    OU.activity.Countability.prototype.resetAnimation  = function () {
        this.orderLast = -1;
        this.goingBack = false;
        this.highlightOld = null;
        this.action = data.intro.action;
        this.backList = [];
        this.backBtn.disable();
        this.nextBtn.enable();
        this.resetBtn.disable();
        this.audioElement.pause(); // stop audio playing
        this.dead = true; // kill animation
        this.sorted = true;
        this.position = 0;
        this.textDiv.div.innerHTML = "<div class='headingCount'>" + data.description + " (1/" + (data.pageCount) + ")</div>" + this.data.intro.text; // get student instruction text from data file and put in text div
        this.setNodeDimensions();
        this.render(); // render the module
    };

    OU.activity.Countability.prototype.setNodeDimensions = function () {
        var pad,
            h = this.visualisationLayer.h, // get height
            w = this.visualisationLayer.w; // get width

        this.top = h * 0.05; // horizon for reflection - 73% down
        this.bottom = h * 0.60; // horizon for reflection - 73% down
        this.nodeSpace = Math.min(w / 18, h / 8); // the space needed for each bar including padding
        this.nodeSize = Math.min(this.nodeSpace, h / 4);
        pad = this.nodeSpace - this.nodeSize;
        this.halfPad = pad / 2; // half the padding width is the padding at each side of the bar
    };

    /**
     * The main renderer.
     */
    OU.activity.Countability.prototype.render = function () {
        this.drawVisualisation();
    };

    OU.activity.Countability.prototype.drawVisualisation = function () {
        var ctx = this.visualisationLayer.context, // get the graphics context
            h = this.visualisationLayer.h, // get height
            w = this.visualisationLayer.w; // get width

        // Draw background colour
        ctx.fillStyle = this.data.backgroundColour;
        ctx.fillRect(0, 0, w, h);

        // draw table
        this.drawTable();

        if (this.animating >= this.animationSteps) { // if done all animating steps
            this.animating = -1; // set to not animating
            this.animatingFinished(); // do all the stuff after animation finishes
        }
        if (this.animating > -1) { // if still animating
            this.animating++; // next animation step
        }
    };

    OU.activity.Countability.prototype.drawTable = function () {
        var boxWidth = this.nodeSize * 1.5,
            boxHeight = this.nodeSize * 0.9,
            lineCount = data.gridSize + 3,
            cellCount = lineCount - 1,
            pairCount = lineCount - 2,
            ctx = this.visualisationLayer.context, // get the graphics context
            xLeft = this.nodeSize, ///(this.visualisationLayer.w - boxWidth * lineCount) / 2,
            x1 = xLeft,
            x2 = xLeft + boxWidth * cellCount,
            x,
            y1 = 0,
            y2 = y1 + boxHeight * cellCount,
            y,
            i,
            j,
            lineSize,
            isLast;

        this.listLeft = x2 + boxWidth;
        this.listTop = y1;

        ctx.save(); // drawing and changing context so save last context to restore at end
        ctx.lineWidth = this.nodeSize / 30;
        ctx.font = 'bold ' + this.getNodeFontSize() * 0.4 + 'px Arial';

        lineSize = this.nodeSize / 30;

        x = xLeft + boxWidth * 0.5;

        for (i = 0; i < lineCount; i++) {
            // draw lines
            this.drawBorders(ctx, i, x1, x2, y1, y2, boxWidth, boxHeight, lineSize);

            if (i < cellCount) {
                y = boxHeight * 0.5;

                // draw first row of b's
                this.drawHeadings(ctx, "b", i, x, y, pairCount, boxWidth, boxHeight);

                for (j = 0; j < cellCount; j++) {
                    ctx.fillStyle = data.tableColors.text;
                    if (i === 0) {
                        // draw left column of a's
                        this.drawHeadings(ctx, "a", j, x, y, pairCount, boxWidth, boxHeight);
                    } else if (j > 0) {
                        isLast = j === pairCount || i === pairCount;
                        if (!isLast) {
                            // draw highlihgt and order number
                            ctx.lineWidth = lineSize;
                            this.drawCurrent(ctx, i, j, x, y, boxWidth, boxHeight);
                        }
                        if (! this.action.pairs || (this.action.pairs === "fadein")) {
                            // draw pair
                            this.drawPair(ctx, i, j, x, y, boxWidth, boxHeight, isLast, false, this.action.pairs === "fadein");
                        }
                    }
                    y += boxHeight;
                }
            }
            x += boxWidth;
        }
        ctx.restore(); // restore the context to previous
    };

    OU.activity.Countability.prototype.drawBorders = function (ctx, i, x1, x2, y1, y2, boxWidth, boxHeight, lineSize) {
        var xLine = x1 + i * boxWidth,
            yLine = y1 + i * boxHeight;

        ctx.save();

        if (i === 0) {
            ctx.beginPath();
            ctx.fillStyle = data.tableColors.background;
            ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
            ctx.fillStyle = data.tableColors.backgroundLeft;
            ctx.fillRect(x1, y1, x2 - x1, boxHeight);
            ctx.fillRect(x1, y1, boxWidth, y2 - y1);
            ctx.fill();
        }

        ctx.strokeStyle = data.tableColors.foreground;
        ctx.lineWidth = i == 1 ? lineSize * 2 : lineSize;

        ctx.beginPath();
        ctx.moveTo(xLine, y1);
        ctx.lineTo(xLine, y2);
        ctx.moveTo(x1, yLine);
        ctx.lineTo(x2, yLine);
        ctx.stroke();
        ctx.restore();
    };



    OU.activity.Countability.prototype.drawPair = function (ctx, i, j, x, y, boxWidth, boxHeight, isLast, highlight, fadeIn) {
        var textW = [],
            i,
            yPos,
            centerW = 0,
            letters = [],
            fontSize = this.getNodeFontSize(),
            text = isLast ? "..." : "(a" + j + ",b" + i + ")",
            fontNames = { normal: 'bold ' + fontSize * 0.4 + 'px Arial',
                          italic: 'bold italic ' + fontSize * 0.4 + 'px Arial',
                          sub: 'bold ' + fontSize * 0.3 + 'px Arial'
                        },
            fonts = [
                     fontNames.normal,
                     fontNames.italic,
                     fontNames.sub,
                     fontNames.normal,
                     fontNames.italic,
                     fontNames.sub,
                     fontNames.normal
                   ];

        y += (isLast ? 0 : boxHeight / 5);
        ctx.fillStyle = highlight ? data.highlight : data.tableColors.text;
        if (fadeIn && this.animating > -1) {
            ctx.globalAlpha = this.animating / this.animationSteps;
        }
        if (isLast) {
            textW[0] = ctx.measureText(text).width;
            ctx.font = fontNames.normal;
            ctx.fillText(text, x - textW[0] / 2, y);
        } else {

            for (i = 0; i < text.length; i++) {
                letters[i] = text.substring(i, i + 1);
                ctx.font = fonts[i];
                textW[i] = ctx.measureText(letters[i]).width;
                centerW += i > 3 ? 0 : i === 3 ? textW[i] / 2 : textW[i];
            }
            x -= centerW;
            for (i = 0; i < text.length; i++) {
                yPos = y + (fonts[i] === fontNames.sub ? + fontSize / 6 : 0);
                ctx.font = fonts[i];
                ctx.fillText(letters[i], x, yPos);
                x += textW[i];
            }
        }
        ctx.globalAlpha = 1;
    };

    OU.activity.Countability.prototype.drawIndex = function (ctx, index, x, y, boxWidth, boxHeight, highlight, fadeIn) {
        var text = index;

        y += boxHeight / 5;

        this.drawText(ctx, text, x, y, fadeIn, highlight);
    };

    OU.activity.Countability.prototype.drawText = function (ctx, text, x, y, fadeIn, highlight) {
        var textW,
            fontSize = this.getNodeFontSize();

        if (fadeIn && this.animating > -1) {
            ctx.globalAlpha = this.animating / this.animationSteps;
        }

        ctx.font = 'bold' + fontSize * 0.4 + 'px Arial';
        ctx.fillStyle = highlight ? data.highlight : data.tableColors.text;
        textW = ctx.measureText(text).width / 2;
        ctx.fillText(text, x - textW, y);
        ctx.globalAlpha = 1;
    };

    OU.activity.Countability.prototype.drawCurrent = function (ctx, i, j, x, y, boxWidth, boxHeight) {
        var order = data.order[j - 1][i - 1],
            text,
            textW,
            moveStep,
            xHighlight,
            yHighlight,
            xPair,
            yPair,
            listHeight,
            isCurrent,
            currentOrder = this.action.order;

        if (order <= currentOrder) {
            // draw order number
            if (order === currentOrder) {
                // draw highlight
                if (this.highlightOld && this.animating > -1) {
                    moveStep = 1 / this.animationSteps * this.displacements[Math.min(this.animationSteps, this.animating * 2)];
                    xHighlight = this.highlightOld.x + (x - this.highlightOld.x) * moveStep;
                    yHighlight = this.highlightOld.y + (y - this.highlightOld.y) * moveStep;
                } else {
                    xHighlight = x;
                    yHighlight = y;
                }
                this.drawHighlight(ctx, xHighlight - boxWidth / 2, yHighlight - boxHeight / 2, boxWidth, boxHeight, data.highlight);
                this.highlightOld = {x: xHighlight, y: yHighlight};
                if (this.animating > -1) {
                    ctx.globalAlpha = Math.max(this.animating / this.animationSteps * 2 - 1, 0);
                }
            }
            // draw order number
            ctx.fillStyle = data.tableColors.highlight;
            text = order;
            textW = ctx.measureText(text).width / 2;
            ctx.fillText(text, x - textW, y - boxHeight / 5);
            ctx.globalAlpha = 1;

            listHeight = boxHeight * 0.6;
            xPair = this.listLeft;
            yPair = (currentOrder > 13) ? order - currentOrder + 13: order - 1;
            yPair = this.listTop + listHeight / 3 + yPair * listHeight;
            isCurrent = currentOrder === order;
            if (currentOrder - order < 14) {
                ctx.save();
                ctx.beginPath();
                ctx.fillStyle = data.tableColors.backgroundLeft;
                ctx.fillRect(xPair - boxWidth / 2, yPair - listHeight * 0.3, boxWidth, listHeight);
                ctx.fillStyle = data.tableColors.background;
                ctx.fillRect(xPair + boxWidth / 2, yPair - listHeight * 0.3, boxWidth, listHeight);
                ctx.rect(xPair - boxWidth / 2, yPair - listHeight * 0.3, boxWidth, listHeight);
                ctx.rect(xPair + boxWidth / 2, yPair - listHeight * 0.3, boxWidth, listHeight);
                ctx.stroke();
                ctx.restore();
                this.drawIndex(ctx, order, xPair, yPair, boxWidth, listHeight, isCurrent, isCurrent);
                this.drawPair(ctx, i, j, xPair + boxWidth, yPair, boxWidth, listHeight, false,  isCurrent, isCurrent);
            }
            if (isCurrent && order != this.orderLast) {
                this.textDiv.div.innerHTML += "<br/><br/>" + order + " " +  "(<i>a</i><sub>" +
                                                j + "</sub>,<i>b</i><sub>" + i + "</sub>)";
                this.orderLast = order;
            }
        }
    };

    OU.activity.Countability.prototype.drawHeadings = function (ctx, letter, index, x, y, pairCount, boxWidth, boxHeight) {
        var text,
            textW,
            isVisible = false,
            which,
            where,
            remain,
            fontSize = this.getNodeFontSize();

        ctx.font = 'bold italic ' + fontSize * 0.4 + 'px Arial';
        text = index === 0 ? "" : index < pairCount ? letter + index : "...",
        textW = text === "..." ? ctx.measureText(text).width / 2 : ctx.measureText(letter).width;

        if (this.action.headings) {
            if (this.action.headings[letter]) {
                if (this.animating > 0) {
                    where = this.animating / this.animationSteps * pairCount + 1;
                    if (this.action.headings[letter] === "ani" && where >= index) {
                        which = parseInt(where);
                        remain = where - which;
                        if (which === index) {
                            ctx.globalAlpha = remain;
                        }
                        isVisible = true;
                    }
                } else {
                    if (this.action.headings[letter] === "ani") {
                        isVisible = true;
                    }
                }
            } else {
                isVisible = true;
            }
        } else {
            isVisible = true;
        }
        if (isVisible) {
            if (text === "...") {
                ctx.font = 'bold ' + fontSize * 0.4 + 'px Arial';
                ctx.fillText(text, x - textW, y);
            } else if (text !== "") {
                ctx.font = 'bold italic' + fontSize * 0.4 + 'px Arial';
                ctx.fillText(letter, x - textW, y);
                ctx.font = 'bold ' + fontSize * 0.3 + 'px Arial';
                ctx.fillText(index, x + textW / 3, y + fontSize / 6);
                ctx.font = 'bold ' + fontSize * 0.4 + 'px Arial';
            }
            ctx.globalAlpha = 1;
        }
    };

    OU.activity.Countability.prototype.drawTextBox = function (ctx, text, x, y, boxWidth, boxHeight,
                                                           foreground, background, textColor, highlight) {
        var textW = ctx.measureText(text).width / 2;

        ctx.beginPath();
        ctx.strokeStyle = foreground;
        ctx.fillStyle = (highlight != null && highlight !== data.highlight) ? highlight : background;
        ctx.fillRect(x, y, boxWidth, boxHeight);
        ctx.rect(x, y, boxWidth, boxHeight);

        ctx.fillStyle = textColor;
        ctx.fillText(text, x + boxWidth / 2 - textW, y + boxHeight / 2);
        ctx.closePath();
        ctx.stroke();

        if (highlight === data.highlight) {
            this.drawHighlight(ctx, x, y, boxWidth, boxHeight, highlight);
        }

    };

    OU.activity.Countability.prototype.drawHighlight = function (ctx, x, y, boxWidth, boxHeight, highlight) {
        var xPad = parseFloat(ctx.lineWidth),
            yPad;

        ctx.save();
        if (highlight !== null) {
            ctx.beginPath();
            ctx.lineWidth *= 2;
            yPad = parseFloat(ctx.lineWidth);
            ctx.rect(x + xPad * 2, y - yPad, boxWidth - 4 * xPad, boxHeight + yPad * 2);
            ctx.strokeStyle = "red";///highlight;
            ctx.stroke();
        }
        ctx.restore();
    };

    OU.activity.Countability.prototype.getXPos = function (x) {
        return x / 845 * this.visualisationLayer.w;
    };

    OU.activity.Countability.prototype.getYPos = function (y) {
        return y / 383 * this.visualisationLayer.h;
    };

    OU.activity.Countability.prototype.getNodeFontSize = function () {
        return Math.min(this.nodeSize * 0.8);
    };

    // caclulate all swaps and then start the replacy of the steps of the algorithm
    OU.activity.Countability.prototype.start = function () {
        this.backBtn.enable();
        this.resetBtn.enable();

        // init all the vars to starting values
        this.setAnimationSteps(this.animationStepsInit);

        this.compareStep = 0;
        this.stepCount = 0;
        this.animating = -1;

        this.dead = false;
        this.sorted = false;

        this.recordSearch(); // record all the sorts to then animate them afterwards
        this.drawVisualisation();
    };

    // Record the whole sorting part of the visualation to replay afterwards
    // This should improve performance and keeps the sort algorithm as close to the original as possible
    OU.activity.Countability.prototype.recordSearch = function () {
        var i,
            datum,
            key,
            similar = 0,
            copyOrder,
            copyText = "";

        this.replayList = []; // replay information

        for (i = 2; i < data.pageCount; i++) {
            datum = new Object();
            key = "page" + i;
            if (similar > 0) {
                datum.text = copyText;
                datum.audio = "";
                datum.action = {};
                copyOrder++;
                datum.action.order = copyOrder;
                similar--;
            } else {
                datum = data[key];
            }
            datum.key = key;
            datum.pageNumber = i;

            if (datum.similar) {
                similar = datum.similar;
                copyText = datum.text;
                copyOrder = datum.action.order;
            }
            this.replayList.push(datum);
        }
    };

    // the timer loop to create a timeline for replay and animation
    OU.activity.Countability.prototype.renderLoop = function () {
        var self = this;
        if (!this.dead) {
            this.drawVisualisation();
            if (this.animating > -1) {
                setTimeout(function () {
                    self.renderLoop(); // set timer for next render
                }, this.timerPause);
            }
        }
    };

    // step through the sort and animate the swaps
    OU.activity.Countability.prototype.step = function () {
        if (this.sorted && this.animating === -1) { // if all sorted or not animiting then stop animation
            this.dead = true;
        }
        // if not animating a swap or just swapped then pause for user to compare items
        if (!this.dead && this.animating === -1) {
            this.replaySearch(); // replay the sorting step
            this.drawVisualisation(); // redraw the bars
        }
        if (this.animating > 0) {
           this.renderLoop();
        }
    };

    // Replay the recorded sort step by step
    OU.activity.Countability.prototype.replaySearch = function () {
        var replay;

        this.checkPause = 10;
        this.audioToPlay = false;

        if (!this.dead && this.replayList.length > 0) { // if not finished and not last step
            replay = this.replayList.shift(); // get the step to replay's information
            this.replay = replay;
            this.action = replay.action;
            if (replay.action2) {
                this.action2 = replay.action2;
                this.actionNumber = 2;
            } else {
                this.action2 = null;
            }
            this.doAction();
            this.playIt(replay.text, replay.audio, replay.pageNumber);
            this.backList.push(replay);
            this.stepCount++; // next step
        } else { // must be all sorted
            this.action = data.sorted.action;
            this.sorted = true; // set flag
            this.nextBtn.disable();
            this.playIt(data.sorted.text, data.sorted.audio, data.pageCount);
        }

        if (this.audioPlay && this.audioToPlay) { // audio checkbox selected
            this.audioElement.play(); // play the audio
        }
    };

    // called when animation is finished
    OU.activity.Countability.prototype.animatingFinished = function () {
        this.lastArrow = this.action.arrow;
        this.lastHighlight = this.action.highlight;
        if (this.action2) {
            this.action = this.action2;
            this.actionNumber++;
            if (this.replay["action" + this.actionNumber]) {
                this.action2 = this.replay["action" + this.actionNumber];
            } else {
                this.action2 = null;
            }
            this.doAction();
        }
    };

    OU.activity.Countability.prototype.doAction = function () {
        if (this.action.headings || this.action.pairs === "fadein" || this.action.order > 0
            /*this.action.highlight !== this.lastHighlight /* || this.action2*/) {
            this.animating = 0;
        } else {
            this.drawVisualisation();
        }
    };

    OU.activity.Countability.prototype.playIt = function (text, audio, pageNumber) {
        if (audio !== "") {
            this.audioElement.setAttribute('src', this.dataDir + audio); // set the is sorted audio to no
            this.audioToPlay = true;
        }
        this.textDiv.div.innerHTML = "<div class='headingCount'>" + data.description + " (" + pageNumber + "/" + (data.pageCount) + ")</div>" + text;
    };

    // speed up button clicked
    OU.activity.Countability.prototype.next = function () {
        if (this.dead) {
            this.start();
        }
        if (!this.sorted) { // only speed up if not finished
            this.animating = -1;
            this.action2 = null;
            this.checkPause = 0; // no pausing for more speed
            this.animatingFinished();
            this.audioElement.pause();
            this.step();
        }
    };

    OU.activity.Countability.prototype.back = function () {
        if (this.backList.length > 1) {
            if (! this.sorted) {
                this.replayList.unshift(this.backList.pop());
            }
            this.lastHighlight = "";
            this.replayList.unshift(this.backList.pop());
            this.sorted = false;
            this.dead = false;
            this.nextBtn.enable();
            this.goingBack = true;
            this.next();
            this.goingBack = false;
        } else {
            this.resetAnimation();
        }
    };

    // audio checkbox clicked
    OU.activity.Countability.prototype.toggleAudio = function () {
        this.audioPlay = !this.audioPlay; // toggle audio flag
        if (!this.audioPlay) { // if switched off
            this.audioElement.pause(); // pause the audio to stop playing
        }
    };

    /**
     * accessibleView - this function is called instead of canvasView if the browser does not support HTML5 canvas
     */
    OU.activity.Countability.prototype.accessibleView = function () {
        OU.activity.Countability.superClass_.accessibleView.call(this); // call the superclass method is you want to extend it, remove this line to override the method instead

    // Note this function can be removed or commented out if you want to use the default accessibleView method

    // *Your code starts here*
    };

    /**
     * resize - called whenever the outer bounds of the activity change, ie when the browser window is resized, or a mobile device is rotated.
     *
     * This function should do the following:
     * <ul>
     * <li>Resize all visible elements</li>
     * <li>Re-layout all visible elements</li>
     * <li>Actually re-render the current view of the activity</li>
     * </ul>
     */
    OU.activity.Countability.prototype.resize = function () {
        OU.activity.Countability.superClass_.resize.call(this); // call the superclass resize

        document.body.style.fontSize = parseInt(window.innerHeight / 42, 10) + "px";

        var controlctx = this.controlLayer.context, // get the graphics context
            xPad = this.w * 0.02, // padding space between controls
            useWidth = this.w - 2 * xPad, // total usable width when padding removed
            controlHeight = this.h * 0.1, // control panel is 10% of height
            yPad = controlHeight * 0.2, // 2% y padding
            textHeight = controlHeight * 2.3, // height of the text area at top
            // useable height for visualisation layer after conrols, textarea and padding subtracted
            useHeight = this.h - controlHeight - textHeight - 2 * yPad;

        this.bgLayer.resize(); // resize the background
        if (this.data.backgroundColour !== undefined) { // if a background color is defined
            this.bgLayer.context.gradRect({ // paint a gradient rectanglke
                col1: this.data.backgroundColour, // start color
                col2: this.data.backgroundColour  // end color - both just the background color for one color
            }); // use specified background colour
        } else {
            this.bgLayer.context.gradRect(); // otherwise use default background
        }

        controlctx.font = OU.theme.font; // set the font for the controls
        controlctx.lineWidth = 2; // outline width
        controlctx.strokeStyle = '#c00'; // outline color
        controlctx.fillStyle = '#c00'; // fill color
        controlctx.textAlign = 'center'; // alignment of text

        // resize the control layer
        this.controlLayer.resize({
            x: xPad, // leave padding at left
            y: this.h - controlHeight, // bottom - control panel height ie at bottom
            w: useWidth, // width after padding removed
            h: controlHeight // height
        });

        // color the control layer
        if (this.data.panelColour !== undefined) {
            controlctx.gradRect({
                col1: this.data.panelColour,
                col2: this.data.panelColour
            }); // use specified background colour
        } else {
            controlctx.gradRect(); // use default background
        }
        // resize the text area
        this.textDiv.resize({
            x: xPad + 40,
            y: yPad,
            w: useWidth - 40,
            h: textHeight
        });
        // resize visualisation layer
        this.visualisationLayer.resize({
            x: xPad,
            y: this.textDiv.y + this.textDiv.h + yPad, // under text and padding
            w: useWidth,
            h: useHeight
        });

        this.setNodeDimensions();
        // render whole thing
        this.render();
    };

    OU.activity.Countability.prototype.playAudio = function (audioFile) {
        if (this.audioPlay) {
            this.audioElement.setAttribute('src', this.dataDir + audioFile); // intro audio
            this.audioElement.play(); // play the audio
        }
    };

    OU.activity.Countability.prototype.getFontSize = function () {
        return parseInt(Math.min(window.innerHeight / 40, window.innerWidth / 60), 10);
    };

    /**
     * remove - called when the activity is being removed by a controller.
     *
     * This function should do the following:
     * <ul>
     * <li> Remove any elements that may remain in memory</li>
     * <li> Stop any animation loops, including killing any Intervals </li>
     * </ul>
     * You do not need to remove most library elements, such as Layers, Divs, etc. as they are removed automatically
     */
    OU.activity.Countability.prototype.remove = function () {
        OU.activity.Countability.superClass_.remove.call(this); // call the superclass remove
        // *Your removal code here*
        // If you have nothing to remove, then this function can be deleted or commented out
        this.dead = true;
    };

    // call the superclass's constructor
    OU.base(this, data, instance, controller);
};

// Call our inherits function to implement the class inheritance
OU.inherits(OU.activity.Countability, OU.util.Activity);