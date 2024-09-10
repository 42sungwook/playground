import express, { Express, Request, Response } from 'express'
import cors from 'cors'

const app: Express = express()
const port: number = 3000

app.use(cors())
app.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello World!' })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

export default app
