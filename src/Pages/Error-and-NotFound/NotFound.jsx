import styles from './NotFound.module.css';

export default function NotFound() {
    return (
        <div className={styles.notFoundContainer}>
            <h1 className={styles.heading}>404 - Page Not Found</h1>
            <p className={styles.message}>
                Sorry, we couldn't find what you're looking for.
            </p>
        </div>
    );
}
