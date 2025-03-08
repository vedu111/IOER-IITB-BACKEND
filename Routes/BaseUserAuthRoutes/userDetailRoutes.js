import express from "express"
import { checkOrgLogin } from "../../middleware/orgAuthMiddleware.js";
import { organisationContactUpdate } from "../../controller/o-contact-info.js";
import { organisationAddItem } from "../../controller/o-addItem.js";
import { organisationAddSourceAd } from "../../controller/o-addSourceItem.js";
import { organisationAddDesteAd } from "../../controller/o-addDestItem.js";
import { organisationFetchInfo } from "../../controller/o-fetchinfo.js";


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

router.get("/api/v1/org/detailed/info",
  checkOrgLogin,
  organisationFetchInfo
)


export default router