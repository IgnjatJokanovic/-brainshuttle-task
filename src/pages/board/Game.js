import React from "react";
import io from "socket.io-client";
import { fetchUser } from "../../Helpers";

export default function Game({ match }) {
  const socket = io(`http://178.128.206.150:7000/?id=${fetchUser().id}`);
  const [matrix, setMatrix] = React.useState([]);
  const [room, setRoom] = React.useState("");
  console.log(matrix);

  const createMatrix = (data) => {
    setMatrix([]);
    var tmp = JSON.parse(data);
    var tmpArray = [];
    for (const item in tmp) {
      var obj = {
        position: item,
        value: tmp[item],
      };
      tmpArray.push(obj);
    }
    setMatrix(tmpArray);
  };

  const leaveRoom = () => {
    socket.emit("leave_room", match.params.slug, (responseCode) => {
      console.log(`Ack: ${responseCode}`);
    });
  };

  const leaveSeat = () => {
    socket.emit("leave_seat", match.params.slug, (responseCode) => {
      console.log(`Ack: ${responseCode}`);
    });
  };

  const markTile = () => {
    socket.emit("mark_tile", match.params.slug, (responseCode) => {
      console.log(`Ack: ${responseCode}`);
    });
  };

  const restart = () => {
    socket.emit("restart", match.params.slug, (responseCode) => {
      console.log(`Ack: ${responseCode}`);
    });
  };

  React.useEffect(() => {
    setRoom(match.params.slug);
    socket.emit("join_room", match.params.slug, (responseCode) => {
      console.log(`Ack: ${responseCode}`);
      if (responseCode != 200) {
        window.location.href = "/rooms";
      }
    });
    socket.on("joined", (data) => {
      createMatrix(data.matrix);
    });
  }, []);

  return (
    <div className="container">
      <div className="mt-5">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-2 col-md-3 col-sm-12  text-center mt-2">
            <button className="btn btn-primary">Leave room</button>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-12 text-center mt-2">
            <button className="btn btn-primary">Restart game</button>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-12  text-center mt-2">
            <button className="btn btn-primary">Leave Seat</button>
          </div>
        </div>

        <div className="tile-container">
          {matrix.length ? (
            matrix.map((item, index) => (
              <div key={index} className="tile">
                {item.value == 1 ? "X" : ""}
                {item.value == 0 ? "" : ""}
                {item.value == 2 ? "O" : ""}
              </div>
            ))
          ) : (
            <h1>Error</h1>
          )}
        </div>
      </div>
    </div>
  );
}
