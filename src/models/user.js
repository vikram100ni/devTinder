import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email id: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value){
        if(!validator.isStrongPassword(value)){
          throw new Error("enter strong password");
        }
      }
    },
    age: {
      type: Number,
      required:true,
      min: 18,
    },
    gender: {
      required:true,
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQApgMBIgACEQEDEQH/xAAbAAEBAAMBAQEAAAAAAAAAAAAABQMEBgIBB//EADgQAAEDAQQGBwcDBQAAAAAAAAABAgMEBREhoRIVMUFRUzJSYXGBscETFCIjQpHwQ3LRMzRic4L/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8A/WwAVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABo1lpxU6qxnzHpuRcE8SZLadVIt+mjE4NaB0K4bcAcylbVIt6VEieJnitWpZ01bIn+SY/cYL4NSjr4aq5EvY/qu39xtgAAAAAAAAAAAAAAAAAAB8JNq16oq08Dv3uTyQ36+o92pXyJ0tje85m9VxVVVV23lhQABAAAfb1Rb0W5b77y5ZdetQixSrfImxesn8kI9xSOikbIxbnNW9AOrB4hkSaJkjdjkvPZFAAAAAAAAAAAAAAAAR7efjDH2K70JJRtz+7Z/rTzUnFiAAAAAAAALthv0qVzOo/z/FKJJsHozf8+pWJVAAAAAAAAAAAAAAAASLej/oypsxb6oSDp62n95pnRp0tre85lUVFVF2oWI+AAAAAAB7ijdNI2NiXuctwFqxI1ZSOcv1uVU7kwKJ4hjbFEyNvRalyHsigAAAAAAAAAAAAAAABKtWz1kd7eBPi+pib+1CqAOR/FB0NXZ0NSqvRPZv6zd/ehNksmqbfoI2ROxbvMo0AbWrqy+73d/3Qzw2RUOX5ipGm/eoRPRqqqNRFVVwuQvWZQpTN9pInzXZIZqShhpU+Bqq/rO2myTVAAAAAAAAAAAAAAAAAa9XWRUrfjW9yp8LW7VIdVXzVODnK1nUauHjxAsT2jTQ4aem7gzE0JbZldhFE1qcXYqTAVGzJX1Um2Z6ftw8jE6aV3Sleve5TGAPWm7rO+57bUTN6M0idz1MQA22WlVM/VVycHJebcVtO/WiS7ixfQkgDpqatp6jCKRNLqrgpsHJG9SWnLAqNlVZGbMVxTxJir4MVPPFUR6cLtJN/YZQAAAAAAAABpWjXJSs0W3LK5ME4dpsVMzaeB8rvpTZxXcczLI6aR0ki3ucuIHx73SPV73K5y7VXaeQCoAAAAAAAAAAAAAM1PUSU8iPjdcu9Ny950NJUsqokkZhxbvapzBsUNS6lnR+OiuD04oMV0wPiKjkRUxRcb+J9IAAAAACPbsy6UcKLgiaTvT1JJarrOlqalZGyMRFRERFvMGpZubHmUTAU9Szc2PMalm5seYRMBT1LNzY8xqWbmx5gTAU9Szc2PMalm5seYEwFPUs3NjzGpZubHmBMBT1LNzY8xqWbmx5gTAU9Szc2PMalm5seYEwFPUs3NjzGpZubHmBuWNN7SjRire6NdHw3G+aNm0clHp6b2uR111xvEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//2Q==",
    },
    about: {
      type: String,
      default: "this is the default of the user",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", userSchema);
