import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      <section className="page_404">
        <div className="row">
          <div className="col-12">
            <div className="col-12 col-sm-offset-1  text-center">
              <div className="four_zero_four_bg"></div>
              <div className="contant_box_404">
                <h3 className="h2">Look like you're lost</h3>
                <Link to="/" className="link_404  text-decoration-none">
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Error;
