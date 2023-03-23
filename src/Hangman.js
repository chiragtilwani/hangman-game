import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import rand from "./words"

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: rand.length,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: rand };
    this.handleGuess = this.handleGuess.bind(this);
    this.handleRestart=this.handleRestart.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  // Restart button handler
  handleRestart(evt) {
    window.location.reload();
  }

  /** render: render game */
  render() {
    let img;
    let hiddenattr1;
    let hiddenattr2;
    let alt="stage - "+this.state.nWrong
    if(this.state.nWrong<=this.props.maxWrong){
      hiddenattr1=""
      hiddenattr2="hidden"
      img=<img src={this.props.images[this.state.nWrong]} alt={alt}/>
    }else{
      hiddenattr1="hidden"
      hiddenattr2=""
      img=null
    }
    return (
      <div className='Hangman'>
        <h1 className="Hangman-h1">Hangman</h1>
        <div className='Hangman-sections'>
          <div className='Hangman-sec1' hidden={hiddenattr1}>
            {img}
          </div>
          <div className="Hangman-sec2">
            <h2 className="Hangman-h2">Number of wrong guesses : {this.state.nWrong}</h2>
            <p className='Hangman-word' hidden={hiddenattr1}>{this.guessedWord()}</p>;
            <p className='Hangman-btns' >{(this.state.nWrong<=this.props.maxWrong && this.guessedWord().join("")!==this.state.answer)?this.generateButtons():""}</p>; 
            <p className="Hangman-spanPara">{this.guessedWord().join("")===this.state.answer?<span className='Hangman-winText'>You win !</span>:''}</p>  
            <p className="Hangman-LostText" hidden={hiddenattr2}>Game Over ! Correct word answer is "<span className='Hangman-span'>{this.state.answer}</span>"</p>
            <button className="Hangman-restart" onClick={this.handleRestart}>Restart Game</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Hangman;
