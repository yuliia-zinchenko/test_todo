import { Type } from "@sinclair/typebox";
import type { Static } from "@sinclair/typebox";

export const createTodoBodySchema = Type.Object({
  title: Type.String({ minLength: 1 }),
  text: Type.Optional(Type.String()),
  priority: Type.Integer({ minimum: 1 }),
});

export const createTodoResponseSchema = Type.Object({
  id: Type.Number(),
  title: Type.String(),
  text: Type.Optional(Type.String()),
  priority: Type.Integer(),
  done: Type.Boolean(),
});

export const errorResponseSchema = Type.Object({
  message: Type.String(),
});
export const getTodosQuerySchema = Type.Object({
  page: Type.Optional(Type.String()),
  limit: Type.Optional(Type.String()),
  search: Type.Optional(Type.String()),
  status: Type.Optional(
    Type.Union([
      Type.Literal("all"),
      Type.Literal("done"),
      Type.Literal("undone"),
    ])
  ),
  sort: Type.Optional(Type.Union([Type.Literal("asc"), Type.Literal("desc")])),
});

export const UpdateTodoBodySchema = Type.Object({
  title: Type.String(),
  text: Type.Optional(Type.String()),
  priority: Type.Integer({ minimum: 1 }),
  done: Type.Optional(Type.Boolean()),
});

export const IdParamsSchema = Type.Object({
  id: Type.String({ pattern: "^\\d+$" }),
});

export const todoPaginationResponseSchema = Type.Object({
  items: Type.Array(createTodoResponseSchema),
  pagination: Type.Object({
    page: Type.Number(),
    limit: Type.Number(),
    totalPages: Type.Number(),
    hasNext: Type.Boolean(),
    hasPrev: Type.Boolean(),
  }),
});

export type UpdateTodoBody = Static<typeof UpdateTodoBodySchema>;
export type CreateTodoBody = Static<typeof createTodoBodySchema>;
export type IdParams = Static<typeof IdParamsSchema>;
export type GetTodosQuery = Static<typeof getTodosQuerySchema>;
