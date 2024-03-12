import {useState} from 'react'
import axios from "axios";

const AddCard = () => {
    const [type, setType] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [pin, setPin] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
        await axios.post("http://localhost:3000/api/cards", {
          type,
          name,
          number,
          expirationDate,
          pin,
        }, {
          headers: {
            'Authorization': `${token}`
          }
        });
        // Reset form fields after successful submission
        setType("");
        setName("");
        setNumber("");
        setExpirationDate("");
        setPin("");
        // Handle successful submission
      } catch (error) {
        // Handle submission error
        console.error("Error adding card:", error);
      }
    };
  
  return (
    <form onSubmit={handleSubmit}>
    < select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full mb-4 px-3 py-2 rounded-lg bg-blue-100 text-blue-800"
          required
        >
          <option value="">Select Card Type</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="Business Card">Business Card</option>
          <option value="Student Card">Student Card</option>
          <option value="Membership Card">Membership Card</option>
          <option value="Prepaid Card">Prepaid Card</option>
          <option value="Commercial Credit">Commercial Credit</option>
          <option value="Forex Card">Forex Card</option>
        </select>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full mb-4 px-3 py-2 rounded-lg bg-blue-100 text-blue-800"
          required
        />
        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Number"
          className="w-full mb-4 px-3 py-2 rounded-lg bg-blue-100 text-blue-800"
          required
        />
        <input
          type="text"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          placeholder="Expiration Date"
          className="w-full mb-4 px-3 py-2 rounded-lg bg-blue-100 text-blue-800"
          required
        />
        <input
          type="text"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="PIN"
          className="w-full mb-4 px-3 py-2 rounded-lg bg-blue-100 text-blue-800"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Add Card
        </button>
      </form>
  )
}

export default AddCard