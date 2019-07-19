const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById,
};

async function insert(food) {
 // return db('food').insert(food); 
 
 const [id] = await db('foods').insert(food);

 return findById(id);
}

async function update(id, changes) {
  return db('foods')
    .where({id})
    .update(changes);
}

function remove(id) {
    return db('foods')
    .where({id})
    .del();
}

function getAll() {
  return db('foods');
}


function findById(id) {
  return db('foods')
  .where({id})
  .first();

}