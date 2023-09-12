import { useRouter } from 'next/router';
import styles from './styles.module.css';

function FailurePage() {
	const router = useRouter();

	return (
		<div className={styles.container}>
			<div className={styles.heading}>You have failed, want to try again?</div>

			<div className={styles.flex}>
				<button
					type="button"
					onClick={() => router.push('/home')}
					className={styles.reset_button}
				>
					Go Home
				</button>

				<button
					type="button"
					className={styles.button}
					onClick={() => router.push('/find-falcone')}
				>
					Try Again!
				</button>
			</div>
		</div>
	);
}

export default FailurePage;
