import { Component } from "react";
import {withRouter} from 'react-router-dom'
import Header from "../Header";
import "./index.css";

class Home extends Component {

  onClickStartQuiz = ()=>{
    const{history} = this.props
    history.push('/quiz-game')
  }
  render() {
    return (
      <>
        <Header />
        <div className="home-container">
          <div className="home-main-container">
            <div className="home-image-container">
              <img
                className="home-image"
                src="https://assets.ccbp.in/frontend/react-js/quiz-game-start-the-quiz-img.png"
                alt="start quiz game"
              />
            </div>
            <h1 className="home-heading">
              How Many Of These Questions Do You Actually Know?
            </h1>
            <p className="home-para">
              Test yourself with these easy quiz questions and answers
            </p>
            <button className="start-quiz-btn" type="button" onClick={this.onClickStartQuiz}>
              Start Quiz
            </button>
            <div className="home-warning-container">
                <img className="i-icon" src='https://assets.ccbp.in/frontend/react-js/quiz-game-error-img.png' alt='warning icon'/>
                <p className="warning-text">All the progress will be lost, if you reload during the quiz</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Home);
