import { Card, Button, Typography } from 'antd';
import { useState } from 'react';
import { LottieOptions, useLottie } from 'lottie-react';
import heart from '../assets/colorful-heart.json';

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

  // Lottie animation options and init
  const options: LottieOptions = {
    animationData: heart,
    autoplay: false,
  };

  const { View, playSegments } = useLottie(options, { height: '60px' });

  // Animate the heart if user likes/unlikes photo
  const likeButtonAction = () => {
    setLiked(!liked);
    if (!liked) {
      playSegments([14, 65], true);
    } else {
      playSegments([117, 139], true);
    }
  };

  return (
    <Card
      hoverable
      style={{ maxWidth: '25vw', margin: '15px' }}
      cover={<img alt='example' src={imageUrl} />}
    >
      <Meta
        title={title}
        description={description}
        style={{ paddingBottom: '5%' }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginBottom: 5,
        }}
      >
        <Text>{author}</Text>
        <Text>{date}</Text>
      </div>
      <Button
        onClick={likeButtonAction}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: 0,
        }}
        type='text'
      >
        {View}
      </Button>
    </Card>
  );
};
