import {DataTypes, Model} from 'https://deno.land/x/denodb/mod.ts';
import db from "../config/dbConfig.ts";

class Food extends Model {
   static table = 'foods';

   static fields = {
      _id: {
         type: DataTypes.STRING,
         primaryKey: true
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false
      },
      description: {
         type: DataTypes.STRING,
         allowNull: false
      },
      calories: {
         type: DataTypes.STRING,
         allowNull: false
      },
      protein: DataTypes.INTEGER,
      carbohydrate: DataTypes.INTEGER
   }
}

db.link([Food]);

export default Food;

