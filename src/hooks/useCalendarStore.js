import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import calendarApi from '../api/calendarApi';
import { convertEventsToDateEvents } from '../helpers';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store';

export const useCalendarStore = () => {
  
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }

    const startSavingEvent = async( calendarEvent ) => {
        // TODO: backend
        try {
            // All ok
            if( calendarEvent.id ) {
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch( onUpdateEvent({ ...calendarEvent, user}) );
                return;
            }

            // Creating
            const {  data } = await calendarApi.post('/events', calendarEvent);
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user }) );
        } catch (error) {
            Swal.fire('Error saving', error.response.data.msg, 'error');
        }
        
    }

    const startDeletingEvent = async () => {
        // Todo: backend

        try {
            await calendarApi.delete(`/events/${activeEvent.id}`);
            dispatch( onDeleteEvent() );
        } catch (error) {
            Swal.fire('Error deleting', error.response.data.msg, 'error');
        }
    }

    const startLoadingEvents = async ()=> {
        try {
            const { data } = await calendarApi.get('/events');
            const events = convertEventsToDateEvents( data.events );
            dispatch( onLoadEvents( events ) );
            
        } catch (error) {
            console.log('Error loading events');
            console.log(error);
        }
    }


    return {
        //* Properties
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,

        //* Methods
        startDeletingEvent,
        startLoadingEvents,
        setActiveEvent,
        startSavingEvent,
    }
}
