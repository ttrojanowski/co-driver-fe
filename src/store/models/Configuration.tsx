import { Approaches } from "../../api";

export type Configuration = {
  approach: Approaches | Approaches.RetrieveThenRead;
  promptTemplate: string | null;
  promptPrefixTemplate: string | null;
  promptSuffixTemplate: string | null;
  documentCount: number | null;
  excludeCategory: string | null;
  useSemanticRanker: boolean;
  useContextualSummaries: boolean;
  suggestFollowUpQuestions: boolean;
};

export const initialState: Configuration = {
    approach: Approaches.RetrieveThenRead,
    promptTemplate: null,
    promptPrefixTemplate: null,
    promptSuffixTemplate: null,
    documentCount: 3,
    excludeCategory: null,
    useSemanticRanker: true,
    useContextualSummaries: false,
    suggestFollowUpQuestions: false,
  };

export default Configuration;