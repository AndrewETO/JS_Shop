fetch("https://fakestoreapi.in/api/products")
.then(res => res.json())
.then(res => {
    console.log(res.products)
    let cartArray = [];
    const cartListContainer = document.querySelector('.cartListContainer');
    cartListContainer.classList.add('cartListContainerEmpty');

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
                cartRender(i)
                cartArray.push(i)
                console.log(cartArray)
                if(cartArray.length > 0) {
                    cartListContainer.classList.remove('cartListContainerEmpty')
                } else {
                    cartListContainer.classList.add('cartListContainerEmpty');
                }
            })
            productPrice.append(price, button)
        }        
    }

    function cartRender(index) {
       const cartList = document.querySelector(".cartList");
       cartList.classList.add('cartList');
       const cartListLi = document.createElement('li');
       cartList.appendChild(cartListLi)

       const cartListItem = document.createElement('div');
       cartListItem.classList.add('cartListItem');
       const cartListItemImage = document.createElement('img');
       cartListItemImage.classList.add('cartListItemImage');
       cartListItemImage.src = res.products[index].image;
       const cartListItemSpan = document.createElement('span');
       cartListItemSpan.innerHTML = res.products[index].title;
       cartListItem.append(cartListItemImage, cartListItemSpan);

       const cartListPrice = document.createElement('div');
       cartListPrice.classList.add('cartListPrice');
       const cartListPriceText = document.createElement('h4');
       cartListPriceText.innerHTML = `${res.products[index].price}$`;
       cartListPrice.appendChild(cartListPriceText);

       const cartListQuantity = document.createElement('div');
       cartListQuantity.classList.add('cartListQuantity');
       const cartListQuantityInput = document.createElement('input');
       cartListQuantityInput.type = "number";
       const cartListQuantityButton = document.createElement("button");
       cartListQuantityButton.innerHTML = "Remove";
       cartListQuantityButton.addEventListener('click', () => {
        cartListLi.remove();
       })
       cartListQuantity.append(cartListQuantityInput, cartListQuantityButton)

       cartListLi.append(cartListItem, cartListPrice, cartListQuantity)
       
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