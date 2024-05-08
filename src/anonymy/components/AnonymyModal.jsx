import { GifBox, InsertPhoto } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { useUiStore } from '../../hooks/useUiStore';
import { useAnonymyStore } from '../../hooks/useAnonymyStore';

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

export const AnonymyModal = ({ tituloPage }) => {

  const { isAnonymyModalOpen, closeAnonymyModal } = useUiStore();
  const { activeEvent, startSavingEvent } = useAnonymyStore();
  const [formSubmitted, setFormSubmitted] = useState(false)

  const [formValues, setFormValues] = useState({
    text: '',
    image: null // Cambiado de '' a null
  });

  useEffect(() => {
    if ( activeEvent !== null) {
      setFormValues({ ...activeEvent });
    }
  
  }, [activeEvent])
  

  const onInputChanged = ({ target }) => {
    if (target.type === 'file') {
      const file = target.files[0];
      const mediaURL = URL.createObjectURL(file);
      setSelectedMedia(mediaURL);
      setFormValues({
        ...formValues,
        image: file // Guardamos el objeto de archivo directamente
      });
    } else {
      setFormValues({
        ...formValues,
        [target.name]: target.value
      });
    }
  };

  const [selectedMedia, setSelectedMedia] = useState(null);
  const fileInputRef = useRef(null);

  const onCloseModal = () => {
    closeAnonymyModal();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true)

    if (formValues.text.length <= 0) return;

    console.log(formValues);

    // TODO:
    await startSavingEvent( formValues );
    closeAnonymyModal();

  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const mediaURL = URL.createObjectURL(file);
    setSelectedMedia(mediaURL);
    setFormValues({
      ...formValues,
      image: file
    });
    console.log('Archivo seleccionado:', file);
  };

  const openFileExplorer = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  };

  let contenidoModal;
  if (tituloPage === 'GeneralPage') {
    contenidoModal = (
      <>
        <h1>¿¡Qué está pasando!? </h1>
        <hr />
        <form className="container mx-auto sm:px-4" onSubmit={onSubmit}>

          <div className="mb-4 mt-2">
            <textarea
              type="text"
              className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
              placeholder="¿Qué pasa hoy?"
              rows="5"
              name="text"
              value={formValues.text}
              onChange={onInputChanged}
            ></textarea>
            <div className='text-center'>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                ref={fileInputRef}
                name='image'
              />
              <button onClick={openFileExplorer}>
                <InsertPhoto />
              </button>
              {selectedMedia && (
                <div className="mt-4">
                  <img src={selectedMedia} alt="Multimedia seleccionado"
                    style={{
                      display: 'block',
                      maxWidth: '530px',
                      maxHeight: '300px',
                      width: '600px',
                      height: '400px',
                    }} />
                </div>
              )}
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
      isOpen={isAnonymyModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >

      {contenidoModal}
    </Modal>
  )
}
