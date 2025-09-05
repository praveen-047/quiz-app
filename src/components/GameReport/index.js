import { Component } from "react";
import Header from "../Header";
import Question from '../Question';
import "./index.css";

class GameReport extends Component {

    renderQuestions = (unattemptedQuestions)=>{
        return (
            <>
                <h1 className="unattempted">Unattempted Questions</h1>
                {unattemptedQuestions.map(each=> (<Question key={each.id} details={each}/>))}
            </>
        )
    }

    renderText = ()=>(
        <div className="attempted-container">
            <h1 className="attempted">Attempted all questions</h1>
        </div>
    )
  render() {
    const { location } = this.props;
    const { score, unattemptedQuestions } = location.state || {
      score: 0,
      unattemptedQuestions: [],
    };
    const totalAttempted = 10 - unattemptedQuestions.length
    const incorrect = totalAttempted - score


    return (
      <>
        <Header />
        <div className="game-report-container">
          <div className="game-report-card">
            <div className="game-report-card-summary">
              <div className="x-ten-container">
                <span>{totalAttempted}</span>/10
              </div>
              <div>
                <div className="correct-incorrect-unattempted">
                    <img className="game-report-icons" src='https://assets.ccbp.in/frontend/react-js/quiz-game-right-check-img.png' alt='correct answer icon'/>
                    <p>{score} Correct answers</p>
                </div>
                <div className="correct-incorrect-unattempted">
                    <img className="game-report-icons" src='https://assets.ccbp.in/frontend/react-js/quiz-game-wrong-check-img.png' alt='incorrect answer icon'/>
                    <p>{incorrect} Incorrect answers</p>
                </div>
                <div className="correct-incorrect-unattempted">
                    <img className="game-report-icons" src='https://assets.ccbp.in/frontend/react-js/quiz-game-un-answered-img.png' alt='unattempted icon'/>
                    <p>{unattemptedQuestions.length} Unattempted</p>
                </div>
              </div>
            </div>
            <div className="game-report-questions">
                {unattemptedQuestions.length > 0 ? this.renderQuestions(unattemptedQuestions) : this.renderText()}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default GameReport;
