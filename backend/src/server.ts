import buildApp from "./app.js";

const start = async () => {
  const app = buildApp();
  const PORT = process.env.PORT || 5000;

  try {
    await app.listen({ port: Number(PORT), host: "0.0.0.0" });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
