import React from "react";
import ReactDOM from "react-dom";

const data = [
  {
    id: "bye",
    letter: "Q",
    src: "https://luosrestil.github.io/FCCimages/bye.mp3"
  },
  {
    id: "davidThought",
    letter: "W",
    src: "https://luosrestil.github.io/FCCimages/david_thought.mp3"
  },
  {
    id: "eee",
    letter: "E",
    src: "https://luosrestil.github.io/FCCimages/eee.mp3"
  },
  {
    id: "goodLuck",
    letter: "A",
    src: "https://luosrestil.github.io/FCCimages/good_luck.mp3"
  },
  {
    id: "justSaidIt",
    letter: "S",
    src: "https://luosrestil.github.io/FCCimages/just_said_it.mp3"
  },
  {
    id: "justToHear",
    letter: "D",
    src: "https://luosrestil.github.io/FCCimages/just_to_hear.mp3"
  },
  {
    id: "soHereIAm",
    letter: "Z",
    src: "https://luosrestil.github.io/FCCimages/soHereIAm.mp3"
  },
  {
    id: "talkingMicrophone",
    letter: "X",
    src: "https://luosrestil.github.io/FCCimages/talking_microphone.mp3"
  },
  {
    id: "tryAgain",
    letter: "C",
    src: "https://luosrestil.github.io/FCCimages/tryAgain.mp3"
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "Press A Key Or Click"
    };
    this.handleDisplay = this.handleDisplay.bind(this);
  }

  handleDisplay(newDisplay) {
    this.setState({
      display: newDisplay
    });
  }

  render() {
    return (
      <div id="drum-machine">
        <DrumPadGroup handleDisplay={this.handleDisplay} />
        <Display display={this.state.display} />
      </div>
    );
  }
}

class Display extends React.Component {
  render() {
    return <h1 id="display">{this.props.display}</h1>;
  }
}

class DrumPadGroup extends React.Component {
  render() {
    return (
      <div id="drum-pads">
        {data.map(data => (
          <DrumPad
            id={data.id}
            letter={data.letter}
            src={data.src}
            handleDisplay={this.props.handleDisplay}
          />
        ))}
      </div>
    );
  }
}

class DrumPad extends React.Component {
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeydown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
  }

  handleKeydown = e => {
    if (e.keyCode === this.props.letter.charCodeAt()) {
      this.audio.play();
      this.audio.currentTime = 0;
      this.props.handleDisplay(this.props.id);
    }
  };

  handleClick() {
    this.audio.currentTime = 0;
    this.audio.play();
    this.props.handleDisplay(this.props.id);
  }

  render() {
    return (
      <div
        className="drum-pad"
        id={this.props.id}
        onClick={() => this.handleClick()}
      >
        <p className="pad-content">{this.props.letter}</p>
        <audio
          src={this.props.src}
          className="clip"
          id={this.props.letter}
          ref={ref => (this.audio = ref)}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
