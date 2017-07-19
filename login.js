
var express = require('express');
var app = express();

var bodyparser = require('body-parser');
var multer = require('multer');
var form = multer();

var fs = require('fs');

app.use(express.static('www'));
app.use(bodyparser.urlencoded({extended:true}));

//注册
var infos = [];
app.post('/reg', function (req, res) {
    var name = req.body.name;
    console.log(req.body);
    var hassuer = false;
    for (var i = 0; i < infos.length; i++) {
        if (infos[i].name == name) {
            hassuer = true;
            break;
        }
    }
    if (hassuer) {
        res.send({
            result: false
        })
    } else {
        res.send({
            result: true
        })
        infos.push(req.body);
        console.log(infos);
    }

})

//登录
app.post('/log', function (req, res) {
    var name = req.body.name,
        pwd = req.body.pwd,
        existUser = 0;

    for (var i = 0; i < infos.length; i++) {
        if (name == infos[i].name) {
            existUser = i;
            if (pwd == infos[i].pwd) {
                return  res.send({
                    isTrue: 0 //用户存在，密码正确
                })
            } else {
                return  res.send({
                    isTrue: 1  //用户密码错误
                })
            }
        } else {
            return res.send({
                isTrue: 2 //用户不存在
            })
        }
    }
})

//图片保存
var storage = multer.diskStorage({
    destination:'www/img/',
    filename: function (req, file, cb) {
        cb(null,file.originalname);
    }
});

var upload = multer({storage:storage});
app.post('/self',upload.array('self',1), function (req, res) {
    var photo = req.body.self;
    res.send({
        state:true
    })
})




app.listen(9999, function () {
    console.log(' You get it !');
})