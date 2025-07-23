import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../features/pasteSlice";
import './home.css'

const Home = () => {
  const [title, settitle] = useState("");
  const [value, setvalue] = useState("");
  const [searchparams, setsearchparams] = useSearchParams();
  const pasteId = searchparams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);
  useEffect(() => {
    if(pasteId){
      const paste = allPastes.find((p) => pasteId === p.id);
      settitle(paste.title);
      setvalue(paste.content);
    }
  }, [pasteId])
  

  function CreatePaste(){
    const paste = {
      title:title,
      content:value,
      id:pasteId||Date.now().toString(36),
      CreatedAt:new Date().toISOString(),
    }

    if(pasteId){
      //Update
      dispatch(updateToPastes(paste));
    }
    else{
      //Create
      dispatch(addToPastes(paste));
    }
    settitle("");
    setvalue("");
    setsearchparams({});
  }
  return (
    <div className="home-outside">
      <div className="search">
        <input 
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => {
            settitle(e.target.value);
          }}
          className=" bg-black p-2 rounded-md title1"
        />
        <button onClick={CreatePaste} className="home-button">{pasteId ? "Update Paste" : "Create Paste"}</button>
      </div>
      <div className="content-box1">
        <textarea value={value} placeholder="Enter Content here...." onChange={(e) => {setvalue(e.target.value)}} 
        className=" bg-black p-2 rounded-md content1" rows={20}></textarea>
      </div>
    </div>
  );
};

export default Home;
