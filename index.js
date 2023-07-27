const express = require('express')
const User = require('../boilerplate-project-exercisetracker/user')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post('/api/users', async (req, res) => {
  const data = req.body;
  if (!data.username)
    return res.json({
      message: "Empty username"
    });
  let user = await User.createNewUser(data);
  return res.json(
    {
      username: user.username,
      _id: user._id
    }
  ) 
})



app.post('/api/users/:id/exercises', async (req, res) => {
  console.log(req.params);
  updatedUser = await User.updateUsers(req);
  if(!updatedUser){
    return res.json({
      message: "Deu Ruim"
    })
  }

  return res.json({
    _id: updatedUser._id,
    username: updatedUser.username,
    date: updatedUser.date,
    duration: updatedUser.duration,
    description: updatedUser.description
  });
})

app.get('/api/users', async (req, res) =>{ 
  let allUsers = await User.getAllUsers();
  return res.json(allUsers);
})


app.get('/api/users/:_id/logs', async (req, res) => {
  
  let user = await User.findById(req.params._id);
  return res.json({
    _id: user._id,
    username: user.username,
    count: logArr.length,
    log: logArr
  })
}
)

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
