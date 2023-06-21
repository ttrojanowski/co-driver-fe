import { AskRequest, AskResponse, ChatRequest } from "./models";

export async function askApi(options: AskRequest): Promise<AskResponse> {
  // Mocked response
  const mockedResponse: AskResponse = {
    answer: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        [Citation1] Integer fringilla lorem sit amet purus placerat, 
        non rutrum lacus fermentum. <<Follow-up question 1?>>
        
        Curabitur consectetur dapibus massa, sit amet bibendum 
        risus pellentesque non. Morbi nec faucibus orci. 
        [Citation2] Fusce condimentum sodales mi a lacinia. 
        Aliquam erat volutpat. <<Follow-up question 2?>>
        
        Etiam volutpat pharetra eleifend. Vestibulum ante ipsum 
        primis in faucibus orci luctus et ultrices posuere 
        cubilia curae; Morbi rutrum turpis nec varius faucibus. 
        [Citation3] Nulla facilisi. <<Follow-up question 3?>>
        
        Sed semper auctor nibh, ac vulputate magna porta quis. 
        [Citation1] In ac lacus nec tortor varius interdum 
        sed sit amet mauris. <<Follow-up question 4?>>
        
        Proin porta velit metus, non congue neque tincidunt sed. 
        [Citation2] Vestibulum ante ipsum primis in faucibus orci 
        luctus et ultrices posuere cubilia curae; 
        [Citation3] Nulla at odio a lorem tempor varius. <<Follow-up question 5?>>
    `,
    thoughts: "Mocked thoughts",
    data_points: ["Mocked data point 1", "Mocked data point 2"],
  };

  return new Promise((resolve, reject) => {
    // Mimic network delay
    setTimeout(() => {
      // Randomly simulate an error
      const shouldThrowError = Math.random() > 0.9;
      if (shouldThrowError) {
        reject(new Error("Mocked network error"));
        return;
      }

      resolve(mockedResponse);
    }, 1000);
  });
}

export async function chatApi(options: ChatRequest): Promise<AskResponse> {
  // Mocked response
  const mockedResponse: AskResponse = {
    answer: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        [Citation1] Integer fringilla lorem sit amet purus placerat, 
        non rutrum lacus fermentum. <<Follow-up question 1?>>
        
        Curabitur consectetur dapibus massa, sit amet bibendum 
        risus pellentesque non. Morbi nec faucibus orci. 
        [Citation2] Fusce condimentum sodales mi a lacinia. 
        Aliquam erat volutpat. <<Follow-up question 2?>>
        
        Etiam volutpat pharetra eleifend. Vestibulum ante ipsum 
        primis in faucibus orci luctus et ultrices posuere 
        cubilia curae; Morbi rutrum turpis nec varius faucibus. 
        [Citation3] Nulla facilisi. <<Follow-up question 3?>>
        
        Sed semper auctor nibh, ac vulputate magna porta quis. 
        [Citation1] In ac lacus nec tortor varius interdum 
        sed sit amet mauris. <<Follow-up question 4?>>
        
        Proin porta velit metus, non congue neque tincidunt sed. 
        [Citation2] Vestibulum ante ipsum primis in faucibus orci 
        luctus et ultrices posuere cubilia curae; 
        [Citation3] Nulla at odio a lorem tempor varius. <<Follow-up question 5?>>
    `,
    thoughts: "Mocked chat thoughts",
    data_points: ["Mocked chat data point 1", "Mocked chat data point 2"],
  };

  return new Promise((resolve, reject) => {
    // Mimic network delay
    setTimeout(() => {
      // Randomly simulate an error
      const shouldThrowError = Math.random() > 0.8;
      if (shouldThrowError) {
        reject(new Error("Mocked network error"));
        return;
      }

      resolve(mockedResponse);
    }, 3000);
  });
}

export function getCitationFilePath(citation: string): string {
  return `/content/${citation}`;
}
