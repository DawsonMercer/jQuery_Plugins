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
    $("body").click(()=>{
        let text = $("body").text();
        var words   = text.split(".");
        console.log(words.length);
        console.log(words);
        $("h1").css("background-color", "yellow");
        console.log(words[1]);
        
        say(text);

        console.log("clicked");

    })

});