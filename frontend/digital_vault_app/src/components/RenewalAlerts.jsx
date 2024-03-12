import { useState, useEffect } from 'react';
import axios from 'axios';

const RenewalAlerts = () => {
  const [cardsWithAlerts, setCardsWithAlerts] = useState([]);

  useEffect(() => {
    // Fetch cards with renewal alerts from the backend
    const fetchRenewalAlerts = async () => {
      try {
        const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
        const response = await axios.get('http://localhost:3000/api/cards/renewal', {
          headers: {
            'Authorization': `${token}`
          }
        }); // Assuming this endpoint retrieves cards with renewal alerts
        setCardsWithAlerts(response.data.cards);
      } catch (error) {
        console.error('Error fetching renewal alerts:', error);
      }
    };

    fetchRenewalAlerts();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h3 className="text-lg font-semibold mb-4">Renewal Alerts</h3>
      <table className="w-full">
        <thead>
          <tr>
            <th className="border-b border-gray-200">Name</th>
            <th className="border-b border-gray-200">Type</th>
            <th className="border-b border-gray-200">Account no</th>
            <th className="border-b border-gray-200">Expiration Date</th>
          </tr>
        </thead>
        <tbody>
          {cardsWithAlerts.map(card => (
            <tr key={card._id} className="hover:bg-gray-100">
              <td className="py-2 border-b border-gray-200">{card.name}</td>
              <td className="py-2 border-b border-gray-200">{card.type}</td>
              <td className="py-2 border-b border-gray-200">{card.number}</td>
              <td className="py-2 border-b border-gray-200">{card.expirationDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RenewalAlerts;
