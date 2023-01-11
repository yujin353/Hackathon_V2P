import React, {useEffect} from "react"
import ReactDom from "react-dom"
import '../../styles/common.css'

const Modal = ( { open, children, className }) => {
    
    useEffect(() => {
        if(open)
            document.body.style.overflow = "hidden"
        else
            document.body.style.overflow = "visible"
    }, [open])

    if(!open) return null;

    return ReactDom.createPortal(
        <>
            <div className={className}>
                {children}
            </div>
        </>,
        document.getElementById('portal')
    )
}

export default Modal;