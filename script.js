fetch("https://fakestoreapi.in/api/products")
.then(res => res.json())
.then(res => {
    console.log(res.products)
    let cartArray = [];
    let itemsInCart = [];
    let totalValue = 0;
    const cartListContainer = document.querySelector('.cartListContainer');
    cartListContainer.classList.add('cartListContainerEmpty');
    const cartList = document.querySelector(".cartList");
    const cartEmptyTitle = document.querySelector('.cartEmptyTitle');
    const total = document.querySelector('.total');    

    function renderProducts(i) {
        if (i < res.products.length) {
            const productsContainer = document.querySelector(".productsContainer")    
            const product = document.createElement("li");
            product.classList.add('product');
            productsContainer.appendChild(product);
        
            const productDescription = document.createElement("div");
            productDescription.classList.add('productDescription')
            const productPrice = document.createElement("div");
            productPrice.classList.add('productPrice');
            product.append(productDescription, productPrice)
        
            const image = document.createElement('img');
            image.src = res.products[i].image;
            image.alt = "IMAGE"
            const title = document.createElement('h4');
            title.innerHTML = res.products[i].title;
            const description = document.createElement('p');
            description.innerHTML = res.products[i].description;
            productDescription.append(image, title, description)
    
            const price = document.createElement('span');
            price.innerHTML = `${res.products[i].price} $`;
            const button = document.createElement('button');
            button.innerHTML = "Add to cart";
            button.addEventListener('click', () => {
                if(!cartArray.includes(res.products[i])) {
                    cartArray.push(res.products[i])
                    itemsInCart.push({
                        "id" : res.products[i].id,
                        "price" : res.products[i].price,
                        "quantity" : 1
                    })
                    createCartItem(res.products[i])
                    cartListContainer.classList.remove('cartListContainerEmpty');
                    cartEmptyTitle.innerHTML = "";
                    calcTotal(itemsInCart);
                }   
            })
            productPrice.append(price, button)
        }        
    }

    function createCartItem(product) {
        
            const cartListLi = document.createElement('li');
            cartList.appendChild(cartListLi)
     
            const cartListItem = document.createElement('div');
            cartListItem.classList.add('cartListItem');
            const cartListItemImage = document.createElement('img');
            cartListItemImage.classList.add('cartListItemImage');
            cartListItemImage.src = product.image;
            const cartListItemSpan = document.createElement('span');
            cartListItemSpan.innerHTML = product.title;
            cartListItem.append(cartListItemImage, cartListItemSpan);
     
            const cartListPrice = document.createElement('div');
            cartListPrice.classList.add('cartListPrice');
            const cartListPriceText = document.createElement('h4');
            cartListPriceText.innerHTML = `${product.price}$`;
            cartListPrice.appendChild(cartListPriceText);
     
            const cartListQuantity = document.createElement('div');
            cartListQuantity.classList.add('cartListQuantity');
            const cartListQuantityInput = document.createElement('input');
            cartListQuantityInput.type = "number";
            cartListQuantityInput.min = "1";
            cartListQuantityInput.value = 1;
            cartListQuantityInput.addEventListener('change', () => {
                itemsInCart.map((item) => {
                    if(item.id == product.id) {
                        item.quantity = cartListQuantityInput.value;
                    }
                })
                calcTotal(itemsInCart)
            })
            const cartListQuantityButton = document.createElement("button");
            cartListQuantityButton.innerHTML = "Remove";
            cartListQuantityButton.addEventListener('click', () => {
                cartListLi.remove();
                cartArray = cartArray.filter((item) => {
                    return item != product;
                })
                itemsInCart = itemsInCart.filter((item) => {
                    return item.id != product.id;
                })
                calcTotal(itemsInCart);
                if(cartArray.length == 0) {
                    cartEmptyTitle.innerHTML = "Your cart is empty";
                    cartListContainer.classList.add('cartListContainerEmpty');
                }
             
            })
            cartListQuantity.append(cartListQuantityInput, cartListQuantityButton)
     
            cartListLi.append(cartListItem, cartListPrice, cartListQuantity)
       
    }

    function calcTotal(array) {
        totalValue = 0;
        array.forEach((item) => {
            totalValue += item.price*item.quantity;
            total.innerHTML = `${totalValue}$`;
        })
    }

    for(let i = 0; i < 6; i++) {
        renderProducts(i)
    }

    const showMore = document.querySelector(".moreProducts");
    let counterMin = 6;
    let counterMax = 12;
    showMore.addEventListener('click', () => {
        for(let i = counterMin; i < counterMax; i++) {
            renderProducts(i)
        }   
        counterMin+=6; 
        counterMax+=6;
    })   

    
})