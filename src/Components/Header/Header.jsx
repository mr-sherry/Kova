import styles from './Header.module.css';
import Sidebar from '../SideBar/SideBar'; // Adjust path as needed
import Icon from '../../assests/IconDark.svg'
import Text from '../../assests/TextDark.svg'
import { NavLink } from 'react-router-dom';
import FullPageLottieLoader from '../Animations/FullPageLottieLoader';


export default function Header() {
    return (
        <div className={styles.mainDivHeader}>

            <div>
                <div className={styles.logo}>
                    <NavLink to={'/'}>

                        <img src={Icon} alt="" style={{ width: '55px' }} />
                        <img src={Text} alt="" style={{ width: '90px' }} />
                    </NavLink>
                </div>
                <p className={styles.slogan}>Sync Your Efforts, Multiply Your Rewards.</p>

            </div>

            <Sidebar />
        </div>
    );
}
