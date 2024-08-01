"use strict";
/*
Title: Blackjack ICS3U Project
By:Howard,Sajeiv,Kowan
Date Started:2018/10/29
Des:This is the code for the black jack 
*/
//global variables
let playerCardProp = {
	worth:null,
	path:null, 
	total:null, 
	cardNumber:0,
};

let playerProp = {
	playerName:"",
	playerChara: "",
	money:100,
	pot:0,
	state:"place",
	addSubt:0,
	instruction:0
}

let dealerCardProp = {
	worth:null, 
	path:null, 
	total:null, 
	cardNumber:0
};

//music variables
let music = [
	"Kakegurui",
	"SwordArtOnline",
	"WakuseiRabbit",
	"PacketHero",
	"REANIMATE",
	"Noragami",
	"Noragami2",
	"CaravanPalace",
	]

let chosenMusic = "";
let selectedTrackNumber = 7;

//ach variables
//it was not untill after the group realized that  "imges/ach/" was repeated so many times that it could have been added into the function... 
//arrays start from 0
let ach = {
	//click on title ach
	countFirstClick:0,
	desFirstClick: ["Clicked on the Balackjack banner on the homepage once","Clicked on the Balackjack banner on the homepage twice","Clicked on the Balackjack banner on the homepage three times"],
	pathFirstClick:["images/ach/thirdClick.jpg","images/ach/secondClick.jpg","images/ach/firstClick.jpg"],
	firstClick: ["A bit Cuirous","Slightly More Curious","Overwhelming Curiosity"],
	//tutorial ach
	tutorial: ["Don't Tell Me What To Do","I Kinda Get It","Knowledge Is Power"],
	//bust ach
	countBust: 0,
	desBust: ["Hit and busted once with at least $10 placed","Hit and busted twice with at least $10 placed","Hit and busted three times with at least $10 placed"],
	pathBust:["images/ach/thirdBust.jpg","images/ach/secondBust.jpg","images/ach/firstBust.jpg"],
	achBust:["Risk It For The Biscuit","I Need That Biscuit","It's only time until..."],
	//winning ach
	countWin: 0,
	desWin: ["Win against the dealer once","Win against the dealer twice","Win against the dealer three times"],
	pathWin: ["images/ach/thirdWin.jpg","images/ach/secondWin.jpg","images/ach/firstWin.jpg"],
	achWin: ["Beginners Luck","Double Trouble","Unstopabale force"],
	//lose ach
	countLose: 0,
	desLose: ["Lose to the dealer without going over 21 once","Lose to the dealer without going over 21 twice","Lose to the dealer without going over 21 three times"],
	pathLose: ["images/ach/thirdLose.jpg","images/ach/secondLose.jpg","images/ach/firstLose.jpg"],
	achLose: ["To Know Defeat...","Gamble Responsibly","The Greatest Loser"],
	//others[achieved,title,path]
	achAllIn: [false, "If You Got Guts...","images/ach/allIn.jpg"],
	achThisClose: [false, "I'm THIS Close...","images/ach/thisClose.jpg"],
	achItSeems: [false, "It Seems That I Am Broke...","images/ach/itSeems.jpg"],
	//non-specific ach variable
	number:0,
}

$(document).ready(function($) {
	//Immideately update chosenMusic varaible
	chosenMusic = music[selectedTrackNumber];

	//START OF CHARACTER CREATON PAGE
	$(".characters").click(function(event){
		//get the id of the clicked character and update name
		playerProp.playerChara = $(this).attr("id");	
		playerProp.playerName = $("#playerName").val();

		//start playing music
		$("#btnPlay").css("background-color", "red");
		document.getElementById(chosenMusic).play();
		updatePlayingSong();

		//fade in and out of states
		$("#startingPageState").fadeOut();
		$("#madeByState").fadeIn(1000).delay(5500).fadeOut(2000);
		$("#gamePageState").delay(5500).fadeIn(2000);
		$(".songControls").hide();

		//Start of click function
		if(playerProp.playerName==""){
			//If the player enters no name, there won't be a space between the name and exclamation mark
			$("#textArea").html("Hey there!\nClick the 'next' button to learn about the rules of Blackjack and how the game works!");
			playerProp.playerName = "DefaultMcDefaultFace";
		}
		else{
			$("#textArea").html("Hey there " + playerProp.playerName +"!\nClick the 'next' button to learn about the rules of Blackjack and how this game works!");
		}

		//update profile
		$("#playerNameShow").html(playerProp.playerName);
		$("#chosenCharacter").append('<img src="'+playerProp.playerChara+'" id="playerProfilePic">')
	});

	$("#startTitle").click(function(event) {
		//test achievement code
		if(ach.countFirstClick <= 2){
			checkAch(ach.firstClick[ach.countFirstClick],ach.pathFirstClick[ach.countFirstClick],"achCurious",ach.desFirstClick[ach.countFirstClick]);
			ach.countFirstClick++;
		}
	});
	//END OF CHARACTER CREATION PAGE

	//START OF MUSIC CONTROLS

	//plays music
	$("#btnPlay").click(function(event){
		//changes pause and play button
		$("#btnPlay").css("background-color", "red");
		$("#btnPause").css("background-color", "orange");
		//plays music
		document.getElementById(chosenMusic).play();
		updatePlayingSong();
	});

	//pauses currently playing music
	$("#btnPause").click(function(event){
		//changes pause and play button
		$("#btnPause").css("background-color", "Red");
		$("#btnPlay").css("background-color", "orange");
		//pauses music
		document.getElementById(chosenMusic).pause();
		updatePlayingSong();
	});

	$("#btnNextSong").click(function(event){
		//pauses currently playing song
		document.getElementById(chosenMusic).pause();
		//selectedTrackNumber++ must go first before if statement or it breaks for some reason
		selectedTrackNumber++;

		//loops back to the begining of the playlist
		if(selectedTrackNumber == music.length){
			selectedTrackNumber = 0;
		}

		//plays updated song
		chosenMusic = music[selectedTrackNumber];
		document.getElementById(chosenMusic).play();
		updatePlayingSong();
		//changes pause and play button
		$("#btnPause").css("background-color", "orange");
		$("#btnPlay").css("background-color", "red");
	});

	$("#btnPrevious").click(function(event){
		//pauses currently playing song
		document.getElementById(chosenMusic).pause();

		//loops back to the end of the playlist
		if(selectedTrackNumber == 0){
			selectedTrackNumber = music.length;
		}

		//selectedTrackNumber-- must go after if statement or it breaks for some other reason
		selectedTrackNumber--;
		//plays updated song
		chosenMusic = music[selectedTrackNumber];
		document.getElementById(chosenMusic).play();
		updatePlayingSong();
		//changes pause and play button
		$("#btnPause").css("background-color", "orange");
		$("#btnPlay").css("background-color", "red");
	});
	//END OF MUSIC CONTROLS

	//START OF PLAYER ACTIONS

	//place first bet
	$("#btnPlaceBet").click(function(event){
		if(playerProp.state == "place"){
			//amount of money bet assigned to variable
			playerProp.addSubt = $("#txtPlaceBet").val();
			//ach tutoral check
			if(playerProp.instruction < 4){
				checkAch(ach.tutorial[0],"images/ach/noKnowledge.jpg","achTutorial","Skipped the instructions");
			}

			else if(playerProp.instruction < 9){
				checkAch(ach.tutorial[1],"images/ach/halfKnowledge.jpg","achTutorial","Read half the instructions");
			}

			else if(playerProp.instruction < 99){
				checkAch(ach.tutorial[2],"images/ach/fullKnowledge.jpg","achTutorial","Read all the instructions");
			}

			//sets player instruction to 99 so no more instructions will show up
			playerProp.instruction = 99;

			//check for negative bets
			if(playerProp.addSubt < 0){
				animationFadeIn();
				$("#textArea").html("No negative bets please. I don't even know how that would work...");
			}

			//valid bet
			 else if(playerProp.addSubt <= playerProp.money){
			 	//check for ach allIn
			 	if(playerProp.addSubt == playerProp.money && !ach.achAllIn[0]){
			 		checkAch(ach.achAllIn[1],ach.achAllIn[2],"achOthers","Placed a bet equal to all owned money");
			 		ach.achAllIn[0] = true;
			 	}

			 	//check for ach ThisClose
			 	if((playerProp.money - playerProp.addSubt) == 1 && !ach.achThisClose[0]){
			 		checkAch(ach.achThisClose[1],ach.achThisClose[2],"achOthers","Leave $1 to play again next game");
			 		ach.achThisClose[0] = true;
			 	}

			 	//check for ach itSeems
			 	if(playerProp.addSubt == 0 && !ach.achItSeems[0]){
			 		checkAch(ach.achItSeems[1],ach.achItSeems[2],"achOthers","Placed $0 in the pot");
			 		ach.achItSeems[0] = true;
			 	}
			 	//where ever you see these two lines, it just updates what the dealer is saying with an animation
				animationFadeIn();
				$("#textArea").html("Time to deal the cards!");
				//change player state
				playerProp.state = "hitHold";

				//fade out
				$("#cntPlaceBets").fadeOut('slow/400/fast');
				playerProp.addSubt = $("#txtPlaceBet").val();
				playerProp.pot =+ playerProp.addSubt;
				playerProp.money -= playerProp.addSubt;

				//display pot and update money
				$("#cntPot").html("$"+playerProp.pot);
				$("#cntPlayerMoney").html("$"+playerProp.money);

				//generate dealer cards
				for(let x = 0;x < 2;x++){
					drawDealerCard();
					//puts cover over the first dealer card
					if(x == 0){
						$("#cntDealerCards").append('<img src="cards/card55.JPG" id="dealerCardCover" class="overlap">');
					}
				}

				//generate player cards
				for(let y = 0; y<2;y++){
					drawPlayerCard();
				}
			}

			//bet is greater than player money
			else{
				animationFadeIn();
				$("#textArea").html("That bet is an invalid entry. It is either a value greater than your balance or it isn't a number. Please try again.");
			}
		}
	});//end of place bet 

	//player hit
	$("#btnHit").click(function(event){
		if(playerProp.state == "hitHold"){
			//simple draw card from function
			drawPlayerCard();

			//check if bust
			if(playerCardProp.total > 21){
				playerProp.state = "nextRound";
				//hide all other elements in action box after bust
				$("#cntHitHold").fadeOut('slow/400/fast');
				$("#cntRaiseBet").fadeOut('slow/400/fast');
				$("#cntShowCards").fadeOut('slow/400/fast');
				//winner icon
				$("#cntDealerCards").append('<img src="images/winner.png" class="overlap">');

				animationFadeIn();
				$("#textArea").html("Looks like you busted and I win! Try to be a bit more careful next time!");

				//bust ach
				if(ach.countBust <= 2 && playerProp.addSubt >= 10){
					checkAch(ach.achBust[ach.countBust],ach.pathBust[ach.countBust],"achBust",ach.desBust[ach.countBust]);
					ach.countBust++;
				}
			}
		}

		//tell player they cannot hit at current time
		else{
			animationFadeIn();
			$("#textArea").html("You cannot hit at the current time.");
		}
	});//end of click hit event

	//player hold
	$("#btnHold").click(function(event) {
		if(playerProp.state == "hitHold"){
			//change player state to raise
			playerProp.state = "raise";

			//fade out
			$("#cntHitHold").fadeOut('slow/400/fast');

			//dealer draw or not draw
			while(dealerCardProp.total <=16){
				animationFadeIn();
				$("#textArea").html("I am going to decide to draw more cards.");

				drawDealerCard();
			}
		}		

		//tell player they cannot hold at current time
		else{
			animationFadeIn();
			$("#textArea").html("You cannot hold at the current time.");
		}
	});//end of player hold

	//player raise bet
	$("#btnRaiseBet").click(function(event) {
		if(playerProp.state == "raise"){
			//assign raise bet to variable
			playerProp.addSubt =+ $("#txtRaiseBet").val();

			//check that bet is lower than addSubt
			if(playerProp.addSubt < 0){
				$("#textArea").html("No negative raises please. I don't even know how that will work...");
				animationFadeIn();
			}

			else if(playerProp.addSubt > playerProp.pot){
				$("#textArea").html("Your bet cannot be higher than your placed bet!");
				animationFadeIn();
			}

			else if(playerProp.addSubt<=playerProp.money){
				//change playerstate to showCards
				playerProp.state = "showCards";

				//fade out
				$("#cntRaiseBet").fadeOut('slow/400/fast');

				//update player money and pot
				playerProp.pot += Number(playerProp.addSubt);
				playerProp.money -= playerProp.addSubt;

				$("#cntPot").html("$"+playerProp.pot);
				$("#cntPlayerMoney").html("$"+playerProp.money);

				animationFadeIn();
				$("#textArea").html("Ok then. Time to show our cards!");	
			}

			else{
				animationFadeIn();
				$("#textArea").html("That raise is more than what you have. Try something lower.");
			
			}
		}

		//tell player they cannot raise at currnet time
		else{
			animationFadeIn();
			$("#textArea").html("You cannot raise your bet at the current time.");
		}
	});//end of player raise

	//show cards
	$("#btnShowCards").click(function(event) {
		if(playerProp.state == "showCards"){
			//change player state to deal
			playerProp.state = "nextRound";

			//fade out
			$("#cntShowCards").fadeOut('slow/400/fast');

			//show cards
			$("#dealerCardCover").fadeOut('slow/400/fast');

			//check who wins

			//dealer bust
			if(dealerCardProp.total > 21){
				playerProp.money += (playerProp.pot*2); 
				$("#cntPlayerMoney").html("$"+playerProp.money);
				$("#cntPlayerCards").append('<img src="images/winner.png" class="overlap">');
				animationFadeIn();
				$("#textArea").html("Whoops! Looks like its your win. I went over 21.");

				//player in ach
				if(ach.countWin <= 2){
					checkAch(ach.achWin[ach.countWin],ach.pathWin[ach.countWin],"achWin",ach.desWin[ach.countWin]);
					ach.countWin++;
				}
			}

			//player wins with higher total
			else if(playerCardProp.total > dealerCardProp.total){
				playerProp.money += (playerProp.pot*2); 
				$("#cntPlayerMoney").html("$"+playerProp.money);
				$("#cntPlayerCards").append('<img src="images/winner.png" class="overlap">');
				animationFadeIn();
				$("#textArea").html("Nice, you won with a higher total.");

				//player ach win
				if(ach.countWin <= 2){
					checkAch(ach.achWin[ach.countWin],ach.pathWin[ach.countWin],"achWin",ach.desWin[ach.countWin]);
					ach.countWin++;
				}
			}

			//player loses with lower total
			else if(playerCardProp.total < dealerCardProp.total){
				$("#cntPlayerMoney").html("$"+playerProp.money);
				$("#cntDealerCards").append('<img src="images/winner.png" class="overlap">');
				animationFadeIn();
				$("#textArea").html("Hahaha, you lost to me!");

				//player ach lose
				if(ach.countLose <= 2){
					checkAch(ach.achLose[ach.countLose],ach.pathLose[ach.countLose],"achLose",ach.desLose[ach.countLose]);
					ach.countLose++;
				}
			}
			//Tie
			else if(playerCardProp.total == dealerCardProp.total){
				playerProp.money += playerProp.pot;
				$("#cntPlayerMoney").html("$"+playerProp.money);
				animationFadeIn();
				$("#textArea").html("Seems that it ends in a tie.");
			}
		}

		//tell player they cannot show cards at currnet time
		else{
			animationFadeIn();
			$("#textArea").html("You cannot show cards at the current time.");
		}
	});//end of show cards

	//next round
	$("#btnNextRound").click(function(event) {
		//check if player has 0 money
		if(playerProp.money == 0 && playerProp.state == "nextRound"){
			$("#gamePageState").fadeOut('slow/400/fast');
			$("#endPageState").fadeIn('slow/400/fast');
		}

		else if(playerProp.state == "nextRound"){
			$("#cntDealerCards").empty();
			$("#cntPlayerCards").empty();
			//next round
			animationFadeIn();
			$("#textArea").html("Onto the next round then!");

			//reset variables
			playerCardProp.cardNumber = 0;
			dealerCardProp.cardNumber = 0;
			playerProp.state = "place";
			playerProp.pot = 0;
			playerCardProp.total = 0;
			dealerCardProp.total = 0;
			$("#cntPot").html("$"+playerProp.pot);

			//fade in all covers
			$("#cntPlaceBets").fadeIn('slow/400/fast');
			$("#cntHitHold").fadeIn('slow/400/fast');
			$("#cntRaiseBet").fadeIn('slow/400/fast');
			$("#cntShowCards").fadeIn('slow/400/fast');
		}

		//tell player they show cards at current time
		else{
			animationFadeIn();
			$("#textArea").html("This round is not even over yet.");
		}
	});
	//END OF PLAYER ACTIONS

	//updates Yumeko text area for instructions	
	$("#btnNext").click(function(event) {
		explainRules(playerProp.instruction);
		playerProp.instruction++;
		animationFadeIn();
	});

	//START OF ACHIEVEMENTS BUTTONS
	$("#achPermaShow").click(function(event) {
		$("#achPermaBox").fadeIn();
	});

	$("#achPermaClose").click(function(event) {
		$("#achPermaBox").fadeOut();
	});
	//END OF ACHIEVEMENTS BUTTONS

	//hides all pages but the player profile creation page
	$("#gamePageState").hide();
	$("#endPageState").hide();
	$("#achPermaBox").hide();
});//end of .ready function


/*The following functions were created since drawing cards is repeated alot. 
Making functions makes it easier to read code and lower the total lines of 
code in the ......... well code.*/

function checkCardValue(checkedValue){//calculates realk card value
	checkedValue = checkedValue%13;

	if(checkedValue == 0 || checkedValue>=10){
		return 10;
	}

	else{
		return checkedValue;
	}
}//end of checkCardValue function


function updateTotal(worth,total){//updates .worth
	worth = checkCardValue(worth);
	total += worth;
	return total;
}//end of update total function

function drawPlayerCard(){//player draw card function
	playerCardProp.worth = Math.round(1+Math.random()*51);

	//do the path making thingy using varibale dealerCardProp.worth
	playerCardProp.path = "cards/card"+playerCardProp.worth+".JPG";

	//create the card image
	$("#cntPlayerCards").append('<img src="'+playerCardProp.path+'" id="y'+playerCardProp.cardNumber+'" class="overlap">');
	$("#y"+playerCardProp.cardNumber).css('margin-left',(playerCardProp.cardNumber*30)+'px');
	//calculate value of cards and updates values
	playerCardProp.total = updateTotal(playerCardProp.worth,playerCardProp.total);

	//update card number and return value
	playerCardProp.cardNumber++;
	return playerCardProp.cardNumber;
}//end of player draw card function

function drawDealerCard(){//dealer draw card function
	dealerCardProp.worth = Math.round(1+Math.random()*51);

	//create dealer card path
	dealerCardProp.path = "cards/card"+dealerCardProp.worth+".JPG";

	//do the thing that creates the cards
	$("#cntDealerCards").append('<img src="'+dealerCardProp.path+'" id="x'+dealerCardProp.cardNumber+'" class="overlap">');
	$("#x"+dealerCardProp.cardNumber).css({'margin-left':(dealerCardProp.cardNumber*30)+'px'});
	$("#x"+dealerCardProp.cardNumber).fadeIn('slow/400/fast');

	//calculate the value of dealer cards and update values
	dealerCardProp.total = updateTotal(dealerCardProp.worth,dealerCardProp.total)

	//update card number and return value
	dealerCardProp.cardNumber++;
	return dealerCardProp.cardNumber;
}//end of dealer card draw function

function explainRules(instruction){//explain rule function
	if(instruction == 0){
		$("#textArea").html("The rules of Blackjack are simple. The player with the closer total card value of '21' wins");
	}

	else if(instruction == 1){
		$("#textArea").html("You start off with 2 cards. If you go over 21, you automatically lose. You'll be facing me in this game!");
	}

	else if(instruction == 2){
		$("#textArea").html("You have $100 to bet. If you beat me, it doubles. If you lose, you lose all of it. I'll be looking forward to getting your money!");
	}

	else if(instruction == 3){
		$("#textArea").html("First, you need to place a starting bet. This is done in the first box on the left. (Both players don't know their cards)");
	}

	else if(instruction == 4){
		$("#textArea").html("Second, you choose to either hit or hold. If you hit, you get another card. If you hold, you stick with your current hand.");
	}

	else if(instruction == 5){
		$("#textArea").html("You can keep on hitting until you either go over 21 or decide to hold. You can even hold immediately without hitting.");
	}

	else if(instruction == 6){
		$("#textArea").html("Third, you can choose to raise your current bet. This is done after, which means you know your final hand.");
	}

	else if(instruction == 7){
		$("#textArea").html("Finally, you can see my final card with the 'show card' button. This is the moment of truth. This will determine if you won the bet or not. ");
	}

	else if(instruction == 8){
		$("#textArea").html("The round will be over. Now you continue by clicking the 'Next Round' button. You keep on playing until you lose all of your money.");
	}

	else if(instruction == 9){
		$("#textArea").html("If you need any more help, just look back to this box. It will provide game information such as round results and restrictions! That is all! Now best of luck!");
	}

	else{
		$("#textArea").html("...");
	}
}//end of explain rule function

function animationFadeIn(){//Yumeko fade in animation
	$("#cntYumekoJabami").fadeOut(300);
	$("#cntYumekoJabami").fadeIn(300);
}//end of Yumeko fade in animation

//This could have easily not been a function but it just as easily can be a function.
function updatePlayingSong(){//this function updates the "Playing:" text in the music box
	$("#currentlyPlaying").html("Playing:#"+selectedTrackNumber+" "+chosenMusic)
}//end of updatePlayingSong function

function checkAch(displayedAch,pathAch,typeAch,fadeAch){//update achievemnet function
	//create the achievement box
	$("#achNotifiction").prepend('<div class="achBox" id="ach'+ach.number+'"><img src="'+pathAch+'" class="achImg"><div class="achText">Achievement get:<br>'+displayedAch+'<br></div></div>');
	$("#ach"+ach.number).fadeIn().delay(2500).fadeOut();
	//stuff inside of achievement box
	$("#"+typeAch).append('<div class="achBox" id="ach'+ach.number+'"><img src="'+pathAch+'" class="achImg"><div class="achText">Achievement get:<br>'+displayedAch+'<br></div></div>');
	//hover thing?
	$("#ach"+ach.number+",achNotifiction").append('<div class="achDes">'+fadeAch+'</div>');
	ach.number++;
	return ach.number;
}//end of checkAch function