const startBtn = document.getElementById('start-btn');
const responseEl = document.getElementById('response');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.continuous = false;

startBtn.addEventListener('click', () => {
  recognition.start();
  responseEl.textContent = "Listening...";
});

recognition.addEventListener('result', (e) => {
  const command = e.results[0][0].transcript.toLowerCase();
  handleCommand(command);
});

function speak(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  synth.speak(utterance);
  responseEl.textContent = text;
}

function handleCommand(command) {
  console.log('Command:', command);

  // Basic commands
  if(command.includes('hello') || command.includes('hi')) {
    speak("Hello! How can I help you today?");
  } 
  else if(command.includes('your name')) {
    speak("I am David, your voice assistant.");
  } 
  else if(command.includes('open youtube')) {
    speak("Opening YouTube");
    window.open("https://www.youtube.com", "_blank");
  } 
  else if(command.includes('open google')) {
    speak("Opening Google");
    window.open("https://www.google.com", "_blank");
  } 
  else if(command.includes('back')) {
    speak("Going back");
    window.history.back();
  } 
  else {
    speak("Sorry, I didn't understand that.");
  }
}
