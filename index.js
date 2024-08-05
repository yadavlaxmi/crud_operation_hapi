const Hapi = require('@hapi/hapi');
const Joi = require('joi');
const Knex = require('knex');
const knexConfig = require('./knexfile');
const knex = Knex(knexConfig.development);

const { Model } = require('objection');
Model.knex(knex);

const User = require('./model/user');

const init = async () => {
  const server = Hapi.server({
    port: 9002,
    host: 'localhost',
  });

  const userSchema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
    email: Joi.string().email().required(),
    state: Joi.string().min(1).max(100).required(),
    phone_number: Joi.number().integer().required(),
  });

  server.route({
    method: 'POST',
    path: '/user',
    options: {
      validate: {
        payload: userSchema,
      },
    },
    handler: async (request, h) => {
      try {
        const user = await User.query().insert(request.payload);
        return h.response(user).code(201);
      } catch (err) {
        console.error('Error inserting user:', err);
        return h.response({ error: 'Failed to create user' }).code(500);
      }
    },
  });

  server.route({
    method: 'GET',
    path: '/user',
    handler: async (request, h) => {
      try {
        const users = await User.query();
        return h.response(users).code(200);
      } catch (err) {
        console.error('Error retrieving users:', err);
        return h.response({ error: 'Failed to retrieve users' }).code(500);
      }
    },
  });

  server.route({
    method: 'GET',
    path: '/user/{id}',
    handler: async (request, h) => {
      try {
        const user = await User.query().findById(request.params.id);
        if (!user) {
          return h.response({ error: 'User not found' }).code(404);
        }
        return h.response(user).code(200);
      } catch (err) {
        console.error('Error retrieving user:', err);
        return h.response({ error: 'Failed to retrieve user' }).code(500);
      }
    },
  });


  server.route({
    method: 'PUT',
    path: '/users/{id}',
    options: {
      validate: {
        payload: userSchema,
      },
    },
    handler: async (request, h) => {
      try {
        const user = await User.query().patchAndFetchById(request.params.id, request.payload);
        if (!user) {
          return h.response({ error: 'User not found' }).code(404);
        }
        return h.response(user).code(200);
      } catch (err) {
        console.error('Error updating user:', err);
        return h.response({ error: 'Failed to update user' }).code(500);
      }
    },
  });

  // Delete User
  server.route({
    method: 'DELETE',
    path: '/users/{id}',
    handler: async (request, h) => {
      try {
        const rowsDeleted = await User.query().deleteById(request.params.id);
        if (!rowsDeleted) {
          return h.response({ error: 'User not found' }).code(404);
        }
        return h.response({ message: 'User deleted' }).code(200);
      } catch (err) {
        console.error('Error deleting user:', err);
        return h.response({ error: 'Failed to delete user' }).code(500);
      }
    },
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();
