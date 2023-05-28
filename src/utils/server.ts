import fastify from "fastify";

export async function buildServer() {
	const app = fastify({
		logger: true,
	});

	return app;
}

export async function gracefulShutdown({ app }: { app: Awaited<ReturnType<typeof buildServer>> }) {
	await app.close();
}
