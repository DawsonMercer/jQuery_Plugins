# jSpeak jQuery Plug-in

## jSpeak allows a developer to add text-to-speech functionality to their webpage. 
## This can be used to help people with learning disabilities, for peopple who have trouble reading the text on a webpage, or just for those who wish to read along with the spoken word content. 

### How to add jSpeak plug-in to your webpage

1. Download the __jquery.jSpeak.js__ file and add the file name to the script section of the html page that you wish to have read aloud.
 2. Add a __div element__ at the top of your page with an id of __"jSpeakContainer"__
  3. Add the __play.png__ and __stop.png__ photos to a folder called __"image"__
  4. In your javascript file, call the __.jSpeak()__ method in order to build the jSpeak text-to-Speech plug-in and add it to your webpage. (only needs to be called once)
 5. add a selector to the .jSpeak() method. We suggest you call it as such - __$("body").jSpeak()__, however you may call any elements that you wish to have read and does not have to include all of the body text.
 6. Add optional customization __see jsfile.js for example__ - after calling .jSpeak() you may __optionally__ pass in __voiceStyle__ (index of 0,1,2,3, or 4 on windows in chrome (voices may very per machine and browser)), __voiceSpeed__ (0.1 - 2), and __textColor__ ( blue, yellow, green, pink, etc.).
