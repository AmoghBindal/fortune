import { useState } from 'react';  // Import useState
import reactLogo from './assets/react.svg';
// Import the GoogleGenerativeAI class from the package
import { SpeechRecognition, useSpeechRecognition } from 'react-speech-kit';

import { GoogleGenerativeAI } from "@google/generative-ai"; 
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [fortune, setFortune] = useState("");  // State for storing the fortune

  const speakFortune = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };
  const tellFortune = async () => {
    // Make sure to include these imports:
    // import { GoogleGenerativeAI } from "@google/generative-ai";
    const genAI = new GoogleGenerativeAI("AIzaSyAHcsRvq6KGZKAIeVAuVMRSmCCyHKRFOLw");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "You are a genie, Give a Funny Random and General Fortune in 2 or 3 lines for this fortune telling app ";

    try {
      const result = await model.generateContent(prompt);
      const fortuneText = result.response.text();
      console.log(fortuneText);
      setFortune(fortuneText);  // Set the generated fortune
      speakFortune(fortuneText);  // Speak the generated fortune
    } catch (error) {
      console.error("Error generating content:", error);
      const errorMessage = "Unable to tell your fortune at this time.";
      setFortune(errorMessage);
      speakFortune(errorMessage);  // Speak the error message
    }

  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={reactLogo} className="App-logo" alt="logo" />
          <h1>Fortune Teller</h1>
          <button onClick={tellFortune}>Tell me my fortune</button>
          {fortune && <p>{fortune}</p>}
        </header>
      </div>
    </>
  );
}

export default App;
