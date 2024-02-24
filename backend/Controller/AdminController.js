const {adminClass} = require('../Service/AdminClass');
const lodash = require('lodash');
var adminObj;
var mycategoryhead;
exports.superAdminRegister = async(req,res)=>{
    try {

        const adminData = {
            firstName:req.body.firstName,
            lastName:(req.body.lastName)? (req.body.lastName) : null,
            birthDate:null,
            gender:null,
            email:req.body.email,
            phoneNumber:req.body.phoneNumber,
            address:null,
            pincode:null,
            password:req.body.password,
            confirmPassword:req.body.confirmPassword
        };
        await adminClass.addSuperAdmin(adminData);
        return res.redirect('/admin-login');
      } catch (err) {
        console.log(err)
      }
}
exports.adminLogin = async(req,res)=>{
    try{
        const inputData = {
            email:req.body.email,
            password:req.body.password
        };
        let checkAdmin = await adminClass.checkAdmin(inputData);
        if(!lodash.isEmpty(checkAdmin[0])){
            await adminClass.loginToken(checkAdmin[0]._id.toString()).then(i=>{
                try{
                    req.session.token = i.token
                }
                catch(err){
                    console.log(err);
                }
            });

            adminObj=Object.assign(checkAdmin[0]);
            return res.redirect('/dashboard');
        }
        else{
            return res.status(404).send("No user");
        }
    }
    catch(err){console.log(err)}
}
exports.tokenDestroy = async(req,res)=>{
    try{
        await adminClass.tokenDestroy(adminObj._id.toString());
        return res.redirect('/admin-login');
    }
    catch(err){console.log(err)}
}
exports.getdashboardData = async(req,res)=>{
    try{
        if(adminObj)
        {
            console.log("dashboard page")
            let lifeTimeOrder = await adminClass.getLifeTimeOrdercount();
            let lifetimeearning = await adminClass.getLifeTimeRevenuecount();
            let todayOrder = await adminClass.getTodayOrdercount();
            let todayRevenue = await adminClass.getTodayRevenuecount();
            let monthwiserevenuearray = [];
            monthwiserevenuearray.push(await adminClass.getrevenue("Jan").then(ii=>{return +Math.round(ii).toString().substring(0,5)}));
            monthwiserevenuearray.push(await adminClass.getrevenue("Feb").then(ii=>{return +Math.round(ii).toString().substring(0,5)}));
            monthwiserevenuearray.push(await adminClass.getrevenue("Mar").then(ii=>{return +Math.round(ii).toString().substring(0,5)}));
            monthwiserevenuearray.push(await adminClass.getrevenue("Apr").then(ii=>{return +Math.round(ii).toString().substring(0,5)}));
            monthwiserevenuearray.push(await adminClass.getrevenue("May").then(ii=>{return +Math.round(ii).toString().substring(0,5)}));
            monthwiserevenuearray.push(await adminClass.getrevenue("Jun").then(ii=>{return +Math.round(ii).toString().substring(0,5)}));
            monthwiserevenuearray.push(await adminClass.getrevenue("Jul").then(ii=>{return +Math.round(ii).toString().substring(0,5)}));
            monthwiserevenuearray.push(await adminClass.getrevenue("Aug").then(ii=>{return +Math.round(ii).toString().substring(0,5)}));
            monthwiserevenuearray.push(await adminClass.getrevenue("Sep").then(ii=>{return +Math.round(ii).toString().substring(0,5)}));
            monthwiserevenuearray.push(await adminClass.getrevenue("Oct").then(ii=>{return +Math.round(ii).toString().substring(0,5)}));
            monthwiserevenuearray.push(await adminClass.getrevenue("Nov").then(ii=>{return +Math.round(ii).toString().substring(0,5)}));
            monthwiserevenuearray.push(await adminClass.getrevenue("Dec").then(ii=>{return +Math.round(ii).toString().substring(0,5)}));
            return res.render('data',{
                tok:req.session.token,
                titlehead:"Dashboard",
                name:adminObj.firstName,
                totalLifetimeRevenue:lifetimeearning,
                totalLifetimeOrder:lifeTimeOrder,
                todayOrder:todayOrder,
                todayRevenue:todayRevenue,
                graphrevenuedata : monthwiserevenuearray
            });
        }
    }
    catch(err){
        console.log(err)
    }
}

exports.orderData = async(req,res)=>{
    try{
        if(adminObj)
        {
            let todayOrder = await adminClass.getTodayOrdercount();
            let thisweekordercount = await adminClass.getThisWeekOrdercount();
            let thismonthordercount = await adminClass.getThisMonthOrdercount();
            let thisyearordercount = await adminClass.getThisYearOrdercount();
            let lastyearordercount = await adminClass.getLastYearOrdercount();
            console.log("order page")
            return res.render('data',{
                tok:req.session.token,
                titlehead:"Order",
                name:adminObj.firstName,
                todayOrder:todayOrder,
                thisweekOrder:thisweekordercount,
                thismonthOrder:thismonthordercount,
                thisyearOrder:thisyearordercount,
                lastyearOrder:lastyearordercount
            });
        }
    }
    catch(err){
        console.log(err)
    }
}
exports.productData = async(req,res)=>{
    try{
        if(adminObj)
        {
            console.log("product page");
            let CategoryList = await adminClass.getProductCategories();
            return res.render('data',
            {
                tok:req.session.token,
                titlehead:"Product",
                name:adminObj.firstName,
                Category:CategoryList,
                //sports
                sportsrevenue:await adminClass.getCategorywiseData("Sports & Outdoors").then(
                    data=>{
                        let price = 0;
                        data.forEach(i=>{
                            price = price + i.Total_Price;
                        })
                        return price
                    }
                ),
                sportordercount:await adminClass.getCategorywiseData("Sports & Outdoors").then(
                    data=>{
                        return data.length
                    }
                ),
                Sportshead:await adminClass.getCategorywiseData("Sports & Outdoors").then(
                    data=>{
                        return Object.keys(Object.entries(data[0])[2][1]).slice(1,Infinity);
                    }),
                SportAllObject:await adminClass.getCategorywiseData("Sports & Outdoors").then(
                    data=>{
                        return data;
                    }
                ),
                //kitchen
                homeandkitchenrevenue:await adminClass.getCategorywiseData("Home & Kitchen").then(
                    data=>{
                        let price = 0;
                        data.forEach(i=>{
                            price = price + i.Total_Price;
                        })
                        return price
                    }
                ),
                kitchenordercount:await adminClass.getCategorywiseData("Home & Kitchen").then(
                    data=>{
                        return data.length
                    }
                ),
                Kitchenhead:await adminClass.getCategorywiseData("Home & Kitchen").then(
                    data=>{
                        return Object.keys(Object.entries(data[0])[2][1]).slice(1,Infinity);
                    }),
                KitchenAllObject:await adminClass.getCategorywiseData("Home & Kitchen").then(
                    data=>{
                        return data;
                    }
                ),
                //electronics
                electronicsrevenue:await adminClass.getCategorywiseData("Electronics").then(
                    data=>{
                        let price = 0;
                        data.forEach(i=>{
                            price = price + i.Total_Price;
                        })
                        return price
                    }
                ),
                electronicsordercount:await adminClass.getCategorywiseData("Electronics").then(
                    data=>{
                        return data.length
                    }
                ),
                Electronicshead:await adminClass.getCategorywiseData("Electronics").then(
                    data=>{
                        return Object.keys(Object.entries(data[0])[2][1]).slice(1,Infinity);
                    }),
                ElectronicsAllObject:await adminClass.getCategorywiseData("Electronics").then(
                    data=>{
                        return data;
                    }
                ),
                //clothing
                clothingrevenue:await adminClass.getCategorywiseData("Clothing").then(
                    data=>{
                        let price = 0;
                        data.forEach(i=>{
                            price = price + i.Total_Price;
                        })
                        return price
                    }
                ),
                clothingordercount:await adminClass.getCategorywiseData("Clothing").then(
                    data=>{
                        return data.length
                    }
                ),
                Clothinghead:await adminClass.getCategorywiseData("Clothing").then(
                    data=>{
                        return Object.keys(Object.entries(data[0])[2][1]).slice(1,Infinity);
                    }),
                ClothingAllObject:await adminClass.getCategorywiseData("Clothing").then(
                    data=>{
                        return data;
                    }
                ),
                //books
                booksrevenue:await adminClass.getCategorywiseData("Books").then(
                    data=>{
                        let price = 0;
                        data.forEach(i=>{
                            price = price + i.Total_Price;
                        })
                        return price
                    }
                ),
                booksordercount:await adminClass.getCategorywiseData("Books").then(
                    data=>{
                        return data.length
                    }
                ),
                Bookshead:await adminClass.getCategorywiseData("Books").then(
                    data=>{
                        return Object.keys(Object.entries(data[0])[2][1]).slice(1,Infinity);
                    }),
                BooksAllObject:await adminClass.getCategorywiseData("Books").then(
                    data=>{
                        return data;
                    }
                ),
                //beauty
                beautyordercount:await adminClass.getCategorywiseData("Beauty & Health").then(
                    data=>{
                        return data.length
                    }
                ),
                Beautyhead:await adminClass.getCategorywiseData("Beauty & Health").then(
                    data=>{
                        return Object.keys(Object.entries(data[0])[2][1]).slice(1,Infinity);
                    }),
                BeautyAllObject:await adminClass.getCategorywiseData("Beauty & Health").then(
                    data=>{
                        return data;
                    }
                ),
                beautyandhealthrevenue:await adminClass.getCategorywiseData("Beauty & Health").then(
                    data=>{
                        let price = 0;
                        data.forEach(i=>{
                            price = price + i.Total_Price;
                        })
                        return price
                    }
                )
            });
        }
    }
    catch(err){
        console.log(err)
    }
}
exports.postproductData = async(req,res)=>{
    try{
        let addcategoryobj = {
            "Product_Category":req.body.newcategory
        }
        await adminClass.addNewCategory(addcategoryobj);
        return res.redirect('/product');
    }
    catch(err){
        console.log("Error is post new Category");
    }
}
exports.deleteProductCategory = async(req,res)=>{
    try{
        let productCategoryName = {
            "Product_Category":req.params.name
        }
        await adminClass.DeleteCategory(productCategoryName);
        req.flash('success','Successfully Deleted');
        return res.redirect('/product');
    }
    catch(err){
        console.log("Error in Delete Product Category");
    }
}
exports.custmorData = async(req,res)=>{
    try{
        if(adminObj)
        {
            console.log("customer page")
            return res.render('data',{tok:req.session.token,titlehead:"Customer",name:adminObj.firstName});
        }
    }
    catch(err){
        console.log(err)
    }
}
exports.reportData = async(req,res)=>{
    try{
        if(adminObj)
        {
            console.log("report page")
            
            return res.render('data',{tok:req.session.token,titlehead:"Report",name:adminObj.firstName});
        }
    }
    catch(err){
        console.log(err)
    }
}
exports.integrationData = async(req,res)=>{
    try{
        if(adminObj)
        {
            console.log("product page")
            return res.render('data',{tok:req.session.token,titlehead:"Integrations",name:adminObj.firstName});
        }
    }
    catch(err){
        console.log(err)
    }
}
exports.Setting = async(req,res)=>{
    try{
        if(adminObj)
        {
            console.log("setting page")
            return res.render('data',{tok:req.session.token,titlehead:"Setting",name:adminObj.firstName});
        }
    }
    catch(err){
        console.log(err)
    }
}
exports.profileData = async(req,res)=>{
    try{
        if(adminObj)
        {
            console.log("profile page")
            return res.render('profile',
            {
                tok: req.session.token,
                name : adminObj.firstName,
                imgurl:adminObj.imgURL,
                role:adminObj.role,
                email:adminObj.email,
                phone:adminObj.phoneNumber,
                address:adminObj.address
            });
        }
    }
    catch(err){
        console.log(err)
    }
}

exports.admindetailsAPI = async(req,res)=>{
    return res.send(await adminClass.getadmindata().then(u=>{return u}));
}
exports.ProductListData = async(req,res)=>{
    let productcategoryname = req.params.categoryname;
    let productcategoryobject = {};
    productcategoryobject.response = "ok";
    productcategoryobject.items = await adminClass.ProductCategoryWiseData(productcategoryname).then(i=>{ return i.items});
    productcategoryobject.data = await adminClass.ProductCategoryWiseData(productcategoryname).then(i=>{return i.data});
    return res.send(productcategoryobject);
}
exports.CategoryListData = async(req,res)=>{
     await adminClass.getCategoryList().then(i=>{return res.send(i)});
}