const not_supported = (req,res,next) => next({msg:"not supported yet",status:405});
const not_a_service = (req,res,next) => next({msg:"not such service",status:405});

module.exports ={
    not_supported,
    not_a_service
}