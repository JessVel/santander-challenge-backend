exports.getBeers = (req, res) => {
  let beers = 6;
  let order;
  const { temp, person } = req.body;
  console.log(req.body);

  try {
    if (temp > 24) {
      const amount = person * 2;

      if (amount <= beers) {
        order = Math.ceil(amount / beers + 0.5);
        res.json({ msg: "Your order was successful", order });
        return;
      }
      if (amount > beers) {
        order = Math.ceil(amount / beers + 0.5);
        res.json({ msg: "Your order was successful", order });
        return;
      }
    } else if (temp < 20) {
      const amount = person * 0.75;

      if (amount <= beers) {
        order = Math.ceil(amount / beers);
        res.json({ msg: "Your order was successful", order });
        return;
      }

      if (amount > beers) {
        order = Math.ceil(amount / beers);
        res.json({ msg: "Your order was successful", order });
        return;
      }
    } else {
      const amount = person;
      if (amount <= beers) {
        order = beers;
        res.json({ msg: "Your order was successful", order });
        return;
      }

      if (amount > beers) {
        order = Math.ceil(amount / beers + 0.5);
        res.json({ msg: "Your order was successful", order });
        return;
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "There's been an error. Try again later." });
  }
};
