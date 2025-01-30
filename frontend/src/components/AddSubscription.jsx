import { useState } from "react";
import axios from "axios";

const AddSubscription = () => {
  const [formData, setFormData] = useState({
    name: "",
    cost: 0,
    paymentDate: "",
    category: "streaming",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validación básica
    if (!formData.name || !formData.cost || !formData.paymentDate) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (formData.cost <= 0) {
      setError("El costo debe ser un número positivo");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No estás autenticado. Por favor, inicia sesión.");
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/subscriptions`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data) {
        alert("¡Suscripción creada!");
        // Reiniciar el formulario
        setFormData({
          name: "",
          cost: 0,
          paymentDate: "",
          category: "streaming",
        });
      }
    } catch (error) {
      setError("Error al crear la suscripción. Inténtalo de nuevo.");
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <input
        type="text"
        placeholder="Nombre (Netflix)"
        className="block w-full mb-2 p-2 border rounded"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Costo"
        className="block w-full mb-2 p-2 border rounded"
        value={formData.cost}
        onChange={(e) => setFormData({ ...formData, cost: parseFloat(e.target.value) || 0 })}
        min="0"
        step="0.01"
        required
      />
      <input
        type="date"
        className="block w-full mb-2 p-2 border rounded"
        value={formData.paymentDate}
        onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
        required
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