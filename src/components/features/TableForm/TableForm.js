import styles from './TableForm.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getTableById } from '../../../redux/tablesRedux';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { updateTableRequest } from '../../../redux/tablesRedux';

const TableForm = () => {
    const  {tableId}  = useParams();
    const numTableId = parseInt(tableId);
    const dispatch = useDispatch();
    const table = useSelector(state => getTableById(state,numTableId));

    const [peopleAmount, setPeopleAmount] = useState(table.peopleAmount);
    const [maxPeopleAmount, setMaxPeopleAmount] = useState(table.maxPeopleAmount);
    const [bill, setBill] = useState(table.bill);
    const [tableStatus, setTableStatus] = useState(table.status);
    
    const update = e =>{
        e.preventDefault();
      
        dispatch(updateTableRequest({
            numTableId,
            tableStatus,
            peopleAmount,
            maxPeopleAmount,
            bill
        }));
        
    };

    return(
        <form onSubmit={e =>  update(e)}>
                <div className={styles.row}>
                    <p className={styles.label}>Status:</p>                   
                    <select name="Status" defaultValue={tableStatus}>
                        <option value="Free" onClick={event => setTableStatus(event.target.value)} >Free</option>
                        <option value="Busy" onClick={event => setTableStatus(event.target.value)} >Busy</option>
                        <option value="Reserved" onClick={event => setTableStatus(event.target.value)} >Reserved</option>
                        <option value="Cleaning" onClick={event => setTableStatus(event.target.value)} >Cleaning</option>
                    </select>
                </div>
                <div className={styles.row}>
                        <p className={styles.label}>People: </p> 
                    <div className={styles.inputs}>
                    <Form.Control className={styles.number} type="number" value={peopleAmount} onChange={e=>setPeopleAmount(e.target.value)} /> /
                    <Form.Control className={styles.number} type="number" value={maxPeopleAmount} onChange={e=>setMaxPeopleAmount(e.target.value)} /> 
                    </div>  
                </div>
                <div className={styles.row}>
                    <p className={styles.label}>Bill:</p>
                    <p className={styles.dollar}>$</p>
                    <Form.Control className={styles.bill} type='number' value={bill} onChange={e=>setBill(e.target.value)} />
                </div>
                <div className={styles.row}>
                     <Button type='submit'>Update</Button>
                </div>
        </form>
    );
};

export default TableForm;