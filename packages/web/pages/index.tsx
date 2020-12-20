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
        <ol>
          <li>Click the 'Browse...' button to choose a file that you want to resize to print as A3</li>
          <li>Press the 'Print results' button to send it to your printer</li>
        </ol>
      </p>
    </div>
    <ImagePicker />    
  </Layout>
);

const ImagePicker = () => {
  const [imgSrc, setImgSource] = useState(null as any);
  const [firstHalfSrc, setFirstHalfSource] = useState(null as any);
  const [secondHalfSrc, setSecondHalfSource] = useState(null as any);
  const [printButtonClasses, setPrintButtonClasses] = useState(styles.visiblyhidden as any);
  
  const isLandscape = (width: number, height: number) => {
    return width > height;    
  };

  const imageSelected = async (imageSource: any) => {   
    setImgSource(imageSource);
    
    const image = await imageTransform().load(imageSource);

    const { width, height } = image.meta();

    const edges = image.findEdges()
                       .invert()
                       .toImage()

    let firstHalf = "";
    let secondHalf = "";

    if (isLandscape(width, height)) {
      const midPoint = edges.width/2;
      firstHalf = edges.crop({width: midPoint}).toDataURL();                                           
      secondHalf = edges.crop({x: midPoint}).toDataURL();                                           
    } else {
      const midPoint = edges.height/2;
      firstHalf = edges.crop({height: midPoint}).toDataURL();                                           
      secondHalf = edges.crop({y: midPoint}).toDataURL();
    }

    setPrintButtonClasses({});
    setFirstHalfSource(firstHalf);
    setSecondHalfSource(secondHalf);     
  };

  const fileChanged = (args: any) => { 
    const file = (args.target?.files && args.target?.files.length > 0) ? args.target?.files[0] : null; 
    const reader = new FileReader();
    reader.addEventListener("load", () => imageSelected(reader.result), false);

    if (file) {
      reader.readAsDataURL(file);
    }
};

  return (
    <>
      <div className={styles.noprint}>
        <div className={styles.loader}>
          <div className="form-floating mb-3">
            <input  className="form-control-file" type="file" onChange={fileChanged} />
            <button className={printButtonClasses} onClick={() => window.print()}>Print result</button>
          </div>
          <br />
          <br />
                    
          <img src={imgSrc} style={{height: 200}} alt="" />
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
