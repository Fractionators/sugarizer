var adjustment;
var denominators = [1,2,3,4,5,6,8,10,12,100]
var possible = [170];
var names = [170];

function Fraction (index) {
    this.value = possible[index];
    this.fraction = names[index];
	this.numerator = this.fraction.split("/")[0];
	this.denominator = this.fraction.split("/")[1];
}

function makeFractions() {
	count = 0;
	for (i = 0; i < denominators.length; i++) {
		for (j = 0; j <= denominators[i]; j++) {
			if(denominators[i] != 100 || Math.random() < 0.25) {
				names[count]=""+j+"/"+denominators[i];
				possible[count] = j/denominators[i];
				count++;
			}
		} 
	}
}

function rotDeg(amt) {
	var deg = 0;
	if (amt > 50) {
		deg = (100 - amt) / 100 * 360;
	} 
	else if (amt < 50) {
		deg = (100 - (50 - amt)) / 100 * 360 * -1;
	}
	
	return deg;
}

function showPieChart(tag, val) {
	var deg = val*100;
	
	$(tag).css("transform","rotate("+rotDeg(deg)+"deg)");
	if (deg > 50) {
		$(tag).addClass("over50");
	}
}

function makePieChart (val, id) {
	var newHTML = "<div id=\"card"+id+"\"class=\"fraction cardFrac\"><div class=\"amtCircle\"></div></div>";
	
	return newHTML;
}

$(document).ready(function() { 
	makeFractions();
	showPieChart(".titleFrac .amtCircle", .33);

	$("#start").on("click", function(){
		$("#menu").css("display", "none");
		$("#game").css("display", "block");
		$("#gameOver").css("display", "none");
		setUpGame();
	});	
	$("#check").on("click", function(){
		$("#menu").css("display", "none");
		$("#game").css("display", "none");
		$("#gameOver").css("display", "block");
		check();
	});	
	$("#back").on("click", function(){
		$("#menu").css("display", "block");
		$("#game").css("display", "none");
		$("#gameOver").css("display", "none");
	});	
	$("#replay").on("click", function(){
		$("#menu").css("display", "none");
		$("#game").css("display", "block");
		$("#gameOver").css("display", "none");
		setUpGame();
	});
    
    $("#cardList").sortable({
	  group: 'limited_drop_targets',
	  isValidTarget: function  ($item, container) {
		if($item.is(".static"))
		  return false;
		else
		  return $item.parent("ol")[0] == container.el[0];
	  },
	});
    
    
    //$("#cardList").disableSelection();
});

function setUpGame() {
    var difficulty = $('input[name=difficulty]:checked').val();
    var amount = $('input[name=amount]:checked').val();
	
	var newItemsHTML = "";
	var amt = 0;
	var val = "";
		
	switch (amount){
		case "small":
			amt = 3;
			break;
		case "med":
			amt = 6;
			break;
		case "large":
			amt = 12;
			break;
		default:
			break;
	}
	
	var fractions = randomFractions(amt);
	
	// 0
	if (difficulty == "easy") {
		document.getElementById("zero").innerHTML = "<p><span class=\"value\">0</span>"+makePieChart(0, "Start")+"</p>";
        //newItemsHTML += "<li class=\"static\"><p><span class=\"value\">0</span>"+makePieChart(0, "Start")+"</p></li>";
	}
	else { 
        document.getElementById("zero").innerHTML = "<p><span class=\"value\">0</span>0</p>";
		//newItemsHTML += "<li class=\"static\"><p><span class=\"value\">0</span>0</p></li>";
	}
		
	for (i = 0; i < amt; i++) { 
		val = fractions[i].value;
		numerator = fractions[i].numerator;
		denominator = fractions[i].denominator;
		newItemsHTML += "<li><p><span class=\"value\">"+val+"</span>";
		
		if (difficulty == "easy" || (difficulty == "medium" && Math.random() < 0.5)) {
			//newItemsHTML += "<span><img class=\"fracImg\" src=\"images/pie.svg\" alt=\""+numerator+" over "+denominator+"\"></span>";
			newItemsHTML += makePieChart(val, i);
		}
		else {
			newItemsHTML += "<span class=\"frac\"><sup>"+numerator+"</sup><span>/</span><sub>"+denominator+"</sub></span>";
		}
		newItemsHTML += "</p></li>";
	} 
	
	// 1
	if (difficulty == "easy") {
		document.getElementById("one").innerHTML = "<p><span class=\"value\">1</span>"+makePieChart(1, "End")+"</p>";
        //newItemsHTML += "<li class=\"static\"><p><span class=\"value\">1</span>"+makePieChart(1, "End")+"</p></li>";
	}
	else { 
        document.getElementById("one").innerHTML = "<p><span class=\"value\">1</span>1</p>";
		//newItemsHTML += "<li class=\"static\"><p><span class=\"value\">1</span>1</p></li>";
	}
	
	var w = (amt+2)*76;
	var x = Number($("#game").css("width").split("px")[0]);
	var z = 2;
	while (w > x) {
		w = w/z;
		//console.log(w, x);
	}
	//console.log(w, x);
	
	$("#cardList").css("width",w+"px");
	document.getElementById("cardList").innerHTML = newItemsHTML;
	
	// Show pie
	if (difficulty == "easy" || difficulty == "medium") {
		for (i = 0; i < amt; i++) {
			val = fractions[i].value;
			showPieChart("#card"+i+" .amtCircle", val);
		}
		
			showPieChart("#cardStart .amtCircle", 0);
			showPieChart("#cardEnd .amtCircle", 1);
	}
}

function randomFractions (amount) {
	var fractions = [amount];
	for (i = 0; i < amount; i++) { 
		fractions[i] = randomFraction();
	}
	return fractions;
}

function randomFraction() {
	var rand = getRandomInt(0,possible.length);
	return new Fraction(rand);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function check() {
	var correct = true;
	
	var cards = [];
	$('li .value').each(function(i, elem) {
		cards.push(Number($(elem).text()));
	});
		
	for (i = 1; i < cards.length; i++) { 
		if (cards[i-1] > cards[i]) {
			correct = false;
			console.log(i, cards[i-1], cards[i]);
		}
	} 
	
	if (correct) {
		document.getElementById("results").innerHTML = "Good Job!";
	} else {
		document.getElementById("results").innerHTML = "Incorrect";		
	}
}