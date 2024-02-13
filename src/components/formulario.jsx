
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Formulario.css'; // Importa el archivo de estilos CSS
import logo from './LogoPatrocinador.png'; // Importa la imagen del logo

const Formulario = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [imagenes, setImagenes] = useState([]);
    const [numImagenesCargadas, setNumImagenesCargadas] = useState(0);
  
    const handleImagenesChange = (event) => {
      const nuevasImagenes = Array.from(event.target.files);
      setImagenes([...imagenes, ...nuevasImagenes]);
      setNumImagenesCargadas(imagenes.length + nuevasImagenes.length);
    };
    const handleMostrarInput = () => {
        document.getElementById('cargarImagenes').click();
      };
    
    const handleEliminarImagen = (index) => {
      const nuevasImagenes = [...imagenes];
      nuevasImagenes.splice(index, 1);
      setImagenes(nuevasImagenes);
      setNumImagenesCargadas(nuevasImagenes.length);
    };
  
    const onSubmit = (data) => {
      // Aquí puedes enviar los datos a través de WhatsApp
      console.log(data);
    };

  return (
    <>
        <div className="titulo">
        <h1>
            <span style={{ color: 'green' }}>PERITA</span>
            <span style={{ color: 'yellow' }}>TU</span>
            <span style={{ color: 'blue' }}>AUTO</span>
            <span style={{ color: 'black' }}>.COM</span>
        </h1>
        </div>
        <div className="formulario-container">  
      <form className="formulario" onSubmit={handleSubmit(onSubmit)}>
        <h2>Datos Personales</h2>
        <div className="campo">
            <label>Nombre</label>
            <input
              {...register("nombre", {
                required: "Este campo es requerido",
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "Por favor ingresa solo letras"
                }
              })}
            />
            {errors.nombre && <span className="mensaje-error">{errors.nombre.message}</span>}
          </div>
          {/* Campo Teléfono */}
          <div className="campo">
            <label>Teléfono</label>
            <input
              {...register("telefono", {
                required: "Este campo es requerido",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Por favor ingresa solo números"
                }
              })}
            />
            {errors.telefono && <span className="mensaje-error">{errors.telefono.message}</span>}
          </div>
          {/* Campo Email */}
          <div className="campo">
            <label>Email</label>
            <input
              {...register("email", {
                required: "Este campo es requerido",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Por favor ingresa un email válido"
                }
              })}
            />
            {errors.email && <span className="mensaje-error">{errors.email.message}</span>}
          </div>
        <h2>Datos del Vehículo</h2>
        <div className="campo">
          <label>Marca</label>
          <input type="text" {...register("marca", { required: true })} />
          {errors.marca && <span className="error-msg">Este campo es requerido</span>}
        </div>
        <div className="campo">
          <label>Modelo</label>
          <input type="text" {...register("modelo", { required: true })} />
          {errors.modelo && <span className="error-msg">Este campo es requerido</span>}
        </div>
        <div className="campo">
          <label>Versión</label>
          <input type="text" {...register("version", { required: true })} />
          {errors.version && <span className="error-msg">Este campo es requerido</span>}
        </div>
        <div className="campo">
          <label>Año</label>
          <input type="number" {...register("ano", { required: true, min: 2010 })} />
          {errors.ano && errors.ano.type === "min" && (
            <span className="mensaje-error">El año no puede ser menor a 2010</span>
          )}
        </div>
        <div className="campo">
          <label>Kilometros</label>
          <input type="number" {...register("kilometros", { required: true, max: 200000 })} />
          {errors.kilometros && errors.kilometros.type === "max" && (
            <span className="mensaje-error">La cantidad de kilómetros no puede superar los 200,000</span>
          )}
        </div>
        <div className="campo">
          <label>Estado general</label>
          <select {...register("estado", { required: true })}>
            <option value="">Selecciona una opción</option>
            <option value="Como nuevo">Como nuevo</option>
            <option value="Excelente">Excelente</option>
            <option value="Muy bueno">Muy bueno</option>
            <option value="Bueno">Bueno</option>
            <option value="Malo">Malo</option>
          </select>
          {errors.estado && <span className="mensaje-error">Este campo es requerido</span>}
        </div>
        <div className="campo">
          <label>Imágenes del vehículo</label>
          <input
            id="cargarImagenes"
            type="file"
            {...register("imagenes")}
            multiple
            accept="image/*"
            onChange={handleImagenesChange}
            style={{ display: 'none' }}
          />
          <button
            type="button"
            onClick={handleMostrarInput}
            className="cargar-imagenes"
          >
            Cargar 
          </button>
          {numImagenesCargadas > 0 && (
            <p>{numImagenesCargadas} imágenes cargadas</p>
          )}
          {imagenes.length > 0 && (
            <div className="imagenes-preview">
              {imagenes.map((imagen, index) => (
                <div key={index} className="imagen-item">
                  <img
                    src={URL.createObjectURL(imagen)}
                    alt={`Imagen ${index + 1}`}
                    className="imagen-preview"
                  />
                  <button
                    type="button"
                    onClick={() => handleEliminarImagen(index)}
                    className="eliminar-imagen"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <button type="submit">Enviar por WhatsApp</button>
      </form>
      </div>
      <div className="patrocinador">
        <p>Powered by</p>
        <img src={logo} alt="Logo del patrocinador" />
      </div>
    </>
  );
};

export default Formulario;