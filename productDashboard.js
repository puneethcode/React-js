import React from 'react';
import setFlow from '../commandHandlers/setFlow';
//
const productDashboardVM = function(store) {

    //REQUEST DATA

    //Components
    const ProductDashboard = require("components/ProductDashboard");
    //SETUP HEADER TITLE
    store.dispatch({type: 'HEADER_SET_TITLE', payload: {
        title: "Product Select",
    }})

    setTimeout( () => {
        store.dispatch({type: 'PING'});
    },1);
    //
    return (
		<ProductDashboard
            listener={ updater => {
                return store.subscribe(function() {
                    updater(store.getState().productInfo);
                });
            }}
            productSelect={(acronym, title, n) => {
                //console.log('productDashboard VM [', acronym, title, n, ']');
                setFlow(store, title, acronym, n);
            }}
            productInfo={store.getState().productInfo.products}
        />
	);

}
//
export default productDashboardVM;
