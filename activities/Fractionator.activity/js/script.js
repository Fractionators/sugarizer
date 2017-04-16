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
	
	document.getElementById("cardList").innerHTML = "<li>1</li><li>2</li><li>3</li>";
		
	if (amount != "small") {
		var newItemsHTML = "";
		if (amount == "med") {
			for (i = 0; i < 3; i++) { 
				newItemsHTML += "<li>"+(i+4)+"</li>";
			}
		}
		else if (amount == "large") {
			for (i = 0; i < 9; i++) { 
				newItemsHTML += "<li>"+(i+4)+"</li>";
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