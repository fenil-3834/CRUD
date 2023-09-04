import React, { useEffect, useState } from "react";
import axios from "./axiosintence";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const Signup = () => {
  useEffect(() => {
    document.title = "Sign Up";
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

  const handleApi = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      axios
        .post("https://reqres.in/api/register", {
          email: email,
          password: password,
        })
        .then(() => {
          toast.success("Register Successfully !");
          navigate("/");
        })
        .catch((err) => {
          toast.error(err.message, {});
        });

      if (!isButtonDisabled) {
        setIsButtonDisabled(true);

        setTimeout(() => {
          setIsButtonDisabled(false);
        }, 1500);
      }
    }
  };

  return (
    <>
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
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
                {isButtonDisabled ? "Register..." : "Register"}
              </button>
              {/* <Link to="/" className="editbtn text-center text-decoration-none">
                Sign Up
              </Link> */}
            </div>
            <div className="text-center mt-2">
              Already Registered?{" "}
              <Link to="/" className="text-decoration-none">
                <span className="link-primary pointr">Sign In</span>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;

// import React, { useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import jwt_decode from "jwt-decode";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup"; // Import Yup for form validation

// const Signup = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     document.title = "Sign Up";
//     if (localStorage.getItem("token")) {
//       navigate("/Home");
//     }
//   }, []);

//   // Schema for form validation
//   const validationSchema = Yup.object().shape({
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     password: Yup.string().required("Password is required"),
//   });

//   const handleApi = (values) => {
//     // Simulate API call
//     setTimeout(() => {
//       toast.success("Register Successfully !");
//       navigate("/");
//     }, 1500);
//   };

//   return (
//     <div className="Auth-form-container">
//       <Formik
//         initialValues={{ email: "", password: "" }}
//         validationSchema={validationSchema}
//         onSubmit={(values, { setSubmitting }) => {
//           handleApi(values);
//           setSubmitting(false);
//         }}
//       >
//         {({ isSubmitting }) => (
//           <Form className="Auth-form">
//             <div className="Auth-form-content">
//               <h3 className="Auth-form-title">Sign Up</h3>
//               <div className="d-flex justify-content-center">
//                 <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
//                   <GoogleLogin
//                     onSuccess={(credentialResponse) => {
//                       var decoded = jwt_decode(credentialResponse.credential);
//                       console.log(decoded);
//                     }}
//                     onError={() => {
//                       console.log("Login Failed");
//                     }}
//                   />
//                 </GoogleOAuthProvider>
//               </div>
//               <div className="form-group mt-3">
//                 <label>Email Address</label>
//                 <Field
//                   type="email"
//                   name="email"
//                   className="form-control mt-1"
//                   placeholder="Email Address"
//                 />
//                 <ErrorMessage
//                   name="email"
//                   component="span"
//                   className="error text-danger"
//                 />
//               </div>
//               <div className="form-group mt-3 emoji_r">
//                 <label>Password</label>
//                 <Field
//                   type="password"
//                   name="password"
//                   className="form-control mt-1"
//                   placeholder="Password"
//                 />
//                 <ErrorMessage
//                   name="password"
//                   component="span"
//                   className="error text-danger"
//                 />
//               </div>
//               <div className="d-grid gap-2 mt-3">
//                 <button
//                   type="submit"
//                   className="editbtn"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? "Register..." : "Register"}
//                 </button>
//               </div>
//               <div className="text-center mt-2">
//                 Already Registered?{" "}
//                 <Link to="/" className="text-decoration-none">
//                   <span className="link-primary pointr">Sign In</span>
//                 </Link>
//               </div>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default Signup;
