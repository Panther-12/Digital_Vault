

const Modal = ({ card, closeModal }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4">Card Details</h2>
        <div className="mb-4">
          <strong>Name:</strong> {card.name}
        </div>
        <div className="mb-4">
          <strong>Type:</strong> {card.type}
        </div>
        <div className="mb-4">
          <strong>Account Number:</strong> {card.number}
        </div>
        <div className="mb-4">
          <strong>Expiration Date:</strong> {card.expirationDate}
        </div>
        <button onClick={closeModal} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Close</button>
      </div>
    </div>
  );
}

export default Modal;
