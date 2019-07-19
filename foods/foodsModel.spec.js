const server  = require('../api/server');
const db = require('../data/dbConfig');

const Foods = require('./foodsModel');


// NEEDED when we are  testing endponts, not needed when we are testing db methods
const request = require('supertest');

const someFoods =   [
    {name: 'cheese'},
    {name: 'chips'},
    {name: 'candy'}
    ]; 

const testFoods = someFoods.map( (food, i) => {
    return {id:i + 1, name: food.name};
})    


describe(` test db tests !!!! `, () => {
    
    describe('should insert foods into the db',  () => {
     // WE MUST clean up/reset db after each test
         beforeEach( async ()=> {   // ALSO WORKS  afterEach( async () =>
            await db('foods').truncate();
        });
    
        it(' should return insert some foods', async () => {
            // using model methods
            await Foods.insert({name : 'apple'});
            await Foods.insert({name : 'banana'});

            // confirm with knex
            const foods = await db('foods');

            expect(foods).toHaveLength(2);
            expect(foods[0].name).toBe('apple');
        });


        it('should return the new food on insert' , async () => {
             const food = await Foods.insert({name: 'apple'});

             expect(food).toEqual({id: 1, name: 'apple'});
        });

        it('should return food by id', async () => {
              
            await db('foods').insert([
                {name: 'apple'},
                {name: 'orange'},
                {name: 'peach'}
            ]);    
            
            const allFoods = await db('foods');
            console.log('>>>>>>>>>> ', allFoods);
            console.log('>>>>>>>> ', allFoods[0].name )

            const food = await Foods.findById(3);
            console.log('>>', food);

            expect(food.name).toBe('peach');  // must have first() in model
            //
        })

        it('returns null on invalid id', async () => {
                // REMEMBER that we reset db before each test
                const food = await Foods.findById(0);

                expect(food).toBeUndefined();
        })

        it('should hit foods endpoint and return [] with no test data', async () => {
                const res = await request(server).get('/foods');
                expect(res.status).toBe(200);
                expect(res.body).toEqual([]);
        })

        it('should return all foods in db', async () => {
            await db('foods').insert(someFoods);

            const res = await request(server).get('/foods');
            expect(res.status).toBe(200);
            expect(res.body).toEqual(testFoods);
        });

       
    });
    
});