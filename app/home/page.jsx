import { MongoClient } from "mongodb";
import OpenAI, { Configuration, OpenAIApi } from "openai";

export default function Home() {
  async function formAction1(formData) {
    "use server";
    console.log("We clicked submit");
    const rawFormData = {
      songTitle: formData.get("songTitle"), // this is the title
      songArtist: formData.get("songArtist"), // this is the artist
      songFile: formData.get("songFile"), // this is the file
    };

    // when songFile fits these params it works with it
    if (
      rawFormData.songFile.size > 0 &&
      rawFormData.songFile.name != "undefined" &&
      rawFormData.songFile.type == "text/plain" &&
      rawFormData.songTitle.length > 0 &&
      rawFormData.songTitle.length > 0
    ) {
      // Read the contents of the songFile
      const fileText = await rawFormData.songFile.text();

      // Create a MongoDB client
      const client = new MongoClient(process.env.MONGODB_URI);

      try {
        // Connect to the MongoDB database
        await client.connect();
        const db = client.db(process.env.MONGODB_DB_NAME);
        const collection = db.collection("analysis");

        // Create the entry key
        const entryKey = `${rawFormData.songTitle}-${rawFormData.songArtist}`;

        // Insert the entry into MongoDB
        await collection.insertOne({
          id: entryKey,
          lyrics: fileText,
        });

        console.log("Entry added to MongoDB");
      } catch (error) {
        console.error("Error adding entry to MongoDB:", error);
      } finally {
        // Close the MongoDB connection
        await client.close();
      }
    }
    // otherwise throw an error
  }

  
  // const configuration = new OpenAI({
  //   apiKey: process.env.OPENAI_API_KEY,
  // });
  
  async function formAction(formData) {
    "use server";
    const openai = new OpenAI();  
    console.log("analyzing song");
    let songLyrics = `
    Whoa, whoa

Yeah

Sometimes we laugh and sometimes we cry, but I guess you know now

Baby

I took a half and she took the whole thing, slow down

Baby

We took a trip, now we on your block and it's like a ghost town

Baby

Where do these niggas be at when they say they doing all this and all that?

Tired of beefing you bums, you can't even pay me enough to react

Been waking up in the crib and sometimes I don't even know where I'm at

Please don't play that niggas songs in this party, I can't even listen to that

Anytime that I ran into somebody, it must be a victory lap, ayy

Shawty come sit on my lap, ayy

They saying Drizzy just snapped

Distance between us is not like a store, this isn't a closeable gap, ayy

I seen some niggas attack

And don't end up making it back

I know that they at the crib going crazy, down bad

What they had didn't last, damn, baby

Sometimes we laugh and sometimes we cry, but I guess you know now

Baby

I took a half and she took the whole thing, slow down

Baby

We took a trip, now we on your block and it's like a ghost town

Baby

Where do these niggas be at when they say they doing all this and all that?

I'm in the trenches, relax

Can you not play that lil' boy in the club? 'Cause we do not listen to rats

We in Atlanta, I buy her a wig, she tellin' me Tae is the best

Point at that nigga who act like a killer

But you only one from the 'net

I'm like DaBaby, I'm not just a rapper

You play with me, you gon' get stretched

Ooh-oh

Bring Drake to the hood

Surround Drake around Dracs

Even though I got a case

I'ma do what it take

And I never been embraced

And the money's hard to make

So I bet they on they face right now

I know that they at the crib going crazy, down bad

What they had didn't last, damn, baby

Sometimes we laugh and sometimes we cry, but I guess you know now

Baby

I took a half and she took the whole thing, slow down

Baby

We took a trip, now we on your block and it's like a ghost town

Baby

Where do these niggas be at when they say they doing all this and all that?

When he tell the story, that's not how it went

Know they be lying, a hundred percent

Moved out the Ritz and forgot 'bout the Bent'

Valet just called me to tell me come get it

Knocked that boy off and I don't want no credit

If it was me, they wouldn't regret it

Left me for dead and now they wan' dead it, yeah

Heart is still beating

My niggas still eating

Backyard, it look like the Garden of Eden

Pillow talk with 'em, she spilling the tea

And then shawty came back and said she didn't mean it

It's hard to believe it

I know that they at the crib going crazy, down bad

What they had didn't last, damn, baby

Sometimes we laugh and sometimes we cry, but I guess you know now

Baby

I took a half and she took the whole thing, slow down

Baby

We took a trip, now we on your block and it's like a ghost town

Baby

Where do these niggas be at when they say they doing all this and all that
    `
    let endLine = songLyrics.split(/\r\n|\r|\n/).length
    console.log(endLine);
    const rawFormData = {
      songTitle: formData.get("songTitle"), // this is the title
      songArtist: formData.get("songArtist"), // this is the artist
      songFile: formData.get("songFile"), // this is the file
    };

    const fileText = await rawFormData.songFile.text();

    console.log("File text is " + fileText);
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: `I will give you this song, give me back an analysis in this format. each segment is 5 lines long so like line5-10:analysis. dont be lazy. start from line1 : line#-line#: analysis of the line. Song lyrics: 
      
      `+fileText }],
      model: "gpt-4-turbo",
    });
  
    console.log(completion.choices);
  }
  
  // runCompletion();
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full sm:max-w-2xl max-w-xs">
        <form
          className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4"
          action={formAction}
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
    </div>
  );
}
