import express from "express";

import { envValidationSchema, userValidationSchema } from "./config/validate.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post("/", (req, res) => {
  const result = userValidationSchema.safeParse(req.body);

  if(!result.success){
    return res.status(400).json({
      message: "Invalid data!",
      error: result.error.issues
    });
  }

  // write business logic
  res.status(201).json({
    message: "User registered!",
    data: result.data
  })
})

const env = envValidationSchema.safeParse(process.env);
if(!env.success){
  console.error(env.error.issues);
  throw new Error(env.error.issues);
}else{
  app.listen(env.data.PORT, env.data.HOST, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`server started at http://${env.data.HOST}:${env.data.PORT}`);
    }
  });
}