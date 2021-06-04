function Names() {
	this.girls = initGirls();
	this.nameData = this.girls;
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




























initGirls = function() {
	return [
		['AMELIA', 7061],
		['OLIVIA', 4585],
		['JESSICA', 4165],
		['EMILY', 4029],
		['LILY', 3802],
		['AVA', 3779],
		['MIA', 3524],
		['ISLA', 3501],
		['SOPHIE', 3496],
		['ISABELLA', 3358],
		['EVIE', 3280],
		['RUBY', 3231],
		['POPPY', 3203],
		['GRACE', 3188],
		['SOPHIA', 2855],
		['CHLOE', 2776],
		['ISABELLE', 2594],
		['ELLA', 2559],
		['FREYA', 2557],
		['CHARLOTTE', 2290],
		['SCARLETT', 2248],
		['DAISY', 2209],
		['LOLA', 2010],
		['EVA', 1946],
		['HOLLY', 1937],
		['MILLIE', 1912],
		['LUCY', 1908],
		['PHOEBE', 1825],
		['LAYLA', 1796],
		['MAISIE', 1658],
		['SIENNA', 1625],
		['ALICE', 1577],
		['LILLY', 1536],
		['FLORENCE', 1531],
		['ELLIE', 1527],
		['ERIN', 1504],
		['IMOGEN', 1454],
		['ELIZABETH', 1446],
		['MOLLY', 1434],
		['SUMMER', 1408],
		['MEGAN', 1388],
		['HANNAH', 1357],
		['SOFIA', 1336],
		['ABIGAIL', 1316],
		['JASMINE', 1313],
		['LEXI', 1301],
		['MATILDA', 1284],
		['ROSIE', 1263],
		['LACEY', 1220],
		['EMMA', 1149],
		['AMELIE', 1146],
		['GRACIE', 1104],
		['MAYA', 1072],
		['HOLLIE', 1062],
		['GEORGIA', 1055],
		['EMILIA', 1050],
		['EVELYN', 1034],
		['BELLA', 1027],
		['BROOKE', 1026],
		['AMBER', 1023],
		['ELIZA', 996],
		['AMY', 995],
		['ELEANOR', 989],
		['LEAH', 944],
		['ESME', 934],
		['KATIE', 914],
		['HARRIET', 904],
		['ANNA', 902],
		['WILLOW', 892],
		['ELSIE', 888],
		['ZARA', 886],
		['ANNABELLE', 884],
		['BETHANY', 868],
		['FAITH', 868],
		['MADISON', 846],
		['ISABEL', 774],
		['MARTHA', 770],
		['ROSE', 764],
		['JULIA', 751],
		['PAIGE', 715],
		['MARYAM', 700],
		['MADDISON', 696],
		['HEIDI', 678],
		['MOLLIE', 672],
		['NIAMH', 672],
		['SKYE', 666],
		['AISHA', 642],
		['IVY', 633],
		['DARCEY', 632],
		['FRANCESCA', 622]
	];
}
