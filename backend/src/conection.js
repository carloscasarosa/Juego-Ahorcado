const express = require('express');

const mysql= require('mysql2');

const conection= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'ahorcado'
});

conection.connect((error)=>{
    if(error){
        console.log(error)
    }else{
        console.log('conexión con exito')
    }
});

module.exports= conection;