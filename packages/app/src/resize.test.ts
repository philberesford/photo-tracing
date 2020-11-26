import { expect } from 'chai';
import { Dimension } from './Dimension';
import {getMaxScalingFactor} from './resize';

describe('getMaxScalingFactor', () => { 
    it('Throws when from width < 0', () => {  
        const from: Dimension = {
            heightMm: 1,
            widthMm: -1
        };

        const func = () => getMaxScalingFactor(from, "A4");
        
        expect(func).to.throw; 
    });

    it('Throws when from height < 0', () => {  
        const from: Dimension = {
            heightMm: -1,
            widthMm: 1
        };

        const func = () => getMaxScalingFactor(from, "A4");
        
        expect(func).to.throw; 
    });
});
