import { expect } from 'chai';
import { Throw } from './Throw';

describe('Throw', () => {
    describe("if", () => {
        it('Throws when boolean is true', () => {
            const message = "error message"  
            const func = () => Throw.if(true, message);
            expect(func).to.throw(message); 
        });

        it('Does not throw when boolean is false', () => {  
            const func = () => Throw.if(false, "whatever");
            expect(func).not.to.throw; 
        });
    })
});
