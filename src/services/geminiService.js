import axios from 'axios';
const API_KEY = 'AIzaSyAmfv5ML6txGnCXH3-7AYD-UwT57yj3VmI'; // Replace with your actual API key
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export async function generateQuestions(topic, numQuestions, marksPerQuestion) {
	try {
		const prompt = `Generate ${numQuestions} multiple-choice questions about ${topic}. For each question, provide 4 options, indicate the correct answer, and assign ${marksPerQuestion} marks to each question. Format the response as a JSON array of objects, where each object has properties: questionText, options (an array of 4 strings), correctAnswer (the correct option string), and marks (an integer equal to ${marksPerQuestion}). Do not include any markdown formatting or additional text.`;
		
		const response = await axios.post(
			API_URL,
			{
				contents: [{ parts: [{ text: prompt }] }]
			},
			{
				params: { key: API_KEY },
				headers: { 'Content-Type': 'application/json' }
			}
		);

		const generatedText = response.data.candidates[0].content.parts[0].text;
		
		// Attempt to parse the entire response as JSON
		try {
			return JSON.parse(generatedText);
		} catch (parseError) {
			// If parsing fails, try to extract JSON from the response
			const jsonMatch = generatedText.match(/\[[\s\S]*\]/);
			if (!jsonMatch) {
				throw new Error('No valid JSON found in the response');
			}
			const jsonString = jsonMatch[0];
			return JSON.parse(jsonString);
		}
	} catch (error) {
		console.error('Error calling Gemini API:', error);
		if (error.response) {
			console.error('API response:', error.response.data);
		}
		throw new Error('Failed to generate questions: ' + error.message);
	}
}