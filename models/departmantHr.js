const utilService = new (require('../libs/util.service'))();

class Depthr {
    updateDeptHr(value) {
        const query = utilService.createUpdateQuery(value, 'dept_hr', { user_id: value.user_id }),
        updataQuery = utilService.createUpdateQuery({ blockUser: false }, 'login', { user_id: value.user_id });
        return Promise.all([global.connection.execute(query, null), global.connection.execute(updataQuery)]);
    }
    getDeptHr(id) {
        const getDeptHrQuery = utilService.createGetQuery('all', id ? { user_id: id } : {}, 'dept_hr');
        return global.connection.execute(getDeptHrQuery.query, getDeptHrQuery.values);
    }
}

module.exports = Depthr;