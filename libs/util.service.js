const uuidv4 = require('uuid/v4');

class UtilService {
  shallowCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
  creteGetCountQuery(tableName, where_clause) {
    return `SELECT count(*) as count from ${tableName} where ${Object.keys(where_clause).map( key => `\`${key}\` = \'${where_clause[key]}\'`).join('and')}`
  }
  createGetQuery(selectObject, conditionObject, tableName) {
    const toSelected = selectObject === 'all' ? '*' : selectObject.join();
    let sql = `select ${toSelected} from ${tableName}`;
    sql += Object.keys(conditionObject).length ? ' where ' + Object.keys(conditionObject).join(' = ? and ') + '= ?' : '';
    return { query: sql, values: Object.values(conditionObject) };
  }
  createPostQuery(value, tableName) {
    return `Insert into ${tableName} (\`${Object.keys(value).join('\`,\`')}\`) values ('${Object.values(value).join('\',\'')}')`;
  }
  createUpdateQuery(value, tableName, where_clause) {
    return `Update ${tableName} set  ${Object.keys(value).map(key => `\`${key}\` = \'${value[key]}\'`).join()} where ${(Object.keys(where_clause).length === 0) ? 1 : Object.keys(where_clause).map( key => `\`${key}\` = \'${where_clause[key]}\'`).join('and')}`;
  }
  createDeleteQuery(tableName, where_clause) {
    return `Delete from ${tableName} where ${Object.keys(where_clause).map( key => `\`${key}\` = \'${where_clause[key]}\'`).join('and')}`;
  }
  createBulkPostQuery(values, tableName) {
    let sql = `Insert into \`${tableName}\` values ?`;
    return { query: sql, values: values };
  }
  gendrateUUID(){
    return uuidv4();
  }
}

module.exports = UtilService;