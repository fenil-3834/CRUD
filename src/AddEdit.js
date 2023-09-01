import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "./axiosintence";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const AddEdit = ({ isCreate, isUpdate }) => {
  const initialData = { title: "", firstName: "", lastName: "", email: "" };

  const [values, setValues] = useState(initialData);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    if (isCreate) {
      document.title = "Create User";
    } else {
      document.title = "Update User";
    }
    setIsLoading(true);
    axios({
      method: "get",
      url: `user/${id}`,
    })
      .then((res) => {
        setIsLoading(false);
        setValues(res.data);
      })
      .catch((err) => console.log(err));

    // axios
    //   .get(`user/${id}`)
    // .then((res) => {
    //   // setIsLoading(false);
    //   setValues(res.data);
    // })
    // .catch((err) => console.log(err));

    // .then((res) =>
    //   setValues({
    //     ...values,
    //     title: res.values?.title,
    //     firstName: res.values?.firstName,
    //     lastName: res.values?.lastName,
    //   })
    // )
    // .catch((err) => console.log(err));
  }, [id, isCreate]);
  //   console.log(id);
  const [formErrors, setFormErrors] = useState({});
  const validateForm = () => {
    const errors = {};
    if (!values.title.trim()) {
      errors.title = "*Title Is Required";
    } else if (!/^[^\d]*$/.test(values.title)) {
      errors.title = "*Numbers Not Allowed";
    }

    if (!values.firstName.trim()) {
      errors.firstName = "*First Name Is Required";
    } else if (!/^[^\d]*$/.test(values.firstName)) {
      errors.firstName = "*Numbers Not Allowed";
    }

    if (!values.lastName.trim()) {
      errors.lastName = "*Last Name Is Required";
    } else if (!/^[^\d]*$/.test(values.lastName)) {
      errors.lastName = "*Numbers Not Allowed";
    }

    if (!/\S+@\S+.\S+/.test(values.email)) {
      errors.email = "*E-mail Required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid && isCreate) {
      setIsLoading(true);

      axios({
        method: "post",
        url: "user/create",
        data: values,
      })
        .then(() => {
          toast.success("Data Added Successfully !", {});
          setIsLoading(false);
          navigate("/Home");
        })
        .catch((err) => {
          toast.error(err.message, {});
        });

      // axios
      //   .post("user/create", values)
      // .then(() => {
      //   toast.success("Data Update Successfully !", {});
      //   //   setIsLoading(false);
      //   navigate("/");
      // })
      // .catch((err) => {
      //   toast.error(err.message, {});
    } else if (isValid) {
      setIsLoading(true);
      axios({
        method: "put",
        url: `user/${id}`,
        data: values,
      })
        .then(() => {
          toast.success("Data Update Successfully !", {});
          // setFormErrors(validate(formValues));
          navigate("/Home");
          setIsLoading(false);
        })
        .catch((err) => {
          toast.error(err.message, {});
        });
      // axios
      //   .put(`user/${id}`, values)
      // .then(() => {
      //   toast.success("Data Update Successfully !", {});
      //   // setFormErrors(validate(formValues));
      //   navigate("/");
      // })
      // .catch((err) => {
      //   toast.error(err.message, {});
      //   });
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex align-item-center justify-content-center ">
        <div className="w-50 border bg-white shadow px-5 pt-3 pb-4 rounded ">
          <h1 className="text-center">
            <u>{isCreate ? "Add User" : "update user"}</u>
          </h1>
          {isLoading && isUpdate ? (
            <div class="content">
              <div class="ball red"></div>
              <div class="ball green"></div>
              <div class="ball yellow"></div>
              <div class="ball blue"></div>
              <div class="ball emerald-green"></div>
              <div class="ball pink"></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label htmlFor="title" className="fw-bold mb-1">
                  Title:
                </label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Title"
                  onChange={handleChange}
                  value={values?.title}
                />
                {formErrors.title && (
                  <span className="text-danger">{formErrors.title}</span>
                )}
              </div>
              <div className="mb-2">
                <label htmlFor="fname" className="fw-bold mb-1">
                  Firts Name:
                </label>
                <input
                  type="taxt"
                  name="firstName"
                  className="form-control"
                  placeholder="Enter Firstname"
                  onChange={handleChange}
                  value={values?.firstName}
                />
                {formErrors.firstName && (
                  <span className="text-danger">{formErrors.firstName}</span>
                )}
              </div>
              <div className="mb-2">
                <label htmlFor="lname" className="fw-bold mb-1">
                  Last Name:
                </label>
                <input
                  type="taxt"
                  name="lastName"
                  className="form-control"
                  placeholder="Enter Lastname"
                  onChange={handleChange}
                  value={values?.lastName}
                />
                {formErrors.lastName && (
                  <span className="text-danger">{formErrors.lastName}</span>
                )}
              </div>
              <div className="mb-2">
                <label htmlFor="email" className="fw-bold mb-1">
                  E-mail:
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter E-mail"
                  onChange={handleChange}
                  value={values?.email}
                />
                {formErrors.email && (
                  <span className="text-danger">{formErrors.email}</span>
                )}
              </div>
              <div className="text-center mt-4">
                <button className="submitbtn me-2">Submit</button>
                <Link to="/Home" className="backbtn text-decoration-none">
                  Back
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddEdit;
