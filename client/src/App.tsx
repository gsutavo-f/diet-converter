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

interface FoodGrams {
   food: Food,
   grams: Number
}

export default function App() {
   const [selectList, setSelectList] = useState<FoodSelect[]>([]);
   const [inputFood, setInputFood] = useState<Food>();
   const [outputFood, setOutputFood] = useState<Food>();
   const [selectedFoods, setSelectedFoods] = useState<FoodGrams[]>([]);
   const [calories, setCalories] = useState(0);
   const [outputGrams, setOutputGrams] = useState(0);

   function findInputFoodById(id: String) {
      Axios.get(`http://localhost:3001/food/${id}`).then((response) => {
         setInputFood(response.data);
      });
   }

   function findOutputFoodById(id: String) {
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
      let calculatedCalories = 0;
      selectedFoods.forEach((item) => {
         calculatedCalories += (Number(item.food.calories) * Number(item.grams) / 100);
      });
      setCalories(Math.round((calculatedCalories + Number.EPSILON) * 100) / 100);
   }, [selectedFoods]);

   useEffect(() => {
      const calculatedGrams = Math.round(((calories / Number(outputFood?.calories) * 100) + Number.EPSILON) * 100) / 100;
      setOutputGrams(Number.isNaN(calculatedGrams) ? 0 : calculatedGrams);
   }, [calories, outputFood]);

   function addSelectedFood() {
      if (inputFood != null) {
         setSelectedFoods([...selectedFoods, {food: inputFood, grams: 100}]);
      }
   }

   return (
      <div className="container mx-auto gap-x-20 flex justify-center h-screen items-start">
         <div className="flex flex-col mt-60">
            <label className="font-semibold" htmlFor="original-food">
               Alimento
            </label>
            <div className="flex flex-row w-96 justify-between">
               <Select
                  className="w-80 shadow-lg"
                  name="original-food"
                  placeholder="Selecione um alimento"
                  value={selectList.find(obj => obj.value === inputFood?._id)}
                  options={selectList}
                  onChange={(event) => {
                     findInputFoodById(event!.value.toString());
                  }}
               />
               <button
                  className="w-12 border border-solid border-gray-300 rounded shadow-lg"
                  onClick={() => {
                     addSelectedFood();
                  }}
               >
                  +
               </button>
            </div>
            {selectedFoods.map((item, index) => (
               <>
                  <label className="mt-3 font-semibold">
                     Gramas
                  </label>
                  <div className="flex flex-row w-96 justify-between">
                     <input
                        className="shadow-lg p-1 rounded-md w-72"
                        type="string"
                        value={item.food.name}
                        disabled
                     />
                     <input
                        className="shadow-lg p-1 rounded-md w-20"
                        type="number"
                        value={selectedFoods[index].grams}
                        onChange={(event) => {
                           let clone = [...selectedFoods];
                           let item = {...clone[index]};
                           item.grams = event.target.valueAsNumber;
                           clone[index] = item;
                           setSelectedFoods(clone);
                        }}
                        required
                     />
                  </div>
               </>
            ))}
         </div>
         <div className="flex flex-col mt-72">
            <label className="mt-3 font-semibold" htmlFor="calories">
               Calorias
            </label>
            <input
               className="shadow-lg p-1 rounded-md"
               type="text"
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
               className="w-96 shadow-lg"
               name="alternative-food"
               placeholder="Selecione um alimento"
               value={selectList.find(obj => obj.value === outputFood?._id)}
               options={selectList}
               onChange={(event) => {
                  findOutputFoodById(event!.value.toString());
               }}
            />
            <label className="mt-3 font-semibold" htmlFor="outputGrams">
               Gramas
            </label>
            <input
               className="shadow-lg p-1 rounded-md"
               type="text"
               name="outputGrams"
               value={`${outputGrams} g`}
               disabled
            />
         </div>
      </div>
   );
}