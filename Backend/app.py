import os

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

from chatbot import get_bot_response
from database import create_database, save_conversation


# Project root folder
BASE_DIR = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..")
)


app = Flask(
    __name__,
    static_folder=BASE_DIR,
    static_url_path=""
)

CORS(app)

create_database()


# ================= FRONTEND =================

@app.route("/")
def home():
    return send_from_directory(BASE_DIR, "index.html")


# ================= CHAT API =================

@app.route("/chat", methods=["POST"])
def chat():

    data = request.get_json()

    user_message = data.get("message", "").strip()

    if not user_message:
        return jsonify({
            "error": "Message cannot be empty"
        }), 400

    bot_response = get_bot_response(user_message)

    save_conversation(
        user_message,
        bot_response
    )

    return jsonify({
        "response": bot_response
    })


# ================= RUN SERVER =================

if __name__ == "__main__":

    port = int(
        os.environ.get("PORT", 5000)
    )

    app.run(
        host="0.0.0.0",
        port=port,
        debug=True
    )