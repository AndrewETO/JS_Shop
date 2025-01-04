fetch("https://fakestoreapi.in/api/products")
.then(res => res.json())
.then(res => {
    console.log(res.products)

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
            button.innerHTML = "Add to cart"
            productPrice.append(price, button)
        }
        
    }
    // for(let i = 0; i < 6; i++) {
    //     renderProducts(i)
    // }

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

    const cartItemImage = document.querySelector(".cartListItemImage");
    console.log(cartItemImage)
    cartItemImage.src = res.products[48].image;

})