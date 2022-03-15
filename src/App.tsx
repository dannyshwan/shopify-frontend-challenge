import { Layout, Typography, Row, Col, Pagination, DatePicker } from 'antd';
import { SpaceCard } from './components';
import { Photo } from './types/Photo';
import Lottie from 'lottie-react';
import loader from './assets/loading.json';

import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';

const App = () => {
  const { Header, Content, Footer } = Layout;
  const { RangePicker } = DatePicker;
  const { Text } = Typography;
  const [images, setImages] = useState<Photo[] | undefined>();

  // Pagination
  const [pageSize, setPageSize] = useState<number>(9);
  const [current, setCurrent] = useState<number>(1);
  const [minIndex, setMinIndex] = useState<number>(0);
  const [maxIndex, setMaxIndex] = useState<number>(pageSize);

  // Date picker
  const [startDateState, setStartDateState] = useState<string>(
    moment().subtract(25, 'days').format('YYYY-MM-DD')
  );
  const [endDateState, setEndDateState] = useState<string>(
    moment().format('YYYY-MM-DD')
  );

  // Get images from the NASA API
  const fetchImages = async (startDate: string, endDate: string) => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}?api_key=${process.env.REACT_APP_API_KEY}&start_date=${startDate}&end_date=${endDate}`
    );
    return res.data;
  };

  const getImages = useCallback((startDate: string, endDate: string) => {
    const fetchImage = async () => {
      const resp: Photo[] = await fetchImages(startDate, endDate);
      setImages(resp.reverse());
    };

    fetchImage();
  }, []);

  // Make the call to retrieve images from NASA
  useEffect(() => {
    setImages(undefined);
    getImages(startDateState, endDateState);
  }, [startDateState, endDateState]);

  // Action for when we change pages
  const paginationChange = (page: number) => {
    setCurrent(page);
    setMinIndex((page - 1) * pageSize);
    setMaxIndex(page * pageSize);
  };

  // Action for when dates are changed
  const onDateChange = async (_values: any, formatString: [string, string]) => {
    setStartDateState(formatString[0]);
    setEndDateState(formatString[1]);
  };

  // Disable dates past today
  const disableDates = (current: any) => {
    return current > moment().endOf('day');
  };

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
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <RangePicker disabledDate={disableDates} onChange={onDateChange} />
        {images ? (
          <>
            <Row align='top'>
              {images?.map(
                (image, index) =>
                  index >= minIndex &&
                  index < maxIndex && (
                    <Col span={8}>
                      <SpaceCard
                        key={index}
                        imageUrl={image.url}
                        title={image.title}
                        description={image.explanation}
                        date={image.date}
                        author={image.copyright}
                      />
                    </Col>
                  )
              )}
            </Row>
            <Pagination
              current={current}
              pageSize={pageSize}
              total={images?.length}
              onChange={paginationChange}
              onShowSizeChange={(_current, size) => setPageSize(size)}
            />
          </>
        ) : (
          // Loading State
          <Lottie
            animationData={loader}
            style={{ height: '60vh' }}
            initialSegment={[0, 100]}
            loop
          />
        )}
      </Content>
      <Footer style={{ textAlign: 'center', height: '10vh' }}>
        ©2022 Daniel Shwan - Images from NASA
      </Footer>
    </Layout>
  );
};

export default App;
