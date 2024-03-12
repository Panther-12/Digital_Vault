// CardsByTypeTab.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const CardCategories = () => {
  const [selectedType, setSelectedType] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (selectedType) {
      // Fetch cards by type from the backend
      const fetchCardsByType = async () => {
        try {
          const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
          const response = await axios.get(`http://localhost:3000/api/cards/type/${selectedType}`, {
            headers: {
              'Authorization': `${token}`
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
      {/* Radio buttons for card types */}
      <div className="flex flex-row space-x-2">
        <input
          type="radio"
          id="creditCard"
          value="Credit Card"
          checked={selectedType === 'Credit Card'}
          onChange={() => handleTypeChange('Credit Card')}
          className="mr-2"
        />
        <label htmlFor="creditCard">Credit Card</label>
        <input
          type="radio"
          id="debitCard"
          value="Debit Card"
          checked={selectedType === 'Debit Card'}
          onChange={() => handleTypeChange('Debit Card')}
          className="mr-2"
        />
        <label htmlFor="debitCard">Debit Card</label>
        <input
          type="radio"
          id="businessCard"
          value="Business Card"
          checked={selectedType === 'Business Card'}
          onChange={() => handleTypeChange('Business Card')}
          className="mr-2"
        />
        <label htmlFor="businessCard">Business Card</label>
        <input
          type="radio"
          id="studentCard"
          value="Student Card"
          checked={selectedType === 'Student Card'}
          onChange={() => handleTypeChange('Student Card')}
          className="mr-2"
        />
        <label htmlFor="studentCard">Student Card</label>
        <input
          type="radio"
          id="membership Card"
          value="Membership Card"
          checked={selectedType === 'Membership Card'}
          onChange={() => handleTypeChange('Membership Card')}
          className="mr-2"
        />
        <label htmlFor="membershipCard">Membership Card</label>
        <input
          type="radio"
          id="prepaidCard"
          value="Prepaid Card"
          checked={selectedType === 'Prepaid Card'}
          onChange={() => handleTypeChange('Prepaid Card')}
          className="mr-2"
        />
        <label htmlFor="prepaidCard">Prepaid Card</label>
        <input
          type="radio"
          id="forexCard"
          value="Forex Card"
          checked={selectedType === 'Forex Card'}
          onChange={() => handleTypeChange('Forex Card')}
          className="mr-2"
        />
        <label htmlFor="forexCard">Forex Card</label>
        <input
          type="radio"
          id="commercialCredit"
          value="Commercial Credit"
          checked={selectedType === 'Commercial Credit'}
          onChange={() => handleTypeChange('Commercial Credit')}
          className="mr-2"
        />
        <label htmlFor="commercialCredit">Commercial Credit</label>
        {/* Add radio buttons for other card types similarly */}
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
