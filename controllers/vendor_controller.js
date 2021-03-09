exports.getBeers = (req, res) => {
  let beers;
  const {temp, person} = req.body;

  try {
    if (temp > 24) {
      beers = 2 * person + person / 2;
      res.json({msg: beers});
      console.log(beers);
      return;
    } else if (temp < 20) {
      beers = 0.75 * person + person / 2;
      res.json({msg: beers});
      console.log(beers);
      return;
    } else {
      beers = 1 * person + person / 2;
      res.json({msg: beers});
      console.log(beers);
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({msg: "There's been an error. Try again later."});
  }
};
