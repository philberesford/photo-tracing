export const PaperDimensions = {
    A4: {width: 210, height: 297},
    A3: {width: 297, height: 420},
}

export type PaperSize = keyof typeof PaperDimensions;