import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClass } from "../../../../server/services/classService"; 
import ClassForm from "./ClassForm";
import {toast} from "react-toastify"
function AddClass() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      await createClass(data);
toast.success("Class created successfully");
      navigate("/classes");
    } catch (err) {
toast.error("Error Creating New Class");


    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
 <button
            onClick={() => navigate(-1)}
            className="text-white mb-3 bg-pink-600 px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors duration-200 inline-flex items-center gap-2"
          >
            ← Back
          </button>
      <h2 className="text-2xl font-bold mb-4">
        Add Class
      </h2>

      <ClassForm
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}

export default AddClass;