/* eslint-disable react/prop-types */

function Modal({ isOpen, onClose, children, floras }) {
    if (!isOpen) return null;

    return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
        <div className="absolute w-full h-full bg-gray-800 opacity-50" onClick={onClose}></div>
        <div className="bg-white p-4 rounded shadow-lg z-10">
            <div className="bg-pink-100 flex justify-between">
                <h2 className="text-2xl font-bold">Modal Title</h2>
                <button className="" onClick={onClose}>&times;</button>
            </div>
            <div className="modal-body">{children}</div>
        </div>
    </div>
    );
}

export default Modal;