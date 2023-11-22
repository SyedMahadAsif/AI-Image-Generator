import { useState } from 'react';
import './App.css'
import { Configuration, OpenAIApi } from "openai";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    "Type whatever you want here"
  );
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    setPlaceholder(`Search ${prompt}..`);
    setLoading(true);
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "256x256", 
    });
    setLoading(false);
    setResult(res.data.data[0].url);
  };
  return (
    <div className="app-main">
    {loading ? (
      <>
        <h2>Generating..Please Wait..</h2>
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </>
    ) : (
      <>
      <img src="vite.svg" height="50px" ></img>
        <h1>AI IMAGE GENERATOR</h1>
        <h2>TYPE ANYTHING AND IT WILL TURN INTO AN IMAGE✨</h2>
       

        <textarea
          className="app-input"
          placeholder={placeholder}
          onChange={(e) => setPrompt(e.target.value)}
          rows="10"
          cols="40"
        />
        <button onClick={generateImage}>GENERATE IMAGE</button>
        {result.length > 0 ? (
          <img className="result-image" src={result} alt="result" />
        ) : (
          <></>
        )}
      </>
         )}
         
          {/* <img className='img' src="src/assets/collection.png" height="350px"></img> */}
          <h4>Developed By Mahad</h4>
     </div>
  )
}

export default App
