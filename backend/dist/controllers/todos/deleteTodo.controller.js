import { deleteTodoInDb } from "../../services/todos.service.js";
export const deleteTodo = async (req, reply) => {
    const { id } = req.params;
    try {
        await deleteTodoInDb(Number(id));
        return reply.status(200).send({ message: "Task deleted successfully" });
    }
    catch (error) {
        return reply.status(404).send({ message: "Task not found" });
    }
};
//# sourceMappingURL=deleteTodo.controller.js.map