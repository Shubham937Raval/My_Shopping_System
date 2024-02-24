const os = require('os');
const SuperAdmin = require('../Model/adminModel');
const lodash = require('lodash');
const jwt = require('jsonwebtoken');
const isSold = require('../Model/isSoldProductModel.js')
const CategoryModel = require('../Model/categoryModel.js');
const laptopProductModel = require('../Model/laptopProductModel.js');
const mobileProductModel = require('../Model/mobileProductModel.js');
const foodProductModel = require('../Model/foodProductModel.js');
const furnProductModel = require('../Model/furnProductModel.js');
const menswearProductModel = require('../Model/menswearProductModel.js');
const womenswearProductModel = require('../Model/womenswearProductModel.js');
const womenfootwearProductModel = require('../Model/womenfootwearProductModel.js');
const bookProductModel = require('../Model/bookProductModel.js');
const babbyProductModel = require('../Model/babbyProductModel.js');
var obj=[];
var today = new Date();
exports.adminClass = class admin{
    static async addSuperAdmin(data) {
        try {
          const create_super_admin = await SuperAdmin.create(data);
          return create_super_admin;
        } catch (error) {throw error}
      }
      static async checkAdmin(data){
        try{
            const input_admin = await SuperAdmin.find(data).then(
              async (i)=>{
                if(lodash.isEmpty(i[0])){
                  await SuperAdmin.find({email:data.email}).then(
                    async(ii)=>{
                      if(!lodash.isEmpty(ii[0])){
                        await SuperAdmin.findByIdAndUpdate(ii[0]._id.toString(),
                        {
                          $push:{
                            failedLogins:{
                              Data:today.toISOString(),
                              ip : {
                                    local:os.networkInterfaces()
                                  }      
                            }
                          }
                        })
                      }
                    }
                  )
                }
                return i
              }
            )
            return input_admin;
        }
        catch(err){throw err}
      }
      static async loginToken(objId){
        try{
          let tok = jwt.sign({"_id":objId},'adminLogin-key');
          obj.push(objId)
          let updateDoc = async (id)=>{
            return await SuperAdmin.findByIdAndUpdate({_id:id},
                {
                    $set:{
                        token:tok
                    },$push:{
                      logins:{
                        Data:today.toISOString(),
                        ip : {
                          local:os.networkInterfaces()
                        }
                      }
                    }
                })
          }
          updateDoc(objId)
          return await SuperAdmin.find({_id:objId}).then(
            data=>{
              return data[0]
            }
          )
        }
        catch(err){}
      }
      static async tokenDestroy(objId){
        try{
          let updateDoc = async (id)=>{
            return await SuperAdmin.findByIdAndUpdate({_id:id},
                {
                    $set:{
                        token:null
                    }
                })
          }
          updateDoc(objId);
          return await SuperAdmin.find({_id:objId}).then(
            data=>{
              return data[0]
            }
          )
        }
        catch(err){

        }
      }
      static async addNewCategory(data){
        try{
          const create_new_category = await CategoryModel.create(data);
          return create_new_category;
        }
        catch(err){
          console.log("Error in create new category");
        }
      }
      static async DeleteCategory(data){
        try{
          return await CategoryModel.findOneAndDelete(data);
        }
        catch(err){
          console.log("Error in create new category");
        }
      }
      static async getrevenue(monthName){
        try{
          return await isSold.find().then(
            i=>{
              let revenue = 0;
              i.forEach(
                data=>{
                  if(data.Order_Date.toDateString().split(' ')[1] === monthName){
                    revenue = revenue + data.Total_Price;
                  }
                }
              )
              return revenue;
            }
          )
        }
        catch(err){
          console.log("Error in revenue according to month name");
        }
      }
      static async getLifeTimeRevenuecount(){
        try{
          let count = 0;
          await isSold.find().then(
            data=>{
              data.forEach(i=>{
                count = i.Total_Price + count;
              })
            }
          )
          return count;
        }
        catch(err){
          console.log("Life time revenue count error!");
        }
      }
      static async getLifeTimeOrdercount(){
        try{
          let count = 0;
          await isSold.find().then(
            data=>{
              data.forEach(i=>{
                if(i.Order_Status === "Completed")
                {
                  count = count + 1;
                }
              })
            }
          )
          return count;
        }
        catch(err){
          console.log("Life time order count error!");
        }
      }
      static async getTodayOrdercount(){
        try{
          let count = 0;
          await isSold.find().then(
            data=>{
              data.forEach(i=>{
                if(i.Order_Date.toISOString().split('T')[0] === today.toISOString().split('T')[0])
                {
                  count = count + 1;
                }
              })
            }
          )
          return count;
        }
        catch(err){
          console.log("Today order count error!");
        }
      }
      static async getTodayRevenuecount(){
        try{
          let count = 0;
          await isSold.find().then(
            data=>{
              data.forEach(i=>{
                if(i.Order_Date.toISOString().split('T')[0] === today.toISOString().split('T')[0])
                {
                  count = count + i.Total_Price;
                }
              })
            }
          )
          return count;
        }
        catch(err){
          console.log("Today revenue count error!");
        }
      }
      static async getThisWeekOrdercount(){
        try{
          let count = 0;
          await isSold.find().then(
            data=>{
              data.filter(i=>{
                return i.Order_Date.toISOString().split('T')[0].split('-')[0] === today.toISOString().split('T')[0].split('-')[0] 
                && i.Order_Date.toISOString().split('T')[0].split('-')[1] === today.toISOString().split('T')[0].split('-')[1]
              }).forEach(i=>{
                let starting = parseInt(today.toISOString().split('T')[0].split('-')[2])-today.getDay();
                let ending = starting + 6;
                if(i.Order_Date.toISOString().split('T')[0].split('-')[2] >= starting && i.Order_Date.toISOString().split('T')[0].split('-')[2] <= ending)
                {
                  count = count + 1;
                }
              })
            }
          )
          return count;
        }
        catch(err){
          console.log("This week order count error!");
        }
      }
      static async getThisMonthOrdercount(){
        try{
          let count = 0;
          await isSold.find().then(
            data=>{
              data.forEach(i=>{
                if(i.Order_Date.toISOString().split('T')[0].split('-')[0] === today.toISOString().split('T')[0].split('-')[0] && 
                i.Order_Date.toISOString().split('T')[0].split('-')[1] === today.toISOString().split('T')[0].split('-')[1])
                {
                  count = count + 1;
                }
              })
            }
          )
          return count;
        }
        catch(err){
          console.log("This month order count error!");
        }
      }
      static async getThisYearOrdercount(){
        try{
          let count = 0;
          await isSold.find().then(
            data=>{
              data.forEach(i=>{
                if(i.Order_Date.toISOString().split('T')[0].split('-')[0] === today.toISOString().split('T')[0].split('-')[0])
                {
                  count = count + 1;
                }
              })
            }
          )
          return count;
        }
        catch(err){
          console.log("This year order count error!");
        }
      }
      static async getLastYearOrdercount(){
        try{
          let count = 0;
          await isSold.find().then(
            data=>{
              data.forEach(i=>{
                if(+i.Order_Date.toISOString().split('T')[0].split('-')[0] === +today.toISOString().split('T')[0].split('-')[0]-1)
                {
                  count = count + 1;
                }
              })
            }
          )
          return count;
        }
        catch(err){
          console.log("Last year order count error!");
        }
      }
      static async getProductCategories(){
        try{
          return await CategoryModel.find().then(
            data=>{return data}
          );
        }
        catch(err){
          console.log("Error in getProductCategories")
        }
      }
      static async getCategoryList(){
        try{
          return await CategoryModel.find().then(i=>{return i});
        } 
        catch(err){
          console.log("Error in get Category List")
        }
      }
      static async getSportsRevenue(){
        try{
          let count = 0 ;
          await isSold.find().then(
            data=>{
              data.forEach(
                i=>{
                  if(i.Product_Category === "Sports & Outdoors")
                  {
                    count = count + i.Total_Price;
                  }
                }
              )
            }
          )
          return count;
        }
        catch(err){
          console.log("Error in getSportsRevenue")
        }
      }
      static async getSportsheadData(){
        try{
          let sportheadobj = [];
          sportheadobj.push({
            "sporthead":await isSold.findOne({"Product_Category":"Sports & Outdoors"}).then(
            data=>{
              return Object.keys(Object.values(data)[2]).slice(1,Infinity);
            }
          )
          })
          sportheadobj.push({
            allObjectData: await isSold.find().then(
              data=>{
                let temparr = [];
                data.forEach(i=>{
                  if(i.Product_Category === "Sports & Outdoors"){
                    temparr.push(i)
                  }
                })
                return temparr;
              }
            )
          })
          sportheadobj.push({
            items:  await isSold.find({"Product_Category" : "Sports & Outdoors"}).then(
              data=>{
                return data.length
              }
            )
          })
        return sportheadobj
        }
        catch(err){
          console.log("Error in Sports Data head")
        }
      }
      static async getHomeandKitchenRevenue(){
        try{
          let count = 0 ;
          await isSold.find().then(
            data=>{
              data.forEach(
                i=>{
                  if(i.Product_Category === "Home & Kitchen")
                  {
                    count = count + i.Total_Price;
                  }
                }
              )
            }
          )
          return count;
        }
        catch(err){
          console.log("Error in Home & Kitchen revenue count")
        }
      }
      static async getKitchenheadData(){
        try{
          let kitchenheadobj = [];
          kitchenheadobj.push({
            "kitchenhead":await isSold.findOne({"Product_Category":"Home & Kitchen"}).then(
            data=>{
              return Object.keys(Object.values(data)[2]).slice(1,Infinity);
            }
          )
          })
          kitchenheadobj.push({
            allObjectData: await isSold.find().then(
              data=>{
                let temparr = [];
                data.forEach(i=>{
                  if(i.Product_Category === "Home & Kitchen"){
                    temparr.push(i)
                  }
                })
                return temparr;
              }
            )
          })
          kitchenheadobj.push({
            items:  await isSold.find({"Product_Category" : "Home & Kitchen"}).then(
              data=>{
                return data.length
              }
            )
          })
        return kitchenheadobj
        }
        catch(err){
          console.log("Error in Home & Kitchen Data head")
        }
      }
      static async getEletronicsheadData(){
        try{
          let electronicheadobj = [];
          electronicheadobj.push({
            "electronichead":await isSold.findOne({"Product_Category":"Electronics"}).then(
            data=>{
              return Object.keys(Object.values(data)[2]).slice(1,Infinity);
            }
          )
          })
          electronicheadobj.push({
            allObjectData: await isSold.find().then(
              data=>{
                let temparr = [];
                data.forEach(i=>{
                  if(i.Product_Category === "Electronics"){
                    temparr.push(i)
                  }
                })
                return temparr;
              }
            )
          })
          electronicheadobj.push({
            items:  await isSold.find({"Product_Category" : "Electronics"}).then(
              data=>{
                return data.length
              }
            )
          })
        return electronicheadobj
        }
        catch(err){
          console.log("Error in Electronic Data head")
        }
      }
      static async getElectronicsRevenue(){
        try{
          let count = 0 ;
          await isSold.find().then(
            data=>{
              data.forEach(
                i=>{
                  if(i.Product_Category === "Electronics")
                  {
                    count = count + i.Total_Price;
                  }
                }
              )
            }
          )
          return count;
        }
        catch(err){
          console.log("Error in Electronics revenue count")
        }
      }
      static async getClothingheadData(){
        try{
          let clothingheadobj = [];
          clothingheadobj.push({
            "clothinghead":await isSold.findOne({"Product_Category":"Clothing"}).then(
            data=>{
              return Object.keys(Object.values(data)[2]).slice(1,Infinity);
            }
          )
          })
          clothingheadobj.push({
            allObjectData: await isSold.find().then(
              data=>{
                let temparr = [];
                data.forEach(i=>{
                  if(i.Product_Category === "Clothing"){
                    temparr.push(i)
                  }
                })
                return temparr;
              }
            )
          })
          clothingheadobj.push({
            items:  await isSold.find({"Product_Category" : "Clothing"}).then(
              data=>{
                return data.length
              }
            )
          })
        return clothingheadobj
        }
        catch(err){
          console.log("Error in Clothing Data head")
        }
      }
      static async getClothingRevenue(){
        try{
          let count = 0 ;
          await isSold.find().then(
            data=>{
              data.forEach(
                i=>{
                  if(i.Product_Category === "Clothing")
                  {
                    count = count + i.Total_Price;
                  }
                }
              )
            }
          )
          return count;
        }
        catch(err){
          console.log("Error in Clothing revenue count")
        }
      }
      static async getBeautyheadData(){
        try{
          let beautyheadobj = [];
          beautyheadobj.push({
            "beautyhead":await isSold.findOne({"Product_Category":"Beauty & Health"}).then(
            data=>{
              return Object.keys(Object.values(data)[2]).slice(1,Infinity);
            }
          )
          })
          beautyheadobj.push({
            allObjectData: await isSold.find().then(
              data=>{
                let temparr = [];
                data.forEach(i=>{
                  if(i.Product_Category === "Beauty & Health"){
                    temparr.push(i)
                  }
                })
                return temparr;
              }
            )
          })
          beautyheadobj.push({
            items:  await isSold.find({"Product_Category" : "Beauty & Health"}).then(
              data=>{
                return data.length
              }
            )
          })
        return beautyheadobj
        }
        catch(err){
          console.log("Error in Beauty and Health Data head")
        }
      }
      static async getbeautyandhealthRevenue(){
        try{
          let count = 0 ;
          await isSold.find().then(
            data=>{
              data.forEach(
                i=>{
                  if(i.Product_Category === "Beauty & Health")
                  {
                    count = count + i.Total_Price;
                  }
                }
              )
            }
          )
          return count;
        }
        catch(err){
          console.log("Error in Beauty & Health revenue count")
        }
      }
      static async getBooksheadData(){
        try{
          let booksheadobj = [];
          booksheadobj.push({
            "bookshead":await isSold.findOne({"Product_Category":"Books"}).then(
            data=>{
              return Object.keys(Object.values(data)[2]).slice(1,Infinity);
            }
          )
          })
          booksheadobj.push({
            allObjectData: await isSold.find().then(
              data=>{
                let temparr = [];
                data.forEach(i=>{
                  if(i.Product_Category === "Books"){
                    temparr.push(i)
                  }
                })
                return temparr;
              }
            )
          })
          booksheadobj.push({
            items:  await isSold.find({"Product_Category" : "Books"}).then(
              data=>{
                return data.length
              }
            )
          })
        return booksheadobj
        }
        catch(err){
          console.log("Error in Books Data head")
        }
      }
      static async getbooksRevenue(){
        try{
          let count = 0 ;
          await isSold.find().then(
            data=>{
              data.forEach(
                i=>{
                  if(i.Product_Category === "Books")
                  {
                    count = count + i.Total_Price;
                  }
                }
              )
            }
          )
          return count;
        }
        catch(err){
          console.log("Error in Books revenue count")
        }
      }

      static async getCategorywiseData(CategoryName){
        try{
          return await isSold.find({"Product_Category":CategoryName}).then(
            i=>{
              return i;
            }
          )
        }
        catch(err)
        {
          console.log("Error is CategorywiseData");
        }
      }

      static async getadmindata(){
        try{
          return await SuperAdmin.find().then(i=>{
            return i;
          })
        }
        catch(err){
          console.log("Error in admin details");
        }
      }
      static async ProductCategoryWiseData(productcategoryname){
        try{
          if(productcategoryname === "babies"){
            let product = {};
            product.data = await babbyProductModel.find().then(i=>{return i})
            product.items = await babbyProductModel.find().then(i=>{return i.length})
            return product;
          }else if(productcategoryname === "books"){
            let product = {};
            product.data = await bookProductModel.find().then(i=>{return i})
            product.items = await bookProductModel.find().then(i=>{return i.length})
            return product;
          }else if(productcategoryname === "food"){
            let product = {};
            product.data = await foodProductModel.find().then(i=>{return i})
            product.items = await foodProductModel.find().then(i=>{return i.length})
            return product;
          }else if(productcategoryname === "furniture"){
            let product = {};
            product.data = await furnProductModel.find().then(i=>{return i})
            product.items = await furnProductModel.find().then(i=>{return i.length})
            return product;
          }else if(productcategoryname === "laptop"){
            let product = {};
            product.data = await laptopProductModel.find().then(i=>{return i})
            product.items = await laptopProductModel.find().then(i=>{return i.length})
            return product;
          }else if(productcategoryname === "men-clothes"){
            let product = {};
            product.data = await menswearProductModel.find().then(i=>{return i})
            product.items = await menswearProductModel.find().then(i=>{return i.length})
            return product;
          }else if(productcategoryname === "mobiles"){
            let product = {};
            product.data = await mobileProductModel.find().then(i=>{return i})
            product.items = await mobileProductModel.find().then(i=>{return i.length})
            return product;
          }else if(productcategoryname === "women-clothes"){
            let product = {};
            product.data = await womenswearProductModel.find().then(i=>{return i})
            product.items = await womenswearProductModel.find().then(i=>{return i.length})
            return product;
          }else if(productcategoryname === "women-footwear"){
            let product = {};
            product.data = await womenfootwearProductModel.find().then(i=>{return i})
            product.items = await womenfootwearProductModel.find().then(i=>{return i.length})
            return product;
          }else{
            let product = {};
            product.data = "No data"
            product.items = "No data"
            return product;
          }
        }
        catch(err){
          console.log("Error in product categorywise data");
        }
      }
  }