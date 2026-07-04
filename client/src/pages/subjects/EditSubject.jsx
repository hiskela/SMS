import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SubjectForm from "./SubjectForm";
import api from "../../api/axios";

function EditSubject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [subjectData, setSubjectData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadSubject = async () => {
    try {
      const res = await api.get(`/subjects/${id}`);
      setSubjectData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubject();
  }, []);

  const handleSubmit = async (data) => {
    try {
      await api.put(`/subjects/${id}`, data);
      navigate("/subjects");
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Edit Subject</h2>

      <SubjectForm
        initialData={subjectData}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}

export default EditSubject;