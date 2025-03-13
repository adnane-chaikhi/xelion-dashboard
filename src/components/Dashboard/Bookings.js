import React, { useState , useEffect } from "react";
import useApi from "../useApi";

const API_BOOKINGS = 'http://localhost/cleanease/backend/controllers/bookings.php';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newBooking, setNewBooking] = useState({
    clientName: "",
    serviceType: "Carpet Cleaning",  // Default service type
    serviceAddress : "",
    date: "",
    status: "Pending",
  });
  const { sendRequest } = useApi();
  const [showModal, setShowModal] = useState(false);
  const [showAddBooking, setShowAddBooking] = useState(false);
/********************************* fetch all bookings  *******************************************/
const fetchBookings = async () => {
  try {
    const data = await sendRequest(API_BOOKINGS, 'GET');
    console.log(data);
    
    setBookings(data);
  } catch (error) {
    console.error('Failed to fetch bookings');
  }
};

useEffect(() => {
  fetchBookings();
}, []);

/***************************************************** */
  // Service types for select dropdown
  const serviceTypes = [
    "Carpet Cleaning",
    "Window Cleaning",
    "Glass Cleaning",
    "House Cleaning",
    "Office Cleaning",
    "End of Lease Cleaning",
  ];

  // Pagination logic
  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  const currentItems = bookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id) => {
    setBookings(bookings.filter((booking) => booking.id !== id));
  };

  const handleEdit = (id) => {
    const booking = bookings.find((booking) => booking.id === id);
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const updateStatus = () => {
    setBookings(
      bookings.map((booking) =>
        booking.id === selectedBooking.id
          ? { ...booking, status: selectedBooking.status }
          : booking
      )
    );
    setShowModal(false);
  };

  const handleAddBooking = () => {
    setBookings([
      ...bookings,
      { id: bookings.length + 1, ...newBooking },
    ]);
    setShowAddBooking(false);
    setNewBooking({ clientName: "", serviceType: "Carpet Cleaning", date: "", status: "Pending" });
  };

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-[#272e48]">Bookings</h2>

      {/* Add Booking Button */}
      <button
        onClick={() => setShowAddBooking(true)}
        className="mb-4 bg-[#00C1D4] text-white py-2 px-4 rounded hover:bg-[#00aab8]"
      >
        Add Booking
      </button>

      {/* Add Booking Modal */}
      {showAddBooking && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Add New Booking</h3>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Client Name"
                className="border px-4 py-2 rounded w-full"
                value={newBooking.clientName}
                onChange={(e) =>
                  setNewBooking({ ...newBooking, clientName: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Service Type</label>
              <select
                value={newBooking.serviceType}
                onChange={(e) =>
                  setNewBooking({ ...newBooking, serviceType: e.target.value })
                }
                className="border px-4 py-2 rounded w-full"
              >
                {serviceTypes.map((service, index) => (
                  <option key={index} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Service Type</label>
              <input type="text"
                value={newBooking.serviceAddress}
                onChange={(e) =>
                  setNewBooking({ ...newBooking, serviceAddress: e.target.value })
                }
                className="border px-4 py-2 rounded w-full"
              />
                
            </div>
            <div className="mb-4">
              <input
                type="date"
                className="border px-4 py-2 rounded w-full"
                value={newBooking.date}
                onChange={(e) =>
                  setNewBooking({ ...newBooking, date: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowAddBooking(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddBooking}
                className="bg-[#00C1D4] text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bookings Table */}
      <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
        <thead className="bg-[#272e48] text-white">
          <tr>
            <th className="py-3 px-4 text-left">ID</th>
            <th className="py-3 px-4 text-left">Client Name</th>
            <th className="py-3 px-4 text-left">Service Type</th>
            <th className="py-3 px-4 text-left">service address</th>
            <th className="py-3 px-4 text-left">Date</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((booking) => (
            <tr
              key={booking.id}
              className="border-b hover:bg-gray-50 transition-colors"
            >
              <td className="py-3 px-4">{booking.id}</td>
              <td className="py-3 px-4">{booking.client_name}</td>
              <td className="py-3 px-4">{booking.service_type}</td>
              <td className="py-3 px-4">{booking.client_address}</td>
              <td className="py-3 px-4">{booking.booking_date}</td>
              <td
                className={`py-3 px-4 font-semibold ${
                  booking.status === "Completed"
                    ? "text-green-500"
                    : booking.status === "Pending"
                    ? "text-yellow-500"
                    : "text-blue-500"
                }`}
              >
                {booking.status}
              </td>
              <td className="py-3 px-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(booking.id)}
                    className="bg-[#00C1D4] text-white px-3 py-1 rounded hover:bg-[#00aab8] transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(booking.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-gray-600">
          Showing {currentItems.length} of {bookings.length} bookings
        </p>
        <div className="flex space-x-2">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#00C1D4] text-white hover:bg-[#00aab8]"
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#00C1D4] text-white hover:bg-[#00aab8]"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Edit Status Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Edit Status</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                value={selectedBooking.status}
                onChange={(e) =>
                  setSelectedBooking({
                    ...selectedBooking,
                    status: e.target.value,
                  })
                }
                className="border px-4 py-2 rounded w-full"
              >
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={updateStatus}
                className="bg-[#00C1D4] text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
