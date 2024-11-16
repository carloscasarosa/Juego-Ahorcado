import React from 'react'
import {Row, Col, Table} from 'react-bootstrap'

export default function Ranking({ranking}) {
  
  return (
    <>
          <Row className='my-5' style={{ display: 'flex', justifyContent: 'center' }}>
            <Col xl={12} className='my-4' >
              <h1 style={{ color: 'rgb(64, 64, 233)', textShadow: '8px 5px 5px rgba(0, 0, 0, 0.5)' }}>Ranking de Jugadores</h1>
            </Col>
            <Col xl={6} className='my-4' >
              <Table striped bordered hover variant='dark'>
                <thead>
                  <tr >
                    <th style={{ width: '2%' }}>Posición</th>
                    <th style={{ width: '10%' }}>Jugador</th>
                    <th style={{ width: '5%' }}>Puntaje</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    ranking.map((juagador, index) =>
                      <tr key={index}>
                        <td>{index}</td>
                        <td>{juagador.nombre}</td>
                        <td>{juagador.puntaje}</td>
                      </tr>
                    )}
                </tbody>
              </Table>
            </Col>
          </Row>
      </>
  )
}
