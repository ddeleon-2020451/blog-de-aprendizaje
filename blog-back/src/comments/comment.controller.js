import Post from '../post/post.model.js'
import Comment from './comment.model.js'


// AGREGAR COMENTARIO
export const addComment = async (req, res) => {
    try {
        const { author, content } = req.body;
        const { postId } = req.params;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).send({
                success: false,
                message: 'POST NOT FOUND'
            });
        }

        const newComment = new Comment({
            author,
            content,
            post: postId
        });
        await newComment.save();

        post.comments.push(newComment._id); // <-- CORREGIDO
        await post.save();

        res.status(201).send({
            success: true, // <-- CORREGIDO
            message: 'Comment add successfully'
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'General Error'
        });
    }
};
