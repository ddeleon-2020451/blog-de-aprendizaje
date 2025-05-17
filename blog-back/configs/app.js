import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import postRoutes from '../src/post/post.routes.js'
import commentRoutes from '../src/comments/comment.routes.js'

const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
}

const routes = (app)=>{
    app.use('/v1/post', postRoutes)
    app.use('/v1/comment', commentRoutes)
}

export const initServer = async()=>{
    const app = express()
    try{
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    }catch(error){
        console.error('Server init failed', error)
    }
}