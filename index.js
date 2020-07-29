let app = require("express")();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
//  mongodb+srv://root:<password>@ch-reg-kxvgw.mongodb.net/<dbname>?retryWrites=true&w=majority

let conn =
  "mongodb+srv://root:root@ch-reg-kxvgw.mongodb.net/church_seat_booking?retryWrites=true&w=majority";

mongoose.connect(conn, {}, (err) => {
  if (err) console.log("Connection Error!");
  console.log("Connected to mongolab");
});

//Church Model
const churchSchema = mongoose.Schema({
  name: String,
  total_seats: Number,
  available_seats: Number,
  n_services: Number,
  address: String,
  contact_person: String,
});
const Church = mongoose.model("Church", churchSchema);

//==================================================

app.get("/", (req, res) => {
  console.log("dada");
  res.end();
});

//List all the churches
app.get("/churches", (req, res) => {
  console.log("List of churches");
  Church.find((err, list_ch) => {
    if (err) console.error(err);
    res.send(list_ch);
  });
});

//Find by ID
app.get("/churches/:id", (req, res) => {
  console.log(req.params);
  Church.findById(req.params.id, (err, chu) => {
    if (err) console.error(err);
    res.send(chu);
  });
});

//Create achurch
app.post("/churches", (req, res) => {
  // console.log(JSON.stringify(req.body));
  const newChurch = new Church(req.body);
  newChurch.save((err, ch) => {
    if (err) console.error(err);
    console.log(ch);
  });
  res.send(req.body);
});

app.listen("3000", () => {
  console.log("running at 3000");
});
