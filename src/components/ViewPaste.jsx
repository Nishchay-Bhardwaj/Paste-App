import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import './viewpaste.css'

const ViewPaste = () => {
  const {id} = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p.id === id);
  
  return (
    <div className="view-box">
      <div className="input-box">
        <input
          type="text"
          value={paste.title}
          disabled
          className=" bg-black p-2 rounded-md title2"
        />
      </div>
      <div>
        <textarea
          value={paste.content}
          disabled
          className=" bg-black p-2 rounded-md content2"
          rows={18}
        ></textarea>
      </div>
    </div>
  );
};

export default ViewPaste;
