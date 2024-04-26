export default function Home() {
  async function formAction(formData) {
    "use server";
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
      // work with file
      console.log(rawFormData);
    }
    // otherwise throw an error
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full sm:max-w-2xl max-w-xs">
        <form
          className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4"
          action={formAction}
        >
          <div class="flex flex-col gap-6">
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
