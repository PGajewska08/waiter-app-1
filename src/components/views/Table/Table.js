import { useSelector } from 'react-redux';
import styles from './Table.module.scss';
import { getTableById } from '../../../redux/tablesRedux';
import { Button, Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

const Table = ({tableId}) => {
    const table = useSelector(state => getTableById(state, tableId));
    console.log(table.status);
    return (
        <Container>
            <Row className={styles.tableRow}>
            <Col xs={2}>
                <h3>Table: {table.id}</h3>
            </Col>
            <Col xs={5}>
                <p>Status: <b>{table.status}</b></p>
            </Col>
            <Col  xs={5} className={styles.button}>
            <Link key={table.id} to={"/table/"+table.id} className={styles.listLink}>
                <Button>
                    Show more
                </Button>   
            </Link>
                
            </Col>         
        </Row>
        </Container>
    );
};

export default Table;