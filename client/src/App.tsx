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
   const [originalFood, setOriginalFood] = useState<Food>();
   const [alternativeFood, setAlternativeFood] = useState<Food>();
   const [grams, setGrams] = useState(100);
   const [calories, setCalories] = useState(0);
   const [altGrams, setAltGrams] = useState(0);

   function findOriginalFoodById(id: String) {
      Axios.get(`http://localhost:3001/food/${id}`).then((response) => {
         setOriginalFood(response.data);
      });
   }

   function findAlternativeFoodById(id: String) {
      Axios.get(`http://localhost:3001/food/${id}`).then((response) => {
         setAlternativeFood(response.data);
      });
   }

   useEffect(() => {
      Axios.get('http://localhost:3001/food/select').then((response) => {
         setSelectList(response.data);
      });
   }, []);

   useEffect(() => {
      if (originalFood) {
         setCalories(Number(originalFood.calories) * grams / 100);
      }
   }, [originalFood, grams]);

   useEffect(() => {
      setAltGrams(Math.round(((calories / Number(alternativeFood?.calories) * 100) + Number.EPSILON) * 100) / 100);
   });

   return (
      <div>
         <label htmlFor="original-food">
            Alimento
         </label>
         <Select
            name="original-food"
            placeholder="Selecione um alimento"
            value={selectList.find(obj => obj.value === originalFood?._id)}
            options={selectList}
            onChange={(event) => {
               findOriginalFoodById(event!.value.toString());
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
         <label htmlFor="alternative-food">
            Alimento
         </label>
         <Select
            name="alternative-food"
            placeholder="Selecione um alimento"
            value={selectList.find(obj => obj.value === alternativeFood?._id)}
            options={selectList}
            onChange={(event) => {
               findAlternativeFoodById(event!.value.toString());
            }}
         />
         {altGrams} g
      </div>
   );
}