import React from "react";
import { io } from "socket.io-client";
import ReactJson from "react-json-view";
import Grid from "@mui/material/Grid"; // Grid version 1
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  lineHeight: "60px",
}));

const App = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const [time, setTime] = React.useState("fetching");
  const my_json_object = {
    array: [1, 2, 3],
    bool: true,
    object: {
      foo: "bar",
    },
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
  return (
    <Box sx={{ display: "flex" }}>
      <Grid container spacing={2} direction="row" >
        <Grid item xs="6">
          <Item elevation={4}>{time}</Item>
          <List component="nav" aria-label="main mailbox folders">
            <ListItemButton
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
            >
              <ListItemIcon>sdas</ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
            >
              <ListItemIcon>asdasd</ListItemIcon>
              <ListItemText primary="Drafts" />
            </ListItemButton>
          </List>
        </Grid>
        <Grid item xs="6">
            <ReactJson src={my_json_object} />
        </Grid>
      </Grid>
    </Box>
  );
};
export default App;
