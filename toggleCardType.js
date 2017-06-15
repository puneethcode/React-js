import React from 'react';
//
const toggleCardTypeVM = function(store, n) {
    //Components
    const ToggleCardType = require("components/ToggleCardType");
    //
    function switchCards(toggle){
        let product = store.getState();
        let current = store.getState().currentProduct.acronym;
        if(current == "srs") {

            if(toggle) {
                store.dispatch({type:'NAV_REPLACE_BASE', payload: {
                    current: {
                        backdrop:       {x: 0, y: 0, z: 1, opacity: 100},
                        standardCard1:  {x: 0, y: 0, z: 2, opacity: 100},
                        standardCard2:  {x: 30.72265625, y: 0, z: 2, opacity: 100},
                        standardCard3:  {x: 61.4453125, y: 0, z: 2, opacity: 100},
                        toggleCardType: {x: 0, y: 0, z: 7, opacity: 100},
                        header:         {x: 0, y: 0, z: 10, opacity: 100}
                    },
                }});
            } else {
                store.dispatch({type:'NAV_REPLACE_BASE', payload: {
                    current: {
                        backdrop:       {x: 0, y: 0, z: 1, opacity: 100},
                        customCard:     {x: 0, y: 0, z: 2, opacity: 100},
                        customContent:  {x: 0, y: 0, z: 5, opacity: 100},
                        toggleCardType: {x: 0, y: 0, z: 7, opacity: 100},
                        header:         {x: 0, y: 0, z: 10, opacity: 100}
                    },
                }});
            }

        } else if(current == "bc") {

            if(toggle) {
                store.dispatch({type:'NAV_REPLACE_BASE', payload: {
                    current: {
                        backdrop:       {x: 0, y: 0, z: 1, opacity: 100},
                        standardCard1:  {x: 0, y: 0, z: 2, opacity: 100},
                        standardCard2:  {x: 30.72265625, y: 0, z: 2, opacity: 100},
                        standardCard3:  {x: 61.4453125, y: 0, z: 2, opacity: 100},
                        toggleCardType: {x: 0, y: 0, z: 7, opacity: 100},
                        header:         {x: 0, y: 0, z: 10, opacity: 100}
                    },
                }});
            } else {
                store.dispatch({type:'NAV_REPLACE_BASE', payload: {
                    current: {
                        backdrop:       {x: 0, y: 0, z: 1, opacity: 100},
                        customCardBc:     {x: 0, y: 0, z: 2, opacity: 100},
                        customContentBc:  {x: 0, y: 0, z: 5, opacity: 100},
                        toggleCardType: {x: 0, y: 0, z: 7, opacity: 100},
                        header:         {x: 0, y: 0, z: 10, opacity: 100}
                    },
                }});
            }

        } else if(current == "int") {

            if(toggle) {
                store.dispatch({type:'NAV_REPLACE_BASE', payload: {
                    current: {
                        backdrop:       {x: 0, y: 0, z: 1, opacity: 100},
                        standardCard1:  {x: 0, y: 0, z: 2, opacity: 100},
                        standardCard2:  {x: 30.72265625, y: 0, z: 2, opacity: 100},
                        standardCard3:  {x: 61.4453125, y: 0, z: 2, opacity: 100},
                        toggleCardType: {x: 0, y: 0, z: 7, opacity: 100},
                        header:         {x: 0, y: 0, z: 10, opacity: 100}
                    },
                }});
            } else {
                store.dispatch({type:'NAV_REPLACE_BASE', payload: {
                    current: {
                        backdrop:       {x: 0, y: 0, z: 1, opacity: 100},
                        customCardInt:     {x: 0, y: 0, z: 2, opacity: 100},
                        customContentInt:  {x: 0, y: 0, z: 5, opacity: 100},
                        toggleCardType: {x: 0, y: 0, z: 7, opacity: 100},
                        header:         {x: 0, y: 0, z: 10, opacity: 100}
                    },
                }});
            }

        }
        else if(current == "pip") {

            if(toggle) {
                store.dispatch({type:'NAV_REPLACE_BASE', payload: {
                    current: {
                        backdrop:       {x: 0, y: 0, z: 1, opacity: 100},
                        standardCard1:  {x: 0, y: 0, z: 2, opacity: 100},
                        standardCard2:  {x: 30.72265625, y: 0, z: 2, opacity: 100},
                        standardCard3:  {x: 61.4453125, y: 0, z: 2, opacity: 100},
                        toggleCardType: {x: 0, y: 0, z: 7, opacity: 100},
                        header:         {x: 0, y: 0, z: 10, opacity: 100}
                    },
                }});
            } else {
                store.dispatch({type:'NAV_REPLACE_BASE', payload: {
                    current: {
                        backdrop:       {x: 0, y: 0, z: 1, opacity: 100},
                        customCardPip:     {x: 0, y: 0, z: 2, opacity: 100},
                        customContentPip:  {x: 0, y: 0, z: 5, opacity: 100},
                        toggleCardType: {x: 0, y: 0, z: 7, opacity: 100},
                        header:         {x: 0, y: 0, z: 10, opacity: 100}
                    },
                }});
            }

        }
    }
    //
    return (
        <ToggleCardType switch={switchCards} />
	);

}
//
export default toggleCardTypeVM;
