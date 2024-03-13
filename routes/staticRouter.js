const express= require('express');
const Router= express.Router();
const { getAllBook, searchFunction, filterFunction} = require('../controllers/book')

Router.get('/', getAllBook);
Router.get('/newbook', async(req,res)=>{
   return res.render('form.ejs')}
   );
Router.get('/search',async(req, res)=>{
   try{
      const query= req.query.query;
      const result= await searchFunction(query);
      return res.json(result);
   }
   catch (error) {
      console.error("Error in search:", error);
      return res.status(500).json({ error: "Internal server error" });
  }
})
Router.get('/filter',async(req, res)=>{
   try{
      const query= req.query.query;
      const result= await filterFunction(query);
      return res.json(result);
   }
   catch (error) {
      console.error("Error in search:", error);
      return res.status(500).json({ error: "Internal server error" });
  }
})

module.exports= Router