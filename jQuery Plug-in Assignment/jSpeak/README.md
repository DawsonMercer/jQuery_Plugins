# jSpeak jQuery Plug-in

##jSpeak allows a developer to add text-to-speech functionality to their webpage. This can be used to help people with learning disabilities, have trouble reading the text, or just for those who wish to read along with the spoken word content.

###How to add jSpeak plug-in to your webpage

1. download the jquery.jSpeak.js file and add the file name to the script section of the html page that you wish to have read aloud.
2. Add a div at the top of your page with an id of "jSpeakContainer"
3. Add the play.png and stop.png photos to a folder called "image"
4. In your javascript file, call the .jSpeak() method in order to build the jSpeak text-to-Speech plug-in and add it to your webpage.
5. add a selector to the .jSpeak() method. We suggest you call it as such - $("body").jSpeak(), however you may use any elements that you wish and does not have to include all of the body text.
6. Add optional customization - after calling .jSpeak() you may optionally pass in voiceStyle (0 - 5 in chrome), voiceSpeed (0.1 - 10), and textColor ( blue, yellow, green, pink, etc.).
