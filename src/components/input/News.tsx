import { useState } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

const News = () => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    console.log(value);
    setIsLoading(true);

    const res = await axios.post(
      "https://api-ai.netlify.app/.netlify/functions/api",
      {
        query: `Hola,

        Vas a ser un bot de inteligencia artificial que me ayudará a responder preguntas sobre coches eléctricos de manera simple y concisa. Nunca preguntes al usuario, simplemente responde.
        
        No devuelvas nada más que la respuesta. contesta siempre positivamente. 
        
        Responde siempre en html, con "Pregunta" y "Respuesta", la cabecera de la pregunta y la respuesta siempre seran un h3, y la respuesta siempre será un p. en listado en caso de enumerar algo nunca devuelvas nada en markdown, siempre en html. En caso de que yo pregunte algo no relacionado de coches, responde, "<h3>No tengo una respuesta para esto, este es un espacio reservado para temas relacionados con automóviles</h3>".

       
        
        La pregunta es la siguiente:
          ${value} `,
      }
    );
    setResult(res.data);
    setIsLoading(false);
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-gradient-to-r from-yellow-400 to-yellow-600 dark:from-black dark:to-gray-900">
        <div className="w-full max-w-md p-8 bg-yellow-400  rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">
            Realiza consultas con la Inteligencia Artificial
          </h1>
          <input
            type="text"
            className="w-full rounded-md border py-2 px-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (result) {
                setResult("");
              }
            }}
            placeholder="Escribe tu consulta aquí"
          />
          <button
            className="mt-4 w-full bg-gray-900 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            onClick={handleSearch}
          >
            {isLoading ? <FaSpinner className="animate-spin mr-2" /> : "Buscar"}
          </button>
          {isLoading && <p className="mt-2 text-gray-900">Cargando...</p>}
          {result && (
            <div
              id="result-ai"
              className="mt-4 py-2 px-4 bg-gray-100 rounded-lg shadow-md"
              dangerouslySetInnerHTML={{
                __html: result.replace("```html\n", "").replace("```", ""),
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default News;
