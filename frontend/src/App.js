import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";
import MainHeader from "./shared/MainHeader";
import Home from "./views/Home";
import Bin from "./views/Bin";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" align="center" style={{ marginTop: "2em" }}>
            PanicBin
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            style={{ marginBottom: "2.5em", fontStyle: "italic" }}
          >
            Get a custom URL for inspecting HTTP requests...
          </Typography>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bins/:binId" element={<Bin />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
