function AddFrame(){



    return <form onSubmit={(ev)=>{}}>
        <label htmlFor="name"> name</label><br/>
        <input type="text" id="name" name="name"/><br/>
        <label htmlFor="bikeType">bike type: </label><br/>
        <select name="bikeType" id="bikeType" defaultValue='road'>
            <option value="road">road</option>
            <option value="mtb">mtb</option>
            <option value="trekking">trekking</option>
            <option value="gravel">gravel</option>
            <option value="city">city</option>
            <option value="cargo">cargo</option>
            <option value="bmx">bmx</option>
        </select><br/>

        <label htmlFor="geometry_type">geometry_type</label><br/>
        <select name="geometry_type" id="geometry_type" defaultValue='universal'>
            <option value="man">man</option>
            <option value="woman">woman</option>
            <option value="universal">universal</option>
        </select><br/>

        <label htmlFor="wheelSize">wheel size</label><br/>
        <select name="wheelSize" id="wheelSize" defaultValue='20"'>
            <option value='20"'>20"</option>
            <option value='24"'>24"</option>
            <option value='26"'>26"</option>
            <option value='27.5"'>27.5"</option>
            <option value='28"'>28"</option>
            <option value='29"'>29"</option>
            <option value='12"'>12"</option>
            <option value='16"'>16"</option>
        </select><br/>

        <label htmlFor="suspension">suspension: </label><br/>
        <select name="suspension" id="suspension" defaultValue='no'>
            <option value='no'>no</option>
            <option value='front'>front</option>
            <option value='back'>back</option>
            <option value='full'>full</option>
        </select><br/>
        
        <label htmlFor="material">material: </label><br/>
        <select name="material" id="material" defaultValue='steel'>
            <option value='steel'>steel</option>
            <option value='aluminium'>aluminium</option>
            <option value='titan"'>titan</option>
            <option value='carbon'>carbons</option>
        </select><br/>


        <label htmlFor="availableSizes"> availableSizes</label><br/>
        <select name="availableSizes" id="availableSizes" defaultValue='steel' multiple>
            <option value='47'>47</option>
            <option value='50'>50</option>
            <option value='52'>52</option>
            <option value='54'>54</option>
            <option value='56'>56</option>
            <option value='58'>58</option>
            <option value='60'>60</option>
            <option value='62'>62</option>
            <option value='XS'>XS</option>
            <option value='S'>S</option>
            <option value='M'>M</option>
            <option value='M/L'>M/L</option>
            <option value='L'>L</option>
            <option value='XL'>XL</option>
            <option value='XXL'>XXL</option>
        </select><br/>
        <label htmlFor="images"> images </label><br/>
        <input type="text" id="images" name="imagess"/><br/>
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