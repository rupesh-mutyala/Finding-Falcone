import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from './styles.module.css';
import toStartCase from '../../utils/toStartCase';
import { setTimeTaken, resetTimeTaken } from '../../store/reducers/time-taken';
import Footer from '../../commons/Footer';

const DEFAULT_VALUES = {
	planet_one: { planet: '', vehicle: '' },
	planet_two: { planet: '', vehicle: '' },
	planet_three: { planet: '', vehicle: '' },
	planet_four: { planet: '', vehicle: '' },
};

function FindFalcone() {
	const router = useRouter();
	const dispatch = useDispatch();
	const { vehicles, planets, timeTaken = {} } = useSelector((state) => state);

	const [selectedPlanetData, setSelectedPlanetData] = useState(DEFAULT_VALUES);

	const handleRadioChange = (
		vehicleName,
		key,
		planetDistace = 0,
		speed = 1,
		planet = '',
	) => {
		setSelectedPlanetData((prev) => ({
			...prev,
			[key]: {
				...(prev[key] || {}),
				vehicle: vehicleName,
			},
		}));

		dispatch(setTimeTaken({ [planet]: planetDistace / speed }));
	};

	const onClickReset = () => {
		setSelectedPlanetData(DEFAULT_VALUES);
		dispatch(resetTimeTaken());
	};

	const handleFindFalcone = () => {
		const headers = {
			Accept: 'application/json',
		};

		axios
			.post('https://findfalcone.geektrust.com/token', {}, { headers })
			.then((response) => {
				const { token = '' } = response.data;

				const selectedPlanetDetails = Object.values(selectedPlanetData);

				const selectedPlanets = selectedPlanetDetails.map(
					({ planet }) => planet,
				);

				const selectedVehicles = selectedPlanetDetails.map(
					({ vehicle }) => vehicle,
				);

				axios
					.post(
						'https://findfalcone.geektrust.com/find',
						{
							token,
							planet_names: selectedPlanets,
							vehicle_names: selectedVehicles,
						},
						{
							headers: {
								Accept: 'application/json',
								'Content-Type': 'application/json',
							},
						},
					)
					.then(({ data }) => {
						const { status = '', planet_name = '' } = data;

						let url = '/failed';

						if (status === 'success') {
							url = `/success?planet_name=${planet_name}&time_taken=${timeTaken[planet_name]}`;
						}

						router.push(url);
						dispatch(resetTimeTaken());
					})
					.catch((error) => {
						console.error('Error::', error);
					});
			})
			.catch((error) => {
				console.error('Error::', error);
			});
	};

	const disableButton = Object.values(selectedPlanetData).some(
		({ planet, vehicle }) => !planet || !vehicle,
	);

	const totalTimeTaken = Object.values(timeTaken).reduce((acc, curr) => {
		return acc + curr;
	}, 0);

	return (
		<div className={styles.main_content}>
			<div className={styles.text}>
				Total Time taken:{' '}
				<span className={styles.time_taken}>{totalTimeTaken}</span>
			</div>

			<div className={styles.heading}>
				Select the planets you want to send vehicles to:
			</div>

			<div className={styles.container}>
				{Object.entries(selectedPlanetData).map(([key, planetData]) => {
					const { planet } = planetData;

					const { distance: planetDistace = 0 } =
						planets.find(({ name }) => name === planet) || {};

					return (
						<div key={key} className={styles.item}>
							<div className={styles.name}>{toStartCase(key)}</div>

							<select
								onChange={(event) => {
									setSelectedPlanetData((prev) => ({
										...prev,
										[key]: {
											...(prev[key] || {}),
											planet: event.target.value,
										},
									}));
								}}
								className={styles.select}
							>
								<option disabled selected={!selectedPlanetData[key].planet}>
									{' '}
									-- select an option --{' '}
								</option>

								{planets.map(({ name }) => {
									return (
										<option
											disabled={Object.values(selectedPlanetData)
												.map(({ planet: planetName }) => planetName)
												.includes(name)}
											value={name}
										>
											{name}
										</option>
									);
								})}
							</select>

							{planet ? (
								<form className={styles.vehicles}>
									{vehicles.map(
										({ name: vehicleName, max_distance, speed }) => {
											const disabled =
												(Object.values(selectedPlanetData)
													.map(
														({ vehicle: currvehicleName }) => currvehicleName,
													)
													.includes(vehicleName) &&
													vehicleName !== selectedPlanetData[key].vehicle) ||
												planetDistace > max_distance;

											return (
												<div className={styles.vehicle_option}>
													<label
														role="presentation"
														onClick={() => {
															if (!disabled) {
																handleRadioChange(
																	vehicleName,
																	key,
																	planetDistace,
																	speed,
																	planet,
																);
															}
														}}
														htmlFor={vehicleName}
														className={`${disabled && styles.disabled}`}
													>
														<input
															type="radio"
															name="Vehicle Options"
															value={vehicleName}
															checked={
																selectedPlanetData[key].vehicle === vehicleName
															}
															disabled={disabled}
															onChange={() =>
																handleRadioChange(
																	vehicleName,
																	key,
																	planetDistace,
																	speed,
																	planet,
																)
															}
														/>
														{vehicleName}
													</label>
													<br />
												</div>
											);
										},
									)}
								</form>
							) : null}
						</div>
					);
				})}
			</div>

			<div className={styles.flex}>
				<button
					type="button"
					onClick={onClickReset}
					className={styles.reset_button}
				>
					Reset
				</button>

				<button
					type="button"
					className={`${styles.button} ${disableButton && styles.disabled}`}
					onClick={handleFindFalcone}
					disabled={disableButton}
				>
					Find Falcone!
				</button>
			</div>

			<Footer vehicles={vehicles} planets={planets} />
		</div>
	);
}

export default FindFalcone;
