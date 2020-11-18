// Init SpeechSynth API
const synth = window.speechSynthesis;

//DOM UI
const inputForm = document.querySelector('form');
const txtInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');

let voices = [];

const populateVoiveList = () => {
  voices = synth.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement('option');

    option.textContent = voice.name + '(' + voice.lang + ')';

    //Set needed option attributes
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);
  });
};

populateVoiveList();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = populateVoiveList;
}

//Speck
const speak = () => {
  //Check if is Speacking
  if (synth.speaking) {
    console.error('...Already Speacking');
    return;
  }
  if (txtInput.value !== '') {
    document.querySelector('body').style.background = '#000 url(img/wave.gif)';
    document.querySelector('body').style.backgroundRepeat = 'repeat-x';
    document.querySelector('body').style.backgroundSize = '100% 100%';

    const speakText = new SpeechSynthesisUtterance(txtInput.value);

    //Done Speaking
    speakText.onend = (e) => {
      console.log('Done speaking...');
      document.querySelector('body').style.background = '#000';
    };

    //Speak Error
    speakText.onerror = (e) => {
      console.log('Something went wrong');
    };

    // Selected voice
    const selectedVoive = voiceSelect.selectedOptions[0].getAttribute(
      'data-name'
    );

    voices.forEach((voice) => {
      //If clicked each voice then speak that voice
      if (voice.name === selectedVoive) {
        speakText.voice = voice;
      }
    });

    // set pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = rate.value;

    synth.speak(speakText);
  }
};

//Form Submit
inputForm.addEventListener('submit', (e) => {
  e.preventDefault();
  speak();
  txtInput.blur();
});

//Rate Value Change
rate.addEventListener('change', (e) => (rateValue.textContent = rate.value));

//Pitch Value Change
pitch.addEventListener('change', (e) => (pitchValue.textContent = pitch.value));

//Voice Select Change
voiceSelect.addEventListener('change', (e) => speak());
