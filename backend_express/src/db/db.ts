const snowflake = require('snowflake-sdk');
require('dotenv').config()

// Connection data object that can be used later to create connections
// Values for these fields are sourced from the .env file
const connectionData = {
    account: process.env.ACCOUNT,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    application: process.env.APPLICATION,
    warehouse: process.env.WAREHOUSE,
    database: process.env.DATABASE,
    schema: process.env.SCHEMA
};

// Improvement would be to program reconnection logic if connection fails
function connectToDb() {
    return new Promise((resolve, reject) => {
        try {
            const connection = snowflake.createConnection(connectionData);
            connection.connect(
                function(err: Error, conn: any) {
                    if (err) {
                        console.error(`Unable to connect: ${err.message}`);
                        reject(err);
                    } else {
                        // can use await connection.isValidAsync(); to check whether the connection is valid / ready for queries
                        let connection_ID = conn.getId();
                        console.log(`Successfully connected to Snowflake with connection Id: ${connection_ID}`);
                        resolve(connection);
                    }
                }
            );
        } catch (err) {
            reject(err)
        }
    });
}

// Wrapped in promise to allow it to return the data and use it outside of the promise
export function dbQuery(queryText: string) {
    return new Promise(async (resolve, reject) => {
        try {
            const connection: any = await connectToDb();
            const statement = connection.execute({
                sqlText: queryText,
                complete: async (err: Error, stmt: any, rows: any) => {
                    if (err) {
                        console.error(`Unable to execute SQL Query: ${err.message}`)
                        reject(err);
                    } else {
                        console.log('Successfully executed SQL Statement: ', stmt.getSqlText());
                        resolve(rows);
                        await disconnectFromDb(connection);
                    }
                }
            });
        } catch (err) {
            reject(err);
        }
    });
}

function disconnectFromDb(connection: any) {
    return new Promise((resolve, reject) => {
        try {
            connection.destroy(
                function(err: Error, conn: any) {
                    if (err) {
                        console.error('Unable to disconnect: ' + err.message);
                        reject(err);
                    } else {
                        console.log('Disconnected connection with id: ' + conn.getId());
                        resolve(conn.getId());
                    }
                }
            );
        } catch (err) {
            reject(err)
        }
    });
}
