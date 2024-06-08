import React, { useEffect, useRef, useState } from "react";
import Client from "../components/Client";
import Editor from "../components/Editor";
import { initSocket } from "../socket";

const EditorPage = () => {
  const socketRef = useRef(null);
  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
    };
    init();
  });
  const [clients, setClients] = useState([
    { socketId: 1, username: "Lalit" },
    { socketId: 2, username: "Lucky" },
    { socketId: 3, username: "Mahavir" },
  ]);
  return (
    <>
      <div className="mainWrap">
        <div className="aside">
          <div className="asideInner">
            <div className="logo">
              <img className="logoImage" src="/code-sync.png" alt="logo" />
            </div>
            <h3>Connected</h3>
            <div className="clientsList">
              {clients.map((client) => (
                <Client key={client.socketId} username={client.username} />
              ))}
            </div>
          </div>
          <button className="btn copyBtn">Copy ROOM ID</button>
          <button className="btn leaveBtn">Leave</button>
        </div>
        <div className="editorWrap">
          <Editor />
        </div>
      </div>
    </>
  );
};

export default EditorPage;
