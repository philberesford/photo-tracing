import Image from 'image-js';

// TODO Figure out how to make this TS error disappear
const cannyEdgeDetector = require('canny-edge-detector');
 
export const image = () => {
    let imgRef: any = null;
    const worker = {        
        load: async (path: string): Promise<any> => {
            imgRef = await Image.load(path);
        },
        findEdges: async (): Promise<any> => {
            const grey = imgRef.grey();
            const edge = cannyEdgeDetector(grey);
            console.log(edge);
            await edge.save('C:\\sample-just-edges.jpg');
            console.log('saved');
            return;
        }
    }; 
    return worker;
};