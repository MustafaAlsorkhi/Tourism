import React, { useState } from "react";
import axios from 'axios'
import Cookies from "js-cookie";

const Form = () => {

  const initialFormData = {
    title: "",
    description: "",
    img_url: "",
    auther_name:""
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData)    
    

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  let token =Cookies.get("token")

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

      // user_id :Window.sessionStorage.getItem("user_Id"),{
        const config = {
          headers: {
            "Authorization": token
          }
        };


    axios
    .post("http://localhost:3001/add-blog",
     {title: formData.title,
      description: formData.description,
      img_url: formData.img_url ,
      author_name:window.sessionStorage.getItem("user_id")

    },
      config
    )
    .then((response) => {
      alert("dataSended");
      console.log("Data successfully posted:", response.data);
      setFormData(initialFormData);
    })
    .catch((error) => {
      console.error("Error posting data:", error);
    });



  };

  return (
    <div>
      {/* Modal toggle */}
      <button
        data-modal-target="authentication-modal"
        data-modal-toggle="authentication-modal"
        onClick={openModal}
        className="inline-flex items-center justify-center w-60 px-5 py-3 text-base font-medium text-center text-gray-900 border-2 border-black rounded-lg hover:bg-[#91a9bd] focus:ring-4 focus:ring-gray-100"
        type="button"
      >
        New blog
      </button>

      {/* Main modal */}
      <div
        id="authentication-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 ${
          isModalOpen ? "" : "hidden"
        }`}
      >
        <div className="relative w-full max-w-md max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="authentication-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                New Blog
              </h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Petra"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    description
                  </label>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="bg-gray-50 h-28 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder=""
                    required
                  />
                </div>
                <div>
                  <input
                    type="file"
                    name="img_url"
                    id="image"
                    value={formData.img_url}
                    onChange={handleInputChange}
                    className="bg-white text-sm rounded-lg p-2.5"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-[#b0c0cd] hover:bg-[#91a9bd] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
