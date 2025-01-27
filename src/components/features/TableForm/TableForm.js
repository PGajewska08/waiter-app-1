import styles from './TableForm.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getTableById } from '../../../redux/tablesRedux';
import { Button, Form} from 'react-bootstrap';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { updateTableRequest } from '../../../redux/tablesRedux';
import { STATUSES } from '../../../redux/statusesRedux'


const TableForm = () => {
    
    const  {tableId}  = useParams();
   // console.log("tableId: " + tableId);
    const navigate = useNavigate();
   // console.log("id z adresu: "+tableId + ", typ : "+typeof(tableId));
    const dispatch = useDispatch();
    const tableData = useSelector(state => getTableById(state,parseInt(tableId)));
    console.log("table data: " +tableData);
    console.log("type of table data: " +typeof(tableData));
    // Object.keys(tableData).map(k => console.log(k+" "));
    // Object.values(tableData).map(v => console.log(v+" "));
    
    
    
    
    const idData = parseInt(tableId);
    const peopleAmountData = parseInt(tableData?.peopleAmount);
    //console.log("peopleAmountData: " + peopleAmountData)
    const statusData = tableData?.status;
   // console.log("statusData: "+ statusData);
    const maxPeopleAmountData = parseInt(tableData?.maxPeopleAmount);
    const billData = parseInt(tableData?.bill);

    const [status, setStatus] = useState(statusData);
    const [peopleAmount, setPeopleAmount] = useState(peopleAmountData);
    const [maxPeopleAmount, setMaxPeopleAmount] = useState(maxPeopleAmountData);
    const [bill, setBill] = useState(billData);
    
    

    const update = e =>{
        e.preventDefault();
      
        dispatch(updateTableRequest({
            idData,
            status,
            peopleAmount,
            maxPeopleAmount,
            bill
        }));
         navigate(`/`);
    };
    // useEffect(() => {
    //     if(typeof tableData === 'undefined') {
    //         return navigate('/');  
    //     }
    // }, [navigate]);

    useEffect(() => {
        if(status === 'Cleaning' || status === 'Free') {
            setPeopleAmount(0);
        }
    },[status]);

    useEffect(() => {
        if(peopleAmount > maxPeopleAmount) {
            setMaxPeopleAmount(peopleAmount);
        }
        if(peopleAmount < 0) {
            setPeopleAmount(0);
        }
        if(peopleAmount > 10) {
            setPeopleAmount(10);
        }
        if(maxPeopleAmount < 0) {
            setMaxPeopleAmount(0);
        }
        if(maxPeopleAmount > 10) {
            setMaxPeopleAmount(10);
        }
    },[peopleAmount, maxPeopleAmount]);

    

    // BŁĘDNY ADRES
    if(!tableData) {
        return <Navigate to="/" />;
    }
 
    // STOLIK ZAJĘTY
    if(status === 'Busy') {

        return(
            <form onSubmit={e =>  update(e)}>
                <div className={styles.row}>
                    <p className={styles.label}>Status:</p>                   
                    <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                        {Object.values(STATUSES).map(value => <option key={value}>{value}</option>)}
                    </Form.Select>
                    </div>
                    <div className={styles.row}>
                            <p className={styles.label}>People: </p> 
                        <div className={styles.inputs}>
                        <Form.Control className={styles.number} type="number" value={peopleAmount} max={10} min={0} onChange={e=>setPeopleAmount(parseInt(e.target.value))} /> /
                        <Form.Control className={styles.number} type="number" value={maxPeopleAmount} max={10} min={0} onChange={e=>setMaxPeopleAmount(parseInt(e.target.value))} /> 
                        </div>  
                    </div>
                    <div className={styles.row}>
                        <p className={styles.label}>Bill:</p>
                        <p className={styles.dollar}>$</p>
                        <Form.Control className={styles.bill} type='number' value={bill} min={0} onChange={e=>setBill(parseInt(e.target.value))} />
                    </div>
                    <div className={styles.row}>
                         <Button type='submit'>Update</Button>
                    </div>
            </form>
        );
    }

    else {

        return(
            <form onSubmit={e =>  update(e)}>
                <div className={styles.row}>
                    <p className={styles.label}>Status:</p>                   
                    <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                        {Object.values(STATUSES).map(value => <option key={value}>{value}</option>)}
                    </Form.Select>
                    </div>
                    <div className={styles.row}>
                            <p className={styles.label}>People: </p> 
                        <div className={styles.inputs}>
                        <Form.Control className={styles.number} type="number" value={peopleAmount} max={10} min={0} onChange={e=>setPeopleAmount(parseInt(e.target.value))} /> /
                        <Form.Control className={styles.number} type="number" value={maxPeopleAmount} max={10} min={0} onChange={e=>setMaxPeopleAmount(parseInt(e.target.value))} /> 
                        </div>  
                    </div>
                    <div className={styles.row}>
                         <Button type='submit'>Update</Button>
                    </div>
            </form>
        );
    
};}

export default TableForm;