import { Card, Button, Typography, notification, Space } from 'antd';
import { useState } from 'react';
import { LottieOptions, useLottie } from 'lottie-react';
import heart from '../assets/colorful-heart.json';
import { LinkOutlined } from '@ant-design/icons';

interface CardProps {
  imageUrl: string;
  title: string;
  description: string;
  date: string;
  author: string;
}

export const SpaceCard = ({
  imageUrl,
  title,
  description,
  date,
  author,
}: CardProps) => {
  const { Meta } = Card;
  const { Text } = Typography;
  const [liked, setLiked] = useState<boolean>(false);

  const openNotification = () => {
    navigator.clipboard.writeText(imageUrl);
    notification.success({
      message: 'Image URL has been copied to clipboard',
      placement: 'bottomRight',
    });
  };

  // Lottie animation options and init
  const options: LottieOptions = {
    animationData: heart,
    autoplay: false,
  };

  const { View, playSegments } = useLottie(options, { height: '50px' });

  // Animate the heart if user likes/unlikes photo
  const likeButtonAction = () => {
    if (!liked) {
      playSegments([14, 65], true);
    } else {
      playSegments([117, 139], true);
    }
    setLiked(!liked);
  };

  return (
    <Card
      hoverable
      style={{
        maxWidth: '25vw',
        margin: '15px',
      }}
      cover={<img alt='example' src={imageUrl} />}
    >
      <Meta
        title={title}
        description={description}
        style={{ paddingBottom: '5%' }}
      />
      <Space direction='vertical' size='middle'>
        <Space direction='vertical'>
          <Text>{author}</Text>
          <Text>{date}</Text>
        </Space>
        <Space align='center'>
          <Button
            onClick={likeButtonAction}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: 0,
              margin: -10,
            }}
            type='text'
          >
            {View}
          </Button>
          <Button
            type='text'
            icon={<LinkOutlined />}
            size='large'
            onClick={() => {
              openNotification();
            }}
          />
        </Space>
      </Space>
    </Card>
  );
};
