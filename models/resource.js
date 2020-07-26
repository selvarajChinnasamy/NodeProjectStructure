const utilService = new (require('../libs/util.service'))();

class Resource {
    constructor() { }

    static get tableName() {
        return 'digital_resourse';
    }

    createResource(value) {
        value['poster_id'] = value['user']['user_id'];
        value['college_id'] = value['user']['college_id'];
        value['dept_id'] = value['user']['dept_id'];
        delete value['user']
        const resource_id = utilService.gendrateUUID();
        value = Object.assign(value, { resource_id: resource_id });
        const insertResource = utilService.createPostQuery(value, Resource.tableName);
        return global.connection.execute(insertResource, []);
    }

    updateResource(value, id) {
        delete value['user'];
        const query = utilService.createUpdateQuery(value, Resource.tableName, { resource_id: id });
        return global.connection.execute(query, null);
    }

    deleteResource(id) {
        const query = utilService.createDeleteQuery(Resource.tableName, { resource_id: id });
        return global.connection.execute(query, null);
    }

    getResource(value) {
        const getResourceQuery = this.getResourceQuery(value);
        return global.connection.execute(getResourceQuery, []);
    }

    getResourceQuery(value) {
        const nameTable = value['user']['role'] === 'student' ? 'student' : value['user']['role'] === 'dept_hr' ? 'dept_hr' : 'college_hr';
        const whereClause = (value['user']['role'] === 'student' || value['user']['role'] === 'dept_hr') ? `${Resource.tableName}.dept_id = '${value['user']['dept_id']}'` : `${Resource.tableName}.college_id = '${value['user']['college_id']}'`;
        let query = `SELECT ${nameTable}.name,
        ${nameTable}.mail_id,
        ${Resource.tableName}.title,
        ${Resource.tableName}.date_posted,
        ${Resource.tableName}.poster_id,
        ${Resource.tableName}.resource_id,
        ${Resource.tableName}.discription,
        ${Resource.tableName}.link 
        FROM ${Resource.tableName}, ${nameTable} WHERE ${whereClause} and ${Resource.tableName}.poster_id = ${nameTable}.user_id`;
        return query;
    }
}

module.exports = Resource;