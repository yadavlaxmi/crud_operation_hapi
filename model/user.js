

const { Model } = require('objection');

class User extends Model {
  static get tableName() {
    return 'users'; 
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username', 'email', 'name', 'state', 'number'],

      properties: {
        id: { type: 'integer' },
        username: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', format: 'email' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        state: { type: 'string', minLength: 1, maxLength: 100 },
        number: { type: 'string', minLength: 1, maxLength: 20 },
        created_at: { type: 'timestamp' },
        updated_at: { type: 'timestamp' },
      }
    };
  }
}

module.exports = User;
