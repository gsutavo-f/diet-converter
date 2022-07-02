import Axios from 'axios';
import Select from 'react-select';
import {useEffect, useState} from "react";

interface FoodSelect {
   value: String,
   label: String
}

export default function App() {
   const [selectList, setSelectList] = useState<FoodSelect[]>([]);


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
            options={selectList}
         />
      </div>
   );
}