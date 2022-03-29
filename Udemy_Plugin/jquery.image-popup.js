//jQuery function
(function($){
    //default function to call itself. 
    $.fn.imagePopup = function(options){
        //adding optional settings below. extend == json?
        let settings = $.extend({
            overlay: 'rgba(0,0,0,0.5)',
            closeButton: {
                src: null,
                width: "30px",
                height: "30px"
            },
            imageBoarder: "5px solid #ffffff",
            boarderRadius: "5px",
            imageWidth: "500px",
            imageHeight: "400px",
            imageCaption: {
                exist: true,
                color: "#ffffff",
                fontSize: "20px"
            },
            open: null,
            close: null

        }, options)
        /**
         * iterating through each image in the gallery below
         */
        return this.each(function(){
            /**
             * decalring new element(s) variable below
             */
            let $overlay, $closeButton, $image, $imageCaption;
            setOverlayProperties();
            setCloseButtonProperties();
            setImageProperties();

            $(this).find("a").on("click", function(event){
                event.preventDefault();

                let imageSource = $(this).children("img").attr("src");
                $image.attr("src", imageSource);


                if(settings.imageCaption.exist == true){
                    let caption = $(this).children("img").attr("alt");
                    $imageCaption.text(caption);
                }

                if ($.isFunction(settings.open)){
                    settings.open.call(this);
                }
                //$overlay.css({opacity: 0.1}).show().animate({opacity: 1});
                $overlay.fadeIn(500);
            })

            function setImageProperties(){
                $image = $('<img>');
                $image.css({
                    "width": settings.imageWidth,
                    "height": settings.imageWidth,
                    "border": settings.imageBoarder,
                    "border-radius": settings.boarderRadius
                });
                $overlay.append($image);

                if (settings.imageCaption.exist == true){
                    $imageCaption = $('<p></p>');
                    $imageCaption.css({
                        "color": settings.imageCaption.color,
                        "font-size": settings.imageCaption.fontSize
                    });
                    $overlay.append($imageCaption);
                }

            }

            function setOverlayProperties(){
                $overlay = $('<div></div>');
                $overlay.css({
                    "background": settings.overlay,
                    "position": "absolute",
                    "top": "0px",
                    "left": "0px",
                    "display": "none",
                    "text-align": "center",
                    "width": "100%",
                    "height": "100%",
                    "padding-top": "5%"
                });
                $("body").append($overlay);


            }
            function setCloseButtonProperties(){
                let prop = {
                    "color": "white",
                    "cursor": "pointer",
                    "font-size": "20px",
                    "width": settings.closeButton.width,
                    "height": settings.closeButton.height,
                    "position": "absolute",
                    "top": "5px",
                    "right": "5px",
                    "border": "0px",
                    "z-index": "1"
                };

                if(settings.closeButton.src){
                    $closeButton = $('<img>');
                    $closeButton.attr("src", settings.closeButton.src);

                }else{
                    $closeButton = $('<span>X</span>');
                }

                $closeButton.css(prop);
                $overlay.append($closeButton);

            }
            $closeButton.click(function(){
                // $overlay.animate({opacity: 0.1}, function(){
                //     $overlay.hide();
                // })

                if($.isFunction(settings.close)){
                    settings.close.call(this);
                }
                $overlay.fadeOut(500)
            })


        })
    }

}(jQuery));