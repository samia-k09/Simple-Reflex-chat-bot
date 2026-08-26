const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat-box");
const welcomeScreen = document.getElementById("welcome-screen");
const newChatButton = document.getElementById("new-chat-button");


// ================= SIMPLE REFLEX AGENT =================

function getBotResponse(message) {

    const input = message.toLowerCase().trim();

    // Condition → Action rules

    if (input.includes("hello") || input.includes("hi")) {
        return "Hello! How can I help you today?";
    }

    else if (input.includes("how are you")) {
        return "I am doing well! Thank you for asking.";
    }

    else if (
        input.includes("your name") ||
        input.includes("who are you")
    ) {
        return "I am Reflex AI, a chatbot based on a Simple Reflex Agent.";
    }

    else if (input.includes("joke")) {
        return "Why do programmers prefer dark mode? Because light attracts bugs!";
    }

    else if (input.includes("simple reflex agent")) {
        return "A Simple Reflex Agent responds to the current input using predefined condition-action rules. It does not use memory.";
    }

    else if (input.includes("what can you do")) {
        return "I can respond to simple questions using predefined condition-action rules.";
    }

    else if (input.includes("thank")) {
        return "You're welcome! Happy to help.";
    }

    else if (input.includes("bye")) {
        return "Goodbye! Have a great day!";
    }

    else {
        return "I'm a Simple Reflex Agent, so I only respond to predefined conditions. Try asking me something like 'Hello', 'How are you?', or 'Tell me a joke'.";
    }
}


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
    }
    else {
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


// ================= SEND MESSAGE =================

function sendMessage() {

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


    // Get response from Simple Reflex Agent
    const response = getBotResponse(message);


    // Simulate small thinking delay
    setTimeout(function () {

        addMessage(response, "bot");

    }, 500);


    // Clear input
    userInput.value = "";
}


// ================= BUTTON EVENTS =================

sendButton.addEventListener("click", sendMessage);


userInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        sendMessage();
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

    chatBox.innerHTML = `
        <div class="welcome-screen">

            <div class="welcome-icon">✦</div>

            <h1>Hello, I'm Reflex AI.</h1>

            <p>
                A simple chatbot that responds using
                condition-action rules.
            </p>

        </div>
    `;

});