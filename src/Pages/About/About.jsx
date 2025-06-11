// AboutPage.jsx
import AboutCard from '../../Components/Cards/AboutCard'
import styles from './About.module.css'

const teamMembers = [
    {
        name: 'Sherry',
        title: 'Founder & Dev',
        image: 'https://images.unsplash.com/photo-1737494802833-5db96020f2c8?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Leads product design and front-end development of KOVA.',
    },
    {
        name: 'Faizan',
        title: 'Co-Founder & Strategist',
        image: 'https://images.unsplash.com/photo-1737494802833-5db96020f2c8?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Drives tokenomics, partnerships, and sync raid strategies.',
    },
]

export default function About() {
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.heading}>
                Meet the Team Behind <span className={styles.highlight}>KOVA</span>
            </h2>
            <div className={styles.grid}>
                {teamMembers.map((member, i) => (
                    <AboutCard key={member.name} {...member} delay={i * 0.2} />
                ))}
            </div>
        </div>
    )
}
