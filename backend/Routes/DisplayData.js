const express = require('express')
const router = express.Router()
router.post("/foodData", async (req, res) => {
    try {
        console.log(global.foodiehubitems);
        res.send([global.foodiehubitems,global.foodcategories])
    } catch (error) {
        return res.status(500).send(error);
    }
})
module.exports=router;