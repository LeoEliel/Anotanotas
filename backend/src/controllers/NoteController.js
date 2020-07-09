const connection = require('../database/connection');

module.exports = {



    async indexUpdate (req, res) {

        const user_id = req.headers.authorization;
        const { id } = req.params;

        const test = await connection('notes')
        .where('id', id)
        .select('user_id')
        .first();

        if(test.user_id != user_id){
            return res.status(401).json({ error: 'Operation not permited.' })
        }

        const notes = await connection('notes')
        .where('id', id)
        .andWhere('user_id', user_id)
        .select('*');
        
        return res.json(notes);
        
    },

    async index (req, res) {

        const user_id = req.headers.authorization;

        const notes = await connection('notes')
        .where('user_id', user_id)
        .select('*');
        
        return res.json(notes);
    },

    async create(req, res){

        const user_id = req.headers.authorization;

        const {title, description} = req.body;
    
        const [id] = await connection('notes').insert({
            title,
            description,
            user_id,
        });
    
        return res.json({ id });
    },
    
    async update(req, res){
        
        const user_id = req.headers.authorization;
        const {title, description} = req.body;
        const { id } = req.params;

        const notes = await connection('notes')
        .where('id', id)
        .select('user_id')
        .first();

        if(notes.user_id != user_id){
            return res.status(401).json({ error: 'Operation not permited.' })
        }

        await connection('notes')
        .where('id', id)
        .update({
            'title': title,
            'description': description
        });
        return res.status(204).send();
    },

    async delete(req, res){

        const { id } = req.params;
        const user_id = req.headers.authorization;

        const notes = await connection('notes')
        .where('id', id)
        .select('user_id')
        .first();

        if(notes.user_id != user_id){
            return res.status(401).json({ error: 'Operation not permited.' })
        }

        await connection('notes').where('id', id).delete();
        return res.status(204).send();

    }
};