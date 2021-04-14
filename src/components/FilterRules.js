import FilterRuleItem from "./FilterRuleItem";
import React from "react";
import '../styles/FilterRules.css'

function FilterRules(props) {

    const {rules, onClickDeleteRule} = props
    return (
        <div className='filter-rules-container'>
            {
                rules.map((rule, idx) => {
                    return (
                        <FilterRuleItem
                            key={`rule-${idx}`}
                            rule={rule}
                            onClickDeleteRule={onClickDeleteRule}
                            index={idx}
                        />)
                })
            }
        </div>
    )
}

export default FilterRules
