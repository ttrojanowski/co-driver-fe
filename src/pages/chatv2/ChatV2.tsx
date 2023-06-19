import { useRef, useState, useEffect } from "react";
import {
  Checkbox,
  Panel,
  DefaultButton,
  TextField,
  SpinButton,
} from "@fluentui/react";

import styles from "../chat/Chat.module.scss";

import {
  chatApi,
  Approaches,
  AskResponse,
  ChatRequest,
  ChatTurn,
} from "../../api";
import { Answer, AnswerError, AnswerLoading } from "../../components/Answer";
import { QuestionInput } from "../../components/QuestionInput";
import { ExampleList } from "../../components/Example";
import { UserChatMessage } from "../../components/UserChatMessage";
import {
  AnalysisPanel,
  AnalysisPanelTabs,
} from "../../components/AnalysisPanel";
import { SettingsButton } from "../../components/SettingsButton";
import { ClearChatButton } from "../../components/ClearChatButton";
import PorscheLogoSvg from "../../assets/porsche.svg";
import { ChatBubble } from "../../components/ChatBubble";
import { motion } from "framer-motion";
import { PText } from "@porsche-design-system/components-react";

const ChatV2 = () => {
  const [isConfigPanelOpen, setIsConfigPanelOpen] = useState(false);
  const [promptTemplate, setPromptTemplate] = useState<string>("");
  const [retrieveCount, setRetrieveCount] = useState<number>(3);
  const [useSemanticRanker, setUseSemanticRanker] = useState<boolean>(true);
  const [useSemanticCaptions, setUseSemanticCaptions] =
    useState<boolean>(false);
  const [excludeCategory, setExcludeCategory] = useState<string>("");
  const [useSuggestFollowupQuestions, setUseSuggestFollowupQuestions] =
    useState<boolean>(false);

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

  const makeApiRequest = async (question: string) => {
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
          promptTemplate:
            promptTemplate.length === 0 ? undefined : promptTemplate,
          excludeCategory:
            excludeCategory.length === 0 ? undefined : excludeCategory,
          top: retrieveCount,
          semanticRanker: useSemanticRanker,
          semanticCaptions: useSemanticCaptions,
          suggestFollowupQuestions: useSuggestFollowupQuestions,
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
    lastQuestionRef.current = "";
    error && setError(undefined);
    setActiveCitation(undefined);
    setActiveAnalysisPanelTab(undefined);
    setAnswers([]);
  };

  useEffect(
    () => chatMessageStreamEnd.current?.scrollIntoView({ behavior: "smooth" }),
    [isLoading]
  );

  const onPromptTemplateChange = (
    _ev?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    setPromptTemplate(newValue || "");
  };

  const onRetrieveCountChange = (
    _ev?: React.SyntheticEvent<HTMLElement, Event>,
    newValue?: string
  ) => {
    setRetrieveCount(parseInt(newValue || "3"));
  };

  const onUseSemanticRankerChange = (
    _ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
    checked?: boolean
  ) => {
    setUseSemanticRanker(!!checked);
  };

  const onUseSemanticCaptionsChange = (
    _ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
    checked?: boolean
  ) => {
    setUseSemanticCaptions(!!checked);
  };

  const onExcludeCategoryChanged = (
    _ev?: React.FormEvent,
    newValue?: string
  ) => {
    setExcludeCategory(newValue || "");
  };

  const onUseSuggestFollowupQuestionsChange = (
    _ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
    checked?: boolean
  ) => {
    setUseSuggestFollowupQuestions(!!checked);
  };

  const onExampleClicked = (example: string) => {
    makeApiRequest(example);
  };

  const onShowCitation = (citation: string, index: number) => {
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

  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 1,
        staggerChildren: 0.05,
      },
    },
  };

  const animate = (title: string) => {
    const letter = {
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.2
        }
      },
    };

    return title.split("").map((char, index) => (
      <motion.span key={char + "-" + index} variants={letter}>
        {char}
      </motion.span>
    ));
  };

  return (
    // <section>
    //   <div className="grid max-w-screen-xl mx-auto p-4 lg:gap-6 xl:gap-0 lg:grid-cols-12">
    //     <ChatBubble className="row-span-1 col-start-7 col-span-6 " border="border-r-8 border-green-500"/>
    //     <ChatBubble className="col-start-1 col-span-6 col-end-13" border=" border-l-8 border-hero bg-gradient-to-br from-rose-300 via-violet-100 to-indigo-300" />
    //   </div>
    // </section>
    <div className="flex flex-1 flex-col mt-5">
      <div className="flex flex-1">
        <div className="flex flex-1 flex-col items-center w-full">
          {!lastQuestionRef.current ? (
            <div className="flex flex-grow flex-col justify-center items-center max-w-screen-xl p-14">
              <motion.h1
                className="text-4xl mb-8 lg:mb-16 lg:text-6xl font-semibold"
                variants={sentence}
                initial="hidden"
                animate="visible"
              >
                {animate("Hi there 👋 I'm your Porsche Co-Driver.")}
              </motion.h1>
              <h2 className="text-2xl mb-2 lg:mb-20 lg:text-3xl font-medium">
                I'm here to help you! Do you have any questions? Please take a look at the examples below.
              </h2>
              <ExampleList onExampleClicked={onExampleClicked} />
            </div>
          ) : (
            <div className="flex max-w-screen-xl max-h-screen-xl w-full overflow-y-auto pl-6 pr-6 flex-col flex-grow">
              {answers.map((answer, index) => (
                <div key={index}>
                  <UserChatMessage message={answer[0]} />
                  <div className={styles.chatMessageGpt}>
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
                      onSupportingContentClicked={() =>
                        onToggleTab(
                          AnalysisPanelTabs.SupportingContentTab,
                          index
                        )
                      }
                      onFollowupQuestionClicked={(q) => makeApiRequest(q)}
                      showFollowupQuestions={
                        useSuggestFollowupQuestions &&
                        answers.length - 1 === index
                      }
                    />
                  </div>
                </div>
              ))}
              {isLoading && (
                <>
                  <UserChatMessage message={lastQuestionRef.current} />
                  <div className={styles.chatMessageGptMinWidth}>
                    <AnswerLoading />
                  </div>
                </>
              )}
              {error ? (
                <>
                  <UserChatMessage message={lastQuestionRef.current} />
                  <div className={styles.chatMessageGptMinWidth}>
                    <AnswerError
                      error={error.toString()}
                      onRetry={() => makeApiRequest(lastQuestionRef.current)}
                    />
                  </div>
                </>
              ) : null}
              <div ref={chatMessageStreamEnd} />
            </div>
          )}

          <div className="flex flex-1 flex-col max-h-[200px] sticky bottom-0 pt-3 pb-6 px-6 bg-prompt w-full space-y-4 items-start justify-center">
            <PText className="px-2 pt-3 font-semibold" size="small" theme="dark">
            Type your question here:
            </PText>
            <QuestionInput
              clearOnSend
              placeholder="Type a new question (e.g. does my plan cover annual eye exams?)"
              disabled={isLoading}
              onSend={(question) => makeApiRequest(question)}
            />
            <ClearChatButton
              onClick={clearChat}
              disabled={!lastQuestionRef.current || isLoading}
            />
          </div>
        </div>

        {answers.length > 0 && activeAnalysisPanelTab && (
          <AnalysisPanel
            className={styles.chatAnalysisPanel}
            activeCitation={activeCitation}
            onActiveTabChanged={(x) => onToggleTab(x, selectedAnswer)}
            citationHeight="810px"
            answer={answers[selectedAnswer][1]}
            activeTab={activeAnalysisPanelTab}
          />
        )}

        <Panel
          headerText="Configure answer generation"
          isOpen={isConfigPanelOpen}
          isBlocking={false}
          onDismiss={() => setIsConfigPanelOpen(false)}
          closeButtonAriaLabel="Close"
          onRenderFooterContent={() => (
            <DefaultButton onClick={() => setIsConfigPanelOpen(false)}>
              Close
            </DefaultButton>
          )}
          isFooterAtBottom={true}
        >
          <TextField
            className={styles.chatSettingsSeparator}
            defaultValue={promptTemplate}
            label="Override prompt template"
            multiline
            autoAdjustHeight
            onChange={onPromptTemplateChange}
          />

          <SpinButton
            className={styles.chatSettingsSeparator}
            label="Retrieve this many documents from search:"
            min={1}
            max={50}
            defaultValue={retrieveCount.toString()}
            onChange={onRetrieveCountChange}
          />
          <TextField
            className={styles.chatSettingsSeparator}
            label="Exclude category"
            onChange={onExcludeCategoryChanged}
          />
          <Checkbox
            className={styles.chatSettingsSeparator}
            checked={useSemanticRanker}
            label="Use semantic ranker for retrieval"
            onChange={onUseSemanticRankerChange}
          />
          <Checkbox
            className={styles.chatSettingsSeparator}
            checked={useSemanticCaptions}
            label="Use query-contextual summaries instead of whole documents"
            onChange={onUseSemanticCaptionsChange}
            disabled={!useSemanticRanker}
          />
          <Checkbox
            className={styles.chatSettingsSeparator}
            checked={useSuggestFollowupQuestions}
            label="Suggest follow-up questions"
            onChange={onUseSuggestFollowupQuestionsChange}
          />
        </Panel>
      </div>
    </div>
  );
};

export default ChatV2;

