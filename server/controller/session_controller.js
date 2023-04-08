const Session = require('../models/session_model');

const fnAddSession = async (req, res) => {
    const {survey} = req.body
    try{
        const data = new Session({
            surveyList: survey
        })

        data.save()

        res.status(200).json({
            code: 1,
            message: "SUCCESS",
            data: data
        })


    }catch(err){
        res.status(400).json({
            code: 0,
            message: "ERROR",
            err: err
        })
    }
    
   
  
}

const fnUpdateSession = async (req, res) => {
    const { sessionId, survey } = req.body
    try{
        const data = await Session.findByIdAndUpdate(
            {_id: sessionId},
            {surveyList: survey},
            {new: true})

        if(data){
            res.status(200).json({
                code: 1,
                message: "UPDATED",
                err: data
            })
        }else{
            res.status(200).json({
                code: 1,
                message: "UNABLE TO UPDATE"
            })

        }    
       


    }catch(err){
        res.status(400).json({
            code: 0,
            message: "ERROR",
            err: err
        })

    }
   
  }
  

const fnGetSession = async (req, res) => {

    const { sessionId } = req.query
    try{
        const data = await Session.findOne({_id: sessionId})

        if(data){
            res.status(200).json({
                code: 1,
                message: "SUCCESS",
                data: data
            })
        }else{
            res.status(200).json({
                code: 1,
                message: "DATA NOT FOUND"
            })
            
        }

      


    }catch(err){
        res.status(400).json({
            code: 0,
            message: "ERROR",
            err: err
        })

    }
   
}


module.exports = {
    fnAddSession,
    fnUpdateSession,
    fnGetSession
};