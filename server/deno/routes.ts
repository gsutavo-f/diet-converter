import { Router } from "https://deno.land/x/oak/mod.ts";
import FoodController from "./controllers/foodController.ts";

const router = new Router();

router
   .get('/', ({ response }: { response: any }) => {
      response.status = 200;
      response.body = {
         success: true,
         msg: 'This is your server :)',
      };
   })
   .get('/food/select', FoodController.getFoodsForSelect)
   .get('/food/:id', FoodController.getFoodById)
   .get('/food', FoodController.getFoods);

export default router;
