
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


var uploadRouter = require('./Upload/upload');
const app = express();
app.use(express.json());

app.use('/uploads', express.static('./public/uploads'));
app.use(express.urlencoded({ extended: false }));

require('./DB/dbmongoose');
const User = require('./model/user');
const Hire = require('./model/hire');




app.use(bodyParser.urlencoded({ extended: false }));
app.use('/upload', uploadRouter);
module.exports = app;

app.post('/Register', (req, res) => {
    console.log('ok')
    User.findOne({ username: req.body.username }).then(function (user) {
        console.log(user)
        if (user) {
            res.json("Username already exist")
        } else {
            var users = new User(req.body);
            users.save().then(function (res1) {
                res.json(res1._id)
            });
        }
    });
});



app.get('/allmechanic', (req, res, next) => {

    User.find({ 'usertype': 'Mechanic' })
        .then((user) => {
            res.json(user);
        }, (err) => next(err))
        .catch((err) => next(err));
});


app.post('/login', (req, res) => {
    console.log(req.body);

    User.findOne({ username: req.body.username, password: req.body.password }).then((user) => {
        console.log(user)
        if (user) {
            data = {
                'message': 'success',
                'usertype': user.usertype,
                'userid': user._id
            }
            res.send(data)

        } else {
            res.json(
                {
                    'message': 'Invalid',
                    'usertype': 'nothing',
                    'userid': 'nothing'
                });
        }

    }, (err) => next(err))
        .catch((err) => next(err));

});

app.post('/hiremechanic', function (req, res) {

    console.log(req.body);
    var hires = new Hire(req.body);
    hires.save().then(function () {
        res.send("Hired")
    })
});

app.post('/hiredata', function (req, res) {
    console.log(req.body);
    Hire.find({hiredetail:'Hire',mechanicid:req.body.mechanicid})
        .populate('Userid')
        .exec()
        .then(function (hire) {
            res.json(hire);
        })
})

app.put('/accepthiredata', function (req, res) {
    console.log(req.body)
    Hire.findByIdAndUpdate(req.body._id, { $set: { hiredetail: "Accept" } }, { new: true }, (err, hires) => {
        res.json("Request Accepted");
    });
})

app.put('/cancelhiredata', function (req, res) {
    console.log(req.body)
    Hire.findByIdAndDelete(req.body._id).then(function(){
        res.json("Request Delete");
    });
})
app.post('/accorcacdetail', function (req, res) {
    console.log(req.body);
    Hire.find({hiredetail:"Accept",Userid:req.body.Userid})
        .populate('mechanicid')
        .exec()
        .then(function (accorcac) {
            res.json(accorcac);
        })
})

app.put('/Completework', function (req, res) {
    console.log(req.body);
    Hire.findByIdAndUpdate(req.body._id, { $set: { hiredetail: "Complete" } }, { new: true }, () => {
        res.json("Request Complete");
    });
})
app.post('/Deletework', function (req, res) {
    Hire.findByIdAndDelete(req.body._id).then(function(){
        res.json("Request Delete");
    });
})
app.listen(9000);