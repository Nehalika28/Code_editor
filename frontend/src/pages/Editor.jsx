
import React, { useEffect } from "react";
import CodeMirror from "codemirror";
import "codemirror/theme/dracula.css";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";
const Editor = () => {
  useEffect(() => {
    const textarea = document.getElementById("realtimeEditor");

    const editor = CodeMirror.fromTextArea(textarea, {
      mode: "javascript",
      lineNumbers: true,
      theme: "dracula",
      autoCloseTags:true,
      autoCloseBrackets: true,
      lineNumbers:true

    });

    editor.setSize("100%", "500px");

    return () => {
      editor.toTextArea();
    };
  }, []);

  return (
    <div>
      <textarea id="realtimeEditor" />
    </div>
  );
};

export default Editor;
