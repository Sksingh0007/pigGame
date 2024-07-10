'use strict';

//Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores = [0,0];

let playing = true;
let currentScore = 0;
let activePlayer = 0;

const init = function(){
    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;

    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}


//Rolling dice functionality
btnRoll.addEventListener('click', function(){
   if(playing){
    //1.Generate random numbers
        const dice = Math.trunc(Math.random()*6) + 1;
        // console.log(dice);
    //2. Display the dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

    //3.If 1..switch to next player
    if(dice !== 1){
        //Add to the current score
        currentScore += dice;
        // current0El.textContent = currentScore; //Change Later
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    }
    else{
        //Switch to next player
        switchPlayer();
      
    }
   }
});

//Hold functionality
btnHold.addEventListener('click', function(){
    if(playing){
    //1. Add current core to active player's score
        scores[activePlayer] += currentScore;
        // console.log(scores[activePlayer]);
        //score[1] = score[1] + currentScore
        
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    //2. Check if <=100 (win / loose) //finsih the game
        if(scores[activePlayer] >= 20){
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }
        else{
            switchPlayer();
        }
    //3. Switch the player
    // switchPlayer();
    }
});

btnNew.addEventListener('click', init);