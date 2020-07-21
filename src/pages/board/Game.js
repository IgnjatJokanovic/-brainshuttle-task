import React from "react";
import io from "socket.io-client";
import { fetchUser } from "../../Helpers";

export default function Game({ match }) {
  const socket = io(`http://178.128.206.150:7000/?id=${fetchUser().id}`);
  const [notification, setNotification] = React.useState("");
  const [freshMatrix, setFreshMatrix] = React.useState([]);
  const [board, setBoard] = React.useState({
    id: "",
    seat: 0,
    player: {
      id: "",
      name: "",
    },
    matrix: [],
  });
  const toggleNotification = (data) => {
    setNotification(data);
    setTimeout(() => {
      setNotification("");
    }, 2500);
  };

  const createMatrix = (data) => {
    var tmp = JSON.parse(data);
    var tmpArray = [];
    for (const item in tmp) {
      var obj = {
        position: item,
        value: tmp[item],
      };
      tmpArray.push(obj);
    }
    return tmpArray;
  };

  const leaveRoom = () => {
    socket.emit("leave_room", board.id, (responseCode) => {
      console.log(`Ack: ${responseCode}`);
    });
  };

  const leaveSeat = () => {
    socket.emit("leave_seat", board.id, (responseCode) => {
      console.log(`Ack: ${responseCode}`);
    });
  };

  const markTile = (tile) => {
    console.log(board.id);
    var position = parseInt(tile, 10);
    var data = tile.position + tile.value;
    console.log(typeof position);
    console.log(tile);
    console.log(parseInt(data, 10));
    socket.emit(
      "mark_tile",
      board.id,
      parseInt(tile.position, 10),
      (responseCode) => {
        console.log(`Ack: ${responseCode}`);
      }
    );
  };

  const restart = () => {
    socket.emit("restart", board.id, (responseCode) => {
      console.log(`Ack: ${responseCode}`);
    });
  };

  socket.on("left", (data) => {
    toggleNotification(`Player: ${data.player.name} has left the room.`);
    if (data.player.id == fetchUser().id) {
      window.location.href = "/rooms";
    }
  });

  socket.on("seat_left", (data) => {
    toggleNotification(`Player: ${data.player.name} has left the seat.`);
    setBoard({ ...board, seat: 0 });
  });

  socket.on("marked", (data) => {
    setBoard({ ...board, matrix: data.matrix });
  });

  socket.on("restarted", (data) => {
    setBoard({ ...board, matrix: freshMatrix });
  });

  socket.on("tie", (data) => {
    toggleNotification("Its draw");
  });

  socket.on("win", (data) => {
    toggleNotification(`Winner: ${data.player.name}.`);
  });

  React.useEffect(() => {
    socket.emit("join_room", match.params.slug, (responseCode) => {
      console.log(`Ack: ${responseCode}`);
      if (responseCode != 200) {
        window.location.href = "/rooms";
      }
    });
    socket.on("joined", (data) => {
      console.log(data);
      setBoard({
        id: data.board_id,
        seat: data.seat,
        player: data.player,
        matrix: createMatrix(data.matrix),
      });
      setFreshMatrix(createMatrix(data.matrix));
    });
  }, []);

  return (
    <div className="container">
      <div className="mt-5">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-2 col-md-3 col-sm-12  text-center mt-2">
            <button onClick={leaveRoom} className="btn btn-primary">
              Leave room
            </button>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-12 text-center mt-2">
            <button onClick={restart} className="btn btn-primary">
              Restart game
            </button>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-12  text-center mt-2">
            <button onClick={leaveSeat} className="btn btn-primary">
              Leave Seat
            </button>
          </div>
        </div>

        <h1>{notification}</h1>

        <div className="tile-container">
          {board.matrix.length ? (
            board.matrix.map((item, index) => (
              <div key={index} className="tile" onClick={() => markTile(item)}>
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
