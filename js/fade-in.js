window.addEventListener('DOMContentLoaded', function(){
    var startCounting = function(){
        var countingSpans = document.getElementsByClassName('main__our-realization-count'),
            countingSpansAmount = countingSpans.length,
            countingEnding = [];
        var countIt = function(element, ending){
            var currentValue = Number(element.innerHTML);
            var countStep = Math.round(ending/39); //aby liczenie skończyło się równocześnie liczba '39' musi być najmniejszą wartością z liczonych
            if (countStep < 1) countStep = 1;
            if(currentValue < ending){
                element.innerHTML = currentValue + countStep;
                window.setTimeout(function(){countIt(element, ending)}, 50);
            }
        }
        for(var i=0; i < countingSpansAmount; i++){
            countingEnding[i] = Number(countingSpans[i].innerHTML);
            countingSpans[i].innerHTML = 0;
            countIt(countingSpans[i], countingEnding[i]);
        }
    }
    var positionCheck = function(element){
        var startFadeAnimatePoint = document.documentElement.clientHeight,
            fadeElementCurrentPoint = element.getBoundingClientRect().top;
        if(fadeElementCurrentPoint < startFadeAnimatePoint){
            return true;
        }
        else return false;
    }
    var fadeInAnimation = function(element){
        element.classList.add('fade-in-animation');
        if(element.id == 'counting-elements'){
            startCounting();
        }
    }
    var fadeElements = document.querySelectorAll('.fade-in'),
        flags = [];
        fadeElementsAmount = fadeElements.length;
    for (var i = 0; i < fadeElementsAmount ; i++) {
        flags[i] = true;
        if(fadeElements[i].getBoundingClientRect().top < document.documentElement.clientHeight){
            fadeElements[i].classList.add('fade-in-animation');
            flags[i] = false;
            if(fadeElements[i].id == 'counting-elements'){
                startCounting();
            }
        }
    }
    window.addEventListener('scroll', function(){
        for (var i = 0; i < fadeElementsAmount; i++) {
            if(flags[i] && positionCheck(fadeElements[i])){
                fadeInAnimation(fadeElements[i]);
                flags[i] = false;
            }
        }
    })
})
