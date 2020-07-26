const utilService = new (require('../libs/util.service'))();

class Student {
    updateStudent(value) {
        try {
            return Promise.all([this.upDateStudentRecord(Object.assign({}, value)),
            this.insertSkills(value.user_id, value.skills),
            this.insertHobies(value.user_id, value.hoobies),
            this.inesertCertificates(value.user_id, value.certificates),
            this.inesertUrls(value.user_id, value.userUrls),
            this.inesertProjects(value.user_id, value.userProjects),
            this.inesertAchievements(value.user_id, value.userAchievements),
            this.upDataLogin(value.user_id)
            ]);
        }
        catch {
            return reject('Error Updating Student Record');
        }
    }
    upDateStudentRecord(value) {
        delete value.skills; delete value.password; delete value.skils; delete value.hoobies; delete value.certificates; delete value.userUrls; delete value.userProjects; delete value.userAchievements;
        const query = utilService.createUpdateQuery(value, 'student', { user_id: value.user_id });
        return global.connection.execute(query, null);
    }
    insertSkills(user_id, value) {
        const skills = value.map((val) => [user_id, val]);
        const insertQuery = utilService.createBulkPostQuery([skills], 'skill');
        return global.connection.execute(insertQuery.query, insertQuery.values);
    }
    insertHobies(user_id, value) {
        const hobies = value.map((val) => [user_id, val]);
        const insertQuery = utilService.createBulkPostQuery([hobies], 'hobby');
        return global.connection.execute(insertQuery.query, insertQuery.values);
    }
    inesertCertificates(user_id, value) {
        const certificates = value.map(val => ([user_id,...Object.values(val), "false", utilService.gendrateUUID(), ""]));
        const insertQuery = utilService.createBulkPostQuery([certificates], 'certification');
        return global.connection.execute(insertQuery.query, insertQuery.values);
    }
    inesertUrls(user_id, value) {
        const urls = value.map(val => ([user_id, ...Object.values(val)]));
        const insertQuery = utilService.createBulkPostQuery([urls], `student-uri's`);
        return global.connection.execute(insertQuery.query, insertQuery.values);
    }
    inesertProjects(user_id, value) {
        const projects = value.map(val => ([user_id, ...Object.values(val)]));
        const insertQuery = utilService.createBulkPostQuery([projects], 'student_project');
        return global.connection.execute(insertQuery.query, insertQuery.values);
    }
    inesertAchievements(user_id, value) {
        const achievements = value.map(val => ([user_id, ...Object.values(val)]));
        const insertQuery = utilService.createBulkPostQuery([achievements], 'student_achievements');
        return global.connection.execute(insertQuery.query, insertQuery.values);
    }
    // GET List
    getStudents(query, user) {
        let addQuery;
        if(user['role'] === 'student') {
            addQuery = { user_id: user['user_id'] }
        }
        if(user['role'] === 'dept_hr') {
            addQuery = { dept_id: user['dept_id'] }
        }
        if(user['role'] === 'college_hr') {
            addQuery = { college_id: user['college_id'] }
        }
        query = {...addQuery,...query};
        const getStudentsQuery = this.getStudentsQuery(query);
        const countQuery = utilService.creteGetCountQuery('student', addQuery);
        return Promise.all([global.connection.execute(getStudentsQuery), global.connection.execute(countQuery)]);
    }
    getStudentsQuery(value) {
        let query = 'SELECT user_id, name, dept_id, cgpa, arrears, `10th%`, `12th%`, `diploma%`, parent_ph, student_ph, mail_id, alter_parent_ph, alter_student_ph, about_me, in_one_word, profile_image, moto, `roll-no` from student WHERE ';
        query += value['dept_id'] ? "dept_id = '" + value['dept_id'] + "' and " : "";
        query += value['10th%'] ? "`10th%` >= " + value['10th%'] + " and " : "";
        query += value['12th%'] ? "`12th%` >= " + value['12th%'] + " and " : "";
        query += value['cgpa'] ? "cgpa >= " + value['cgpa'] + " and " : "";
        query += value['diploma%'] ? "`diploma%` >= " + value['diploma%'] + " and " : "";
        query += value['arrears-allowed'] ? "arrears <= " + value['arrears-allowed'] + " and " : "";
        query+= "1 = 1";
        return query;
    }
    // update login
    upDataLogin(id) {
        const updataQuery = utilService.createUpdateQuery({ blockUser: false }, 'login', { user_id: id });
        return global.connection.execute(updataQuery);
    }
}

module.exports = Student;