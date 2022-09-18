import fetch from 'node-fetch';
import { dependencies } from './dependencies';

// @ts-expect-error
dependencies.fetch = fetch;

export * from './main';
