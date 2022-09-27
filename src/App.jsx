import { useState, useEffect } from 'react'
import Filtros from './components/Filtros'
import Header from './components/Header'
import ListarGastos from './components/ListarGastos'
import Modal from './components/Modal'
import { generarID } from './helpers/index'
import IconoNuevoGasto from './img/nuevo-gasto.svg'


function App() {  

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] =useState(false)
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )
  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])


  useEffect( ()=>{
    if(Object.keys(gastoEditar).length > 0){
      setModal(true)    

      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
    }
  },[gastoEditar])

  useEffect( ()=>{
    localStorage.setItem('presupuesto', presupuesto) ?? 0
  }, [presupuesto])

  useEffect( ()=>{
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
    if(presupuestoLS > 0){
      setIsValidPresupuesto(true)
    }
  }, [])

  useEffect( ()=>{
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])

  useEffect( ()=>{
    if(filtro){
      //Filtrar gastos por categoria
      const gastosFiltrado = gastos.filter((gasto)=> gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrado)
    }    
  }, [filtro])

  const handleNuevoGasto = ()=>{
    //console.log('Has dado Click')
    setModal(true)
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true)
    }, 500);

  }

  const guardarGasto = (gasto)=>{

    if(gasto.id){
      //Actualizar
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)

      setGastos(gastosActualizados)
      setGastoEditar({})
      
    }else{
      //Nuevo registro
      gasto.id = generarID()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }
    //para cerrar el Modal 
    setAnimarModal(false)

    setTimeout(() => {
      setModal(false)  
    }, 500);
  }

  const eliminarGasto = (id)=>{
    const gastosActualizados = gastos.filter((gasto) => gasto.id !== id)
    //console.log('Eliminando', id)
    //console.log(gastosActualizados)
    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header      
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos={gastos}
        setGastos={setGastos}
      ></Header>     

      {isValidPresupuesto && (
        <div>
          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            ></Filtros>
            <ListarGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            ></ListarGastos>
          </main>
          <div className='nuevo-gasto'>
            <img src={IconoNuevoGasto} 
            alt="IconoNuevoGasto" 
            onClick={handleNuevoGasto}
          />
          </div>
        </div>
      )}

      {modal && 
      <Modal 
        setModal={setModal} 
        animarModal={animarModal}
        setAnimarModal={setAnimarModal}
        guardarGasto={guardarGasto}
        gastoEditar={gastoEditar}
        setGastoEditar={setGastoEditar}
      ></Modal> }

    </div>
  )
}

export default App
