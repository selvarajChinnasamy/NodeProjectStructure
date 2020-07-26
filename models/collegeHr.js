const utilService = new (require('../libs/util.service'))();

class Collegehr {
    updateCollegeHr(value) {
        const query = utilService.createUpdateQuery(value, 'college_hr', { user_id: value.user_id }),
        updataQuery = utilService.createUpdateQuery({ blockUser: false }, 'login', { user_id: value.user_id });
        return Promise.all([global.connection.execute(query, null), global.connection.execute(updataQuery)]);
    }
    getCollegeHr(id) {
        const getCollegeHrQuery = utilService.createGetQuery('all', id ? { user_id: id } : {}, 'dept_hr');
        return global.connection.execute(getCollegeHrQuery.query, getCollegeHrQuery.values);
    }
}

module.exports = Collegehr;