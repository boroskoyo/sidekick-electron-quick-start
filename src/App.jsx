import React from "react";
import { io } from "socket.io-client";
import ReactJson from "react-json-view";
import Grid from "@mui/material/Grid"; // Grid version 1
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const App = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const [stackObjs, setStackObjs] = React.useState([]);

  React.useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.on("connect", () => console.log(socket.id));
    socket.on("connect_error", () => {
      setTimeout(() => socket.connect(), 5000);
    });
    socket.on("stack", (data) => { 
      if(stackObjs.length == 0 || stackObjs[stackObjs.length-1].id != data.id)
        setStackObjs(arr => [...arr, data]);
    });
    socket.on("disconnect", () => setTime("server disconnected"));
    return () => socket.emit('end');
  }, []);
  
  return (
    <Box sx={{ display: "flex" }}>
      <Grid container spacing={2} direction="row" >
        <Grid item xs="6">
          <List component="nav" aria-label="main mailbox folders">
          {stackObjs.map((item, i) => (
            <ListItemButton
              selected={selectedIndex === i}
              onClick={(event) => handleListItemClick(event, i)}
            >
              <ListItemIcon>Event No:</ListItemIcon>
              <ListItemText primary={i} />
            </ListItemButton>
            ))}
          </List>
        </Grid>
        <Grid item xs="6">
            <ReactJson src={stackObjs[selectedIndex]} />
        </Grid>
      </Grid>
    </Box>
  );
};
export default App;
