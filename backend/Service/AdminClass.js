const SuperAdmin = require('../Model/adminModel');
const jwt = require('jsonwebtoken');
const isSold = require('../Model/isSoldProductModel.js')
const CategoryModel = require('../Model/categoryModel.js');
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
              (i)=>{
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
  }
