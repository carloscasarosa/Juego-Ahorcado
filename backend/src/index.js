const express = require('express');
const conection= require('./conection');
const cors= require('cors');

const app= express();   //creamos el servidor con express
app.use(cors());
app.use(express.json());


app.get('/ranking', (req,res)=>{
    const sql = `SELECT *
                FROM jugador` 

    conection.query(sql, (error, result)=>{
         if(error){
            console.log(error)
         }else{
            res.json(result)
         }
    })

});


app.patch('/puntaje/:id', (req, res)=>{
    const id= req.params.id
    const puntaje= req.body.puntajeTotal
    console.log(puntaje)
    
    const sql=`UPDATE jugador 
             SET puntaje= ?
             WHERE id_jugador= ?`
 
   conection.query(sql, [puntaje,id], (error, result)=>{
       if(error){
        console.log(error)
       }else{
        res.json(result)
       }
   } )
})

app.get('/', (req,res)=>{
    
   const sql=`SELECT *
              FROM palabras` 
  
    conection.query(sql, (err, result)=>{
        if(err){
            console.log(err)
        }else{
            res.json(result)
        }
    });

});

app.get('/:nivel', (req,res) => {
      const nivel= req.params.nivel;
      
     const sql= `SELECT *
                 FROM palabras
                 WHERE nivel=?`


     conection.query(sql,[nivel], (err, result) =>{
         if(err){
            console.log(err)
         }else{
            res.json(result)
         }
     });

});

app.post('/', (req,res)=>{
    const nombre= req.body.nombre;


    const sql= `INSERT INTO jugador (nombre, puntaje)
                VALUES (?,?)`
    
    conection.query(sql, [nombre, 0],(error, result) =>{
           if(error){
            console.log(error)
           }else{
            res.json(result);
           }
    })            
});





app.listen(8000, ()=>{
     console.log('el servidor esta escuchando correctamente')
})