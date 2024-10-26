// import { useState, useRef } from 'react';  // Import useState
// import reactLogo from './assets/react.svg';
// // Import the GoogleGenerativeAI class from the package
// import { SpeechRecognition, useSpeechRecognition } from 'react-speech-kit';
// import { GoogleGenerativeAI } from "@google/generative-ai"; 
// import './App.css';
// import videoFile from './assets/video.mp4';  // Import the video file

// function App() {
//   const [count, setCount] = useState(0);
//   const [fortune, setFortune] = useState("");  // State for storing the fortune
//   const videoRef = useRef(null); // Reference to the video element
//   const [isPlaying, setIsPlaying] = useState(false); // Track playing stated
//   const speakFortune = (text) => {
//     const utterance = new SpeechSynthesisUtterance(text);
//     window.speechSynthesis.speak(utterance);
//   };
//   const tellFortune = async () => {
//     // Make sure to include these imports:
//     // import { GoogleGenerativeAI } from "@google/generative-ai";
//     const genAI = new GoogleGenerativeAI("AIzaSyAHcsRvq6KGZKAIeVAuVMRSmCCyHKRFOLw");
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     const prompt = "You are a genie, Give a Funny Random and General Fortune in 2 or 3 lines for this fortune telling app ";
//     setFortune("Scanning...");
//     await new Promise(resolve => setTimeout(resolve, 3000));
//     try {
//       const result = await model.generateContent(prompt);
//       const fortuneText = result.response.text();
//       console.log(fortuneText);
//       setFortune(fortuneText);
//       videoRef.current.play();  // Set the generated fortune
//       speakFortune(fortuneText);
//        // Speak the generated fortune
//     } catch (error) {
//       console.error("Error generating content:", error);
//       const errorMessage = "Unable to tell your fortune at this time.";
//       setFortune(errorMessage);
//       speakFortune(errorMessage);  // Speak the error message
//     }
//   };

//   return (
//     <>
//       <div className="App">
//         <header className="App-header">
//           <img src={reactLogo} className="App-logo" alt="logo" />
//           <h1>Fortune Teller</h1>
//           <video ref={videoRef} width="480" height="270" controls>
//             <source src="./assets/video.mp4" type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//           <div className='button'>
//             <button onClick={tellFortune}>Tell me my fortune</button>
//           </div>
          
//           {fortune && <p>{fortune}</p>}
//         </header>
//       </div>
//     </>
//   );
// }

// export default App;


import { useState, useRef } from 'react'; 
import reactLogo from './assets/react.svg';
import { GoogleGenerativeAI } from "@google/generative-ai"; 
import './App.css';
import videoFile from './assets/video.mp4'; 

function App() {
  const [fortune, setFortune] = useState("");  // State for storing the fortune
  const videoRef = useRef(null);  // Reference to the video element
  const [isPlaying, setIsPlaying] = useState(false);  // Track if the video is playing

  // Function to speak the fortune and control video playback
  const speakFortune = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Start playing the video when the speech starts
    utterance.onstart = () => {
      videoRef.current.play();
      setIsPlaying(true);
    };
    
    // Pause the video when the speech ends
    utterance.onend = () => {
      videoRef.current.pause();
      setIsPlaying(false);
    };
    
    window.speechSynthesis.speak(utterance);
  };

  const tellFortune = async () => {
    const genAI = new GoogleGenerativeAI("AIzaSyAHcsRvq6KGZKAIeVAuVMRSmCCyHKRFOLw");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Write a humorous, one-liner roast from the perspective of a palm reader, aimed at an Indian engineering student. The roast should tease common stereotypes about engineering students, including but not restricted to not studying, being single(not finding a partner), bad habits, coding skills, bad future, body shaming, etc . Be hard and funny.";
    setFortune("Scanning...");
    
    // Add a delay to simulate "thinking" before generating the fortune
    await new Promise(resolve => setTimeout(resolve, 3000));

    try {
      const result = await model.generateContent(prompt);
      const fortuneText = result.response.text();
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
          <video ref={videoRef} width="480" height="270" loop>
            <source src={videoFile} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className='button'>
            <button onClick={tellFortune}>Tell me my fortune</button>
          </div>
          
          {fortune && <p>{fortune}</p>}
        </header>
      </div>
    </>
  );
}

export default App;
