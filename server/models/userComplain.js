
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const UserComplainSchema=new Schema({
    userId:{
        type:String
    },
    userAccount:{
        type:String
    },
    userProblem:{
        type:Number
    },
    userEmail:{
        type:String
    },
    userAvatar:{
        type:String
    },
    orderId:{
        type:String
    },
    problemDescription:{
        type:String
    },
    source:{
        type:String
    },
    status:{
        type:Number,
        default:0
    },
    staffName:{
        type:String
    },
    staffId:{
        type:String
    },
    staffImageUrl:{
        type:String
    },
    attributes:[{
        key:{
            type:String
        },
        value:{
            type:String
        }
    }],
    handler:{
        shortDescription:{
            type:String
        },
        solution:{
            type:String
        },
        comment:{
            type:String
        },
        reply:[{
            staffId:{
                type:String
            },
            staffName:{
                type:String
            },
            content:{
                type:String
            },
            staffImageUrl:{
                type:String
            }

            
        },{
            timestamps:true
        }]
    }
},{
    timestamps: true
})

module.exports = (db) => {
    if (!db.models.UserComplain) {
        return db.model('UserComplain', UserComplainSchema)
    }
    return db.models.UserComplain
}