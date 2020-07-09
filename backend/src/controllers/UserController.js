const generateUniqueId = require ('../utils/generateUniqueId');

const connection = require('../database/connection');



module.exports = {

    async index(request, response){ // Rota para teste apenas
        const users = await connection('users').select('*');
    
        return response.json(users);
    },

    async create(request, response){
        const {name} = request.body;
    
        const id = generateUniqueId();
        
        await connection('users').insert({
            id,
            name
        });
    
         return response.json({ id });
    }

}