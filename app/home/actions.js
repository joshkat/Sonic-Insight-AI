// actions.js
"use server";

import { MongoClient } from "mongodb";
import OpenAI from "openai";

export async function formAction1(formData) {
  console.log("We clicked submit");
  const rawFormData = {
    songTitle: formData.get("songTitle"),
    songArtist: formData.get("songArtist"),
    songFile: formData.get("songFile"),
  };

  if (
    rawFormData.songFile.size > 0 &&
    rawFormData.songFile.name != "undefined" &&
    rawFormData.songFile.type == "text/plain" &&
    rawFormData.songTitle.length > 0 &&
    rawFormData.songTitle.length > 0
  ) {
    const fileText = await rawFormData.songFile.text();

    const client = new MongoClient(process.env.MONGODB_URI);

    try {
      await client.connect();
      const db = client.db(process.env.MONGODB_DB_NAME);
      const collection = db.collection("analysis");

      const entryKey = `${rawFormData.songTitle}-${rawFormData.songArtist}`;

      await collection.insertOne({
        id: entryKey,
        lyrics: fileText,
      });

      console.log("Entry added to MongoDB");
    } catch (error) {
      console.error("Error adding entry to MongoDB:", error);
    } finally {
      await client.close();
    }
  }
}

export async function getLyrics(songName, artistName) {
  return new Promise((resolve, reject) => {
    const { spawn } = require('child_process');
    let token = process.env.GENIUS;
    console.log("TOKEN: " + token)
    const pythonProcess = spawn('C:\\Program Files\\Python312\\python.exe', ['getLyrics.py', songName, artistName, token]);

    let output = '';

    pythonProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python script error: ${data}`);
    });

    pythonProcess.on('exit', (code) => {
      console.log(`Python script exited with code ${code}`);
      if (code === 0) {
        const outputData = "./" + output.trim();
        console.log(`Python script output: ${outputData}`);
        try {
          resolve(output);
        } catch (error) {
          console.error(`Error loading JSON file: ${error}`);
          resolve(null);
        }
      } else {
        resolve(null);
      }
    });
  });
}

export async function formAction(formData) {
  if(process.env.GENIUS==null || process.env.OPENAI_API_KEY === null  )
    {
      return ["No lyrics because no GENIUS API key was given", "No analysis because no AI analysis key was given"];
    }
  const openai = new OpenAI();  
  console.log("analyzing song");

  const rawFormData = {
    songTitle: formData.get("songTitle"),
    songArtist: formData.get("songArtist"),
    songFile: formData.get("songFile"),
  };

  let fileText = "";
  await getLyrics(rawFormData.songTitle, rawFormData.songArtist)
    .then((lyrics) => {
      if (lyrics) {
        console.log(lyrics);
        fileText = lyrics;
      } else {
        console.log("No lyrics found or an error occurred.");
      }
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
    });

  console.log("File text is " + fileText);
  if(fileText==""){
    return ["Could not find song", "No song lyrics provided"];

  }
  console.log("CHAT GPT ANALYSIS BELOW")
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: `I will give you this song, give me back an analysis in this format. each segment is 5 lines long so like line5-10:analysis. dont be lazy. start from line1 : line#-line#: analysis of the line. Song lyrics: 
    
    `+fileText }],
    model: "gpt-4o",
  });

  console.log(completion.choices);
  const content = completion.choices[0].message.content;
    // Add line numbers to the lyrics
  const lyricsWithLineNumbers = fileText
  .split("\n")
  .map((line, index) => `${index + 1}. ${line}`)
  .join("\n");

  return [lyricsWithLineNumbers, content];
}