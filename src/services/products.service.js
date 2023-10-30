import { ProductModel } from "../DAO/models/products.model.js";

class ProductsService{
    async toGetProducts(){
        const res= await ProductModel.paginate({},{limit:10,page:1});
        return {
            products:await res.docs,
            limit:await res.limit,
            totalPages:res.totalPages,
            paginCounter:res.pagingCounter,
            hasPrevPage:res.hasPrevPage,
            hasNextPage:res.hasNextPage
        };
    }
    async toPostProduct(){
        
    }
}
const productsService=new ProductsService();
export default productsService;