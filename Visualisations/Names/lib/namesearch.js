function Names() {
	this.speed = 4000;
	this.nameData = initNames();
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

Names.prototype.searchName = function () {
	document.getElementById("go").disabled = true;
	var searchTerm = document.getElementById("searchName").value;
	searchTerm = searchTerm.substr(0, 1).toUpperCase() + searchTerm.substr(1).toLowerCase();
	this.search(searchTerm);
};

Names.prototype.search = function(searchTerm) {
	this.iterations = 0;
	this.searchFor = searchTerm;
    this.start = 0;
	this.end = this.nameData.length - 1;
	this.mid = (this.start + this.end) >> 1;
	this.searchNext();
};

Names.prototype.searchNext = function() {
	var i;
	var iterations;
	var rank;
	var total;
	var self = this;

    if ( this.start <= this.end ) {
		this.iterations++;
		iterations = this.iterations;
		document.getElementById("iterations").value = iterations;


        if ( this.searchFor > this.nameData[this.mid = ((this.start + this.end) >> 1)][0] ) {
			this.start = this.mid + 1;
			for (i = 0; i < this.nameData.length; i++) {
				this.nameData[i].opacity = (i >  this.mid && i <= this.end) ? 1 : 0.1;
				this.nameData[i].style = "url(#gradientLo)";
				this.nameData[i].style2 = (i >=  this.mid && i <= this.end) ? "url(#gradientNo)" : "url(#gradientLo)";
			}
		} else {
			this.end = (this.searchFor == this.nameData[this.mid][0]) ? -2 : this.mid - 1;
			if (this.end == -2) {
				this.start = this.mid;
			}
			for (i = 0; i < this.nameData.length; i++) {
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

		window.setTimeout(function() { self.searchNext(iterations); }, this.speed);
    } else {
		iterations = this.iterations;
		if (this.end == -2) {
			total = this.nameData[this.mid][1];
			this.nameData.sort(function(a,b) {
			// this sorts the array using the second element
				return ((a[1] < b[1]) ? -1 : ((a[1] > b[1]) ? 1 : 0));
			});
			rank = this.nameData.length - this.binomialSearch(total, this.nameData, 1);
			this.end = -3;
			window.setTimeout(function() { self.found(rank, total, iterations); }, 10);
		} else {
			rank = "N/A";
			total = "0";
			window.setTimeout(function() { self.found(rank, total, iterations); }, 10);
		}
	}
};

Names.prototype.found = function(rank, total, iterations) {
	document.getElementById("complete").style.display = "block";
	document.getElementById("not").style.display = this.end === -3 ? "none" : "inline";
	document.getElementById("results").style.display = "inline";
	document.getElementById("rank").value = rank;
	document.getElementById("total").value = total;
	document.getElementById("iterations").value = iterations;
};

Names.prototype.binomialSearch = function (searchFor, data, index) {
    var start = 0;
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
};

Names.prototype.showNames = function(nameData)  {
	var nameWidth = 76;
	var nameHeight = 20;
	var namePad = 0;
	var nameMargin = 4;
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
};

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
};

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
};

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
};

initNames = function() {
	return [
		['Oliver', 6949],
		['Jack', 6212],
		['Jacob', 5126],
		['Harry', 5888],
		['Charlie', 5039],
		['Thomas', 4591],
		['Oscar', 4511],
		['William', 4268],
		['James', 4236],
		['George', 4202],
		['Alfie', 4138],
		['Joshua', 3973],
		['Noah', 3830],
		['Ethan', 3572],
		['Muhammad', 3499],
		['Archie', 3265],
		['Leo', 3264],
		['Henry', 3248],
		['Joseph', 3225],
		['Samuel', 3188],
		['Riley', 3122],
		['Daniel', 3095],
		['Mohammed', 2887],
		['Alexander', 2837],
		['Max', 2836],
		['Lucas', 2793],
		['Mason', 2724],
		['Logan', 2621],
		['Isaac', 2569],
		['Benjamin', 2532],
		['Dylan', 2393],
		['Jake', 2311],
		['Edward', 2273],
		['Finley', 2154],
		['Freddie', 2089],
		['Harrison', 2038],
		['Tyler', 2021],
		['Sebastian', 1828],
		['Zachary', 1780],
		['Adam', 1761],
		['Theo', 1759],
		['Jayden', 1657],
		['Arthur', 1559],
		['Toby', 1431],
		['Luke', 1415],
		['Lewis', 1329],
		['Matthew', 1319],
		['Harvey', 1276],
		['Harley', 1275],
		['David', 1248],
		['Ryan', 1234],
		['Tommy', 1207],
		['Michael', 1200],
		['Reuben', 1144],
		['Nathan', 1131],
		['Blake', 1083],
		['Mohammad', 1059],
		['Jenson', 1055],
		['Bobby', 1049],
		['Luca', 1034],
		['Charles', 1029],
		['Frankie', 1024],
		['Dexter', 1019],
		['Kai', 1002],
		['Alex', 986],
		['Connor', 974],
		['Liam', 973],
		['Jamie', 912],
		['Elijah', 908],
		['Stanley', 904],
		['Louie', 868],
		['Jude', 867],
		['Callum', 855],
		['Hugo', 842],
		['Leon', 837],
		['Elliot', 829],
		['Louis', 827],
		['Theodore', 822],
		['Gabriel', 818],
		['Ollie', 800]
	];
};
