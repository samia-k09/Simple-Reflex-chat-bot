import os
import nltk
from nltk.tokenize import word_tokenize
from google import genai

from database import get_recent_conversations


# ================= NLTK SETUP =================

try:
    nltk.data.find("tokenizers/punkt_tab")
except LookupError:
    nltk.download("punkt_tab")


def preprocess(message):
    """
    Preprocess user input using NLTK.
    Converts text to lowercase and tokenizes it.
    """

    message = message.lower().strip()

    tokens = word_tokenize(message)

    return tokens


# ================= GEMINI SETUP =================

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY is not set")

client = genai.Client(api_key=api_key)


# ================= CHATBOT =================

def get_bot_response(message):

    # NLTK preprocessing
    tokens = preprocess(message)

    # Convert tokens back into normalized text
    normalized_message = " ".join(tokens)


    # Get previous conversations from SQLite
    history = get_recent_conversations(6)


    # Create conversation history for Gemini
    history_text = ""

    for user_message, bot_response in history:

        history_text += f"""
User: {user_message}
Reflex AI: {bot_response}
"""


    # ================= GEMINI PROMPT =================

    prompt = f"""
You are Reflex AI, a helpful and friendly AI chatbot.

Your task is to answer the user's current message naturally
while using the previous conversation when it is relevant.

IMPORTANT:
- Use the conversation history to understand follow-up questions.
- Maintain context between messages.
- Do not mention that you are reading a database.
- Keep responses reasonably concise.
- If you do not know something, say so instead of making up information.

Previous conversation:
{history_text}

Current user message:
{message}

NLP processed tokens:
{normalized_message}

Answer the current user message:
"""


    # Send request to Gemini

    response = client.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=prompt
    )


    return response.text