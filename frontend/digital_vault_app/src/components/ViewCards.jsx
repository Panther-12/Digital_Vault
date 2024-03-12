import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal'; // Import your modal component

const ViewCards = () => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch cards by user ID from the backend
    const fetchCardsByUser = async () => {
      try {
        const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
        const response = await axios.get('http://localhost:3000/api/cards', {
            headers: {
              'Authorization': `${token}`
            }
          }); // Assuming this endpoint retrieves cards by user ID
        setCards(response.data.cards);
      } catch (error) {
        console.error('Error fetching cards by user:', error);
      }
    };

    fetchCardsByUser();
  }, []);

  const handleViewCard = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  }

  const handleDeleteCard = async (id) => {
    try {
      // Send a request to delete the card by its ID
      const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
      await axios.delete(`http://localhost:3000/api/cards/${id}`, {
        headers: {
          'Authorization': `${token}`
        }
      });
      // Remove the deleted card from the state
      setCards(cards.filter(card => card._id !== id));
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h3 className="text-lg font-semibold mb-4">Cards By User</h3>
      <table className="w-full">
        <thead>
          <tr>
            <th className="border-b border-gray-200">Name</th>
            <th className="border-b border-gray-200">Type</th>
            <th className="border-b border-gray-200">Account no</th>
            <th className="border-b border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cards.map(card => (
            <tr key={card._id} className="hover:bg-gray-100">
              <td className="py-2 border-b border-gray-200">{card.name}</td>
              <td className="py-2 border-b border-gray-200">{card.type}</td>
              <td className="py-2 border-b border-gray-200">{card.number}</td>
              <td className="py-2 border-b border-gray-200">
                {/* Add an icon that redirects to ViewCard component */}
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md" onClick={() => handleViewCard(card)}>View</button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md ml-1" onClick={() => handleDeleteCard(card._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && <Modal card={selectedCard} closeModal={closeModal} />}
    </div>
  );
}

export default ViewCards;
