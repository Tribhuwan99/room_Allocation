const StudentCard = ({ student }) => {
  const currentRoom = student.currentRoom || '';
  const allotedRoom = student.allotedRoom || '';

  return (
    <div className="w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-4 transform hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-xl hover:bg-blue-50">
      <div className={`p-4 bg-purple-500`}>
        <h1 className="text-2xl font-bold text-white animate-wiggle">{student.name}</h1>
        <p className="">Roll Number: {student.rollNumber}</p>
      </div>
      <div className="px-6 py-4">
        <p className="text-gray-700 mt-2"><span className="font-semibold">Contact:</span> {student.contact}</p>
        <h2 className="text-gray-700 mt-2"><span className="font-semibold">Current Hostel:</span> {student.currentHostel}, {currentRoom.toUpperCase()}</h2>
        <h2 className="text-gray-700 mt-2"><span className="font-semibold">Allotted Hostel:</span> {student.allotedHostel}, {allotedRoom.toUpperCase()}</h2>
        {/* <button
          className="mt-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
        >
          Edit
        </button> */}
      </div>
    </div>
  );
}

export default StudentCard;
