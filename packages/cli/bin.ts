import { Logger, Text } from '@adalov/common';
import { Console } from 'console';
import { Adalov } from './lib/main';

/** Generate dependencies */
const text = new Text();
const logger = new Logger(text, () => new Console(process.stdout, process.stdout));

/** Bootstrap */
const adalov = new Adalov(logger);

(() => adalov.runCli())();
