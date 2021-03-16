exports.getBeers = (req, res) => {
  let beers = 6;
  let order = 1;
  const { temp, person } = req.body;

  try {
    if (temp > 24) {
      const amount = parseInt(person) * 2;
      if (amount > beers) {
        order = Math.ceil(amount / beers);
        return res.status(200).json({ msg: `Your order was successful, ${order}` });
      } else {
        return res.status(200).json({ msg: `Your order was successful, ${order}` });
      }
    } else if (temp < 20) {
      const amount = parseInt(person) * 0.75;
      if (amount > beers) {
        order = Math.ceil(amount / beers);
        return res.status(200).json({ msg: `Your order was successful, ${order}` });
      } else {
        return res.status(200).json({ msg: `Your order was successful, ${order}` });
      }
    } else {
      const amount = parseInt(person) + 1;
      if (amount > beers) {
        order = Math.ceil(amount / beers);
        return res.status(200).json({ msg: `Your order was successful, ${order}` });
      } else {
        return res.status(200).json({ msg: `Your order was successful, ${order}` });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "There's been an error. Try again later." });
  }
};
