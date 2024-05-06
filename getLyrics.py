import sys
import json
import io
from lyricsgenius import Genius
import os 
# Replace with your Genius API token
# token = os.environ['GENIUS']

def main(song_name, artist_name, token):
    
    genius = Genius(token)
    genius.verbose = False

    song = genius.search_song(song_name, artist_name)

    if song is None:
        print(f"Song not found: {song_name} by {artist_name}")
        sys.exit(1)
    else:
        file_name = str(song.title.replace(" ", '')) + "_" + str(song.artist.replace(" ", '')) + ".json"
        song.to_json(file_name)

        # Create a TextIOWrapper with UTF-8 encoding
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

        # Print the lyrics
        print(song.lyrics)

        sys.exit(0)

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python getLyrics.py <song_name> <artist_name>")
        sys.exit(1)

    song_name = sys.argv[1]
    artist_name = sys.argv[2]
    token = sys.argv[3]
    main(song_name, artist_name, token)