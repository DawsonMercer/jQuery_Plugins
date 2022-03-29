$("#imageGallery").imagePopup({
    overlay: "rgba(0,100,0,0.5)",
    closeButton: {
        src: "images/close.png",
        width: "40px",
        height: "40px"
    },
    imageBoarder: "15px solid #ffffff",
    boarderRadius: "10px",
    imageWidth: "500px",
    imageHeight: "400px",
    imageCaption: {
        exist: true,
        color: "#ffffff",
        fontSize: "40px"
    },
    open: function(){
        console.log("opened");
    },
    close: function(){
        console.log("closed");
    }

});