import { useState, useEffect } from 'react';
import axios from 'axios';

const CardCategories = () => {
  const [selectedType, setSelectedType] = useState('');
  const [cards, setCards] = useState([]);

  const cardTypes = [
    "Credit Card", "Debit Card", "Business Card", 
    "Student Card", "Membership Card", "Prepaid Card", 
    "Forex Card", "Commercial Credit"
  ]; // Add other card types as needed

  useEffect(() => {
    if (selectedType) {
      const fetchCardsByType = async () => {
        try {
          const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
          const response = await axios.get(`http://localhost:3000/api/cards/type/${selectedType}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setCards(response.data.cards);
        } catch (error) {
          console.error('Error fetching cards by type:', error);
        }
      };

      fetchCardsByType();
    }
  }, [selectedType]);

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h3 className="text-lg font-semibold mb-4">Cards By Type</h3>
      {/* Cards for card types */}
      <div className="flex flex-wrap justify-start gap-4">
        {cardTypes.map(type => (
          <div 
            key={type} 
            className={`p-4 rounded-md shadow-lg cursor-pointer ${selectedType === type ? 'bg-blue-100' : 'bg-gray-100'}`}
            onClick={() => handleTypeChange(type)}
          >
            <h4 className="text-center">{type}</h4>
          </div>
        ))}
      </div>

      {/* Display cards of the selected type */}
      <table className="w-full mt-4">
        <thead>
          <tr>
            <th className="border-b border-gray-200">Name</th>
            <th className="border-b border-gray-200">Number</th>
            <th className="border-b border-gray-200">Expiration Date</th>
          </tr>
        </thead>
        <tbody>
          {cards.map(card => (
            <tr key={card._id} className="hover:bg-gray-100">
              <td className="py-2 border-b border-gray-200">{card.name}</td>
              <td className="py-2 border-b border-gray-200">{card.number}</td>
              <td className="py-2 border-b border-gray-200">{card.expirationDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CardCategories;
