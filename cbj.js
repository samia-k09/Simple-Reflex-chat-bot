const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat-box");
const welcomeScreen = document.getElementById("welcome-screen");
const newChatButton = document.getElementById("new-chat-button");


// ================= DISPLAY MESSAGE =================

function addMessage(message, sender) {

    const messageElement = document.createElement("div");

    messageElement.classList.add(
        "message",
        sender === "user"
            ? "user-message"
            : "bot-message"
    );


    const icon = document.createElement("div");

    icon.classList.add(
        "message-icon",
        sender === "user"
            ? "user-icon"
            : "bot-icon"
    );


    if (sender === "user") {
        icon.textContent = "U";
    } else {
        icon.textContent = "✦";
    }


    const content = document.createElement("div");

    content.classList.add("message-content");

    content.textContent = message;


    messageElement.appendChild(icon);
    messageElement.appendChild(content);

    chatBox.appendChild(messageElement);

    chatBox.scrollTop = chatBox.scrollHeight;
}


// ================= SEND MESSAGE TO GEMINI =================

async function sendMessage(event) {

    if (event) {
        event.preventDefault();
    }

    const message = userInput.value.trim();

    if (message === "") {
        return;
    }


    // Remove welcome screen
    if (welcomeScreen) {
        welcomeScreen.remove();
    }


    // Display user message
    addMessage(message, "user");


    // Clear input immediately
    userInput.value = "";


    try {

        // Send message to Flask backend
        const response = await fetch("/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })

        });


        const data = await response.json();


        if (!response.ok) {
            throw new Error(data.error || "Server error");
        }


        // Display Gemini response
        addMessage(data.response, "bot");


    } catch (error) {

        console.error("Error:", error);

        addMessage(
            "Sorry, I couldn't connect to the AI server. Please make sure the Flask backend is running.",
            "bot"
        );

    }
}


// ================= BUTTON EVENTS =================

sendButton.addEventListener("click", sendMessage);


userInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        sendMessage(event);
    }

});


// ================= SUGGESTION BUTTONS =================

const suggestions =
    document.querySelectorAll(".suggestion");


suggestions.forEach(function (button) {

    button.addEventListener("click", function () {

        userInput.value = button.textContent;

        sendMessage();

    });

});


// ================= NEW CHAT =================

newChatButton.addEventListener("click", function () {

    location.reload();

});