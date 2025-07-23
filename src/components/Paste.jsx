import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../features/pasteSlice";
import toast from "react-hot-toast";
import "./paste.css";
import share from "../assets/send.png";
import edit from "../assets/icons8-edit-50.png";
import view from "../assets/eye_11547603.png";
import copy from "../assets/copy.png";
import delete1 from "../assets/icons8-delete-24.png";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchterm, setsearchterm] = useState("");
  const [activeShareId, setActiveShareId] = useState(null);
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchterm.toLowerCase())
  );
  const dispatch = useDispatch();

  function handleDelete(paste) {
    dispatch(removeFromPastes(paste));
  }
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return `${date.getDate().toString().padStart(2, "0")}-${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${date.getFullYear()}`;
  };

  return (
    <div className="paste-outside">
      <div className="search-container">
        <input
          type="text"
          value={searchterm}
          onChange={(e) => {
            setsearchterm(e.target.value);
          }}
          placeholder="Search here"
          className=" bg-black p-2 rounded-md search"
        />
      </div>
      <div className="pastes">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            const pasteUrl = `${window.location.origin}/paste/${paste.id}`;
            const title = `Check out this paste: ${paste.title}`;

            return (
              <div className="paste" key={paste?.id}>
                <div className="content-box">
                  <div className=" text-amber-50 title">{paste.title}</div>
                  <div className="content">{paste.content}</div>
                  <div className="date">
                    Created on :{formatDate(paste.CreatedAt)}
                  </div>
                </div>
                <div className="features">
                  <button className="feature-btn">
                    <a href={`/?pasteId=${paste?.id}`}>
                      <img src={edit} alt="" />
                    </a>
                  </button>
                  <button className="feature-btn">
                    <a href={`/pastes/${paste?.id}`}>
                      <img src={view} alt="" />
                    </a>
                  </button>
                  <button
                    onClick={() => handleDelete(paste?.id)}
                    className="feature-btn"
                  >
                    <img src={delete1} alt="" />
                  </button>
                  <button
                    className="feature-btn"
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied to Clipboard");
                    }}
                  >
                    <img src={copy} alt="" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveShareId(
                        activeShareId === paste.id ? null : paste.id
                      )
                    }
                    className="feature-btn"
                  >
                    <img src={share} alt="" />
                  </button>
                  {activeShareId === paste.id && (
                    <div className="absolute mt-2 bg-white border p-2 rounded shadow-lg z-10 flex gap-2 ">
                      <FacebookShareButton url={pasteUrl} quote={title}>
                        <FacebookIcon size={32} round />
                      </FacebookShareButton>
                      <TwitterShareButton url={pasteUrl} title={title}>
                        <TwitterIcon size={32} round />
                      </TwitterShareButton>
                      <WhatsappShareButton url={pasteUrl} title={title}>
                        <WhatsappIcon size={32} round />
                      </WhatsappShareButton>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
