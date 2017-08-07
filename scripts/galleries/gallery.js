// Gallery.js: Manages the dynamic operation of a gallery.

var galleryIndex=1;

function fillMetadata() {
    var currentImage=gallery.images[galleryIndex];
    var container=document.getElementById("gallery-info-container");
    
    container.getElementById("gallery-title").innerHTML=currentImage.name;
    container.getElementById("gallery-description").innerHTML=currentImage.description;
    container.getElementById("out-of-stock").style.display=currentImage.inStock ? "none" : "block";
    
    var input=container.getElementById("gallery-units");
    input.min=currentImage.minCount;
    input.value=currentImage.defaultCount;
    input.max=currentImage.maxCount;
    input.step=currentImage.stepCount;
    
    var price=currentImage.price;
    container.getElementById("gallery-dollars").innerHTML=Math.floor(price/100);
    price=price%100;
    var cents=price.toString();
    if (cents.length<2)
        cents="0"+cents;
    container.getElementById("gallery-cents").innerHTML=cents;
}
fillMetadata()
