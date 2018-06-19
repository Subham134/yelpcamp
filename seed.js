var mongoose = require("mongoose");
var camping = require("./models/camp");
var Comment = require("./models/comment");
var data = [{name:"dawki",image:"https://images2.alphacoders.com/746/thumb-350-746357.jpg",description:"just fuck everything and work hard such that yiu can et your desired result in a given time and you can make your parentrs proud"},
{name:"himalaya",image:"https://images2.alphacoders.com/746/thumb-350-746357.jpg",description:"just fuck everything and work hard such that yiu can et your desired result in a given time and you can make your parentrs proud"},
{name:"ladhak",image:"https://images2.alphacoders.com/746/thumb-350-746357.jpg",description:"just fuck everything and work hard such that yiu can et your desired result in a given time and you can make your parentrs proud"}
];
function x(){
 camping.remove({},function(err,d){
//  if(err){
//      console.log("something went wrong ");
//  }else{
//  console.log("campgrounds removed");
//  data.forEach(function(n){
//      camping.create(n,function(err,nn){
//         if(err){
//             console.log(err);
//         }else{
//             console.log("campground created");
//             Comment.create({text:"this place can get better ",author:"subham"},function(err,nw){
//               if(err){
//                   console.log("something went wrong ");
//               }else{
//                   nn.comments.push(nw);
//                   nn.save();
//                   console.log("comments created");
//               }

//             });
//         }
//      });
//  });
// }
 });
}
module.exports=x;