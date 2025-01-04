fetch("https://fakestoreapi.in/api/products")
.then(res => res.json())
.then(res => {
    console.log(res.products[0])
    for(let i = 0; i < 5; i++) {
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

})