import { Dimension } from "./Dimension";
import { PaperSize } from "./PaperDimensions"
import { Throw } from 'utilities';

export const getMaxScalingFactor = (from: Dimension, to: PaperSize): number => {
    Throw.if(from.heightMm < 0, 'From height must be greater than zero.');
    Throw.if(from.widthMm < 0, 'From width must be greater than zero.');

    return 2;
}