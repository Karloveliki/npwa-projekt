function DropDown({options,onSelectionChange}){
    // options [ {name: "option 1", value: someObject}, {name: "option 2", value: someObject2}, ...]
    // onSelectionChange (value) => ...
    //onSelectionChange("pero")

    function onChange(ev) {
        const value=ev.target.value
        onSelectionChange(value)
        console.log("odabrano je: ",ev)
    }


    return <select onChange={onChange}>
        {options.map((option)=>{return <option value={option.value}>{option.name}</option>})}
    </select>

}

export default DropDown