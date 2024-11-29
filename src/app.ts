import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import router from './app/modules/user/user.route'
const app: Application = express()

//#region parser
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//#endregion

//#region Application routes
app.use('/api/v1', router)
//#endregion

//#region Testing
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})
//#endregion

export default app
