var utterance = new SpeechSynthesisUtterance();
var wordIndex = 0;
var global_words = [];
utterance.lang = 'en-UK';
utterance.rate = 1;



document.getElementById('button').onclick = function(){
    var text = $("body").text();
    text = $.trim(text);
    console.log("text -"+text);
    var words  = text.split(" ");
    console.log("words -"+words)
    global_words = words;
    // Draw the text in a div
    drawTextInPanel(words);
    spokenTextArray = words;
    utterance.text = text;
    speechSynthesis.speak(utterance);
};
$("#pause").click(()=>{
    speechSynthesis.cancel();
})

utterance.onboundary = function(event){
  	var e = document.getElementById('textarea');
  	var word = getWordAt(e.value,event.charIndex);
    // Show Speaking word : x
  	document.getElementById("word").innerHTML = word;
    //Increase index of span to highlight
    // console.info(global_words[wordIndex]);
    
    try{
    	document.getElementById("word_span_"+wordIndex).style.color = "blue";
    }catch(e){}
    
    wordIndex++;
};

utterance.onend = function(){
		document.getElementById("word").innerHTML = "";
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

function drawTextInPanel(words_array){
console.log("Dibujado");
		var panel = document.getElementById("panel");
  	for(var i = 0;i < words_array.length;i++){
          console.log("words_array " + words_array[i]);
    	var html = '<span id="word_span_'+i+'">'+words_array[i]+'</span>&nbsp;';
    	panel.innerHTML += html;
    }
}