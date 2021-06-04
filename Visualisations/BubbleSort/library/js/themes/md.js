/**
 * @fileOverview Default Theme
 *
 * Javascript based graphics definitions
 */

/*
 * Design Constants 
 */
OU.theme = {
    buttonBgCol:'rgba(26,26,26,1)', // Normal button
    buttonTextCol:'#AFDFE4', //
    buttonBorderCol:'#1A1A1A', //
    buttonHighBgCol:'rgba(175,223,228,1)', // Highlighted (On) button
    buttonHighTextCol:'#1A1A1A', //
    buttonHighBorderCol:'#1A1A1A', //
    buttonDisBgCol:'#cccccc', // Disabled button
    buttonDisTextCol:'#f2f2f2', //
    buttonDisBorderCol:'#f2f2f2', //
    font:'thonburi,verdana,helvetica,arial,sans', // Default font family
    fontSize:16, // Default font size in pixels, maybe reduced to make content fit
    instructionsBg:'#5482ea', // Background colour for Instructions pop-ups
    instructionsCol:'#fff', // Text colour for Instructions pop-ups
    bgGradTopCol:'#fff', // default background gradient Top colour
    bgGradBotCol:'#fff', // default background gradient Bottom colour
    ratio:window.devicePixelRatio
};
/*
 * Javascript Rendered design elements
 */
if (typeof CanvasRenderingContext2D=='object' || typeof CanvasRenderingContext2D=='function') {
    // Extend the Canvas Context
    CanvasRenderingContext2D.prototype.gripPattern = function ( params ) {
        var x = params.x || 0,
            y = params.y || 0,
            w = params.w || 30,
            h = params.h || 40,
            r = w / 15,
            hspace = (w - 2 * r) / 3,
            vspace = (h - 2 * r) / 3, i, j,
            circ = Math.PI * 2;
        this.save();
        this.fillStyle = params.col || '#999';
        for (i = 4; i--;) {
            for (j = 4; j--;) {
                this.beginPath();
                this.arc(i * hspace + x + r, j * vspace + y + r, r, 0, circ, false);
                this.closePath();
                this.fill();
            }
        }
        this.restore();
    };
    CanvasRenderingContext2D.prototype.glyph = function ( params ) {
        if (this[params.type])
            this[params.type](params);
        else
            this.crossGrid(params);
    };
    CanvasRenderingContext2D.prototype.crossGrid = function ( p ) {
        var x = p.x || 100,
            y = p.y || 100,
            w = p.w || 16,
            h = p.h || 16;
        this.save();
        this.fillStyle = '#f00';
        this.translate(x, y);
        this.strokeStyle = "rgba(255, 0, 0, 1)";
        this.beginPath();
        this.moveTo(0, 0);
        this.lineTo(w, 0);
        this.lineTo(w, h);
        this.lineTo(0, h);
        this.lineTo(0, 0);
        this.lineTo(w, h);
        this.moveTo(w, 0);
        this.lineTo(0, h);
        this.stroke();
        this.restore();
    };
    CanvasRenderingContext2D.prototype.closeIcon = function ( p ) {
        if (p===undefined)
            p = {};
        var x = p.x || 20,
            y = p.y || 20,
            w = p.r || 16,
            h = p.r || 16,
            b = p.col1 || '#ffffff',
            f = p.col2 || '#205f6b';
        this.save();
        this.translate(x, y);
        this.beginPath();
        this.moveTo(w, h * 0.86875);
        this.bezierCurveTo(w, h * 0.9375, w * 0.9375, h, w * 0.86875, h);
        this.lineTo(w * 0.13125, h);
        this.bezierCurveTo(w * 0.0625, h, 0, h * 0.9375, 0, h * 0.86875);
        this.lineTo(0, h * 0.13125);
        this.bezierCurveTo(0, h * 0.0625, w * 0.0625, 0, w * 0.13125, 0);
        this.lineTo(w * 0.86875, 0);
        this.bezierCurveTo(w * 0.9375, 0, w, 0.0625, w, h * 0.13125);
        this.lineTo(w, h * 0.86875);
        this.closePath();
        this.fillStyle = b;
        this.fill();
        this.strokeStyle = 'rgba(51,51,51,1)';
        this.lineWidth = 0.5;
        this.stroke();
        this.fillStyle = f;
        this.beginPath();
        this.moveTo(w * 0.76330, h * 0.67485);
        this.lineTo(w * 0.58836, h * 0.49997);
        this.lineTo(w * 0.76317, h * 0.32503);
        this.bezierCurveTo(w * 0.78761, h * 0.30066, w * 0.78761, h * 0.26103, w * 0.76317, h * 0.23666);
        this.bezierCurveTo(w * 0.73873, h * 0.21228, w * 0.69923, h * 0.21228, w * 0.67479, h * 0.23666);
        this.lineTo(w * 0.49998, h * 0.41160);
        this.lineTo(w * 0.32504, h * 0.23672);
        this.bezierCurveTo(w * 0.30067, h * 0.21235, w * 0.26110, h * 0.21235, w * 0.23667, h * 0.23672);
        this.bezierCurveTo(w * 0.21229, h * 0.26116, w * 0.21229, h * 0.30072, w * 0.23667, h * 0.32510);
        this.lineTo(w * 0.41161, h * 0.50003);
        this.lineTo(w * 0.23680, h * 0.67491);
        this.bezierCurveTo(w * 0.21242, h * 0.69935, w * 0.21242, h * 0.73885, w * 0.23680, h * 0.76328);
        this.bezierCurveTo(w * 0.24899, h * 0.77547, w * 0.26499, h * 0.78160, w * 0.28099, h * 0.78160);
        this.bezierCurveTo(w * 0.29699, h * 0.78160, w * 0.31299, h * 0.77547, w * 0.32517, h * 0.76328);
        this.lineTo(w * 0.49999, h * 0.58835);
        this.lineTo(w * 0.67492, h * 0.76322);
        this.bezierCurveTo(w * 0.68711, h * 0.77541, w * 0.70311, h * 0.78153, w * 0.71911, h * 0.78153);
        this.bezierCurveTo(w * 0.73511, h * 0.78153, w * 0.75111, h * 0.77541, w * 0.76330, h * 0.76322);
        this.bezierCurveTo(w * 0.78774, h * 0.73878, w * 0.78774, h * 0.69922, w * 0.76330, h * 0.67485);
        this.fill();
        this.stroke();
        this.restore();
    };
    CanvasRenderingContext2D.prototype.leftArrow = function ( p ) {
        p.orientation = 1;
        this.rightArrow(p);
    };
    CanvasRenderingContext2D.prototype.upArrow = function ( p ) {
        p.orientation = 2;
        this.rightArrow(p);
    };
    CanvasRenderingContext2D.prototype.downArrow = function ( p ) {
        p.orientation = 3;
        this.rightArrow(p);
    };
    CanvasRenderingContext2D.prototype.rightArrow = function ( p ) {
        var x = p.x || 100,
            y = p.y || 100,
            w = p.w || 16,
            h = p.h || 16,
            b = p.back || 'rgba(26,26,26,1)',
            f = p.fore || 'rgba(173,208,225,1)',
            o = p.orientation || 0;
        this.save();
        this.fillStyle = '#f00';
        this.translate(x, y);
        switch(o) {
            case 1:
                this.setTransform(-1, 0, 0, 1, x + w, y); // left - 1  <-
                break;
            case 2:
                this.setTransform(0, -1, 1, 0, x, y + h);	 // up - 2  /|\
                break;
            case 3:
                this.setTransform(0, 1, -1, 0, x + w, y);	 // down	- 3  \|/
                break;
        }
        // nexticon/Path
        this.beginPath();
        this.moveTo(w, h * 0.875);
        this.bezierCurveTo(w, h * 0.94375, w * 0.94375, h, w * 0.875, h);
        this.lineTo(w * 0.125, h);
        this.bezierCurveTo(w * 0.05625, h, 0, h * 0.94375, 0, h * 0.875);
        this.lineTo(0, h * 0.125);
        this.bezierCurveTo(0, h * 0.05625, w * 0.05625, 0, w * 0.125, 0);
        this.lineTo(w * 0.875, 0);
        this.bezierCurveTo(w * 0.94375, 0, w, h * 0.05625, w, h * 0.125);
        this.lineTo(w, h * 0.875);
        this.closePath();
        this.fillStyle = b;
        this.fill();
        // nexticon/Group
        // nexticon/Group/Path
        this.beginPath();
        this.moveTo(w * 0.73125, h * 0.5625);
        this.lineTo(w * 0.73125, h * 0.5625);
        this.lineTo(w * 0.26845, h * 0.5625);
        this.bezierCurveTo(w * 0.2375, h * 0.5625, w * 0.20625, h * 0.53125, w * 0.20625, h * 0.5);
        this.bezierCurveTo(w * 0.20625, h * 0.4625, w * 0.2375, h * 0.4375, w * 0.26845, h * 0.4375);
        this.lineTo(w * 0.26845, h * 0.4375);
        this.lineTo(w * 0.73125, h * 0.4375);
        this.bezierCurveTo(w * 0.7625, h * 0.4375, w * 0.79375, h * 0.4625, w * 0.79375, h * 0.5);
        this.bezierCurveTo(w * 0.79375, h * 0.53125, w * 0.7625, h * 0.5625, w * 0.73125, h * 0.5625);
        this.closePath();
        this.fillStyle = f;
        this.fill();
        // nexticon/Group/Path
        this.beginPath();
        this.moveTo(w * 0.73125, h * 0.5625);
        this.bezierCurveTo(w * 0.7125, h * 0.5625, w * 0.7, h * 0.55625, w * 0.6875, h * 0.54375);
        this.lineTo(w * 0.46875, h * 0.325);
        this.bezierCurveTo(w * 0.44375, h * 0.3, w * 0.44375, h * 0.2625, w * 0.46875, h * 0.2375);
        this.bezierCurveTo(w * 0.49375, h * 0.2125, w * 0.53125, h * 0.2125, w * 0.55625, h * 0.2375);
        this.lineTo(w * 0.775, h * 0.45625);
        this.bezierCurveTo(w * 0.8, h * 0.48125, w * 0.8, h * 0.51875, w * 0.775, h * 0.54375);
        this.bezierCurveTo(w * 0.7625, h * 0.55625, w * 0.74375, h * 0.5625, w * 0.73125, h * 0.5625);
        this.closePath();
        this.fill();
        // nexticon/Group/Path.
        this.beginPath();
        this.moveTo(w * 0.5125, h * 0.78125);
        this.bezierCurveTo(w * 0.49375, h * 0.78125, w * 0.475, h * 0.775, w * 0.4625, h * 0.7625);
        this.bezierCurveTo(w * 0.44375, h * 0.7375, w * 0.44375, h * 0.7, w * 0.4625, h * 0.675);
        this.lineTo(w * 0.6875, h * 0.45625);
        this.bezierCurveTo(w * 0.7125, h * 0.43125, w * 0.75, h * 0.43125, w * 0.775, h * 0.45625);
        this.bezierCurveTo(w * 0.8, h * 0.48125, w * 0.8, h * 0.51875, w * 0.775, h * 0.54375);
        this.lineTo(w * 0.55625, h * 0.7625);
        this.bezierCurveTo(w * 0.54375, h * 0.775, w * 0.525, h * 0.78125, w * 0.5125, h * 0.78125);
        this.closePath();
        this.fill();
        this.restore();
    };
    CanvasRenderingContext2D.prototype.helpIcon = function ( p ) {
        var x = p.x || 100,
            y = p.y || 100,
            w = p.w || 16,
            h = p.h || 16,
            b = p.back || "rgb(31, 83, 107)",
            f = p.fore || "rgb(255, 255, 255)";
        this.save();
        this.translate(x, y);
        // helpicon/Path
        this.beginPath();
        this.moveTo(w, h * 0.86875);
        this.bezierCurveTo(w, h * 0.9375, w * 0.9375, h, w * 0.86875, h);
        this.lineTo(w * 0.13125, h);
        this.bezierCurveTo(w * 0.0625, h, 0, h * 0.9375, 0, h * 0.86875);
        this.lineTo(0, h * 0.13125);
        this.bezierCurveTo(0, h * 0.0625, w * 0.0625, 0, w * 0.13125, 0);
        this.lineTo(w * 0.86875, 0);
        this.bezierCurveTo(w * 0.9375, 0, w, 0.0625, w, h * 0.13125);
        this.lineTo(w, h * 0.86875);
        this.closePath();
        this.fillStyle = b;
        this.fill();
        // helpicon/Group
        // helpicon/Group/Compound Path
        this.beginPath();
        // helpicon/Group/Compound Path/Path
        this.moveTo(w * 0.7, h * 0.3125);
        this.bezierCurveTo(w * 0.7, h * 0.35, w * 0.69375, h * 0.375, w * 0.68125, h * 0.4);
        this.bezierCurveTo(w * 0.675, h * 0.425, w * 0.65625, h * 0.45, w * 0.64375, h * 0.46875);
        this.bezierCurveTo(w * 0.625, h * 0.4875, w * 0.60625, h * 0.5, w * 0.58125, h * 0.51875);
        this.bezierCurveTo(w * 0.55625, h * 0.5375, w * 0.5375, h * 0.55, w * 0.5125, h * 0.5625);
        this.lineTo(w * 0.5125, h * 0.675);
        this.lineTo(w * 0.425, h * 0.675);
        this.lineTo(w * 0.425, h * 0.525);
        this.bezierCurveTo(w * 0.44375, h * 0.51875, w * 0.4625, h * 0.50625, w * 0.4875, h * 0.4875);
        this.bezierCurveTo(w * 0.5125, h * 0.475, w * 0.53125, h * 0.45625, w * 0.54375, h * 0.44375);
        this.bezierCurveTo(w * 0.5625, h * 0.425, w * 0.575, h * 0.4125, w * 0.5875, h * 0.3875);
        this.bezierCurveTo(w * 0.59375, h * 0.36875, w * 0.6, h * 0.35, w * 0.6, h * 0.325);
        this.bezierCurveTo(w * 0.6, h * 0.2875, w * 0.5875, h * 0.25625, w * 0.5625, h * 0.2375);
        this.bezierCurveTo(w * 0.54375, h * 0.21875, w * 0.5125, h * 0.2125, w * 0.475, h * 0.2125);
        this.bezierCurveTo(w * 0.44375, h * 0.2125, w * 0.4125, h * 0.21875, w * 0.38125, h * 0.23125);
        this.bezierCurveTo(w * 0.35625, h * 0.2375, w * 0.33125, h * 0.25, w * 0.3125, h * 0.2625);
        this.lineTo(w * 0.30625, h * 0.2625);
        this.lineTo(w * 0.30625, h * 0.1625);
        this.bezierCurveTo(w * 0.33125, h * 0.15625, w * 0.35625, h * 0.14375, w * 0.3875, h * 0.1375);
        this.bezierCurveTo(w * 0.425, h * 0.13125, w * 0.45625, h * 0.13125, w * 0.48125, h * 0.13125);
        this.bezierCurveTo(w * 0.55, h * 0.13125, w * 0.60625, h * 0.14375, w * 0.64375, h * 0.18125);
        this.bezierCurveTo(w * 0.68125, h * 0.2125, w * 0.7, h * 0.25625, w * 0.7, h * 0.3125);
        this.closePath();
        // helpicon/Group/Compound Path/Path
        this.moveTo(w * 0.51875, h * 0.875);
        this.lineTo(w * 0.41875, h * 0.875);
        this.lineTo(w * 0.41875, h * 0.76875);
        this.lineTo(w * 0.51875, h * 0.76875);
        this.lineTo(w * 0.51875, h * 0.875);
        this.closePath();
        this.fillStyle = f;
        this.fill();
        this.restore();
    };
    CanvasRenderingContext2D.prototype.infoIcon = function ( p ) {
        var x = p.x || 0,
            y = p.y || 0,
            w = p.w || 16,
            h = p.h || 16,
            b = p.back || '#20536b',
            f = p.fore || '#FFFFFF';
        this.save();
        this.translate(x, y);
        this.save();
        this.beginPath();
        this.moveTo(w, h * 0.86875);
        this.bezierCurveTo(w, h * 0.9375, w * 0.9375, h, w * 0.86875, h);
        this.lineTo(w * 0.13125, h);
        this.bezierCurveTo(w * 0.0625, h, 0, h * 0.9375, 0, h * 0.86875);
        this.lineTo(0, h * 0.13125);
        this.bezierCurveTo(0, h * 0.0625, w * 0.0625, 0, w * 0.13125, 0);
        this.lineTo(w * 0.86875, 0);
        this.bezierCurveTo(w * 0.9375, 0, w, 0.0625, w, h * 0.13125);
        this.lineTo(w, h * 0.86875);
        this.closePath();
        this.fillStyle = b;
        this.fill();
        this.restore();
        this.save();
        this.strokeStyle = 'rgba(0,0,0,0)';
        this.lineCap = 'butt';
        this.lineJoin = 'miter';
        this.miterLimit = 4;
        this.save();
        this.restore();
        this.save();
        this.fillStyle = f;
        this.translate(0, h * -51.61811);
        this.save();
        this.beginPath();
        this.moveTo(w * 0.59590, h * 52.38000);
        this.bezierCurveTo(w * 0.54865, h * 52.38130, w * 0.46640, h * 52.37438, w * 0.51909, h * 52.24825);
        this.bezierCurveTo(w * 0.52159, h * 52.24225, w * 0.64596, h * 51.96569, w * 0.64596, h * 51.96569);
        this.lineTo(w * 0.50690, h * 51.96569);
        this.bezierCurveTo(w * 0.50690, h * 51.96569, w * 0.31515, h * 52.18094, w * 0.31403, h * 52.18344);
        this.bezierCurveTo(w * 0.31403, h * 52.18344, w * 0.41722, h * 52.18394, w * 0.41722, h * 52.18394);
        this.bezierCurveTo(w * 0.41722, h * 52.18394, w * 0.39328, h * 52.23775, w * 0.37828, h * 52.27869);
        this.bezierCurveTo(w * 0.32134, h * 52.43281, w * 0.44659, h * 52.49150, w * 0.54903, h * 52.49150);
        this.lineTo(w * 0.59591, h * 52.38025);
        this.closePath();
        this.fill();
        this.stroke();
        this.restore();
        this.save();
        this.beginPath();
        this.moveTo(w * 0.50070, h * 51.83500);
        this.bezierCurveTo(w * 0.50070, h * 51.78388, w * 0.54207, h * 51.74238, w * 0.59332, h * 51.74238);
        this.bezierCurveTo(w * 0.64451, h * 51.74238, w * 0.68601, h * 51.78388, w * 0.68601, h * 51.83500);
        this.bezierCurveTo(w * 0.68601, h * 51.88619, w * 0.64451, h * 51.92769, w * 0.59332, h * 51.92769);
        this.bezierCurveTo(w * 0.54207, h * 51.92769, w * 0.50070, h * 51.88619, w * 0.50070, h * 51.83500);
        this.fill();
        this.stroke();
        this.restore();
        this.restore();
        this.restore();
        this.restore();
    };
    CanvasRenderingContext2D.prototype.plusIcon = function ( p ) {
        var x = p.x || 0,
            y = p.y || 0,
            w = p.w || 16,
            h = p.h || 16,
            b = p.back || '#1a1a1a',
            f = p.fore || '#add0e1';
        this.save();
        this.translate(x, y);
        // background
        this.beginPath();
        this.moveTo(w, h * 0.86875);
        this.bezierCurveTo(w, h * 0.9375, w * 0.9375, h, w * 0.86875, h);
        this.lineTo(w * 0.13125, h);
        this.bezierCurveTo(w * 0.0625, h, 0, h * 0.9375, 0, h * 0.86875);
        this.lineTo(0, h * 0.13125);
        this.bezierCurveTo(0, h * 0.0625, w * 0.0625, 0, w * 0.13125, 0);
        this.lineTo(w * 0.86875, 0);
        this.bezierCurveTo(w * 0.9375, 0, w, 0.0625, w, h * 0.13125);
        this.lineTo(w, h * 0.86875);
        this.closePath();
        this.fillStyle = b;
        this.fill();
        // plusicon/Group/Compound Path
        this.strokeStyle = 'rgba(0,0,0,0)';
        this.lineCap = 'butt';
        this.lineJoin = 'miter';
        this.miterLimit = 4;
        this.translate(0, h * -51.61811);
        this.fillStyle = f;
        this.beginPath();
        this.moveTo(w * 0.80985, h * 52.05500);
        this.lineTo(w * 0.56253, h * 52.05500);
        this.lineTo(w * 0.56247, h * 51.80768);
        this.bezierCurveTo(w * 0.56247, h * 51.77318, w * 0.53447, h * 51.74518, w * 0.49997, h * 51.74518);
        this.bezierCurveTo(w * 0.46547, h * 51.74518, w * 0.43747, h * 51.77318, w * 0.43747, h * 51.80768);
        this.lineTo(w * 0.43753, h * 52.05500);
        this.lineTo(w * 0.19015, h * 52.05500);
        this.bezierCurveTo(w * 0.15565, h * 52.05500, w * 0.12765, h * 52.08300, w * 0.12765, h * 52.11750);
        this.bezierCurveTo(w * 0.12765, h * 52.15200, w * 0.15566, h * 52.18000, w * 0.19015, h * 52.18000);
        this.lineTo(w * 0.43753, h * 52.18000);
        this.lineTo(w * 0.43759, h * 52.42731);
        this.bezierCurveTo(w * 0.43759, h * 52.46187, w * 0.46560, h * 52.48981, w * 0.50009, h * 52.48981);
        this.bezierCurveTo(w * 0.53460, h * 52.48981, w * 0.56259, h * 52.46187, w * 0.56259, h * 52.42731);
        this.lineTo(w * 0.56253, h * 52.18000);
        this.lineTo(w * 0.80985, h * 52.18000);
        this.bezierCurveTo(w * 0.84441, h * 52.18000, w * 0.87235, h * 52.15200, w * 0.87235, h * 52.11750);
        this.bezierCurveTo(w * 0.87235, h * 52.08300, w * 0.84441, h * 52.05500, w * 0.80985, h * 52.05500);
        this.fill();
        this.stroke();
        this.restore();
    };
    CanvasRenderingContext2D.prototype.minusIcon = function ( p ) {
        var x = p.x || 0,
            y = p.y || 0,
            w = p.w || 16,
            h = p.h || 16,
            b = p.back || '#1a1a1a',
            f = p.fore || '#add0e1';
        this.save();
        this.translate(x, y);
        this.beginPath();
        this.moveTo(w, h * 0.86875);
        this.bezierCurveTo(w, h * 0.9375, w * 0.9375, h, w * 0.86875, h);
        this.lineTo(w * 0.13125, h);
        this.bezierCurveTo(w * 0.0625, h, 0, h * 0.9375, 0, h * 0.86875);
        this.lineTo(0, h * 0.13125);
        this.bezierCurveTo(0, h * 0.0625, w * 0.0625, 0, w * 0.13125, 0);
        this.lineTo(w * 0.86875, 0);
        this.bezierCurveTo(w * 0.9375, 0, w, 0.0625, w, h * 0.13125);
        this.lineTo(w, h * 0.86875);
        this.closePath();
        this.fillStyle = b;
        this.fill();
        this.strokeStyle = 'rgba(0,0,0,0)';
        this.lineCap = 'butt';
        this.lineJoin = 'miter';
        this.miterLimit = 4;
        this.translate(0, h * -51.61811);
        this.fillStyle = f;
        this.beginPath();
        this.moveTo(w * 0.19019, h * 52.18000);
        this.bezierCurveTo(w * 0.15563, h * 52.18000, w * 0.12769, h * 52.15200, w * 0.12769, h * 52.11750);
        this.bezierCurveTo(w * 0.12769, h * 52.08300, w * 0.15563, h * 52.05500, w * 0.19019, h * 52.05500);
        this.lineTo(w * 0.80979, h * 52.05500);
        this.bezierCurveTo(w * 0.84435, h * 52.05500, w * 0.87229, h * 52.08300, w * 0.87229, h * 52.11750);
        this.bezierCurveTo(w * 0.87229, h * 52.15200, w * 0.84435, h * 52.18000, w * 0.80979, h * 52.18000);
        this.lineTo(w * 0.19019, h * 52.18000);
        this.closePath();
        this.fill();
        this.stroke();
        this.restore();
    };
    CanvasRenderingContext2D.prototype.activityIcon = function ( p ) {
        var x = p.x || 100,
            y = p.y || 100,
            w = p.w || 16,
            h = p.h || 16,
            b = p.back || 'rgba(26,26,26,1)',
            f = p.fore || 'rgba(173,208,225,1)';
        this.save();
        this.fillStyle = b;
        this.translate(x, y);
        this.beginPath();
        this.moveTo(w, h * 0.86875);
        this.bezierCurveTo(w, h * 0.9375, w * 0.9375, h, w * 0.86875, h);
        this.lineTo(w * 0.13125, h);
        this.bezierCurveTo(w * 0.0625, h, 0, h * 0.9375, 0, h * 0.86875);
        this.lineTo(0, h * 0.13125);
        this.bezierCurveTo(0, h * 0.0625, w * 0.0625, 0, w * 0.13125, 0);
        this.lineTo(w * 0.86875, 0);
        this.bezierCurveTo(w * 0.9375, 0, w, 0.0625, w, h * 0.13125);
        this.lineTo(w, h * 0.86875);
        this.closePath();
        this.fill();
        this.strokeStyle = 'rgba(0,0,0,0)';
        this.lineCap = 'butt';
        this.lineJoin = 'miter';
        this.miterLimit = 4;
        this.save();
        this.fillStyle = f;
        this.beginPath();
        this.moveTo(w * 0.31538, h * 0.44172);
        this.bezierCurveTo(w * 0.28700, h * 0.46897, w * 0.30850, h * 0.51284, w * 0.31875, h * 0.54653);
        this.bezierCurveTo(w * 0.32900, h * 0.58022, w * 0.34813, h * 0.57872, w * 0.34813, h * 0.57872);
        this.bezierCurveTo(w * 0.34813, h * 0.58197, w * 0.34856, h * 0.58666, w * 0.34913, h * 0.59197);
        this.bezierCurveTo(w * 0.40443, h * 0.61259, w * 0.45775, h * 0.64272, w * 0.50388, h * 0.69009);
        this.bezierCurveTo(w * 0.54800, h * 0.64466, w * 0.59857, h * 0.61515, w * 0.65143, h * 0.59465);
        this.bezierCurveTo(w * 0.65243, h * 0.58809, w * 0.65269, h * 0.58240, w * 0.65269, h * 0.57872);
        this.bezierCurveTo(w * 0.65269, h * 0.57872, w * 0.67181, h * 0.58022, w * 0.68206, h * 0.54653);
        this.bezierCurveTo(w * 0.69237, h * 0.51284, w * 0.71412, h * 0.46897, w * 0.68569, h * 0.44172);
        this.bezierCurveTo(w * 0.67325, h * 0.42959, w * 0.66956, h * 0.43678, w * 0.66719, h * 0.43541);
        this.bezierCurveTo(w * 0.67100, h * 0.42722, w * 0.68625, h * 0.37660, w * 0.67612, h * 0.33203);
        this.bezierCurveTo(w * 0.67019, h * 0.30472, w * 0.65006, h * 0.26747, w * 0.61025, h * 0.26441);
        this.bezierCurveTo(w * 0.57819, h * 0.26166, w * 0.56781, h * 0.22072, w * 0.41075, h * 0.25528);
        this.bezierCurveTo(w * 0.36412, h * 0.26559, w * 0.33194, h * 0.29972, w * 0.32462, h * 0.33203);
        this.bezierCurveTo(w * 0.31487, h * 0.37659, w * 0.33156, h * 0.42722, w * 0.33556, h * 0.43547);
        this.bezierCurveTo(w * 0.33312, h * 0.43685, w * 0.32769, h * 0.42960, w * 0.31537, h * 0.44172);
        this.moveTo(w * 0.50393, h * 0.75003);
        this.bezierCurveTo(w * 0.41368, h * 0.62834, w * 0.28674, h * 0.59841, w * 0.14143, h * 0.58191);
        this.lineTo(w * 0.14143, h * 0.68610);
        this.bezierCurveTo(w * 0.28881, h * 0.70360, w * 0.39112, h * 0.73510, w * 0.45693, h * 0.87272);
        this.lineTo(w * 0.47150, h * 0.90209);
        this.lineTo(w * 0.53669, h * 0.90209);
        this.lineTo(w * 0.55081, h * 0.87272);
        this.bezierCurveTo(w * 0.61562, h * 0.73697, w * 0.71587, h * 0.70447, w * 0.85975, h * 0.68672);
        this.lineTo(w * 0.85975, h * 0.58272);
        this.bezierCurveTo(w * 0.71713, h * 0.59941, w * 0.59263, h * 0.62997, w * 0.50394, h * 0.75003);
        this.moveTo(w * 0.87489, h * 0.40162);
        this.lineTo(w * 0.87489, h * 0.48475);
        this.bezierCurveTo(w * 0.87489, h * 0.52163, w * 0.85258, h * 0.55206, w * 0.82514, h * 0.55206);
        this.lineTo(w * 0.82508, h * 0.55206);
        this.lineTo(w * 0.74008, h * 0.55206);
        this.lineTo(w * 0.74008, h * 0.33431);
        this.lineTo(w * 0.76271, h * 0.33431);
        this.bezierCurveTo(w * 0.74783, h * 0.29681, w * 0.72514, h * 0.26312, w * 0.69658, h * 0.23525);
        this.bezierCurveTo(w * 0.69371, h * 0.23600, w * 0.69096, h * 0.23731, w * 0.68783, h * 0.23731);
        this.bezierCurveTo(w * 0.67983, h * 0.23731, w * 0.67158, h * 0.23475, w * 0.66483, h * 0.22950);
        this.bezierCurveTo(w * 0.61733, h * 0.19187, w * 0.56046, h * 0.17206, w * 0.49989, h * 0.17206);
        this.bezierCurveTo(w * 0.43933, h * 0.17206, w * 0.38245, h * 0.19187, w * 0.33502, h * 0.22950);
        this.bezierCurveTo(w * 0.32552, h * 0.23700, w * 0.31364, h * 0.23844, w * 0.30277, h * 0.23562);
        this.bezierCurveTo(w * 0.27452, h * 0.26325, w * 0.25196, h * 0.29681, w * 0.23702, h * 0.33431);
        this.lineTo(w * 0.25970, h * 0.33431);
        this.lineTo(w * 0.25970, h * 0.55206);
        this.lineTo(w * 0.17470, h * 0.55206);
        this.lineTo(w * 0.17464, h * 0.55206);
        this.bezierCurveTo(w * 0.14727, h * 0.55206, w * 0.12489, h * 0.52163, w * 0.12489, h * 0.48475);
        this.lineTo(w * 0.12489, h * 0.40163);
        this.bezierCurveTo(w * 0.12489, h * 0.36488, w * 0.14727, h * 0.33432, w * 0.17464, h * 0.33432);
        this.lineTo(w * 0.17470, h * 0.33432);
        this.lineTo(w * 0.19383, h * 0.33432);
        this.bezierCurveTo(w * 0.21064, h * 0.28504, w * 0.23889, h * 0.24092, w * 0.27589, h * 0.20529);
        this.bezierCurveTo(w * 0.27395, h * 0.19279, w * 0.27833, h * 0.17973, w * 0.28902, h * 0.17123);
        this.bezierCurveTo(w * 0.34964, h * 0.12329, w * 0.42258, h * 0.09792, w * 0.49989, h * 0.09792);
        this.bezierCurveTo(w * 0.57720, h * 0.09792, w * 0.65014, h * 0.12329, w * 0.71077, h * 0.17123);
        this.bezierCurveTo(w * 0.72146, h * 0.17973, w * 0.72583, h * 0.19279, w * 0.72396, h * 0.20529);
        this.bezierCurveTo(w * 0.76096, h * 0.24085, w * 0.78921, h * 0.28498, w * 0.80608, h * 0.33429);
        this.lineTo(w * 0.82508, h * 0.33429);
        this.lineTo(w * 0.82514, h * 0.33429);
        this.bezierCurveTo(w * 0.85258, h * 0.33429, w * 0.87489, h * 0.36485, w * 0.87489, h * 0.40160);
        this.fill();
        this.stroke();
        this.restore();
    };
    CanvasRenderingContext2D.prototype.settingsIcon = function ( p ) {
        var x = p.x || 100,
            y = p.y || 100,
            w = p.w || 16,
            h = p.h || 16,
            b = p.back || 'rgba(26,26,26,1)',
            f = p.fore || 'rgba(173,208,225,1)';
        this.save();
        this.fillStyle = b;
        this.translate(x, y);
        this.beginPath();
        this.moveTo(w, h * 0.86875);
        this.bezierCurveTo(w, h * 0.9375, w * 0.9375, h, w * 0.86875, h);
        this.lineTo(w * 0.13125, h);
        this.bezierCurveTo(w * 0.0625, h, 0, h * 0.9375, 0, h * 0.86875);
        this.lineTo(0, h * 0.13125);
        this.bezierCurveTo(0, h * 0.0625, w * 0.0625, 0, w * 0.13125, 0);
        this.lineTo(w * 0.86875, 0);
        this.bezierCurveTo(w * 0.9375, 0, w, 0.0625, w, h * 0.13125);
        this.lineTo(w, h * 0.86875);
        this.closePath();
        this.fillStyle = b;
        this.fill();
        this.strokeStyle = 'rgba(0,0,0,0)';
        this.lineCap = 'butt';
        this.lineJoin = 'miter';
        this.miterLimit = 4;
        this.fillStyle = f;
        this.beginPath();
        this.moveTo(w * 0.50005, h * 0.65630);
        this.bezierCurveTo(w * 0.41375, h * 0.65630, w * 0.34369, h * 0.58640, w * 0.34369, h * 0.50000);
        this.bezierCurveTo(w * 0.34369, h * 0.41363, w * 0.41375, h * 0.34369, w * 0.50006, h * 0.34369);
        this.bezierCurveTo(w * 0.58637, h * 0.34369, w * 0.65631, h * 0.41363, w * 0.65631, h * 0.50000);
        this.bezierCurveTo(w * 0.65631, h * 0.58637, w * 0.58637, h * 0.65631, w * 0.50006, h * 0.65631);
        this.moveTo(w * 0.83102, h * 0.40070);
        this.bezierCurveTo(w * 0.82757, h * 0.38920, w * 0.82476, h * 0.37751, w * 0.82012, h * 0.36626);
        this.bezierCurveTo(w * 0.81951, h * 0.36501, w * 0.81882, h * 0.36370, w * 0.81831, h * 0.36239);
        this.bezierCurveTo(w * 0.81442, h * 0.35332, w * 0.80911, h * 0.34476, w * 0.80441, h * 0.33601);
        this.lineTo(w * 0.85423, h * 0.25532);
        this.lineTo(w * 0.85423, h * 0.25526);
        this.lineTo(w * 0.85423, h * 0.25520);
        this.lineTo(w * 0.74485, h * 0.14582);
        this.lineTo(w * 0.66405, h * 0.19563);
        this.bezierCurveTo(w * 0.65535, h * 0.19101, w * 0.64700, h * 0.18576, w * 0.63795, h * 0.18188);
        this.bezierCurveTo(w * 0.63650, h * 0.18126, w * 0.63510, h * 0.18057, w * 0.63365, h * 0.17988);
        this.bezierCurveTo(w * 0.62255, h * 0.17526, w * 0.61080, h * 0.17245, w * 0.59935, h * 0.16907);
        this.lineTo(w * 0.57748, h * 0.07676);
        this.lineTo(w * 0.57748, h * 0.07651);
        this.lineTo(w * 0.57735, h * 0.07651);
        this.lineTo(w * 0.42273, h * 0.07651);
        this.lineTo(w * 0.40073, h * 0.16913);
        this.bezierCurveTo(w * 0.38918, h * 0.17251, w * 0.37755, h * 0.17538, w * 0.36618, h * 0.18001);
        this.bezierCurveTo(w * 0.36511, h * 0.18057, w * 0.36386, h * 0.18113, w * 0.36268, h * 0.18170);
        this.bezierCurveTo(w * 0.35349, h * 0.18570, w * 0.34487, h * 0.19088, w * 0.33618, h * 0.19570);
        this.lineTo(w * 0.25536, h * 0.14582);
        this.lineTo(w * 0.14586, h * 0.25526);
        this.lineTo(w * 0.19568, h * 0.33601);
        this.bezierCurveTo(w * 0.19105, h * 0.34476, w * 0.18580, h * 0.35326, w * 0.18186, h * 0.36238);
        this.bezierCurveTo(w * 0.18124, h * 0.36376, w * 0.18068, h * 0.36507, w * 0.17993, h * 0.36632);
        this.bezierCurveTo(w * 0.17530, h * 0.37763, w * 0.17249, h * 0.38926, w * 0.16918, h * 0.40082);
        this.lineTo(w * 0.07668, h * 0.42263);
        this.lineTo(w * 0.07655, h * 0.42263);
        this.lineTo(w * 0.07655, h * 0.57732);
        this.lineTo(w * 0.07655, h * 0.57738);
        this.lineTo(w * 0.16918, h * 0.59925);
        this.bezierCurveTo(w * 0.17262, h * 0.61082, w * 0.17543, h * 0.62250, w * 0.18005, h * 0.63375);
        this.bezierCurveTo(w * 0.18055, h * 0.63500, w * 0.18124, h * 0.63632, w * 0.18187, h * 0.63763);
        this.bezierCurveTo(w * 0.18580, h * 0.64663, w * 0.19105, h * 0.65519, w * 0.19580, h * 0.66407);
        this.lineTo(w * 0.14599, h * 0.74469);
        this.lineTo(w * 0.14587, h * 0.74475);
        this.lineTo(w * 0.20056, h * 0.79944);
        this.lineTo(w * 0.25525, h * 0.85419);
        this.lineTo(w * 0.25537, h * 0.85419);
        this.lineTo(w * 0.33605, h * 0.80429);
        this.bezierCurveTo(w * 0.34486, h * 0.80899, w * 0.35324, h * 0.81424, w * 0.36230, h * 0.81809);
        this.bezierCurveTo(w * 0.36361, h * 0.81872, w * 0.36499, h * 0.81940, w * 0.36643, h * 0.82003);
        this.bezierCurveTo(w * 0.37768, h * 0.82472, w * 0.38930, h * 0.82753, w * 0.40086, h * 0.83090);
        this.lineTo(w * 0.42274, h * 0.92321);
        this.lineTo(w * 0.42274, h * 0.92346);
        this.lineTo(w * 0.57736, h * 0.92346);
        this.lineTo(w * 0.57749, h * 0.92346);
        this.lineTo(w * 0.59949, h * 0.83090);
        this.bezierCurveTo(w * 0.61099, h * 0.82755, w * 0.62269, h * 0.82475, w * 0.63399, h * 0.82000);
        this.bezierCurveTo(w * 0.63518, h * 0.81944, w * 0.63630, h * 0.81882, w * 0.63749, h * 0.81844);
        this.bezierCurveTo(w * 0.64667, h * 0.81438, w * 0.65530, h * 0.80913, w * 0.66424, h * 0.80438);
        this.lineTo(w * 0.74493, h * 0.85419);
        this.lineTo(w * 0.85430, h * 0.74482);
        this.lineTo(w * 0.85430, h * 0.74475);
        this.lineTo(w * 0.80450, h * 0.66400);
        this.bezierCurveTo(w * 0.80910, h * 0.65530, w * 0.81435, h * 0.64680, w * 0.81830, h * 0.63775);
        this.bezierCurveTo(w * 0.81890, h * 0.63645, w * 0.81960, h * 0.63500, w * 0.82020, h * 0.63360);
        this.bezierCurveTo(w * 0.82485, h * 0.62250, w * 0.82765, h * 0.61075, w * 0.83110, h * 0.59925);
        this.lineTo(w * 0.92348, h * 0.57738);
        this.lineTo(w * 0.92360, h * 0.57738);
        this.lineTo(w * 0.92360, h * 0.57732);
        this.lineTo(w * 0.92360, h * 0.42263);
        this.lineTo(w * 0.83110, h * 0.40069);
        this.closePath();
        this.fill();
        this.stroke();
        this.restore();
    };
    CanvasRenderingContext2D.prototype.untickedBox = function ( p ) {
        var x = p.x || 100,
            y = p.y || 100,
            w = p.w || 16,
            h = p.h || 16,
            b = p.back || 'rgba(255,255,255,0.75)',
            f = p.fore || 'rgba(173,208,225,1)';
        this.save();
        this.fillStyle = b;
        this.translate(x, y);
        this.beginPath();
        this.moveTo(w, h * 0.86875);
        this.bezierCurveTo(w, h * 0.9375, w * 0.9375, h, w * 0.86875, h);
        this.lineTo(w * 0.13125, h);
        this.bezierCurveTo(w * 0.0625, h, 0, h * 0.9375, 0, h * 0.86875);
        this.lineTo(0, h * 0.13125);
        this.bezierCurveTo(0, h * 0.0625, w * 0.0625, 0, w * 0.13125, 0);
        this.lineTo(w * 0.86875, 0);
        this.bezierCurveTo(w * 0.9375, 0, w, 0.0625, w, h * 0.13125);
        this.lineTo(w, h * 0.86875);
        this.closePath();
        this.fill();
        this.restore();
    };
    /**
     * Unselected Radio Button
     */
    CanvasRenderingContext2D.prototype.radioButton = function ( p ) {
    };
    /**
     * Selected Radio Button
     */
    CanvasRenderingContext2D.prototype.radioButtonSelected = function ( p ) {
    };
    /**
     * Correctly answered Radio Button
     */
    CanvasRenderingContext2D.prototype.radioButtonCorrect = function ( p ) {
    };
    /**
     * Incorrectly answered Radio Button
     */
    CanvasRenderingContext2D.prototype.radioButtonIncorrect = function ( p ) {
    };
    /**
     * Unselected Checkbox (tickbox)
     */
    CanvasRenderingContext2D.prototype.checkbox = function ( p ) {
        var x = p.x || 100,
            y = p.y || 100,
            w = p.w || 16,
            h = p.h || 16,
            b = p.back || 'rgba(255,255,255,0.75)',
            f = p.fore || 'rgba(128,128,128,1)';
        this.save();
        this.fillStyle = b;
        this.strokeStyle = f;
        this.translate(x, y);
        this.beginPath();
        this.moveTo(w, h * 0.86875);
        this.bezierCurveTo(w, h * 0.9375, w * 0.9375, h, w * 0.86875, h);
        this.lineTo(w * 0.13125, h);
        this.bezierCurveTo(w * 0.0625, h, 0, h * 0.9375, 0, h * 0.86875);
        this.lineTo(0, h * 0.13125);
        this.bezierCurveTo(0, h * 0.0625, w * 0.0625, 0, w * 0.13125, 0);
        this.lineTo(w * 0.86875, 0);
        this.bezierCurveTo(w * 0.9375, 0, w, 0.0625, w, h * 0.13125);
        this.lineTo(w, h * 0.86875);
        this.closePath();
        this.fill();
        this.stroke();
        this.restore();
    };
    /**
     * Selected Checkbox
     */
    CanvasRenderingContext2D.prototype.checkboxSelected = function ( p ) {
        p.fore = '#666';
        p.back = '#ccc';
        return this.tickBox(p);
    };
    /**
     * Correctly answered Checkbox
     */
    CanvasRenderingContext2D.prototype.tickBox = function ( p ) {
        var x = p.x || 0,
            y = p.y || 0,
            w = p.w || 16,
            h = p.h || 16,
            b = p.back || '#00BB3F',
            f = p.fore || '#FFFFFF';
        this.background({
            col:'#00BB3F',
            radius:p.h / 5
        }, p);
        this.save();
        this.translate(x, y);
        this.beginPath();
        this.moveTo(w, h * 0.86875);
        this.bezierCurveTo(w, h * 0.9375, w * 0.9375, h, w * 0.86875, h);
        this.lineTo(w * 0.13125, h);
        this.bezierCurveTo(w * 0.0625, h, 0, h * 0.9375, 0, h * 0.86875);
        this.lineTo(0, h * 0.13125);
        this.bezierCurveTo(0, h * 0.0625, w * 0.0625, 0, w * 0.13125, 0);
        this.lineTo(w * 0.86875, 0);
        this.bezierCurveTo(w * 0.9375, 0, w, 0.0625, w, h * 0.13125);
        this.lineTo(w, h * 0.86875);
        this.closePath();
        this.fillStyle = b;
        this.fill();
        this.strokeStyle = 'rgba(0,0,0,0)';
        this.lineCap = 'butt';
        this.lineJoin = 'miter';
        this.miterLimit = 4;
        this.fillStyle = f;
        this.strokeStyle = "rgba(0, 0, 0, 0)";
        this.beginPath();
        this.moveTo(w * 0.31188, h * 0.47642);
        this.lineTo(w * 0.32056, h * 0.52836);
        this.bezierCurveTo(w * 0.32250, h * 0.54136, w * 0.32663, h * 0.55542, w * 0.33313, h * 0.57092);
        this.bezierCurveTo(w * 0.34019, h * 0.57923, w * 0.34888, h * 0.58342, w * 0.35906, h * 0.58342);
        this.bezierCurveTo(w * 0.36363, h * 0.58342, w * 0.37038, h * 0.57923, w * 0.37938, h * 0.57092);
        this.lineTo(w * 0.39563, h * 0.55517);
        this.lineTo(w * 0.73106, h * 0.22855);
        this.lineTo(w * 0.80550, h * 0.16692);
        this.bezierCurveTo(w * 0.81625, h * 0.15792, w * 0.82881, h * 0.15342, w * 0.84313, h * 0.15342);
        this.bezierCurveTo(w * 0.85719, h * 0.15342, w * 0.86581, h * 0.15536, w * 0.86913, h * 0.15923);
        this.bezierCurveTo(w * 0.87231, h * 0.16298, w * 0.87388, h * 0.17236, w * 0.87388, h * 0.18723);
        this.lineTo(w * 0.87388, h * 0.24998);
        this.bezierCurveTo(w * 0.87388, h * 0.26273, w * 0.87144, h * 0.27205, w * 0.86669, h * 0.27786);
        this.bezierCurveTo(w * 0.86194, h * 0.28361, w * 0.85569, h * 0.29061, w * 0.84788, h * 0.29905);
        this.lineTo(w * 0.78038, h * 0.37242);
        this.lineTo(w * 0.54613, h * 0.61892);
        this.lineTo(w * 0.42088, h * 0.73955);
        this.bezierCurveTo(w * 0.34494, h * 0.81211, w * 0.29806, h * 0.84780, w * 0.28013, h * 0.84655);
        this.lineTo(w * 0.25806, h * 0.84461);
        this.bezierCurveTo(w * 0.24438, h * 0.84330, w * 0.22250, h * 0.83048, w * 0.19250, h * 0.80605);
        this.bezierCurveTo(w * 0.17956, h * 0.79567, w * 0.16675, h * 0.78311, w * 0.15381, h * 0.76842);
        this.bezierCurveTo(w * 0.14819, h * 0.76205, w * 0.14513, h * 0.75017, w * 0.14513, h * 0.73280);
        this.lineTo(w * 0.13169, h * 0.61611);
        this.bezierCurveTo(w * 0.12650, h * 0.57055, w * 0.12500, h * 0.53211, w * 0.12694, h * 0.50048);
        this.bezierCurveTo(w * 0.12888, h * 0.47536, w * 0.13063, h * 0.46023, w * 0.13256, h * 0.45467);
        this.bezierCurveTo(w * 0.13450, h * 0.44917, w * 0.14319, h * 0.43748, w * 0.15875, h * 0.41955);
        this.bezierCurveTo(w * 0.16825, h * 0.40855, w * 0.17600, h * 0.39986, w * 0.18188, h * 0.39355);
        this.bezierCurveTo(w * 0.19206, h * 0.38255, w * 0.20138, h * 0.37586, w * 0.20981, h * 0.37330);
        this.bezierCurveTo(w * 0.22838, h * 0.36742, w * 0.24488, h * 0.36461, w * 0.25888, h * 0.36461);
        this.bezierCurveTo(w * 0.27100, h * 0.36461, w * 0.28138, h * 0.36830, w * 0.28981, h * 0.37567);
        this.bezierCurveTo(w * 0.29806, h * 0.38305, w * 0.30219, h * 0.39292, w * 0.30219, h * 0.40505);
        this.bezierCurveTo(w * 0.30219, h * 0.41417, w * 0.30538, h * 0.43786, w * 0.31188, h * 0.47642);
        this.fill();
        this.stroke();
        this.restore();
    };
    /**
     * Incorrectly answered Checkbox
     */
    CanvasRenderingContext2D.prototype.crossBox = function ( p ) {
        var x = p.x || 100,
            y = p.y || 100,
            w = p.w || 16,
            h = p.h || 16,
            b = p.back || "#ff2800",
            f = p.fore || "rgb(255, 255, 255)";
        this.save();
        this.translate(x, y);
        this.beginPath();
        this.moveTo(w, h * 0.86875);
        this.bezierCurveTo(w, h * 0.9375, w * 0.9375, h, w * 0.86875, h);
        this.lineTo(w * 0.13125, h);
        this.bezierCurveTo(w * 0.0625, h, 0, h * 0.9375, 0, h * 0.86875);
        this.lineTo(0, h * 0.13125);
        this.bezierCurveTo(0, h * 0.0625, w * 0.0625, 0, w * 0.13125, 0);
        this.lineTo(w * 0.86875, 0);
        this.bezierCurveTo(w * 0.9375, 0, w, 0.0625, w, h * 0.13125);
        this.lineTo(w, h * 0.86875);
        this.closePath();
        this.fillStyle = b;
        this.fill();
        this.strokeStyle = 'rgba(0,0,0,0)';
        this.lineCap = 'butt';
        this.lineJoin = 'miter';
        this.miterLimit = 4;
        this.fillStyle = f;
        this.beginPath();
        this.moveTo(w * 0.57470, h * 0.50100);
        this.lineTo(w * 0.63889, h * 0.58400);
        this.lineTo(w * 0.72795, h * 0.69069);
        this.bezierCurveTo(w * 0.72670, h * 0.69844, w * 0.72345, h * 0.70663, w * 0.71870, h * 0.71575);
        this.bezierCurveTo(w * 0.70695, h * 0.73700, w * 0.69864, h * 0.74782, w * 0.69376, h * 0.74782);
        this.lineTo(w * 0.68545, h * 0.74782);
        this.bezierCurveTo(w * 0.68345, h * 0.74782, w * 0.68083, h * 0.75063, w * 0.67770, h * 0.75644);
        this.bezierCurveTo(w * 0.67464, h * 0.76250, w * 0.67364, h * 0.76700, w * 0.67464, h * 0.77006);
        this.bezierCurveTo(w * 0.67570, h * 0.77307, w * 0.67170, h * 0.77907, w * 0.66276, h * 0.78769);
        this.bezierCurveTo(w * 0.65382, h * 0.79638, w * 0.64789, h * 0.80063, w * 0.64508, h * 0.80063);
        this.bezierCurveTo(w * 0.64026, h * 0.80063, w * 0.63376, h * 0.79763, w * 0.62595, h * 0.79138);
        this.bezierCurveTo(w * 0.61801, h * 0.78513, w * 0.61470, h * 0.78188, w * 0.61608, h * 0.78188);
        this.bezierCurveTo(w * 0.59332, h * 0.80563, w * 0.57876, h * 0.81725, w * 0.57258, h * 0.81725);
        this.bezierCurveTo(w * 0.57189, h * 0.81725, w * 0.57064, h * 0.81682, w * 0.56895, h * 0.81619);
        this.bezierCurveTo(w * 0.56714, h * 0.81550, w * 0.56558, h * 0.81507, w * 0.56426, h * 0.81507);
        this.bezierCurveTo(w * 0.54839, h * 0.79919, w * 0.52833, h * 0.77369, w * 0.50420, h * 0.73838);
        this.bezierCurveTo(w * 0.48133, h * 0.70519, w * 0.46270, h * 0.67907, w * 0.44814, h * 0.65963);
        this.lineTo(w * 0.42952, h * 0.68450);
        this.lineTo(w * 0.28952, h * 0.87219);
        this.lineTo(w * 0.27614, h * 0.87219);
        this.lineTo(w * 0.25639, h * 0.85044);
        this.bezierCurveTo(w * 0.25639, h * 0.84894, w * 0.25683, h * 0.84657, w * 0.25796, h * 0.84313);
        this.bezierCurveTo(w * 0.25895, h * 0.83969, w * 0.25952, h * 0.83732, w * 0.25952, h * 0.83575);
        this.bezierCurveTo(w * 0.25952, h * 0.83238, w * 0.25783, h * 0.83057, w * 0.25439, h * 0.83057);
        this.bezierCurveTo(w * 0.25233, h * 0.83057, w * 0.24389, h * 0.83338, w * 0.22952, h * 0.83900);
        this.bezierCurveTo(w * 0.22239, h * 0.83619, w * 0.21289, h * 0.82413, w * 0.20046, h * 0.80282);
        this.bezierCurveTo(w * 0.19421, h * 0.79157, w * 0.19064, h * 0.78619, w * 0.19002, h * 0.78619);
        this.bezierCurveTo(w * 0.19002, h * 0.78469, w * 0.19214, h * 0.78100, w * 0.19627, h * 0.77482);
        this.bezierCurveTo(w * 0.20046, h * 0.76850, w * 0.20252, h * 0.76332, w * 0.20252, h * 0.75925);
        this.bezierCurveTo(w * 0.20252, h * 0.75582, w * 0.19996, h * 0.74894, w * 0.19471, h * 0.73900);
        this.bezierCurveTo(w * 0.18946, h * 0.72888, w * 0.18652, h * 0.72219, w * 0.18589, h * 0.71869);
        this.lineTo(w * 0.27502, h * 0.61094);
        this.lineTo(w * 0.35902, h * 0.51257);
        this.bezierCurveTo(w * 0.29964, h * 0.40113, w * 0.25952, h * 0.31063, w * 0.23871, h * 0.24088);
        this.bezierCurveTo(w * 0.24633, h * 0.22631, w * 0.25877, h * 0.21113, w * 0.27615, h * 0.19519);
        this.bezierCurveTo(w * 0.27821, h * 0.19594, w * 0.28221, h * 0.19938, w * 0.28852, h * 0.20563);
        this.bezierCurveTo(w * 0.29471, h * 0.21194, w * 0.29821, h * 0.21494, w * 0.29883, h * 0.21494);
        this.bezierCurveTo(w * 0.30921, h * 0.21494, w * 0.31408, h * 0.20831, w * 0.31339, h * 0.19519);
        this.bezierCurveTo(w * 0.31265, h * 0.17875, w * 0.32171, h * 0.17044, w * 0.34033, h * 0.17044);
        this.bezierCurveTo(w * 0.34652, h * 0.17044, w * 0.35390, h * 0.17656, w * 0.36221, h * 0.18906);
        this.lineTo(w * 0.48448, h * 0.37257);
        this.bezierCurveTo(w * 0.50236, h * 0.35188, w * 0.54417, h * 0.30757, w * 0.60986, h * 0.23988);
        this.bezierCurveTo(w * 0.68248, h * 0.16532, w * 0.72148, h * 0.12788, w * 0.72698, h * 0.12788);
        this.bezierCurveTo(w * 0.73042, h * 0.12788, w * 0.73804, h * 0.13325, w * 0.74973, h * 0.14407);
        this.bezierCurveTo(w * 0.76155, h * 0.15475, w * 0.76611, h * 0.16250, w * 0.76330, h * 0.16732);
        this.bezierCurveTo(w * 0.76048, h * 0.17013, w * 0.75904, h * 0.17250, w * 0.75904, h * 0.17450);
        this.bezierCurveTo(w * 0.75904, h * 0.17882, w * 0.76255, h * 0.18257, w * 0.76942, h * 0.18600);
        this.bezierCurveTo(w * 0.77648, h * 0.18944, w * 0.78204, h * 0.19050, w * 0.78661, h * 0.18913);
        this.bezierCurveTo(w * 0.79111, h * 0.18769, w * 0.79498, h * 0.18982, w * 0.79842, h * 0.19525);
        this.lineTo(w * 0.81404, h * 0.21813);
        this.bezierCurveTo(w * 0.81404, h * 0.22094, w * 0.81179, h * 0.22532, w * 0.80729, h * 0.23157);
        this.bezierCurveTo(w * 0.80273, h * 0.23788, w * 0.80054, h * 0.24163, w * 0.80054, h * 0.24300);
        this.bezierCurveTo(w * 0.79573, h * 0.24032, w * 0.72210, h * 0.32419, w * 0.57985, h * 0.49488);
        this.lineTo(w * 0.57475, h * 0.50106);
        this.closePath();
        this.fill();
        this.stroke();
        this.restore();
    };
    CanvasRenderingContext2D.prototype.grid = function ( p ) {
        var i, j,
            x = p.x || 0,
            y = p.y || 0,
            w = p.w || 100,
            h = p.h || 40,
            gridW = p.gridW || 15,
            gridH = p.gridH || 15;
        this.save();
        this.lineWidth = p.lineWidth || 0.5;
        this.strokeStyle = p.strokeStyle || '#ccc';
        this.beginPath();
        for (i = 0; i < h; i += gridH) {
            this.moveTo(x, y + i);
            this.lineTo(x + w, y + i);
        }
        for (j = 0; j < w; j += gridW) {
            this.moveTo(x + j, y);
            this.lineTo(x + j, y + h);
        }
        this.stroke();
        this.restore();
    };
    CanvasRenderingContext2D.prototype.leftPlay = function ( p ) {

        //  this.crossGrid(p);
        // might not scale correctly
        var x = p.x || 100,
            y = p.y || 100,
            w = p.w || 16,
            h = p.h || 16,
            b = p.back || 'rgba(26,26,26,1)',
            f = p.fore || 'rgba(173,208,225,1)',
            o = p.orientation || 0;
        this.save();
        this.translate(x, y);
        this.fillStyle = f;
        this.beginPath();
        this.moveTo(w * 0.2, h * 0.5);
        this.lineTo(w * 0.8, h * 0.2);
        this.lineTo(w * 0.8, h * 0.8);
        this.closePath();
        this.fill();
        //   this.stroke();
        this.restore();
    };
    CanvasRenderingContext2D.prototype.rightPlay = function ( p ) {

        // might not scale correctly
        //  this.crossGrid(p);
        var x = p.x || 100,
            y = p.y || 100,
            w = p.w || 16,
            h = p.h || 16,
            b = p.back || 'rgba(26,26,26,1)',
            f = p.fore || 'rgba(173,208,225,1)',
            o = p.orientation || 0;
        this.save();
        this.fillStyle = f;
        this.translate(x, y);
        this.beginPath();
        this.moveTo(w * 0.8, h * 0.5);
        this.lineTo(w * 0.2, h * 0.2);
        this.lineTo(w * 0.2, h * 0.8);
        this.closePath();
        this.fill();
        //  this.stroke();
        this.restore();
    };
}


