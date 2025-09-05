// src/components/GameResults/index.js
import { Component } from "react"
import { withRouter } from "react-router-dom"
import Header from "../Header"
import "./index.css"

class GameResults extends Component {

  onClickReport = ()=>{
    const{history, location} = this.props
    const {score=0,unattemptedQuestions=[]} = location.state || {}
    console.log(unattemptedQuestions)
    history.push('/game-report',{score, unattemptedQuestions})
  }

  renderSuccess = (score) => (
    <div className="success-container">
      <div className="trophy-image-container">
        <img
          className="trophy-image"
          src="https://assets.ccbp.in/frontend/react-js/quiz-game-congrats-trophy-img.png"
          alt="congrats"
        />
      </div>
      <div>
        <h1 className="result-heading">Congrats!</h1>
        <p className="result-percentage">{score}0% Correctly Answered</p>
        <p className="successfull-message">Quiz completed successfully.</p>
        <p className="attempted-text">You attempted {score} out of 10 questions as correct.</p>
      </div>
      <button className="report-btn" type='button' onClick={this.onClickReport}>Report</button>
    </div>
  )

  renderFailure = (score) => (
    <div className="failure-container">
      <div className="failure-image-container">
        <img
          className="failure-image"
          src="https://assets.ccbp.in/frontend/react-js/quiz-game-lose-img.png"
          alt="lose"
        />
      </div>
      <div>
        <h1 className="result-heading">You lose!</h1>
        <h1 className="percent-heading">{score}0% Correctly Answered</h1>
        <p className="result-text">You attempted {score} out of 10 questions as correct.</p>
      </div>
      <button className="report-btn" type='button' onClick={this.onClickReport}>Report</button>
    </div>
  )

  render() {
    const { location } = this.props
    const { score} = location.state || { score: 0}// fallback if no score
    
    const isWin = score >= 5

    return (
      <>
        <Header />
        <div className="game-results-container">
          <div className="game-results-card">
            {isWin ? this.renderSuccess(score) : this.renderFailure(score)}
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(GameResults)
