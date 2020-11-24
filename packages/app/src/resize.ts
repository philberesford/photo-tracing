interface Dimension {
    width: number;
    height: number;
}

const PaperDimension = {
    A4: {width: 210, height: 297},
    A3: {width: 297, height: 420},
}

type PaperSize = keyof typeof PaperDimension;

export const scaleTo = (from: Dimension, to: PaperSize): Dimension => {
    return from;
}