import { Card, Button } from 'antd';
import { useState } from 'react';

interface CardProps {
  imageUrl?: string;
  title?: string;
  description?: string;
}
export const SpaceCard = ({ imageUrl, title, description }: CardProps) => {
  const { Meta } = Card;
  const [liked, setLiked] = useState<boolean>(false);
  const likeButton = () => {
    setLiked(!liked);
  };

  return (
    <Card
      style={{ maxWidth: '25vw', margin: '15px' }}
      cover={<img alt='example' src={imageUrl} />}
    >
      <Meta
        title={title}
        description={description}
        style={{ paddingBottom: '5%' }}
      />
      <Button onClick={likeButton}>{liked ? 'unlike' : 'like'}</Button>
    </Card>
  );
};
