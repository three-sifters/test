// Manages behavior of the shopping cart

var dirty=false; // Whether the cart needs saving
var cartKey="shoppingCart"; // Constant, keep the same wherever the cart is referenced

// Loads the shopping cart and fills in the appropriate items in the
function structureCart() {
    var storage=sessionStorage;
    var cart=JSON.parse(storage.getItem(cartKey));
    if (cart==null || cart.length==0) { // The cart does not exist or is empty.
        document.getElementById("order-cart").disabled=true;
        document.getElementById("cart-table").style.display="none";
        document.getElementById("cart-empty").style.display="block";
        return;
    }

    var clone;
    var templateContainer=document.getElementById("cart-table-template-row-container")
    var table=document.getElementById("cart-table-body");
    while (table.firstChild) // Make sure we don't double-make the table
        table.removeChild(table.firstChild);
    for (var i=0; i<cart.length; ++i) {
        console.log(i);
        for (var n=0; n<templateContainer.children.length; ++n) {
            clone=templateContainer.children[n].cloneNode(true);
            table.appendChild(clone);
        }

        var row=table.children[i];
        row.getElementsByClassName("cart-item-image")[0].src=cart[i].product.image;
        row.getElementsByClassName("cart-item-name")[0].innerHTML=cart[i].product.name;

        var price=cart[i].product.cost;
        row.getElementsByClassName("cart-item-collars")[0].innerHTML=Math.floor(price/100);
        var cents=price%100;
        cents=cents.toString();
        if (cents.length<2)
            cents="0"+cents;
        row.getElementsByClassName("cart-item-cents")[0].innerHTML=cents;

        var input=row.getElementsByClassName("cart-item-count")[0];
        input.min=cart[i].product.min;
        if (cart[i].product.max>0)
            input.max=cart[i].product.max;
        input.step=cart[i].product.step;
        input.value=cart[i].count;
    }
}
document.addEventListener("DOMContentLoaded", structureCart);
