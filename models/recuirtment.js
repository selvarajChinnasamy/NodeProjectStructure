const utilService = new (require('../libs/util.service'))();

class Recuirtment {
    constructor() { }

    static get tableName() {
        return 'recrutment';
    }

    createRecuirtment(value) {
        value['college_id'] = value['user']['college_id'];
        value['dept_id'] = value['user']['dept_id'];
        delete value['user']
        const recuirtment_id = utilService.gendrateUUID();
        value = Object.assign(value, { recrutment_id: recuirtment_id });
        const insertRecuirtment = utilService.createPostQuery(value, Recuirtment.tableName);
        return global.connection.execute(insertRecuirtment, []);
    }

    getRecuirtment(value) {
        let user = value['user'];
        let whereClause;
        if (user['role'] === 'student') {
            whereClause = { dept_id: user['dept_id'] }
        }
        if (user['role'] === 'dept_hr') {
            whereClause = { dept_id: user['dept_id'] }
        }
        if (user['role'] === 'college_hr') {
            whereClause = { college_id: user['college_id'] }
        }
        const recuirtmentDetails = this.createGetRecuirtmentQuery(whereClause, user);
        return global.connection.execute(recuirtmentDetails);
    }
    createGetRecuirtmentQuery(whereClause, user) {
        let query;
        if (user.role === 'student') {
            query = `with li AS 
            (select
                        company.name,
                        company.company_id,
                        recrutment.recrutment_id,
                        recrutment.date_posted,
                        recrutment.drive_date,
                        recrutment.description,
                        recrutment.get_intrest,
                        recrutment.drive_type,
                        company.mail_id,
                        company.website,
                        company.phone
                        from 
                        student,
                        company,
                        recrutment
                        where recrutment.company_id = company.company_id and
                        student.user_id = '${user.user_id}' and
                        student.10th >= recrutment.10th and
                        student.12th >= recrutment.12th and
                        student.diploma >= recrutment.diploma and 
                        student.arrears <= recrutment.arrears_allowed and 
                        student.cgpa >= recrutment.cgpa
                )
                select name,
                li.date_posted,
                li.drive_date,
                li.description,
                li.get_intrest,
                li.drive_type,
                li.mail_id,
                li.website,
                li.phone,
                li.company_id,
                li.recrutment_id,
                 favorites.id as favorite_id,
                recuirtment_intrest_manage.status,
                recuirtment_intrest_manage.reason from li 
                left join recuirtment_intrest_manage on 
                recuirtment_intrest_manage.recrutment_id = li.recrutment_id and 
                recuirtment_intrest_manage.user_id = '${user.user_id}'
                left join favorites on li.company_id = favorites.item_id and favorites.user_id = '${user.user_id}'
            `;
            return query;
        }
        query = `WITH li AS 
	(SELECT
                    recrutment.recrutment_id, 
                    recrutment.company_id,
                    recrutment.date_posted,
                    recrutment.drive_date,
                    recrutment.10th,
                    recrutment.12th,
                    recrutment.diploma,
                    recrutment.cgpa,
                    recrutment.drive_type,
                    recrutment.get_intrest,
                    recrutment.arrears_allowed
		FROM recrutment 
		where recrutment.drive_date >= CURDATE())
select li.recrutment_id,
        li.drive_date,
        li.date_posted,
        li.10th,
        li.12th,
        li.diploma,
        li.cgpa,
        li.drive_type,
        li.get_intrest,
        li.arrears_allowed,
		cmp.name company_name,
        (select count(*) totalstudents from student where ${Object.keys(whereClause).map(key => `student.${key} = \'${whereClause[key]}\'`)}) totalstudents,
        count(*) eligible,  
		count(case when rqint.status = 1 then 1 end) accepted, 
		count(case when rqint.status = 0 then 1 end) rejected
from li  
	left join recuirtment_intrest_manage rqint on
		rqint.recrutment_id = li.recrutment_id
	left join company cmp on
		cmp.company_id = li.company_id
group by recrutment_id,  drive_date, drive_type, get_intrest, date_posted, cmp.name, 10th, 12th, diploma, cgpa, arrears_allowed`;
        return query;
    }

    acceptRecuirtment(value) {
        const updateRecuirtment=  utilService.createPostQuery({id: utilService.gendrateUUID(), status: value.status, reason: value.reason, recrutment_id: value.recrutment_id, user_id: value['user']['user_id'] }, 'recuirtment_intrest_manage');
        return global.connection.execute(updateRecuirtment);
    }

}

module.exports = Recuirtment;