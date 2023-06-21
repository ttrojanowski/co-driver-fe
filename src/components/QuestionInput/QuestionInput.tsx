import { useState } from "react";
import { Stack, TextField } from "@fluentui/react";
import { Send28Filled } from "@fluentui/react-icons";

import styles from "./QuestionInput.module.css";
import {
  PCrest,
  PDivider,
  PIcon,
  PTextFieldWrapper,
} from "@porsche-design-system/components-react";
import { color } from "framer-motion";

interface Props {
  onSend: (question: string) => void;
  disabled: boolean;
  placeholder?: string;
  clearOnSend?: boolean;
}

export const QuestionInput = ({
  onSend,
  disabled,
  placeholder,
  clearOnSend,
}: Props) => {
  const [question, setQuestion] = useState<string>("");

  const sendQuestion = () => {
    if (disabled || !question.trim()) {
      return;
    }

    onSend(question);

    if (clearOnSend) {
      setQuestion("");
    }
  };

  const onEnterPress = (ev: React.KeyboardEvent<Element>) => {
    if (ev.key === "Enter" && !ev.shiftKey) {
      ev.preventDefault();
      sendQuestion();
    }
  };

  const onQuestionChange = (
    _ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    if (!newValue) {
      setQuestion("");
    } else if (newValue.length <= 1000) {
      setQuestion(newValue);
    }
  };

  const sendQuestionDisabled = disabled || !question.trim();

  return (
    <Stack horizontal className="bg-white rounded-lg h-15 w-full max-w-screen-xl p-5 shadow-sm shadow-gray-100 flex items-center justify-center">
      <PCrest className="px-2 h-1"/>
      <PDivider direction={"vertical"} className="h-14 px-2"/>
      <TextField
        className="w-full py-0leading-10 text-sm md:text-lg"
        placeholder={placeholder}
        multiline
        resizable={false}
        borderless
        value={question}
        onChange={onQuestionChange}
        onKeyDown={onEnterPress}
        styles={{ root: { fontFamily: 'inherit'}, fieldGroup: {fontSize: 'inherit', fontFamily: 'inherit'}, field: {fontSize: 'inherit', fontFamily: 'inherit'}}}
      />
      <div className="flex flex-col justify-end">
        <div
          className={`cursor-pointer ${
            sendQuestionDisabled ? 'opacity-40' : ""
          }`}
          aria-label="Ask question button"
          onClick={sendQuestion}
        >
          <PIcon name={question ? "arrow-right" : "chat"} />
        </div>
      </div>
    </Stack>
  );
};
