const mongoose = require("mongoose");
const Chat = require("./models/chat.js")

main()
  .then(() => {
    console.log("connection succefull");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let chats = [
  {
    from: "Sakshi",
    to: "Rushikesh",
    msg: "How are you?",
    createdAt: new Date()
  },
  {
    from: "Rushikesh",
    to: "Sakshi",
    msg: "I'm good! What about you?",
    createdAt: new Date()
  },
  {
    from: "Sakshi",
    to: "Rushikesh",
    msg: "Doing great! Are you free this weekend?",
    createdAt: new Date()
  },
  {
    from: "Rushikesh",
    to: "Sakshi",
    msg: "Yes, let's plan something fun!",
    createdAt: new Date()
  },
  {
    from: "Amit",
    to: "Rushikesh",
    msg: "Hey bro, finished the MongoDB assignment?",
    createdAt: new Date()
  },
  {
    from: "Rushikesh",
    to: "Amit",
    msg: "Almost done! Will submit by tonight.",
    createdAt: new Date()
  },
  {
    from: "Priya",
    to: "Sakshi",
    msg: "Did you watch the new movie yet?",
    createdAt: new Date()
  }
];
 Chat.insertMany(chats);