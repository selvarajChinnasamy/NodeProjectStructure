const utilService = new (require('../libs/util.service'))();

class Company {
    getCompany() {
        const getCompanyQuery = "Select company_id as id, name from company";
        return global.connection.execute(getCompanyQuery, null);
    }
    getCompanyFullDetails(user) {
        const getCompanyQuery = `
        select company.company_id, company.name, company.website, company.mail_id, company.phone, company.location, 'company.10th%', 'company.12th%', 'company.deploma%', 'company.arrears-allowed', company.cgpa, favorites.id favorite_id from company left join favorites on favorites.item_id = company.company_id and favorites.user_id = '${user['user']['user_id']}'
        `;
        return global.connection.execute(getCompanyQuery, null);
    }
}

module.exports = Company;