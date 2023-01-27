import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Divider, Container, Typography } from "@mui/material";
import Home from "./views/Home";
import Bin from "./views/Bin";
import Request from "./views/Request";
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
            <Route path="/:binId/:requestId" element={<Request />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
