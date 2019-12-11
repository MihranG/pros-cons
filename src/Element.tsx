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

    // React.useEffect(()=>{
    //     const timeout = setTimeout(() => {
    //         setEditing(false);
    //         editTodo(ownValue, value);
    //       }, 2000);
    
    //       return () => clearTimeout(timeout);

    // })
    
    const changeHandler = React.useCallback((e)=>{
            e.preventDefault()
            console.log('aaa',e.target.value )
            setOwnValue(e.target.value)
        },[proIndex])
        console.log( 3434, editing)
    return (
        <li  onClick={()=>setEditing(true)} css={elementStyle} 
            onBlur={()=>{
                console.log('onBlur',ownValue)
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
    console.log('state', state.items[ownProps.type].itemsObj[ownProps.proIndex].value)
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