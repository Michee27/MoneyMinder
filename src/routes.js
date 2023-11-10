const express = require("express");

const {
  registerUser,
  loginUser,
  detailUser,
  updateUser,
} = require("./controllers/user");

const {
  validateUser,
  validateName,
  validateTransaction
} = require("./middlers/validation");

const autenticarUsuario = require("./middlers/authentication");

const { listCategories } = require("./controllers/category");

const {
  registerTransactions,
  detailTransaction,
  listTransaction,
  updateTransaction,
  deleteTransaction,
  extract
} = require("./controllers/transaction");

const routes = express();

//END POINT REGISTER AND LOGIN
routes.post("/usuario", validateUser, validateName, registerUser);
routes.post("/login", validateUser, loginUser);

routes.use(autenticarUsuario);

//END POINT USER
routes.get("/usuario", detailUser);
routes.put("/usuario", validateUser, validateName, updateUser);


//END POINT TRANSACTIONS
routes.get("/transacao", listTransaction)
routes.get("/transacao/extrato", extract)
routes.get("/transacao/:id", detailTransaction)
routes.post("/transacao", validateTransaction, registerTransactions);
routes.put("/transacao/:id", validateTransaction, updateTransaction)
routes.delete("/transacao/:id", deleteTransaction)

//END POINT CATEGORIES
routes.get("/categoria", listCategories);


module.exports = routes;
