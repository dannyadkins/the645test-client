import React, { useState } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import IconButton from "@material-ui/core/IconButton";
import MicIcon from "@material-ui/icons/Mic";
import StopIcon from "@material-ui/icons/Stop";
import SendIcon from "@material-ui/icons/Send";
function Dictaphone(props) {
  const [value, setValue] = useState("");
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setValue(result);
      props.onResult(result);
    },
  });

  return (
    <div>
      {!listening ? (
        <IconButton onClick={listen}>
          <MicIcon />
        </IconButton>
      ) : (
        <IconButton
          onClick={() => {
            stop();
          }}
        >
          <StopIcon />
        </IconButton>
      )}

      {((value.length > 0 && !listening) || props.showSend) && (
        <IconButton
          onClick={() => {
            props.onSend();
          }}
        >
          <SendIcon />
        </IconButton>
      )}
    </div>
  );
}

export default Dictaphone;
