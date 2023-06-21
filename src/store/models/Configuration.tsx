export type Configuration = {
  promptTemplate: string | null;
  documentCount: number | null;
  excludeCategory: string | null;
  useSemanticRanker: boolean;
  useContextualSummaries: boolean;
  suggestFollowUpQuestions: boolean;
};

export const initialState: Configuration = {
    promptTemplate: null,
    documentCount: 3,
    excludeCategory: null,
    useSemanticRanker: true,
    useContextualSummaries: false,
    suggestFollowUpQuestions: false,
  };

export default Configuration;