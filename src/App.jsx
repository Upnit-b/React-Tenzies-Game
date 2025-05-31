import Die from './components/Die';
import {useState} from 'react';
import {nanoid} from 'nanoid';
import Confetti from 'react-confetti';

export default function App() {

  //setting the state of 10 dice objects using generateAllnewDice function
  const [dice,setDice] = useState(() => generateAllNewDice());

  //checking if the game is won
  const gameWon = dice.every(die => die.isHeld) &&
    dice.every(die => die.value === dice[0].value);


  //Generating random new dice objects
  function generateAllNewDice() {
    const newDice = [];

    for(let i = 0;i < 10;i++) {
      const rand = Math.ceil(Math.random() * 6);

      newDice.push({
        value: rand,
        isHeld: false,
        id: nanoid()
      });
    }
    return newDice;
  }

  //Mapping over the dice array to return a Die Component
  const diceElements = dice.map((diceObj) => {
    return (
      <Die
        key={diceObj.id}
        value={diceObj.value}
        isHeld={diceObj.isHeld}
        hold={() => {hold(diceObj.id);}}
      />
    );
  });


  //Setting new dice arrays by rolling the dice using setDice from useState
  function rollDice() {
    if(gameWon) {
      setDice(generateAllNewDice);
    } else {
      setDice((oldDice) => {
        return oldDice.map((die) => {
          if(die.isHeld) {
            return die;
          } else {
            return ({...die,value: Math.ceil(Math.random() * 6)});
          }
        });
      });
    }


  }

  // //getting the id to implement holding the number that user wants to hold. oldDice is an array so we can map over it
  function hold(id) {
    setDice((oldDice) => {
      return oldDice.map((die) => {
        if(die.id === id) {
          return ({
            ...die,
            isHeld: !die.isHeld
          });
        } else {
          return die;
        }
      });
    });
  }


  return (
    <main>
      {gameWon && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>

      <button className="roll-dice" onClick={rollDice}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}