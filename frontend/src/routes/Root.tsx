import React from "react";

import TemplatePage from "./Template";

export default function Root() {
  return (
    <>
      <div className="items-center justify-center p-2 grid gap-1">
        <div className="place-items-center text-center">
          <a
            href="/connection"
            className="inline-block flex-none w-50 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 sm:px-1 rounded shadow-md hover:shadow-lg transition duration-200 ease-in-out transform hover:scale-105"
          >
            Go To Other Page
          </a>
        </div>
      </div>

      <section className="grid grid-cols-1 place-items-center py-8 text-white">
        <div className="w-full border border-gray-700 rounded bg-gray-800 grid grid-cols-1 place-items-center ">
          <TemplatePage />
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white py-4 text-center">
        <p>Template</p>
      </footer>
    </>
  );
}
