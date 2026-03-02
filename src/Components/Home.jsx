import React, { useEffect, useState } from "react";
import { bookBaseUrl } from "../axiosInstance";
import { MdDelete } from "react-icons/md";
import { BiCommentEdit } from "react-icons/bi";

const Home = () => {
  const [bookList, setBookList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all books
  const getAllBookList = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await bookBaseUrl.get("/booklist");

      if (data?.success) {
        setBookList(data.bookList);
      } else {
        setBookList([]);
      }

    } catch (err) {
      console.error("Error fetching books:", err);
      setError("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBookList();
  }, []);

  // function to delete the book 
const handleOnDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete?");
  if (!confirmDelete) return;

  try {
    const { data } = await bookBaseUrl.delete("/deleteBook", {
      data: { _id: id }, // matches backend
    });

    if (data?.success) {
      alert(data.message);
      getAllBookList(); // refresh the book list
    } else {
      alert(data.message || "Delete failed");
    }

  } catch (error) {
    console.error("Delete error:", error.response?.data || error.message);
  }
};
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold text-center text-blue-700 mb-6">
        List of Books Added
      </h1>

      {loading && (
        <p className="text-center text-gray-600">Loading books...</p>
      )}

      {error && (
        <p className="text-center text-red-500">{error}</p>
      )}

      {!loading && !error && (
        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase">
                  Book Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase">
                  Book Author
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase">
                  Publish Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {bookList.length > 0 ? (
                bookList.map((book) => (
                  <tr
                    key={book._id}
                    className="hover:bg-blue-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 text-gray-800 font-medium whitespace-nowrap">
                      {book.bookName}
                    </td>
                    <td className="px-6 py-4 text-gray-800 whitespace-nowrap">
                      {book.bookAuthor}
                    </td>
                    <td className="px-6 py-4 text-gray-800 whitespace-nowrap">
                      {book.publishDate}
                    </td>
                    <td className="px-6 py-4 text-gray-800 whitespace-nowrap">
                      <button className="text-blue-600 hover:underline mr-3 cursor-pointer">
                        <BiCommentEdit/>
                      </button>
                      <button className="text-red-600 hover:underline cursor-pointer" onClick={()=>handleOnDelete(book._id)}>
                        <MdDelete/>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-6 text-gray-500"
                  >
                    No Books Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;