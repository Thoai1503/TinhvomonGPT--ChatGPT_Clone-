import React, { useState } from "react";
import { botRespone } from "../service/geminiAPI";
import { useDispatch, useSelector } from "react-redux";
import { setUserSubmit } from "../reducer/chatSlice";
import { submitRequest } from "../reducer/chatSlice";
import type { AppDispatch, RootState } from "../store";

const Home: React.FC = () => {
  const [text, setText] = useState("");
  const message = useSelector((item: RootState) => item.chat.messages);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = () => {
    dispatch(submitRequest({ history: [{ role: "user", text }], text: text }));
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setText(value);
  };
  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="d-flex flex-column justify-content-center ">
        <div className="title my-4">How are you today?</div>
        <ul>
          {message.map((item) => (
            <li>{item.text}</li>
          ))}
        </ul>
        <div className="submit-content">
          <input
            className="submit-input"
            value={text}
            onChange={handleChange}
            placeholder="Write a message..."
          />
          <button
            type="button"
            className="submit-btn"
            aria-label="Send message"
            onClick={() =>
              // botRespone([{ role: "user", text: "How NodeJS work" }])
              handleSubmit()
            }
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
