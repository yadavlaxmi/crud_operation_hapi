module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'laxmi@123',
      database: 'hapi_crud',
    },
    migrations: {
      directory: 'migrations',
    },
    
  },
  
};
