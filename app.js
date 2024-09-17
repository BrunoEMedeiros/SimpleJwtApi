import express from "express";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";

/*
    Links referencia:
    jsonwebtoken: https://www.npmjs.com/package/jsonwebtoken
    express-jwt: https://github.com/auth0/express-jwt/tree/master?tab=readme-ov-file
*/

const app = express();
app.use(express.json())
app.use(express.urlencoded({extends: true}))

app.post('/login', (req,res)=>{
   try {
        const {email, senha} = req.body;
        if(email === 'teste@gmail.com' && senha === '123')
        {
            const token = jwt.sign({ email: email }, 'super_chave', { algorithm: 'HS256' });
            return res.status(200).json(token)
        }
        else{
            return res.status(401).json('Usuario incorreto')
        }

   } catch (error) {
        return res.status(500).json({"error" : error})
   }
})

app.get('/home',
    expressjwt({ secret: 'super_chave', algorithms: ["HS256"]}),
    (req, res)=>{
        console.log(req.auth)
        if (!req.auth.email) 
            return res.status(401).json('Não autorizado');
        res.status(200).json('autorizado!');
    }
)

app.listen(3000,(req, res) =>{
    console.log({"status": "running"})
})