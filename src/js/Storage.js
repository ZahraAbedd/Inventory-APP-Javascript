
export default class Storage{
    static getAllCategories(){
        const savedCategories = JSON.parse(localStorage.getItem('category')) || []
        return savedCategories.sort((a , b) => {
            return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1
        })
    }
    static saveCategorys(categoryToSave){
       const listCategories =  this.getAllCategories()
    //    NEW ===> Save 
    //    Edit ===> save
        const isExisted = listCategories.find((category) => category.id === categoryToSave.id)
        if(isExisted){
            // Edit
            isExisted.title = categoryToSave.title
            isExisted.description = categoryToSave.description
            isExisted.createdAt = new Date().toISOString()
        }else{
            categoryToSave.id = new Date().getTime()
            categoryToSave.createdAt = new Date().toISOString()
            listCategories.push(categoryToSave)
        }
       localStorage.setItem('category' , JSON.stringify(listCategories));
    }
    static getAllProducts(sort = 'newest'){
        let savedProducts = JSON.parse(localStorage.getItem('products')) || []
        return savedProducts.sort((a , b) => {
            if(sort === 'newest'){
                return new Date(a.updatedAt) > new Date(b.updatedAt) ? -1 : 1
            }else{
                return new Date(a.updatedAt) > new Date(b.updatedAt) ? 1 : -1
            }
        })
    }
    static saveProducts(productToSave){
        const listProducts = this.getAllProducts()
        const isExisted = listProducts.find(product => product.id === productToSave.id)
        if(isExisted){
            isExisted.title = productToSave.title
            isExisted.category = productToSave.category
            isExisted.quantity = productToSave.quantity
            isExisted.updatedAt = new Date().toISOString()
        }else{
            productToSave.id = new Date().getTime()
            productToSave.updatedAt = new Date().toISOString()
            listProducts.push(productToSave)
        }
        localStorage.setItem('products' , JSON.stringify(listProducts))
    }
    static deleteProduct(id){
        const savedProducts = this.getAllProducts()
        const filteredProducts = savedProducts.filter(product => product.id != parseInt(id))
        localStorage.setItem('products' , JSON.stringify(filteredProducts))
    }
}



