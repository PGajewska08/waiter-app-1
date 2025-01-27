import { useState } from 'react';
import shortid from 'shortid';

const ADD_TABLE = 'app/tables/ADD_TABLE';
const UPDATE_TABLES = 'app/tables/UPDATE_TABLES';
const UPDATE_TABLE = 'app/tables/UPDATE_TABLE';

//selectors
export const getAllTables = (state) => state.tables;
export const getTableById = ({tables}, tableId) => tables.find(table => table.id === tableId);

//actions
export const addTable = payload => ({type: ADD_TABLE, payload});
export const updateTables = payload => ({type: UPDATE_TABLES, payload});
export const updateTable = payload => ({type: UPDATE_TABLE, payload});



// pobieranie danych z serwera i aktualizacja stanu - magazynu REDUXA 
export const fetchTables = () => {
    return (dispatch) => {  
        fetch('http://localhost:3131/api/tables')
            .then(res => res.json())
            .then(tables => dispatch(updateTables(tables)));
    }  
  };

// modyfikacja danch stolika
export const updateTableRequest = updatedTable => {
    
    return (dispatch) => {
        const options = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTable),
          };
          
            fetch(`http://localhost:3131/api/tables/${updatedTable.idData}`, options)
            .then((res) => res.json())
            .then((data) => dispatch(updateTable(data)))
            .catch((error) => { console.log(error) });
    }
}

const tablesReducer = (statePart =[], action) => {
    switch(action.type) {
        case ADD_TABLE:
            return [...statePart, { ...action.payload, id: shortid() }];
        case UPDATE_TABLES:
            return [...action.payload];
        case UPDATE_TABLE:
            return statePart.map((table) =>
                  table.id === action.payload.id ? { ...table, ...action.payload } : table
                );
        default:
            return statePart;
    }
}

export default tablesReducer;