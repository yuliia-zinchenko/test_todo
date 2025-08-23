import { Type } from "@sinclair/typebox";
import { createTodoBodySchema, createTodoResponseSchema, errorResponseSchema, UpdateTodoBodySchema, IdParamsSchema, todoPaginationResponseSchema, } from "../schemas/todo.schema.js";
import { getTodos, createTodo, updateStatus, deleteTodo, } from "../controllers/todos/index.js";
async function todoRoutes(app) {
    app.get("/", {
        schema: {
            response: {
                200: todoPaginationResponseSchema,
                500: errorResponseSchema,
            },
        },
    }, getTodos);
    app.post("/", {
        schema: {
            body: createTodoBodySchema,
            response: {
                201: createTodoResponseSchema,
                400: errorResponseSchema,
                500: errorResponseSchema,
            },
        },
    }, createTodo);
    app.put("/:id", {
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
    }, updateStatus);
    app.delete("/:id", {
        schema: {
            params: IdParamsSchema,
            response: {
                204: Type.Null(),
                404: errorResponseSchema,
                500: errorResponseSchema,
            },
        },
    }, deleteTodo);
}
export default todoRoutes;
//# sourceMappingURL=todo.routes.js.map