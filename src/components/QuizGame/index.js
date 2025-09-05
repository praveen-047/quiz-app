import { Component } from "react";
import {withRouter} from 'react-router-dom'
import Header from "../Header";
import Question from "../Question";
import Loader from "react-loader-spinner"; // no destructuring
import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

class QuizGame extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    quizData: [],
    currentQuestionIndex: 0,
    isAnswered: false,
    timer: 15,
    score:0,
    unattemptedQuestions: [],
  };

  timerId = null;

  componentDidMount() {
    this.getDetails();
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  startTimer = () => {
    clearInterval(this.timerId); //reset any old timer
    this.setState({ timer: 15 }); // reset to 15

    this.timerId = setInterval(() => {
      this.setState(
        (prev) => {
          if (prev.timer > 1) {
            return { timer: prev.timer - 1 };
          } else {
            clearInterval(this.timerId);
            // return only timer update here
            return { timer: 0 };
          }
        },
        () => {
          // after state updates → safe to trigger next logic
          if (this.state.timer === 0) {
            this.handleAutoNext();
          }
        }
      );
    }, 1000);
  };

  handleAutoNext = () => {
    const { currentQuestionIndex, quizData, isAnswered } = this.state;

    if (!isAnswered) {
      const currentQuestion = quizData[currentQuestionIndex];

      // ✅ Store unattempted question with details
      this.setState(prev => ({
        unattemptedQuestions: [
          ...prev.unattemptedQuestions,
          currentQuestion,
        ]
      }));
    }

    // move to next or finish
    if (currentQuestionIndex < quizData.length - 1) {
      this.setState(
        (prev) => ({
          currentQuestionIndex: prev.currentQuestionIndex + 1,
          isAnswered: false,
          timer: 15,
        }),
        this.startTimer
      );
    } else {
      // ✅ Last question and time is up → navigate to results
      const { score, unattemptedQuestions } = this.state;
      console.log(unattemptedQuestions)
      this.props.history.replace('/game-results', { score, unattemptedQuestions });
    }
  };

  handleSelectAnswer = (isCorrect) => {
    clearInterval(this.timerId); // stop timer when answered
    this.setState(prev =>({ 
      isAnswered: true ,  // ✅ enable Next button
      score: isCorrect ? prev.score +1 : prev.score,
    })); 
  };

  getDetails = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });

    const url = "https://apis.ccbp.in/assess/questions";
    const options = {
      method: "GET",
    };

    try {
      const response = await fetch(url, options);

      if (response.ok) {
        const fetchedData = await response.json();
        console.log(fetchedData);
        this.setState(
          {
            quizData: fetchedData.questions,
            apiStatus: apiStatusConstants.success,
          },
          this.startTimer //start timer when data loaded
        );
      } else {
        this.setState({ apiStatus: apiStatusConstants.failure });
      }
    } catch (error) {
      this.setState({ apiStatus: apiStatusConstants.failure });
    }
  };

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#263868" height={50} width={50} />
    </div>
  );

  handleNextQuestion = () => {
    const { currentQuestionIndex, quizData, unattemptedQuestions } = this.state;
    const { history } = this.props


    if (currentQuestionIndex < quizData.length - 1) {
      this.setState(
        (prev) => ({
          currentQuestionIndex: prev.currentQuestionIndex + 1,
          isAnswered: false,
          timer: 15,
        }),
        this.startTimer
      );
    } else {
      // ✅ last question → end quiz
      const { score } = this.state
      history.replace('/game-results',{score,unattemptedQuestions })
    }
  };

  renderSuccessView = () => {
    const { quizData, currentQuestionIndex, isAnswered, timer } = this.state;
    const currentQuestion = quizData[currentQuestionIndex];
    const totalQuestions = quizData.length;
    const btnClass = isAnswered ? "answered" : "not-answered";
    const btnText =
      currentQuestionIndex < quizData.length - 1 ? "Next Question" : "Submit";

    return (
      <div className="question-option-container">
        <div>
          <div className="question-number-timer-container">
            <div className="question-number-container">
              <p className="p1">Question</p>
              <p className="p2">
                {currentQuestionIndex + 1}/{totalQuestions}
              </p>
            </div>
            <div className="timer-display">{timer}</div>
          </div>
          <Question
            key={currentQuestion.id}
            details={currentQuestion}
            onSelectAnswer={this.handleSelectAnswer}
          />
        </div>
        {currentQuestionIndex < quizData.length && (
          <button
            type="button"
            onClick={this.handleNextQuestion}
            className={`next-question-btn ${btnClass}`}
            disabled={!isAnswered}
          >
            {btnText}
          </button>
        )}
      </div>
    );
  };

  renderFailureView = () => (
    <div className="failure-view">
      <img
        className="failure-view-image"
        src="https://assets.ccbp.in/frontend/react-js/nxt-assess-failure-img.png"
        alt="failure view"
      />
      <p className="failure-view-para-1">Something went wrong</p>
      <p className="failure-view-para-2">
        Our server are busy please try again{" "}
      </p>
      <button className="retry-btn" type="button" onClick={this.getDetails}>
        Retry
      </button>
    </div>
  );

  renderQuizView = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader();
      case apiStatusConstants.success:
        return this.renderSuccessView();
      case apiStatusConstants.failure:
        return this.renderFailureView();
      default:
        return null;
    }
  };

  render() {
    return (
      <>
        <Header />
        <div className="quiz-container">
          <div className="quiz-card-container">{this.renderQuizView()}</div>
        </div>
      </>
    );
  }
}

export default withRouter(QuizGame);
