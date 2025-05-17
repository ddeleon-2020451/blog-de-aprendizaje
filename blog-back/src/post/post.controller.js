import Post from './post.model.js'
import Comment from '../comments/comment.model.js'
import { format } from 'date-fns'

export const createPost = async (req, res)=>{
    try{
        const {tittle, content, course, category} = req.body
        const newPost = await Post.create(
            {
                tittle, 
                content,
                course,
                category
            }
        )
        await newPost.save()
        res.status(201).send(
            {
                succes: true,
                message: 'Post Created'
            }
        )
    }catch(error){
        res.status(500).send(
            {
                success: false,
                message: 'General Error',
                error
            }
        )
    }
}

/*export const getPost = async (req, res)=>{
    try{
        const { category, course } = req.body
        let filter = {}

        if (category) filter.category = category
        if (course) filter.course = course

        const postData = await Post
        .find(filter)
        .populate(

            {
                path: 'Comment',
                select: 'author content date -_id'
            }
        )
        .sort(
            {
                //ORDENAR DE FORMA DESCENDENTE
                date: -1
            }
        )
        
        //MANEJAMOS EL FORMATO DE FECHA
        const post = postData.map(post =>{
            const obj = post.toObject()   
            return {
                ...obj,
                date: format(new Date(obj.date), 'yyyy-MM-dd HH:mm'),
                coment: (obj.comment || []).map(com =>
                (
                    {
                        ...com,
                        date: format(new Date(com.date), 'yyyy-MM-dd HH:mm')
                    }
                )
                )
            }
        })
        res.status(200).send(
            {
                succes: true,
                post
            }
        )
    }catch(error){
        res.status(500).send(
            {
                success: false,
                message: 'General Error',
                error: error.message
            }
        )
    }
}*/

export const getPostId = async (req, res) =>{
    try{
        const {id} = req.params
        const post = await post.findById(id).populate(
            {
                path: 'Comments',
                select: 'author content date -_id'
            }
        )

        if(!post){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Post not found'
                }
            )
        }

        const postD = {
            ...post.toObject(),
            date: format(new Date(post.date), 'yyyy-MM-dd HH:mm'),
            comment: post.comment.map(comment=>({
                    ...comment.toObject(),
                    date: format(new Date(comment.date), 'yyyy-MM-dd HH:mm')
                }
            ))
        }
        res.status(200).send(
            {
                success: true,
                message: 'Post found',
                post:postD
            }
        )
    }catch(error){
        res.status(500).send(
            {
                success: false,
                message: 'General Error'
            }
        )
    }
}