// VALIDAR CAMPOS EN LAS RUTAS

import { body } from "express-validator"
import { validateErrorWithoutImg } from "./validate.errors.js"

export const addPostValidator = [
    body('tittle', 'Tittle is required').notEmpty(),
    body('content', 'Content is required').notEmpty(),
    body('course', 'Course is required').notEmpty().isIn(
        [
            'Tecnología',
            'Taller',
            'Práctica Supervisada'
        ]
    ).withMessage("The course is not valid"),
    body('cateogry', 'Category is required').notEmpty().isIn(
        [
            'Código',
            'Infografía',
            'Mapa Mental'
        ]
    ).withMessage("The category is not valid"),
    validateErrorWithoutImg
]