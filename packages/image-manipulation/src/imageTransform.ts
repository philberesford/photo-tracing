import Image from 'image-js';

type EdgeOptions = {
    lowThreshold?: number,
    highThreshold?: number,
    gaussianBlur?: number
    brightness?: number
};

type ImageTransform = {
    load(path: string): Promise<ImageTransform>;
    toGrey(): ImageTransform;
    invert(): ImageTransform;
    findEdges(edgeOptions?: EdgeOptions): ImageTransform;
    save(path: string): Promise<ImageTransform>;
    toImage(): Image;
};

export const imageTransform = (image?: Image): ImageTransform => {
    return {        
        load: async (path: string): Promise<ImageTransform> => imageTransform(await Image.load(path)),
        toGrey: () => imageTransform(image.grey()),
        invert: (): ImageTransform => imageTransform(image.invert()),
        findEdges: (edgeOptions?: EdgeOptions): ImageTransform => {
            debugger;
            const grey = image.grey();
            const defaultEdgeOptions = {
                lowThreshold: 50,
                highThreshold: 100,
                gaussianBlur: 1.4
            };
            const options = edgeOptions ? edgeOptions : defaultEdgeOptions;
            return imageTransform((grey as any).cannyEdge(options));            
        },     
        save: async (path: string): Promise<ImageTransform> => {
            await image.save(path)
            return imageTransform(image);
        },
        toImage: () => image   
    }; 
};