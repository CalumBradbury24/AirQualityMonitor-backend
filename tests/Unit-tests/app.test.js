const { expectCt } = require("helmet");
const app = require("../../app");
const request = require("supertest"); //Allows for testing HTTP

describe('App.js Unit testing', () => {
    it('Any request on * undefined routes should return a 404 error', async() => {
        expect.assertions(1);
        const res = await request(app).get('/undefined-url-path');
        expect(res.statusCode).toBe(404);
    }) 
    it('request on / route should return 200 status code and a response body', async() => {
        expect.assertions(2);
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined()
    })
})

