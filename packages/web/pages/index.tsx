import Layout from '../components/Layout';
import { imageTransform } from 'image-manipulation/lib/imageTransform'; // TODO figure out how to have the TypeScript loaders work with WebPack
import { PaperDimensions } from 'image-manipulation/lib/PaperDimensions';
import styles from './index.module.css';

import React, { useState } from 'react';

const IndexPage = () => (
  <Layout title="Photo tracing">
    <div className={styles.noprint}>
      <h1>Photo tracing</h1>
      <p>
        This app can be used to take an image that you have saved, and resize it to A3 but is printable using a standard A4 printer.
        All you'll need to do is tape the two printed images together using scellotape.
      </p>
      <p>
        To use the resizer:
      </p>
      <ol>
        <li>Click the 'Browse...' button to choose a file that you want to resize to print as A3</li>
        <li>Wait a bit of time, the images are quite large and can take some time to process</li>
        <li>Press the 'Print results' button to send it to your printer</li>
      </ol>      
    </div>
    <ImagePicker />    
  </Layout>
);

const ImagePicker = () => { 
  const [imgSrc, setImgSource] = useState(null as any);
  const [firstHalfSrc, setFirstHalfSource] = useState(null as any);
  const [secondHalfSrc, setSecondHalfSource] = useState(null as any);
  const [transformState, setTransformState] = useState('edges' as any);
  
  const [printButtonClasses, setPrintButtonClasses] = useState(styles.visiblyhidden as any);
  
  const isLandscape = (width: number, height: number) => {
    return width > height;    
  };

  const imageSelected = async (imageSource: any, transform: string) => { 
    let image = imgSrc;
    if (imageSource) {
      setImgSource(imageSource);    
      image = await imageTransform().load(imageSource);
    } else if (imgSrc) {
      image = await imageTransform().load(imgSrc);  // Else get it from the current state. TODO. This is disgusting!
    } else {
      return; // No image to operate on.
    }   

    const { width, height } = image.meta();
    const outputImage = (transform === 'edges') ? image.findEdges().invert().toImage() : image.toGrey().toImage();
    
    let firstHalf = "";
    let secondHalf = "";

    if (isLandscape(width, height)) {
      const midPoint = outputImage.width/2;
      firstHalf = outputImage.crop({width: midPoint}).toDataURL();                                           
      secondHalf = outputImage.crop({x: midPoint}).toDataURL();                                           
    } else {
      const midPoint = outputImage.height/2;
      firstHalf = outputImage.crop({height: midPoint}).toDataURL();                                           
      secondHalf = outputImage.crop({y: midPoint}).toDataURL();
    }

    setPrintButtonClasses({});
    setFirstHalfSource(firstHalf);
    setSecondHalfSource(secondHalf);     
  };

  const fileChanged = (args: any) => { 
    const file = (args.target?.files && args.target?.files.length > 0) ? args.target?.files[0] : null; 
    const reader = new FileReader();
    reader.addEventListener("load", () => imageSelected(reader.result, transformState), false);

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const transformChanged = (transform: string) => {
    setTransformState(transform); 
    imageSelected(null, transform);   
  };
  
  return (
    <>
      <div className={styles.noprint}>
        <div className={styles.loader}>
          <div className="form-floating mb-3">
            <input className="form-control-file" type="file" onChange={fileChanged} />            
            <button className={printButtonClasses} onClick={() => window.print()}>Print result</button>
          </div>
          <div className="form-check form-check-inline">
            <label htmlFor="findEdges" className="form-check-label">Find edges</label>
            <input type="radio" id="findEdges" className="form-check-input" onChange={() => transformChanged('edges')} name="imageOptions" checked={transformState == 'edges'} />
          </div>  
          <div className="form-check form-check-inline">
            <label htmlFor="greyScale" className="form-check-label">Greyscale</label>
            <input type="radio" id="greyScale" className="form-check-input" onChange={() => transformChanged('grey')} name="imageOptions" checked={transformState == 'grey'} />
          </div>          
          <div>
            <img src={imgSrc} style={{height: 200}} alt="" />
          </div>    
        </div>        
      </div>
      <div className="results">  
        <div className={styles.printedPage} style={{height: PaperDimensions.A4.height/2+'mm'}}>
          <img className={styles.a3FirstImage} src={firstHalfSrc} alt="" />
        </div>
        <div className={styles.printedPage} style={{height: PaperDimensions.A4.height/2+'mm'}}>
          <img className={styles.a3SecondImage} src={secondHalfSrc} alt="" />
        </div>
      </div>
    </>    
  );
}

export default IndexPage;
