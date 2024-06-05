import React, { useEffect } from "react";
import Codemirror from "codemirror";
import "codemirror/mode/javascript/javascript";
const Editor = () => {
  useEffect(() => {
    async function init() {
      Codemirror.fromTextArea(document.getElementById("realtimeEditor"), {
        mode: { name: "javascript", json: true },
      });
    }
  }, []);
  return (
    <>
      <textarea id="realtimeEditor">Editor</textarea>
    </>
  );
};

export default Editor;
