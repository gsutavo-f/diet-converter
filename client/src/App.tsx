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

   return (
      <div>
         <Select
            name="food"
            placeholder="Selecione um alimento"
            value={selectList.find(obj => obj.value === selectedFood?._id)}
            options={selectList}
            onChange={(event) => {
               findFoodById(event!.value.toString());
            }}
         />
      </div>
   );
}