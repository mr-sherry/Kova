// AboutCard.jsx
import { motion } from 'framer-motion'
import styles from './AboutCard.module.css'

export default function AboutCard({ name, title, image, description, delay }) {
    return (
        <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
        >
            <img src={image} alt={name} className={styles.avatar} />
            <h3 className={styles.name}>{name}</h3>
            <p className={styles.title}>{title}</p>
            <p className={styles.description}>{description}</p>
        </motion.div>
    )
}
