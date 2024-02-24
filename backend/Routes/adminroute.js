const express = require('express');
const {CategoryListData,deleteProductCategory,admindetailsAPI,ProductListData,superAdminRegister,adminLogin,tokenDestroy,profileData,getdashboardData,orderData,productData,postproductData,custmorData,reportData,integrationData,Setting} = require('../Controller/AdminController')
const router = express.Router();

router.get('/',(req,res)=>{res.render('login')});
router.post('/',adminLogin);

router.get('/admin-login',(req,res)=>{res.render('login')});
router.post('/admin-login',adminLogin);

router.get('/logout',tokenDestroy);

router.get('/create-admin',(req,res)=>{res.render('registration')})
router.post('/create-admin',superAdminRegister)

router.get('/dashboard',getdashboardData)
router.post('/dashboard',async(req,res)=>{})

router.get('/order',orderData)
router.post('/order',(req,res)=>{})

router.get('/product',productData)
router.post('/product',postproductData)

router.get('/deleteProductcategory/:name',deleteProductCategory)

router.get('/customer',custmorData)
router.post('/customer',(req,res)=>{})

router.get('/report',reportData)
router.post('/report',(req,res)=>{})

router.get('/integration',integrationData)
router.post('/product',(req,res)=>{})

router.get('/settings',Setting)
router.post('/product',(req,res)=>{})

router.get('/profile',profileData)
router.post('/profile',(req,res)=>{})

router.get('/admindetails',admindetailsAPI)
router.get('/shoppinglist/:categoryname',ProductListData);
router.get('/shoppinglist',CategoryListData);
module.exports = router;