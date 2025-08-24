import Fastify from "fastify";
import todoRoutes from "./routes/todo.routes.js";
import fastifyCors from "@fastify/cors";

const buildApp = () => {
  const app = Fastify();

  app.register(todoRoutes, { prefix: "api/todos" });

  app.register(fastifyCors, {
    origin: "https://test-todos.onrender.com/",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  app.setErrorHandler((error, request, reply) => {
    console.error(error);
    reply
      .status(error.statusCode ?? 500)
      .send({ message: error.message || "Internal Server Error" });
  });

  return app;
};

export default buildApp;
