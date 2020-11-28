import { expect } from 'chai';
import { image } from './image';

describe('Image', () => { 
    it('Loads an image', async () => { 
        const worker = image();
            await worker.load('C:\\sample.jpg');
            await worker.findEdges();
    });
});
