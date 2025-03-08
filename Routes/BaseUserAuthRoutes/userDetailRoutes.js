import express from "express"
import { checkOrgLogin } from "../../middleware/orgAuthMiddleware.js";
import { organisationContactUpdate } from "../../controller/o-contact-info.js";
import { organisationAddItem } from "../../controller/o-addItem.js";
import { organisationAddSourceAd } from "../../controller/o-addSourceItem.js";
import { organisationAddDesteAd } from "../../controller/o-addDestItem.js";


const router = express.Router();


router.post("/api/v1/org/contactInfo",
  checkOrgLogin,
  organisationContactUpdate
)

router.post("/api/v1/org/add/item",
  checkOrgLogin,
  organisationAddItem
)


router.post("/api/v1/org/add/source",
  checkOrgLogin,
  organisationAddSourceAd
)

router.post("/api/v1/org/add/destination",
  checkOrgLogin,
  organisationAddDesteAd
)


export default router