import React from "react";

function Select({options, onChange, value}) {

    //console.log(props.options);

    return (
        <select onChange={onChange} value={value} >
            {options.map((item, i) => (
                <option key={item} value={i}>
                    {item}
                </option>
            ))}
        </select>
    )
}

export default Select;