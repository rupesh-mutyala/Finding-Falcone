import styles from './styles.module.css';

function Header() {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>Finding Falcone</div>
			<div className={styles.text}>
				a coding challenge by{' '}
				<a className={styles.anchor_tag} href="https://www.geektrust.in">
					www.geektrust.in
				</a>
			</div>
		</div>
	);
}

export default Header;
