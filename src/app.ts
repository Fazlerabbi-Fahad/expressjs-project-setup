/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { UserRouter } from './app/modules/user/user.route'
import httpStatus from 'http-status'
const app: Application = express()

//#region parser
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//#endregion

//#region Application routes
app.use('/api/v1', UserRouter)
//#endregion

//#region Testing
app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  throw new Error('uUnhandled Promise Rejection')
})
//#endregion

//#region global error handler
app.use(globalErrorHandler)
//#endregion

//#region handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  })
  next()
})
//#endregion

export default app
