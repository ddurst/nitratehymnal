function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
        oldonload();
        func();
      }
    }
}

var choose = 7;

var aFilmstrip = new Array();
    aFilmstrip[0]  = 'anncar.jpg';
    aFilmstrip[1]  = 'atsea.jpg';
    aFilmstrip[2]  = 'fatherson.jpg';
    aFilmstrip[3]  = 'flower.jpg';
    aFilmstrip[4]  = 'laff.jpg';
    aFilmstrip[5]  = 'oceangreen.jpg';
    aFilmstrip[6]  = 'picnic.jpg';
    aFilmstrip[7]  = 'popsicle.jpg';
    aFilmstrip[8]  = 'robertbike1.jpg';
    aFilmstrip[9]  = 'robertbike2.jpg';
    aFilmstrip[10] = 'robertblur.jpg';
    aFilmstrip[11] = 'robertbroken.jpg';
    aFilmstrip[12] = 'roberthair.jpg';
    aFilmstrip[13] = 'running.jpg';


function getRandomInt(i, j) {
	var min = Math.ceil(i);
	var max = Math.floor(j);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


function permute2(m, n) {
	var s = new Array();
	for (var j=n-m+1; j <= n; j++) {
		var r = getRandomInt(1, j);
		var i = s.indexOf(r);
		if (i === -1) {
			s.splice(0, 0, r);
		} else {
			s.splice(i+1,0, j);
		}
	}
	return s;
}


function permute(m, n) {
	var s = new Array(), 
		from = new Array();
	for (var i=0; i<n; i++) {
		from.push(i+1);
	}
	while (s.length < m) {
		var r = getRandomInt(0, from.length-1);
		s.push(from.splice(r,1));
	}
	return s;
}


function shuffleFilmstrip() {
	var randoms = permute(choose, aFilmstrip.length);
	// chosenStrips is the indices to use from aFilmstrip
	var chosenStrips = randoms.map( function(value) { /* kind of annoying, but we chose 7 from 1-14, but the array is 0-13, so... */
		return value - 1;
	} );
	// washStrips is which get flipped to -wash
	var washStrips = [];
	for (var i=0; i<chosenStrips.length; i++) {
		washStrips.push(getRandomInt(0,1));
	}
	// put em all together
	var newStrips = [];
	for (var j=0; j<chosenStrips.length; j++) {
		if (washStrips[j]) { // use -wash
			newStrips.push('url("/images/filmstrip/' + aFilmstrip[chosenStrips[j]].replace('.', '-wash.') + '")');
		} else {
			newStrips.push('url("/images/filmstrip/' + aFilmstrip[chosenStrips[j]] + '")');
		}
	}
	// now create `background-image` for #navigation
	var ruleString = '#navigation { background-image: ' + newStrips.join() + '; }';
	var nav = document.getElementById("navigation");
	var sheet = document.styleSheets[0];
	var css_rules_num = sheet.cssRules.length;
	sheet.insertRule(ruleString, css_rules_num);
}


addLoadEvent(shuffleFilmstrip);
