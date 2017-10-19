var router = require('/lib/router')();  //imports routing cap. so that we can have multiple pages
var http = require('/lib/http');    //http
var core = require('/lib/core');
var thymeleaf = require('/lib/thymeleaf');


var database = require('/lib/orientdb');
database.config("localhost", "root", "toor");

var aktivJS_lib = require('/lib/aktiv');
var aktivJS = new aktivJS_lib.AktivJS("http://localhost:8080/HCR/");
aktivJS.makeHCR("litatestkey", '<p style="color:#0094ff; width:100%; text-align:center; margin-bottom:10px;">AktivJS Demo</p>');


// Handle get request.
exports.get = function(req) {
  return router.dispatch(req);
};


/*
* Route for index
*/
router.get('/', function(req) {
  var sessiondata = JSON.parse(database.query("discordweb", ("select * from Sessions where suuid = '" + req.cookies.SUUID + "'")));
  var userdata;
  if(sessiondata.length > 0){
    //We found a session for the user:
    userdata = JSON.parse(database.query("discordweb", ("select * from Users where uid = " + sessiondata[0].forUID)));

    var userModel = {
        user: {
            name: userdata[0].username,
            userid: userdata[0].uid
        },

        actiontext: [
            {
                text: "LOG OUT",
                link: "https://www.google.com/"
            }
        ]
      };
      return {
        body: thymeleaf.render(resolve('/weblet/index.html'), userModel),
        contentType : "text/html",
        cookies : {"SUUID":"test"}
      };
  } else {
    return{
        body: "setkey",
        cookies : {"SUUID":"test"}
    };
  }



  /*return{
    body: userdata
  };*/
});

router.get('/login', function(req) {
  return {
    body: thymeleaf.render(resolve('/weblet/login.html'), {}),
    contentType : "text/html"
  };
});


router.get('/aktivJS/demo', function(req) {
  return {
    body: core.loadResource(resolve('/weblet/aktivjs.html')),
    contentType : "text/html"
  };
});

router.get('/HCR/{id}', function(req) {
  var objID = req.pathParams.id;
  return {
    body: aktivJS.getHCR(objID),
    contentType : "application/javascript"
  };
});

router.get('/msg/{id}/{msg}', function(req) {
  var oldVal = aktivJS.getHCR(req.pathParams.id);
  aktivJS.editHCR(req.pathParams.id, oldVal + '</br><cus style="color:red; margin-left:10px;">SOMEONE SAID: </cus>' + req.pathParams.msg);
  return {
      body: core.loadResource(resolve('/weblet/aktivjs.html')),
      contentType : "text/html"
  };
});


/*
* Route for /scripts
*/
router.get('/scripts/{path:.+}', function(req) {
  var contentaddr = req.pathParams.path;
  return {
    body: core.loadResource(resolve('/weblet/scripts/' + contentaddr)),
    contentType : "application/javascript"
  };
});

/*
* Route for /css
*/
router.get('/css/{path:.+}', function(req) {
  var contentaddr = req.pathParams.path;
  return {
    body: core.loadResource(resolve('/weblet/css/' + contentaddr)),
    contentType : "text/html"
  };
});

/*
* Route for /images
*/
router.get('/images/{path:.+}', function(req) {
  var contentaddr = req.pathParams.path;
  return {
    body: core.loadResource(resolve('/weblet/images/' + contentaddr)),
    contentType : "image/jpg"
  };
});

/*
* Route for /
*/
router.get('/{path:.+}', function(req) {
  var contentaddr = req.pathParams.path;
  return {
    body: "UNRECONGNISED DESTINATION",
    contentType : "text/html"
  };
});