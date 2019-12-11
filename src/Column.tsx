import * as React from 'react';
import {css, SerializedStyles} from '@emotion/core';
import { connect } from 'react-redux';
import {IPros, addPro, editPro} from './data/pros';


interface IColumnProps {
    type: 'PROS'|'CONS',
}
  
export interface OwnProps {
    pros: IPros
}
  
export interface Props extends IColumnProps, OwnProps { }


type TElements = {
    arr: number[];
    normalizedData: {[id:number]:{value: string}}
}
const Column : React.FunctionComponent<Props> = ({type, pros})=>{
    // const [elements, setElements] = React.useState<TElements>({arr:[], normalizedData:{}});
    // const deleteElement = (id:number):void=>{
    //     const {arr, normalizedData} = elements;
    //     const index = arr.indexOf(id);
    //     const newArr = [...arr.slice(0, index),...arr.slice(index+1,arr.length-1)];
    //     const {[index], ...rest} = normalizedData;
    //     setElements({arr:newArr, normalizedData: rest})
    // }
    const {prosArray, prosObj}= pros;
    const handleChange  = (e: any) =>{ console.log(999,e.target, e.target.innerText,)}
    const handleBlur  = (e: any) =>{ console.log(888,e)}
    const handleInputChange = (e:any)=>{
        const {value}= e.target;
        console.log('e', value, e.target)
    }
    return <div css={columnClass}>
            <p css={headerText}>{type}</p>
            <ul>
                
            </ul>
            {prosArray.map((proIndex)=>{
                return(<p
                    data-id={proIndex}
                    key={proIndex+prosObj[proIndex].value}
                    contentEditable={true} 
                    suppressContentEditableWarning={true}
                    onInput={handleChange}
                    onBlur={handleBlur}
                    css={itemClass}>
                        {`${proIndex+1}. ${prosObj[proIndex].value}`}
                    </p>)
            })}
            {/* <input onChange={handleInputChange}></input> */}
        </div>
}

const columnClass : SerializedStyles = css`
    display: flex;
    width: 100%;
    box-sizing: border-box;
    flex-direction: column;
    height: auto;
`
const headerText : SerializedStyles = css`    
    text-align: center;
    margin: 0;
    border: 1px solid black;

`

const itemClass :SerializedStyles = css`
    margin: 0 10px;
`

const mapStateToProps = (state:any) =>{
    return {pros :state.pros}
}

const mapDispatchToProps = dispatch =>{
    return {handleEdit: ()=>dispatch(addPro())}
}
export default connect(mapStateToProps, mapDispatchToProps)(Column)

// const elements = {:{id: 0 , value: ''}}