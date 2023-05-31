import { getProducts } from "./database.js"

const products = getProducts()

export const Products = () => {
    let html = `<ul>`

    for (const product of products) {
        html += `<li id="product--${product.id}">${product.name}</li>`
    }

    html += "</ul>"

    return html
}

// creates an event listener which will display a window alert when product on product list is clicked: "productname costs $productprice"

document.addEventListener( // creates event listener
    "click", // listens for click
    (clickEvent) => { // defines a function which takes a parameter, clickEvent
        const clickedItem = clickEvent.target
        if (clickedItem.id.startsWith("product")) {
            const [, productPK] = clickedItem.id.split("--")
            for (const product of products) {
                if (product.id === parseInt(productPK)) {
                    window.alert(`${product.name} costs $${product.price}`)
                }
            }
        }
    }
)