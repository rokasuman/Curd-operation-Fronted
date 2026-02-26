import React, { useState } from 'react';
import { bookBaseUrl } from '../axiosInstance.js';
const BookForm = () => {
  
  const [bookform,setBookForm] = useState({
  "bookName": "",
  "bookAuthor": "",
  "publishDate": "",
  })


  const handleFormChange =(e)=>{
    const{name,value} = e.target;
    setBookForm((prev)=>({
      ...prev,
      [name]:value
    }))
  }
  console.log("bookform",bookform)

  //Function to connect form with database
const handleOnSubmit = async (e) => {
  e.preventDefault(); 

  try {
    if(!bookform.bookName || !bookform.bookAuthor || !bookform.publishDate){
      alert("All field are required")
    }
    const response = await bookBaseUrl.post("/addbook", bookform);

    alert("Book has been added");
    console.log(response.data); 
    setBookForm({
      "bookName": "",
      "bookAuthor": "",
      "publishDate": "",
    })

  } catch (error) {
    console.error("Error adding book:", error);
    alert("Failed to add book");
  }
};

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add a New Book</h2>
      
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="BookName">
            Book Name
          </label>
          <input
            type="text"
            value={bookform.bookName}
            name="bookName"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter book name"
            onChange={handleFormChange}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="BookAuthor">
            Book Author
          </label>
          <input
            type="text"
            value={bookform.bookAuthor}
            name="bookAuthor"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter author name"
            onChange={handleFormChange}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="Date">
            Publish Date
          </label>
          <input
            type="date"
            value={bookform.publishDate}
            name="publishDate"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={handleFormChange}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
          onClick={handleOnSubmit}
        >
          Submit Book
        </button>
      </form>
    </div>
  );
};

export default BookForm;
