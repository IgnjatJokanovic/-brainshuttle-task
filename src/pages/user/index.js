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
            createUser(res.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => setCreateErr(err));
  };
  return (
    <div className="container mt-5">
      {isAuthenticated() ? (
        <div className="w-50 mx-auto">
          <form
            className="w-50 mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              createPlayer();
            }}
          >
            <h1>Create Player</h1>
            <input onChange={(e) => setName(e.target.value)} type="text" />
            {createErr != "" ? (
              <div className="mt-1 alert alert-danger text-center">
                {createErr}
              </div>
            ) : null}
            <input
              className="mt-2 mx-auto btn btn-primary"
              type="submit"
              value="Create"
            />
          </form>
        </div>
      ) : (
        <div className="w-50 mx-auto">
          <h1 className="text-center">Please Register</h1>
          <div className="d-flex">
            <button onClick={register} className="btn btn-primary mx-auto">
              Register
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
