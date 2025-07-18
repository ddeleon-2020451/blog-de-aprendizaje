import {Schema, model } from 'mongoose'

const postSchema = Schema (
    {
        title: {
            type: String,
            required: [true, 'The title is required'],
            maxlength: [50, 'The title can not be overcome 50 characters']
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

         comments: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
            }
        ],

        date: {
            type: Date,
            default: Date.now,
        }
  },
)

export default model ("Post", postSchema)