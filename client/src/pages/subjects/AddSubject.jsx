import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SubjectForm from "./SubjectForm";
import { createSubject } from "../../../../server/services/subjectService";
function AddSubject() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      await createSubject(data);

      navigate("/subjects");
    } catch (err) {
alert(err.response.data.message)    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
  <button
            onClick={() => navigate("/subjects")}
            className="text-white mb-2 bg-pink-600 p-1 rounded"
          >
            ← Back
          </button>
      <h2 className="text-xl font-bold mb-4">Add Subject</h2>

      <SubjectForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}

export default AddSubject;