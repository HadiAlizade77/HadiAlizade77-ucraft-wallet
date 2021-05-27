import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { storeWallet } from '@/http/WalletServices';
import { useSnackbar } from 'notistack';

export default function CardCreateWallet({ fetchData }) {
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = React.useState(false);
    const [newWallet, setNewWallet] = React.useState({
        name: '',
        typeId: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setNewWallet({
            name: '',
            typeId: ''
        });
    };
    const handleFormSubmit = () => {
        postNewWallet(newWallet);
    };

    const handleInput = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        setNewWallet({ ...newWallet, [name]: value });
    };

    const handleChange = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        setNewWallet({ ...newWallet, [name]: value });
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
            <div
                role="button"
                className="w-full lg:w-6/12 xl:w-6/12 px-4"
                onClick={() => {
                    handleClickOpen();
                }}
                tabIndex={0}
                onKeyPress={() => {
                    handleClickOpen();
                }}>
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                    <div className="flex-auto p-4">
                        <div className="flex flex-wrap">
                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                <span className="font-semibold text-md text-blueGray-700">
                                    Create A new Wallet !
                                </span>
                            </div>
                            <div className="relative w-auto pl-4 flex-initial">
                                <div
                                    className={
                                        'text-black p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-gray-200'
                                    }>
                                    <i className="fas fa-plus"></i>
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-blueGray-400 mt-2">
                            <span className="whitespace-nowrap">its free!</span>
                        </p>
                    </div>
                </div>
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create A new Wallet</DialogTitle>
                <DialogContent>
                    <div className="flex-auto mx-10 px-3 py-10 pt-0">
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
                                            value={newWallet.name}
                                            onChange={handleInput}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-12/12 pt-10 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold"
                                        htmlFor="grid-password">
                                        Wallet Type
                                    </label>
                                    <Select
                                        name="typeId"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        value={newWallet.typeId}
                                        onChange={handleChange}>
                                        {window.walletTypes.map((wallet, index) => {
                                            return (
                                                <MenuItem key={`type${index}`} value={wallet.id}>
                                                    {wallet.name}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
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
