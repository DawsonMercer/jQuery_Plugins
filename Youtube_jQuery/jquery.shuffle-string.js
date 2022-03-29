(function($){
    //this^ is a self inclosed function
    $.fn.shuffleString = function(options){
        //define the plug in ^ in jquery

        let settings = $.extend({
            color: "#000000",
            done: null
            //this ^ is default option if no color is provided
        }, options)
        return this.each(function(){
            //this ^ returns the html element selected
            $(this).text(shuffleString($(this).text()));
            $(this).css("color", settings.color);
            if($.isFunction(settings.done)){
                //this function checks that the function has finished and done no longer equals null
                settings.done.call(this);
            }

            function shuffleString(str){
                let array = str.split("");
                for (let index = array.length - 1; index> 0; index --){
                    let val = Math.floor(Math.random() * (index + 1));
                    let temp = array[index];
                    array[index] = array[val];
                    array[val] = temp;
                }
                return array.join("");

            }
        })
    }

}(jQuery)); //this separates the js variables from the jqery plug in file