import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ClassForm from "./ClassForm";
import {
  getClassById,
  updateClass,
} from "../../../../server/services/classService";

function EditClass() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClass();
  }, []);

  const loadClass = async () => {
    try {
      const res = await getClassById(id);
      setClassData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    try {
      await updateClass(id, data);
      navigate("/classes");
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="p-6">
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