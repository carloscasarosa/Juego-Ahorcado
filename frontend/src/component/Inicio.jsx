import React, { useState } from 'react'
import {Form, Button} from 'react-bootstrap'

export default function Inicio() {
  const [principal, setPrincipal]=useState(true)

    
  return (
    <div className='inicio'>
        <h1 className='ingreso'>Bienvenido</h1>
        <Form>
            <h3 style={{color:'red'}} className='mt-3'>Ingrese su nombre</h3>
            <input
              type='nombre'
              className='my-3'
            />
            <Button variant='success' className='mx-3' 
             onClick={()=> setPrincipal(false)}
            > Ingresar</Button>
        </Form>
    </div>
  )
}
