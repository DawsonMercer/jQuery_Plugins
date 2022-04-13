(function($){

    $.fn.jSpeak = function(options){
        //TODO: add back options into option ^ removed for testing
        let settings = $.extend({
            speed: 1,
            backgroundColor: 'yellow'

        },options)

        return this.each(function(){
            let count = 0;
            let clicked = 0;
            let msg = new SpeechSynthesisUtterance();
            let voices = window.speechSynthesis.getVoices();
            // FIXME: shouldnt be minus 1 but it is
            let wordIndex = 0;
            let global_words = [];
            let bodyWords = $(this).text();
            // let bodyWords = $.trim($(this).text());
            console.log(bodyWords);
            let words = bodyWords.split(" ");
            console.log(words);
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
            console.log("trim and removed below");
            console.log(words);
            let isPlaying = false;

            let jSpeakhtml = `<img src="image/jSpeakLogo.png"width="150px" height="75px"><img src="image/play.png" id="actionButton" width="50px" height="50px"><br>`
            let jSpeakSpan = `<span id="jSpeakSpan" width="150px" height="75px">Spoken Words:</span>`
            jSpeakhtml += jSpeakSpan;
            // <img src="image/pause.png" id="pauseButton">`
            $("#jSpeakContainer").css("border", "5px solid black").css("width", "300px");
            $("#jSpeakContainer").html(jSpeakhtml);
            // $("#jSpeakContainer").html(jSpeakSpan);
            $("#jSpeakSpan").css("background-color", "yellow");
            // let msg;

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
                    $("#actionButton").attr("src", "image/pause.png");
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
            function say(bodyWords){
                console.log("inside say");
                // let msg = new SpeechSynthesisUtterance();
                // let voices = window.speechSynthesis.getVoices();
                msg.voice = voices[10];
                msg.voiceURI = "native";
                msg.volume = 1;
                msg.rate = 1;
                msg.pitch = 0.8;
                msg.text = bodyWords;
                msg.lang = 'en-US';
                return msg;
                // speechSynthesis.speak(msg);

            }
            let spanHTML= "";
            msg.onboundary = async function(event){
                
                let selectBody = $("body");
                console.log("event "+ event);
                
                let word = getWordAt(global_words[wordIndex], event.charIndex);
                //drawTextInPanel(words);
                // document.getElementById("word").innerHTML = word;
                console.log("word: "+ word);
                // console.log("event.charIndex "+ event.charIndex);
                // console.info("global word index "+global_words[wordIndex]);
                console.log("span index global "+ global_words[wordIndex]);
                if(global_words[wordIndex] == null){
                    console.log("UNDEFINED");
                }else{
                    if(global_words[wordIndex].includes(".")){
                        setTimeout(()=>{
                            console.log("timeout");
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
                console.log("global words: "+ global_words.length);
                console.log(count +"BOUNDARY");
                console.log(wordIndex +"wordIndex");
                // if(wordIndex == global_words.length){
                //     document.getElementById("actionButton").click();
                // }
            }

            function getWordAt(str, pos) {
                // Perform type conversions.
                str = String(str);
                pos = Number(pos) >>> 0;
            
                // Search for the word's beginning and end.
                var left = str.slice(0, pos + 1).search(/\S+$/),
                    right = str.slice(pos).search(/\s/);
            
                // The last word in the string is a special case.
                if (right < 0) {
                    return str.slice(left);
                }
                // Return the word, using the located bounds to extract it from the string.
                // console.log(str.slice(left, right + pos));
                return str.slice(left, right + pos);
            }

            let resetEverything = () =>{
                wordIndex = 0;
                global_words = [];
                $("#jSpeakSpan").html(`<span id="jSpeakSpan" width="150px" height="75px">Spoken Words:</span>`)
                bodyWords = $.trim($(this).text());
                console.log(bodyWords);
                words = bodyWords.split(" ");
                console.log(words);
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
                console.log(words);
                let isPlaying = false;
            }

            





        })








    }

}(jQuery));