const express = require("express");
const router = express.Router();

let goals = [
  {
    id: 1,
    name: "Goal 1",
    targetCount: 100,
    currentCount: 50,
    type: "Year",
  },
  {
    id: 2,
    name: "Goal 2",
    targetCount: 200,
    currentCount: 150,
    type: "Month",
  },
];

router.get("/", (req, res) => {
  res.json(goals);
});

router.get("/:id", (req, res) => {
  const goal = goals.find((g) => g.id === Number(req.params.id));
  res.json(goal);
});

router.post("/", (req, res) => {
  const newGoal = req.body;
  newGoal.id = Date.now();
  goals.push(newGoal);
  res.json(newGoal);
});

router.put("/:id", (req, res) => {
  const index = goals.findIndex((g) => g.id === Number(req.params.id));
  goals[index] = req.body;
  res.json(goals[index]);
});

router.delete("/:id", (req, res) => {
  goals = goals.filter((g) => g.id !== Number(req.params.id));
  res.json({ message: "Goal deleted" });
});

module.exports = router;
