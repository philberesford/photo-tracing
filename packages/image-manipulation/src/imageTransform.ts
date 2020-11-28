import Image from 'image-js';

type ImageTransform = {
    load(path: string): Promise<ImageTransform>;
    toGrey(): ImageTransform;
    invert(): ImageTransform;
    findEdges(edgeOptions?: EdgeOptions): ImageTransform;
    save(path: string): Promise<ImageTransform>;
};

type EdgeOptions = {
    lowThreshold?: number,
    highThreshold?: number,
    gaussianBlur?: number
    brightness?: number
};

export const imageTransform = (image?: any | Image): ImageTransform => {
    return {        
        load: async (path: string): Promise<ImageTransform> => imageTransform(await Image.load(path)),
        toGrey: () => imageTransform(image.grey()),
        invert: (): ImageTransform => imageTransform(image.invert()),
        findEdges: (edgeOptions?: EdgeOptions): ImageTransform => {
            const grey = image.grey();
            const defaultEdgeOptions = {
                lowThreshold: 50,
                highThreshold: 100,
                gaussianBlur: 1.4
            };
            const options = edgeOptions ? edgeOptions : defaultEdgeOptions;
            return imageTransform(grey.cannyEdge(options));            
        },
        
        save: async (path: string): Promise<ImageTransform> => {
            await image.save(path)
            return imageTransform(image);
        }
    }; 
};