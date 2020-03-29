const express = require("express");

require("dotenv").config();

const app = express();
const bodyParser = require("body-parser");
const connection = require("./database");

app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.get("/", (req, res) => res.send("Hello World!"));

app.route("/users/:userId/:userName").get(function(req, res, next) {
  const q =
    "INSERT INTO users VALUES (" +
    req.params.userId +
    ", " +
    '"' +
    req.params.userName +
    '");';
  connection.query(
    q,
    // req.params.userId,
    function(error, results, fields) {
      if (error) {
        //   throw error;
        res.json(error);
      }
      res.json(results);
    }
  );
});

app.route("/users").get(function(req, res, next) {
  const q = "select * from users;";
  connection.query(q, function(error, results, fields) {
    if (error) {
      //   throw error;
      res.json(error);
    }
    res.json(results);
  });
});

app.route("/quests").get(function(req, res, next) {
  const q = "select * from quests;";
  connection.query(q, function(error, results, fields) {
    if (error) {
      //   throw error;
      res.json(error);
    }
    res.json(results);
  });
});

app.route("/quests/:userId/:questId").get(function(req, res, next) {
  const q =
    "INSERT INTO quests VALUES (" +
    req.params.userId +
    ", " +
    '"' +
    req.params.questId +
    '");';
  connection.query(
    q,
    // req.params.userId,
    function(error, results, fields) {
      if (error) {
        //   throw error;
        res.json(error);
      }
      res.json(results);
    }
  );
});

app.route("/attempts/:userId/:questId").get(function(req, res, next) {
  const q =
    "INSERT INTO attempts VALUES (" +
    req.params.userId +
    ", " +
    '"' +
    req.params.questId +
    '");';
  connection.query(
    q,
    // req.params.userId,
    function(error, results, fields) {
      if (error) {
        //   throw error;
        res.json(error);
      }
      res.json(results);
    }
  );
});

app.route("/attempts").get(function(req, res, next) {
  const q = "select * from attempts;";
  connection.query(q, function(error, results, fields) {
    if (error) {
      //   throw error;
      res.json(error);
    }
    res.json(results);
  });
});

app.route("/votes/:userId/:optionNumber").get(function(req, res, next) {
  const q =
    "INSERT INTO votes VALUES (" +
    req.params.userId +
    ", " +
    '"' +
    req.params.optionNumber +
    '");';
  connection.query(
    q,
    // req.params.userId,
    function(error, results, fields) {
      if (error) {
        //   throw error;
        res.json(error);
      }
      res.json(results);
    }
  );
});

app.route("/votes").get(function(req, res, next) {
  const q = "select * from votes;";
  connection.query(q, function(error, results, fields) {
    if (error) {
      //   throw error;
      res.json(error);
    }
    res.json(results);
  });
});

app.route("/attempts/count").get(function(req, res, next) {
  const q = "select count(*) as num_attempts from attempts;";
  connection.query(q, function(error, results, fields) {
    if (error) {
      //   throw error;
      res.json(error);
    }
    res.json(results);
  });
});

app.route("/reset/users").get(function(req, res, next) {
  const q = "delete from users;";
  connection.query(q, function(error, results, fields) {
    if (error) {
      //   throw error;
      res.json(error);
    }
    res.json(results);
  });
});
app.route("/reset/attempts").get(function(req, res, next) {
  const q = "delete from attempts;";
  connection.query(q, function(error, results, fields) {
    if (error) {
      //   throw error;
      res.json(error);
    }
    res.json(results);
  });
});
app.route("/reset/quests").get(function(req, res, next) {
  const q = "delete from quests;";
  connection.query(q, function(error, results, fields) {
    if (error) {
      //   throw error;
      res.json(error);
    }
    res.json(results);
  });
});

app.route("/reset/votes").get(function(req, res, next) {
  const q = "delete from votes;";
  connection.query(q, function(error, results, fields) {
    if (error) {
      //   throw error;
      res.json(error);
    }
    res.json(results);
  });
});

app.get("/status", (req, res) => res.send("Working!"));

// Port 8080 for Google App Engine
app.set("port", process.env.PORT || 3000);
app.listen(3000, () => console.log("Example app listening on port 3000!"));
