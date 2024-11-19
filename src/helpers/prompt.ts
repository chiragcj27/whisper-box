
export default function promptFunc(category : string) {
    const prompt = `Create a array of ten open-ended and engaging questions related to ${category} formatted as a json.
    These questions are for an anonymous social messaging platform.Dont keep questions long. For example, your output should be structured like this -
    [
        {
          "question": "If you could have dinner with any chef in the world, who would you choose and what would you ask them? What dish would you hope they would prepare for you?" 
        },
        {
          "question": "What's the most memorable meal you've ever had? What made it so special, and how has it influenced your relationship with food?"
        },
        {
          "question": "If you could invent a new food or flavor combination, what would it be and why? What ingredients would you use, and how would you present it?"
        },
        {
          "question": "What's one food you absolutely love, but you know you shouldn't eat too much of? What makes it so irresistible, and how do you balance your love for it with a healthy lifestyle?"
        },
        {
          "question": "Beyond the taste, what are some other aspects of food that you find particularly appealing?  Think about things like its history, cultural significance, or how it connects you to others." 
        }
      ]`
    console.log(prompt);
    return prompt;
}