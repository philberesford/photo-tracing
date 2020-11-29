import Layout from '../components/Layout';
import { imageTransform } from 'image-manipulation/lib/imageTransform'; // TODO figure out how to have the TypeScript loaders work with WebPack
import React, { useState } from 'react';

const IndexPage = () => (

  <Layout title="Photo tracing">
    <h1>Photo tracing</h1>
    <p>
      <ImagePicker />
    </p>
  </Layout>
);

const ImagePicker = () => {
  const [imgSrc, setImgSource] = useState(null as any);
  const [edgesSrc, setEdgesSource] = useState(null as any);
  
  const imageSelected = async (imageSource: any) => {   
    setImgSource(imageSource);
    
    const image = await imageTransform().load(imageSource);
    const edges = image.findEdges()
                       .invert()
                       .toImage()
                       .toDataURL();
    setEdgesSource(edges);
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
      <input type="file" onChange={fileChanged} />
      <br />
      <img src={imgSrc} height="200" alt="Image preview..." />
      <img src={edgesSrc} height="200" alt="Image preview..." />
    </>
  );
}

export default IndexPage;
