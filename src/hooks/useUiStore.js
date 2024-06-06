import { useDispatch, useSelector } from "react-redux"
import { onOpenAnonymyModal, onCloseAnonymyModal } from "../store/ui/uiSlice";

export const useUiStore = () => {

    const dispatch = useDispatch();

    const {
        isAnonymyModalOpen
    } = useSelector( state => state.ui );

    const openAnonymyModal = () => {
        dispatch( onOpenAnonymyModal() );
    }

    const closeAnonymyModal = () => {
        dispatch( onCloseAnonymyModal() );
    }

    const toogleAnonymyModal = () => {
        (isAnonymyModalOpen)
            ? openAnonymyModal()
            : closeAnonymyModal();

    }


    return {
        // Propiedades
        isAnonymyModalOpen,

        // Metodos
        openAnonymyModal,
        closeAnonymyModal,
        toogleAnonymyModal
    }
}