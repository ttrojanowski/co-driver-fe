import { Approaches } from "../../../src/api";
import { initialState } from "../../../src/store/models/Configuration";
import { describe, it } from 'vitest'

describe.concurrent('Configuration', () => {
    it.concurrent('initialState should have correct default values', async ({ expect }) => {
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

    it.concurrent('Should be able to create a Configuration object', async ({ expect }) => {
        const config = {
            ...initialState,
            documentCount: 5,
            useSemanticRanker: false
        };

        expect(config.documentCount).toBe(5);
        expect(config.useSemanticRanker).toBe(false);
    });
});