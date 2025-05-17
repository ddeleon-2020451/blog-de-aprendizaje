import Post from '../post/post.model.js'
import Comment from './comment.model.js'


// AGREGAR COMENTARIO
export const addComment = async (req, res) => {
    try{
        const {author, content } = req.body
        const {postId} = req.params
        const post = await Post.findById(postId)

        if(!post){
            return res.status(404).send(
                {
                    success: false,
                    message: 'POST NOT FOUND'
                }
            )
        }
        
        const newComment = new Comment(
            {
                author,
                content,
                post: postId
            }
        )
        await newComment.save()

        post.comment.push(newComment._id)
        await post.save()

        res.status(201).send(
            {
                succes: true,
                message: 'Comment add successfully'
            }
        )

    }catch(error){
        return res.status(500).send(
            {
                success: false,
                message: 'General Error'
            }
        )
    }
}

// ELIMINAR COMENTARIO
export const deleteComment = async(req, res) => {
    try{
        const {commentId} = req.params
        const comment = await Comment.findById(commentId)

        if(!comment){
            return res.status(404).send(
                {
                    succes: false,
                    message: 'Comment not found'
                }
            )
        }
        
        await comment.remove()

        const post = await Post.findById(comment.post)
        post.comment.pull(commentId)
        await post.save()

    }catch(error){
        return res.status(500).send(
            {
                succes: false,
                meesage: 'General Error'
            }
        )
    }
}

// EDITAR COMENTARIO 
export const editComment = async (req, res)=>{
    try{
        const {commentId} = req.params
        const {content} = req.body

        const comment = await Comment.findById(commentId)
        if(!comment) {
            return res.status(404).send(
                {
                    success: false, 
                    message: 'Comment not found'
                }
            )
        }
        
        comment.content = content
        await comment.save()

        res.status(200).send(
            {
                success: true,
                message: 'Comment updated successfully',
                comment
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