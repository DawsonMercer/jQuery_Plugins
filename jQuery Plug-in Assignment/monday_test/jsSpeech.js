var utterance = new SpeechSynthesisUtterance();
var wordIndex = 0;
var global_words = [];
utterance.lang = 'en-UK';
utterance.rate = 1;


document.getElementById('playbtn').onclick = function(){
    var text    = $("body").text()
    // var text = document.getElementById('textarea').textContent;
    var words   = text.split(" ");
    global_words = words;
    // Draw the text in a div
    drawTextInPanel(words);
    spokenTextArray = words;
    utterance.text = text;
    speechSynthesis.speak(utterance);
};

utterance.onboundary = function(event){
    // var e = document.getElementById('textarea');
    var e = $('body');
    var word = getWordAt(e.val(),event.charIndex);
    // Show Speaking word : x
  	document.getElementById("word").innerHTML = word;
    //Increase index of span to highlight
    console.info(global_words[wordIndex]);
    
    try{
    	document.getElementById("word_span_"+wordIndex).style.background = "yellow";
        // console.log(wordIndex);
    }catch(e){
        console.error(e);
    }
    
    wordIndex++;
};

utterance.onend = function(){
	// document.getElementById("word").innerHTML = "";
    wordIndex = 0;
    document.getElementById("panel").innerHTML = "";
};

// Get the word of a string given the string and the index
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
    return str.slice(left, right + pos);
}

}
