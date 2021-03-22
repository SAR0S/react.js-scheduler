import React, {Component} from 'react';

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

export default class demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{
                title: 'Practice Ollie',
                startDate: new Date(2021, 3, 22, 9, 35),
                endDate: new Date(2021, 3, 22, 11, 30),
                id: 0,
                location: 'Skate Park',
            }, {
                title: 'Buy a new skateboard',
                startDate: new Date(2021, 3, 23, 12, 11),
                endDate: new Date(2021, 3, 23, 13, 0),
                id: 1,
                location: 'Skateboard Shop',
            }, {
                title: 'learn how to Ollie',
                startDate: new Date(2021, 3, 25, 14, 30),
                endDate: new Date(2021, 3, 25, 15, 35),
                id: 2,
                location: 'Skate Park',
            }],
            currentDate: '2021-03-22',
        
            addedAppointment: {},
            appointmentChanges: {},
            editingAppointmentId: undefined,
        };
    
        this.commitChanges = this.commitChanges.bind(this);
        this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
        this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
        this.changeEditingAppointmentId = this.changeEditingAppointmentId.bind(this);
    }

    render() {
        const {
            currentDate, data, addedAppointment, appointmentChanges, editingAppointmentId,
        } = this.state;
        return (
            <div>
                <Scheduler
                    data={data}
                    height={660}>
                </Scheduler>
            </div>
        );
    }
}
