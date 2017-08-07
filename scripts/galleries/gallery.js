// Gallery.js: Manages the dynamic operation of a gallery.

var galleryIndex=1;

function fillMetadata() {
    var currentImage=gallery.images[galleryIndex];

    document.getElementById("gallery-title").innerHTML=currentImage.name;
    document.getElementById("gallery-description").innerHTML=currentImage.description;
    if (currentImage.inStock==undefined)
        currentImage.inStock=true;
    document.getElementById("out-of-stock").style.display=currentImage.inStock ? "none" : "block";

    var input=document.getElementById("gallery-units");
    if (currentImage.minCount==undefined)
        currentImage.minCount=1;
    input.min=currentImage.minCount;
    if (currentImage.defaultCount==undefined)
        currentImage.defaultCount=1;
    input.value=currentImage.defaultCount;
    if (currentImage.maxCount==undefined)
        input.removeAttribute("max");
    else
        input.max=currentImage.maxCount;
    if (currentImage.stepCount==undefined)
        currentImage.stepCount=1;
    input.step=currentImage.stepCount;

    if (currentImage.price==undefined)
        currentImage.price=100;
    var price=currentImage.price;
    document.getElementById("gallery-dollars").innerHTML=Math.floor(price/100);
    price=price%100;
    var cents=price.toString();
    if (cents.length<2)
        cents="0"+cents;
    document.getElementById("gallery-cents").innerHTML=cents;

    input.disabled=!currentImage.inStock;
    document.getElementById("gallery-order").disabled=input.disabled;
}
document.addEventListener("DOMContentLoaded", fillMetadata);
