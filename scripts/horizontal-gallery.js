function enlarge() {
    var enlarge=document.getElementById("enlarged")
    enlarge.style.opacity=1
    enlarge.src=document.getElementById("focus").src
}

function shrink() {
    document.getElementById("enlarged").style.opacity=0
}

var images=0;

function collectionToArray(collection) {
    // Helper function: Convert an HTMLCollection to a JS array.
    // Why there isn't an easier way to do this, I have no idea.
    return Array.prototype.slice.call(collection)
}

function prepImages() {
    // Only initialize if not already initialized
    if (images!==0) return

    images=collectionToArray(document.getElementById("left").children)
    images.push(document.getElementById("focus"))
    images=images.concat(collectionToArray(document.getElementById("right").children))
}

function rotateGallery(offset) {
    if (offset==0) return // Sanity check

    // Does not currently support offsets that are not -1 or 1
    if (offset<0)
        offset=-1
    else
        offset=1

    // Prepare the images array
    prepImages()

    numImages=13 // Change this when the number of images in the gallery is changed

    for (var i=0; i<images.length; i++) {
        var number=parseInt(images[i].getAttribute("imagenumber"))+offset
        if (number<1) // Wraparound negative
            number=13
        else if (number>13) // Wraparound positive
            number=1

        images[i].setAttribute("imagenumber", number)
        images[i].src="images/horizontal-gallery/"+number+".png"
    }
}
