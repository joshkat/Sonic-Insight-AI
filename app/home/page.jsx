"use client";
import Image from 'next/image';
import { useState } from 'react';

import { formAction } from './actions';

export default function Home() {
  const [response1, setResponse1] = useState(null);
  const [response2, setResponse2] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setResponse1(null);
    setResponse2(null);
    const formData = new FormData(event.target);
    const [lyrics, analysis] = await formAction(formData);
    console.log("lyrics is " + lyrics);
    console.log("analysis is " + analysis);
    setResponse1(lyrics);
    setResponse2(analysis);
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col items-center min-h-screen py-8 bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500">
      <div className="flex items-center mb-8">
        <div className="rounded-lg overflow-hidden shadow-lg">
          <Image src="/sonicInsightLogo2.png" alt="Sonic Insight Logo" width={250} height={200} />
        </div>
      </div>
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg mb-8">
        <form onSubmit={handleSubmit}>
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
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading...
                </div>
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </form>
      </div>
      {(response1 && response2) && (
        <div className="w-full px-4 mt-8 flex flex-col md:flex-row justify-between">
          {response1 && (
            <div className="w-full md:w-1/2 md:pr-4 mb-8 md:mb-0">
              <h2 className="text-2xl font-bold mb-4">Lyrics:</h2>
              <pre className="bg-white shadow-lg rounded px-8 py-6 overflow-x-auto whitespace-pre-wrap">{response1}</pre>
            </div>
          )}
          {response2 && (
            <div className="w-full md:w-1/2 md:pl-4">
              <h2 className="text-2xl font-bold mb-4">Analysis:</h2>
              <pre className="bg-white shadow-lg rounded px-8 py-6 overflow-x-auto whitespace-pre-wrap">{response2}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}