import Storage from "./Storage.js";
import CategoryView from "./CategoryView.js";
import ProductView from "./ProductView.js";
window.addEventListener('DOMContentLoaded' , () => {
    CategoryView.setAPP()
    ProductView.setAPP()
    CategoryView.createCategoriesList()
    ProductView.createListOfProducts(ProductView.products)
})


