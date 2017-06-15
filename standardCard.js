import React from 'react';
import { getPricingDetails } from '../commandHandlers/api';
//
const standardCardVM = function(store, n) {
    //Components
    const CardFrame = require("components/CardFrame");
    const CardContent = require("components/StandardCardContent");
    //SETUP DATA
    let prods = store.getState().productInfo.products;
    let curr = store.getState().currentProduct;

    let product = prods[curr.productPosition];
    if (!product.standardPackages) return;
    let keys = Object.keys(product.standardPackages);
    let key = keys[n];
    let sPackage = product.standardPackages[key];
    //let sPackage = product.standardPackages[n];

    if(curr.flowType === "additionalOptions"){
        let index = (curr.additionalOptions * 3) + n;
        key = keys[index];
        sPackage = product.standardPackages[key];
    }
    const colors = ["#82ceac","#f9b295","#f8d362"];
    //const colors = ["#cd040b","#cd040b","#cd040b"];
    const nextIncrement = curr.flowPosition;
    //SET package
    function selectPackage() {
        let curr = store.getState().currentProduct;
        if(curr.flowPosition !== nextIncrement) return;
        if(curr.packageContents === sPackage) return;
        sPackage.code = key;
        store.dispatch({type:'CUR_PRODUCT_SET_PACKAGE_CONTENTS', payload: {
            packageContents: sPackage
        }});
        /*
        function handleGetPricing() {
            const pp = store.getState().currentProduct.productCode;
            const userRole=store.getState().userInfo.data.userRole;
            const eid=store.getState().app.EID;
            getPricingDetails(store,{mobileProductGroup: pp, userRole:userRole, EID:eid },{altEvent:'CART_UPDATE_PRICING',productCode:pp});

            //getPricingDetails(store,{code: pp},{altEvent:'CART_UPDATE_PRICING',productCode:pp});
        }
        handleGetPricing();
        */
        store.dispatch({type: 'CUR_PRODUCT_INCREMENT_FLOW_POSITION'});
        curr = store.getState().currentProduct;

        store.dispatch({type: 'NAV_PUSH_BASE', payload: {
            current: curr.flow[curr.flowPosition](n+1)
        }});
		
		let backListener = store.subscribe(function() {
			var stateProduct = store.getState().currentProduct;
			
			if(stateProduct && curr !== stateProduct) {
				curr = stateProduct;
				backListener();
				store.dispatch({type:'CUR_PRODUCT_SET_PACKAGE_CONTENTS', payload: {
					packageContents: false
				}});

                let title = curr.title;
                let state = store.getState();
                let cust = state.customerInfo;
                let customerName = cust.currentCustomer.customerName;
                store.dispatch({type: 'HEADER_SET_TITLES', payload: {
                    title: title,
                    subTitle: customerName,
                }});
                
			}
		});
    }
    //
    return (
        <CardFrame
            listener={
                updater => {
                    return store.subscribe(function() {
                        updater(store.getState().currentProduct.packageContents);
                    });
                }
            }
            press={selectPackage}
            color={colors[n]}
            title={sPackage.title}>
            <CardContent attributes={sPackage.attributes} />
        </CardFrame>
	);

}
//
export default standardCardVM;
