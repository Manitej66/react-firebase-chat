import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const Chat = ({ name }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const getChats = async () => {
    onSnapshot(
      query(collection(db, "chats"), orderBy("sentAt", "asc")),
      (data) => {
        let l = [];
        data.docs.forEach((doc) => {
          l.push(doc.data());
        });
        setChats(l);
      }
    );
  };

  useEffect(() => {
    setChats([]);
    getChats().then(() => setLoading(false));
  }, []);
  return (
    <div className="chats">
      {loading && <p>loading chats..</p>}
      {!loading && chats.length === 0 && <p>no chats yet</p>}
      {!loading &&
        chats.map((chat) => (
          <div
            className="chat-box"
            style={{
              alignSelf: name === chat.name ? "flex-end" : "flex-start",
              textAlign: name === chat.name ? "right" : "left",
            }}
          >
            <p className="chat-author">{chat.name}</p>
            <p className="chat-msg">{chat.message}</p>
          </div>
        ))}
    </div>
  );
};

export default Chat;
