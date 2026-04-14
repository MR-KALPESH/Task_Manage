import mongoose from "mongoose";

const MONGO_URI =
  "mongodb+srv://mrkalpesh03:Kalpesh2004@taskcluster.joqp5tg.mongodb.net/?appName=TaskCluster";

export const ConnectDB = async () => {
  try {
    const Conn = await mongoose.connect(`${MONGO_URI}`);
    // const Conn = await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log(
      `\n MONGO DB CONNECTION SUCCESS !!  DB Host :  ${Conn.connection.host}`,
    );
  } catch (error) {
    Console.log("MONGO DB CONNECTION ERROR", error);
    process.exit(1);
  }
};
