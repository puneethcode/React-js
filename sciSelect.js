import React from 'react';
import {cleanXSS} from 'utils';
//
const sciSelectVM = function(store) {
    //Components
    const Frame = require("components/DetailsFrame");
    const Select = require("components/SCIselect");

    let s = store.getState().sciMap.currentView;

    //dataPlans
    const dataPlan = s.dataPlans;

    let dataPlanColor = [];
    let dataPlanGb = [];
    Object.keys(dataPlan).map((dataKey) => {
        if(dataPlan[dataKey].gb == 'Usage' || dataPlan[dataKey].gb == 'Unlimited') {
            dataPlanGb.push(dataPlan[dataKey].gb);
        }
        else dataPlanGb.push(dataPlan[dataKey].gb/1000+'K Gb');
        dataPlanColor.push(dataPlan[dataKey].color);
    });
    store.dispatch({type:"SCI_MAP_ADD_COMMENTS", payload: { comments: s.comments }});
    return (
        <Frame title={store.getState().sciMap.product.partners[s.partner].name} right={s.location}>
            <Select dataPlans={dataPlan}
				sections={dataPlanColor}
				legend={dataPlanGb}
                partnerServices={s.partnerServices}
                typeOfCloud={s.typeOfCloud}
                selectedService={s.selectedService}
                selectedDataPlan={s.selectedDataPlan}
                cost={s.cost}
                openComment={() => {
                    const CommentModal = require("components/CommentModal");
                    store.dispatch({type: 'NAV_SET_MODAL_BASE', payload: {
                        modal: <CommentModal
                            comments={store.getState().sciMap.comments}
                            commentContinue={(newComment)=>{
                                store.dispatch({type:"SCI_MAP_ADD_COMMENTS", payload: { comments: cleanXSS(newComment) }});
                                store.dispatch({type:"NAV_SET_MODAL_BASE", payload: {
                                    caller: 'vms/sciSelect',
                                    modal: undefined
                                }});
                            }}
                        />
                    }});
                }}
                close={()=>{
                    store.dispatch({type:"NAV_POP_BASE"});
                    store.dispatch({type:"SCI_MAP_DELETE_SERVICE", payload: { key: s.key }});

                    setTimeout(()=>{
                                store.dispatch({type:"SCI_MAP_CLOSE_CLOUD"});}, 10000);
                }}
                add={(cost, index, selectedService)=>{
                    if(cost === undefined) cost = 0;
                    store.dispatch({type:"NAV_POP_BASE"});
                    store.dispatch({type:"SCI_MAP_ADD_SERVICE", payload: { key: s.key, currentView: s, cost, index, selectedService }});
                    store.dispatch({type: 'CUR_PRODUCT_INCREMENT_FLOW_POSITION'});
                    setTimeout(()=>{
                                store.dispatch({type:"SCI_MAP_CLOSE_CLOUD"});}, 10000);
                 }}/>
        </Frame>
	);

}
//
export default sciSelectVM;
