import React from "react";
import { io } from "socket.io-client";
import ReactJson from 'react-json-view'

const App = () => {
  const [time, setTime] = React.useState("fetching");
  const my_json_object = {
    array: [1, 2, 3],
    bool: true,
    object: {
      foo: 'bar',
    }
  };
  React.useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.on("connect", () => console.log(socket.id));
    socket.on("connect_error", () => {
      setTimeout(() => socket.connect(), 5000);
    });
    socket.on("time", (data) => setTime(data));
    socket.on("disconnect", () => setTime("server disconnected"));
  }, []);
  return <div className="App">{time}
  <ReactJson src={my_json_object} />
  </div>;
};
export default App;
