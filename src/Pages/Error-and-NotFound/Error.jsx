import { useRouteError } from 'react-router-dom';
import styles from './Error.module.css';

export default function Error() {
    const error = useRouteError();
    console.error("Route Error:", error);

    return (
        <div className={styles.errorContainer}>
            <h1 className={styles.heading}>Something went wrong</h1>
            <p className={styles.message}>
                {error?.message || 'An unexpected error occurred.'}
            </p>
        </div>
    );
}
