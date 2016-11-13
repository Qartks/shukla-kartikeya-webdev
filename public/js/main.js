
function main() {
    (function () {

        // When Loading

        $("#my-header")
            .velocity("fadeIn", { duration: 1500 });

        $("#bottom-section")
            .velocity("slideDown", { duration: 1500 });


        // Preloader
        $(window).load(function() {

            $("#status").fadeOut("slow");
            $("#preloader").delay(500).fadeOut("slow").remove();

        })

        var controller = new ScrollMagic.Controller();
        $('.my-panel').each(function () {
            var ourScene = new ScrollMagic.Scene({
                triggerElement: this.children[0],
                triggerHook: 0.7
            })
                .setClassToggle(this, 'fade-in')
                // .addIndicators()
                .addTo(controller);
        })

        var anchors = $('a.page-scroll');

        anchors.on('click', function(event) {

            if (this.hash !== "") {
                event.preventDefault();
                var hash = this.hash;
                $('html, body').animate({
                    scrollTop: $(hash).offset().top
                }, 800, function(){
                    window.location.hash = hash;
                });
            }
        });


        // When Document is loaded
        $(document).ready(function(){


        });


    })();
}

main();
