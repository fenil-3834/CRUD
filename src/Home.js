import React, { useEffect, useState } from "react";
import axios from "./axiosintence";
import "./App.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const limit = 20;

  // useEffect(() => {
  //   async function getUserData() {
  //     try {
  //       setIsLoading(true);
  //       const { data } = await axios.get(
  //         `user?page=${currentPage}&limit=${limit}`
  //         // {
  //         //   headers: {
  //         //     "app-id": process.env.REACT_APP_SECRET_KEY,
  //         //   },
  //         // }
  //       );
  //       if (data) {
  //         setIsLoading(false);
  //         setData(data.data);
  //       }
  //     } catch (e) {
  //       console.log("error", e);
  //     }
  //   }

  //   getUserData();
  // }, [currentPage]);

  useEffect(() => {
    document.title = "User List";
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    axios({
      url: `user?page=${currentPage}&limit=${limit}`,
      method: "get",
    })
      .then(({ data }) => {
        setIsLoading(false);
        setData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage, navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Logout Successfully !");
    navigate("/");
  };

  return (
    <div className="container">
      <div className="d-flex flex-column align-items-center vh-100">
        <h1>
          <u>List of Users</u>
        </h1>

        <div className="  w-50  rounded bg-white border shadow p-4">
          <div className="d-flex justify-content-between">
            <Link to="/create" className="addbtn text-decoration-none">
              Add +
            </Link>
            <button onClick={logout} className="deletebtn">
              Logout
            </button>
          </div>
          {isLoading ? (
            <div class="widget">
              <header class="widget__header"></header>
              <div class="widget__body">
                <div class="list-component list-loader"></div>
              </div>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr className="text-capitalize text-center">
                      <th>Picture</th>
                      <th>Title</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((user) => {
                      return (
                        <tr className="text-capitalize align-middle text-center">
                          <td className="photow">
                            <img
                              src={user.picture}
                              alt={`image1`}
                              className="images"
                            />
                          </td>
                          <td>{user.title}.</td>
                          <td>{user.firstName}</td>
                          <td>{user.lastName}</td>
                          <td>
                            <Link
                              to={`/update/${user.id}`}
                              className="editbtn me-2 text-decoration-none"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={(e) => handleSubmit(user.id)}
                              className="deletebtn"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
          <div className="d-flex justify-content-between">
            <div>
              <button
                className="backbtn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
            </div>
            <div>
              <button
                className="backbtn"
                disabled={currentPage === 5}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  function handleSubmit(id) {
    const conf = toast.error("Deleted Sucessfully", {});
    if (conf) {
      axios({
        method: "delete",
        url: `user/${id}`,
      })
        .then(() => {
          navigate("/Home");
        })
        .catch((err) => console.log(err));
      // axios
      //   .delete(`user/${id}`)
      // .then(() => {
      //   navigate("/");
      // })
      // .catch((err) => console.log(err));
    }
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}

export default Home;
