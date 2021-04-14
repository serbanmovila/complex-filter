import '../styles/FilterSelectorItem.css'
import React from "react";

function FilterSelectorItem(props) {

    const {field, onClick } = props

    return (
        <div className='filter-field-item' onClick={(e) => onClick(e, field)}>
            <div className='filter-field-text'>
                {field.text}
                {
                    field.suggestion &&
                    <div className='filter-field-text-suggestion'>{field.suggestion}</div>

                }
            </div>
            {
                field.dot &&
                <span className='filter-field-dot' style={{background: field.dot}}/>
            }
        </div>
    )
}

export default FilterSelectorItem
