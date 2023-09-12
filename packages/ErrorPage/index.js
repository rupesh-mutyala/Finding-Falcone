import { useRouter } from 'next/router';
import styles from './styles.module.css';

function ErrorPage() {
	const router = useRouter();

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Something went wrong, Please try again later
			</div>

			<button
				type="button"
				className={styles.button}
				onClick={() => router.push('/find-falcone')}
			>
				Refresh
			</button>
		</div>
	);
}

export default ErrorPage;
