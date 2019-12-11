const ADD_ITEM = 'ADD_ITEM';
const EDIT_ITEM = 'EDIT_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';


type prosCons = "PROS"|"CONS"
// interface IAction = {type: string}
export interface IItems  {itemsArray: number[], itemsObj : {[id: number]: {value: string}}};
export interface IState { items: {
  PROS: IItems,
  CONS: IItems
}}
const initialPros : IItems = {// this normalized structure is intended for draag and drop functionality
  itemsArray: [0],
  itemsObj: {0:{value: ''}}
};



const initialCons : IItems ={
  itemsArray: [0],
  itemsObj: {0: {value: ''}}
}

const initialState ={
  PROS: initialPros,
  CONS: initialCons
}


export const addPro = (type: prosCons) => ({
  type: ADD_ITEM,
  payload: {type},
});

export const editPro = (id:number, newValue:string, type: prosCons) =>({
    type: EDIT_ITEM,
    payload: {
        id,
        newValue,
        type
    }
})

export const deletePro = (id:number, type: prosCons)=>({
    type: DELETE_ITEM,
    payload: {id, type}
})


export const reducer = (state = initialState, action: {type: string, payload: {id:number, newValue: string, type: prosCons}}) => {
  switch (action.type) {
    
    case ADD_ITEM:{
        const {type} = action.payload;
        const newIndex = state[type].itemsArray.length;

        return {
        ...state,
        [type]: {itemsArray: [...state[type].itemsArray, newIndex],
        itemsObj: {
            ...state[type].itemsObj,
            [newIndex]: {value: ''}
        }}}
      }
    case EDIT_ITEM:{
      const {id, newValue,type} = action.payload;
           
        return {
          ...state,
          [type]:{
            ...state[type],
            itemsObj: {
              ...state[type].itemsObj,
              [id]:{value:newValue}
          }
          }
          
      }}
    case DELETE_ITEM:{
      const {id, type} = action.payload;
      const {itemsObj, itemsArray} = state[type]; 
      const newObj:{[id: number]: {value: string}} = {}
      Object.keys(itemsObj).forEach((key)=>{
        const keyIndex = parseInt(key);
        if(keyIndex>id){
            newObj[keyIndex-1] = itemsObj[keyIndex]
        }else{
            newObj[keyIndex] = itemsObj[keyIndex]
        }
      })
      const newArray = itemsArray.slice(0,-1);

      return {
        ...state,
        [type]:{
          ...state[type],
          itemsObj: newObj,
          itemsArray: newArray
        }
       
      }}
    default:
      return state;
  }
};
