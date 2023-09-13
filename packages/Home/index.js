import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import styles from './styles.module.css';
import Footer from '../../commons/Footer';

function Home() {
	const { vehicles, planets } = useSelector((state) => state);

	const router = useRouter();

	return (
		<div className={styles.main_content}>
			<div>
				Our problem is set in the planet of Lengaburu…in the distant distant
				galaxy of Tara B. After the recent war with neighbouring planet
				Falicornia, King Shan has exiled the Queen of Falicornia for 15 years.
			</div>

			<div className={styles.text}>
				Queen Al Falcone is now in hiding. But if King Shan can find her before
				the years are up, she will be exiled for another 15 years….
			</div>

			<div className={styles.text}>
				King Shan has received intelligence that Al Falcone is in hiding in one
				of these 6 planets - DonLon, Enchai, Jebing, Sapir, Lerbin & Pingasor.
				However he has limited resources at his disposal & can send his army to
				only 4 of these planets.
			</div>

			<Footer vehicles={vehicles} planets={planets} />

			<div className={styles.question_text}>
				Can you help King Shan in finding Queen Al Falcone?
			</div>

			<button
				type="button"
				className={styles.button}
				onClick={() => router.push('/find-falcone')}
			>
				Find Falcone
			</button>
		</div>
	);
}

export default Home;
