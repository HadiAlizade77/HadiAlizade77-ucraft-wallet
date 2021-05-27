import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUserWallets } from 'store/wallet/actions';
import Dashboard from 'views/dashboard/Dashboard';

const mapStateToProps = () => ({
    //
});

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchUserWallets }, dispatch);
};
class DashboardContainer extends Component {
    constructor(props) {
        super(props);
        this.fetchData = this.fetchData.bind(this);
    }
    componentDidMount() {
        this.fetchData();
    }
    fetchData() {
        this.props.fetchUserWallets();
    }
    render() {
        return (
            <>
                <Dashboard fetchData={this.fetchData} />
            </>
        );
    }
}
export default connect(mapStateToProps, matchDispatchToProps)(DashboardContainer);
