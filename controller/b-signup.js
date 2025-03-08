


export const baseUserSignup=async(req,res)=>{
  try {
    const data  = req.body
    res.send(data)
  } catch (error) {
    console.log(error)
  }
}