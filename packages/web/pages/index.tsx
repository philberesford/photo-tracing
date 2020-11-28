import Layout from '../components/Layout'
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
  const [imgSrc, setImgSrc] = useState(0);
  
  const fileChanged = (args) => { 
    const file = (args.target?.files && args.target?.files.length > 0) ? args.target?.files[0] : null; 
    const reader = new FileReader();
    reader.addEventListener("load", () => setImgSrc(reader.result), false)

    if (file) {
      reader.readAsDataURL(file);
    }
};

  return (
    <>
      <input type="file" onChange={fileChanged} />
      <br />
      <img src={imgSrc} height="200" alt="Image preview..." />
    </>
  );
}

export default IndexPage;
