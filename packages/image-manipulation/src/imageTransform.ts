import Image, { CropOptions as CropOptionsImage, ResizeOptions as ResizeOptionsImage } from 'image-js';

export type EdgeOptions = {
    lowThreshold?: number,
    highThreshold?: number,
    gaussianBlur?: number
    brightness?: number
};

export type CropOptions = CropOptionsImage;

export type ResizeOptions = {
  width?: number;
  height?: number;
  factor?: number;
  preserveAspectRatio?: boolean;
};

export type RotateOptions = {
    angle: number;
};

export type ImageTransform = {
    crop(options: CropOptions): ImageTransform;
    load(path: string): Promise<ImageTransform>;
    toGrey(): ImageTransform;
    invert(): ImageTransform;
    findEdges(options?: EdgeOptions): ImageTransform;
    resize(options: ResizeOptions): ImageTransform;
    rotate(optoins: RotateOptions): ImageTransform;
    save(path: string): Promise<ImageTransform>;
    toImage(): Image;
};

export const imageTransform = (image?: Image): ImageTransform => {
    return {    
        crop: (options: CropOptions): ImageTransform => {
            return imageTransform(image.crop(options));
        },     
        findEdges: (edgeOptions?: EdgeOptions): ImageTransform => {
            const grey = image.grey();
            const defaultEdgeOptions = {
                lowThreshold: 50,
                highThreshold: 100,
                gaussianBlur: 1.4
            };
            const options = edgeOptions ? edgeOptions : defaultEdgeOptions;
            return imageTransform((grey as any).cannyEdge(options));            
        },
        invert: (): ImageTransform => imageTransform(image.invert()),
        load: async (path: string): Promise<ImageTransform> => imageTransform(await Image.load(path)),        
        resize: (options: ResizeOptionsImage): ImageTransform => {
            return imageTransform(image.resize(options));
        },
        rotate: (options: RotateOptions): ImageTransform => {
            return imageTransform(image.rotate(options.angle));        
        },
        save: async (path: string): Promise<ImageTransform> => {
            await image.save(path)
            return imageTransform(image);
        },
        toGrey: () => imageTransform(image.grey()),
        toImage: () => image   
    }; 
};