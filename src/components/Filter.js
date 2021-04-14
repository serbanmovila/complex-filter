import '../styles/Filter.css'
import {useState, useEffect, useRef} from 'react'
import FilterRuleItem from "./FilterRuleItem";
import FilterSelector from "./FilterSelector";
import FilterRules from "./FilterRules";
import React from 'react'
import filterHistoryImg from '../assets/filter-history.png'
import filterClear from '../assets/filter-clear.png'
import filterAction from '../assets/search.png'
import FilterHistory from "./FilterHistory";

function Filter(props) {

    const {data, fields} = props

    const inputElem = useRef(null)
    const filterSelector = useRef(null)
    const filterHistoryContainer = useRef(null)
    const filterHistoryButton = useRef(null)
    const [input, setInput] = useState("")
    const [rules, setRules] = useState([])
    // const [filterCriteria, setFilterCriteria] = useState([])
    const [currentRuleText, setCurrentRuleText] = useState('')
    const [inputFields, setInputFields] = useState(fields.initial)
    const [step, setStep] = useState(1)
    const [rulesVisibility, setRulesVisibility] = useState(false)
    const [backCount, setBackCount] = useState(0)
    const [step2type, setStep2type] = useState('')
    const [placeholder, setPlaceholder] = useState('')
    const [inputType, setInputType] = useState('text')
    const [showFilterHistory, setShowFilterHistory] = useState(false)
    const [filterHistory, setFilterHistory] = useState([])

    const getCurrentRulesValues = () => {
        let currentRulesValues = []
        rules.map(rule => {
            currentRulesValues.push(rule.split(' ')[0])
        })
        return currentRulesValues
    }

    const resetInput = (visibleRules = false) => {
        setCurrentRuleText('')
        setInput('')

        let remainingFields = fields.initial.filter(field => !getCurrentRulesValues().includes(field.value))
        setInputFields(remainingFields)
        setBackCount(0)
        setPlaceholder('')
        setInputType('text')
        setRulesVisibility(visibleRules)
        // toggleFilterHistory()
        setStep(1)

    }

    const clearAllFilters = () => {
        resetInput()
        setRules([])
        filterData(data, [])
    }

    const handleInputChange = (e) => {
        setInput(e.target.value)
    }

    const handleInputFocusIn = (e) => {
        setRulesVisibility(true)
    }

    const handleItemClick = (e, clickedField) => {
        switch (step) {
            case 1: {
                setInput(e.target.innerText)
                if (clickedField.step2type.type === 'multiselect') {
                    setInputFields(fields.equals)
                } else {
                    setPlaceholder(`Type the value for ${clickedField.text.toLowerCase()}${clickedField.suggestion ? clickedField.suggestion.toLowerCase() : ''}...`)
                    setInput('')
                    setInputFields([])
                }
                setCurrentRuleText(clickedField.value)
                setStep2type(clickedField.step2type)
                setStep(step + 1)
                break
            }
            case 2: {
                if (step2type.type === 'multiselect') {
                    setInput(input + clickedField.value)
                    setInputFields(fields.status)
                    setCurrentRuleText(currentRuleText + clickedField.value)
                    setStep(step + 1)
                } else {
                    if (input === '') {
                        setRulesVisibility(false)
                    }
                    if (clickedField) {
                        let parsedInput = step2type.value === 'number' ? input : `${input.toUpperCase()}`
                        setCurrentRuleText(currentRuleText + clickedField.value + parsedInput)
                        setRules(rules.concat(currentRuleText + clickedField.value + parsedInput))
                        resetInput()
                    } else {
                        let parsedInput = step2type.value === 'number' ? input : `${input}`
                        if (step2type.value === 'number') {
                            let completeFields = []
                            fields.number.forEach(field => {
                                completeFields.push({...field, text: `${field.text} "${parsedInput}"`})
                            })
                            setInputFields(completeFields)
                        } else {
                            let completeFields = []
                            fields.equals.forEach(field => {
                                completeFields.push({...field, text: `${field.text} "${parsedInput}"`})
                            })
                            setInputFields(completeFields)
                        }
                        // resetInput()
                    }
                }
                break
            }
            case 3: {
                setInput(input + clickedField.value)
                setRules(rules.concat(currentRuleText + clickedField.value))
                resetInput()
                break
            }
        }
    }

    const handleOnClickDeleteRule = (e, index) => {
        setRules(rules.filter((rule, ruleIndex) => ruleIndex !== index))
    }

    const handleKeyDown = (e) => {
        // if (e.key === 'Backspace') {
        //     e.preventDefault()
        //     setBackCount(backCount + 1)
        // } else {
        //     setBackCount(0)
        // }

        if (e.key === 'Backspace' && input.length === 1) {
            resetInput(true, step)
            // setRulesVisibility(!rulesVisibility)
        }
    }

    // const handleInputClick = (e) => {
    //     if(step !== 2) {
    //         setRulesVisibility(true)
    //     }
    // }

    const updateFilterHistory = (rules, fromFilterHistory = false) => {
        if (rules.length === 0) return
        let jsonHistory = JSON.stringify(filterHistory)
        let jsonRules = JSON.stringify(rules)
        if (jsonHistory.indexOf(jsonRules) !== -1) return
        let filter1 = localStorage.getItem('filter1')

        if (filter1) {
            localStorage.setItem('filter2', filter1)
            localStorage.setItem('filter1', rules)
            setFilterHistory([rules, filter1.split(',')])
        } else {
            localStorage.setItem('filter1', rules)
            setFilterHistory([rules])
        }
    }

    const getInitialFilterHistory = () => {
        let filter1 = localStorage.getItem('filter1').split(',')
        let filter2 = localStorage.getItem('filter2').split(',')

        if (filter1) {
            if (filter2) {
                setFilterHistory([filter1, filter2])
            } else {
                setFilterHistory([filter1])
            }
        } else {
            setFilterHistory([])
        }

    }

    const filterData = (data, rules, fromFilterHistory) => {
        let filteredData = data
        rules.forEach(rule => {
            filteredData = data.filter((field, i) => {

                const arr = rule.split(' ');
                const [name, sign, initialValue] = arr.slice(0, 2).concat(arr.slice(2).join(" "));
                // const value = typeof initialValue === 'string' ? parseInt(initialValue) : initialValue

                // const value = !isNaN(parseInt(initialValue)) ? parseInt(initialValue) : initialValue
                const value = Number(initialValue) ? Number(initialValue) : initialValue
                // const value = initialValue
                const dataField = field[name.toLowerCase()]

                switch (sign) {

                    case '=': {
                        if (typeof dataField === 'string')
                            return dataField.toLowerCase() === (Number(value) ? Number(value) : value.toLowerCase()) && filteredData.includes(field)
                        return dataField === value && filteredData.includes(field)
                    }
                    case '≠': {
                        if (typeof dataField === 'string')
                            return dataField.toLowerCase() !== (Number(value) ? Number(value) : value.toLowerCase()) && filteredData.includes(field)
                        return dataField !== value && filteredData.includes(field)
                    }
                    case '>': {
                        return dataField > value && filteredData.includes(field)
                    }
                    case '≥': {
                        return dataField >= value && filteredData.includes(field)
                    }
                    case '<': {
                        return dataField < value && filteredData.includes(field)
                    }
                    case '≤': {
                        return dataField <= value && filteredData.includes(field)
                    }
                }
            })
        })
        updateFilterHistory(rules)
        props.setFilteredData(filteredData)
        return filteredData
    }

    const toggleFilterHistory = () => {
        setShowFilterHistory(!showFilterHistory)
    }

    const handleHistoryItemClick = (e, rules) => {
        clearAllFilters()
        setRules(rules)
        filterData(data, rules, false)
    }

    useEffect(() => {
        const toggleContainers = (e) => {
            if (inputElem.current === e.target || (filterSelector.current && filterSelector.current.contains(e.target))) {
                setRulesVisibility(true)
            } else {
                setRulesVisibility(false)
            }

            if(!filterHistoryButton.current.contains(e.target)) {
                setShowFilterHistory(false)
            }
        }
        document.addEventListener('click', toggleContainers)

        // const checkEnterKey = (e) => {
        //     if(e.key === 'Enter' && inputElem.current === document.activeElement) {
        //         filterData(data, rules)
        //     }
        // }

        // document.addEventListener('keypress', checkEnterKey)

        getInitialFilterHistory()

        return () => {
            document.removeEventListener('click', toggleContainers)
            // document.removeEventListener('keypress', checkEnterKey)
        }


    }, [])

    useEffect(() => {
        if (step === 2 && step2type.value === 'number') {
            setInputType('number')
        }
    }, [step])

    useEffect(() => {
        if (step === 1 && input !== '') {
            let filteredFields = []
            fields.initial.forEach(field => {
                if (field.text.toLowerCase().startsWith(input.toLowerCase())) {
                    filteredFields.push({...field})
                }
            })
            filteredFields.forEach(field => {
                // field.suggestion = field.text.split(input.charAt(0).toUpperCase() + input.toLowerCase().slice(1))[1]
                field.suggestion = field.text.slice(input.length, field.text.length)

                // field.text = input.charAt(0).toUpperCase() + input.toLowerCase().slice(1)
                field.text = field.text.slice(0, input.length)

            })
            setInputFields(filteredFields)
        }
        if (step === 2 && step2type.type !== 'multiselect' && input !== '') {
            handleItemClick(null, null)
        }
    }, [input])

    // useEffect(() => {
    //     if (backCount === 2) {
    //         resetInput()
    //     }
    // }, [backCount])

    useEffect(() => {
        resetInput()
        // filterData(data, rules)
    }, [rules])


    return (
        <div className="filter-container">
            <div className="input-container">
                <img
                    className='asset filter-action'
                    src={filterAction}
                    alt='filter'
                    title='Filter'
                    onClick={(e) => filterData(data, rules)}
                />
                <FilterRules
                    rules={rules}
                    onClickDeleteRule={handleOnClickDeleteRule}
                />
                <input
                    ref={inputElem}
                    value={input}
                    placeholder={placeholder}
                    type={inputType}
                    onChange={handleInputChange}
                    onFocus={handleInputFocusIn}
                    onKeyDown={handleKeyDown}
                    // onClick={handleInputClick}
                />
                <img
                    className='asset filter-history'
                    src={filterHistoryImg}
                    alt='history'
                    title='Filter history'
                    onClick={toggleFilterHistory}
                    ref={filterHistoryButton}
                />
                {
                    rulesVisibility &&
                    <FilterSelector
                        ref={filterSelector}
                        fields={inputFields}
                        onClick={handleItemClick}
                    />
                }
                {
                    showFilterHistory &&
                    <FilterHistory
                        ref={filterHistoryContainer}
                        history={filterHistory}
                        onClick={handleHistoryItemClick}
                    />
                }
            </div>
            <img
                className='asset filter-clear'
                src={filterClear}
                alt='clear'
                onClick={clearAllFilters}
                title='Clear all filters'
            />
        </div>
    )
}

export default Filter
