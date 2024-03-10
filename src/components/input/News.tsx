import { useState } from "react";

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import axios from "axios";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyDXp6IImgys12-tNDptaOs_Xzay8LUgPck";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

const News = () => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  const handleSearch = async () => {
    console.log(value);

    const res = await axios.post(
      "https://api-ai.netlify.app/.netlify/functions/api",
      {
        query: `Hola,

        Vas a ser un bot de inteligencia artificial que me ayudará a responder preguntas sobre coches eléctricos de manera simple y concisa. Nunca preguntes al usuario, simplemente responde.
        
        No devuelvas nada más que la respuesta. contesta siempre positivamente. 
        
        Responde siempre en html, con "Pregunta" y "Respuesta", la cabecera de la pregunta y la respuesta siempre seran un h3, y la respuesta siempre será un p. nunca devuelvas nada en markdown, siempre en html. En caso de que yo pregunte algo no relacionado de coches, responde, "<h3>No tengo una respuesta para esto, este es un espacio reservado para temas relacionados con automóviles</h3>".

       
        
        La pregunta es la siguiente:
          ${value} `,
      }
    );
    setResult(res.data);
  };

  return (
    <>
      <div
        className={`dark:bg-black dark:text-yellow-300 duration-300 relative flex flex-col justify-center items-center`}
      >
        <h1>Realiza consultas con la Inteligencia Artificial</h1>
        <input
          type="text"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);

            if (result) {
              setResult("");
            }
          }}
        />
        <button
          className="align-middle select-none font-sans font-bold text-center uppercase transition-all 
        w-32
        disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
          onClick={handleSearch}
        >
          Buscar
        </button>

        {!value && !result && <p>Cargando...</p>}
        {result && (
          <div
            id="result-ai"
            className="text-xs py-3 px-6 rounded-lg  shadow-md shadow-gray-900/10"
            dangerouslySetInnerHTML={{
              __html: result.replace("```html\n", "").replace("```", ""),
            }}
          />
        )}
      </div>
    </>
  );
};

export default News;
