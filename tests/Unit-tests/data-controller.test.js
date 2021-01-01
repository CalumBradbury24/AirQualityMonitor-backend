const dataController = require('../../controllers/data-controller');
const SensorModel = require('../../models/sensor.model');
const httpMocks = require("node-mocks-http"); //Mock http objects for express routing functions for mocking req and res objects
const mockData = require("../mock-data.json")


SensorModel.find = jest.fn() // Mock find method

describe('Unit testing dataController.getData()', () => {

    let res, req, next;

    beforeEach(() => {
        req = httpMocks.createRequest()
        res = httpMocks.createResponse()
        next = jest.fn()
    })

    it('dataController.getData should be a function', () => {
        expect.assertions(1);
        expect(typeof dataController.getData).toBe("function")
    })   

    it('Should call sensorModel.find()', async() => {
        expect.assertions(2)
        await dataController.getData(req, res, next)
        expect(SensorModel.find).toHaveBeenCalled()
        expect(SensorModel.find).toBeCalledWith()
    })

    it('Should return a 200 status and all documents', async () => {
        expect.assertions(3)
        SensorModel.find.mockReturnValue(mockData)
        await dataController.getData(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(mockData); //toStrictEqual checks that objects have the same types as well as structure
    })

    it('Should handle errors/call next(error) if error occurs!', async () => {
        expect.assertions(1);
        const error = { status: 'failed', message: 'failed finding documents!'}
        const rejectedPromise = Promise.reject(error);
        SensorModel.find.mockReturnValue(rejectedPromise)
        await dataController.getData(req, res, next);
        expect(next).toBeCalledWith(error)
    })
});
