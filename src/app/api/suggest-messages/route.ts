import promptFunc from "@/helpers/prompt";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: Request) : Promise<Response> {
    try {
        const { category }  = await request.json();
        console.log(category);
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-002"});
    
        const prompt = promptFunc(category.value);
        
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        const cleanText = text.replace(/```json\n|```/g, '');

        const questionsData = JSON.parse(cleanText);
        const questions = questionsData.map((item: { question: string }) => item.question);
        console.log(questions);

        return new Response(JSON.stringify({
            questions: questions,
            success: true,
            message: "Questions generated successfully",
        }), { status: 200 });
        
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({
            success: false,
            message: error,
        }), { status: 500 });
    }
}