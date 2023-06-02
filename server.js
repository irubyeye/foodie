const dotenv = require(`dotenv`);
const mongoose = require("mongoose");

dotenv.config({ path: `./config.env` });

const app = require(`./app`);

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB connections succesful!");
  });

// Start Server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`We are waiting for the summer... At http://localhost:${port}`);
});
