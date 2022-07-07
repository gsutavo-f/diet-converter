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
   const [inputFood, setInputFood] = useState<Food>();
   const [outputFood, setOutputFood] = useState<Food>();
   const [inputGrams, setInputGrams] = useState(100);
   const [calories, setCalories] = useState(0);
   const [outputGrams, setOutputGrams] = useState(0);

   function findOriginalFoodById(id: String) {
      Axios.get(`http://localhost:3001/food/${id}`).then((response) => {
         setInputFood(response.data);
      });
   }

   function findAlternativeFoodById(id: String) {
      Axios.get(`http://localhost:3001/food/${id}`).then((response) => {
         setOutputFood(response.data);
      });
   }

   useEffect(() => {
      Axios.get('http://localhost:3001/food/select').then((response) => {
         setSelectList(response.data);
      });
   }, []);

   useEffect(() => {
      if (inputFood) {
         setCalories(Number(inputFood.calories) * inputGrams / 100);
      }
   }, [inputFood, inputGrams]);

   useEffect(() => {
      const calculatedGrams = Math.round(((calories / Number(outputFood?.calories) * 100) + Number.EPSILON) * 100) / 100;
      setOutputGrams(Number.isNaN(calculatedGrams) ? 0 : calculatedGrams);
   }, [calories, outputFood]);

   return (
      <div className="md:container md:mx-auto gap-x-40 flex justify-center h-screen items-start">
         <div className="flex flex-col mt-60">
            <label className="font-semibold" htmlFor="original-food">
               Alimento
            </label>
            <Select
               className="w-96"
               name="original-food"
               placeholder="Selecione um alimento"
               value={selectList.find(obj => obj.value === inputFood?._id)}
               options={selectList}
               onChange={(event) => {
                  findOriginalFoodById(event!.value.toString());
               }}
            />
            <label className="mt-3 font-semibold" htmlFor="inputGrams">
               Gramas
            </label>
            <input
               className="shadow-md p-1 rounded-md"
               type="number"
               name="inputGrams"
               value={inputGrams}
               onChange={(event) => setInputGrams(event.target.valueAsNumber)}
               required
            />
            <label className="mt-3 font-semibold" htmlFor="calories">
               Calorias
            </label>
            <input
               className="shadow-md p-1 rounded-md"
               type="string"
               name="calories"
               value={`${calories} kcal`}
               disabled
            />
         </div>
         <div className="flex flex-col mt-60">
            <label className="font-semibold" htmlFor="alternative-food">
               Alimento
            </label>
            <Select
               className="w-96"
               name="alternative-food"
               placeholder="Selecione um alimento"
               value={selectList.find(obj => obj.value === outputFood?._id)}
               options={selectList}
               onChange={(event) => {
                  findAlternativeFoodById(event!.value.toString());
               }}
            />
            <label className="mt-3 font-semibold" htmlFor="outputGrams">
               Gramas
            </label>
            <input
               className="shadow-md p-1 rounded-md"
               type="string"
               name="outputGrams"
               value={`${outputGrams} g`}
               disabled
            />
         </div>
      </div>
   );
}