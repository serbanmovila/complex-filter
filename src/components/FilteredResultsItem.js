import React from 'react'
import '../styles/FilteredResultsItem.css'

function FilteredResultsItem(props) {

    const { item } = props
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.status}</td>
            <td>{item.cost}</td>
            <td>{item.startdate}</td>
            <td>{item.learners}</td>
            <td>{item.trainer}</td>
        </tr>
    )
}

export default FilteredResultsItem
