import { Card, Button } from 'antd';
import { useState } from 'react';
import { LottieOptions, useLottie } from 'lottie-react';
import heart from '../assets/colorful-heart.json';

interface CardProps {
  imageUrl?: string;
  title?: string;
  description?: string;
}

export const SpaceCard = ({ imageUrl, title, description }: CardProps) => {
  const { Meta } = Card;
  const [liked, setLiked] = useState<boolean>(false);
  const options: LottieOptions = {
    animationData: heart,
    autoplay: false,
  };

  const { View, playSegments } = useLottie(options, { height: '60px' });

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
