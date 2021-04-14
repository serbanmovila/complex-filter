import '../styles/FilterSelector.css'
import FilterSelectorItem from "./FilterSelectorItem";
import React, {forwardRef} from "react";

const FilterSelector = forwardRef((props, ref) => {

    const {fields, onClick} = props

    return (
        <div
            ref={ref}
            className='filter-selector-container'
        >
            {
                fields.map((field, idx) => {
                    return (
                        <FilterSelectorItem
                            key={`field-${idx}`}
                            field={field}
                            onClick={onClick}
                        />
                    )
                })
            }
        </div>
    )
})

export default FilterSelector
