import {createPortal} from "react-dom";
import {useEffect} from "react";

import "./modal.css";


export default function Modal(
    {
        children,
        open,
        handleClose,
    }
) {
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'initial';
        }
    }, [open]);

    return createPortal(
        open
            ? <div className="modal-backdrop" onClick={handleClose}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    {children}
                </div>
            </div>
            : <></>,
        document.getElementById('modal-root')
    );
}
