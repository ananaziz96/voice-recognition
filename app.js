const btn = document.querySelector(".talk");
const content = document.querySelector(".content");

const greetings = [
  "i have been better",
  "that is none of your bussiness",
  "cant complain too much. how are you doing"
];

const weather = [
  "it is 90 degrees outside",
  "it is going to rain today",
  "it is quite sunny in arizona"
];

const wrongPrediction = ["shut up! you dont know anything"];

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
    const finalText = weather[Math.floor(Math.random() * weather.length)];
    speech.text = finalText;
  }

  if (message.includes("wrong prediction")) {
    const finalText =
      wrongPrediction[Math.floor(Math.random() * wrongPrediction.length)];
    speech.text = finalText;
  }

  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
}

//fetch weather data from openweathermap api
//needs auth
async function getWeatherReport() {
  const apiKey = "6e27a113797392f6dee5a23a3d7cc5ef";
  const cityName = "London";
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${cityName},uk&APPID=${apiKey}`
  );
  const myJson = await response.json();

  const temperature = myJson.weather;

  console.log(temperature);
}

getWeatherReport();
