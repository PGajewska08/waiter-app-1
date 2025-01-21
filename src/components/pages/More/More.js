import { useSelector } from 'react-redux';
import styles from './More.module.scss';
import { getTableById } from '../../../redux/tablesRedux';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import TableForm from '../../features/TableForm/TableForm';
import PageNav from '../../views/PageNav/PageNav';

const More = () => {
    const  {tableId}  = useParams();
    return (
        <Container className={styles.container}>
           <h2>Table {tableId}</h2>
           <TableForm></TableForm>
        </Container>
    );
};

export default More;