window.addEventListener('DOMContentLoaded', function(){
    var startCounting = function(){
        var countingSpans = document.getElementsByClassName('main__our-realization-count'),
            countingSpansAmount = countingSpans.length,
            countingEnding = [];

        var countIt = function(element, ending, timeStep){
            var currentValue = Number(element.innerHTML),
                step = Math.round((ending-currentValue)*(currentValue/ending)/10);
            if (step == 0) step = 1;
            var timeStep = timeStep;
            if(currentValue < ending){
                element.innerHTML = currentValue + step;
                setTimeout(function(){countIt(element, ending, timeStep)}, timeStep);
            }
        }

        for(var i=0; i < countingSpansAmount; i++){
            countingEnding[i] = Number(countingSpans[i].innerHTML);
            countingSpans[i].innerHTML = 0;
            var timeStep = Math.round(1500/countingEnding[i]);
            countIt(countingSpans[i], countingEnding[i], timeStep);
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

window.addEventListener("DOMContentLoaded", function(){
    var imageItems = document.getElementsByClassName('main__gallery-image'),
        imageItemsAmount = imageItems.length;

    var showImage = function(image){
        var gallery = document.getElementById('galeria');
            //createContainer(image);
        var createNewElement = function(elementName, fatherElementId, elementClassName, elementInnerHTML){
            var element = document.createElement(elementName);
            var inside = document.getElementById(fatherElementId);
            element.className = elementClassName;
            element.id = elementClassName;
            inside.appendChild(element);
            element.innerHTML = elementInnerHTML;
        }
        createNewElement('div', 'galeria', 'gallery-view-container', '');
        createNewElement('h3', 'gallery-view-container', 'gallery-view-title', 'Galeria zdjęć');
        createNewElement('button', 'gallery-view-container' , 'gallery-view-exit-button', 'wyjście');
        createNewElement('button', 'gallery-view-container', 'gallery-view-previous-button', '<');
        createNewElement('figure', 'gallery-view-container', 'gallery-view-figure', '');
        createNewElement('button', 'gallery-view-container', 'gallery-view-next-button', '>');
        createNewElement('img', 'gallery-view-figure', 'gallery-view-image', '');
        createNewElement('figcaption', 'gallery-view-figure', 'gallery-view-figcaption', '');

        var exitButton = document.getElementById('gallery-view-exit-button');
        exitButton.addEventListener('click', function(){
            var container = this.parentElement;
            container.parentElement.removeChild(container);
        })

        window.addEventListener('keydown', function(event){
            if(event.keyCode == "27"){
                var container = exitButton.parentElement;
                container.parentElement.removeChild(container);
            }
        }, false)

        var createImage = function(image){
            var imageSource = image.src,
                imageMaxSource = imageSource.replace('_min.','_max.'),
                altText = image.alt;
                bigImage = document.getElementById('gallery-view-image'),
                figcaption = document.getElementById('gallery-view-figcaption');
            bigImage.src = imageMaxSource;
            figcaption.innerHTML = altText;
        }

        var nextButton = document.getElementById('gallery-view-next-button');
        nextButton.addEventListener('click', function(){
            var imagesContainer = image.parentNode;
            if(image.src == imagesContainer.lastChild.src){
                image = imagesContainer.firstChild;
                createImage(image);
            }
            else{
                image = image.nextSibling;
                createImage(image);
            }
        })

        var previousButton = document.getElementById('gallery-view-previous-button');
        previousButton.addEventListener('click', function(){
            var imagesContainer = image.parentNode;
            if(image.src == imagesContainer.firstChild.src){
                image = imagesContainer.lastChild;
                createImage(image);
            }
            else{
                image = image.previousSibling;
                createImage(image);
            }
        })

        createImage(image);
    }


    for (var i = 0; i < imageItemsAmount; i++) {
        var imageClicked = imageItems[i];
        imageClicked.addEventListener('click', function(){
            showImage(this);
        });
    }

})

//  scrollowanie odbywa się w sposób easy-in-out
//  var speed = 2; --> szybkość scrollowania (0-1000), gdzie 0 to przesuwanie co 1px, a 1000 to natychmiastowe przeniesienie
//  upto = target.offsetTop; --> jeżeli chcesz by obraz przesunął się ponad/poniżej kotwicy, dodaj/odejmij tu stosowną wartość (ilość pikseli). Np. by przyklejane menu nie przykryło celu to możesz odjąć wysokość menu)
//  percentStart = 0; --> początkowa zmiana, im ta zmienna jest większa, tym większy jest pierwszy przeskok, niska wartość daje łagodniejszy start

window.addEventListener('DOMContentLoaded', function(){
    var navElements = document.getElementsByClassName('nav__link'),
        navElementsAmount = navElements.length;
    for(var i=0;i< navElementsAmount; i++){
        var navElement = navElements[i];
        navElement.addEventListener('click', function(event){
            var clickedElement = event.target,
                speed = 2.5;
                target = document.getElementById(clickedElement.hash.slice(1)),
                upto = target.offsetTop,
                percentStart = 0,
                pageHeight = document.documentElement.scrollHeight,
                viewHeight = document.documentElement.clientHeight;
                if(upto + viewHeight >= pageHeight) upto = pageHeight - viewHeight;
            history.pushState(null,null,clickedElement.hash);
            var scroll = function(){
                var from = pageYOffset,
                    step = Math.round((upto - from)*percentStart/1000),
                    step = Math.abs(step);
                percentStart += speed;
                if (step < 1) step = 1;
                if (from < upto) {
                    window.scrollBy(0, step);
                    window.requestAnimationFrame(scroll);
                }
                else if(from > upto) {
                    window.scrollBy(0, -step);
                    window.requestAnimationFrame(scroll);
                }
            }
            window.requestAnimationFrame(scroll);
            event.preventDefault();
        })
    }
})

window.addEventListener('DOMContentLoaded', function(){
    var nav = document.getElementById('nav'),
        topPos = nav.offsetTop;
    if(pageYOffset >= topPos) nav.classList.add('nav_sticky');
    window.addEventListener("scroll", function(){
        var currentPos = pageYOffset;
        if(currentPos >= topPos){
            nav.classList.add('nav_sticky');
        }
        else{
            nav.classList.remove('nav_sticky');
        }
    });
})
