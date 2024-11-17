function DropDown({options,onSelectionChange}){
    // options [ {name: "option 1", value: someObject}, {name: "option 2", value: someObject2}, ...]
    // onSelectionChange (value) => ...
    //onSelectionChange("pero")

    function onChange(ev) {
        const value=ev.target.value
        onSelectionChange(value)
        
    }


    return <select onChange={onChange}>
        <option disabled selected>Select</option>
        {options.map((option)=>{return <option value={option.value}>{option.name}</option>})}
    </select>

}

export default DropDown