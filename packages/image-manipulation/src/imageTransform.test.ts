import { expect } from 'chai';
import { imageTransform } from './image';

describe('Image', () => { 
    it('Loads an image', async () => { 
            const img = await imageTransform().load('C:\\sample.jpg');
            await img.findEdges().save('C:\\sample-edges-only.jpg');
    });
});
