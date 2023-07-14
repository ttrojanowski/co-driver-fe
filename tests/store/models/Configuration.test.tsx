import { Approaches } from "../../../src/api";
import { initialState } from "../../../src/store/models/Configuration";

describe('Configuration', () => {
    test('initialState should have correct default values', () => {
        expect(initialState).toEqual({
            approach: Approaches.RetrieveThenRead,
            promptTemplate: null,
            promptPrefixTemplate: null,
            promptSuffixTemplate: null,
            documentCount: 3,
            excludeCategory: null,
            useSemanticRanker: true,
            useContextualSummaries: false,
            suggestFollowUpQuestions: false,
        });
    });

    test('Should be able to create a Configuration object', () => {
        const config = {
            ...initialState,
            documentCount: 5,
            useSemanticRanker: false
        };

        expect(config.documentCount).toBe(5);
        expect(config.useSemanticRanker).toBe(false);
    });
});