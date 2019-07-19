const express = require('express');


// define model namesapce
const Foods = require('../foods/foodsModel');

//define express app as server, provides req.body
const server = express();



// mount middleware
server.use(express.json());

// sanity check
server.get('/', (req, res) => {
    res.cookie('sanityCookieHere', 'cookieForSanity');
  
    // res.status(200).json({message: ` sanity message`});
      // OR
  
     res.status(200)
     // OR  .send(`<h2> Sanity HTML code here </h2>`)
        .json({message: ` sanity message`});
  
  })


  server.get('/foods', async(req,res) => {

    try{
      const foods = await Foods.getAll()   // getAll >> return db('hobbits');
      console.log(foods);
      res.status(200).json(foods);
    }
    catch (err){
      res.status(500).json(err);
    }
  })

  server.get('/foods/:id', async(req, res) => {
    const {id} = req.params;
    
    try{
      const food = await Foods.findById(id);
      console.log('server promise Food', food);
       
      if(food){
        res.status(200).json(food)
      } else {
        res.status(451).json({
          message: `${id} not found`
        })
      }
    }
    catch (err) {
      res.status(500).json({
        message: `ERROR`
      });
    }
  })

  server.post('/foods', noDups, async (req, res) => {
    try{
        if(req.body.name === '') {
            res.status(451).json({
                message: `Please add a food item`
            })
        } else {
            const foodItem = await Foods.insert(req.body);
            console.log(' !!!!!  foodItem is ', foodItem);
            res.status(201).json({foodItem});
        }    
  }
  catch (err) {
      res.status(500).json({
        message: `ERROR`
      });
    }
})


/*
  server.post('/foods', async (req, res) => {
      try{
          if(req.body.name === '') {
              res.status(451).json({
                  message: `Please add a food item`
              })
          } else {
              const foodItem = await Foods.insert(req.body);
              console.log(' !!!!!  foodItem is ', foodItem);
              res.status(201).json({foodItem});
          }    
    }
    catch (err) {
        res.status(500).json({
          message: `ERROR`
        });
      }
  })
*/
  // promise returns # of affected rows
  //   when deleted items exists, returns 1
  // when deleted item does not exist, return 0
  server.delete('/foods/:id', async(req, res) => {
    const {id} = req.params;
    
    try{
      const food = await Foods.remove(id);
      console.log('server promise Food', food)
       
      if(food){
        res.status(200).json(food)
      } else {
        res.status(451).json({
          message: `${id} not found`
        })
      }
    }
    catch (err) {
      res.status(500).json({
        message: `ERROR`
      });
    }
  })

  server.put('/foods/:id', async(req, res) => {
    const updatedFood = req.body;
    const {id} = req.params;

    try{
        const foodUpdate = await Foods.update(id, updatedFood);

        if(foodUpdate){
            res.status(201).json({updatedFood})
        } else {
            res.status(451).json({
                message: `Food id ${id} does not exist`
            })
        }
    }
    catch (err) {
        res.status(500).json({
          message: `ERROR`
        });
      }
  })

  // custom middleware
  async function noDups(req, res, next) {
    try {
        const {name} = req.body;
        const nameExists = await Foods.findByName(name);
        console.log('***  name is ', name);
        console.log('*** nameExists is ', nameExists);

        if(nameExists){
            res.status(451).json({
                message: ` food ${name} already exists, not added`
            })
        } else {
            next();
        }
    }
    catch (err) {
        res.status(500).json({
          message: `ERROR in MW`
        });
      }
  }



  module.exports = server;