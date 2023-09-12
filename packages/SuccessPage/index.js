import { useRouter } from 'next/router';
import styles from './styles.module.css';

function SuccessPage() {
	const { push, query } = useRouter();

	const { planet_name = '', time_taken = 0 } = query;

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Success! Congratulations on finding Falcone. king shan is mighty pleased
			</div>

			<div className={styles.text}>
				<div className={styles.flex_item}>
					<div className={styles.label}>Planet found: </div>
					<span className={styles.name}>{planet_name}</span>
				</div>

				<div className={styles.flex_item}>
					<div className={styles.label}>Time taken: </div>
					<span className={styles.name}>{time_taken}</span>
				</div>
			</div>

			<div className={styles.flex}>
				<button
					type="button"
					onClick={() => push('/home')}
					className={styles.reset_button}
				>
					Go Home
				</button>

				<button
					type="button"
					className={styles.button}
					onClick={() => push('/find-falcone')}
				>
					Try Again!
				</button>
			</div>
		</div>
	);
}

export default SuccessPage;
