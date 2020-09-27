import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import s from "./Dasboard.module.css";
import d from "../../components/UI/index.module.css"
import {cn, getStatus} from "../../utils/utils"; 
import * as actionCreators from "../../store/actions/actionCreators";
import Button from "../../components/UI/Button/Button";
import Modal from "../../components/UI/Modal/Modal";
import CreateNewEvent from "../../components/Event/CreateNewEvent/CreateNewEvent";
import Events from "./Events/Events";
import i18 from "../../services/i18.services";
import Select from "../../components/UI/Select/Select";

function Dashboard(props) {
   const {userId, getEvents} = props;
   const [selectvalue, setSelectValue] = useState(0);
   const selectHandeler = (val) => {
        setSelectValue(val);
   }
    const filter_params = getStatus();

    useEffect(() => {
        getEvents(userId);
    }, [getEvents, userId]);

    const [modalState, setModalState] = useState(false);
    const changeModalState = () => {
        setModalState(!modalState);
    }
    const create = (eventName, description, venue, price, discount) => {
       props.createEvent(eventName, description, venue, price, discount, userId);
       changeModalState();

    }
    return (
        <>
            <section>
                <h1 className={cn(d.inlineBlock, d.marginNone)}>Dasboard : {props.userName}</h1> 
                <div className= {cn(d.PullRight, d.inlineBlock)}>
                    <span>
                        {i18.filterTasks} 
                        <Select 
                            options={filter_params} 
                            value={selectvalue}  
                            onChange={e => selectHandeler(e.target.value)}
                        />
                    </span>
                    <Button 
                            btnType="AutoWidth" 
                            name="createNewEvent"
                            clicked={changeModalState}
                            classNames={d.MarginLMD}
                        >
                            {i18.createNewEvent}
                        </Button>
                </div>
            </section>
            <div className={s.Dashboard} >
                <Modal show={modalState} modalClosed={changeModalState}>
                    <CreateNewEvent cancel={changeModalState} create={create} heading={i18.createNewEvent}/>
                </Modal>
                {props.loading ? i18.loading : 
                    <Events data={props.eventData} filterValue={selectvalue}/> 
                } 
            </div>
        </>
    )
}



const mapStateToProps = state => {
    return {
        userId : state.userId,
        userName : state.userName,
        loading : state.loading,
        eventData : state.eventData
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getEvents : (userId) => dispatch(actionCreators.getEvents(userId)),
        createEvent : (eventName, description, venue, price, discount, userId) => dispatch(actionCreators.createEvent(eventName, description, venue, price, discount, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

