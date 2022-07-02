import express from 'express';
import FoodController from '../controllers/foodController.js';

const router = express.Router();

router
   .get('/food/select', FoodController.getFoodsForSelect)
   .get('/food', FoodController.getFoods)
   .post('/food', FoodController.createFood)
   .put('/food/:id', FoodController.updateFood)
   .delete('/food/:id', FoodController.deleteFood);

export default router;