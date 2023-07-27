require('dotenv').config()
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  description: String,
  duration: Number,
  date: String,
  count: Number,
  log: [{
    description: String,
    duration: Number,
    date: String,
  }]
})

const user = mongoose.model("User", userSchema);

exports.createNewUser = (data, done) => {
  console.log(data.username)
  let newUser = new user({ username: data.username });
  try {
    newUser.save().then(saveDoc => {
      saveDoc === newUser;
    });
    return newUser;
  } catch (err) {
    return err;
  }
}

exports.updateUsers = (req) => {
  console.log(req.body);
  let date;
  if (req.body.date) {
    date = new Date(req.body.date).toDateString();
  } else {
    date = new Date().toDateString();
  }

  console.log(date);

  let query = user.findByIdAndUpdate(
    { _id: req.params.id },
    {
      description: req.body.description,
      duration: req.body.duration,
      date: date,
      $push: {
        log: {
          description: req.body.description,
          duration: req.body.duration,
          date: date
        }
      }
    }
  );
  return query;
};

exports.findById = (id) => {
  const query = user.findById(id);
  query instanceof mongoose.Query;
  return query;
}

exports.getAllUsers = () => {
  const query = user.find({})
  query instanceof mongoose.Query;
  return query
}
