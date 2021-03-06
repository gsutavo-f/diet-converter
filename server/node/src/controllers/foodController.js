import Food from '../models/Food.js';

class FoodController {

   static getFoods(req, res) {
      Food.find((err, foods) => {
         if (err) {
            res.status(500).send({message: err.message});
         } else {
            res.status(200).json(foods);
         }
      });
   }

   static getFoodById(req, res) {
      const {id} = req.params;
      Food.findById(id, (err, result) => {
         if(err) {
            res.status(400).send({message: `${err.message} - Food not found`});
         } else {
            res.status(200).send(result);
         }
      });
   }

   static getFoodsForSelect(req, res) {
      Food.find({}, null, {sort: {name: 1}}, (err, foods) => {
         if (err) {
            res.status(500).send({message: err.message});
         } else {
            res.status(200).send(foods.map((food) => {
               return { value: food._id, label: `${food.name}, ${food.description}` }
            }))
         }
      });
   }

   static createFood(req, res) {
      let food = new Food(req.body);
      food.save((err) => {
         if (err) {
            res.status(500).send({message: err.message});
         } else {
            res.status(201).send(food.toJSON());
         }
      });
   }

   static updateFood(req, res) {
      const {id} = req.params;
      Food.findByIdAndUpdate(id, {$set: req.body}, (err) => {
         if (err) {
            res.status(400).send({message: err.message});
         } else {
            res.status(201).send({message: "Value Updated"});
         }
      });
   }

   static deleteFood(req, res) {
      const {id} = req.params;
      Food.findByIdAndDelete(id, (err) => {
         if (err) {
            res.status(400).send({message: err.message});
         } else {
            res.status(201).send({message: "Value Deleted"});
         }
      });
   }

}

export default FoodController;