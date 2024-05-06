// page.jsx
"use client";

import { useState } from 'react';
import { formAction1, formAction } from './actions';

export default function Home() {
  const [response, setResponse] = useState(null);

  async function handleFormAction(formData) {
    const content = await formAction(formData);
    setResponse(content);
  }

  return (
    <div className="flex flex-col items-center min-h-screen py-8">
      <div className="w-full max-w-2xl">
        <form
          className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4"
          action={handleFormAction}
        >
          <div className="flex flex-col gap-6">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold"
                htmlFor="title"
              >
                Song Title:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                placeholder="High Powered"
                name="songTitle"
                maxLength="64"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold"
                htmlFor="artist"
              >
                Artist Name:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="artist"
                type="text"
                placeholder="Dr. Dre"
                name="songArtist"
                maxLength="64"
              />
            </div>
            <div>
              <label
                htmlFor="songFile"
                className="block text-gray-700 text-sm font-bold"
              >
                Upload the lyrics from a .txt file:
              </label>
              <input type="file" name="songFile" id="songFile" />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {response && (
        <div className="w-full max-w-2xl mt-8">
          <h2 className="text-2xl font-bold mb-4">Analysis:</h2>
          <pre className="bg-white shadow-lg rounded px-8 py-6 mb-4 overflow-x-auto whitespace-pre-wrap">{response}</pre>
        </div>
      )}
    </div>
  );
}