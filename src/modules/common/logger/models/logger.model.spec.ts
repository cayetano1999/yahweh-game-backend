import { LoggerModel } from "./logger.model";

describe('unit tests of models',()=>{
    test('logger tests',()=>{
        const log = new LoggerModel();
        expect(log).toBeInstanceOf(LoggerModel);
    })
});