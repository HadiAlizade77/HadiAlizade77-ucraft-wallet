import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUserWallets } from 'store/wallet/actions';
import WalletsList from 'views/wallet/List';
import WalletsTransactionsList from 'views/wallet/_transactions_list';
import { Route, Switch } from 'react-router-dom';
import { deleteWallet } from '@/http/WalletServices';
import { fetchWalletTransactions } from 'store/wallet/actions';
import { withSnackbar } from 'notistack';

const mapStateToProps = () => ({
    //
});

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchWalletTransactions, fetchUserWallets }, dispatch);
};
class DashboardContainer extends Component {
    constructor(props) {
        super(props);
        this.fetchData = this.fetchData.bind(this);
        this.fetchWalletTransactions = this.fetchWalletTransactions.bind(this);
    }
    componentDidMount() {
        this.fetchData();
    }
    fetchData() {
        this.props.fetchUserWallets();
    }
    fetchWalletTransactions(walletId) {
        this.props.fetchWalletTransactions({ walletId });
    }
    deleteHandler(id) {
        deleteWallet({ walletId: id })
            .then(({ data }) => {
                this.fetchData();
                this.props.enqueueSnackbar(data.message, { variant: 'success' });
            })
            .catch(() => {
                this.props.enqueueSnackbar('Error', { variant: 'error' });
            });
    }
    render() {
        return (
            <>
                <div style={{ paddingTop: 90 }}>
                    <Switch>
                        <Route
                            path="/wallet/list"
                            exact
                            render={(props) => (
                                <WalletsList
                                    {...props}
                                    deleteHandler={(id) => this.deleteHandler(id)}
                                    fetchData={() => this.fetchData()}
                                />
                            )}
                        />
                        <Route
                            path="/wallet/transactions/:walletId"
                            exact
                            render={(props) => (
                                <WalletsTransactionsList
                                    {...props}
                                    fetchWalletTransactions={(id) => {
                                        this.fetchWalletTransactions(id);
                                    }}
                                />
                            )}
                        />
                    </Switch>
                </div>
            </>
        );
    }
}
export default connect(mapStateToProps, matchDispatchToProps)(withSnackbar(DashboardContainer));
