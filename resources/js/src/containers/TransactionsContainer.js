import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUserTransactions } from 'store/transactions/actions';
import TransactionsList from 'views/transactions/List';
import { Route, Switch } from 'react-router-dom';
import { deleteTransaction } from '@/http/TransactionServices';
import { withSnackbar } from 'notistack';

const mapStateToProps = () => ({
    //
});

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchUserTransactions }, dispatch);
};
class TransactionContainer extends Component {
    constructor(props) {
        super(props);
        this.deleteHandler = this.deleteHandler.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }
    componentDidMount() {
        this.fetchData();
    }
    fetchData() {
        this.props.fetchUserTransactions();
    }
    deleteHandler(id) {
        deleteTransaction({ transactionId: id })
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
                            path="/transactions/list"
                            exact
                            render={(props) => (
                                <TransactionsList
                                    {...props}
                                    deleteHandler={(id) => this.deleteHandler(id)}
                                    fetchData={() => this.fetchData()}
                                />
                            )}
                        />
                    </Switch>
                </div>
            </>
        );
    }
}
export default connect(mapStateToProps, matchDispatchToProps)(withSnackbar(TransactionContainer));
