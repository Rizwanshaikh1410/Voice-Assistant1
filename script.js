const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const voiceBtn = document.getElementById("voice-btn");

let voiceEnabled = true;

// Add message to chat
function addMessage(content, sender) {
  const msg = document.createElement("div");
  msg.className = "message " + (sender === "user" ? "user-message" : "david-message");
  msg.textContent = content;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Speech Synthesis
function speak(text) {
  if(!voiceEnabled) return;
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  synth.speak(utterance);
}

// Ask AI backend
async function askDavid(question) {
  addMessage(question, "user");

  try {
    const response = await fetch("/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: question })
    });

    const answer = await response.text();
    addMessage(answer, "david");
    speak(answer);
  } catch(err) {
    addMessage("Sorry, AI backend error!", "david");
  }
}

// Send button
sendBtn.addEventListener("click", () => {
  const question = userInput.value.trim();
  if(question) {
    askDavid(question);
    userInput.value = "";
  }
});

// Enter key
userInput.addEventListener("keypress", (e) => {
  if(e.key === "Enter") sendBtn.click();
});

// Voice recognition
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";
recognition.interimResults = false;

voiceBtn.addEventListener("click", () => recognition.start());

recognition.addEventListener("result", (e) => {
  const text = e.results[0][0].transcript;
  askDavid(text);
});
