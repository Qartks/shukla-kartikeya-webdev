function main() {
    (function () {

        // *************************************************** When Loading
        $("#my-header")
            .velocity("fadeIn", {duration: 1500});


        // *************************************************** Preloader
        $(window).load(function () {

            $("#status").fadeOut("slow");
            $("#preloader").delay(500).fadeOut("slow").remove();

        });


        // ***************************************************  ScrollMagic Fade-in
        var controller = new ScrollMagic.Controller();
        $('.my-panel').each(function () {
            var ourScene = new ScrollMagic.Scene({
                triggerElement: this.children[0],
                triggerHook: 0.8
            })
                .setClassToggle(this, 'fade-in')
                .addTo(controller);
        });


        // *************************************************** Velocity Scrolling
        $('a[href^="#"]').click(function () {
            $(this.hash).velocity('scroll', {duration: 900});
        });


        // ***************************************************  When Document is loaded
        $(document).ready(function () {


            // ***************************************************  Hover
            $('.about-title').hover(flip180, flip0);
            $('.work-title').hover(flip180, flip0);
            $('.projects-title').hover(flip180, flip0);
            $('.social-title').hover(flip180, flip0);

            // $("#card").flip({
            //     axis: 'y',
            //     trigger: 'hover'
            // });

            // *************************************************** Helper Function for Hover
            function flip180() {
                $(this)
                    .velocity('stop')
                    .velocity( { rotateY : '180deg' }, { duration: 800 });
            }
            function flip0() {
                $(this)
                    .velocity('stop')
                    .velocity( { rotateY : '0deg'}, { duration: 800 });
            }


            // *************************************************** Reveal
            $('.about-title').on('click', {title: ".about-title", content: ".about-content"},  DisplayContents);
            $('.work-title').on('click', {title: ".work-title", content: ".work-content"},  DisplayContents);
            $('.projects-title').on('click', {title: ".projects-title", content: ".projects-content"},  DisplayContents);
            $('.social-title').on('click', {title: ".social-title", content: ".social-content"},  DisplayContents);


            // *************************************************** Helper Function to reveal
            function DisplayContents(event) {

                var title = $(event.data.title);
                var content = $(event.data.content);
                var parent = $(this.parentElement.parentElement.parentElement);
                console.log($(parent).context.clientHeight);
                if (content.css('display') == 'none') {
                    $(parent).animate100("both", 800, function () {
                        title
                            .velocity("fadeIn", { duration: 500 });
                        content
                            .toggleClass('reveal')
                            .velocity( { opacity: 1 }, { duration: 500 }, "easeInSine");
                    });
                } else {

                    title
                        .velocity("fadeOut", { duration: 500 })
                        .velocity("fadeIn", { duration: 30 });
                    content
                        .velocity( { opacity: 0 }, { duration: 500 ,  complete: function () {
                            content.toggleClass('reveal');
                            Temp();
                        } },  "easeOutSine" );

                    function Temp() {
                        $(parent).animateAuto("both", 800);
                    }


                }
            }

            jQuery.fn.animate100 = function(prop, speed, callback){
                var elem, height, width;
                return this.each(function(i, el){
                    el = jQuery(el), elem = el.clone().css({"height":"100%","width":"100%", "opacity" : "0"}).appendTo("body");
                    height = elem.css("height"),
                        width = elem.css("width"),
                        elem.remove();

                    if(prop === "height")
                        el.animate({"height":height}, speed, callback);
                    else if(prop === "width")
                        el.animate({"width":width}, speed, callback);
                    else if(prop === "both")
                        el.animate({"width":width,"height":height}, speed, callback);
                });
            }

            jQuery.fn.animateAuto = function(prop, speed, callback){
                var elem, height, width;
                return this.each(function(i, el){
                    el = jQuery(el), elem = el.clone().css({"height":"0%","width":"100%"}).appendTo("body");
                    height = elem.css("height"),
                        width = elem.css("width"),
                        elem.remove();

                    if(prop === "height")
                        el.animate({"height":height}, speed, callback);
                    else if(prop === "width")
                        el.animate({"width":width}, speed, callback);
                    else if(prop === "both")
                        el.animate({"width":width,"height":height}, speed, callback);
                });
            }


        });


        // *************************************************** Parallax
        function initParallax() {
            $('.parallax').parallax("100%", 0.3);
        }
        initParallax();

    })();
}

main();
