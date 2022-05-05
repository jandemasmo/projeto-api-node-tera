const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/projetoApiNode", {useNewUrlParser: true, useUnifiedTopology: true})
.then(() =>{
    console.log("Conectado ao banco de dados")
}).catch((error)=>{
    console.log(error)
})