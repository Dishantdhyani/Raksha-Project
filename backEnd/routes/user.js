import { Router } from "express";
import { v1 as uuidv1 } from "uuid";
import { createUser, getUser } from "./../model/userDetail.js";
import { validateUser, doesUserExist } from "./../model/login.js";
import { createEmergencyDetail } from "./../model/userEmergency.js";
import {} from "./../model/userDetail.js";
import DATABASE from "./../utilities/createDb.js";

const router = Router();

const dbInstance = new DATABASE(); // Singleton instance
if (!dbInstance.db) {
  await dbInstance.initDB(); // Wait for the database initialization
}
const db = dbInstance.getConnection(); // Reuse the existing connection from the singleton

router.post("/createUser", (req, res) => {
  var userDetail = {
    id: uuidv1(),
    email: req.body.email,
    phone_num: req.body.phone_num,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
  };

  doesUserExist(userDetail.email, db, (result) => {
    if (result) {
      res.send("User already exists");
    } else {
      createUser(
        userDetail.id,
        userDetail.email,
        userDetail.password,
        userDetail.phone_num,
        userDetail.first_name,
        userDetail.last_name,
        false,
        db,
        (result) => {
          if (result) {
            res.send(result);
          } else {
            res.send("Error creating user");
          }
        },
      );
    }
  });
});

router.post("/validateLogin", (req, res) => {
  var userDetail = {
    email: req.body.email,
    password: req.body.password,
  };

  validateUser(userDetail.email, userDetail.password, db, (result) => {
    if (result) {
      getUser(userDetail.email, db, (result) => {
        if (result) {
          res.send(result);
        } else {
          res.send(null);
        }
      });
    } else {
      res.send(null);
    }
  });
});

router.post("/createEmergency", (req, res) => {
  var userDetail = {
    id: uuidv1(),
    email: req.body.email,
    emergency_name: req.body.emergency_name,
    emergency_email: req.body.emergency_email,
    emergency_phone_num: req.body.emergency_phone_num,
  };

  doesUserExist(userDetail.email, db, (result) => {
    if (result) {
      createEmergencyDetail(
        userDetail.id,
        userDetail.email,
        userDetail.emergency_name,
        userDetail.emergency_email,
        userDetail.emergency_phone_num,
        db,
        (result) => {
          if (result) {
            res.send(result);
          } else {
            res.send("Error creating emergency details");
          }
        },
      );
    } else {
      res.send("User doesn't exists");
    }
  });
});

export default router;
