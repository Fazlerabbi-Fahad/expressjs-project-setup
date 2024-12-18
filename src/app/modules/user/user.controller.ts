import { UserService } from './user.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IUser } from './user.interface'
import httpStatus from 'http-status'
import { Request, Response } from 'express'

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { user } = req.body

  const result = await UserService.createUser(user)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created successfully!',
    data: result,
  })
})
export const UserController = {
  createUser,
}
