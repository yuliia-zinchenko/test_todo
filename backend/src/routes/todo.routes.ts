import type { FastifyInstance } from "fastify";
import { Type } from "@sinclair/typebox";
import {
  createTodoBodySchema,
  createTodoResponseSchema,
  errorResponseSchema,
  UpdateTodoBodySchema,
  IdParamsSchema,
  todoPaginationResponseSchema,
  type CreateTodoBody,
  type UpdateTodoBody,
} from "../schemas/todo.schema.js";
import {
  getTodos,
  createTodo,
  updateStatus,
  deleteTodo,
} from "../controllers/todos/index.js";

async function todoRoutes(app: FastifyInstance) {
  app.get(
    "/",
    {
      schema: {
        response: {
          200: todoPaginationResponseSchema,
          500: errorResponseSchema,
        },
      },
    },
    getTodos
  );
  app.post<{ Body: CreateTodoBody }>(
    "/",
    {
      schema: {
        body: createTodoBodySchema,
        response: {
          201: createTodoResponseSchema,
          400: errorResponseSchema,
          500: errorResponseSchema,
        },
      },
    },
    createTodo
  );
  app.put<{ Params: { id: string }; Body: UpdateTodoBody }>(
    "/:id",
    {
      schema: {
        params: IdParamsSchema,
        body: UpdateTodoBodySchema,
        response: {
          200: createTodoResponseSchema,
          400: errorResponseSchema,
          404: errorResponseSchema,
          500: errorResponseSchema,
        },
      },
    },
    updateStatus
  );

  app.delete<{ Params: { id: string } }>(
    "/:id",
    {
      schema: {
        params: IdParamsSchema,
        response: {
          204: Type.Null(),
          404: errorResponseSchema,
          500: errorResponseSchema,
        },
      },
    },
    deleteTodo
  );
}

export default todoRoutes;
