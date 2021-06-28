import { addDoc, collection } from "@firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";

const Send = ({ name }) => {
  const [msg, setMsg] = useState("");

  const send = async () => {
    await addDoc(collection(db, "chats"), {
      name,
      message: msg,
      sentAt: new Date(),
    }).then(() => setMsg(""));
  };

  return (
    <div className="send">
      <textarea
        onChange={(e) => setMsg(e.target.value)}
        value={msg}
        className="send-area"
        placeholder="enter message"
      ></textarea>
      <button onClick={send} className="send-btn">
        send
      </button>
    </div>
  );
};

export default Send;
