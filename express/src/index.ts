import express from 'express'
import mysql from 'mysql'
import { promisify } from 'util'

const app = express()

const port = 3333

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}

const connection = mysql.createConnection(config)

const query = promisify(connection.query).bind(connection)

let name = ''

async function boot() {
  try {
    await query(`CREATE TABLE people (
      id int NOT NULL AUTO_INCREMENT, 
      name varchar(255) NOT NULL ,
      PRIMARY KEY (id)
    );`)

    await query(`INSERT INTO people(name) values('Guilherme')`)

    const people: any = await query(
      `SELECT p.name FROM people p WHERE p.name = 'Guilherme'`
    )

    name = people[0].name
  } catch {
    await query(`INSERT INTO people(name) values('Guilherme')`)

    const people: any = await query(
      `SELECT p.name FROM people p WHERE p.name = 'Guilherme'`
    )

    name = people[0].name
  }
}

boot()

app.get('/', (req, res) => {
  res.send(`
    </p>



    <p>Full Cycle Rocks!</p>
    
    
    
    <p> 

    </p>



    <p>Lista de nomes cadastrada no banco de dados:</p>

      - ${name}

    <p> 
  
  `)
})

app.listen(port, () => {
  console.log('Rodando na porta ' + port)
})
