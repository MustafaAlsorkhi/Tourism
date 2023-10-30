import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BlogDetails = () => {
  const { blogId } = useParams(); // Retrieve the blog ID from the route parameter
  const [blogDetails, setBlogDetails] = useState(null);

  useEffect(() => {
    // Fetch detailed blog information based on the blog ID
    axios.get(`http://localhost:3001/getBlog/${blogId}`).then((response) => {
    console.log("data",response.data[0])  
    setBlogDetails(response.data[0]);
    }).catch((error) => {
      console.error("Error fetching blog details:", error);
    });
  }, [blogId]);

  return (
    <div>
      {blogDetails ? (
        <div>
          <h2>{blogDetails.title}</h2>
          <p>Author: {blogDetails.author_name}</p>
          <p>{blogDetails.description}</p>
          {/* Additional content for the details page */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BlogDetails;
