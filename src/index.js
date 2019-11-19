import React from "react";
import ReactDOM from "react-dom";
import Purgecss from "purgecss";
import "./styles.css";

class App extends React.Component {
  state = { purgecssResult: null, copySuccess: "Copy text" };

  async componentDidMount() {
    const purgeCss = new Purgecss({
      content: ["targetFiles/index.html"],
      css: ["targetFiles/extracted.css"]
    });
    const purgeResult = purgeCss.purge();

    await this.setState({ purgecssResult: purgeResult[0].css }); //ideally should not use promise setState doesn't return one
    console.log("State: " + this.state.purgecssResult);
  }

  copyToClipboard = e => {
    this.textArea.select();
    document.execCommand("copy");
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
    e.target.focus();
    this.setState({ copySuccess: "Copied!" });
    setTimeout(
      function() {
        //Start the timer
        this.setState({ copySuccess: "Copy text" }); //After 1 second, set render to true
      }.bind(this),
      2000
    );
  };

  render() {
    return (
      <div className="App">
        <h1>Purged CSS results:</h1>
        <textarea
          ref={textarea => (this.textArea = textarea)}
          type="text"
          value={this.state.purgecssResult}
        />
        {document.queryCommandSupported("copy") && (
          <button onClick={this.copyToClipboard}>
            {this.state.copySuccess}
          </button>
        )}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
