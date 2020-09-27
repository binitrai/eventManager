import {
    getUUID,
    getCreatedAt
} from "../util";

const createEvent = (eventName, description, venue, price, discount, createdBy) => {
    const event = Object.create(null);
    event.id = getUUID("event");
    event.eventName = eventName;
    event.description = description;
    event.venue = venue;
    event.price = price;
    event.discount = discount;
    event.createdAt =  getCreatedAt();
	event.lastModified = event.createdAt;
	event.createdBy = createdBy;
    return event;
 }

 export default createEvent;