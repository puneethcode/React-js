import React from 'react';

//
const productDescriptionVM = function(store) {
    //Components
    const ProductDescription = require("components/ProductDescription");
    //Get Started Btn
    let curState = store.getState();
    let prod = curState.currentProduct;
    let prods = curState.productInfo.products;

    const getStarted = function() {
        store.dispatch({type: 'CUR_PRODUCT_INCREMENT_FLOW_POSITION'});
        let curState = store.getState();
        let prod = curState.currentProduct;
        if(prod.acronym === 'srs') store.dispatch({type:'SRS_RESET'});
        store.dispatch({type: 'NAV_PUSH_BASE', payload: {
            current: prod.flow[prod.flowPosition]
        }})
    }
    //HEADER TITLE SETUP
    store.dispatch({type: 'HEADER_SET_TITLE', payload: {
        title: prod.title,
    }})

    return (
		<ProductDescription
            check={()=>{return store.getState().navigator.transitioning}}
            title={prod.title}
            description={prods[prod.productPosition].generalDescription}
            productInfo={prods}
            background={"url('./assets/"+ prod.acronym +"_background.png')"}
            getStarted={getStarted}
            listener={ updater => {
                return store.subscribe(function() {
                    updater(store.getState().currentProduct);
                });
            }}
            updateHeader={title => {
                store.dispatch({type: 'HEADER_SET_TITLE', payload: {
                    title
                }})
         }}/>
	);

}
//
export default productDescriptionVM;
