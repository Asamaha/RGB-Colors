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

        // add this class the old-school way with DOM selectors so that I can finally go to sleep without jQuery and Sizzle exploding about how rgba(###, ###, ###, 1) looks like an invalid script injection
        // (this flags the correct answer, so I can show it if the user doesn't select it)
        var temp = document.getElementById(theAnswer);
        $(temp).addClass('secretWinner');
        // end button generation
        
        // demo value for theAnswer: "rgba(202, 67, 118, 1)""
        // creats a header with hinted colors in the background based on current value of theAnswer
        var ACArr = theAnswer.split(', ');
        ACArr[0] = ACArr[0].slice(5);
        ACArr[3] = ACArr[0].slice(0, -1);
        var displayAnswer = $('<div><p>which color is:</p>rgb(' + '<span class="red">' + padTextNumber(ACArr[0]) + '</span>,' + '<span class="green">' + padTextNumber(ACArr[1]) + '</span>,' + '<span class="blue">' + padTextNumber(ACArr[2]) + '</span>' + ')</div>');
        displayAnswer.attr('id', 'theAnswer');
        displayAnswer.addClass('gameTalk');
        canvas.prepend(displayAnswer);
});

