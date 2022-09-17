"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const util_1 = require("util");
const app = (0, express_1.default)();
const port = 3333;
const config = {
    host: '192.168.48.2',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const connection = mysql_1.default.createConnection(config);
const query = (0, util_1.promisify)(connection.query).bind(connection);
function boot() {
    return __awaiter(this, void 0, void 0, function* () {
        yield query(`CREATE TABLE people (
    id int NOT NULL AUTO_INCREMENT, 
    name varchar(255) NOT NULL ,
    PRIMARY KEY (id)
  );`);
    });
}
boot();
// const insertInPeopleSQL = `INSERT INTO people(name) values('Wesley')`
// connection.query(insertInPeopleSQL)
// connection.end()
app.get('/', (req, res) => {
    res.send('<h1>Full Cycle</h1>');
});
app.listen(port, () => {
    console.log('Rodando na porta ' + port);
});
