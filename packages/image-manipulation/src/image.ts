import Image from 'image-js';
 
export const image = () => {
    let imgRef: any = null;
    const worker = {        
        load: async (path: string): Promise<any> => {
            imgRef = await Image.load(path);
        },
        findEdges: async (): Promise<any> => {
            const grey = imgRef.grey();
            const options = {
                lowThreshold: 50,
                highThreshold: 100,
                gaussianBlur: 1.4
                //brightness: imageRef.maxValue
            };

            const edge = grey.cannyEdge(options);
            await edge.save('C:\\sample-just-edges.jpg');
        
            console.log('saved');
            return;
        }
    }; 
    return worker;
};