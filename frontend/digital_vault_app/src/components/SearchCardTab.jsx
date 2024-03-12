import  { useState } from "react";

import axios from "axios";

const SearchCardTab = () => {
  const [query, setQuery] = useState("");
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
      const response = await axios.get(`http://localhost:3000/api/cards/search/${query}`, {
        headers: {
          'Authorization': `${token}`
        }
      });
      setCards(response.data.cards);
      setError(null);
    } catch (error) {
      setCards([]);
      setError("Error searching for cards. Please try again.");
      console.error("Error searching for cards:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Search Card</h2>
      <form onSubmit={handleSubmit} className="flex mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter search query"
          className="mr-2 px-3 py-2 rounded-lg bg-blue-100 text-blue-800 flex-grow"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Search
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-3 gap-4">
        {cards.map((card) => (
          <div key={card._id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">{card.name}</h3>
            <p>Type: {card.type}</p>
            <p>Number: {card.number}</p>
            {/* Display other card details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchCardTab;