import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import Table from "./Table";
import parseClip from "./parseClip";

const PasteFromExcel = () => {
  const [state, setState] = useState({
    rawStr: "",
    data: [],
  });

  // handlePaste = e => {
  //   e.preventDefault();
  //   let clipText = "";
  //   if (window.clipboardData && window.clipboardData.getData) {
  //     clipText = window.clipboardData.getData("Text");
  //   } else if (e.clipboardData && e.clipboardData.getData) {
  //     clipText = e.clipboardData.getData("text/plain");
  //   } else {
  //     clipText = e.originalEvent.clipboardData.getData("text/plain");
  //   }
  //   this.setState({
  //     rawStr: clipText,
  //     data: parseClip(clipText)
  //   });
  // };

  const handleChange = ({ target: { value } }) => {
    setState({
      rawStr: value,
      data: parseClip(value),
    });
  };

  return (
    <div className="App">
      <input
        placeholder="Paste your excel form data here..."
        // onPaste={this.handlePaste}
        onChange={handleChange}
        value={state.rawStr}
      />
    </div>
  );
};

export default PasteFromExcel;
