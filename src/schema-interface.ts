import { convertFromDirectory } from 'joi-to-typescript';

convertFromDirectory({
    schemaDirectory: './src/joi-schemas',
    typeOutputDirectory: './src/interfaces',
    debug: true
});