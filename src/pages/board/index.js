import React from "react";
import axios from "axios";
import { isAuthenticated, getToken } from "../../Helpers";
import { Link } from "react-router-dom";

export default function Index() {
  const [boards, setBoards] = React.useState([]);
  const createBoard = () => {
    axios
      .post("http://178.128.206.150:7000/create_board", { apikey: getToken() })
      .then((res) => window.location.reload())
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    axios
      .post("http://178.128.206.150:7000/boards", { apikey: getToken() })
      .then((res) => {
        if (res.data != []) {
          setBoards(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="container mt-5">
      {isAuthenticated() ? (
        <>
          <div className="row justify-content-center">
            <div className="col-lg-2 col-md-3 col-sm2 text-center">
              <button onClick={createBoard} className="btn btn-primary">
                Create Board
              </button>
            </div>
          </div>

          <div className="row mt-5">
            {boards.map((item, index) => (
              <div
                key={index}
                className="col-lg-3 col-md-3 col-sm-1 text-center"
              >
                {item.players != 2 ? (
                  <Link className="btn btn-primary" to={`/rooms/${item.id}`}>
                    Join room {index + 1}
                  </Link>
                ) : (
                  <p className="btn btn-primary mb-0">Join room {index + 1}</p>
                )}

                <p className="mt-1">Players: {item.players}/2</p>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
