const utilService = new (require('../libs/util.service'))();

class Favorites {
    static get tableName() {
        return 'favorites';
    }
    addFavorites(value) {
        value['user_id'] = value['user']['user_id'];
        delete value['user'];
        const id = utilService.gendrateUUID();
        value = Object.assign(value, { id: id });
        const insertFavorites = utilService.createPostQuery(value, Favorites.tableName);
        return global.connection.execute(insertFavorites, []);
    }
}

module.exports = Favorites;