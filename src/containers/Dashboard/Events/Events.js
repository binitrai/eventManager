import React from "react"; 
import Card from "../../../components/UI/Card/Card";
import i18 from "../../../services/i18.services"

function events({data, filterValue}) {
    if (!data) {
        return (
            <h2>
                {i18.noEvents}
            </h2>
        )
    }
    let filteredEvent = Object.keys(data);
    if (+filterValue !== 0) {
        filteredEvent = filteredEvent.filter(item => {
            let event = data[item];
            if (+filterValue ===  1) {
                return Number(event.price) === 0;
            } else if (+filterValue ===  2) {
                return Number(event.discount) !== 0;
            } else if (+filterValue ===  3) {
                return Number(event.discount) === 0
            } else {
                return true;
            }
        })
    }
    let events = filteredEvent.map(item => {
        let event = data[item];
        return (
            <Card key={event.id}>
                <h3>{event.eventName}</h3> 
                <p><strong>{i18.description} :</strong>{event.description}</p>
                <p>
                    <span>
                        <strong>{i18.venue} :</strong>{event.venue}
                    </span>
                    <span>
                        <strong>{i18.price} :</strong>{event.price}
                    </span>
                    <span>
                        <strong>{i18.discount} :</strong>{event.discount}
                    </span>
                </p>
            </Card>
        )
    });
    
    
    return (
        <section>
           {filteredEvent.length ? events : <h3>{i18.notFoundInSelectedFilter}</h3>}
        </section>
    )
}
export default events;