import styles from './PageNav.module.scss'
import { Nav } from 'react-bootstrap';

const PageNav = () => {
    return (
    <div className={styles.pageNav}>
        <h3>Waiter.app</h3>
        <Nav className={styles.pageNav}>
            <Nav.Item>
                <Nav.Link eventKey="link-home" href='/' className='link-light'>Home</Nav.Link>
            </Nav.Item>
        </Nav>
    </div> 
    );
};

export default PageNav;