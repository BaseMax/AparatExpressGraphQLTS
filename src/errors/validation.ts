import { ValidationChain, check, validationResult } from "express-validator";

export function validationBody():ValidationChain[] {
    return [
        check('title')
            .notEmpty().withMessage('title is required')
        , 
        check('description')
            .notEmpty().withMessage('description is required')
        ,
    ]
}


function serialize(req,res):boolean{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(100)
        .send({
            message : 'validation error' , 
            success : false , 
            data : errors.array().map(err=>err.msg) 
        })

        return false 
    }

    return true ; 
}


export function validation(req,res,next){
    if(!serialize(req,res)) {
        return 
    }

    return next()
}