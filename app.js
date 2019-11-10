const btn = document.querySelector(".talk");
const content = document.querySelector(".content");

//
const greetings = [
  "i am good you little piece of shit",
  "doing good",
  "cant complain too much. how are you"
];

const weather = [
  "it is cold outside",
  "it is raining today",
  "it is quite sunny in arizona"
];

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = event => {
  const current = event.resultIndex;
  const transcript = event.results[current][0].transcript;
  content.textContent = transcript;
  readOutLoud(transcript);
  console.log(event);
};

//add the listener to th e button
btn.addEventListener("click", () => {
  recognition.start();
});

function readOutLoud(message) {
  const speech = new SpeechSynthesisUtterance();

  speech.text = "i dont know what you said";

  if (message.includes("how are you")) {
    const finalText = greetings[Math.floor(Math.random() * greetings.length)];
    speech.text = finalText;
  }

  if (message.includes("weather")) {
    const finalText = weather[Math.floor(Math.random() * greetings.length)];
    speech.text = finalText;
  }

  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
}
