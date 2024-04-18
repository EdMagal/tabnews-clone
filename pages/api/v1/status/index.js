import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const databaseName = process.env.POSTGRES_DB;

  const databaseInfoResult = await database.query({
    text: `SELECT 
      current_setting('server_version') AS server_version,
      current_setting('max_connections') AS max_connections,
      (SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1) AS current_connections; 
    `,
    values: [databaseName],
  });
  const databaseVersionValue = databaseInfoResult.rows[0].server_version;
  const maxConnections = parseInt(databaseInfoResult.rows[0].max_connections);
  const openedConnections = databaseInfoResult.rows[0].current_connections;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: maxConnections,
        current_connections: openedConnections,
      },
    },
  });
}

export default status;
