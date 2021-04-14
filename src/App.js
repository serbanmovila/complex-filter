import './App.css';
import React, {useState} from "react";
import Filter from './components/Filter.js'
import FilteredResults from './components/FilteredResults'
import {fields, dataSet} from "./utils/data";

function App() {

    const [filteredData, setFilteredData] = useState(dataSet)
    return (
        <>
            <Filter
                data={dataSet}
                fields={fields}
                setFilteredData={setFilteredData}
            />
            {
                filteredData &&
                <FilteredResults
                    filteredData={filteredData}
                />
            }
        </>
    )
}

export default App;
