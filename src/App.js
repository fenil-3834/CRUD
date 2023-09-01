import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import "bootstrap/dist/css/bootstrap.min.css";
import AddEdit from "./AddEdit";
import Signup from "./Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Login";
import Error from "./Error";

function App() {
  const isCreate = true;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Home" element={<Home />}></Route>
          <Route path="/create" element={<AddEdit isCreate={isCreate} />} />
          <Route
            path="/update/:id"
            element={<AddEdit isUpdate={isCreate} />}
          ></Route>
          <Route path="*" Component={Error} />
        </Routes>
      </BrowserRouter>
      <ToastContainer theme="dark" position="bottom-center" autoClose={1500} />
    </>
  );
}

export default App;
