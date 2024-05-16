let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');


let basket = JSON.parse(localStorage.getItem("data")) || [];


let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();


let generateCartItems = () => {

    if (basket.length !== 0) {
        return (shoppingCart.innerHTML = basket
            .map((x) => {
                //console.log("ID:", x.id); // Log the id
                //console.log("shopItemsData:", shopItemsData); // Log the shopItemsData array
                //console.log(x);
                let {id, item} = x;
                let search = shopItemsData.find((y) => y.id === id.toString());
                //console.log("Search result:", search); // Log the search result
                return `
            <div class="cart-item">
                <img width='200' src=${search.img} />
                <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${search.name}</p>
                            <p class="cart-item-price">Rs. ${search.price}</p>
                        </h4>
                        <i onclick="removeItem(${id})" class="bi bi-x-square"></i>
                    </div>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class='quantity'>${item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>

                    <h3>Rs. ${item * search.price}</h3>
                </div>
            </div>
            `;
            })
            .join(''));
    } else {
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is EMPTY!</h2><br>
        <a href="index.html">
        <button type="button" class="btn btn-danger">Back to Home!</button>
        </a>
        `;
    }
};

generateCartItems();


let increment = (id) => {
    //console.log("increment", id);
    let search = basket.find((x) => x.id === id);

    if (search === undefined)
        return;
    else if (search.item === 0)
        return;
    else{
        search.item += 1;
    }
    generateCartItems();
    update(id);
    localStorage.setItem("data", JSON.stringify(basket));
};


let decrement = (id) => {
    //console.log("decrement", id);
    let search = basket.find((x) => x.id === id);

    if (search === undefined)
        return;
    else if (search.item === 0)
        return;
    else{
        search.item -= 1;
    }
    update(id);
    basket = basket.filter((x) => x.item != 0);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
};


let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmount();
};


let removeItem = (id) => {
    //console.log("removed", id);
    basket = basket.filter((x) => x.id !== id);
    generateCartItems();
    totalAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
    basket = []
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
};

let totalAmount = () => {
    if (basket.length != 0)
    {
        let amount = basket.map((x) => {
            let {item, id} = x
            let search = shopItemsData.find((y) => y.id === id.toString());
            return item * search.price;
        }).reduce((x, y) => x + y, 0)
        //console.log(amount);
        label.innerHTML = `
        <h2>Total Bill : Rs. ${amount}</h2>
        <button type="button" class="btn btn-success">CheckOut</button>
        <button type="button" onclick="clearCart()" class="btn btn-danger">Clear Cart!</button>
        `;
    }
    else
    {
        return;
    }
};

totalAmount();
