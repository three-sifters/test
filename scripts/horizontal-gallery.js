function enlarge() {
    var enlarge=document.getElementById("enlarged")
    enlarge.style.opacity=1
    enlarge.src=document.getElementById("focus").src
}

function shrink() {
    document.getElementById("enlarged").style.opacity=0
}
