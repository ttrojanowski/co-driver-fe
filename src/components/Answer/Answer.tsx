import DOMPurify from "dompurify";
import { useMemo } from "react";

import { AskResponse, getCitationFilePath } from "../../api";
import { parseAnswerToHtml } from "./AnswerParser";

import { PButtonPure, PDivider } from "@porsche-design-system/components-react";
import logo from "../../assets/co-driver-logo.png";
import ShareAnswerDropdown from "../ShareAnswerDropdown/ShareAnswerDropdown";

interface Props {
  answer: AskResponse;
  isSelected?: boolean;
  onCitationClicked: (filePath: string) => void;
  onThoughtProcessClicked: () => void;
  onFollowupQuestionClicked?: (question: string) => void;
  showFollowupQuestions?: boolean;
  fullWidth?: boolean;
}

export const Answer = ({
  answer,
  isSelected,
  onCitationClicked,
  onThoughtProcessClicked,
  onFollowupQuestionClicked,
  showFollowupQuestions,
  fullWidth,
}: Props) => {
  const parsedAnswer = useMemo(
    () => parseAnswerToHtml(answer.answer, onCitationClicked),
    [answer]
  );

  const sanitizedAnswerHtml = DOMPurify.sanitize(parsedAnswer.answerHtml);

  return (
    <div
      className={`flex justify-start min-w-sm w-[90%] ${
        fullWidth ? "w-full" : "w-[90%]"
      }`}
    >
      <div>
        <div
          className={`
        bg-white
        text-black text-sm mb-4 
        cursor-default 
        w-full
        min-w-sm
        p-4 font-medium
        rounded-lg shadow-md
        border-l-8 border-lime-300 ${
          isSelected ? "outline outline-5 outline-lime-200/70" : ""
        }
        ${fullWidth ? 'md:max-w-screen-xl' : 'md:max-w-2xl'}`}
        >
          <div className="pb-2">
            <div className="flex items-center justify-between gap-4">
              <img src={logo} alt="avatar" className="w-12 h-12 rounded-full" />
              <p className="font-semibold uppercase">Porsche Co-Driver</p>
              <div className="">
                <PButtonPure
                  icon="light"
                  size="small"
                  placeholder="Show tought process"
                  aria-label="Show thought process"
                  onClick={onThoughtProcessClicked}
                  disabled={!answer.thoughts}
                ></PButtonPure>
                <ShareAnswerDropdown answer={answer.answer} />
              </div>
            </div>
          </div>
          <PDivider
            className="py-2"
            direction="horizontal"
            color="contrast-high"
          />
          <div
            className="py-3 overflow-y-auto text-sm md:text-lg table-auto whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: sanitizedAnswerHtml }}
          ></div>
          {!!parsedAnswer.citations.length && (
            <>
              <PDivider
                className="py-2"
                direction="horizontal"
                color="contrast-high"
              />
              <div className="font-semibold">
                Citations:{" "}
                <div className="flex items-center flex-row gap-2 flex-wrap py-2">
                  {parsedAnswer.citations.map((x, i) => {
                    const path = getCitationFilePath(x);
                    return (
                      <a
                        key={i}
                        className="text-gray-800 cursor-pointer font-light rounded-sm bg-lime-100 shadow-sm p-1 hover:font-semibold hover:bg-lime-200/80 hover:shadow-none"
                        title={x}
                        onClick={() => onCitationClicked(path)}
                      >
                        {`${++i}. ${x}`}
                      </a>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
        {!!parsedAnswer.followupQuestions.length &&
          showFollowupQuestions &&
          onFollowupQuestionClicked && (
            <div className="text-sm font-semibold">
              <p className="mb-3 md:ml-1 flex items-center justify-center md:flex-none md:justify-normal">
                Follow up Questions:
              </p>
              <div className="flex flex-row gap-2 flex-wrap items-center justify-center md:items-start md:justify-normal max-w-sm md:max-w-lg">
                {parsedAnswer.followupQuestions.map((x, i) => {
                  return (
                    <a
                      key={i}
                      className="text-gray-800 cursor-pointer font-light rounded-sm bg-lime-100 shadow-sm p-2 hover:font-semibold hover:bg-lime-200/80"
                      title={x}
                      onClick={() => onFollowupQuestionClicked(x)}
                    >
                      {`${++i}. ${x}`}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
      </div>
    </div>
  );
};
