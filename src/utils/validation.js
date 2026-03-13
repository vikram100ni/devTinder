import validator from "validator";

export const validateSignUpData = (req) =>{
   const {firstName,lastName,emailId,password,age ,gender} = req.body;
   if(!firstName || !lastName) {
    throw new Error("please fill the name correctly");

   } else if(!validator.isEmail(emailId)) {
     throw new Error("email is not valid");

   } else if(!validator.isStrongPassword(password)) {
     throw new Error("please enter strong password");
   }
};



