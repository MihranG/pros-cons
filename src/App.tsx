import * as React from 'react';
import {Provider} from 'react-redux';
import {css} from '@emotion/core';

import {Header} from './Header';
import Column from './Column';

import store from './store'

export default function App() {

  return ( 
    <Provider store={store}>
      <div css={containerClass}>
        <Header/>
        <div css={columnContainer}>
          <Column type={'PROS'}/>
          <Column type={'CONS'}/>
        </div>
      </div>
    </Provider>
    )

}


const containerClass = css`
  display: flex;
  align-items: flex-start;
  // justify-content: center;
  flex-direction: column;
  margin: 20px 100px;
  border: 1px solid red;
  width: auto;
  height: 500px;
  box-sizing: border-box;
`;

const columnContainer = css`
  display: flex;
  flex-direction: row;
  border: 1px solid green;
  width: 100%;
  box-sizing: border-box;
`