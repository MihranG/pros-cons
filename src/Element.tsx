import * as React from 'react';
import {IItems,IState, addPro, editPro, deletePro} from './data/pros';
import {css, SerializedStyles} from '@emotion/core';
import { connect, DispatchProp } from 'react-redux';
import { AnyAction } from 'redux';
interface IownProps {
    proIndex: number,
    type: 'PROS' |'CONS'
}

interface IstateProps {
    value : string,
    editTodo: (a:string, b:string)=> void   
}

interface Props extends IownProps, IstateProps {};

const DisconnectedElement = (props: Props) =>{
  
  
    const [editing, setEditing] = React.useState(false);
    const {proIndex, value, editTodo} = props;

    const [ownValue, setOwnValue]= React.useState(value);
    const labelVal = `${proIndex+1}. ${ownValue}`;

    const changeHandler = React.useCallback((e)=>{
            e.preventDefault()
            setOwnValue(e.target.value)
        },[proIndex])
    return (
        <li  onClick={()=>setEditing(true)} css={elementStyle} 
            onBlur={()=>{
                setEditing(false);
                editTodo(ownValue, value);
            }}
        >
                <label>
                    {`${proIndex+1}. `}
                </label>
                {!editing ?<span>
                    {ownValue}
                 </span>
                 : <input 
                    value={ownValue}
                    onChange={changeHandler} 
                />}
        </li>
    )
}




const mapStateToProps = (state: IState, ownProps: IownProps ) =>{
    return {
        value : state.items[ownProps.type].itemsObj[ownProps.proIndex].value
    }
}

const mapDispatchToProps = (dispatch: any , ownProps:IownProps) =>{
    
    return {
        editTodo: (newValue:string, oldValue: string)=>{
            if(newValue.length === 0 && oldValue.length !==0){
                dispatch(deletePro(ownProps.proIndex, ownProps.type))
            }else{
                if(oldValue.length === 0 ){
                   dispatch(addPro(ownProps.type))
                }
                
                dispatch(editPro(ownProps.proIndex, newValue, ownProps.type))
            }
        }
    }}

export const Element = connect(mapStateToProps, mapDispatchToProps)(DisconnectedElement)

const elementStyle = css`
    list-style-type: none
`