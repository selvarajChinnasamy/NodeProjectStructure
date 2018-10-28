
class UtilService {
    shallowCopy(obj) {
      return JSON.parse(JSON.stringify(obj));
    }
}

module.exports = UtilService;