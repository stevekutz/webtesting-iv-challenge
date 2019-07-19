
exports.seed = async function(knex) {  
      // Inserts seed entries
      await knex('foods').insert([
        {id: 1, name: 'spinach'},
        {id: 2, name: 'Greek yogurt'},
        {id: 3, name: 'blueberries'},
        {id: 4, name: 'beets'}
      ]);
};
