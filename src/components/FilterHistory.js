import React, {forwardRef} from 'react'
import '../styles/FilterHistory.css'
import FilterHistoryItem from "./FilterHistoryItem";

const FilterHistory = forwardRef((props, ref) => {

    const {history, onClick} = props

    return (
        <div
            ref={ref}
            className='filter-history-container'
        >
            {
                history.map((rules, idx) => {
                    return (
                        <FilterHistoryItem
                            key={`field-${idx}`}
                            index={idx}
                            rules={rules}
                            onClick={onClick}
                        />
                    )
                })
            }
        </div>
    )
})

export default FilterHistory
