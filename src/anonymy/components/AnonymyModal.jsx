import { DeleteOutline, GifBox, InsertPhoto } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { useUiStore } from '../../hooks/useUiStore';
import { useAnonymyStore } from '../../hooks/useAnonymyStore';
import { onDeleteEvent } from '../../store/anonymy/anonymySlice';


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

  const { startDeletingEvent, hasEventSelected } = useAnonymyStore();

  const [formValues, setFormValues] = useState({
    text: '',
    imageUrl: null // Cambiado de image a imageUrl
  });

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent });
    } else {
      setFormValues({
        text: '',
        imageUrl: null
      });
    }
  }, [activeEvent])

  const onInputChanged = ({ target }) => {
    if (target.type === 'file') {
      const file = target.files[0];
      const mediaURL = URL.createObjectURL(file);
      setSelectedMedia(mediaURL);
      setFormValues({
        ...formValues,
        imageUrl: mediaURL // Guardamos la URL de la imagen
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

    // Sube la imagen
    let imageUrl = null;
    if (formValues.image) {
        imageUrl = await uploadImage(formValues.image); // Sube la imagen y obtén su URL
    }

    // Llama a startSavingEvent con la URL de la imagen en lugar del objeto File
    await startSavingEvent({ ...formValues, image: imageUrl });
    setSelectedMedia(null); // Reinicia selectedMedia
    closeAnonymyModal();
};

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const mediaURL = URL.createObjectURL(file);
    setSelectedMedia(mediaURL);
    setFormValues({
      ...formValues,
      imageUrl: mediaURL // Guardamos la URL de la imagen
    });
    console.log('Archivo seleccionado:', file);
  };

  const handleDelete = () => {
      startDeletingEvent();
      closeAnonymyModal();
    
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
          </div>

          <button
            type="submit"
            className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white bg-white w-full"
          >
            <i className="far fa-save"></i>
            <span>Publicar</span>
          </button>
{/* IMAGEN
          {hasEventSelected && ( //TODO: arreglar que aparezca si lo abres o si el usuario.id = usuario.id
            <button
              type="button"
              onClick={handleDelete}
              className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline text-red-600 border-red-600 hover:bg-red-600 hover:text-white bg-white w-full mt-2"
            >
              <DeleteOutline />
              <span>Eliminar</span>
            </button>
          )} */}

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
