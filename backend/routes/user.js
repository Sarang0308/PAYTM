const express= require("express")
const zod = require("zod");
const {User} =require("../db");
const {Account} =require("../db")
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../config");
const {authMiddleware} = require("../middleware");    
const router = express.Router();

const signupSchema = zod.object({
    username:zod.string(),
    password:zod.string(),
    firstname:zod.string(),
    lastname:zod.string()
})
const signinschema = zod.object({
    username:zod.string(),
    password:zod.string()
})
const app = express();

const updateBody = zod.object({
    password:zod.string().optional(),
    firstname:zod.string().optional(),
    lastname:zod.string().optional()
})

router.post("/signup",async (req,res)=>{
    const body = req.body;
    const {success} = signupSchema.safeParse(body);
    if(!success){
        return res.json({
            message:"email taken or incorrect input"
        })
    }
    const user =await User.findOne({
        username: req.body.username
    })

    if(user) {
        return res.json({
            message:"mail taken or wrong input"
        })
    }

    const dbuser = await User.create({
        username:req.body.username,
        password:req.body.password,
        firstname:req.body.firstname,
        lastname:req.body.lastname
    });

    const userId = dbuser._id;
    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })
    const token = jwt.sign({
        userId:dbuser._id
    },JWT_SECRET)


    res.json({
        message : "User created successfully",
        token : token
    })

})


router.post("/signin",async(req,res) => {
        const {success} = signinschema.safeParse(req.body)
        if(!success){
            
            return res.json({

                message:"Invalid Data"
            })
        }
        const user = await User.findOne({
            username : req.body.username,
            password : req.body.password
        })

        if(user){
            const token =jwt.sign(
            {userId : user._id},
            JWT_SECRET);

            res.json({
                token:token
            })

            return;
        }

        res.status(411).json({
            message:"Error while logging in"
        })
})

router.put("/",authMiddleware,async (req,res)=>{
    const {success} = updateBody.safeParse(req.body)
    if(!success){
        res.status(403).json({
            message : "Something Wrong ..."
        })
    }
    await User.updateOne({_id:req.userId},req.body) 
    
    res.json({
        message:"Updated Successfully"
    })
})

router.get("/bulk",async(req,res)=>{
    const filter =req.query.filter || "";
    const users= await User.find({
        $or:[{
            firstname:{
                "$regex": filter
            },
            lastname:{
                "$regex": filter
            }
        }]
    })
    res.json({
        user: users.map(user => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    })
})


module.exports =router;