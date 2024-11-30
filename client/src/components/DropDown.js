function DropDown({options,onSelectionChange}){
    // options [ {name: "option 1", value: someObject}, {name: "option 2", value: someObject2}, ...]
    // onSelectionChange (value) => ...
    //onSelectionChange("pero")

    function onChange(ev) {
        const value=ev.target.value
        onSelectionChange(value)
        
    }


    return <select onChange={onChange} defaultValue="-1">
        <option disabled value="-1">Select</option>
        {options.map((option)=>{return <option key={option.value} value={option.value}>{option.name}</option>})}
    </select>

}

export default DropDown