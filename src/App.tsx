import { Layout, Typography, Row, Col } from 'antd';
import { SpaceCard } from './components';
import { Photo } from './types/Photo';
import Lottie from 'lottie-react';
import loader from './assets/loading-shapes.json';

import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

const App = () => {
  const { Header, Content, Footer } = Layout;
  const { Text } = Typography;
  const [images, setImages] = useState<Photo[]>();

  // Get images from the NASA API
  const fetchImages = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}?api_key=${process.env.REACT_APP_API_KEY}&count=25`
    );
    return res.data;
  };

  const getImages = useCallback(() => {
    const fetchImage = async () => {
      const resp = await fetchImages();
      setImages(resp);
    };

    fetchImage();
  }, []);

  // Make the call to retrieve images from NASA
  useEffect(() => {
    getImages();
  }, [getImages]);

  return (
    <Layout className='layout'>
      <Header style={{ height: '10vh', display: 'flex', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 25 }} strong>
          Spacestagram 🌙
        </Text>
      </Header>
      <Content
        style={{
          padding: '50px 100px',
          minHeight: '80vh',
        }}
      >
        {images ? (
          // Displays images
          <Row>
            {images?.map((image) => (
              <Col span={8}>
                <SpaceCard
                  imageUrl={image.url}
                  title={image.title}
                  description={image.explanation}
                  date={image.date}
                  author={image.copyright}
                />
              </Col>
            ))}
          </Row>
        ) : (
          // Loading State
          <Lottie animationData={loader} style={{ height: '60vh' }} />
        )}
      </Content>
      <Footer style={{ textAlign: 'center', height: '10vh' }}>
        ©2022 Daniel Shwan - Images from NASA
      </Footer>
    </Layout>
  );
};

export default App;
