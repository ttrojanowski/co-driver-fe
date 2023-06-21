import {
  PButton,
  PCheckboxWrapper,
  PDivider,
  PHeading,
  PTextFieldWrapper,
  PTextareaWrapper,
  PToast,
  useToastManager,
} from "@porsche-design-system/components-react";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  useGetConfigurationQuery,
  useSetConfigurationMutation,
  useResetConfigurationMutation
} from "../../store/configurationApi";
import { Configuration, initialState } from "../../store/models/Configuration";

const Settings: React.FC = () => {
  const { data: config } = useGetConfigurationQuery();

  const [configuration, setConfigurationState] =
    useState<Configuration>(config ?? initialState);
  
  const [setConfiguration, { isLoading: isUpdating }] = useSetConfigurationMutation();
  
  const [resetConfiguration, { isLoading: isResetting }] = useResetConfigurationMutation();

  const { addMessage } = useToastManager();

  const changeHeroSection: (short: boolean) => void = useOutletContext();

  useEffect(() => {
    changeHeroSection(true);
  }, []);

  useEffect(() => {
    if (config) {
      setConfigurationState(config);
    }
  }, [config]);

  const handleSave = () => {
    if (configuration) {
      setConfiguration(configuration);
    }
    addMessage({ text: "Configuration saved", state: "success" });
  };

  const handleReset = () => {
    resetConfiguration();
    addMessage({ text: "Configuration set to the initial state", state: "success" });
  };
    

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if(!configuration) return;

    setConfigurationState({
      ...configuration,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!configuration) return;
    setConfigurationState({
      ...configuration,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <div>
      <div className="p-8 grid max-w-screen-xl mx-auto grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-8">
        <div className="p-4 col-span-6">
          <PHeading tag="h1" size="large" className="mb-5">
            Co-Driver Configuration
          </PHeading>
          <PHeading tag="h2" size="small" color="inherit" className="mb-5">
            Configure answer generation
          </PHeading>
          <PDivider />
        </div>
        <div className="col-start-1 col-span-6 px-4 flex items-center justify-center">
          <PTextareaWrapper
            label="Override Prompt Template"
            hideLabel={false}
            className="w-full"
            description="Here you can provide your own promp template which will be used to generate prompts for the Co-Driver"
          >
            <textarea
              name="promptTemplate"
              value={configuration.promptTemplate ?? ""}
              onChange={handleInputChange}
              placeholder="e.g. Create a list of frequently asked questions for our customer service team based on the context {context}"
              maxLength={500}
            />
          </PTextareaWrapper>
        </div>
        <div className="col-span-6 md:col-span-3 px-4 flex items-center justify-center">
          <PTextFieldWrapper
            label="Retrieve this many documents from search"
            description="Number of documents to retrieve from search"
            className="w-full"
          >
            <input
              type="number"
              name="documentCount"
              value={configuration.documentCount ?? ""}
              min="1"
              max="50"
              onChange={handleInputChange}
              placeholder="e.g. 3"
            />
          </PTextFieldWrapper>
        </div>
        <div className="col-span-6 md:col-span-3 px-4 flex items-center justify-center">
          <PTextFieldWrapper
            label="Exclude category"
            description="Category to exclude from search"
            className="w-full"
          >
            <input
              type="text"
              name="excludeCategory"
              value={configuration.excludeCategory ?? ""}
              onChange={handleInputChange}
              placeholder="e.g. Financial"
            />
          </PTextFieldWrapper>
        </div>
        <div className="col-span-6 px-4">
          <PHeading tag="h2" size="medium">
            Select options:
          </PHeading>
        </div>
        <div className="col-span-6 p-5 flex flex-col gap-4 md:justify-between md:flex-row">
          <PCheckboxWrapper
            label="Use semantic ranker for retrieval"
            hideLabel={false}
            className="col-span-1"
          >
            <input
              type="checkbox"
              name="useSemanticRanker"
              checked={configuration.useSemanticRanker ?? false}
              onChange={handleCheckboxChange}
            />
          </PCheckboxWrapper>
          <PCheckboxWrapper
            label="Use query-contextual summaries instead of whole documents"
            hideLabel={false}
            className="col-span-2"
          >
            <input
              type="checkbox"
              name="useContextualSummaries"
              checked={configuration.useContextualSummaries ?? false}
              onChange={handleCheckboxChange}
            />
          </PCheckboxWrapper>
          <PCheckboxWrapper
            label="Suggest follow-up questions"
            hideLabel={false}
          >
            <input
              type="checkbox"
              name="suggestFollowUpQuestions"
              checked={configuration.suggestFollowUpQuestions ?? false}
              onChange={handleCheckboxChange}
            />
          </PCheckboxWrapper>
        </div>
        <div className="row-span-2 col-span-6"></div>
        <div className="col-span-6 gap-2 px-4 flex items-center justify-end">
        <PButton icon="close" variant="secondary" className="min-w-[150px]" onClick={handleReset} loading={isResetting}>
          Reset Configuration
        </PButton>
        <PButton icon="check" className="min-w-[150px]" onClick={handleSave} loading={isUpdating} disabled={config === configuration}>
          Save
        </PButton>
        </div>
      </div>
      <PToast />
    </div>
  );
};

export default Settings;
