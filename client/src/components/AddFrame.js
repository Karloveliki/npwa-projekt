function AddFrame(){



    return <form onSubmit={(ev)=>{}}>
        <label htmlFor="name"> name</label><br/>
        <input type="text" id="name" name="name"/><br/>
        <label htmlFor="bikeType">road</label><br/>
        <select name="bikeType" id="bikeType" defaultValue='road'>
            <option value="road">road</option>
            <option value="mtb">mtb</option>
            <option value="trekking">trekking</option>
            <option value="gravel">gravel</option>
            <option value="city">city</option>
            <option value="cargo">cargo</option>
            <option value="bmx">bmx</option>
        </select>



        <label htmlFor="geometry_type"> country</label><br/>
        <input type="text" id="geometry_type" name="geometry_type"/><br/>
        <label htmlFor="wheelSize"> wheelSize</label><br/>
        <input type="text" id="wheelSize" name="wheelSize"/><br/>
        <label htmlFor="suspension"> suspension</label><br/>
        <input type="text" id="suspension" name="suspension"/><br/>
        <label htmlFor="material"> material</label><br/>
        <input type="text" id="material" name="material"/><br/>
        <label htmlFor="material"> material</label><br/>
        <input type="text" id="material" name="material"/><br/>
        <label htmlFor="availableSizes"> availableSizes</label><br/>
        <input type="text" id="availableSizes" name="availableSizes"/><br/>
        <label htmlFor="images"> images </label><br/>
        <input type="text" id="images" name="imagess"/><br/>
        <label htmlFor="frameBuilder"> frameBuilder </label><br/>
        <input type="text" id="frameBuilder" name="frameBuilder"/><br/>
        <label htmlFor="basePrice"> basePrice </label><br/>
        <input type="text" id="basePrice" name="basePrice"/><br/>
        <label htmlFor="downPayment"> downPayment </label><br/>
        <input type="text" id="downPayment" name="downPayment"/><br/>
        <label htmlFor="forkIncluded"> forkIncluded </label><br/>
        <input type="text" id="forkIncluded" name="forkIncluded"/><br/>
        <button type="submit">dodaj</button>
    </form> 
}
export default AddFrame