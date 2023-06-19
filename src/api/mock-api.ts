import { AskRequest, AskResponse, ChatRequest } from "./models";

export async function askApi(options: AskRequest): Promise<AskResponse> {
    // Mocked response
    const mockedResponse: AskResponse = {
        answer: 'The capital of France is [Paris]. <<What is the population of Paris?>>',
        thoughts: 'Mocked thoughts',
        data_points: ['Mocked data point 1', 'Mocked data point 2'],
    };
  
    return new Promise((resolve, reject) => {
        // Mimic network delay
        setTimeout(() => {
            // Randomly simulate an error
            const shouldThrowError = Math.random() > 0.9;
            if (shouldThrowError) {
                reject(new Error('Mocked network error'));
                return;
            }

            resolve(mockedResponse);
        }, 1000);
    });
}

export async function chatApi(options: ChatRequest): Promise<AskResponse> {
    // Mocked response
    const mockedResponse: AskResponse = {
        answer: 'The capital of France is [Paris]. <<What is the population of Paris?>>',
        thoughts: 'Mocked chat thoughts',
        data_points: ['Mocked chat data point 1', 'Mocked chat data point 2'],
    };
  
    return new Promise((resolve, reject) => {
        // Mimic network delay
        setTimeout(() => {
            // Randomly simulate an error
            const shouldThrowError = Math.random() > 0.9;
            if (shouldThrowError) {
                reject(new Error('Mocked network error'));
                return;
            }

            resolve(mockedResponse);
        }, 3000);
    });
}

export function getCitationFilePath(citation: string): string {
    return `/content/${citation}`;
}
