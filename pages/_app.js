import React, { useEffect, useState } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import './styles.css';
import { useRouter } from 'next/router';
import axios from 'axios';
import store from '../store';

import { setVehicles } from '../store/reducers/vehicles';
import { setPlanets } from '../store/reducers/planets';
import Header from '../commons/Header';

const makeStore = () => store; // Function to create the Redux store

const wrapper = createWrapper(makeStore);

function MyApp({ Component, pageProps }) {
	const dispatch = useDispatch();
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const apiRequest1 = axios.get('https://findfalcone.geektrust.com/planets');
		const apiRequest2 = axios.get('https://findfalcone.geektrust.com/vehicles');

		Promise.all([apiRequest1, apiRequest2])
			.then((responses) => {
				dispatch(setPlanets(responses[0].data));
				dispatch(setVehicles(responses[1].data));

				setIsLoading(false);
			})
			.catch((error) => {
				console.error('error::', error);
				setIsLoading(false);
				router.push('/error');
			});
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<Provider store={store}>
			<Header />
			<Component {...pageProps} />
		</Provider>
	);
}

export default wrapper.withRedux(MyApp);
