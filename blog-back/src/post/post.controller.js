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

export const getPost = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 })

    if (!posts || posts.length === 0) {
      return res.status(404).send(
            {
                success: false,
                message: 'No se encontraron publicaciones',
            }
        )
    }

    res.status(200).send(
        { 
            success: true, 
            posts 
        }
    )
  } catch (error) {
    console.error(error) // Mostrar el error detallado en la consola para debug
    res.status(500).send(
        {
        success: false,
        message: 'Error al obtener las publicaciones',
        error: error.message, // Detalle del error
        }
    )
  }
}


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