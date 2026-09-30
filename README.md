# AI-Powered Chatbot

An AI-powered web chatbot that uses Natural Language Processing (NLP) and Google's Gemini AI to generate intelligent and context-aware responses.

## Project Overview

This project started as a simple reflex chatbot and was enhanced into an AI-powered chatbot with a Python backend.

The chatbot accepts user messages through a web interface, processes the input using NLTK, sends the conversation context to Gemini AI, and generates a natural-language response.

User interactions are also stored in a SQLite database for conversation logging and contextual responses.

## Features

- AI-generated responses using Google Gemini
- Natural Language Processing using NLTK
- Context-aware conversation
- Conversation history using SQLite
- Flask REST API backend
- Interactive web-based chatbot interface
- User-friendly chat interface
- Secure API key handling through environment variables
- Error handling for invalid or empty messages

## Technologies Used

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Python
- Flask
- Flask-CORS

### AI & NLP
- Google Gemini API
- NLTK

### Database
- SQLite

### Development Tools
- Visual Studio Code
- Git
- GitHub

## Project Structure

```text
Simple-Reflex-chat-bot/
│
├── Backend/
│   ├── app.py
│   ├── chatbot.py
│   ├── database.py
│   └── chatbot.db
│
├── app.py
├── index.html
├── cb.css
├── cbj.js
├── requirements.txt
├── .gitignore
├── .python-version
└── README.md
