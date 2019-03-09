const db = require('../db');
class Save {
    save (){
        db.qi.save();
    }
}

module.exports = new Save();