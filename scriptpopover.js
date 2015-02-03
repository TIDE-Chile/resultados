/*$(function() {
        $("mypop").popover({
        html: true,
    placement: 'bottom',
    title:'tfsfdsfdf sdsdff',
  
*/
var $elements = $('.my-popover');
$elements.each(function () {
    var $element = $(this);
    
    $element.popover({
        html: 'true',
        placement: 'button',
        container: $('body'), // This is just so the btn-group doesn't get messed up... also makes sorting the z-index issue easier
        content: $('#content').html()
    });
    
    $element.on('shown.bs.popover', function () {
        var popover = $element.data('bs.popover');
        if (typeof popover !== "undefined") {
            var $tip = popover.tip();
            zindex = $tip.css('z-index');
            
            $tip.find('.close').bind('click', function () {
                popover.hide();
            });
            
            $tip.mouseover(function () {
                $tip.css('z-index', function () {
                    return zindex + 1;
                });
            })
                .mouseout(function () {
                $tip.css('z-index', function () {
                    return zindex;
                });
            });
        }
    });
});