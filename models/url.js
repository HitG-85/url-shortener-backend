const mongoose=require ('mongoose');

const urlSchema = mongoose.Schema(
    {
        shortened: {
            type: String,
            required :true,
            unique: true,
        },
        redirected: {
            type: String,
            required: true,

        },
        logs: [ {timestamp: {type: Number}} ],   
    },


    {timestamps: true}
);
const Url = mongoose.model('Url', urlSchema);
module.exports=Url;


