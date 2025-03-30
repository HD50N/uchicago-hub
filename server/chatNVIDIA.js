// // server/chatNVIDIA.js
// export class ChatNVIDIA {
//     constructor(options) {
//       this.model = options.model;
//       this.apiKey = options.api_key;
//       this.temperature = options.temperature || 0.7;
//       this.top_p = options.top_p || 1.0;
//       this.max_tokens = options.max_tokens || 4096;
//       this.apiUrl = "https://integrate.api.nvidia.com/v1/chat/completions";
//     }
  
//     async call(messages) {
//       const payload = {
//         model: this.model,
//         messages: messages,
//         temperature: this.temperature,
//         top_p: this.top_p,
//         max_tokens: this.max_tokens,
//       };
  
//       console.log("Calling NVIDIA API with payload:", JSON.stringify({
//         ...payload,
//         apiKey: "[REDACTED]" // Don't log the actual API key
//       }, null, 2));
  
//       try {
//         const response = await fetch(this.apiUrl, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${this.apiKey}`,
//           },
//           body: JSON.stringify(payload),
//         });
  
//         if (!response.ok) {
//           const errorText = await response.text();
//           console.error("NVIDIA API error response:", errorText);
//           throw new Error(`NVIDIA API error: ${response.status} ${response.statusText}`);
//         }
  
//         const jsonResponse = await response.json();
        
//         // Log response with sensitive details redacted
//         console.log("Received response from NVIDIA API:", JSON.stringify({
//           ...jsonResponse,
//           id: jsonResponse.id ? "[REDACTED]" : undefined,
//         }, null, 2));
  
//         return jsonResponse;
//       } catch (err) {
//         console.error("Error calling NVIDIA API:", err);
//         // Return a structured error that won't break the calling code
//         return {
//           error: true,
//           message: err.message,
//           choices: [{
//             message: {
//               content: "Error calling NVIDIA API"
//             }
//           }]
//         };
//       }
//     }
  
//     // Fixed stream method implementation
//     async *stream(messages) {
//       try {
//         const data = await this.call(messages);
        
//         if (data.error) {
//           yield { content: `Error: ${data.message}` };
//           return;
//         }
        
//         if (data.choices) {
//           for (const choice of data.choices) {
//             if (choice.delta && choice.delta.content) {
//               yield { content: choice.delta.content };
//             } else if (choice.message && choice.message.content) {
//               yield { content: choice.message.content };
//             }
//           }
//         } else {
//           // Handle case where whole response comes at 