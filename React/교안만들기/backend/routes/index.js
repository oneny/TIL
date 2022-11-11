const express = require("express");
const router = express.Router();
let data = require("../data/data.json");

const path = require("path");
const fsPromises = require("fs").promises;

// 사용자가 요청을 하면 서버에서 요청한 라우터로 옵니다.
router.get("/", (req, res) => {
  console.log('사용자가 요청했슴돠!'); // 터미널에 해당 콘솔이 찍힌거 보실 수 있습니다.
  // 그리고 서버에서 JSON 형태로 다시 요청한 사용자에게 보내줍니다.

  res.status(200).json({ data });
  // res.status(404).json({ "message": "줄거 없슴다 데이터!" });
});

router.post("/step", async (req, res) => {
  const { name, step } = req.body;
  console.log(name, step);
  if (!name || !step) return res.status(400).json({ "message": "name and step are required."});

  const recipes = data.map((recipe) => (
    (recipe.name === name)
      ? { ...recipe, steps: [...recipe.steps, step] }
      : recipe
  ));
  
  // try {
  //   await fsPromises.writeFile(
  //     path.join(__dirname, "..", "data", "data.json"),
  //     JSON.stringify(recipes),
  //   );
  //   console.log(recipes);
  // } catch (err) {
  //   res.status(500).json({ "message": err.message });
  // }
  // 아까 message로 보낸거 그냥 step으로 보냈습니다!
  res.status(201).json({ step });
  
});

router.post("/step/:name", (req, res) => {
  console.log('hi');
  const { content } = req.body;
  const name = req.params.name;
  console.log(content);

  data = data.map((recipe) => (
    (recipe.name === name)
     ? { ...recipe, steps: recipe.steps.filter(cont => cont !== content)}
     : recipe
  ));

  res.status(200).send({ message: "성공적으로 삭제" });
})

module.exports = router;