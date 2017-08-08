// Manages behavior of the shopping cart

var dirty=false; // Whether the cart needs saving
var cartKey="shoppingCart"; // Constant, keep the same wherever the cart is referenced

// Calculates total prices for the cart
function recalculateCart(tracer) {
    if (tracer!==null) // If we were called by an element
        dirty=true; // Set the cart as dirty

    var storage=sessionStorage;
    var table=document.getElementById("cart-table-body");
    var cart=JSON.parse(storage.getItem(cartKey));
    for (var i=0; i<table.children.length; ++i) {
        var totalCost=cart[i].product.price;
        var row=table.children[i];
        totalCost*=row.getElementsByClassName("cart-item-count")[0].value;
        row.getElementsByClassName("cart-item-dollars")[1].innerHTML=Math.floor(totalCost/100);
        var cents=totalCost%100;
        cents=cents.toString();
        if (cents.length<2)
            cents="0"+cents;
        row.getElementsByClassName("cart-item-cents")[1].innerHTML=cents;
    }

    document.getElementById("save-cart").disabled=!dirty;
}

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

        var price=cart[i].product.price;
        row.getElementsByClassName("cart-item-dollars")[0].innerHTML=Math.floor(price/100);
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

    recalculateCart(null);
}
document.addEventListener("DOMContentLoaded", structureCart);

// Removes the row which contains the remove button that was pressed
function removeRow(source) {
    document.getElementById("cart-table-body").removeChild(source.parentNode.parentNode);
    dirty=true
    document.getElementById("save-cart").disabled=false;
}

// Sets the shopping cart in memory to match the one on the pageX
function saveCart() {
    if (!dirty) // Don't bother
        return;

    var cart=[];
    var table=document.getElementById("cart-table-body");
    var item={
        product : {},
        count   : 0
    };
    for (var i=0; i<table.children.length; ++i) {
        var row=table.children[i];
        item.product.name=row.getElementsByClassName("cart-item-name")[0].innerHTML;
        item.product.image=row.getElementsByClassName("cart-item-image")[0].src;

        var input=row.getElementsByClassName("cart-item-count")[0];
        if (input.max)
            item.product.max=input.max;
        else
            item.product.max=-1;
        item.product.min=input.min;
        item.product.step=input.step;
        item.count=input.value;

        var price=parseInt(row.getElementsByClassName("cart-item-dollars")[0].innerHTML);
        price*=100;
        price+=parseInt(row.getElementsByClassName("cart-item-cents")[0].innerHTML);
        item.product.price=price;
        cart.push(item);

        item={
            product : {},
            count   : 0
        };
    }
    var storage=sessionStorage;
    storage.setItem(cartKey, JSON.stringify(cart));

    dirty=false;
    document.getElementById("save-cart").disabled=true;
}
