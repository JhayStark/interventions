const { connect} = require("mongoose")

 async function dbConnect(){
    try {
        await connect('mongodb://localhost:27017/',{
            dbName:"Pharm_Interventions"
        })
        console.log("database connected successfully")
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = { dbConnect}
