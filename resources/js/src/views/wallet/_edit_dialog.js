import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { fetchWalletInfo, storeWallet } from '@/http/WalletServices';
import { useSnackbar } from 'notistack';
export default function EditDialog({ dialogStatus, closeDialog, fetchData, itemId }) {
    const [walletInfo, setWalletInfo] = useState({
        name: '',
        id: itemId,
        typeId: 0
    });
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        if (dialogStatus) {
            fetchWalletInfo({ walletId: itemId }).then(({ data }) => {
                const walletInfo = data.data[0];
                setWalletInfo({
                    name: walletInfo.name,
                    id: walletInfo.id,
                    typeId: walletInfo.wallet_type.id
                });
            });
        }
    }, [dialogStatus]);

    const handleFormSubmit = () => {
        postNewWallet(walletInfo);
    };
    const handleClose = () => {
        closeDialog();
        setWalletInfo({
            name: '',
            id: itemId,
            typeId: 0
        });
    };

    const handleInput = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        setWalletInfo({ ...walletInfo, [name]: value });
    };

    const postNewWallet = (payload) => {
        return storeWallet(payload)
            .then(({ data }) => {
                handleClose();
                fetchData();
                enqueueSnackbar(data.message, { variant: 'success' });
            })
            .catch((e) => {
                enqueueSnackbar(e.message || e.data.message, { variant: 'error' });
            });
    };
    return (
        <>
            <Dialog open={dialogStatus} onClose={closeDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Wallet info</DialogTitle>
                <DialogContent>
                    <div className="flex-auto mx-10 px-3">
                        <form onSubmit={handleFormSubmit}>
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-12/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password">
                                            Name
                                        </label>
                                        <TextField
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            type={'text'}
                                            placeholder={'Name'}
                                            name={'name'}
                                            value={walletInfo.name}
                                            onChange={handleInput}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} color="primary">
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
