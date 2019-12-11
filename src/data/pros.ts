
const ADD_PRO = 'ADD_PRO';
const EDIT_PRO = 'EDIT_PRO';
const DELETE_PRO = 'DELETE_PRO';


// interface IAction = {type: string}
export interface IPros  {prosArray: number[], prosObj : {[id: number]: {value: string}}};
const initialState : IPros = {
  prosArray: [0],
  prosObj: {0:{value: ''}}
};

export const addPro = () => ({
  type: ADD_PRO,
  payload: {},
});

export const editPro = (id:number, newValue:string) =>({
    type: EDIT_PRO,
    payload: {
        id,
        newValue,
    }
})

export const deletePro = (id:number)=>({
    type: DELETE_PRO,
    payload: {id}
})



export const reducer = (state = initialState, action: {type: string, payload: {id:number, newValue: string}}) => {
  switch (action.type) {
    case ADD_PRO:{
        const newIndex = state.prosArray.length;
        return {
        ...state,
        prosArray: [...state.prosArray,newIndex],
        prosObj: {
            ...state.prosObj,
            [newIndex]: {value: ''}
        }
        };}
    case EDIT_PRO:{
      const {id, newValue} = action.payload;
      return {
        ...state,
        prosObj: {
            ...state.prosObj,
            [id]:{value:newValue}
        }
      };}
    case DELETE_PRO:{
      const {id} = action.payload;
      const {prosObj, prosArray} = state; 
      const {[id]:value, ...prosObjWOPro} = prosObj;
      const indexOfPro = prosArray.indexOf(id);
      const newArray = prosArray.filter(el=>el!==id);

      return {
        ...state,
        prosObj: prosObjWOPro,
        prosArray: newArray
      }}
    default:
      return state;
  }
};
