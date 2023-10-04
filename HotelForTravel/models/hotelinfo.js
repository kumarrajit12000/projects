const mongoose = require("mongoose");
const schema = mongoose.Schema;

const hotelinfoSchema = new schema({
    title : {
       type: String,
       required : true,
         },
    description : String,
    image :{
        type: String,
        Set : (Ety) => Ety === "" ? "https://www.bing.com/images/search?view=detailV2&ccid=HA51aC03&id=2ADA2DB3615F164A106AF5579C8E2660BAC80A68&thid=OIP.HA51aC03AYFnHW5KY8R1OAHaEK&mediaurl=https%3a%2f%2fwallpaperaccess.com%2ffull%2f1194086.jpg&exph=2160&expw=3840&q=beatch+img&simid=608000029165377904&FORM=IRPRST&ck=ECCCAC0370D0BF752BF0D46A18590A1A&selectedIndex=4" : Ety,
         },
    price : Number,
    location : String,
    country : String,
});

const hotelinfo = mongoose.model("hotelinfo", hotelinfoSchema);

module.exports = hotelinfo;