import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { updateProfil } from "../../redux/authSlice";
import logo from "../../img/argentBankLogo.png";
import { Link } from "react-router-dom";
import Card from "./Card";
import { useSelector } from "react-redux";
import { changeProfil } from "../../redux/authSlice";

function Profile() {
  const data = useSelector((state) => state.UserState);
  const [user, setUser] = React.useState({
    firstName: "",
    lastName: "",
  });
  const dispatch = useDispatch();
  const URL = "http://localhost:3001/api/v1/user/profile";

  React.useEffect((response) => {
    async function GetProfil() {
      axios
        .post(URL, response, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })

        .then(function(response) {
          dispatch(
            updateProfil({
              ...data,
              firstName: response.data.body.firstName,
              lastName: response.data.body.lastName,
            })
          );
          setUser(response.data.body);
        })
        .catch(console.log);
    }
    GetProfil();
  }, []);

  const first = user.firstName;
  const last = user.lastName;

  const handleSignOut = () => {
    localStorage.clear();
    window.location = "/";
  };

  //Edit name
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [isClicked, setIsClicked] = React.useState(false);

  const showContent = () => {
    setIsClicked((isClicked) => !isClicked);
  };

  const handleChangeFirst = (e) => {
    setFirstName(e.target.value);
  };

  async function EditName(res) {
    console.log("res", res);

    const response = await axios.put(
      URL,
      { firstName: firstName, lastName: lastName },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    dispatch(
      changeProfil({
        ...data,
        firstName: firstName,
        lastName: lastName,
      })
    );
    console.log(firstName, first);
    window.location.reload();
  }

  return (
    <>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          <a className="main-nav-item" href="./user.html">
            <i className="fa fa-user-circle"></i>
            {`${first} ${last}`}
          </a>
          <Link className="main-nav-item" onClick={handleSignOut}>
            <i className="fa fa-sign-out"></i>
            Sign Out
          </Link>
        </div>
      </nav>
      <main>
        <div className="header">
          <h1>
            Welcome back
            <br />
            {`${first} ${last}`}
          </h1>
          <button onClick={showContent} className="edit-button">
            Edit Name
          </button>
          {isClicked && (
            <div className="edit-section">
              <div className="container-input">
                <input
                  onChange={handleChangeFirst}
                  type="text"
                  value={firstName}
                  placeholder={first}
                />

                <input
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  value={lastName}
                  placeholder={last}
                />
              </div>

              <div className="container-buttons">
                <button onClick={EditName}>Save</button>
                <button onClick={showContent}>Cancel</button>
              </div>
            </div>
          )}
        </div>
        <Card />
      </main>
    </>
  );
}

export default Profile;
