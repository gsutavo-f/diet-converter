import Axios from 'axios';
import Select from 'react-select';
import {useEffect, useState} from "react";

interface FoodSelect {
   value: String,
   label: String
}

interface Food {
   _id: String,
   name: String,
   description: String,
   calories: Number,
   protein: Number,
   carbohydrate: Number
}

export default function App() {
   const [selectList, setSelectList] = useState<FoodSelect[]>([]);
   const [selectedFood, setSelectedFood] = useState<Food>();
   const [grams, setGrams] = useState(100);
   const [calories, setCalories] = useState(0);

   function findFoodById(id: String) {
      Axios.get(`http://localhost:3001/food/${id}`).then((response) => {
         setSelectedFood(response.data);
      });
   }

   useEffect(() => {
      Axios.get('http://localhost:3001/food/select').then((response) => {
         setSelectList(response.data);
      });
   }, []);

   useEffect(() => {
      if (selectedFood) {
         setCalories(Number(selectedFood.calories) * grams / 100);
      }
   }, [selectedFood, grams]);

   return (
      <div>
         <label htmlFor="food">
            Alimento
         </label>
         <Select
            name="food"
            placeholder="Selecione um alimento"
            value={selectList.find(obj => obj.value === selectedFood?._id)}
            options={selectList}
            onChange={(event) => {
               findFoodById(event!.value.toString());
            }}
         />
         <label htmlFor="grams">
            Gramas
         </label>
         <input
            type="number"
            name="grams"
            value={grams}
            onChange={(event) => setGrams(event.target.valueAsNumber)}
            required
         />
         <br/>
         <label>
            Calorias
         </label>
         {calories} kcal
      </div>
   );
}