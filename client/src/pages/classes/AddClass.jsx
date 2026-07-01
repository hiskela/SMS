import ClassForm from "./ClassForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddClass() {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    await axios.post("http://localhost:3000/api/classes", data);
    navigate("/classes");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Add Class</h2>

      <ClassForm onSubmit={handleSubmit} />
    </div>
  );
}

export default AddClass;