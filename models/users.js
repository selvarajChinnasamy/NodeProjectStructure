class Users {
    getUser(value) {
        let user = value['user'];
        return global.connection.execute(this.getQuery(user));
    }
    getQuery(value) {
        let nameTable = value.role === 'dept_hr' ? 'dept_hr' : value.role === 'student' ? 'student' : 'college_hr';
        let sql = `select ${nameTable}.name, login.role, (SELECT count(favorites.id) FROM favorites where favorites.user_id = '${value.user_id}' group by favorites.user_id) favCount from ${nameTable}, login where ${nameTable}.user_id = '${value.user_id}' and login.user_id = '${value.user_id}'`;
        return sql;
    }

    getUserEvents(value) {
        let user = value['user'];
        let whereClause;
        if (user['role'] === 'student') {
            whereClause = { user_id: user['user_id'] }
            return Promise.all([global.connection.execute(this.getPlacementEventsStudents(user)), global.connection.execute(this.getVotingsStudents(user))]);
        }
        if (user['role'] === 'dept_hr') {
            whereClause = { dept_id: user['dept_id'] }
        }
        if (user['role'] === 'college_hr') {
            whereClause = { college_id: user['college_id'] }
        } 
        return Promise.all([global.connection.execute(this.getPlacementEvents(user, whereClause)), global.connection.execute(this.getVotings(user, whereClause))]);
    }

    getPlacementEventsStudents(user) {
        let sql = `SELECT recrutment.recrutment_id, recrutment.dept_id, recrutment.date_posted, recrutment.drive_date, recrutment.company_id, recrutment.10th, recrutment.12th, recrutment.diploma, recrutment.arrears_allowed, recrutment.cgpa, recrutment.drive_type, recrutment.No_company_offers_allowed, recrutment.get_intrest, recrutment.description, recrutment.recrutment_id, company.name as companyName  FROM recrutment left join student
        on  student.cgpa >= recrutment.cgpa and student.10th >= recrutment.10th and student.12th >= recrutment.12th and student.diploma >= recrutment.diploma and student.arrears <= recrutment.arrears_allowed and student.user_id = '${user.user_id}' and recrutment.dept_id = '${user.dept_id}'
                left join company on recrutment.company_id = company.company_id left join
                recuirtment_intrest_manage on
                recuirtment_intrest_manage.recrutment_id = recrutment.recrutment_id 
                where  recrutment.get_intrest = 'true' and recrutment.dept_id = 'f0eee94c-3f98-48a5-b5eb-219d7be96a81' and
                recrutment.recrutment_id not in (select recrutment_id  from recuirtment_intrest_manage
                where user_id = '${user.user_id}')`;
        return sql;
    }

    getVotingsStudents(user) {
        let sql = `SELECT vote_call.vote_id, vote_call.vote_title,vote_call.vote_description, vote_call.college_id, vote_call.date_start, vote_call.date_end, vote_call.status, vote_call.dept_id, vote_call.user_id FROM vote_call
        left join vote_manage on vote_manage.vote_id = vote_call.vote_id where vote_call.dept_id = '${user.dept_id}' and vote_call.vote_id not in (select vote_id  from vote_manage where user_id = '${user.user_id}')`;
        return sql;
    }

    getVotings(user, whereClause) {
        let sql = `with li as (select vote_id, vote_title, vote_description, date_start, date_end, (select count(student.user_id) from student where ${Object.keys(whereClause).map(key => `student.${key} = \'${whereClause[key]}\'`)}) as totalCount from vote_call where ${Object.keys(whereClause).map(key => `vote_call.${key} = \'${whereClause[key]}\'`)}) 
        select li.vote_id, li.vote_title, li.vote_description, li.date_start, li.date_end,li.totalCount, count(case when rqint.status = 1 then 1 end) accepted, 
                count(case when rqint.status = 0 then 1 end) rejected from li left join
        vote_manage rqint on li.vote_id = rqint.vote_id group by li.vote_id`;
        return sql;
    }

    // get placements events query
    getPlacementEvents(user, whereClause) {
        let sql = `with li as (select recrutment.recrutment_id,
            recrutment.10th,
            recrutment.12th,
            recrutment.diploma,
            recrutment.arrears_allowed,
            recrutment.cgpa,
            recrutment.date_posted,
            recrutment.company_id,
            recrutment.drive_type,
            recrutment.drive_date,
            recrutment.get_intrest,
            count(student.user_id) as eligible from recrutment  left join student on
            ${Object.keys(whereClause).map(key => `student.${key} = \'${whereClause[key]}\' and  recrutment.${key} = \'${whereClause[key]}\'`)} and
            recrutment.get_intrest = 'true' and 
            student.10th >= recrutment.10th and 
            student.12th >= recrutment.12th and 
            student.diploma >= recrutment.diploma and 
            student.arrears <= recrutment.arrears_allowed and 
            student.cgpa >= recrutment.cgpa
            group by recrutment.recrutment_id,
            recrutment.10th,
            recrutment.12th,
            recrutment.diploma,
            recrutment.get_intrest,
            recrutment.arrears_allowed,
            recrutment.cgpa,
            recrutment.date_posted,
            recrutment.drive_type,
            recrutment.company_id,
            recrutment.drive_date)
            select li.recrutment_id, li.company_id, li.10th, li.12th, li.diploma, li.arrears_allowed, li.cgpa, li.date_posted, li.drive_type,  li.drive_date, li.get_intrest, li.eligible, count(case when rqint.status = 1 then 1 end) accepted,
                count(case when rqint.status = 0 then 1 end) rejected, cmp.name company_name from li left join recuirtment_intrest_manage rqint on
            rqint.recrutment_id = li.recrutment_id
            left join company cmp on
		    cmp.company_id = li.company_id
            group by li.recrutment_id,  li.drive_date, li.company_id, li.eligible, li.drive_type, cmp.name,  li.date_posted, li.10th, li.12th, li.diploma, li.cgpa, li.arrears_allowed, li.get_intrest`;
        return sql;
    }
}

module.exports = Users;