function Names() {	
	this.boys = initBoys();
	this.nameData = this.boys;
	this.nameData.sort(function(a,b) {
    // this sorts the array using the first element
		return ((a[0] < b[0]) ? -1 : ((a[0] > b[0]) ? 1 : 0));
	});
	
	
	
	// find the SVG container
	this.svg = d3.select("#names");
	
	var	svgWidth = +this.svg.attr("width");		// plus sign used to typecast string to int
	var svgHeight = +this.svg.attr("height");
	
	this.plot = this.svg.append("svg:svg")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", svgWidth)
		.attr("height", svgHeight);
		
	this.svg.append("svg:rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", svgWidth)
		.attr("height", svgHeight)
		.attr("fill", "#ffffff");
		
	this.gradientSetup();
	this.showNames(this.nameData);

}	



Names.prototype.search = function (searchTerm) {
	this.iterations = 0;
	this.searchFor = searchTerm;
    this.start = 0
	this.end = this.nameData.length - 1;
	this.mid;
	this.searchNext();
}
	
Names.prototype.searchNext = function() {			
	
    if ( this.start <= this.end ) {
        if ( this.searchFor > this.nameData[this.mid = ((this.start + this.end) >> 1)][0] ) {
			this.start = this.mid + 1;
			for (var i = 0; i < this.nameData.length; i++) {
				this.nameData[i].opacity = (i >  this.mid && i <= this.end) ? 1 : 0.1;				
				this.nameData[i].style = "url(#gradientLo)";
				this.nameData[i].style2 = (i >=  this.mid && i <= this.end) ? "url(#gradientNo)" : "url(#gradientLo)";			
			}
		} else {
			this.end = (this.searchFor == this.nameData[this.mid][0]) ? -2 : this.mid - 1;
			if (this.end == -2) {
				this.start = this.mid;
			}
			for (var i = 0; i < this.nameData.length; i++) {
				this.nameData[i].opacity = (i >=  this.start && i < this.mid) ? 1 : 0.1;
				this.nameData[i].style = "url(#gradientLo)";
				this.nameData[i].style2 = (i >=  this.start && i <= this.mid) ? "url(#gradientNo)": "url(#gradientLo)";
			}
		}	
		this.nameData[this.mid].style = "url(#gradientHi)";
		if (this.end == -2) {			
			this.nameData[this.mid].style2 = "url(#gradientNo)";
			this.nameData[this.mid].opacity = 1;
		} else {		
			this.nameData[this.mid].style2 = "url(#gradientLo)";
		}
		this.fadeOutNames(this.names);
		
		this.iterations++;
		var iterations = this.iterations;		
		timeout = window.setTimeout(function() { this.searchNext(iterations); }, 4000);
    } else {	
		var iterations = this.iterations;
		if (this.end == -2) {		
			var total = this.nameData[this.mid][1];
			this.nameData.sort(function(a,b) {
			// this sorts the array using the second element
				return ((a[1] < b[1]) ? -1 : ((a[1] > b[1]) ? 1 : 0));
			});			
			var rank = this.nameData.length - this.binomialSearch(total, this.nameData, 1);		
			this.end = -3;
			timeout = window.setTimeout(function() { this.found(rank, total, iterations); }, 10);
		} else {
			var rank = "Not found";		
			var total = "Not found";				
			timeout = window.setTimeout(function() { this.found(rank, total, iterations); }, 10);
		}
	}
}
	
Names.prototype.binomialSearch = function (searchFor, data, index) {
    var start = 0
	var end = data.length - 1;
	var mid;
	
	while ( start <= end ) {
        if ( searchFor > data[mid = ((start + end) >> 1)][index] ) {
			start = mid + 1;
		} else {
			end = (searchFor == data[mid][index]) ? -2 : mid - 1;
			if (end == -2) {
				start = mid;
			}
		}
    } 	
    return (end == -2) ? mid : -1;
}

Names.prototype.showNames = function(nameData)  {

	var self = this;
	var nameWidth = 0;
	var nameHeight = 20;
	var namePad = 0;
	var nameMargin = 6;
	var nameLeft = 0;
		
	var width = +this.svg.attr("width");			// plus sign typecasts string to int
	var	height = +this.svg.attr("height");	
	
	this.names = this.svg.append("svg:g")
		.attr("id", "names")
		.attr("x", 0)		
		.attr("y", 0);		

	var nameRect = this.names.selectAll("rect")
		.data(nameData)
		.enter()
			  .append("svg:rect")
			  .attr("id", function(datum) { return datum[0]; })
			  .attr("opacity", 0.1)			
			  .style("fill", "url(#gradientLo)");

	var nameText = this.names.selectAll("text")
		.data(nameData)
		.enter()
		  .append("svg:text")
		  .attr("class", "name")
		  .attr("dx", nameMargin)
		  .attr("dy", "1em")
		  .attr("text-anchor", "left")			
		  .attr("opacity", 0.1)
		  .text(function(datum) { return datum[0]; })		
		  .attr('pointer-events', 'none');

	nameWidth = 76;

		
	var nameY = 0;	
	for (var i = 0; i < nameData.length; i++) {
		nameData[i].x = (nameWidth + namePad + 2) * (i % 10) + 1;
		nameData[i].y = (nameHeight + namePad + 2) * Math.floor(i / 10) + 1;
	}

	nameRect
		.data(nameData)
			.attr("width", nameWidth)		
			.attr("height", nameHeight)
			.attr("x", function(datum) { return datum.x; })			
			.attr("y", function(datum) { return datum.y; });
	nameText
		.data(nameData)				
			.attr("x", function(datum) { return datum.x; })
			.attr("y", function(datum) { return datum.y + 2; });
		
	this.fadeInNames(this.names);	
}



Names.prototype.fadeInNames = function(names) {
	names.selectAll("rect")
	  .transition()
		.delay(0)
		.duration(500)
		.attr("opacity", 1);
		
	names.selectAll("text")
	  .transition()
		.delay(0)
		.duration(1000)			
		.attr("opacity", 1);
}

Names.prototype.fadeOutNames = function(names) {
    function fadeRect() {
		d3.select(this)
		  .transition()
			.delay(0)
			.duration(1000)
			.attr("opacity", function(datum) { return datum.opacity });
	}
		
    function colorRect() {
		d3.select(this)
		  .transition()
			.delay(0)
			.duration(1000)
			.style("fill", function(datum) { return datum.style2 })
			.each("end", fadeRect);
	}
	
	names.selectAll("rect")
	  .transition()
		.delay(0)
		.duration(1000)
		.style("fill", function(datum) { return datum.style })
		.each("end", colorRect);
		
	names.selectAll("text")
	  .transition()
		.delay(2000)
		.duration(1000)			
		.attr("opacity", function(datum) { return datum.opacity });		
}


// Create the gradients for the names
Names.prototype.gradientSetup = function() {
	var gradientHi = this.plot.append("svg:defs")
	  .append("svg:linearGradient")
		.attr("id", "gradientHi")
		.attr("x1", "0%")
		.attr("y1", "0%")
		.attr("x2", "0%")
		.attr("y2", "100%")
		.attr("spreadMethod", "pad");		

	gradientHi.append("svg:stop")
		.attr("offset", "0%")
		.attr("stop-color", "#91d7ff")
		.attr("stop-opacity", 1);

	gradientHi.append("svg:stop")
		.attr("offset", "100%")
		.attr("stop-color", "#5ba8dc")
		.attr("stop-opacity", 1);			
			
	var gradientLo = this.plot.append("svg:defs")
	  .append("svg:linearGradient")
		.attr("id", "gradientLo")
		.attr("x1", "0%")
		.attr("y1", "0%")
		.attr("x2", "0%")
		.attr("y2", "100%")
		.attr("spreadMethod", "pad");

	gradientLo.append("svg:stop")
		.attr("offset", "0%")
		.attr("stop-color", "#def5fd")
		.attr("stop-opacity", 1);

	gradientLo.append("svg:stop")
		.attr("offset", "100%")
		.attr("stop-color", "#c6e9fc")
		.attr("stop-opacity", 1);			
		
		
	var gradientNo = this.plot.append("svg:defs")
	  .append("svg:linearGradient")
		.attr("id", "gradientNo")
		.attr("x1", "0%")
		.attr("y1", "0%")
		.attr("x2", "0%")
		.attr("y2", "100%")
		.attr("spreadMethod", "pad");		

	gradientNo.append("svg:stop")
		.attr("offset", "0%")
		.attr("stop-color", "#ffd791")
		.attr("stop-opacity", 1);

	gradientNo.append("svg:stop")
		.attr("offset", "100%")
		.attr("stop-color", "#dca85b")
		.attr("stop-opacity", 1);			
		
}	




























initBoys = function() {	
return [
['HARRY', 7523],
['OLIVER', 7007],
['JACK', 6844],
['ALFIE', 5524],
['CHARLIE', 5516],
['THOMAS', 5353],
['JACOB', 5047],
['JAMES', 4945],
['JOSHUA', 4786],
['WILLIAM', 4632],
['ETHAN', 4581],
['GEORGE', 4347],
['RILEY', 4226],
['DANIEL', 3928],
['SAMUEL', 3803],
['NOAH', 3287],
['OSCAR', 3251],
['JOSEPH', 3089],
['MOHAMMED', 3054],
['MAX', 3043],
['DYLAN', 2962],
['MUHAMMAD', 2854],
['ALEXANDER', 2819],
['ARCHIE', 2805],
['BENJAMIN', 2789],
['LUCAS', 2716],
['LEO', 2664],
['HENRY', 2625],
['JAKE', 2619],
['LOGAN', 2549],
['TYLER', 2520],
['JAYDEN', 2353],
['ISAAC', 2352],
['FINLEY', 2245],
['MASON', 2171],
['RYAN', 2151],
['HARRISON', 2122],
['ADAM', 2062],
['LEWIS', 2035],
['EDWARD', 1935],
['LUKE', 1830],
['FREDDIE', 1819],
['MATTHEW', 1743],
['LIAM', 1690],
['ZACHARY', 1664],
['CALLUM', 1580],
['SEBASTIAN', 1493],
['CONNOR', 1471],
['JAMIE', 1445],
['THEO', 1407],
['TOBY', 1389],
['HARVEY', 1388],
['MICHAEL', 1364],
['NATHAN', 1319],
['HARLEY', 1308],
['KAI', 1211],
['DAVID', 1163],
['AARON', 1147],
['ALEX', 1129],
['CHARLES', 1090],
['AIDEN', 1077],
['LEON', 1069],
['MOHAMMAD', 1037],
['LUCA', 982],
['TOMMY', 980],
['FINLAY', 967],
['JENSON', 966],
['ARTHUR', 961],
['LOUIS', 961],
['RHYS', 946],
['OWEN', 943],
['REUBEN', 941],
['OLLIE', 933],
['LOUIE', 887],
['GABRIEL', 874],
['BOBBY', 869],
['CAMERON', 848],
['DEXTER', 833],
['BLAKE', 831],
['STANLEY', 824],
['KIAN', 800],
['EVAN', 770],
['JUDE', 764],
['FRANKIE', 756],
['ELLIOT', 755],
['HAYDEN', 747],
['ASHTON', 727],
['JOEL', 712],
['CALEB', 709],
['BAILEY', 704],
['ELIJAH', 701],
['TAYLOR', 696],
['ROBERT', 694],
['KAYDEN', 686],
['KYLE', 683],
['FREDERICK', 669],
['BEN', 667],
['REECE', 656],
['JACKSON', 647],
['JOHN', 645]
];
}
