import buildApp from "./app.js";
const start = async () => {
    const app = buildApp();
    try {
        await app.listen({ port: 5000 });
        console.log("server is running on http://localhost:5000 ");
    }
    catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=server.js.map