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

        // <divclass="barChart"><divclass="colorBar"><divclass="redBar">&nbsp&nbsp</div></div><divclass="colorBar"><divclass="greenBar">&nbsp&nbsp</div></div><divclass="colorBar"><divclass="blueBar">&nbsp&nbsp</div></div></div>
        var scaleBackChart = .5;
        var barChartHeight = 255;
        var barChartWidth = 300;
        var $barChart = $('<div class="barChart"><svg xmlns="http://www.w3.org/2000/svg" width="300" height="' + barChartHeight * scaleBackChart + '" style="stroke-width: 0px;"><rect fill="red" x="' + 0 + '" y="' + Math.floor(barChartHeight - Number(ACArr[0])) * scaleBackChart + '" width="100" height="' + Number(ACArr[0]) * scaleBackChart + '"></rect><rect fill="green" x="' + 100 + '" y="' + Math.floor(barChartHeight - Number(ACArr[1])) * scaleBackChart + '" width="100" height="' + Number(ACArr[1]) * scaleBackChart + '"></rect><rect fill="blue" x="' + 200 + '" y="' + Math.floor(barChartHeight - Number(ACArr[2])) * scaleBackChart + '" width="100" height="' + Number(ACArr[2]) * scaleBackChart + '"></svg></div>');
        canvas.prepend($barChart);



        // update score
        if (score) {
            $('#scoreDisplay').text(score);
        }

        // this adds an "average" brightness div that might help the player
        // Based on color theory of perceived brightness based on human perception of different colors:
        // http://stackoverflow.com/questions/596216/formula-to-determine-brightness-of-rgb-color
        // lum = 0.33*R + 0.5*G + 0.168B 
        var lum2 = Math.floor((Number(ACArr[0]) * .33 + Number(ACArr[1]) * .5 + Number(ACArr[2]) * .16));
        var lumGray2 = 'rgba(' + lum2 + ', ' + lum2 + ', ' + lum2 + ', 1)';

        var lumDiv2 = $('<div>' + "the right color is about this dark&nbsp" + '</div>');

        lumDiv2.css('background-color', lumGray2)
        lumDiv2.attr('id', 'lum2');
        lumDiv2.addClass('lum');
        lumDiv2.appendTo(canvas);

        // Assume user starts the game not wanting hints, so hide the clues.
        if (!hints) {
            $('.barChart').css('opacity', 0);
            $('#lum2').css('opacity', 0)
        }
    } // end buildNewRound()

});

