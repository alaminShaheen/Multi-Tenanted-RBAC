import { migrate } from "drizzle-orm/node-postgres/migrator";
import { env } from "./config/env";
import { logger } from "./utils/logger";
import { buildServer, gracefulShutdown } from "./utils/server";
import { database } from "./database";

async function main() {
	const app = await buildServer();

	await app.listen({ port: env.PORT });

	await migrate(database, { migrationsFolder: "./migrations" });

	logger.info(`Database connected`);

	const terminationSignals = ["SIGINT", "SIGTERM"];

	terminationSignals.forEach((terminationSignal) => {
		process.on(terminationSignal, () => {
			console.log(terminationSignal);
			gracefulShutdown({ app });
		});
	});
}

main();
