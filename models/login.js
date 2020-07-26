const utilService = new (require('../libs/util.service'))();

class Login {
  constructor() {
    this.result = null;
  }

  static get tableName() {
    return 'login';
  }

  loginValidator(value) {
    return new Promise((resolve, reject) => {
      const query = utilService.createGetQuery(['mail_id', 'role', 'blockUser', 'user_id', 'college_id', 'dept_id'], value, Login.tableName);
      global.connection.execute(query.query, query.values).then(data => {
        if (data.length) {
          let user = {
            token: global.jwt.sign({ 
              mail_id: data[0].mail_id,
              blockUser: data[0].blockUser,
              role: data[0].role,
              user_id: data[0].user_id,
              college_id: data[0].college_id,
              dept_id: data[0].dept_id
            }, 'hitit')
          };
          user = Object.assign(user, data[0]);
          return resolve(user);
        }
        return reject({ status: 401, sqlMessage: 'Invalid User' });
      });
    });
  }
}

module.exports = Login;
