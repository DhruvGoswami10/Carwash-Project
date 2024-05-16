let shop = document.getElementById("shop")


let basket = JSON.parse(localStorage.getItem("data")) || [];


let add = (id) => {

    let search = basket.find((x)=> x.id === id);

    if(search === undefined)
    {
        basket.push({
            id: id,
            item: 1,
        });
    }
    else
    {
        search.item += 1;
    }

    localStorage.setItem("data", JSON.stringify(basket));
   // console.log(basket);
   calculation();
};


let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x, y) => x + y, 0);
};

calculation();
