// DeckBuilderPage.tsx
import React, { useCallback, useEffect, useState } from "react";
import { useObservable } from "mst-use-observable";
import templateModel from "../models/TemplateModel";
import { auth, requestWithAuth } from "../Firebase";

interface TemplateResponse {
  id: string;
  data: string;
}

const TemplatePage: React.FC = () => {
  const templateData = useObservable(templateModel);
  const [id, setId] = useState<string | null>(null);


  const get = () => {
    async function get() {
      try {
        // Make a GET request to your API endpoint using the deckId.
        const response = await requestWithAuth(
          "GET",
          `/api/template/get?id=${id}`, 
        );
        if (response.ok) {
          const data = (await response.json() as TemplateResponse);
          templateData.setData(data.data)
        }      
      } catch (error) {
        console.error("Error fetching deck:", error);
      }
    }
  };

  return (
    <div className="p-4">
      <div className="flex space-x-4">
        data: {templateData.data || "No data"}
        <form onSubmit={get}>
            <div className="items-center justify-center grid auto-rows-auto gap-1 place-items-center">
              <input
                type="text"
                placeholder="ID"
                value={id || ""}
                onChange={(e) => setId(e.target.value)}
                className="flex-none w-50 bg-gray-700 text-center text-white border border-gray-600 rounded py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="submit"
                className="flex-none w-50 bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded shadow-md hover:shadow-lg transition duration-200 ease-in-out transform hover:scale-105"
              >
                GET
              </button>
            </div>
          </form>

      </div>
    </div>
  );
};

export default TemplatePage;
