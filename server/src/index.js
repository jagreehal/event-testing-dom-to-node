const server = require("./app");
const port = process.env.PORT || 9998;
server.listen(port, (e) => {
    console.log(`Server started on ${port}`);
});