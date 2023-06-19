import { useMemo } from "react";
import { Stack, IconButton } from "@fluentui/react";
import DOMPurify from "dompurify";

import styles from "./Answer.module.css";

import { AskResponse, getCitationFilePath } from "../../api";
import { parseAnswerToHtml } from "./AnswerParser";
import { AnswerIcon } from "./AnswerIcon";

interface Props {
    answer: AskResponse;
    isSelected?: boolean;
    onCitationClicked: (filePath: string) => void;
    onThoughtProcessClicked: () => void;
    onSupportingContentClicked: () => void;
    onFollowupQuestionClicked?: (question: string) => void;
    showFollowupQuestions?: boolean;
}

export const Answer = ({
    answer,
    isSelected,
    onCitationClicked,
    onThoughtProcessClicked,
    onSupportingContentClicked,
    onFollowupQuestionClicked,
    showFollowupQuestions
}: Props) => {
    const parsedAnswer = useMemo(() => parseAnswerToHtml(answer.answer, onCitationClicked), [answer]);

    const sanitizedAnswerHtml = DOMPurify.sanitize(parsedAnswer.answerHtml);

    return (

        /*
            <div className={className}>
      <div
        className={`"
        bg-gray-200
      text-black text-sm mb-20 
      cursor-default 
      max-w-xl
      p-4 font-medium
      rounded-lg shadow-xl
    " ${border}`}
      >
        <div className="pb-2">
          <div className="flex items-center justify-between gap-4">
            <img src={avatar} alt="avatar" className="w-12 h-12 rounded-full" />
            <p className="font-semibold uppercase">John Doe</p>
            <div className="">
              <PButtonPure
                icon="light"
                size="small"
                placeholder="Show tought process"
              ></PButtonPure>
              <PButtonPure
                icon="list"
                size="small"
                placeholder="Show supporting content"
              ></PButtonPure>
            </div>
          </div>
        </div>
        <PDivider direction="horizontal" color="contrast-high" />
        <div className="py-3 overflow-y-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          pulvinar eleifend lectus eu lobortis. Donec fermentum, tellus quis
          luctus euismod, metus erat suscipit ante, et mollis massa mi at ex.
          Aenean fermentum ornare orci id fermentum. Ut aliquet maximus purus.
          Suspendisse vel dui sit amet turpis commodo consectetur suscipit vel
          libero. Suspendisse potenti. Morbi quis nunc metus. Praesent vitae
          mattis enim. Donec volutpat nisl ac orci luctus iaculis. In hac
          habitasse platea dictumst. Donec et dapibus neque.
        </div>
        <div className="font-semibold">
          Citations:{" "}
          <span className="text-purple-800 font-semibold hover:font-bold p-1">
            1. Some Citation
          </span>
        </div>
      </div>
    </div>
        */
        <Stack className={`${styles.answerContainer} ${isSelected && styles.selected}`} verticalAlign="space-between">
            <Stack.Item>
                <Stack horizontal horizontalAlign="space-between">
                    <AnswerIcon />
                    <div>
                        <IconButton
                            style={{ color: "black" }}
                            iconProps={{ iconName: "Lightbulb" }}
                            title="Show thought process"
                            ariaLabel="Show thought process"
                            onClick={() => onThoughtProcessClicked()}
                            disabled={!answer.thoughts}
                        />
                        <IconButton
                            style={{ color: "black" }}
                            iconProps={{ iconName: "ClipboardList" }}
                            title="Show supporting content"
                            ariaLabel="Show supporting content"
                            onClick={() => onSupportingContentClicked()}
                            disabled={!answer.data_points.length}
                        />
                    </div>
                </Stack>
            </Stack.Item>

            <Stack.Item grow>
                <div className={styles.answerText} dangerouslySetInnerHTML={{ __html: sanitizedAnswerHtml }}></div>
            </Stack.Item>

            {!!parsedAnswer.citations.length && (
                <Stack.Item>
                    <Stack horizontal wrap tokens={{ childrenGap: 5 }}>
                        <span className={styles.citationLearnMore}>Citations:</span>
                        {parsedAnswer.citations.map((x, i) => {
                            const path = getCitationFilePath(x);
                            return (
                                <a key={i} className={styles.citation} title={x} onClick={() => onCitationClicked(path)}>
                                    {`${++i}. ${x}`}
                                </a>
                            );
                        })}
                    </Stack>
                </Stack.Item>
            )}

            {!!parsedAnswer.followupQuestions.length && showFollowupQuestions && onFollowupQuestionClicked && (
                <Stack.Item>
                    <Stack horizontal wrap className={`${!!parsedAnswer.citations.length ? styles.followupQuestionsList : ""}`} tokens={{ childrenGap: 6 }}>
                        <span className={styles.followupQuestionLearnMore}>Follow-up questions:</span>
                        {parsedAnswer.followupQuestions.map((x, i) => {
                            return (
                                <a key={i} className={styles.followupQuestion} title={x} onClick={() => onFollowupQuestionClicked(x)}>
                                    {`${x}`}
                                </a>
                            );
                        })}
                    </Stack>
                </Stack.Item>
            )}
        </Stack>
    );
};
