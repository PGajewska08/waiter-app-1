import styles from './Home.module.scss';
import Tables from '../../views/Tables/Tables';
import { Container } from 'react-bootstrap';
import PageNav from '../../views/PageNav/PageNav';


const Home = () => {
    return (
        <Container>
            <Tables />
        </Container>
    );
};

export default Home;