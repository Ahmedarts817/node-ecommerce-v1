const globalError = (err,req,res,next)=>{
    err.status = err.send || 'error'
    err.statusCode = err.statusCode || 500
   if (process.env.NODE_ENV === "development") {
    sendErrorForDev(err,res)
   }else{
    sendErrorForProd(err,res)
   }
  }


  const sendErrorForDev = (err,res)=>{
    return  res.status(err.statusCode).json({
      status : err.status,
      error : err,
      message : err.message,
      stack : err.stack
  
    })
  }
  const sendErrorForProd = (err,res)=>{
    return  res.status(err.statusCode).json({
      status : err.status,
      message : err.message,
  
    })
  }
  module.exports = globalError