// ADD THIS !!!
const server  = require('./server');

// THEN ADD THIS !!!
const request = require('supertest');

describe(`'server tests !!!! `, () => {
    console.log('>>>>>>. Server Tests Started');
    it(' should set up the test environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });
  
    describe('verify GET / returns SANITY CHECK with 200 status' , () => {
        const expectedStatusCode_200 = 200;
        const expectedBody = {message: ` sanity message`};

        it(`should return sanity chceck & status 200 using Promise .then`, () => {
            let response;
            return request(server)
                .get('/')
                .then(res => {
                    response = res;

                    expect(response.status).toEqual(expectedStatusCode_200);
                    expect(response.body).toEqual(expectedBody);
                })

        })

        it('should return sanity check & status 200 using Promise async/await', async () => {
            const expectedStatusCode_200 = 200;
            const expectedBody = {message: ` sanity message`};

            const response = await request(server)  // NO semicolon here
                .get('/');  // only put semicolon here    
                expect(response.status).toBe(200);
                expect(response.body).toEqual(expectedBody);
        })

        it('should return JSON', async () => {
            const res = await request(server).get('/');
            expect(res.type).toBe('application/json');
        })

    })
    

});