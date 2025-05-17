import {Schema, model } from 'mongoose'

const postSchema = Schema (
    {
        tittle: {
            type: String,
            required: [true, 'The tittle is required'],
            maxlength: [50, 'The tittle can not be overcome 50 characters']
        },

        content: {
            type: String,
            required: [true, 'The content is required'],
            maxlength: [350, 'The title can not be overcome 350 characters']
        },

        course: {
            type: String,
            required: [true, 'The course is required'],
            enum: ['Tecnología', 'Taller', 'Práctica Supervisada'], 
        },

        category: {
            type: String,
            required: [true, 'The category is rquired'],
            enum: ['Código', 'Infografía', 'Mapa Mental']
        },

        date: {
            type: Date,
            default: Date.now,
        },

        comments: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
            }
        ],
  },
)

export default model ("Post", postSchema)