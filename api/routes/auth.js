const router  = require('express').Router();
const passport = require('passport');

router.get('/google',
  passport.authenticate("google",
    {
      scope:["profile"]
  })
);

router.get('/logon/failed', (res,req)=>{
  res.statusCode(401)
     .json({
      succes:false,
      message:"error en al loguearse, favor de revisar",
     });
});

router.get('/login/succes', (res,req)=>{
  if(req.user){
    res.statusCode(200)
       .json({
        succes:true,
        message:"Entró correctamente",
        user:req.user,
        cookies: req.cookies,
        // jwt:  req.jwt
       })
       .redirect("http://localhost:3000/profile");
       console.log("Entró bien");
  }
});

router.get('/logout', (req, res)=>{
  req.logout();
  res.redirect("http:localhost:3000/")
});

router.get('/google/callback',
  passport.authenticate("google",
    {
      successRedirect: "http://localhost:3000/",
      failureRedirect: "/login/failed",
  })
);

module.exports = router;