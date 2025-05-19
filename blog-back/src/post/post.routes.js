import { Router } from 'express'
import {
    createPost,
    getPost,
    getPostId
} from './post.controller.js'

const api = Router ()

api.post(
    '/',
    createPost
)

api.post(
    '/get',
    getPost
)

api.get(
    '/:id',
    getPostId
)

export default api