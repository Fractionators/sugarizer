var adjustment;

$(document).ready(function() { 
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
	
	$("ol.simple_with_animation").sortable({	
	  group: 'simple_with_animation',
	  pullPlaceholder: false,
	  // animation on drop
	  onDrop: function  ($item, container, _super) {
		var $clonedItem = $('<li/>').css({height: 0});
		$item.before($clonedItem);
		$clonedItem.animate({'height': $item.height()});

		$item.animate($clonedItem.position(), function  () {
		  $clonedItem.detach();
		  _super($item, container);
		});
	  },

	  // set $item relative to cursor position
	  onDragStart: function ($item, container, _super) {
		var offset = $item.offset(),
			pointer = container.rootGroup.pointer;

		adjustment = {
		  left: pointer.left - offset.left,
		  top: pointer.top - offset.top
		};

		_super($item, container);
	  },
	  onDrag: function ($item, position) {
		$item.css({
		  left: position.left - adjustment.left,
		  top: position.top - adjustment.top
		});
	  }
	});
});

function setUpGame() {
    var difficulty = $('input[name=difficulty]:checked').val();
    var amount = $('input[name=amount]:checked').val();
	
	document.getElementById("cardList").innerHTML = "<li>1</li><li>2</li><li>3</li><li>4</li><li>5</li>";
		
	if (amount != "5") {
		var newItemsHTML = "";
		if (amount == "7") {
			for (i = 0; i < 2; i++) { 
				newItemsHTML += "<li>"+(i+6)+"</li>";
			}
		}
		else if (amount == "12") {
			for (i = 0; i < 7; i++) { 
				newItemsHTML += "<li>"+(i+6)+"</li>";
			} 
		}
		document.getElementById("cardList").innerHTML += newItemsHTML;
	}
}

function check() {
	var correct = true;
	
	var cards = [];
	$('li').each(function(i, elem) {
		cards.push($(elem).text());
	});
	//console.log(cards);
		
	for (i = 1; i < cards.length; i++) { 
		if (cards[i-1] > cards[i]) {
			correct = false;
		}
	} 
	
	if (correct) {
		document.getElementById("results").innerHTML = "Good Job!";
	} else {
		document.getElementById("results").innerHTML = "Try Again";		
	}
}