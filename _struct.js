const initiateContractFactory = function ({ React }) {
    const ss = require("./Styles.scss");
    const { session } = require("../../Stores/stateStore");
    //Actions
    const email_pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    return React.createClass({
        /*
         initContract: false,
         primaryContact: false,
         firstName: '',
         lastname: '',
         phone: '',
         email: '',
         */
        subs: [],

        shouldComponentUpdate() {
            return false;
        },
        componentWillMount() {
            ss.use();
            session.set('initContract', false);
            let state = session.state();
            let props = [
                'initContract',
                'icFirstName',
                'icFirstNameValid',
                'icLastName',
                'icLastNameValid',
                'icPhone',
                'icPhoneValid',
                'icEmail',
                'icEmailValid',
            ];
            let length = props.length;
            for (var i = 0; i < length; i++) {
                let key = props[i];
                this.subs.push(session.subscribe(key, delta => {
                    this.validate();
                    this.forceUpdate();
                }));
            }
        },
        componentWillUnmount() {
            ss.unuse();
            let length = this.subs.length;
            for (let i = 0; i < length; i++) {
                this.subs[i](); // Clear subscription
            }
        },

        validate() {
            let state = session.state();

            if (state.initContract && state.icFirstName.trim().length == 0) {
                session.set('icFirstNameValid', 'First Name is required');
            } else {
                session.set('icFirstNameValid', '');
            }
            if (state.initContract && state.icLastName.trim().length == 0) {
                session.set('icLastNameValid', 'Last Name is required');
            } else {
                session.set('icLastNameValid', '');
            }
            let int_val = parseInt(state.icPhone);
            if (state.initContract && (int_val+'').length < 10) {
                session.set('icPhoneValid', 'Phone number must be 10 digits')
            } else {
                session.set('icPhoneValid', '');
            }
            if (state.initContract && !email_pattern.test(state.icEmail)) {
                session.set('icEmailValid', 'Email has an invalid format');
            } else {
                session.set('icEmailValid', '');
            }
        },

        render() {
            this.validate();
            let state = session.state();
            let valid = state.icFirstNameValid == '' && state.icLastNameValid == '' && state.icEmailValid == '' && state.icPhoneValid == '';
            let toggleInit = () => {
                session.set('initContract', false);
            };
            let usePCC = () => {
                session.set('icFirstName', state.pccFirstName);
                session.set('icLastName', state.pccLastName);
                session.set('icPhone', state.pccPhoneNumber);
                session.set('icEmail', state.pccEmail);
                //this.forceUpdate();
            };
            let onContinue = () => {
                if (!valid) return;
                this.props.onContinue();
            };

            let signatory;
            if (state.initContract) {
                signatory = (
                    <div className="InnerWrap">
                        <div className="LabelTxt">Signatory Contact</div>
                        <div>
                            <button className="ButtonLink" onClick={usePCC}>Use Primary Contact Info</button>
                        </div>
                        <div className="InputsWrap">
                            <input disabled={!state.initContract} placeholder="First Name"
                                onChange={e => session.set('icFirstName', e.target.value)} value={state.icFirstName}></input>
                            {<div class="ValidationError" style={{color: '#d00'}}>{state.icFirstNameValid}</div>}
                            <input disabled={!state.initContract} placeholder="Last Name"
                                onChange={e => session.set('icLastName', e.target.value)} value={state.icLastName}></input>
                            {<div class="ValidationError" style={{color: '#d00'}}>{state.icLastNameValid}</div>}
                            <input disabled={!state.initContract} placeholder="Telephone"
                                onChange={e => session.set('icPhone', e.target.value)} value={state.icPhone}></input>
                            {<div class="ValidationError" style={{color: '#d00'}}>{state.icPhoneValid}</div>}
                            <input disabled={!state.initContract} placeholder="Email"
                                onChange={e => session.set('icEmail', e.target.value)} value={state.icEmail}></input>
                            {<div class="ValidationError" style={{color: '#d00'}}>{state.icEmailValid}</div>}
                        </div>
                    </div>
                );
            }

            let buttonStyle = {};
            if (!valid) {
                buttonStyle = {
                    color: 'darkgray',
                    border: '1px solid darkgray',
                }
            }
            return (
                <div className="InitiateContract">
                    <div className="UpperWrap">
                        <div className="InlineTxt">Do you want to Initiate Contract?</div>
                        <button className="InlineBtn" onClick={toggleInit}>
                            <img src={(state.initContract) ? "./assets/Switch_On.svg" : "./assets/Switch_Off.svg"} />
                        </button>
                    </div>
                        {signatory}
                    <button className="ContinueBtn"
                        onClick={onContinue}
                        disabled={!valid}
                        style={buttonStyle}>
                        CONTINUE
                    </button>
                </div>
            );
        }
    });
};
export default initiateContractFactory;
