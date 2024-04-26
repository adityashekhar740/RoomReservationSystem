const mongoose=require('mongoose');

const roomSchema=new mongoose.Schema({
    type:{
        type:String,
        required:true
    },
     amenities:{
            type:Array,
        },
    userRef:{
        type:Array,
        default:[],
          validate:{
                validator:function(arr){
                    return arr.length<=2;
                }
            }

    }
})

const room=mongoose.model('room',roomSchema);

module.exports=room;