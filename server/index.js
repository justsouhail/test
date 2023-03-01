const express = require('express');
const app = express();
const cors = require('cors');
const Usermodel = require('./models/user')

app.use(cors());
app.use(express.json());

//connection
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/ecom', { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


app.post("/adduser", async (req, res) => {
  const nom = req.body.nom;
  const email = req.body.email;
  const password =  req.body.password;
  const role = req.body.role;
  const userinstance = new Usermodel({ nom: nom,
                               email : email,
                               password : password,
                              role : role });
  console.log(userinstance.nom);
  await userinstance.save();
  res.send('data insert')
});

app.post("/loguser" ,async (req, res) => {
  const { email, password } = req.body;
  console.log( password);
  const user = await Usermodel.findOne({ email, password });
  if (user) {
    res.send({ message: 'Login successful', user });
    console.log('succes')
  } else {
    res.status(401).send({ message: 'Invalid email or password' });
  }
});


// app.get("/read", async (req, res) => {
//   try {
//     const result = await Friendmodel.find({});
//     res.send(result);
//   } catch (err) {
//     res.send(err);
//   }
// });

// app.put('/update', async (req, res) => {
//   const newAge = req.body.newAge;
//   const id = req.body.id;

//   try {
//     const friendToUpdate = await Friendmodel.findById(id);
//     friendToUpdate.age = Number(newAge);
//     await friendToUpdate.save();
//     res.send("updated");
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Error updating friend");
//   }
// });

// app.delete('/delete/:id', async (req, res) => {
//   const id = req.params.id
//   await Friendmodel.findByIdAndRemove(id).exec();
//   res.send('deleted')
// })


app.listen(3001, () => {
  console.log('connected');
})