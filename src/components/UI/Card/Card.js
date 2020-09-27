import React from "react";
import classes from "./Card.module.css";
const card = ({children}) => {
    return (
        <section className={classes.Card}>
            <div className={classes.Container}>
                {children}
            </div>
        </section>
    )
}
export default card;