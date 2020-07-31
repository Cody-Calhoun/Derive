import React, { useState } from "react";
import axios from "axios";
import { navigate, Link } from "@reach/router";
import RegistrationForm from "../components/RegistrationForm";
import airplane from "../images/airplane.png";
import derive from "../images/derive.png";
import jwt_decode from 'jwt-decode';
// import ls from 'local-storage'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

//   const useStateWithLocalStorage = localStorageKey => {
//     const [value, setValue] = useState(
//       localStorage.getItem(localStorageKey) || ''
//     );
//     const [value, setValue] = useStateWithLocalStorage(
//         'myValueInLocalStorage'
//       );

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(
        "http://localhost:8000/api/users/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then(res => {
          var decoded = jwt_decode(res.data.token)
        //   console.log(decoded)
        //   console.log(res)
        localStorage.setItem("token", decoded)
        navigate("/my_Trips")})
      .catch(() => setErr("Please check your credentials"));
    // axios.post(url, { email, password }, { withCredentials: true })
    //     .then(res => {
    //         ls.set('token', res.data.token);// something like this
    //         navigate('/user/dashboard');
    //     })
  }

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-sm navbar-light bg-white">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link to="/">
          <img src={derive} alt="derive" className="nav-logo" />
        </Link>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">
                Home <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="#">
                About Us <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item active">
              <a
                class="nav-link"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              >
                Contact Us <span class="sr-only">(current)</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {err && <p style={{ color: "red" }}>{err}</p>}

      <div className="travel-warning">
        <div className="row bg-warning">
          <div className="col">
            <p>
              Travel Advisory in affect. Before planning trip, please visit{" "}
              <a href="https://www.cdc.gov/coronavirus/2019-ncov/travelers/index.html">
                HERE
              </a>{" "}
              to assure safe travels.
            </p>
          </div>
        </div>
      </div>

      {/* <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email</label>
                <input 
                type="text" 
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input 
                type="password" 
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                />
            </div>
            <Link to='/register'><button>register</button></Link>
            <button>Submit</button>
        </form> */}
      {/* <RegistrationForm/> */}
      {/* <div class="container-fluid"> */}
      <div className="main-login">
        <div className="login-box float-right">
          <div className="row">
            <div className="col-lg-10 login-section-wrapper ">
              <div className="brand-wrapper">
                <img src={derive} alt="company logo" className="logo" />
              </div>
              <div className="login-wrapper my-auto">
                <h1 className="login-title">Log in</h1>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label for="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="form-control"
                      placeholder="email@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label for="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="form-control"
                      placeholder="enter your passsword"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>
                  <input
                    name="login"
                    id="login"
                    className="btn btn-block login-btn"
                    type="Submit"
                    value="Login"
                  />
                </form>
                {/* this is something to work on and figure out */}
                <Link to="/" className="forgot-password-link">
                  Forgot password?
                </Link>
                <p class="login-wrapper-footer-text">
                  Don't have an account?{" "}
                  <Link to="/user/register">Register here</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}

      <footer>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link to="">
                Home <span class="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="">
                About us<span class="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="">
                Contact us <span class="sr-only">(current)</span>
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
