
const { Model } = require('objection');

class User extends Model {
  static get tableName() {
    return 'users'; 
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'name', 'state', 'phone_number'],

      properties: {
        id: { type: 'integer' },
        email: { type: 'string', format: 'email' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        state: { type: 'string', minLength: 1, maxLength: 100 },
        phone_number: { type: 'integer' }, 
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
      }
    };
  }
}

module.exports = User;
