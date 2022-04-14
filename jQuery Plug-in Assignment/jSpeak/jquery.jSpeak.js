(function($){

    $.fn.jSpeak = function(options){
        //optional customization settings of voiceStyle, voiceSpeed, textColor
        let settings = $.extend({
            voiceStyle: 0,
            voiceSpeed: 1,
            textColor: "yellow"

        },options)

        return this.each(function(){
            //calling upon this element that was tagged
            let count = 0;
            let clicked = 0;
            let msg = new SpeechSynthesisUtterance();
            let voices = window.speechSynthesis.getVoices();
            let wordIndex = 0;
            let global_words = [];
            //getting the text from the body
            let bodyWords = $(this).text();
            //removing characters that we do not want
            let words = bodyWords.split(" ");
            //console.log(words);
            function arrayRemove(arr, value){
                return arr.filter(function(ele){
                    return ele != value;
                });
            }
            words = arrayRemove(words, "\n");
            words = arrayRemove(words, "");
            words = arrayRemove(words, " ");
            // words = $.trim(words);
            for (let w in words){
                words[w] = words[w].replace(/(\r\n|\n|\r)/gm, "");
                // console.log(w);
            }
            
            let isPlaying = false;
            //automatically builds the jSpeak widget so that no additional coding is required
            let jSpeakhtml = `<img src="image/jSpeakLogo.png"width="200px" height="100px"><img src="image/play.png" id="actionButton" width="75px" height="75px"><br>`
            let jSpeakSpan = `<span id="jSpeakSpan" width="150px" height="75px">Spoken Words:</span>`
            jSpeakhtml += jSpeakSpan;
            
            $("#jSpeakContainer").css("border", "5px solid black").css("width", "300px");
            $("#jSpeakContainer").html(jSpeakhtml);
            
            $("#jSpeakSpan").css("background-color", settings.textColor);
            

            //gets the click on the actionButton to either pause or play text-to-speech
            $("#actionButton").click(() =>{
                global_words = words;
                if(isPlaying){
                    $("#actionButton").attr("src", "image/play.png");
                    console.log("Voice is stopped");
                    isPlaying = false;
                    speechSynthesis.cancel();
                    resetEverything();

                }
                else{
                    $("#actionButton").attr("src", "image/stop.png");
                    console.log("Voice is playing");
                    isPlaying = true;
                    if (clicked ==  0){
                        msg = say(bodyWords);
                        speechSynthesis.speak(msg);
                        clicked +=1;
                    }else{
                        speechSynthesis.speak(msg);
                    }
                }


            });

            //sets the speechSynthesis voice attributes based on settings and text
            function say(bodyWords){
                console.log("inside say");
                // let msg = new SpeechSynthesisUtterance();
                let voices = window.speechSynthesis.getVoices();
                msg.voice = voices[settings.voiceStyle];
                msg.voiceURI = "native";
                msg.volume = 1;
                msg.rate = settings.voiceSpeed;
                msg.pitch = 0.8;
                msg.text = bodyWords;
                msg.lang = 'en-US';
                return msg;
                // speechSynthesis.speak(msg);

            }

            let spanHTML= "";
            //everytime the speech is triggered, the lastest words will be displayed on the screen
            msg.onboundary = async function(event){
                let selectBody = $("body");
                if(global_words[wordIndex] == null){
                    // console.log("UNDEFINED");
                }else{
                    if(global_words[wordIndex].includes(".")){
                        setTimeout(()=>{
                            // console.log("timeout");
                            spanHTML += `<strong> ${global_words[wordIndex]}</strong>`
                            $("#jSpeakSpan").html(spanHTML);
                            wordIndex++;

                        },400);
                        
                        
                    }else{
                        spanHTML += `<strong> ${global_words[wordIndex]}</strong>`
                        $("#jSpeakSpan").html(spanHTML);
                        wordIndex++;
                    }

                }
                count++;
                
            }
            //when voice ends, click the stop button to trigger a reset
            msg.onend = event => {
                console.log("Finished speaking");
                setTimeout(()=>{
                    isPlaying = true;
                    $("#actionButton").trigger("click");

                },500)
             }

            
            //resets the array and the span that contains text in order to start from the beginning
            //creates an array and removes newline characters and unwanted spaces
            //sets isPlaying to false
            let resetEverything = () =>{
                wordIndex = 0;
                global_words = [];
                words = []
                $("#jSpeakSpan").text("");
                spanHTML= "";
                bodyWords = $.trim($(this).text());
                $("#jSpeakSpan").html(jSpeakSpan)
                // console.log(bodyWords);
                words = bodyWords.split(" ");
                // console.log(words);
                function arrayRemove(arr, value){
                    return arr.filter(function(ele){
                        return ele != value;
                    });
                }
                words = arrayRemove(words, "");
                words = arrayRemove(words, "\n");
                for (let w in words){
                    words[w] = words[w].replace(/(\r\n|\n|\r)/gm, "");
                    // console.log(w);
                }
                //console.log(words);
                let isPlaying = false;
            }

        })








    }

}(jQuery));