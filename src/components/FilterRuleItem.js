import React from "react";
import '../styles/FilterRuleItem.css'
import closeImg from '../assets/close.png'

function FilterRuleItem(props) {

    const {rule, onClickDeleteRule, index} = props
    return (
        <div className='field-wrapper'>
            <div className='field-rule-text'>{rule}</div>
            <img
                className="asset close"
                src={closeImg}
                onClick={(e) => onClickDeleteRule(e, index)}
            />
        </div>
    )
}

export default FilterRuleItem
