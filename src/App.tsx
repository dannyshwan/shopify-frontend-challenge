import { Layout, Typography, Row, Col, Pagination } from 'antd';
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
	const [pageSize, setPageSize] = useState<number>(9);
	const [current, setCurrent] = useState<number>(1);
	const [minIndex, setMinIndex] = useState<number>(0);
	const [maxIndex, setMaxIndex] = useState<number>(pageSize);

	// Get images from the NASA API
	const fetchImages = async () => {
		const res = await axios.get(
			`${process.env.REACT_APP_API_URL}?api_key=${process.env.REACT_APP_API_KEY}&count=50`
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

	const paginationChange = (page: number) => {
		setCurrent(page);
		setMinIndex((page - 1) * pageSize);
		setMaxIndex(page * pageSize);
	};

	return (
		<Layout className="layout">
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
					<>
						<Row>
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
							onShowSizeChange={(_, size) => setPageSize(size)}
							style={{ display: 'flex', justifyContent: 'center' }}
						/>
					</>
				) : (
					// Loading State
					<Lottie animationData={loader} style={{ height: '60vh' }} loop />
				)}
			</Content>
			<Footer style={{ textAlign: 'center', height: '10vh' }}>
				©2022 Daniel Shwan - Images from NASA
			</Footer>
		</Layout>
	);
};

export default App;
