const getErrorResponse = ({response, code, message})=>{
    return response.status(code).json({
        error: true,
        message: message,
        data: null,
      });
}

const getSuccessResponse = ({response, code, message, data=null})=>{
    return response.status(code).json({
        error: false,
        message: message,
        data,
      });
}

module.exports = {getErrorResponse, getSuccessResponse}