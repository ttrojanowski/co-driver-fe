import { useEffect, useRef, useState } from "react";

import { PButtonPure } from "@porsche-design-system/components-react";
import { useOutletContext } from "react-router-dom";
import {
  Approaches,
  AskResponse,
  ChatRequest,
  ChatTurn,
  chatApi,
} from "../../api";
import {
  AnalysisPanel,
  AnalysisPanelTabs,
} from "../../components/AnalysisPanel";
import { Answer, AnswerError, AnswerLoading } from "../../components/Answer";
import { ExampleList } from "../../components/Example";
import { QuestionInput } from "../../components/QuestionInput";
import { UserChatMessage } from "../../components/UserChatMessage";
import { useGetConfigurationQuery } from "../../store/configurationApi";

const Chat = () => {
  const lastQuestionRef = useRef<string>("");
  const chatMessageStreamEnd = useRef<HTMLDivElement | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();

  const [activeCitation, setActiveCitation] = useState<string>();
  const [activeAnalysisPanelTab, setActiveAnalysisPanelTab] = useState<
    AnalysisPanelTabs | undefined
  >(undefined);

  const [selectedAnswer, setSelectedAnswer] = useState<number>(0);
  const [answers, setAnswers] = useState<
    [user: string, response: AskResponse][]
  >([]);

  const changeHeroSection: (short: boolean) => void = useOutletContext();

  const { data: config } = useGetConfigurationQuery();

  const makeApiRequest = async (question: string) => {
    changeHeroSection(true);
    lastQuestionRef.current = question;

    error && setError(undefined);
    setIsLoading(true);
    setActiveCitation(undefined);
    setActiveAnalysisPanelTab(undefined);

    try {
      const history: ChatTurn[] = answers.map((a) => ({
        user: a[0],
        bot: a[1].answer,
      }));
      const request: ChatRequest = {
        history: [...history, { user: question, bot: undefined }],
        approach: Approaches.ReadRetrieveRead,
        overrides: {
          promptTemplate: config?.promptTemplate ?? undefined,
          excludeCategory: config?.excludeCategory ?? undefined,
          top: config?.documentCount ?? 3,
          semanticRanker: config?.useSemanticRanker ?? true,
          semanticCaptions: config?.useContextualSummaries ?? false,
          suggestFollowupQuestions: config?.suggestFollowUpQuestions ?? false,
        },
      };
      const result = await chatApi(request);
      setAnswers([...answers, [question, result]]);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    changeHeroSection(false);
    lastQuestionRef.current = "";
    error && setError(undefined);
    setActiveCitation(undefined);
    setActiveAnalysisPanelTab(undefined);
    setAnswers([]);
  };

  useEffect(() => {
    changeHeroSection(false);
  }, []);

  useEffect(
    () => chatMessageStreamEnd.current?.scrollIntoView({ behavior: "smooth" }),
    [isLoading]
  );

  const onExampleClicked = (example: string) => {
    makeApiRequest(example);
  };

  const onShowCitation = (citation: string, index: number) => {
    console.log("onShowCitation", citation, index);
    if (
      activeCitation === citation &&
      activeAnalysisPanelTab === AnalysisPanelTabs.CitationTab &&
      selectedAnswer === index
    ) {
      setActiveAnalysisPanelTab(undefined);
    } else {
      setActiveCitation(citation);
      setActiveAnalysisPanelTab(AnalysisPanelTabs.CitationTab);
    }

    setSelectedAnswer(index);
  };

  const onToggleTab = (tab: AnalysisPanelTabs, index: number) => {
    if (activeAnalysisPanelTab === tab && selectedAnswer === index) {
      setActiveAnalysisPanelTab(undefined);
    } else {
      setActiveAnalysisPanelTab(tab);
    }

    setSelectedAnswer(index);
  };

  return (
    <div className="flex flex-1 flex-col bg-gray-100">
      <div className="flex flex-1">
        <div className="flex flex-1 flex-col items-center w-full">
          {!lastQuestionRef.current ? (
            <div className="flex flex-grow flex-col justify-center items-center max-w-screen-xl p-10">
              <div className="flex max-w-screen-xl max-h-screen-xl w-full p-0 flex-col items-center">
                <QuestionInput
                  clearOnSend
                  placeholder="Type a new question (e.g. does my plan cover annual eye exams?)"
                  disabled={isLoading}
                  onSend={(question) => makeApiRequest(question)}
                />
              </div>
              <div className="flex flex-col flex-grow items-center justify-center mt-5">
                <ExampleList onExampleClicked={onExampleClicked} />
              </div>
            </div>
          ) : (
            <div className="flex max-w-screen-xl max-h-screen-xl w-full overflow-y-auto px-2 pt-5 flex-col flex-grow">
              {answers.map((answer, index) => (
                <div key={index}>
                  <UserChatMessage message={answer[0]} />
                    <Answer
                      key={index}
                      answer={answer[1]}
                      isSelected={
                        selectedAnswer === index &&
                        activeAnalysisPanelTab !== undefined
                      }
                      onCitationClicked={(c) => onShowCitation(c, index)}
                      onThoughtProcessClicked={() =>
                        onToggleTab(AnalysisPanelTabs.ThoughtProcessTab, index)
                      }
                      onFollowupQuestionClicked={(q) => makeApiRequest(q)}
                      showFollowupQuestions={
                        config?.suggestFollowUpQuestions &&
                        answers.length - 1 === index
                      }
                    />
                  </div>
              ))}
              {isLoading && (
                <>
                  <UserChatMessage message={lastQuestionRef.current} />
                  <AnswerLoading />
                </>
              )}
              {error ? (
                <>
                  <UserChatMessage message={lastQuestionRef.current} />
                  <AnswerError
                    error={error.toString()}
                    onRetry={() => makeApiRequest(lastQuestionRef.current)}
                  />
                </>
              ) : null}
              <div ref={chatMessageStreamEnd} />
            </div>
          )}

          {lastQuestionRef.current && (
            <div
              className="flex flex-1 flex-col max-h-[200px] sticky bottom-0 pt-3 pb-6 px-6 w-full space-y-4 items-center justify-center 
            bg-gray-100"
            >
              <QuestionInput
                clearOnSend
                placeholder="Type a new question (e.g. What is the Porsche Home Mobile Charger Connect (AC) Energy Manager?)"
                disabled={isLoading}
                onSend={(question) => makeApiRequest(question)}
              />
              <div className="w-full max-w-screen-xl flex flex-col items-start justify-start">
                <PButtonPure
                  onClick={clearChat}
                  icon="delete"
                  hideLabel={false}
                  disabled={!lastQuestionRef.current || isLoading}
                >
                  Clear chat
                </PButtonPure>
              </div>
            </div>
          )}
        </div>

        {answers.length > 0 && activeAnalysisPanelTab && (
          <AnalysisPanel
            activeCitation={activeCitation}
            onActiveTabChanged={(x) => onToggleTab(x, selectedAnswer)}
            citationHeight="810px"
            answer={answers[selectedAnswer][1]}
            activeTab={activeAnalysisPanelTab}
          />
        )}
      </div>
    </div>
  );
};

export default Chat;
