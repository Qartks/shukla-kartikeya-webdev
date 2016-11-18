function main() {
    (function () {

        $(window).load(function() {

            var $container = $('.project-items');
            $container.isotope({
                filter: '*',
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });

            $('.cat a').click(function() {
                $('.cat .active').removeClass('active');
                $(this).addClass('active');
                var selector = $(this).attr('data-filter');
                $container.isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false
                    }
                });
                return false;
            });

        });



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
        {
            new ScrollMagic.Scene({triggerElement: ".my-panel.is-light"}).setClassToggle("nav", "is-dark").addTo(controller);
        }


        // *************************************************** Velocity Scrolling
        $('a[href^="#"]').click(function () {
            $(this.hash).velocity('scroll', {duration: 900});
        });


        // ***************************************************  When Document is loaded
        $(document).ready(function () {

            // ***************************************************  Hover
            // $('.about-title').hover(flip180, flip0);
            // $('.work-title').hover(flip180, flip0);
            // $('.projects-title').hover(flip180, flip0);
            // $('.about-title').hover(changeText, changeBack);

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

            function changeText() {
                $('.up').velocity({
                    opacity : 0
                });
                $('.down')
                    .velocity({
                        translateY: "0%",
                        opacity : 1
                    });
            }

            function changeBack() {
                $('.up').velocity({
                    opacity: 1
                });
                $('.down')
                    .velocity({
                    translateY: "-200%",
                    opacity : 0
                });
            }


            // *************************************************** Reveal
            $('.about-title').on('click', {title: ".about-title", content: ".about-content", percent: "75%"},  DisplayContents);
            $('.work-title').on('click', {title: ".work-title", content: ".work-content", percent: "100%"},  DisplayContents);
            $('.projects-title').on('click', {title: ".projects-title", content: ".projects-content", percent: "75%"},  DisplayContents);
            $('.social-title').on('click', {title: ".social-title", content: ".social-content", percent: "30%"},  DisplayContents);
            $('.section-title').on('click', {title: ".section-title", content: ".section-content", percent: "50%"},  DisplayContents);


            // *************************************************** Helper Function to reveal
            function DisplayContents(event) {

                var title = $(event.data.title);
                var content = $(event.data.content);
                var pert = event.data.percent;
                var parent = $(this.parentElement.parentElement.parentElement);

                if (content.css('display') == 'none') {

                    $(parent).animateDiv("height", 800, pert, function () {

                        content
                            .toggleClass('reveal')
                            .velocity( { opacity: 1 }, { duration: 500 }, "easeInSine");
                    })
                        .velocity("scroll", 800);
                } else {

                    content
                        .velocity( { opacity: 0 }, { duration: 1000 ,  complete: function () {
                            content.toggleClass('reveal');
                            Temp();
                        } },  "easeOutSine" );

                    function Temp() {
                        $(parent).animateDiv("height", 1200, "auto")
                                // .velocity('scroll', 300);
                    }


                }
            }

            jQuery.fn.animateDiv = function(prop, speed, method, callback){
                var elem, height, width;
                return this.each(function(i, el){
                    el = jQuery(el), elem = el.clone().css({ "height": method ,"width":"100%" }).appendTo("body");
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
            };

        });


        // *************************************************** Parallax
        function initParallax() {
            $('.parallax').parallax("100%", 0.3);
        }
        initParallax();

    })();
}

main();
