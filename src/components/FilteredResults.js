import React from "react";
import FilteredResultsItem from "./FilteredResultsItem";
import '../styles/FilteredResults.css'

function FilteredResults(props) {

    const {filteredData} = props
    return (
        <table className='filtered-results-table'>
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Status</th>
                <th>Cost</th>
                <th>StartDate</th>
                <th>Learners</th>
                <th>Trainer</th>
            </tr>
            </thead>
            <tbody>
            {
                filteredData.map(item => {
                    return <FilteredResultsItem key={item.id} item={item}/>
                })
            }
            </tbody>
        </table>
    )
}

export default FilteredResults
