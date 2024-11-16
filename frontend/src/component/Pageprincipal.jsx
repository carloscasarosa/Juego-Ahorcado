import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Alert, Modal } from 'react-bootstrap'
import axios from 'axios'
import Ranking from './Ranking';

export default function Pageprincipal() {
  const [palabra, setPalabra] = useState([]);
  const abecedario = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split("");
  const [palabraAdivinar, setPalabraAdivinar] = useState([]);
  const [letrasSeleccionadas, setLestrasSeleccionada] = useState([]);
  const [palabraOculta, setPalabraOculta] = useState('');
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [intentos, setIntentos] = useState(0);
  const [modal, setModal] = useState(false);
  const [nombre, setNombre] = useState('');
  const [puntos, setPuntos] = useState(0);
  const [puntajeTotal, setPuntajeTotal] = useState(0);

  const [ranking, setRanking] = useState([])
  const [actNombre, setActNombre] = useState(false)



  useEffect(() => {
    const fechtRanking = async () => {
      try {
        const response = await axios.get('http://localhost:8000/ranking')
        setRanking(response.data)
        ranking.sort((a, b) => b.puntaje - a.puntaje);

        console.log(response.data)
      } catch (error) {
        console.log(error)
      }

    }

    fechtRanking()

  }, [actNombre])

  useEffect(() => {
    ranking.sort((a, b) => b.puntaje - a.puntaje)

  }, [ranking])

  useEffect(() => {
    if (nombre === '') {

      setModal(true)
    }
  }, [])

  function tomarNombre(e) {
    setNombre(e.target.value)
  }


  const cerrarModal = async () => {
    setModal(false);
    if (nombre != '') {
      try {
        await axios.post('http://localhost:8000/', { nombre })
        setActNombre(true)
      } catch (error) {
        console.log(error)
      }
    }
  }



  useEffect(() => {
    const fechtpalabra = async () => {
      try {
        const response = await axios.get("http://localhost:8000/")
        setPalabra(response.data)
        //console.log(response.data);
      } catch (error) {
        console.log(error)
      }
    }
    fechtpalabra();
  }, []);

  useEffect(() => {
    if (palabra.length > 0) {
      cargarPalabra()
    }
  }, [palabra])

  function cargarPalabra() {
    if (palabra.length > 0) {
      const i = Math.floor(Math.random() * palabra.length)
      setPalabraOculta(palabra[i].nombre.toUpperCase());
      setPuntos(palabra[i].nivel);
    }
  }

  useEffect(() => {
    if (palabraOculta.length > 0) {
      setPalabraAdivinar(Array(palabraOculta.length).fill('_'))
    };
    console.log('palabra a adivinar', palabraAdivinar);      //PALABRA ADIVINAR CON "_" EN TODAS SUS LETRAS
  }, [palabraOculta]);


  const tomarLetra = (letra) => {
    if (!letrasSeleccionadas.includes(letra)) {
      setLestrasSeleccionada([...letrasSeleccionadas, letra]);

      const palabraTemporal = palabraAdivinar.map((letraActual, index) =>
        palabraOculta[index] === letra ? letra : letraActual
      )

      if (!palabraOculta.includes(letra)) {
        setIntentos(intentos + 1);
        console.log(intentos);
      }

      if (intentos < 10) {
        if (palabraTemporal.join("") === palabraOculta) {
          setPalabraAdivinar(palabraTemporal)
          setShow(true);
        } else {
          setPalabraAdivinar(palabraTemporal)
        }
      } else {
        setShowAlert(true)
      }

    }
  }


  function continuar() {
    setIntentos(0);
    setLestrasSeleccionada([]);
    setShow(false)
    setPuntajeTotal(puntos + puntajeTotal);
    console.log('puntaje parcial: ', puntajeTotal);
    cargarPalabra();
  }

  function finalizar() {
    setShowAlert(false)

    if (ranking.length > 0) {

      const user = ranking[ranking.length - 1];
      const id = user.id_jugador
      console.log('ultimo usuario', id);
      console.log(puntajeTotal);

      async function fechtPatch() {
        try {
          await axios.patch(`http://localhost:8000/puntaje/${id}`, { puntajeTotal })
          console.log('se actualizo el puntaje')
          setActNombre(false)

        } catch (error) {
          console.log(error)
        }
      }

      fechtPatch()
    }

    window.location.reload()
  }


  return (
    <Container fluid>
      <div className="full-height-container">
        <h1 className='tituloPrincipal' style={{ textShadow: '8px 5px 5px rgba(0, 0, 0, 0.5)'}}>Juego del Ahorcado</h1>

        <Modal show={modal} onHide={cerrarModal} animation={false}>
          <Modal.Header className='tituloModal' closeButton>
            <Modal.Title >Juego del Ahorcado</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Intente adivinar la mayor cantidad de palabras! exitos!!</p>
            <input
              type="text"
              placeholder='nombre:.... '
              className='modalInput'
              value={nombre}
              onChange={tomarNombre}
              required
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={cerrarModal}>
              Aceptar
            </Button>
          </Modal.Footer>
        </Modal>


        {show && (<Alert variant="success" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>FELICIDADES LO LOGRASTE</Alert.Heading>
          <p>
            Intenta continuar con otra palabra
          </p>
          <hr />
          <Button variant='info' onClick={continuar}>continuar</Button>
        </Alert>
        )
        }

        {showAlert && (<Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>FALLASTE, SUERTE EN LA PROXIMA</Alert.Heading>
          <hr />
          <div>Puntaje alacanzado: {puntajeTotal}</div>
          <hr />
          <Button variant='danger' onClick={finalizar}>Finalizar</Button>

        </Alert>
        )
        }


        <Row >
          <Col className='mt-3' xl={12} style={{ color: 'red', fontSize: '30px', letterSpacing: '0.5em' }}>
            {palabraAdivinar.join(" ")}
          </Col>
        </Row>

        <Row className='mt-5' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Col xl={6} className='my-4' >
            {abecedario.map((letra) => (
              <Button
                key={letra}
                variant={letrasSeleccionadas.includes(letra) ? 'danger' : 'info'}
                onClick={() => tomarLetra(letra)}
                style={{ border: ' 2px, solid, black', margin: '5px', width: '60px' }}
              >
                {letra}
              </Button>
            )
            )}
          </Col>
        </Row>
      </div>
      <div>
        <Ranking ranking={ranking}/>
      </div>
    </Container>
  )
}
