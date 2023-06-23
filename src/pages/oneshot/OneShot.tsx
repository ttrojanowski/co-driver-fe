import { useRef, useState } from "react";

import { QuestionInput } from "../../components/QuestionInput";

import { Approaches, AskRequest, AskResponse, askApi } from "../../api";
import {
  AnalysisPanel,
  AnalysisPanelTabs,
} from "../../components/AnalysisPanel";
import { Answer, AnswerError, AnswerLoading } from "../../components/Answer";
import { ExampleList } from "../../components/Example";
import { useGetConfigurationQuery } from "../../store/configurationApi";

const OneShot = () => {

  const lastQuestionRef = useRef<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();
  const [answer, setAnswer] = useState<AskResponse>();

  const [activeCitation, setActiveCitation] = useState<string>();
  const [activeAnalysisPanelTab, setActiveAnalysisPanelTab] = useState<
    AnalysisPanelTabs | undefined
  >(undefined);

  const { data: config } = useGetConfigurationQuery();

  const makeApiRequest = async (question: string) => {
    lastQuestionRef.current = question;

    error && setError(undefined);
    setIsLoading(true);
    setActiveCitation(undefined);
    setActiveAnalysisPanelTab(undefined);

    try {
      const request: AskRequest = {
        question,
        approach: config?.approach ?? Approaches.RetrieveThenRead,
        overrides: {
          promptTemplate:
            config?.promptTemplate && config.approach !== Approaches.ReadRetrieveRead ? config?.promptTemplate : undefined,
          promptTemplatePrefix:
            config?.promptPrefixTemplate && config.approach === Approaches.ReadRetrieveRead ? config?.promptPrefixTemplate : undefined,
          promptTemplateSuffix:
            config?.promptSuffixTemplate && config.approach === Approaches.ReadRetrieveRead ? config?.promptSuffixTemplate : undefined,
          excludeCategory:
            config?.excludeCategory ? config?.excludeCategory : undefined,
          top: config?.documentCount ?? 3,
          semanticRanker: config?.useSemanticRanker ?? true,
          semanticCaptions: config?.useContextualSummaries ?? false,
        },
      };
      const result = await askApi(request);
      setAnswer(result);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  const onExampleClicked = (example: string) => {
    makeApiRequest(example);
  };

  const onShowCitation = (citation: string) => {
    if (
      activeCitation === citation &&
      activeAnalysisPanelTab === AnalysisPanelTabs.CitationTab
    ) {
      setActiveAnalysisPanelTab(undefined);
    } else {
      setActiveCitation(citation);
      setActiveAnalysisPanelTab(AnalysisPanelTabs.CitationTab);
    }
  };

  const onToggleTab = (tab: AnalysisPanelTabs) => {
    if (activeAnalysisPanelTab === tab) {
      setActiveAnalysisPanelTab(undefined);
    } else {
      setActiveAnalysisPanelTab(tab);
    }
  };

  return (
    <div className="flex flex-1 flex-col bg-gray-100">
      <div className="flex flex-col w-full items-center">
        <div className="flex items-center max-w-screen-lg w-full p-3 md:p-10">
          <QuestionInput
            clearOnSend
            placeholder="Type a new question (e.g. does my plan cover annual eye exams?)"
            disabled={isLoading}
            onSend={(question) => makeApiRequest(question)}
          />
        </div>
      </div>
      <div className="flex flex-col items-center w-full">
        {!lastQuestionRef.current && (
          <div className="flex flex-col flex-grow items-center justify-center mt-5">
            <ExampleList onExampleClicked={onExampleClicked} />
          </div>
        )}
        {isLoading && <AnswerLoading fullWidth />}
        {!isLoading && answer && !error && (
          <div className="flex items-center max-w-screen-lg w-full p-3 md:p-10">
            <Answer
              answer={answer}
              fullWidth={true}
              onCitationClicked={(x) => onShowCitation(x)}
              onThoughtProcessClicked={() =>
                onToggleTab(AnalysisPanelTabs.ThoughtProcessTab)
              }
              onSupportingContentClicked={() =>
                onToggleTab(AnalysisPanelTabs.SupportingContentTab)
              }
            />
          </div>
        )}
        {error ? (
            <AnswerError
              error={error.toString()}
              onRetry={() => makeApiRequest(lastQuestionRef.current)}
              fullWidth
            />
        ) : null}
        {activeAnalysisPanelTab && answer && (
          <AnalysisPanel
            activeCitation={activeCitation}
            onActiveTabChanged={(x) => onToggleTab(x)}
            citationHeight="600px"
            answer={answer}
            activeTab={activeAnalysisPanelTab}
          />
        )}
      </div>
    </div>
  );
};

export default OneShot;
