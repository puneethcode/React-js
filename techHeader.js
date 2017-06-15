import React from 'react';
import { baseRoute } from '../constants/routeHelper';
//
const techHeaderVM = function(store) {
    let state = store.getState();
    //Components
    const Header = require("components/Header/Tech");
    //
    return (
		<Header init={store.getState().header} listener={ updater => {
            return store.subscribe(function() {
                updater(store.getState().header);
            });
        }} historyListener={ updater => {
            return store.subscribe(function() {
                updater(store.getState().navigator);
            });
        }} goToDashboard={() => {
            store.dispatch({type:'NAV_PUSH_BASE', payload: {
                history: baseRoute(),
                current: {
                    backdrop:      {x: 0, y: 0, z: 1, opacity: 100},
                    dashBoardPage:      {x: 0, y: 0, z: 2, opacity: 100},
                    techHeader:        {x: 0, y: 0, z: 10, opacity: 100}
                }
            }});
        }} back={() => {
            if(store.getState().quote.count > 0 && store.getState().header.title == "Select Location") {
                    store.dispatch({type: 'QUOTE_CLEAR_ITEMS'});
                    store.dispatch({type:'NAV_POP_BASE'});
            }
            else{
                store.dispatch({type:'NAV_POP_BASE'});
            }
        }} logOff={() => {
            //console.log("LOG OFF"); 
            window.location = 'https://login.verizon.com/siteminderagent/forms/logout.jsp';
        }}
        home={() => {
            store.dispatch({type: 'QUOTE_CLEAR_ITEMS'});
            store.dispatch({type:'NAV_REPLACE_AT_INDEX_BASE', payload: {
                index: 0,
                current: {
                    backdrop:     {x: 0, y: 0, z: 1, opacity: 100},
                    landingPanel: {x: 0, y: 0, z: 2, opacity: 100},
                    techHeader:   {x: 0, y: 0, z: 10, opacity: 100}
                }
            }});
        }}
         />
	);

}
//
export default techHeaderVM;
