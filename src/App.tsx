import { Layout, Typography, Row, Col } from 'antd';
import { SpaceCard } from './components';
import { Photo } from './types/Photo';

import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

const App = () => {
  const { Header, Content, Footer } = Layout;
  const { Text } = Typography;
  const [images, setImages] = useState<Photo[]>();

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

  useEffect(() => {
    getImages();
  }, []);

  if (!images) {
    return <div>loading</div>;
  }
  console.log(images);

  return (
    <Layout className='layout'>
      <Header style={{ minHeight: '10vh' }}>
        <Text style={{ color: 'white' }}>
          Spacestagram - Brought to you by NASA Image API
        </Text>
      </Header>
      <Content style={{ padding: '50px 100px', minHeight: '80vh' }}>
        <Row>
          {images?.map((image) => (
            <Col span={8}>
              <SpaceCard
                imageUrl={image.url}
                title={`${image.title} - ${image.date}`}
                description={image.explanation}
              />
            </Col>
          ))}
        </Row>
      </Content>
      <Footer style={{ textAlign: 'center', minHeight: '10vh' }}>
        ©2022 Daniel Shwan
      </Footer>
    </Layout>
  );
};

export default App;
