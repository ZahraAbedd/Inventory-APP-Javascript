
// Title Description =====> saveCategory 
import Storage from "./Storage.js"
const titleInput = document.querySelector('#category-title')
const descriptionInput = document.querySelector('#category-desc')
const addCategoryBtn = document.querySelector('.category-add')
const toggleAddCategoryBtn = document.getElementById('toggle-add-category')
const toggleWrapper = document.querySelector('#category-wrapper')
const categoryAddCancelBtn = document.querySelector('.category-add-cancel')

class CategoryView{
    constructor(){
        addCategoryBtn.addEventListener('click' , e => this.addCategory(e))
        toggleAddCategoryBtn.addEventListener('click', e => this.toggleAddCategory(e))
        categoryAddCancelBtn.addEventListener('click' , e => this.categoryAddCancel(e))
        this.categories = []
    }
    addCategory(event){
        event.preventDefault()
        if(!titleInput || !descriptionInput) return
        const title = titleInput.value;
        const description = descriptionInput.value;
        // Storage.saveCategorys({title : title , description : description})
        Storage.saveCategorys({title , description})
        // For Update DOM
        this.categories = Storage.getAllCategories()
        this.createCategoriesList()
        titleInput.value = ""
        descriptionInput.value = ""
        toggleWrapper.classList.add('hidden')
        toggleAddCategoryBtn.classList.remove('hidden')
    }
    setAPP(){
        this.categories = Storage.getAllCategories()
    }
    createCategoriesList(){
        let result = `<option class="bg-slate-500 text-slate-300" value="">Select a Category</option>`;
        this.categories.forEach(category => {
            result += `<option class="bg-slate-500 text-slate-300" value="${category.id}">${category.title}</option>`;
        });
        document.querySelector('#product-category').innerHTML = result
    }
    toggleAddCategory(e){
        e.preventDefault()
        toggleWrapper.classList.remove('hidden')
        toggleAddCategoryBtn.classList.add('hidden')
    }
    categoryAddCancel(e){
        e.preventDefault()
        toggleWrapper.classList.add('hidden')
        toggleAddCategoryBtn.classList.remove('hidden')
    }
}

export default new CategoryView()