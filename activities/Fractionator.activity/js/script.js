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

$(document).ready(function() { 
	makeFractions();

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
    $("#cardList").disableSelection();
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
	newItemsHTML += "<li class=\"static\"><p><span class=\"value\">0</span>0</p></li>";
		
	for (i = 0; i < amt; i++) { 
		val = fractions[i].value;
		numerator = fractions[i].numerator;
		denominator = fractions[i].denominator;
		newItemsHTML += "<li><p><span class=\"value\">"+val+"</span>";
		
		if (difficulty == "easy" || (difficulty == "medium" && Math.random() < 0.5)) {
			newItemsHTML += "<span><img class=\"fracImg\" src=\"images/pie.svg\" alt=\""+numerator+" over "+denominator+"\"></span>";
		}
		else {
			newItemsHTML += "<span class=\"frac\"><sup>"+numerator+"</sup><span>/</span><sub>"+denominator+"</sub></span>";
		}
		newItemsHTML += "</p></li>";
	} 
	
	// 1
	newItemsHTML += "<li class=\"static\"><p><span class=\"value\">0</span>1</p></li>";
	
	var w = (amt+2)*76;
	var x = Number($("#game").css("width").split("px")[0]);
	var z = 2;
	while (w > x) {
		w = w/z;
		console.log(w, x);
	}
	console.log(w, x);
	
	$("#cardList").css("width",w+"px");
	document.getElementById("cardList").innerHTML = newItemsHTML;
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
		}
	} 
	
	if (correct) {
		document.getElementById("results").innerHTML = "Good Job!";
	} else {
		document.getElementById("results").innerHTML = "Incorrect";		
	}
}