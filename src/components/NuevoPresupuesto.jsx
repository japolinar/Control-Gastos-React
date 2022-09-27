import {useState} from 'react'
import Mensaje from './Mensaje'


const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

    const [mensaje, setMensaje] = useState('')

    const handlePresupuesto = (e)=>{
        e.preventDefault()
        //console.log('Enciando formulario')
        //console.log(Number(presupuesto))
        if(!Number(presupuesto) || Number(presupuesto) < 0){
            setMensaje('No es un presupuesto Valido')

            return
        }

        setMensaje('')
        setIsValidPresupuesto(true)
      
        //console.log(presupuesto)       

    }

    return (
        <div className='contenedor-presupuesto contenedor sombra'>
            
            <form onSubmit={handlePresupuesto} className='formulario'>
                <div className='campo'>
                    <label htmlFor="" className=''>Definir Presupuesto</label>
                    <input type="number" 
                    className='nuevo-presupuesto'
                    placeholder='Añade tu Presupuesto'
                    value={presupuesto}  
                    onChange={ (e)=> setPresupuesto(Number(e.target.value)) }
                    />
                </div>

                <input type="submit" value="Añadir" />

                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            </form>
        
        </div>
  )
}

export default NuevoPresupuesto
