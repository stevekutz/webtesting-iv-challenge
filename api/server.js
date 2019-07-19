const express = require('express');

//define express app as server
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



  module.exports = server;