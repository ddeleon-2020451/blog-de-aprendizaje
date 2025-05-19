import { Router } from 'express'
import {
    addComment
} from './comment.controller.js'

const api = Router ()

api.post(
    '/:postId',
    addComment
)

export default api