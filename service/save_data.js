const model = require('../model/qi');
class Save {
    constructor(){
    }
    async save (data){
        const qi = new model(data)
        const result = await qi.save();
        console.log (result, 'result is hrere');
        return result;
    }
}

module.exports = new Save();