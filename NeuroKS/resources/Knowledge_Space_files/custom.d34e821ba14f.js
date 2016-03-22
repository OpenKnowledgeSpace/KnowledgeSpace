$(document).ready(function() {
    $('.content').css('minHeight', $(window).height() - $('nav').height() - $('footer').height() - 50);

    $('.popover-el').popover({
        viewport: {
            selector: '.content',
            padding: 100
        },
        container: 'body',
        html: true
    });

    $('.tooltip-el').tooltip();
});
