const {adminClass} = require('../Service/AdminClass');
const lodash = require('lodash');
var adminObj;
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
            return res.render('data',{tok:req.session.token,titlehead:"Dashboard",name:adminObj.firstName,totalLifetimeRevenue:lifetimeearning,totalLifetimeOrder:lifeTimeOrder,todayOrder:todayOrder,todayRevenue:todayRevenue});
        }
    }
    catch(err){
        console.log(err)
    }
}
exports.postdashboardData = async(req,res)=>{
    try{
        let addcategoryobj = {
            "Product_Category":req.body.newcategory
        }
        await adminClass.addNewCategory(addcategoryobj);
        return res.redirect('/dashboard');
    }
    catch(err){
        console.log(err);
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
            //Sports
            let getSportsheadData = await adminClass.getSportsheadData().then(
                i=>{
                    return i[0].sporthead;
                });
            let getsportAllData = await adminClass.getSportsheadData().then(
                i=>{
                    return i[1].allObjectData;
                }
            )
            let getSportsordercount = await adminClass.getSportsheadData().then(
                i=>{
                    return i[2].items;
                }
            )
            let getSportsRevenue = await adminClass.getSportsRevenue();
                //Kitchen
            let getKitchenheadData = await adminClass.getKitchenheadData().then(
                i=>{
                    return i[0].kitchenhead;
                });
            let getkitchenAllData = await adminClass.getKitchenheadData().then(
                i=>{
                    return i[1].allObjectData;
                }
            )
            let getkitchenordercount = await adminClass.getKitchenheadData().then(
                i=>{
                    return i[2].items;
                }
            )
            let getHomeandKitchenRevenue = await adminClass.getHomeandKitchenRevenue();

                //Electronics
                let getEletronicsheadData = await adminClass.getEletronicsheadData().then(
                    i=>{
                        return i[0].electronichead;
                    });
                let getelectronicAllData = await adminClass.getEletronicsheadData().then(
                    i=>{
                        return i[1].allObjectData;
                    }
                )
                let getelectronicordercount = await adminClass.getEletronicsheadData().then(
                    i=>{
                        return i[2].items;
                    }
                )
            let getElectronicsRevenue = await adminClass.getElectronicsRevenue();
                //Clothing
            let getClothingheadData = await adminClass.getClothingheadData().then(
                i=>{
                    return i[0].clothinghead;
                });
            let getclothingAllData = await adminClass.getClothingheadData().then(
                i=>{
                    return i[1].allObjectData;
                }
            )
            let getclothingordercount = await adminClass.getClothingheadData().then(
                i=>{
                    return i[2].items;
                }
            )
            let getClothingRevenue = await adminClass.getClothingRevenue();

                //Beauty
                let getBeautyheadData = await adminClass.getBeautyheadData().then(
                    i=>{
                        return i[0].beautyhead;
                    });
                let getbeautyAllData = await adminClass.getBeautyheadData().then(
                    i=>{
                        return i[1].allObjectData;
                    }
                )
                let getbeautyordercount = await adminClass.getBeautyheadData().then(
                    i=>{
                        return i[2].items;
                    }
                )
            let getbeautyandhealthRevenue = await adminClass.getbeautyandhealthRevenue();

                //Books
                let getBooksheadData = await adminClass.getBooksheadData().then(
                    i=>{
                        return i[0].bookshead;
                    });
                let getbooksAllData = await adminClass.getBooksheadData().then(
                    i=>{
                        return i[1].allObjectData;
                    }
                )
                let getbooksordercount = await adminClass.getBooksheadData().then(
                    i=>{
                        return i[2].items;
                    }
                )
            let getbooksRevenue = await adminClass.getbooksRevenue();
            return res.render('data',
            {
                tok:req.session.token,
                titlehead:"Product",
                name:adminObj.firstName,
                Category:CategoryList,
                //sports
                sportsrevenue:getSportsRevenue,
                sportordercount:getSportsordercount,
                Sportshead:getSportsheadData,
                SportAllObject:getsportAllData,
                //kitchen
                homeandkitchenrevenue:getHomeandKitchenRevenue,
                kitchenordercount:getkitchenordercount,
                Kitchenhead:getKitchenheadData,
                KitchenAllObject:getkitchenAllData,
                //electronics
                electronicsrevenue:getElectronicsRevenue,
                electronicsordercount:getelectronicordercount,
                Electronicshead:getEletronicsheadData,
                ElectronicsAllObject:getelectronicAllData,
                //clothing
                clothingrevenue:getClothingRevenue,
                clothingordercount:getclothingordercount,
                Clothinghead:getClothingheadData,
                ClothingAllObject:getclothingAllData,
                //books
                booksrevenue:getbooksRevenue,
                booksordercount:getbooksordercount,
                Bookshead:getBooksheadData,
                BooksAllObject:getbooksAllData,
                //beauty
                beautyordercount:getbeautyordercount,
                Beautyhead:getBeautyheadData,
                BeautyAllObject:getbeautyAllData,
                beautyandhealthrevenue:getbeautyandhealthRevenue
            });
        }
    }
    catch(err){
        console.log(err)
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