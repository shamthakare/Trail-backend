const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const port = 15892;
const app = express();
app.use(bodyparser.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/nanoDB", (err) => {
    if (!err) {
        console.log("DB Connectio Successful...");

    } else {
        console.log("Err in connection" + err);
    }
});
const employee = mongoose.model("Employee", {
    lastname: { type: String },
    firstname: { type: String },
    mobile: { type: String },
    email: { type: String },
    address: { type: String },
    pincode: { type: String }
});

// get all data 
app.get('/', (req, res) => {
    employee.find((err, doc) => {
        if (err) {
            console.log("Err in get data" + err);
        } else {
            if (doc.length > 0) {
                res.json({ length: doc.length, data: doc });

            } else {
                res.json({ msg: "data is not avilable", data: doc });
            }
        }
    });
});
//   post all data 


app.post('/', function (req, res) {
    let neha = new employee({
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        mobile: req.body.mobile,
        email: req.body.email,
        address: req.body.address,
        pincode: req.body.pincode
    });
    console.log("objects", neha);
    neha.save((err, doc) => {
        if (err) {
            console.log("error   ", err);
        } else {
            res.send({ masseage: "data store", data: doc })
        }
    })
});
// delete all data 
app.delete('/:id', (req, res) => {
    // console.log(mongoose.isValidObjectId(req.params.id)+"which");
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        console.log("data if found ");
        employee.findByIdAndRemove(req.params.id, (err, result) => {
            err
                ? console.log("err in Delete data" + err)
                : result == null
                    ? res.send("data already deleted")
                    : res.send({ massage: "data deleted", data: result });

        });
    } else {
        return res.status(200).send("no record found with id" + req.params.id);
    }
});

// Update Data 
app.put('/:id', (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        let neha = {
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            mobile: req.body.mobile,
            email: req.body.email,
            address: req.body.address,
            pincode: req.body.pincode
        };
        employee.findOneAndUpdate(req.params.id, { $set: neha }, { new: true }, (err, result) => {
            err
                ? console.log("err in Update  data" + err)
                : res.send({ massage: "data Updated", data: result });

        });
    } else {
        return res.status(200).send("no record found with id" + req.params.id);
    }
});



// login data


app.post('/login', function (req, res) {
    let login = new employee({
        mobile: req.body.mobile,
        email: req.body.email,
    });

    employee.findOne({ email:req.body.email   },(err, user) => {
        if (err) {
            console.log("error   ", err);
        } else {
            user.
            res.send({ masseage: "data store", data: doc })
        }
    })
});





app.listen(port, () => {
    console.log(`server is running http://localhost:${port}/`);
})