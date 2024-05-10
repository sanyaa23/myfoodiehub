// // const mongoose = require('mongoose');

// // const password = encodeURIComponent('Sanya776282#');
// // const mongoURI = `mongodb+srv://sanya20223234:${password}@cluster0.vffpzlx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// // const mongoDB = async () => {
// //     try {
// //         await mongoose.connect(mongoURI);
// //         console.log("Connected to MongoDB");
// //     } catch (error) {
// //         console.error("Error connecting to MongoDB:", error);
// //     }
// // };

// // module.exports = mongoDB;
// const mongoose = require('mongoose');
// const mongoURI = 'mongodb+srv://foodiehub:123@cluster0.vffpzlx.mongodb.net/foodiehubmern?retryWrites=true&w=majority&appName=Cluster0';

// const mongoDB = async () => {
//     try {
//         await mongoose.connect(mongoURI);
//         console.log("Connected to MongoDB");
//         const fetched_data = await mongoose.connection.db.collection("foodiehubitems");
//         fetched_data.find({}).toArray(function (error, data) {
//             if(error) {
//                 console.log(error);
//             }
//             else {
//                 console.log(data);
//             }
//         })
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//     }
// };

// module.exports = mongoDB;
const mongoose = require('mongoose');
const { Schema } = mongoose;

const foodiehubItemSchema = new Schema({
    categoryName: String,
    name: String,
    img: String,
    options: [{
        half: String,
        full: String
    }],
    description: String
});
const foodiehubCategorySchema = new Schema({
    categoryName: String
});

const FoodiehubItem = mongoose.model('FoodiehubItem', foodiehubItemSchema);
const FoodCategories = mongoose.model('FoodCategories', foodiehubCategorySchema);
const mongoURI = 'mongodb+srv://foodiehub:123@cluster0.vffpzlx.mongodb.net/foodiehubmern?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");
        const data = await FoodiehubItem.find({});
        const catData = await FoodCategories.find({});
        global.foodiehubitems = data;
        global.foodcategories = catData;
        console.log(global.foodiehubitems);
        console.log(global.foodcategories);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};


module.exports = mongoDB;

