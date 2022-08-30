import React from "react";
import axios from "axios";
import { io } from "socket.io-client";
import ReactJson from "react-json-view";
import Grid from "@mui/material/Grid"; // Grid version 1
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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
    const socket = io("http://127.0.0.1:5000");
    socket.on("connect", () => console.log(socket.id));
    socket.on("connect_error", () => {
      setTimeout(() => socket.connect(), 5000);
    });
    socket.on("stack", (data) => {
        setStackObjs(arr => [...arr, data]);
    });
    socket.on("disconnect", () => setTime("server disconnected"));
    return () => socket.emit('end');
  }, []);

  const activateGetEmployeesTP = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/tracepoint/62');
  }

  const activateDelEmployeeTP = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/tracepoint/202');
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Grid container spacing={2} direction="row" >
        <Grid item xs="6">
          <Grid container spacing={2} direction="row" >
            <Grid item xs="6">
              <Button variant="contained" onClick={activateGetEmployeesTP}>Put Tracepoint on Line 62 (get employees)</Button>
            </Grid>
            <Grid item xs="6">
              <Button variant="contained" onClick={activateDelEmployeeTP}>Put Tracepoint on Line 202 (delete employee)</Button>
            </Grid>
          </Grid>
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
