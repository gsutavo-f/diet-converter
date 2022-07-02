import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema(
   {
      id: {type: String},
      name: {type: String, required: true},
      description: {type: String, required: true},
      calories: {type: Number, required: true},
      protein: {type: Number},
      carbohydrate: {type: Number}
   }
);

const Food = mongoose.model('foods', foodSchema);

export default Food;