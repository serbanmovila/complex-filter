export const dataSet = [
    {id: 1, name: 'first', status: 'Ready', cost: 10, startdate: 1, learners: 100, trainer: 'Serban'},
    {id: 2, name: 'second', status: 'In Progress', cost: 20, startdate: 2, learners: 50, trainer: 'Bogdan'},
    {id: 3, name: 'third', status: 'Draft', cost: 30, startdate: 3, learners: 600, trainer: 'Victor'},
    {id: 4, name: 'fourth', status: 'Draft', cost: 40, startdate: 7, learners: 70, trainer: 'Bogdan'},
    {id: 5, name: 'fifth', status: 'Completed', cost: 50, startdate: 12, learners: 200, trainer: 'Victor'},
    {id: 6, name: 'sixth', status: 'Completed', cost: 60, startdate: 17, learners: 300, trainer: 'Serban'},
    {id: 7, name: 'seventh', status: 'Ready', cost: 70, startdate: 4, learners: 400, trainer: 'Victor'},
    {id: 8, name: 'eighth', status: 'In Progress', cost: 80, startdate: 8, learners: 500, trainer: 'Serban'},
    {id: 9, name: 'nineth', status: 'In Progress', cost: 90, startdate: 9, learners: 900, trainer: 'Victor'},
    {id: 10, name: 'tenth', status: 'Ready', cost: 100, startdate: 10, learners: 30, trainer: 'Bogdan'}
]

export const fields = {
    initial: [
        {text: 'Name', value: 'NAME', step2type: {type: 'input', value: 'string'}},
        {text: 'Status', value: 'STATUS', step2type: {type: 'multiselect', value: null}},
        {text: 'Cost', value: 'COST', step2type: {type: 'input', value: 'number'}},
        {text: 'StartDate', value: 'STARTDATE', step2type: {type: 'input', value: 'number'}},
        {text: 'Learners', value: 'LEARNERS', step2type: {type: 'input', value: 'number'}},
        {text: 'Trainer', value: 'TRAINER', step2type: {type: 'input', value: 'string'}}
    ],
    equals: [
        {text: '= Equals', value: ' = '},
        {text: '≠ Not Equals', value: ' ≠ '}
    ],
    status: [
        {text: 'Draft', value: 'DRAFT', dot: '#B3C3CB'},
        {text: 'In Progress', value: 'IN PROGRESS', dot: '#F5A623'},
        {text: 'Ready', value: 'READY', dot: '#2774A6'},
        {text: 'Completed', value: 'COMPLETED', dot: '#00A66F'}
    ],

    number: [
        {text: '= Equals to', value: ' = '},
        {text: '≠ Not Equals to', value: ' ≠ '},
        {text: '> Greater Than', value: ' > '},
        {text: '≥ Greater or Equal to', value: ' ≥ '},
        {text: '< Less Than', value: ' < '},
        {text: '≤ Less or Equal to', value: ' ≤ '}
    ]
}
