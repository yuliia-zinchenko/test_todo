import {} from "../../schemas/todo.schema.js";
import { createTodoInDb } from "../../services/todos.service.js";
export const createTodo = async (req, reply) => {
    try {
        const task = await createTodoInDb(req.body);
        return reply.status(201).send(task);
    }
    catch (error) {
        console.error("Error creating todo:", error);
        return reply.status(500).send({ message: "Something went wrong" });
    }
};
//# sourceMappingURL=createTodo.controller.js.map