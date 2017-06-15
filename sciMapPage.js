import React from 'react';
import {numberWithCommas} from 'utils';
//
const sciMapPageVM = function(store) {
    //Components
    const SCI = require("components/SCImapPage");

    let s = store.getState();
    //console.log(" -- SCI --: ",s.sciMap);

    let getPricing = (sciMap) => {

        let newPricing = {};

        let selectedServices = sciMap.selectedServices;
        let pricingDetails = [];
        let SCIPackageDetails = [];
        let totalOverage = 0;
        let totalMRC = 0;
        let totalNRC = 0;
        let footer = [];
        var index = 1;
        let comments = "";
        for( var key in selectedServices )
        {
            let pricingDetail = [];
            let SCIPackageDetail = {};
            let ss = selectedServices[key];
            let location = ss.location;
            let serviceIndex = ss.selectedService;
            let service = ss.partnerServices[serviceIndex];
            let partner = store.getState().sciMap.product.partners[ss.partner].name;
            let typeofcloud = ss.typeOfCloud[serviceIndex];

            let dataPlans = ss.dataPlans;
            let selectedDataPlan = ss.selectedDataPlan;
            if(selectedDataPlan === undefined)
            {
                selectedDataPlan = 0;
            }
            let dataPlan = dataPlans[selectedDataPlan];
            let gb = dataPlan.gb;
            let mrc = parseFloat(dataPlan.mrc.replace(/\$/g, ''));
            let nrc = parseFloat(dataPlan.nrc.replace(/\$/g, ''));
            let overage = dataPlan.overage;
            if(!isNaN(parseFloat(overage.replace(/\$/g, ''))))
            {
                totalOverage = totalOverage+parseFloat(overage.replace(/\$/g, ''));
            }
            totalMRC = totalMRC + mrc;
            totalNRC = totalNRC + nrc;
            if(!isNaN(gb)){
                gb = numberWithCommas(gb) + ' GB';
            }
            pricingDetail[0] = partner + ' - ' + service + ' - ' + typeofcloud + ' - ' + location + ' - ' + gb + ' data plan <sup>'+index+'</sup>';
            pricingDetail[1] = 1;
            pricingDetail[2] = mrc;
            pricingDetail[3] = nrc;
            pricingDetails.push(pricingDetail);

            SCIPackageDetail.partner = partner;
            SCIPackageDetail.service = service;
            SCIPackageDetail.location = location;
            SCIPackageDetail.gb = gb;
            SCIPackageDetail.comment = ss.comments;
            SCIPackageDetails.push(SCIPackageDetail);
            footer.push("A usage charge of USD "+overage+" per GB will apply each billing period in which Customer's Measured Use Level exceeds Customer's Bandwidth commitment");

            comments = comments + ss.comments + " ";

            index = index+1;
        }
        newPricing.pricing = pricingDetails;
        //newPricing.footnotes = ["A usage charge of USD "+totalOverage+" per GB will apply each billing period in which Customer's Measured Use Level exceeds Customer's Bandwidth commitment"];
        newPricing.attributes = {Term:"12 Month", Comments: comments};
        newPricing.footnotes = footer;
        newPricing.meta = SCIPackageDetails;

        return newPricing;

    }

    return (
		<SCI state={s.sciMap}
            listener={ updater => {
                return store.subscribe(function() {
                    updater(store.getState().sciMap);
                });
            }}
            togglePartner={ key => {
                return () => {store.dispatch({type:"SCI_MAP_TOGGLE_PARTNER",payload:{ partner: key}}) }
            }}
            toggleCloud={ () => {
                store.dispatch({type:"SCI_MAP_TOGGLE_CLOUD"});
            }}
            closeCloud={ () => {
                store.dispatch({type:"SCI_MAP_CLOSE_CLOUD"});
            }}
            openLocationPin = {
                (left, top, key, partner) =>{
                    store.dispatch({type:"SCI_SET_PIN_POPUP", payload: { left, top, key, partner }});
                }
            }
            configureService={ (key, partner, path) => {
                store.dispatch({type:"SCI_MAP_SET_VIEW", payload: { key, partner, path }});
                store.dispatch({type:"NAV_PUSH_BASE", payload: { current:{
                    backdrop:   {x: 0, y: 0, z: 1, opacity: 100},
                    sciMapPage: {x: 0, y: 0, z: 2, opacity: 100},
                    blur:       {x: 0, y: 0, z: 3, opacity: 100},
                    sciSelect:  {x: 0, y: 0, z: 7, opacity: 100},
                    header:     {x: 0, y: 0, z: 10, opacity: 100}
                }}});
                //console.log(key + ", "+partner+", "+left+", "+top);
               // store.dispatch({type:"SCI_SET_PIN_POPUP", payload: { }});
            }}
            getPartnerName={
                partner => { return store.getState().sciMap.product.partners[partner].name;
            }}
            getLocation={
                (partner, locationKey) => {
                    return store.getState().sciMap.product.partners[partner].locations[locationKey].location;
            }}
            checkout={ () => {
                if(Object.keys(store.getState().sciMap.selectedServices).length === 0) return;


                store.dispatch({type: 'CUR_PRODUCT_INCREMENT_FLOW_POSITION'});
                let curState = store.getState();
                let prod = curState.currentProduct;
                store.dispatch({type: 'NAV_PUSH_BASE', payload: {
                    current: prod.flow[prod.flowPosition]
                }});
                store.dispatch({type: 'SCI_MAP_INC_NUM'});

                let newPricing = getPricing(curState.sciMap);

                let customAttributes = {};
                customAttributes["Term"] = "12 Month";

                store.dispatch({type:'CUR_PRODUCT_SET_CUSTOM_FLAG', payload: {
                        customFlag:true
                    }});

                store.dispatch({type:'CUR_PRODUCT_SET_PACKAGE_CONTENTS', payload: {
                    packageContents: {
                        title:"SCI",
                        code:"SCIPackage"+s.sciMap.numSci,
                        attributes:customAttributes,
                        custom: newPricing,
                    }
                }});
                /*
                store.dispatch({type:'CART_UPDATE_PRICING_SCI', payload: {
                    pricing: newPricing,
                    packetCode: "SCI_CUSTOM_"+s.sciMap.numSci,
                    productCode: prod.productCode
                }});
                */
            }}
        />
	);

}
//
export default sciMapPageVM;
