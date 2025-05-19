import Post from './post.model.js'
import Comment from '../comments/comment.model.js'
import { format } from 'date-fns'

export const createPost = async (req, res)=>{
    try{
        const {title, content, course, category} = req.body
        const newPost = await Post.create(
            {
                title, 
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
    console.error(error) 
    res.status(500).send(
        {
        success: false,
        message: 'Error al obtener las publicaciones',
        error: error.message, 
        }
    )
  }
}


export const getPostId = async (req, res) => {
  try {
    const { postId } = req.params
    const post = await Post.findById(postId).populate('comments')
    if (!post) {
      return res.status(404).send({
        success: false,
        message: 'Publicación no encontrada'
      })
    }
    res.status(200).send({
      success: true,
      post
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'General Error',
      error: error.message
    })
  }
}
