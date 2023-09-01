import React, { useEffect, useState } from "react";
import axios from "./axiosintence";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const Login = () => {
  useEffect(() => {
    document.title = "Sign In";
    if (localStorage.getItem("token")) {
      navigate("/Home");
    }
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setShowpassword] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const passwordvisibility = () => {
    setShowpassword(!showpassword);
  };

  const [formErrors, setFormErrors] = useState({});
  const validateForm = () => {
    const errors = {};
    if (!/\S+@\S+.\S+/.test(email)) {
      errors.email = "*Email is Required";
    }

    if (!password) {
      errors.password = "*Password is Required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // const validateEmail = () => {
  // if (!/\S+@\S+.\S+/.test(email)) {
  //   setEmailError("*Email is Required");
  // }
  // };

  // const validatePassword = () => {
  // if (!password) {
  //   setPasswordError("*Password is Required");
  // }
  // };

  // useEffect(() => {
  //   if (!localStorage.getItem("token")) {
  //     navigate("/");
  //   } else {
  //     navigate("/Home");
  //   }
  // });

  const handleApi = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      axios
        .post("https://reqres.in/api/login", {
          email: email,
          password: password,
        })
        .then((result) => {
          toast.success("Login Successfully !");
          localStorage.setItem("token", result.data.token);
          navigate("/Home");
        })
        .catch((err) => {
          toast.error(err.message, {});
        });

      if (!isButtonDisabled) {
        setIsButtonDisabled(true);

        setTimeout(() => {
          setIsButtonDisabled(false);
        }, 1000);
      }
    }
  };

  // if (!isSubmitting) {
  //   setIsSubmitting(true);

  //   setTimeout(() => {
  //     setIsSubmitting(false);
  //   }, 1500);
  // }
  // useEffect(() => {
  //   if (!localStorage.getItem("token")) {
  //     navigate("/");
  //   } else {
  //     navigate("/Home");
  //   }
  // });
  return (
    <>
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="d-flex justify-content-center">
              {" "}
              <GoogleOAuthProvider clientId="160543483122-ep7ts2bmu5m3vkncndm5a473nrt0tie4.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    var decoded = jwt_decode(credentialResponse.credential);

                    console.log(decoded);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </GoogleOAuthProvider>
            </div>
            <div className="form-group mt-3">
              <label>Email Address</label>
              <input
                onChange={handleEmail}
                value={email}
                type="email"
                className="form-control mt-1"
                placeholder="Email Address"
              />
              {formErrors.email && (
                <span className="error text-danger">{formErrors.email}</span>
              )}
            </div>
            <div className="form-group mt-3 emoji_r">
              <label>Password</label>
              <input
                onChange={handlePassword}
                value={password}
                type={showpassword ? "text" : "password"}
                className="form-control mt-1"
                placeholder="Password"
              />
              {formErrors.password && (
                <span className="error text-danger">{formErrors.password}</span>
              )}
              <div className="emoji_a" onClick={passwordvisibility}>
                {showpassword ? "🫣" : "😑"}
              </div>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                onClick={handleApi}
                type="submit"
                className="editbtn"
                disabled={isButtonDisabled}
              >
                {isButtonDisabled ? "Logging..." : "Login"}
              </button>
              {/* <Link to="/" className="editbtn text-center text-decoration-none">
                Sign Up
              </Link> */}
            </div>
            <div className="text-center mt-2">
              Not Registered yet?{" "}
              <Link to="/signup" className="text-decoration-none">
                <span className="link-primary pointr">Sign Up</span>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;

// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import axios from "./axiosintence";
// import { useNavigate, Link } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";
// import { toast } from "react-toastify";

// const Login = () => {
//   const navigate = useNavigate();

//   const handleApi = (values) => {
//     axios
//       .post("https://reqres.in/api/login", {
//         email: values.email,
//         password: values.password,
//       })
//       .then((result) => {
//         toast.success("Login Successfully !");
//         localStorage.setItem("token", result.data.token);
//         navigate("/Home");
//       })
//       .catch((err) => {
//         toast.error(err.message, {});
//       });
//   };

//   const validationSchema = Yup.object().shape({
//     email: Yup.string().email("*Invalid email").required("*Email is Required"),
//     password: Yup.string().required("*Password is Required"),
//   });

//   return (
//     <>
//       <div className="Auth-form-container">
//         <Formik
//           initialValues={{ email: "", password: "" }}
//           validationSchema={validationSchema}
//           onSubmit={(values, { setSubmitting }) => {
//             handleApi(values);
//             setSubmitting(false);
//           }}
//         >
//           {({ isSubmitting }) => (
//             <Form className="Auth-form">
//               <div className="Auth-form-content">
//                 <h3 className="Auth-form-title">Sign In</h3>

//                 <div className="form-group mt-3">
//                   <label>Email Address</label>
//                   <Field
//                     type="email"
//                     name="email"
//                     className="form-control mt-1"
//                     placeholder="Email Address"
//                   />
//                   <ErrorMessage
//                     name="email"
//                     component="span"
//                     className="error text-danger"
//                   />
//                 </div>
//                 <div className="form-group mt-3 emoji_r">
//                   <label>Password</label>
//                   <Field
//                     type="password"
//                     name="password"
//                     className="form-control mt-1"
//                     placeholder="Password"
//                   />
//                   <ErrorMessage
//                     name="password"
//                     component="span"
//                     className="error text-danger"
//                   />
//                   <div className="emoji_a">😑</div>
//                 </div>
//                 <div className="d-grid gap-2 mt-3">
//                   <button
//                     type="submit"
//                     className="editbtn"
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? "Logging in..." : "Login"}
//                   </button>
//                 </div>
//                 <div className="text-center mt-2">
//                   Not Registered yet?{" "}
//                   <Link to="/signup" className="text-decoration-none">
//                     <span className="link-primary pointr">Sign up</span>
//                   </Link>
//                 </div>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </>
//   );
// };

// export default Login;
