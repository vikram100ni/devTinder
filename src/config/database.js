import mongoose from "mongoose";

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://vikram9912:Yiron%402025@namastenode.nxmihc0.mongodb.net/devTinder",
  );
};

export default connectDb;


