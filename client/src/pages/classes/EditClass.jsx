import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ClassForm from "./ClassForm";
import api from "../../api/axios";
import {toast} from "react-toastify"
function EditClass() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadClass = async () => {
    try {
      const res = await api.get(`/classes/${id}`);
      setClassData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClass();
  }, []);

  const handleSubmit = async (data) => {
    try {
      await api.put(`/classes/${id}`, data);
toast.success("Class was edited successfully")
      navigate("/classes");
    } catch (err) {
toast.success("Failed to edit class")    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="p-6">
  <button
            onClick={() => navigate("/classes")}
            className="text-white mb-2 bg-pink-600 p-1 rounded"
          >
            ← Back
          </button>
      <h2 className="text-2xl font-bold mb-5">
        Edit Class
      </h2>

    <ClassForm
  initialData={classData}
  onSubmit={handleSubmit}
  loading={loading}
/>
    </div>
  );
}

export default EditClass;