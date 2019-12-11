import * as React from 'react';
import {css, SerializedStyles} from '@emotion/core';
import { connect, DispatchProp } from 'react-redux';
import {IItems, addPro, editPro} from './data/pros';
import {Element} from './Element';
import { AnyAction } from 'redux';

interface IColumnProps {
    type: 'PROS'|'CONS',
}
  
export interface OwnProps {
    items: IItems
}
  
export interface Props extends IColumnProps, OwnProps { }


type TElements = {
    arr: number[];
    normalizedData: {[id:number]:{value: string}}
}
const Column : React.FunctionComponent<Props> = ({type, items})=>{
    const {itemsArray, itemsObj}= items;
   console.log(999, itemsArray)
    return <div css={columnClass}>
            <p css={headerText}>{type}</p>
            <ul css={ulClass}>
                {itemsArray.map((itemIndex)=>{
                    console.log()
                    return(
                    <Element
                        type={type}
                        key={itemIndex+itemsObj[itemIndex].value}
                        proIndex={itemIndex}
                    />)})  }
            </ul>
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

const ulClass :SerializedStyles = css`
    margin: 0 10px;
`

const mapStateToProps = (state:any, OwnProps: IColumnProps) =>{
    console.log(333, state , OwnProps.type)
    return {items :state.items[OwnProps.type]}
}

// const mapDispatchToProps = (dispatch) =>{
//     // return {handleEdit: ()=>dispatch(addPro())}
// }
export default connect(mapStateToProps)(Column)

// const elements = {:{id: 0 , value: ''}}