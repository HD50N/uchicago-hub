// // server/scrape.js
// import puppeteer from 'puppeteer';
// import Tesseract from 'tesseract.js';
// import { ChatNVIDIA } from './chatNVIDIA.js';
// import { ChatPromptTemplate } from '@langchain/core/prompts';

// // Replace with your actual NVIDIA API key
// const NVIDIA_API_KEY = 'CGa3mURPDVp6msGQuKn52LpkGW6HTiWzlLDoZqdk7sUUvLii4_2zP4oxHjxI9X5a';

// // Initialize our NVIDIA client using our custom wrapper.
// const nvidiaClient = new ChatNVIDIA({
//   model: "deepseek-ai/deepseek-r1-distill-llama-8b",
//   api_key: NVIDIA_API_KEY,
//   temperature: 0.6,
//   top_p: 0.7,
//   max_tokens: 4096,
// });

// // Define a prompt template for extracting event details from OCR text.
// const promptTemplate = `
// You are an assistant that extracts event details from text obtained via OCR on an Instagram post image.
// If the text describes an event, return a JSON object with the keys:
//   "eventName": a short event title,
//   "eventDate": the event's date in ISO 8601 format (YYYY-MM-DD),
//   "ocrText": the original OCR text.
// If the text does not describe an event, output "null".

// Text:
// {ocrText}

// JSON Format:
// {
//   "eventName": "...",
//   "eventDate": "...",
//   "ocrText": "..."
// }
// `;

// // Create a ChatPromptTemplate using LangChain's LCEL approach.
// const chatPrompt = ChatPromptTemplate.fromTemplate(promptTemplate);

// /**
//  * Use Tesseract.js to perform OCR on the given image URL.
//  */
// export async function extractTextFromImage(imageUrl) {
//   console.log(`Starting OCR on image: ${imageUrl}`);
//   try {
//     const { data: { text } } = await Tesseract.recognize(imageUrl, 'eng', {
//       logger: info => console.log("Tesseract:", info),
//     });
//     console.log("OCR extracted text:", text);
//     return text;
//   } catch (err) {
//     console.error('Error extracting text from image:', err);
//     return '';
//   }
// }

// /**
//  * Use our NVIDIA client (via LCEL) to extract event details from OCR text.
//  */
// export async function extractEventDetailsWithLCEL(ocrText) {
//   console.log("Formatting prompt for OCR text.");
//   try {
//     const formattedPrompt = await chatPrompt.format({ ocrText });
//     console.log("Formatted Prompt:", formattedPrompt);
    
//     // Call the NVIDIA client with the formatted prompt wrapped in a user message.
//     const response = await nvidiaClient.call([{ role: "user", content: formattedPrompt }]);
//     console.log("Raw LLM Response:", response);
    
//     // FIXED: Handle different response structures properly
//     let resultText = '';
//     if (response.choices && response.choices.length > 0) {
//       resultText = response.choices[0].message?.content || '';
//     } else if (response.text) {
//       resultText = response.text;
//     } else if (typeof response === 'string') {
//       resultText = response;
//     }

//     // Handle both structured JSON responses and plain text
//     try {
//       // First, attempt to parse the entire response as JSON
//       return JSON.parse(resultText);
//     } catch (jsonError) {
//       console.log("Response is not direct JSON, trying to extract JSON from text");
      
//       // Try to find JSON-like structure in the text
//       const jsonMatch = resultText.match(/\{[\s\S]*\}/);
//       if (jsonMatch) {
//         try {
//           return JSON.parse(jsonMatch[0]);
//         } catch (nestedJsonError) {
//           console.error("Failed to parse extracted JSON:", nestedJsonError);
//         }
//       }
      
//       // If response contains "null" for non-events
//       if (resultText.trim().toLowerCase() === "null") {
//         console.log("Model indicated this is not an event");
//         return null;
//       }
      
//       console.error("Could not extract valid JSON from response");
//       return null;
//     }
//   } catch (err) {
//     console.error("LLM extraction error:", err);
//     return null;
//   }
// }

// /**
//  * Scr