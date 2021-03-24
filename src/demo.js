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

export default class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    title: 'Practice Ollie',
                    startDate: new Date(2021, 3, 22, 9, 35),
                    endDate: new Date(2021, 3, 22, 11, 30),
                    id: 0,
                    location: 'Skate Park'
                }, {
                    title: 'Buy a new skateboard',
                    startDate: new Date(2021, 3, 23, 12, 11),
                    endDate: new Date(2021, 3, 23, 13, 0),
                    id: 1,
                    location: 'Skateboard Shop'
                }, {
                    title: 'learn how to Ollie',
                    startDate: new Date(2021, 3, 25, 14, 30),
                    endDate: new Date(2021, 3, 25, 15, 35),
                    id: 2,
                    location: 'Skate Park'
                }
            ],
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
