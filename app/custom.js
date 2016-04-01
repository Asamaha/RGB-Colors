$(document).ready(function() {
    var wideArrColors = [];
    var canvas = $('div.container');
    var theAnswer = '';
    var rainbowSize = 5;
    var score = 0;
    var hints = false;
    var numWrong = 0;

    // run color game by calling my builder functions!
    makeAndHideDivs();
    buildNewRound();


    // game logic
    function buildNewRound() {
        //turn hints back off
        hints = false;

        // maybe player needs a hint
        if (numWrong > 3) {
            $('#toggleHints').addClass('sadGlow');
        } else {
            $('#toggleHints').removeClass('sadGlow');

        }

        }
         // populate wideArrColors array
        _.times(rainbowSize, function(index) {
            wideArrColors.push(newColor());
        });

        // produce the answer
        theAnswer = wideArrColors[_.random(0, rainbowSize - 1)];

        // make buttons
        _.each(wideArrColors, function(element, index, list) {
            var myDiv = $('<div>' + +'</div>');
            myDiv.attr('id', element);
            myDiv.addClass('choiceBtn');
            myDiv.css('background-color', element)
            myDiv.appendTo(canvas);

        });

        $('.choiceBtn').on('click', function(event) {
            if ($(this).attr('id') === theAnswer) {
                $(this).addClass('glow');
                $('#youWin').show(10, function() {
                    score++;
                    numWrong = 0;
                    anywhereClickReset();
                });
            } else {
                $('#youLose').show(10, function() {
                    $('.secretWinner').addClass('sadGlow');
                    numWrong++;
                    anywhereClickReset();
                });
            }
        });
});
