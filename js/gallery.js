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
