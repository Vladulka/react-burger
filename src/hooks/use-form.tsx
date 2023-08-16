import React, { useState } from "react";
import { TEventTarget } from "../types";

export function useForm(inputValues={}) {
    const [values, setValues] = useState(inputValues);

    const handleChange = (event: TEventTarget) => {
        const {value, name}: {value: string, name: string} = event.target;
        setValues({...values, [name]: value});
    };
    return {values, handleChange, setValues};
}