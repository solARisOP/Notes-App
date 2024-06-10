import React, { useRef, useEffect } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onclose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-75" onClick={onClose}></div>
            <div
                ref={modalRef}
                className="bg-white px-12 w-full max-w-lg py-2 rounded shadow-lg z-10 relative"
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;
