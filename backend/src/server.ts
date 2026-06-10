import dotenv from "dotenv"
import { app } from "./app.js"

const port: number = 8080

dotenv.config()

app.listen(port, ()=> [
    console.log("Server is running on port ", port)
])