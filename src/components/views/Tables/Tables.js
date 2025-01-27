import { useSelector } from 'react-redux';
import styles from './Tables.module.scss';
import { getAllTables } from '../../../redux/tablesRedux';
import Table from '../Table/Table';
import { Container } from 'react-bootstrap';

const Tables = () => {
    const tables = useSelector(getAllTables);
    if(!tables.length) {
        return (
            <p>Loading...</p>
        )
    }
    return (
        <Container>
            <h2 className={styles.title}>All tables</h2>
            <ul className={styles.tablesList}>
                {tables.map(table => <Table key={table.id} tableId={table.id}/>)}
            </ul>
        </Container>
    )
}

export default Tables;