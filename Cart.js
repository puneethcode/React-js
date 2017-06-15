import React from 'react';
import { bindListener, toNumber, formatMoney } from 'utils';
import ss from './styles.scss';
import PureRenderMixin  from 'react-addons-pure-render-mixin';
//
export default React.createClass({
    mixins: [PureRenderMixin], unsubscribe: ()=>{}, prices: {},
    getInitialState() {
        return {locations: this.props.locations, open:{} }
    },
    componentWillMount() {
        ss.use();
        this.unsubscribe = bindListener(this.props.listener, locations => {
            if(Object.keys(locations).length === 0) this.props.leave();
            this.setState({ locations });
        });
    },
    componentWillUnmount() { ss.unuse(); this.unsubscribe(); },

    iterateAttributes(attributes) {
        return (key, n) => {
            return (
                <div key={"a"+n} className="AttributesWrap">
                    <div className="Key">{key}:</div>
                    <div className="Value">{attributes[key]}</div>
                </div>
            );
        }
    },

    createCostSummary(pak, n) {

        return (
            <div key={'cs'+n} className="CostSummary">
                {Object.keys(pak.selPackafge.attributes).map(this.iterateAttributes(pak.selPackage.attributes))}
                {this.createPricingDetails(this.props.pricing[pak.productCode][pak.packageCode].pricing)}
                {this.createFootnotes(this.props.pricing[pak.productCode][pak.packageCode].footnotes)}
            </div>
        );
    },

    createProductAcordian(loc) {
        return (pak,n) => {
            let costSummary = this.createCostSummary(pak, n);
            return (
                <div className="SubAccordianWrap" key={n}>
                    <div className="SubAccordian">
                        <div className={(this.state.open[loc][n]) ? "IconWrap Selected" : "IconWrap"}>
                            <img src={"./assets/"+pak.acronym+"_blue.png"} />
                        </div>
                        <button className={(this.state.open[loc][n]) ? "Bar Selected" : "Bar"}
                            onClick={this.toggleProductAccordian(loc,n)}>
                            {pak.productTitle+" - "+pak.packageTitle}
                        </button>
                        <button className={(this.state.open[loc][n]) ? "Trash Selected" : "Trash"}
                             onClick={this.delete(loc,n)}>
                            <i className="material-icons">delete</i>
                        </button>
                    </div>
                    {/*(this.state.open[loc][n]) ? this.createCostSummary(pak, n) : false*/}
                </div>
            );
        }
    }

    createLocationAcordians(pricing) {
        return (loc, n) => {
            let info = this.props.locations[loc].map(this.createProductAcordian(loc));
            return (
                <div className="AccordianWrap" key={n}>
                    <div className="Accordian">
                        <div className={(this.state.open[loc])? "IconWrap Selected" : "IconWrap"}>
                            <i className="material-icons">place</i>
                        </div>
                        <button onClick={this.toggleLocationAccordian(loc)} className={(this.state.open[loc])? "Bar Selected" : "Bar"}>
                            {loc}
                        </button>
                        <button onClick={this.delete(loc)} className={(this.state.open[loc])? "Trash Selected" : "Trash"}>
                            <i className="material-icons">delete</i>
                        </button>
                    </div>
                    {/*(this.state.open[location])? this.props.locations[location].map(this.createSubAcordian(location)) : false*/}
                </div>
            );
        }
    },

    render() {

        return (
            <div className="VZ_Cart" style={{height:(window.innerHeight - 60)+"px"}}>
                <section className="Header">
                    <img className="VerizonIcon" src="./assets/Verizon_Logo.png" />
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <div className="Company">
                                    <h5>{p.customerInfo.customerName}</h5>
                                    <div>{p.customerInfo.address.addressLine1}</div>
                                    <div>{p.customerInfo.address.city+", "+p.customerInfo.address.state+", "+p.customerInfo.address.zip+", "+p.customerInfo.address.country}</div>
                                </div>
                            </td>
                            <td>
                                <div className="PCC">
                                    <h5>Primary Customer Contact:</h5>
                                    <div>{p.customerInfo.PCCContact.firstName +" "+ p.customerInfo.PCCContact.lastName}</div>
                                    <div>{p.customerInfo.PCCContact.email}</div>
                                    <div>{p.customerInfo.PCCContact.telephone}</div>
                                </div>
                            </td>
                            <td>
                                <div className="AccManager">
                                    <h5>Account Manager:</h5>
                                    <div>{p.accountManager.name}</div>
                                    <div>{p.accountManager.email}</div>
                                    <div>{p.accountManager.telephone}</div>
                                </div>
                            </td>
                            <td>
                                <div className="Dates">
                                    <h5>Creation Date:</h5>
                                    <div>{p.creationDate}</div>
                                    <h5>Quote Expiry Date:</h5>
                                    <div>{p.quoteExpiryDate}</div>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
                <section className="Body">
                    {Object.keys(this.state.locations).map(this.createLocationAcordians({mrc:0 nrc:0}))}
                </section>
                <section className="Footer">
                    <button onClick={p.email} className="BtnEmail">
                        <i className="material-icons">mail_outline</i>
                    </button>
                    <button onClick={p.emptyStore} className="BtnTrash">
                        <i className="material-icons">delete</i>
                    </button>
                    <button onClick={p.submit} className="BtnSubmit">
                        SUBMIT
                    </button>
                </section>
            </div>
        );
    }
});
