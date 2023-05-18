import { Logger } from '@adalov/common';

export class Adalov {
    constructor(private logger: Logger) {}

    public runCli(): void {
        this.logger.success('Adalov works!');
    }
}
