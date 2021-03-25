import React, {Component} from 'react';
import {Paper} from '@material-ui/core';
import {ViewState, EditingState} from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    Appointments,
    AppointmentForm,
    AppointmentTooltip,
    WeekView,
    EditRecurrenceMenu,
    AllDayPanel,
    ConfirmationDialog
} from '@devexpress/dx-react-scheduler-material-ui';
import { plans } from './demo-data/plans';

export default class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: plans,
            currentDate: '2021-03-22',

            addedAppointment: {},
            appointmentChanges: {},
            editingAppointmentId: undefined
        };

        this.commitChanges = this.commitChanges.bind(this);
        this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
        this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
        this.changeEditingAppointmentId = this.changeEditingAppointmentId.bind(this);
    }

    changeAddedAppointment(addedAppointment) {
        this.setState({addedAppointment});
    }

    changeAppointmentChanges(appointmentChanges) {
        this.setState({appointmentChanges});
    }

    changeEditingAppointmentId(editingAppointmentId) {
        this.setState({editingAppointmentId});
    }

    commitChanges({added, changed, deleted}) {
        this.setState((state) => {
            let {data} = state;
            if (added) {
                const startingAddedId = data.length > 0
                    ? data[data.length - 1].id + 1
                    : 0;
                data = [
                    ...data, {
                        id: startingAddedId,
                        ...added
                    }
                ];
            }
            if (changed) {
                data = data.map(appointment => (
                    changed[appointment.id]
                        ? {
                            ...appointment,
                            ...changed[appointment.id]
                        }
                        : appointment
                ));
            }
            if (deleted !== undefined) {
                data = data.filter(appointment => appointment.id !== deleted);
            }
            return {data};
        });
    }

    render() {
        const {currentDate, data, addedAppointment, appointmentChanges, editingAppointmentId} = this.state;
        return (
            <Paper>
                <Scheduler data={data} height={1000}>
                    <ViewState currentDate={currentDate}/>
                    <EditingState
                        onCommitChanges={this.commitChanges}
                        addedAppointment={addedAppointment}
                        onAddedAppointmentChange={this.changeAddedAppointment}
                        appointmentChanges={appointmentChanges}
                        onAppointmentChangesChange={this.changeAppointmentChanges}
                        editingAppointmentId={editingAppointmentId}
                        onEditingAppointmentIdChange={this.changeEditingAppointmentId}/>
                    <WeekView startDayHour={9} endDayHour={20}/>
                    <AllDayPanel/>
                    <EditRecurrenceMenu/>
                    <ConfirmationDialog/>
                    <Appointments/>
                    <AppointmentTooltip
                        showOpenButton="showOpenButton"
                        showDeleteButton="showDeleteButton"/>
                    <AppointmentForm/>
                </Scheduler>
            </Paper>
        );
    }
}
