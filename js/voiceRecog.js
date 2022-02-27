import * as voiceKey from './voiceKey.js';

const btn = document.querySelector('.voice-command');
const content = document.querySelector('.content');
const userVoiceInput = document.querySelector('.user-voice-input');

const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new speechRecognition();

recognition.lang = 'en-US';
recognition.continuous = true;
recognition.interimResults = true;
recognition.interimResults = false;
recognition.maxAlternatives = 1;
    
function doSomething(){
    alert('Have fun with frontend');
}


recognition.onstart = (event)=>{
    btn.children[0].innerHTML=`<div class="dot-container">
                                    <div class="dot"></div>
                                    <div class="dot"></div>
                                    <div class="dot"></div>
                                </div>`;
};

recognition.onresult = (event)=>{
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    const lowerTrans = transcript.toLowerCase();
    userVoiceInput.innerText = transcript;
    userVoiceInput.style.display = "block";

    for (const [key, value] of Object.entries(voiceKey.voiceKeyVal)) {
        if(lowerTrans.includes(key.toLowerCase())){
            if(typeof(value) === 'string'){
                speak(value);
                return;
            }
            else if(typeof(value) === 'function'){
                value();
                return;
            }
        }  
    }
};

btn.addEventListener('click', (element)=>{
    try{
        if(btn.children[0].children[0].classList.value.includes('fa-microphone')){
            btn.children[0].innerHTML=`<div class="dot-container">
                                    <div class="dot"></div>
                                    <div class="dot"></div>
                                    <div class="dot"></div>
                                </div>`;
            recognition.start();
        }
        else{
            btn.children[0].innerHTML=`<i class="fas fa-microphone fa-3x"></i>`;
            userVoiceInput.style.display = "none";
            recognition.stop();
            speechSynthesis.cancel();
        }
    }
    catch(e){}
});

async function speak(message){
    const speech = new SpeechSynthesisUtterance();
    speech.text = message;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    await window.speechSynthesis.speak(speech);
}

export {doSomething,recognition,speak,btn};