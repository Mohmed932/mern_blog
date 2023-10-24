"use client";
import "@/styles/create.css";
import { useState } from "react";
import { BsCardImage } from "react-icons/bs";

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const [image, setImage] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [empty, setEmpty] = useState(null);
  const handleValidation = () => {
    if (title.length > 1 && description.length > 1) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  };
  const handleSendPost = async () => {
    const convertImageToBase64 = (image) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
          resolve(event.target.result);
        };

        reader.onerror = (error) => {
          reject(error);
        };

        reader.readAsDataURL(image);
      });
    };
    // const imageBase64 = await convertImageToBase64(image);
    const postData = {
      title,
      description,
      //   image: imageBase64,
    };
    try {
      const req = await fetch("http://localhost:5000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
        credentials: "include",
      });

      if (req.ok) {
        const res = await req.json();
        console.log(req, res); // Print the response to check its content
      } else {
        console.error("Request failed with status:", req.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createPost = (e) => {
    e.preventDefault();
    if (image === "" || title === "" || description === "") {
      setEmpty(false);
    } else {
      setEmpty(true);
    }
    if (image !== "" && title !== "" && description !== "") {
      handleSendPost();
    }
  };
  return (
    <div className="craete">
      <form className="craete_container">
        <div className="create_post">
          <label htmlFor="title">العنوان</label>
          <input
            type="title"
            id="title"
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              handleValidation();
            }}
          />
        </div>
        <div className="create_post">
          <label htmlFor="descrpition">الوصف</label>
          <textarea
            type="descrpition"
            id="descrpition"
            name="descrpition"
            value={description}
            onChange={(e) => {
              setdescription(e.target.value);
              handleValidation();
            }}
          />
        </div>
        <div className="create_post">
          <label htmlFor="image">
            <BsCardImage className="file_image" />
          </label>
          <input
            id="image"
            type="file"
            name="image"
            style={{ display: "none" }}
            onChange={(e) => setImage(e.target.files[0]) & handleValidation()}
          />
        </div>
        {empty === false ? <span>يجب الا يكون اي حقل فارغ</span> : ""}
        <div className="create_post">
          <button
            className="btn"
            type="submit"
            onClick={createPost}
            disabled={!isButtonEnabled}
            style={
              isButtonEnabled === false
                ? { cursor: "not-allowed", opacity: ".3" }
                : { cursor: "pointer", opacity: "1" }
            }
          >
            نشر
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
