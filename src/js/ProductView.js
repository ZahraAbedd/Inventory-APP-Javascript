
import Storage from "./Storage.js"
const productAddBtn = document.querySelector('.product-add')
const productTitle = document.querySelector('.product-title')
const productQuantity = document.querySelector('.product-quantity')
const productCategory = document.querySelector('#product-category')
const productSearch = document.querySelector('#product-search')
const productsFilter = document.querySelector('#products-filter')

class ProductView{
    constructor(){
        productAddBtn.addEventListener('click' , e => this.addProducts(e))
        this.products = []
        productSearch.addEventListener('input' , e => this.serachProducts(e))
        productsFilter.addEventListener('change' , e => this.sortedProducts(e))
    }
    addProducts(event){
        event.preventDefault();
        const titleProduct = productTitle.value
        const quntityProduct = productQuantity.value 
        const categoryProduct = productCategory.value 
        // console.log(titleProduct , quntityProduct , categoryProduct)
        if(!productTitle || !productQuantity || !productCategory) return
        Storage.saveProducts({titleProduct , quntityProduct , categoryProduct})
        this.products = Storage.getAllProducts()
        this.createListOfProducts(this.products)
        productTitle.value = ""
        productQuantity.value = ""

    }
    setAPP(){
        this.products = Storage.getAllProducts()
    }
    createListOfProducts(products){
        let result = '';
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        products.forEach(product => {
            const selectedCategory = Storage.getAllCategories().find(category => category.id == product.categoryProduct)
            result += `                    
            <li class="products-item flex items-center justify-between my-4">
            <div class="flex-1">${product.titleProduct}</div>
            <div class="date mx-4 italic text-sm">${new Date(product.updatedAt).toLocaleDateString('fa-IR',options)}</div>
            <div class="category-item px-3 py-0.5 bg-transparent border border-slate-400 text-sm rounded-2xl">${selectedCategory.title}</div>
            <div class="quantity w-7 h-7 rounded-full border border-slate-400 flex items-center justify-center mx-4 bg-indigo-700">${product.quntityProduct}</div>
            <button class="trash text-red-500 border border-red-500 rounded-2xl px-4 py-0.5" data-product-id="${product.id}">Delete</button>
            <button class="edit text-sky-500 border border-sky-500 rounded-2xl px-4 py-0.5" data-product-id="${product.id}">Edit</button>
        </li>`
        })
        const productsDOM = document.querySelector('.products-list')
        productsDOM.innerHTML = result
        const deleteBtns = [...document.querySelectorAll('.trash')]
        deleteBtns.forEach(deleteBtn => {
            deleteBtn.addEventListener('click' , e => this.deleteProduct(e))
        })
        const editBtns = [...document.querySelectorAll('.edit')]
        editBtns.forEach(editBtn => {
            editBtn.addEventListener('click' , e => this.editProducts(e))
        })
    }
    serachProducts(e){
        const inputValue = e.target.value.trim().toLowerCase()
        const filteredProducts = this.products.filter(product => {
            return product.titleProduct.toLowerCase().includes(inputValue)
        })
        this.createListOfProducts(filteredProducts)
    }
    sortedProducts(e){
        const inputValue = e.target.value
        this.products = Storage.getAllProducts(inputValue)
        this.createListOfProducts(this.products)
    }
    deleteProduct(e){
        const deletedId = e.target.dataset.productId
        Storage.deleteProduct(deletedId)
        this.products = Storage.getAllProducts()
        this.createListOfProducts(this.products)
    }
    editProducts(e){
        const valueID = e.target.dataset.productId
        const savedProducts = Storage.getAllProducts()
        const editedProduct = savedProducts.find(product => product.id === parseInt(valueID))
        productTitle.value = editedProduct.titleProduct
        productQuantity.value = editedProduct.quntityProduct
        productCategory.value = editedProduct.categoryProduct
        Storage.deleteProduct(valueID)
        this.products = Storage.getAllProducts()
        this.createListOfProducts(this.products)
        console.log(editedProduct)

    }
}
export default new ProductView()