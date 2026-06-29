function Topbar({ isOpen, setIsOpen }) {
  return (
    <div className="bg-white shadow p-3 flex items-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1 bg-blue-600 text-white rounded"
      >
        ☰
      </button>

      <h1 className="ml-4 font-semibold">School Management System</h1>
    </div>
  );
}

export default Topbar;