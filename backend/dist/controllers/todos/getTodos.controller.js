import {} from "../../schemas/todo.schema.js";
import { getTodosFromDb } from "../../services/todos.service.js";
export const getTodos = async (req, reply) => {
    try {
        const data = await getTodosFromDb(req.query);
        return reply.send(data);
    }
    catch (error) {
        console.error("Error fetching todos:", error);
        return reply.status(500).send({ message: "Something went wrong" });
    }
};
//# sourceMappingURL=getTodos.controller.js.map