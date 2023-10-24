"use client";
import "@/styles/create.css";
import { useContext, useEffect, useState } from "react";
import { CustomContext } from "../Context";
import { useRouter } from "next/navigation";

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const [image, setImage] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [empty, setEmpty] = useState(null);
  const { data } = useContext(CustomContext);
  const router = useRouter();
  const handleValidation = () => {
    if (title.length > 1 && description.length > 1) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  };
  const handleSendPost = async (formData) => {
    try {
      const req = await fetch("http://localhost:5000/posts", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (req.ok) {
        const res = await req.json();
        console.log(res); // Print the response to check its content
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
      const formData = new FormData();
      formData.append("image", image);
      formData.append("title", title);
      formData.append("description", description);
      handleSendPost(formData);
    }
  };
  useEffect(() => {
    !data ? router.push("/login") : "";
  }, [data]);
  return (
    <div className="craete">
      <form className="craete_container" onSubmit={createPost}>
        <div className="create_post">
          <label htmlFor="title">العنوان</label>
          <input
            type="text"
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
            type="text"
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
          <label htmlFor="image" className="chose_file">
            اختيار ملف
          </label>
          <input
            id="image"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => {
              setImage(e.target.files[0]);
              handleValidation();
            }}
          />
        </div>
        {empty === false ? <span>يجب الا يكون اي حقل فارغ</span> : ""}
        <div className="create_post">
          <button
            className="btn"
            type="submit"
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
