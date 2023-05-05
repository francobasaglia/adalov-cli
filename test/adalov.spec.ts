import { Adalov } from '../src/adalov';

describe('AdalovCli entry point', () => {
    let adalov: Adalov;

    beforeEach(() => {
        adalov = new Adalov();
    });

    it('should call runCli() when immediately invoked', () => {
        const runCliSpy = jest.spyOn(adalov, 'runCli');

        (() => adalov.runCli())();

        expect(runCliSpy).toHaveBeenCalled();
    });
});
