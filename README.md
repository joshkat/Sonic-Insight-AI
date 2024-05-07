# Song Lyric Annotation with ChatGPT API
## Overview
This project aims to provide annotations for song lyrics using AI, leveraging the power of AI to analyze and annotate lyrics with relevant information, interpretations, and insights.
## Features
- **Lyric Annotation**: The core functionality involves feeding song lyrics into the ChatGPT API to generate annotations.
- **Contextual Insights**: ChatGPT provides contextual insights into the lyrics, offering interpretations, explanations, and connections to themes, emotions, and literary devices.
- **Interactive Interface**: Users can input song lyrics and receive annotated outputs through an intuitive and user-friendly interface.
- **Customization**: The system allows users to customize the depth and style of annotations according to their preferences.
## Technologies Used
- **ChatGPT API**: Utilized for generating annotations and insights.
- **Python**: Used for the script to get the lyrics.
- **Next.js**: Used for the front-end and backend
1. **Input Lyrics**: Users can input song lyrics either through a text input or by uploading a file.
2. **Analyze**: The system sends the lyrics to the ChatGPT API for analysis.
3. **View Annotations**: The annotated lyrics are displayed to the user, providing insights and interpretations.
## Installation
1. Setup .env and then the below steps
```
npm i
npm run dev
```
## Future Enhancements
- **Multi-Language Support**: Extend the system to support lyrics in multiple languages.
- **Integration with Music Streaming Platforms**: Integrate with music streaming platforms to directly analyze and annotate song lyrics from their databases.
- **Enhanced Visualization**: Implement visualization tools to present annotations in a more engaging and informative manner.

.env.local should look like the following, but replace the key with your own OPENAI key
```
MONGODB_URI=mongodb://127.0.0.1:27017/sonic-insight
MONGODB_DB_NAME=sonic-insight
OPENAI_API_KEY=abcdefghijklmnopqrstuvwxyz
GENIUS="abcasd"
```
note how the value for the genius variable is within quotes
