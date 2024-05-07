import { GifBox, InsertPhoto } from '@mui/icons-material';
import { useRef, useState } from 'react';
import Modal from 'react-modal';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(20%)', // Corrige el centrado vertical y horizontal
    width: '80%', // Ajusta el ancho del modal al 80% del viewport
    height: 'auto', // Ajusta la altura del modal al 80% del viewport
    maxWidth: '600px', // Establece un ancho máximo
    maxHeight: '800px', // Establece una altura máxima
    overflow: 'auto', // Permite hacer scroll si el contenido excede el tamaño del modal
    padding: '20px', // Ajusta el espacio interno del modal
  },
};


Modal.setAppElement('#root');


export const AnonymyModal = ( {tituloPage} ) => {

  const [isOpen, setIsOpen] = useState(true)

  const [formValues, setFormValues] = useState({
    text: 'Joel',
    image: ''
  })

  const onInputChanged = ( {target} ) => {
    if (target.type === 'file') {
      const file = target.files[0];
      const mediaURL = URL.createObjectURL(file);
      setSelectedMedia(mediaURL);
      setFormValues({
        ...formValues,
        [target.name]: mediaURL
      });
    } else {
      setFormValues({
        ...formValues,
        [target.name]: target.value
      });
    }
  }


  const [selectedMedia, setSelectedMedia] = useState(null); // Estado para almacenar la URL de la imagen o el video
  const fileInputRef = useRef(null); // Referencia al input de archivos

  const onCloseModal = () => {
    console.log('Cerrando modal');
    setIsOpen ( false );
  }

const handleFileChange = (event) => {
  const file = event.target.files[0]; // Tomar solo el primer archivo seleccionado
  const mediaURL = URL.createObjectURL(file); // Crear la URL del archivo
  setSelectedMedia(mediaURL); // Almacenar la URL en el estado
  console.log('Archivo seleccionado:', file);
};

  const openFileExplorer = (event) => {
    event.preventDefault(); // Evitar que se envíe el formulario
    fileInputRef.current.click(); // Abre el explorador de archivos al hacer clic en el botón
  };


  // Contenido del modal dependiendo de la página
  let contenidoModal;
  if (tituloPage === 'GeneralPage') {
    contenidoModal = (
      <>
        <h1> ¿¡Qué está pasando!? </h1>
          <hr />
          <form className="container mx-auto sm:px-4">

              <div className="mb-4 mt-2">
                  <textarea 
                      type="text" 
                      className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                      placeholder="¿Qué pasa hoy?"
                      rows="5"
                      name="text"
                      value={ formValues.text }
                      onChange={ onInputChanged }
                  ></textarea>
              <div className='text-center'>
                {/* Este es el input que manejará la selección de imágenes y videos */}
                <input
                  type="file"
                  accept="image/*" // Esto permite seleccionar imágenes y videos
                  onChange={handleFileChange} // Maneja el cambio de archivo
                  style={{ display: 'none' }} // Oculta el input, pero permite clickear en el botón
                  ref={fileInputRef} // Referencia al input
                  name='image'
                  value={ formValues.image }
                />
                <button onClick={openFileExplorer}>
                  <InsertPhoto />
                </button>
                {/* Muestra la imagen seleccionado */}
                {selectedMedia && (
                <div className="mt-4">
                    <img src={selectedMedia} alt="Multimedia seleccionado" 
                      style={{
                        display: 'block',
                        maxWidth: '530px',
                        maxHeight: '300px',
                        width: '600px', // Esto ajusta automáticamente el ancho según la altura máxima
                        height: '400px', // Esto ajusta automáticamente la altura según el ancho máximo
                      }} />
                </div>
              )}
                {/* <button>
                  <GifBox />
                </button> TODO  */}
            </div>
          </div>

              <button
                  type="submit"
                  className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white bg-white w-full"
              >
                  <i className="far fa-save"></i>
                  <span>Publicar</span>
              </button>

          </form>
      </>
    );
  } else if (tituloPage === 'MusicPage') {
    contenidoModal = (
      <>
        <h1>Nuevo evento de música</h1>
        {/* Agrega el resto del contenido específico para MusicPage */}
      </>
    );
  }

  return (
    <Modal
        isOpen={ isOpen }
        onRequestClose={ onCloseModal}
        style={customStyles}
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={ 200 }
        >

          { contenidoModal }
    </Modal>
  )
}
