var ruta=require ("express").Router();
var {Usuario}=require("../conexion");

ruta.get("/", (req,res)=>{
    Usuario.findAll({where:{status:1}})
    .then((usu)=>{
        console.log(usu);
        res.render("mostrar",{usuarios:usu});
        
    })
    .catch((err)=>{
        console.log("Error......................."+err);
        res.render("mostrar");
    })
});

ruta.get("/nuevoUsuario",(req,res)=>{
    res.render("nuevoUsuario");
});

ruta.post("/nuevoUsuario",(req,res)=>{
    Usuario.create(req.body)
    .then(()=>{
        res.redirect("/");
    })
    .catch((err)=>{
        console.log("Error al insertar el registro"+err);
        res.redirect("/")
    });
});

ruta.get("/modificarUsuario/:id",(req,res)=>{
    Usuario.findByPk(req.params.id)
    .then(()=>{
        res.render("modificarUsuario",{usuario})
    })
    .catch((err)=>{
        console.log("Error................"+err);
        res.redirect("/")
    })
});

ruta.get("/borradoFisicoUsuario/:id",(req,res)=>{
    Usuario.destroy({where:{id:req.params.id}})
    .then(()=>{})
    .catch((err)=>{
        console.log("Error .............. "+err);
        res.redirect("/");
    })
});

ruta.get("/borradoLogicoUsuario/:id",(req,res)=>{
    Usuario.update({status:0},{where:{id:req.params.id}})
    .then (()=>{
        res.redirect("/");
    })
    .catch((err)=>{
        console.log("Error .............. "+err);
        res.redirect("/");
    })
});

module.exports=ruta;
