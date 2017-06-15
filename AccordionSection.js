import React from 'react';
import ss from './styles.scss';
import { bindListener } from 'utils';
import PureRenderMixin  from 'react-addons-pure-render-mixin';
/*Tabbordion =  React.createFactory(window.Tabbordion);
Panel = React.createFactory(window.Panel);*/

export default React.createClass({
    render: function() {
        var inlineStyle = 'both'
        var className = 'accordion-section' + (this.props._selected ? ' selected' : '');
        var plusIcon = 'accordion-section-icon' + (!this.props._selected ? ' selected' : '');
        var minusIcon = 'accordion-section-icon' + (this.props._selected ? ' selected' : '');
        /*
        var plusIcon = 'accordion-section-icon-plus' + (!this.props._selected ? ' selected' : '');
        var minusIcon = 'accordion-section-icon-minus' + (this.props._selected ? ' selected' : '');
        ic_expand_more_black_24px.svg
        <div className={plusIcon}>+</div>
        <div className={minusIcon}>-</div>
        */
        return (
            <div className={className} style={{clear:inlineStyle}}>
                <h3 onClick={this.onSelect}>
                    {this.props.title}
                    <div className={plusIcon}>
                        <img className="expand" src="assets/ic_expand_more_white_24px.svg" />
                    </div>
                    <div className={minusIcon}>
                        <img className="collapse" src="assets/ic_expand_less_white_24px.svg" />
                    </div>
                </h3>
                <div className="body">
                    {this.props.children}
                </div>
            </div>
        );
    },

    onSelect: function() {
        // tell the parent Accordion component that this section was selected
        this.props._onSelect(this.props.id);
    }
});
