import Chat from "./components/Chat";
import Navbar from "./components/Navbar";
import "./App.css";
import Send from "./components/Send";
import { useState } from "react";

const App = () => {
  const [name, setName] = useState(localStorage.getItem("name"));
  const [temp, setTemp] = useState("");
  return (
    <div>
      <Navbar />
      <div className="container">
        {name === null ? (
          <>
            <input
              className="name"
              onChange={(e) => setTemp(e.target.value)}
              value={name}
              placeholder="enter name"
            />
            <br />
            <button
              onClick={() => {
                setName(temp);
                localStorage.setItem("name", temp);
              }}
              className="send-btn"
            >
              start
            </button>
          </>
        ) : (
          <>
            <Chat name={name} />
            <Send name={name} />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
