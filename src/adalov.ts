export class Adalov {
    public runCli(): void {
        console.log('Adalov works!');
    }
}

const adalov = new Adalov();

(() => adalov.runCli())();
