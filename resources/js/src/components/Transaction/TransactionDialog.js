import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { fetchAuthData } from 'store/auth/actions';
import store from 'store/index';
import { storeTransaction, fetchTransactions } from '@/http/TransactionServices';
import TextField from '@material-ui/core/TextField';
import { useSnackbar } from 'notistack';
export default function TransactionDialog({
    dialogStatus,
    closeDialog,
    transactionType,
    fetchData,
    isEdit,
    itemId,
    walletId
}) {
    const { enqueueSnackbar } = useSnackbar();
    const [newTransaction, setNewTransaction] = useState({
        transactionType: transactionType,
        amount: 0,
        walletId: walletId,
        comment: ''
    });
    useEffect(() => {
        setNewTransaction({ ...newTransaction, transactionType, walletId });
    }, [transactionType, walletId]);

    useEffect(() => {
        setNewTransaction({
            transactionType: transactionType,
            amount: 0,
            walletId: walletId,
            comment: ''
        });
        if (isEdit && dialogStatus) {
            fetchTransactions({ transactionId: itemId }).then(({ data }) => {
                const transactionInfo = data.data[0];
                setNewTransaction({
                    transactionType: transactionInfo.transaction_type,
                    amount: transactionInfo.amount,
                    walletId: transactionInfo.wallet_id,
                    comment: transactionInfo.comment,
                    id: transactionInfo.id
                });
            });
        }
    }, [dialogStatus]);

    const handleClose = () => {
        closeDialog();
    };
    const handleFormSubmit = () => {
        handleTransaction(newTransaction);
    };

    const handleInput = (e) => {
        let value = !isNaN(e.target.value) ? Number(e.target.value) : e.target.value;
        let name = e.target.name;
        setNewTransaction({ ...newTransaction, [name]: value });
    };

    const handleTransaction = (payload) => {
        return storeTransaction(payload)
            .then(({ data }) => {
                fetchData();
                store.dispatch(fetchAuthData());
                closeDialog();
                enqueueSnackbar(data.message, { variant: 'success' });
            })
            .catch((e) => {
                enqueueSnackbar(e.message || e.data.message, { variant: 'error' });
            });
    };
    return (
        <>
            <Dialog open={dialogStatus} onClose={closeDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Transfer Money!</DialogTitle>
                <DialogContent>
                    <div className="flex-auto mx-10 px-3">
                        <form onSubmit={handleFormSubmit}>
                            <div className="w-full lg:w-12/12 pt-10 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold"
                                        htmlFor="grid-password">
                                        Amount
                                    </label>
                                    <TextField
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        type={'number'}
                                        name={'amount'}
                                        value={newTransaction.amount}
                                        onChange={handleInput}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap pt-10">
                                <div className="w-full lg:w-12/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password">
                                            Transaction description
                                        </label>
                                        <TextField
                                            value={newTransaction.comment}
                                            onChange={handleInput}
                                            name={'comment'}
                                            multiline
                                            rows={4}
                                            rowsMax={Infinity}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleFormSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
