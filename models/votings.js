const utilService = new (require('../libs/util.service'))();

class Votings {
    constructor() { }

    static get tableName() {
        return 'vote_call';
    }

    createVotings(value) {
        const vote_id = utilService.gendrateUUID();
        value = Object.assign(value, { vote_id: vote_id });
        const insertVotings = utilService.createPostQuery(value, Votings.tableName);
        return global.connection.execute(insertVotings, []);
    }

    acceptVotings(value) {
            const updateVotings =  utilService.createPostQuery({ status: value.status, reason: value.reason, vote_id: value.vote_id, user_id: value['user']['user_id'] }, 'vote_manage');
            return global.connection.execute(updateVotings);
    }

    getVotings(value) {
        let queryParams = {};
        (value.role === 'student') ?
            queryParams = {
                user_id: value.user_id
            } :
            (value.role === 'dept_hr') ?
                queryParams = {
                    dept_id: value.dept_id
                } :
                queryParams = {
                    college_id: value.college_id
                };
        const getVotingsQuery = utilService.createGetQuery('all', queryParams, 'vote_call');
        return global.connection.execute(getVotingsQuery.query, getVotingsQuery.values);
    }

}

module.exports = Votings;
