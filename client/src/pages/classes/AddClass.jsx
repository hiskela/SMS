import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClass } from "../../../../server/services/classService"; 
import ClassForm from "./ClassForm";

function AddClass() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      await createClass(data);
      navigate("/classes");
    } catch (err) {
      console.error(err);


    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
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