import React, { useContext } from "react";
import styled from "styled-components";
import { MdDescription, MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { FaFreeCodeCamp } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { AiFillTags, AiOutlineCloudUpload } from "react-icons/ai";
import Navbar from "./Navbar";
import useInput from "../hooks/useInput";
import axios from 'axios'
import Editor from "./Editor";
import DescriptionContext from "../DescriptionContext";
import { useNavigate } from "react-router-dom";

const StyledDiv = styled.div`
  width: 800px;
  max-width: 100%;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background:transparent;
  form {
    width: 100%;
    .label {
      display: flex;
      align-items: center;
      padding: 10px 0;
      font-size: 24px;
      label {
        margin-left: 10px;
      }
    }
    input {
      min-width: 400px;
      max-width: 100%;
    }
    .icons {
      background: white;
      width: 50px;
      height: 50px;
      border-radius: 50px;
      padding: 10px;
      box-shadow: 0 3px 5px rgb(0, 0, 0, 0.15);
    }
    #input,
    textarea {
      margin-bottom: 20px;
      transition: 0.1s ease all;
      font-size: 16px;
      border: none;
      outline: none;
      box-shadow: 0 3px 5px rgb(0, 0, 0, 0.15);
      padding: 15px 20px;
      border-radius: 10px;
      overflow: hidden;
      &:focus {
        box-shadow: 0 5px 10px rgb(0, 0, 0, 0.15);
      }
    }
    textarea {
      width: 100%;
      resize: vertical;
      min-height: 700px;
      padding: 20px;
      overflow-y: auto;
      -ms-overflow-style: none; /* Internet Explorer 10+ */
      scrollbar-width: none; /* Firefox */
      &::-webkit-scrollbar {
        display: none; /* Safari and Chrome */
      }
    }
    #code {
      font-family: "Fira Code", monospace !important;
    }
    .post {
      display: flex;
      justify-content: center;
      align-items: center;
      background: white;
      gap: 10px;
      width: 150px;
      padding: 10px;
      font-size: 36px;
      box-shadow: 0 3px 5px rgb(0, 0, 0, 0.15);
      border-radius: 30px;
      transition:0.3s ease all;
      margin: 0 auto;
      &:active{
        transform:scale(0.9);
      }
      button {
        border: none;
        outline: none;
        background: white;
        font-size: 24px;
      }
    }
  }
`;
function New() {
  document.title = "Create Post";
  const navigate = useNavigate();

  //states
  const [title, handleTitle] = useInput("");
  const [des] = useContext(DescriptionContext);
  const [code, handleCode] = useInput("");
  const [author, handleAuthor] = useInput("");
  const [tags, handleTags] = useInput("");

  //submitting form
  const handleSubmit =async (e)=>{
    e.preventDefault();
    const array = tags.split(',');
    const res = await axios.post('http://localhost:3000/api/posts/',{title,description:des,code,author,tags:array})
    // console.log(res.data);
    navigate(`/post/${res.data._id}`);
  }
  return (
    <StyledDiv>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <div className="title label">
          <MdOutlineDriveFileRenameOutline className="icons" />
          <label htmlFor="title">Title of the post</label>
        </div>
        <input
          id="input"
          type="text"
          placeholder="Provide a title here...."
          name="title"
          value={title}
          onChange={handleTitle}
        />
        <div className="description label">
          <MdDescription className="icons" />
          <label htmlFor="description">Describe the post</label>
        </div>
        <Editor/>
      
        <div className="code label">
          <FaFreeCodeCamp className="icons" />
          <label htmlFor="code">Write the code here.</label>
        </div>
        <textarea name="code" id="code" value={code} onChange={handleCode} />
        <div className="author label">
          <BsFillPeopleFill className="icons" />
          <label htmlFor="title">Author </label>
        </div>
        <input
          id="input"
          type="text"
          placeholder="Provide author name here...."
          name="author"
          value={author}
          onChange={handleAuthor}
        />
        <div className="author label">
          <AiFillTags className="icons" />
          <label htmlFor="title">Tags </label>
        </div>
        <input
          id="input"
          type="text"
          placeholder="Provide comma seperated tags here ..."
          name="tags"
          value={tags}
          onChange={handleTags}
        />
        <div className="post">
          <AiOutlineCloudUpload />
          <button>Post</button>
        </div>
      </form>
    </StyledDiv>
  );
}

export default New;