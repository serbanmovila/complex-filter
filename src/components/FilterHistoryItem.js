import React from 'react'
import '../styles/FilterHistoryItem.css'

function FilterHistoryItem(props) {

    const {rules, index, onClick} = props

    return (
        <div className='filter-field-item' onClick={(e) => onClick(e, rules)}>
            <div className='filter-field-text'>
                Filtered List {index+1}
            </div>
        </div>
    )
}

export default FilterHistoryItem
