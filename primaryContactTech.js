import React from 'react';
//
const primaryContactTechVM = function(store) {
    //REQUEST DATA

    //REST CART - Just to be safe...
    store.dispatch({type: 'CART_RESET'});

    //Components
    const PrimaryContact = require("components/PrimaryContact");
    const DetailsFrame = require("components/DetailsFrame");

    //SETUP HEADER TITLE


    let state = store.getState();
    let cust = state.customerInfo;

    // TODO: Confirm by Praveen that this matches expectation

    //Based on if there is a PCCContact / quick quote vs firm quote
    let continueTxt = 'CONTINUE';
    let title = 'Confirm Customer Contact';
    let customerName = cust.currentCustomer.PCCContact;
    let pcc = {...cust.PCC}; // Copy the pcc data

    if (!cust.PCCSet) { // PCC was not yet filled in
        continueTxt = 'CONTINUE';
        title = 'Add Customer Contact';
    }
    store.dispatch({type: 'HEADER_SET_TITLES', payload: {
        title: title,
        subTitle: customerName,
    }});

    let PCCContact = {...store.getState().customerInfo.currentCustomer.PCCContact};
    if(typeof(PCCContact.firstName) === 'undefined' || PCCContact.firstName == ""){
        if(typeof PCCContact.firstName !== "string") PCCContact.firstName = "";
        if(typeof PCCContact.lastName !== "string") PCCContact.lastName = "";
        if(typeof PCCContact.email !== "string") PCCContact.email = "";
        if(typeof PCCContact.telephone !== "string") PCCContact.telephone = "";
        continueTxt = "CONTINUE";
        store.dispatch({type: 'HEADER_SET_TITLES', payload: {
            title: "Add Customer Contact",
            subTitle: store.getState().customerInfo.currentCustomer.customerName,
        }});
    } 
    else {
        store.dispatch({type: 'HEADER_SET_TITLES', payload: {
            title: "Confirm Customer Contact",
            subTitle: store.getState().customerInfo.currentCustomer.customerName,
        }})
    }
    //
    let telephone =PCCContact.telephone.replace(/-/g, "");
    return (
        <DetailsFrame
            title={"Confirm Customer Contact"}>
    		<PrimaryContact
                email={PCCContact.email}
                firstName={PCCContact.firstName}
                lastName={PCCContact.lastName}
                telephone={telephone}
                continueTxt={continueTxt}
                theme={store.getState().userInfo.data.userRole}
                next={(pcc) => {
                    console.log('tech flow pcc [', pcc, ']');
                    store.dispatch({type: 'CUR_PRODUCT_INCREMENT_FLOW_POSITION'});
                    store.dispatch({type: 'CUSTOMER_INFO_SET_PCC_TECH', payload: pcc });
                    store.dispatch({type: 'NAV_PUSH_BASE', payload: {
                        current: store.getState().currentProduct.flow[store.getState().currentProduct.flowPosition]
                    }});
                }}
            />
        </DetailsFrame>
	);

}
//
export default primaryContactTechVM;
