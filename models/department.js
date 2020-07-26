const utilService = new (require('../libs/util.service'))();

class Dept {
    createDept(value) {
        const dept_id = utilService.gendrateUUID();
        value['dept_id'] = dept_id;
        const query = utilService.createPostQuery(value, 'department');
        return global.connection.execute(query, null);
    }
}

module.exports = Dept;