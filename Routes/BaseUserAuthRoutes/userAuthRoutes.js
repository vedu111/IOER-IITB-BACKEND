import express from "express"
import { baseUserSignup } from "../../controller/b-signup.js";
import { organisationSignup } from "../../controller/o-signup.js";
import { organisationLogin } from "../../controller/o-login.js";


const router = express.Router();


//baseUserSignup
router.post("/api/v1/base/signup",
  baseUserSignup
)

//OraganisationSignup
router.post("/api/v1/org/signup",
  organisationSignup
)

//OraganisationLogin
router.post("/api/v1/org/login",
  organisationLogin
)



export default router