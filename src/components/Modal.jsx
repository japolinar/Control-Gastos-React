import React, {useState, useEffect} from 'react'
import Mensaje from './Mensaje'
import CerrarBtn from '../img/cerrar.svg'

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar}) => {
  
  const [mensaje, setMensaje] = useState('')
  const [nombre, setNombre] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [categoria, setCategoria] = useState('')
  const [fecha, setFecha] = useState('')
  const [id, setId] = useState('')

  useEffect( ()=>{
    if(Object.keys(gastoEditar).length > 0){
      setNombre(gastoEditar.nombre)
      setCantidad(gastoEditar.cantidad)
      setCategoria(gastoEditar.categoria)
      setId(gastoEditar.id)
      setFecha(gastoEditar.fecha)
    }
  }, [])

  const ocultarModal = ()=>{
    //console.log('Ocultando')
    setAnimarModal(false)
    setGastoEditar({})

    setTimeout(() => {
      setModal(false)  
    }, 500);
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    //console.log('Has dado click')

    if([nombre, cantidad, categoria].includes('')){
      setMensaje('Todos los Campos son obligatorios')

      setTimeout(() => {
        setMensaje('')
      }, 2000);

      return
    }    

    guardarGasto({nombre, cantidad, categoria, id, fecha})

    setNombre('')
    setCantidad('')
    setCategoria('')

    //Es lo que se puede hacer tambien
    //ocultarModal()

  }

  return (
    <div className='modal'>
      <div className='cerrar-modal'>
        <img src={CerrarBtn} 
        alt="cerrar modal" 
        onClick={ocultarModal}
        />
      </div>

      <form onSubmit={handleSubmit} className={` formulario ${animarModal ? "animar" : "cerrar"} `}>
        <legend> {gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'} </legend>

        {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje> }

        <div className='campo'>
          <label htmlFor="nombre">Nombre Gasto</label>
          <input type="text" 
          className='' 
          placeholder='Añade el Nombre del Gasto' 
          id='nombre'
          value={nombre}
          onChange={(e)=>setNombre(e.target.value)}
          />  
        </div>

        <div className='campo'>
          <label htmlFor="cantidad">Cantidad</label>
          <input type="number" 
          className='' 
          placeholder='Añade la Cantidad del Gasto' 
          id='cantidad'
          value={cantidad}
          onChange={(e)=>setCantidad(Number(e.target.value))}
          />   
        </div>

        <div className='campo'>
          <label htmlFor="categoria">Categoria</label>
          <select name="" id="categoria"
          value={categoria}
          onChange={(e)=>setCategoria(e.target.value)}          
          >
            <option value="">--Selecione--</option>
            <option value="ahorro">Ahorro</option>
            <option value="casa">Casa</option>
            <option value="comida">Comida</option>            
            <option value="gasto">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>

        <input type="submit" value={gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'} />
          
      </form>
      
    </div>
  )
}

export default Modal
