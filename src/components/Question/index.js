import { Component } from "react";
import "./index.css";

class Question extends Component {
  state = {
    selectedId: null,
    isAnswered: false,
  };

  onClickOption = (id,correctOptionId) => {
    const { onSelectAnswer } = this.props;
    const { isAnswered } = this.state;

    if (isAnswered) return;

    this.setState({ selectedId: id, isAnswered: true });
    if (onSelectAnswer) {
  onSelectAnswer(id === correctOptionId);
}

  };

  getOptionStyle = (
    option,
    selectedId,
    correctOptionId,
    isAnswered,
    baseClass = "button"
  ) => {
    let optionClass = baseClass;
    let showIcon = null;

    if (isAnswered) {
      if (option.id === selectedId) {
        if (option.id === correctOptionId) {
          optionClass = `${baseClass} correct`;
          showIcon = (
            <img
              src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
              alt="correct answer icon"
              className="icon"
            />
          );
        } else {
          optionClass = `${baseClass} wrong`;
          showIcon = (
            <img
              src="https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png"
              alt="incorrect close circle"
              className="icon"
            />
          );
        }
      } else if (option.id === correctOptionId) {
        optionClass = `${baseClass} correct`;
        showIcon = (
          <img
            src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
            alt="correct answer icon"
            className="icon"
          />
        );
      }
    }

    return { optionClass, showIcon };
  };

  renderDefaultOptions = (options, correctOptionId) => {
    const { selectedId, isAnswered } = this.state;

    return (
      <ul className="options-list">
        {options.map((option) => {
          const { optionClass, showIcon } = this.getOptionStyle(
            option,
            selectedId,
            correctOptionId,
            isAnswered,
            "button"
          );

          return (
            <li key={option.id} onClick={() => this.onClickOption(option.id,correctOptionId)}>
              <button className={optionClass} type="button">
                {option.text}
              </button>
              {showIcon}
            </li>
          );
        })}
      </ul>
    );
  };

  renderImageOptions = (options, correctOptionId) => {
    const { selectedId, isAnswered } = this.state;
    return (
      <ul className="options-list">
        {options.map((option) => {
          const { showIcon } = this.getOptionStyle(
            option,
            selectedId,
            correctOptionId,
            isAnswered,
            "button image-button"
          );

          return (
            <li key={option.id} onClick={() => this.onClickOption(option.id,correctOptionId)}>
              <button className='image-button' type="button">
                <img
                  className="option-image"
                  src={option.image_url}
                  alt={option.text}
                />
              </button>
              {showIcon}
            </li>
          );
        })}
      </ul>
    );
  };

  renderSingleSelectOptions = (options, correctOptionId) => {
    const { selectedId, isAnswered } = this.state;

    return (
      <ul className="radio-options-list">
        {options.map((option) => {
          const { optionClass, showIcon } = this.getOptionStyle(
            option,
            selectedId,
            correctOptionId,
            isAnswered,
            "single-select-option"
          );

          return (
            <li
              key={option.id}
              className={`single-select-option ${optionClass}`}
              onClick={() => this.onClickOption(option.id,correctOptionId)}
            >
              <label>
                <input
                  type="radio"
                  name="singleSelect"
                  value={option.id}
                  checked={selectedId === option.id}
                  readOnly
                />
                {option.text}
              </label>
              {showIcon}
            </li>
          );
        })}
      </ul>
    );
  };

  renderOptions = (optionsType, options, correctOptionId) => {
    switch (optionsType) {
      case "DEFAULT":
        return this.renderDefaultOptions(options, correctOptionId);
      case "IMAGE":
        return this.renderImageOptions(options, correctOptionId);
      case "SINGLE_SELECT":
        return this.renderSingleSelectOptions(options, correctOptionId);
      default:
        return null;
    }
  };

  render() {
    const { details} = this.props;
    const { question_text, options_type, options } = details;

    const correctOption = options.find((opt) => opt.is_correct === "true");
    const correctOptionId = correctOption ? correctOption.id : "null";

    return (
      <div className="question-container">
        
        <div className="question-and-option-container">
          <h1 className="question-text">{question_text}</h1>
          {this.renderOptions(options_type, options, correctOptionId)}
        </div>
      </div>
    );
  }
}

export default Question;
