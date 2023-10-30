import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Cards = () => {
  const [dataOfBlog, setDataOfBlog] = useState([]);

  useEffect(() => {
    // Fetch the blog data when the component mounts
    axios.get("http://localhost:3001/getAllBlogs").then((response) => {
    console.log("all data,",response)  
    setDataOfBlog(response.data);
    console.log(response.data[0])
    }).catch((error) => {
      console.error("Error fetching blog data:", error);
    });
  }, []);

  return (
    <div className="flex justify-center flex-wrap flex-row gap-10">

      {dataOfBlog.map((blogItem) => (
        <Link
          key={blogItem.blog_id}
          to={`/details/${blogItem.blog_id}`} // Define the link to the details page with the blog ID as a parameter
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover-bg-gray-700"
        >
          <img
            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            src={blogItem.img_url}
            alt={blogItem.title}
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {blogItem.title}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Author: {blogItem.auther_name}
            </p>
          </div>
        </Link>
        
      ))}
      </div>

  );
};

export default Cards;



// auther_name
// : 
// "Mustafa"
// description
// : 
// "Amman89"
// img_url
// : 
// "imgAmm.png"
// title
// : 
// "Amman"