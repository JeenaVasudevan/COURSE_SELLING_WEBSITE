import jwt from 'jsonwebtoken';

export const authUser=(req,res,next)=>{
    try{
        const {token}=req.cookies;
        if(!token){
            return res.status(401).json({message:'User not authorized'})
        }
    console.log(req.cookies,'===cookies')
    const tokenVerified=jwt.verify(token,process.env.JWT_SECRET_KEY)
    if(!tokenVerified){
        return res.status(401).json({message:'User not authorized'})   
    }
    console.log(tokenVerified,'===tokenVerified');
    req.user=tokenVerified
    next()
    }
    catch(error){
    return res.status(401).json({message:'User authorization failed'})
    }
}