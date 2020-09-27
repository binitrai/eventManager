import {
    returnData,
    getDataByFieldName,
    __setUpdate
} from "../util";

import i18 from "../i18.services";
import * as DBCONSTANTS from "../constants";
import createEvent from "./eventModal";

const getEventByUserId = userId => {
    let events = localStorage.getItem(DBCONSTANTS.EVENT_DATA);
    if (!events) {
        return returnData(false, null, i18.NOT_FOUND);
    } else {
        return getEventsMapByUserId(userId, JSON.parse(events));
    }
}

const createNewEvent = (eventName, description, venue, price, discount, createdBy) =>  {
    let event = createEvent(eventName, description, venue, price, discount, createdBy);
    __setUpdate(DBCONSTANTS.EVENT_DATA, event);
    return returnData(true, event);
}

const getEventsMapByUserId = (userId, data) => {
    let events = getDataByFieldName("createdBy", userId, data);
    if (events.length === 0) {
        return returnData(false, null, i18.NOT_FOUND);
    }
    let eventMap = {};
    events.forEach(item => {
        eventMap[item.id] = item;
    })
    return returnData(true, eventMap);
}


export {
    getEventByUserId,
    createNewEvent
}