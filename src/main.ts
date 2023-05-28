import { env } from "./config/env";
import { logger } from "./utils/logger";
import { buildServer, gracefulShutdown } from "./utils/server";

async function main() {
	const app = await buildServer();

	await app.listen({ port: env.PORT });

	logger.debug(env, "Using env");

	logger.info(`Server is running at ${env.HOST}:${env.PORT}`);

	const terminationSignals = ["SIGINT", "SIGTERM"];

	terminationSignals.forEach(terminationSignal => {
		process.on(terminationSignal, () => {
			console.log(terminationSignal);
			gracefulShutdown({ app });
		});
	});
}

main();
