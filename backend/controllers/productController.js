import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

//@Fetch all products
//@router GET/api/products
//@access Public
const getProducts = asyncHandler(async (req,res)=>{
    const pageSize=8;
    const page=Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? {name: {$regex: req.query.keyword,$options:'i' }} :{};
    const count = await Product.countDocuments({...keyword});

    const products= await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page -1))
    
    res.json({products,page,pages: Math.ceil(count/pageSize)});
})

//@Fetch a product
//@router GET/api/product/:id
//@access Public
const getProductById = asyncHandler(async (req,res)=>{
    const product = await Product.findById(req.params.id)
    if(product){
       return res.json(product)
    } else{
        res.status(404);
        throw new Error("Resource not found");
    }
})
//@create a products
//@router POST/api/products
//@access Privat/admin
const createProduct = asyncHandler(async (req,res)=>{
   const product= new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image:'/images/sample.jpg',
    brand:'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numreviews: 0,
    description: 'Sample description'
   })
   const createdProduct = await product.save()
   res.status(201).json(createdProduct)
})
//@Update a product
//@router PUT/api/products/:id
//@access Private/Admin
const updateProduct = asyncHandler(async (req,res)=>{
    const {name,price,description,image,brand,category,countInStock} =req.body
    const product =await Product.findById(req.params.id)
    if(product){
        product.name=name;
        product.price= price;
        product.description= description
        product.image=image;
        product.brand=brand
        product.category= category
        product.countInStock= countInStock

        const updatedProduct =await product.save()
        res.json(updatedProduct)
    }
    else{
        res.status(404);
        throw new Error('Resource not found')
    }
})
//@Delete a product
//@router DELETE/api/products/:id
//@access Private/Admin
const deleteProduct = asyncHandler(async (req,res)=>{
 
    const product =await Product.findById(req.params.id)
    if(product){
        await Product.deleteOne({_id:product._id})
        res.status(200).json({message:'Product deleted'})
    }  
    else{
        res.status(404);
        throw new Error('Resource not found')
    }
})
//@create a new review
//@router POST/api/products/:reviews
//@access Private
const createProductReview = asyncHandler(async (req,res)=>{
    const{rating,comment}=req.body;
 
    const product =await Product.findById(req.params.id)
    if(product){
        const alreadyReviewed=product.reviews.find(
            (review)=>review.user.toString()===req.user._id.toString()
        )
    if(alreadyReviewed){
        res.status(400);
        throw new Error("Product already reviewed")
    }
    const review={
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
    }
    product.reviews.push(review);
    product.numReviews=product.reviews.length;

    product.rating=
    product.reviews.reduce((acc,review)=> acc+review.rating,0)/
    product.reviews.length;
    await product.save();
    res.status(201).json({message:'Review added'})

    }  
    else{
        res.status(404);
        throw new Error('Resource not found')
    }
})
//@Get top rated Products
//@router GET/api/product/top
//@access Public
const getTopProducts = asyncHandler(async (req,res)=>{
    const products = await Product.find({}).sort({rating:-1}).limit(3)
    res.status(200).json(products)
})
export {getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getTopProducts
}