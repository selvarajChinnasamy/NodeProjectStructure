const utilService = new (require('../libs/util.service'))();

class Register {
    createCollege(value) {
        try {
            const college_id = utilService.gendrateUUID(),
                college = { college_id: college_id, name: value.name, website: value.website, mail_id: value.mail_id, phone: value.phone },
                insertCollegequery = utilService.createPostQuery(college, 'college'),
                collegeLocation = { college_id: college_id, pincode: value.college_address.pincode, country: value.college_address.country, state: value.college_address.state, district: value.college_address.district, city: value.college_address.city },
                insertCollegeLocationquery = utilService.createPostQuery(collegeLocation, 'college_location');
            return Promise.all([global.connection.execute(insertCollegequery, null), global.connection.execute(insertCollegeLocationquery, null)]);
        }
        catch {
            return ('Error Creating College');
        }
    }
    createCompany(value) {
            const company_id = utilService.gendrateUUID(),
                company = { company_id: company_id, name: value.name, website: value.website, mail_id: value.mail_id, phone: value.phone, location: value.location },
                insertCompanyquery = utilService.createPostQuery(company, 'company');
            return global.connection.execute(insertCompanyquery, null);
    }
    createStudentLogin(value) {
        const student_id = utilService.gendrateUUID(),
            insertStudentquery = utilService.createPostQuery({ user_id: student_id, ...value }, 'student'),
            insertStudentLoginquery = utilService.createPostQuery({ user_id: student_id, mail_id: value.mail_id, password: value.mail_id, role: 'student', college_id: value.college_id, dept_id: value.dept_id }, 'login');
        return Promise.all([global.connection.execute(insertStudentquery, null), global.connection.execute(insertStudentLoginquery, null)]);
    }
    createCollegeHrLogin(value) {
        const hr_id = utilService.gendrateUUID(),
            insertCollegeHRquery = utilService.createPostQuery({ user_id: hr_id, ...value }, 'college_hr'),
            insertCollegeHrLoginquery = utilService.createPostQuery({ user_id: hr_id, mail_id: value.mail_id, password: value.mail_id, role: 'college_hr', college_id: value.college_id, dept_id: value.college_id }, 'login');
            console.log('insertCollegeHrLoginquery');
        return Promise.all([global.connection.execute(insertCollegeHRquery, null), global.connection.execute(insertCollegeHrLoginquery, null)]);
    }
    createDeptHrLogin(value) {
        const hr_id = utilService.gendrateUUID(),
            insertDeptHRquery = utilService.createPostQuery({ user_id: hr_id, ...value }, 'dept_hr'),
            insertDeptHrLoginquery = utilService.createPostQuery({ user_id: hr_id, mail_id: value.mail_id, password: value.mail_id, role: 'dept_hr', college_id: value.college_id, dept_id: value.dept_id }, 'login');
        return Promise.all([global.connection.execute(insertDeptHRquery, null), global.connection.execute(insertDeptHrLoginquery, null)]);
    }
}

module.exports = Register;
