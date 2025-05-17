import { Router } from 'express'
import {
    addComment,
    deleteComment,
    editComment
} from './comment.controller.js'

const api = Router ()

api.post(
    '/',
    addComment
)

api.delete(
    '/delete/:id',
    deleteComment
)

api.put(
    '/update/:id',
    editComment
)

export default api