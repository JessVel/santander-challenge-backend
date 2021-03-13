const express = require("express");
const router = express.Router();
const vendorController = require("../controllers/vendor_controller");

// router.post("/", vendorController.getBeers);

router.post("/", vendorController.getBeers);

module.exports = router;
