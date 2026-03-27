import Request from "../models/requestSchema.js"

export const getMessage = async (req, res) => {
    try {
        const response = await Request.find();
        res.json({
            message: "Getting Message",
            response
        })

    } catch (error) {
        res.json({
            message: "Error Occured While Getting Message"
        })
    }
}


export const postMessage = async (req, res) => {
    try {
        const data = req.body
        const response = await Request.create(data);
        res.json({
            message: "Got Message",
            response
        })


    } catch (error) {
        res.json({
            message: "Error Occured While Posting Message",
            error
        })
    }
}