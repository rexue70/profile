import React, {Component} from 'react';
import AboutItem from "./AboutItem";
import styled from "styled-components";
import {updateAbout} from "../../../../actions/myProfileActions";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';

class About extends Component {

    constructor(props) {
        super(props);
        this.state = {
            about: this.props.StudentRecord
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(keyName, value) {
        this.props.updateAbout({...this.state.about, [keyName]: value});
        this.setState({
            about: {...this.state.about, [keyName]: value}
        });
        console.log("change "+[keyName]+": "+value);
    }

    componentWillReceiveProps(nextProps){
        this.setState({about: nextProps.StudentRecord})
    }

    render() {
        return (
            <div className="wrapper">
                <AboutTable>
                    <AboutItem labelText="Phone" keyName="phoneNum" action={this.handleChange} value={this.state.about.phoneNum} modifiable/>
                    <AboutItem labelText="Email" type='email' keyName="email" action={this.handleChange} value={this.state.about.email} />
                    <AboutItem labelText="Address" keyName="address" action={this.handleChange} value={this.state.about.address} modifiable/>
                    <AboutItem labelText="Linkedin" keyName="linkedin" action={this.handleChange} value={this.state.about.linkedin} modifiable isLink/>
                    <AboutItem labelText="Github" keyName="github" action={this.handleChange} value={this.state.about.github} modifiable isLink/>
                    <AboutItem labelText="Facebook" keyName="facebook" action={this.handleChange} value={this.state.about.facebook} modifiable isLink/>
                    <AboutItem labelText="Website" keyName="website" action={this.handleChange} value={this.state.about.website} modifiable isLink/>
                </AboutTable>
            </div>
        )
    }
}

const AboutTable = styled.table`
        width: 100%;
        line-height: 20px;
    `
const mapStateToProps = state => {
    return {
        StudentRecord: state.myProfileReducer.StudentRecord
    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    updateAbout,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(About)
