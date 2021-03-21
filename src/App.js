import logo from './logo.svg';
import './App.css';

import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  WeekView,
  EditRecurrenceMenu,
  AllDayPanel,
  ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';

function App() {
  return (
    <div className="App">
      <h1>스케줄러 만들기는 내일부터</h1>
    </div>
  );
}

export default App;
