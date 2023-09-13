import styles from './styles.module.css';

function Footer({ vehicles, planets }) {
	return (
		<div className={styles.container}>
			<div className={styles.title}>POTENTIAL HIDEOUTS</div>

			<div className={styles.planets}>
				{planets.map((planet) => {
					const { name, distance } = planet;

					return (
						<div key={name} className={styles.planet}>
							<div className={styles.name}>{name}</div>
							<div className={styles.text}>Distance - {distance}</div>
						</div>
					);
				})}
			</div>

			<div className={styles.title}>AVAILABLE VEHICLES</div>

			<div className={styles.planets}>
				{vehicles.map((vehicle) => {
					const { name, max_distance, speed, total_no } = vehicle;

					return (
						<div key={name} className={styles.vehicle}>
							<div className={styles.name}>{name}</div>
							<div className={styles.text}>Max Distance - {max_distance}</div>
							<div className={styles.text}>Speed - {speed} MM / hour</div>
							<div className={styles.text}>Units Available - {total_no}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Footer;
