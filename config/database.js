import { Pool } from "pg";

const connection = new Pool({
 user: 'postgres',
 host: 'localhost',
 database: 'questioner',
 password: 'test123',
 port: 5432,
});


export default connection;
