import * as React from 'react';
import {css, SerializedStyles} from '@emotion/core';

export const Header : React.FunctionComponent<{}> = ()=>{
    return <div css={headerClass}>
            <p css={headerText}>Should I eat mcDonalds</p>
        </div>
}

const headerClass : SerializedStyles = css`
    background: gray;
    width: 100%;
    height: 50px;
    font-size: 16px;
    color: white;
    padding: 5px;
    box-sizing: border-box;

`
const headerText : SerializedStyles = css`    
    text-align: center;
    margin: 0;

`

