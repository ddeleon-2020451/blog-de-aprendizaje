import {Schema, model } from 'mongoose'

const commentSchema = Schema (
    {
        author: {
            type: String,
            required: [true, 'Name the author is required'],
            maxLength: [30, 'Can not be overcome 30 characters']
        },
        
        content: {
            type: String,
            required: [true, 'Content is required'],
            maxLength: [250, 'Can not be overcome 250 characters']
        },

        date: {
            type: Date,
            default: Date.now
        },

         post:          
        { 
            type: Schema.Types.ObjectId, 
            ref: 'Post', 
            required: true 
        }

    }
)

export default model ("Comment", commentSchema)