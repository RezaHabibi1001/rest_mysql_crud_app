import express from "express";
import mysql from "mysql";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "exir",
});


// select all users database ------------------------------[1]
app.get("/users", (req, res) => {
  const query = "SELECT *  FROM user";
  db.query(query, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
});

//  delete a user from database ----------------------------[2]
app.delete("/deleteUser/:id", (req, res) => {
  const ID = req.params.id;
  const query = "DELETE FROM user WHERE id = ?";
  db.query(query, [ID], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json("user has been deleted successfully");
  });
});

// insert a user to database -------------------------------[3]
app.post("/insertUser", (req, res) => {
  const values = [
    req.body.name,
    req.body.username,
    req.body.role,
    req.body.password,
  ];
  const query = "INSERT INTO  user ( `name` ,`username`,`role` , `password`) VALUES (?) ";
  db.query(query, [values], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json("user has been added successfully !!!");
    }
  });
});

// update a user from database -----------------------------[4]
app.put("/updateUser/:id", (req, res) => {
  const userId = req.params.id;
  const values = [
    req.body.name,
    req.body.username,
    req.body.role,
    req.body.password,
  ];
  const query =
    "UPDATE users SET `name`= ? , `username` = ? , `role` = ? , `password` = ?  WHERE id = ? ";
  db.query(query, [...values, userId], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json("user has been updated successfully !!!");
    }
  });
});

app.listen(4000, () => {
  console.log("App is running on port 4000");
});
