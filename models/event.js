const utilService = new (require('../libs/util.service'))();

class Events {
    createEvent(value) {
        value['user_id'] = value['user']['user_id'];
        value['college_id'] = value['user']['college_id'];
        value['dept_id'] = value['user']['dept_id'];
        delete value['user'];
        const event_id = utilService.gendrateUUID();
        value['event_id'] = event_id;
        const query = utilService.createPostQuery(value, 'event');
        return global.connection.execute(query, null);
    }

    registerAcceptance(value) {
        const query = utilService.createPostQuery(value, 'event_attendees');
        return global.connection.execute(query, null);
    }

    registerAttendance(values) {
        let attendance = values.status;
        let att_values = [];
        attendance = attendance.map(val => {
            val['event_id'] = values.event_id;
            att_values.push(Object.values(val));
        });
        const registerAttendance = utilService.createBulkPostQuery([att_values], 'event_attandance');
        return global.connection.execute(registerAttendance.query, registerAttendance.values);
    }

    getEvents(value) {
        let queryParams = {};
            ((value['user'].role === 'dept_hr') || (value['user'].role === 'student')) ?
                queryParams = {
                    dept_id: value['user'].dept_id
                } :
                queryParams = {
                    college_id: value['user'].college_id
                };
        const getEventsQuery = this.getEventsQuery(value['user'], queryParams);
        return global.connection.execute(getEventsQuery);
    }

    getEventsQuery(value, queryParams) {
        let nameTable = (value.role === 'dept_hr' || value.role === 'student') ? 'dept_hr' : 'college_hr';
        let sql = `SELECT event.event_id, event.title, event.description, event.date_from, event.date_to, event.venue, event.organizer,
        event.organizer_contact, event.organizer_mail_id, event.event_type, event.get_intrested, event.cgpa,
        ${nameTable}.name as coordinatorName, ${nameTable}.mail_id as coordinatorMail, ${nameTable}.phone as coordinatorPhone from event, ${nameTable}
        where ${Object.keys(queryParams).map( key => `event.\`${key}\` = \'${queryParams[key]}\'`)} and ${nameTable}.user_id = event.user_id`;
        return sql;
    }

    updateEvent(value, id) {
        delete value['user'];
        const query = utilService.createUpdateQuery(value, 'event', { event_id: id });
        return global.connection.execute(query, null);
    }

    deleteEvent(id) {
        const query = utilService.createDeleteQuery('event', { event_id: id });
        return global.connection.execute(query, null);
    }
}

module.exports = Events;