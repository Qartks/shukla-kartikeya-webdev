

 // When Loading

$("#my-header")
    .velocity("fadeIn", { duration: 1500 });

$("#bottom-section")
    .velocity("slideDown", { duration: 1500 });


 // When Document is loaded
$(document).ready(function(){

    var controller = new ScrollMagic.Controller();

    $('.my-panel').each(function () {

        var ourScene = new ScrollMagic.Scene({
            triggerElement: this.children[0],
            triggerHook: 0.7
        })
            .setClassToggle(this, 'fade-in')
            // .addIndicators()
            .addTo(controller);

        console.log(this);

    })
});

