import {useState, useEffect} from "react";
import Select from 'react-select';

function Filters(props) {
    const { tabState } = props
    const [filterValue, setFilterValue] = useState([])
    const options = [
        { value: 'C++', label: 'C++', name: 'plang' },
        { value: 'html', label: 'HTML', name: 'plang' },
        { value: 'Java', label: 'Java', name: 'plang' },
    ];
    const optionsDate = [
        { value: 'daily', label: 'Today', name: 'date' },
        { value: 'weekly', label: 'This week', name: 'date' },
        { value: 'monthly', label: 'This month', name: 'date' },
    ];
    const optionsSpokenLang = [
        { value: 'fs', label: 'Abkhazian', name: 'lang' },
        { value: 'en', label: 'English', name: 'lang' },
    ];

    const selectArray = [
        { isClearable: true, placeholder: 'Language', options: options, type: 'repo' },
        { isClearable: true, placeholder: 'Date Range', options: optionsDate, type: 'repo' },
        { isClearable: true, placeholder: 'Spoken Language', options: optionsSpokenLang, type: 'repo' },
        { isClearable: true, placeholder: 'Language', options: options, type: 'dev' },
        { isClearable: true, placeholder: 'Date Range', options: optionsDate, type: 'dev' },
    ];

    useEffect(() => {
        setFilterValue([])
    }, [tabState]);

    useEffect(() => {
        props.selectChange(filterValue)
    }, [filterValue]);


    const onChange = e => {
        setFilterValue({
            ...filterValue,
            [e.name]: e.value
        });
    }

    return(
        <>
            <div className="filter">
                {
                    selectArray.map((items, index) => {
                        const { value, isClearable, options, type, placeholder} = items
                        return(
                            tabState === type
                            &&
                            <Select placeholder={placeholder} isSearchable={true} name={'select'+index} key={index} isClearable={isClearable} onChange={onChange} options={options} />
                        )
                    })
                }
            </div>
        </>
    )
}

export default Filters