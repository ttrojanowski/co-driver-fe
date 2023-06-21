import {
    PButton,
  PCheckboxWrapper,
  PDivider,
  PHeading,
  PTextFieldWrapper,
  PTextareaWrapper,
} from "@porsche-design-system/components-react";

const Settings = () => {
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
            <textarea name="custom-prompt" placeholder="e.g. Create a list of frequently asked questions for our customer service team based on the context {context}"/>
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
              name="some-name"
              value={""}
              min="1"
              max="50"
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
              name="some-name"
              value={""}
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
          <PCheckboxWrapper label="Use semantic ranker for retrieval" hideLabel={false} className="col-span-1">
            <input type="checkbox" name="checkbox" />
          </PCheckboxWrapper>
          <PCheckboxWrapper label="Use query-contextual summaries instead of whole documents" hideLabel={false} className="col-span-2">
            <input type="checkbox" name="checkbox" />
          </PCheckboxWrapper>
          <PCheckboxWrapper label="Suggest follow-up questions" hideLabel={false}>
            <input type="checkbox" name="checkbox" />
          </PCheckboxWrapper>
        </div>
        <div className="row-span-2 col-span-6"></div>
        <PButton className="col-start-6">Save</PButton>
      </div>
    </div>
  );
};

export default Settings;
