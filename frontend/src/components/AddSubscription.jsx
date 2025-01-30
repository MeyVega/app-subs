import { useState } from "react";
import axios from "axios";

const AddSubscription = () => {
  const [formData, setFormData] = useState({
    name: "",
    cost: 0,
    paymentDate: "",
    category: "streaming",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/subscriptions",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data) alert("¡Suscripción creada!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Nombre (Netflix)"
        className="block w-full mb-2 p-2 border rounded"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Costo"
        className="block w-full mb-2 p-2 border rounded"
        value={formData.cost}
        onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
      />
      <input
        type="date"
        className="block w-full mb-2 p-2 border rounded"
        value={formData.paymentDate}
        onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
      />
      <select
        className="block w-full mb-2 p-2 border rounded"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
      >
        <option value="streaming">Streaming</option>
        <option value="música">Música</option>
        <option value="software">Software</option>
      </select>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Guardar
      </button>
    </form>
  );
};

export default AddSubscription;