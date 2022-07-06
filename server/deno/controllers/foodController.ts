import Food from '../models/Food.ts';

class FoodController {

   static async getFoods({ response }: { response: any }) {
      try {
         const foods = await Food.all();
         if (foods) {
            response.status = 200;
            response.body = {
               success: true,
               data: foods,
            };
         }
      } catch (error) {
         response.body = {
            success: false,
            msg: error.toString(),
         };
      }
   }

   static async getFoodById(req: any, res: any) {
      const {id} = req.params;
      try {
         const food = await Food.find(id);
         return res.status(200).json(food);
      } catch (error: any) {
         res.status(500).json({message: error.message});
      }
   }

   static async getFoodsForSelect(req: any, res: any) {
      try {
         const foods = await Food
            .select('_id', 'name', 'description')
            .orderBy('id')
            .get();
         return res.status(200).json(foods.map((food) => {
            return {
               value: food._id,
               label: `${food.name}, ${food.description}`
            }
         }));
      } catch (error: any) {
         res.status(500).json({message: error.message});
      }
   }

   static async createFood(req: any, res: any) {
      try {
         await Food.create(req.body);
         return res.status(200).json({message: 'Food created!'});
      } catch (error: any) {
         res.status(500).json({message: error.message});
      }
   }

   static async deleteFood(req, res) {
      const {id} = req.params;
      try {
         await Food.where('_id', id).delete();
         return res.status(200).json({message: 'Food deleted!'});
      } catch (error: any) {
         res.status(500).json({message: error.message});
      }
   }

}

export default FoodController;