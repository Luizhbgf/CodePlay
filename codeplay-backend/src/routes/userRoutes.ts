import { Router } from 'express'
import { getAllUsers, getUserById } from '../controllers/userController'

const userRoutes = Router()
userRoutes.get('/', getAllUsers)
userRoutes.get('/:id', getUserById)
export default userRoutes
