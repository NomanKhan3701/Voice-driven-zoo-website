import * as voiceRecog from './voiceRecog.js';
import * as anim from "./animalsDetails.js";

var voiceKeyVal = {
    "hi" : "Hello, how may i help you",
    "hai" : "Hello, how may i help you",
    "How will you help me" : "I am an ai assistant which will do your work when you give a voice command",
    "what can you do" : "I am an ai assistant which will do your work when you give a voice command",
    "How can you help me" : "I am an ai assistant which will do your work when you give a voice command",
    "command" : voiceRecog.doSomething,
    "scroll to top" : scrollToTop,
    "scroll to bottom" : scrollToBottom,
    "scroll" : scrollALittle,
    "go to map" : goToMap,
    "go to animals" : goToAnimals,
    "homepage" : goToHome,
    "home page" : goToHome,
    "Read animal": readAnimals
}

function goToMap(){
    window.open("index.html#map-container","_self");
    const pageLink = document.querySelectorAll('.page-link a');
    pageLink.forEach(element => {
        element.classList.remove('active');
        if(element.innerText==="Map"){
            element.classList.add('active');
        }
    });          
}

function goToAnimals(){
    window.open("animals.html","_self");
    const pageLink = document.querySelectorAll('.page-link a');
    pageLink.forEach(element => {
        element.classList.remove('active');
        if(element.innerText==="Animals"){
            element.classList.add('active');
        }
    });       
}

function goToHome(){
    window.open("index.html","_self");
    const pageLink = document.querySelectorAll('.page-link a');
    pageLink.forEach(element => {
        element.classList.remove('active');
        if(element.innerText==="Home"){
            element.classList.add('active');
        }
    });          
}

function readAnimals(){
    const animalContainer = document.querySelector(".animal-container");
    const animal = animalContainer.querySelectorAll(".animal-container .animal");
    var i=1;
    var message;
    animal.forEach(function(elem){
        const animalName = elem.querySelector(".animal-name").innerHTML;
        const animalInfo = elem.querySelector(".animal-info").innerHTML;
        if(i===1){
            message=`Our first animal is ${animalName}`;
            voiceRecog.speak(message);
            voiceRecog.speak(animalInfo);
            i=2;
        }
        else{
            message=`Our next animal is ${animalName}`;
            voiceRecog.speak(message);
            voiceRecog.speak(animalInfo);
        }
    });
}

function scrollALittle(){
    window.scrollBy(0,400);
}

function scrollToTop(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function scrollToBottom(){
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
}

function goToElement(id){
    var element = document.getElementById(id);
    element.scrollTop = element.scrollHeight - element.clientHeight;
}

export {voiceKeyVal};