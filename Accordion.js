import React from 'react';
import ss from './styles.scss';
import { bindListener } from 'utils';
import PureRenderMixin  from 'react-addons-pure-render-mixin';
import AccordionSection from 'components/Accordion/AccordionSection';
var ReactElement = require('react/lib/ReactElement');
export default React.createClass({
    getInitialState: function() {
    // we should also listen for property changes and reset the state
    // but we aren't for this demo
    return {
        // initialize state with the selected section if provided
        selected: this.props.selected
    };
},

render: function() {
    // enhance the section contents so we can track clicks and show sections
    var children = React.Children.map(
        this.props.children, this.enhanceSection);

    return (

        <div className="accordion">
    <div className="expand-all">

    <div><img onClick={this.onExpandAll} src={"./assets/expanding.svg"} /></div>
</div>
<div className="collapse-all">

<div><img  onClick={this.onCollapseAll} src={"./assets/collapsing.svg"} /></div>
</div>
{children}
</div>
);
},

// return a cloned Section object with click tracking and "active" awareness
enhanceSection: function(child) {
    var selectedId = this.state.selected,
        id = child.props.id;

    return ReactElement.cloneElement(child, {
        key: id,
        // private attributes/methods that the Section component works with
        _selected: id === selectedId || selectedId==="All",
        _onSelect: this.onSelect
    });
},

// when this section is selected, inform the parent Accordion component
onSelect: function(id) {
    if(this.state.selected === id) {
        this.setState({selected: 0});
        return;
    }
    this.setState({selected: id});
},

onExpandAll: function() {
    this.setState({selected: "All"});
},
onCollapseAll: function() {
    this.setState({selected: 0});
}

});
