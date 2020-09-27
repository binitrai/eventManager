import React, {useState}from "react";
import classes from "./CreateNewEvent.module.css";
import d from "../../UI/index.module.css";
import {cn} from "../../../utils/utils";

import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import i18 from "../../../services/i18.services";


function CreateNewEvent(props) {
    const [eventName, setEventName] = useState("");
    const [description, setDescription] = useState("");
    const [venue, setVenue] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");

    const isEmpty =  val => val !== "";

    const isDisabled = ![eventName, description, venue, price, discount].every(isEmpty);

    const clickHandeler = () => {
        props.create(eventName, description, venue, price, discount);
    }

    const resetHandeler = () => {
        [setEventName, setDescription, setVenue, setPrice, setDiscount].forEach(fn => fn(""));
    }
    return (
        <section className={classes.NewEvent}>
            <h2>{props.heading}</h2>
            <div className={classes.InputContainer}>
                <Input 
                    value={eventName} 
                    onChangeHandeler={(e) => setEventName(e.target.value)} 
                    placeholder={i18.eventName}
                />
            </div>
            <div className={classes.InputContainer}>
                <Input 
                    value={description} 
                    onChangeHandeler={(e) => setDescription(e.target.value)} 
                    placeholder={i18.description}
                />
            </div>
            <div className={classes.InputContainer}>
                <Input 
                    value={venue} 
                    onChangeHandeler={(e) => setVenue(e.target.value)} 
                    placeholder={i18.venue}
                />
            </div>
            <div className={classes.InputContainer}>
                <Input 
                    value={price} 
                    onChangeHandeler={(e) => setPrice(e.target.value)} 
                    placeholder={i18.price}
                    type = "number"
                />
            </div>
            <div className={classes.InputContainer}>
                <Input 
                    value={discount} 
                    onChangeHandeler={(e) => setDiscount(e.target.value)} 
                    placeholder={i18.discount}
                    type="number"
                />
            </div>
            <div className={cn(d.PullRight, classes.ButtonContainer)}>
                <Button
                    btnType="AutoWidth" 
                    name="createEvent"
                    clicked={clickHandeler}
                    disabled={isDisabled}
                >
                    {i18.create}
                </Button>
                <Button
                    btnType="AutoWidth" 
                    name="ResetEvent"
                    clicked={resetHandeler}
                    classNames = {d.MarginLSM}
                >
                    {i18.reset}
                </Button>
                <Button
                    btnType="AutoWidth" 
                    name="Cancel"
                    classNames = {d.MarginLSM}
                    clicked={props.cancel}
                >
                    {i18.cancel}
                </Button>
            </div>

        </section>
    )
}
export default CreateNewEvent;