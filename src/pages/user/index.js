import React from "react";
import {
  setToken,
  getToken,
  isAuthenticated,
  validateUser,
  createUser,
} from "../../Helpers";
import axios from "axios";

export default function Index() {
  const [name, setName] = React.useState("");
  const [registerErr, setRegisterErr] = React.useState("");
  const [createErr, setCreateErr] = React.useState("");
  const register = () => {
    axios
      .post("http://178.128.206.150:7000/register_candidate")
      .then((res) => {
        setToken(res.data.apikey);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  const createPlayer = () => {
    validateUser(name)
      .then(() => {
        axios
          .post("http://178.128.206.150:7000/player", {
            name: name,
            apikey: getToken(),
          })
          .then((res) => {
            setCreateErr("");
            window.location.href = "/rooms";
            createUser(res.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => setCreateErr(err));
  };
  return (
    <div className="container mt-5">
      {isAuthenticated() ? (
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-8 col-sm-5">
            <form
              className="row  justify-content-center"
              onSubmit={(e) => {
                e.preventDefault();
                createPlayer();
              }}
            >
              <h1 className="text-center">Create Player</h1>
              <div className="col-12">
                <div className="mx-auto w-70">
                  <input
                    className="w-100"
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                  />
                </div>
              </div>

              <div className="col-12">
                {createErr != "" ? (
                  <div className="mt-1 alert alert-danger text-center">
                    {createErr}
                  </div>
                ) : null}
              </div>

              <input
                className="mt-2 mx-auto btn btn-primary"
                type="submit"
                value="Create"
              />
            </form>
          </div>
        </div>
      ) : (
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-8 col-sm-5">
            <h1 className="text-center">Please Register</h1>
            <div className="d-flex">
              <button onClick={register} className="btn btn-primary mx-auto">
                Register
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
