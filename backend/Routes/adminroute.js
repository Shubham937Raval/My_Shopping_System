const express = require('express');
const {superAdminRegister,adminLogin,tokenDestroy,profileData,getdashboardData,postdashboardData,orderData,productData,custmorData,reportData,integrationData,Setting} = require('../Controller/AdminController')
const router = express.Router();

router.get('/',(req,res)=>{res.render('login')});
router.post('/',adminLogin);

router.get('/admin-login',(req,res)=>{res.render('login')});
router.post('/admin-login',adminLogin);

router.get('/logout',tokenDestroy);

router.get('/create-admin',(req,res)=>{res.render('registration')})
router.post('/create-admin',superAdminRegister)

router.get('/dashboard',getdashboardData)
router.post('/dashboard',postdashboardData)

router.get('/order',orderData)
router.post('/order',(req,res)=>{})

router.get('/product',productData)
router.post('/product',(req,res)=>{})

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

module.exports = router;