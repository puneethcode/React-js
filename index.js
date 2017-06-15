/* src/components/CustomerSelect */

import React from 'react';
import { bindListener } from 'utils';
import ss from './styles.scss';
import PureRenderMixin  from 'react-addons-pure-render-mixin';
//
let selected = false;
let table = [
    { key: 'customerName', label: 'Customer Legal Entity', align: 'left', weight: 'bold' },
    // { key: 'gchId', label: 'Gch Id', align: 'left', weight: 'bold' },
    { key: 'address.address', label: 'Address', align: 'left', weight: 'bold' },
    { key: 'address.country', label: 'Country', align: 'left', weight: 'bold' },
];
//
export default React.createClass({
    mixins: [PureRenderMixin],
    unsubscribe: ()=>{},
    getInitialState() { 
        return {
            customerList:this.props.customerList, 
            selectedCust:(this.props.customerList.length === 1)? 0 : undefined, 
            error: false,
            errorMSG:'You must select a customer.',
            } 
        },

    componentWillMount() {
        ss.use();

        this.unsubscribe = bindListener(this.props.listener, state => {
            let update;
            if(state.length === 1) update = {customerList: state, selectedCust: 0};
            else update = {customerList: state};
            this.setState(update);
        });

    },
    componentDidMount() {},
    componentWillUnmount() { ss.unuse(); this.unsubscribe()},

    cont() {
        if(this.state.selectedCust === undefined) {
            this.setState({
                error: true,
                errorMSG:'You must select a customer.'
            });
            return;
        }
        this.props.next(this.state.customerList[this.state.selectedCust]);
    },

    handleCustomerSelect(n) {
        return () => {
            this.setState({selectedCust: n,
            error: false
        });
        }
    },

    makeCustomerEntry(cust, n) {
        let selected = 'button raised';
        let addressLine2;
        let addressLine2Comma;
        if(this.state.selectedCust === n) selected += ' selected';
        const getData = el => {
            let data;
            //
            if(typeof cust.address.addressLine2!=='undefined')
            {
            addressLine2 = cust.address.addressLine2;
            addressLine2Comma = ', ';
            }
            if (el.key =='address.country') data = cust.address.country;
            else if (el.key == 'address.address')
                data = cust.address.addressLine1+'  '+cust.address.city+'  '+cust.address.state+'  '+cust.address.zipCode;
            else data = cust[el.key];
            //
            return data;
        };
        if(typeof cust.address ==='undefined' || cust.address.country!=='US'){
            return (
                <tr></tr>
            );
        }else{
            return (
                <tr key={n} className={selected}>
                    {table.map((el, i) =>
                        (<td key={el.key + i} className={el.key} data-label={el.label}><button onClick={this.handleCustomerSelect(n)}>{getData(el)}</button></td>)
                    )}
                </tr>
            );
        }
    },

    render() {
          let buildHeader = (el,n) => (
            <th key={n}>
                {el.label}
            </th>
        );
        return (
            <div className="VZ_CustomerSelectPanel">
                <div className="innerWrap">
                    <div className="Content" style={{maxHeight:((window.innerHeight * 0.7) - 70)+"px"}}>
                        <table>
                            <thead>
                                <tr>
                                    {table.map(buildHeader)}
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.customerList.map(this.makeCustomerEntry)}
                            </tbody>
                        </table>
                    </ div>
                    <div className="BtnWrap">
                        <div className="Background" />
                        <button onClick={this.cont} className="ContinueBtn">
                            CONTINUE
                        </button>
                        {this.state.error ? (<div className="ErrorTxt">{this.state.errorMSG}</div>) : [] }
                    </div>
                </div>
            </div>
        );
    },

});

/*
render() {
    return (
        <div className="VZ_CustomerSelectPanel">
            <Loading ref="loader" txt="Loading Customers" width={(this.state.customerList.length > 0) ? "100%" : "95vw"} height={(this.state.customerList.length > 0) ? "100%" : "80vh"}>
                <div className="Content" style={{maxHeight:((window.innerHeight * 0.7) - 70)+"px"}}>
                    <table>
                        <thead>
                            <tr>
                                {table.map((el,n) =>
                                    (<th key={n}>{el.label}<div /><div>{el.label}</div></th>)
                                )}
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.customerList.map(this.makeCustomerEntry)}
                        </tbody>
                    </table>
                </ div>
                <div className="BtnWrap">
                    <div className="Background" />
                    <button onClick={this.cont} className="ContinueBtn">
                        Continue
                    </button>
                    {this.state.error ? (<div className="ErrorTxt">You must select a customer.</div>) : [] }
                </div>
            </Loading>
        </div>
    );
},
*/
