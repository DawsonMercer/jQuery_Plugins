"use strict";
let say = (m)=>{
    console.log("inside say");
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[10];
    msg.voiceURI = "native";
    msg.volume = 1;
    msg.rate = 1;
    msg.pitch = 0.8;
    msg.text = m;
    msg.lang = 'en-US';
    speechSynthesis.speak(msg);
}


$(document).ready(()=>{
    console.log("say.js file loaded");
    $("#word").click(()=>{
        say($("#word").text());
        console.log("clicked");

    })

});