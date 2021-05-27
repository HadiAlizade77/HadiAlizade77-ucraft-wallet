import React from 'react';
import { formatMoneyValue } from '@/lib/Wallet';
import DataTable from '@/components/Table/DataTable';
import { useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import TransactionDialog from '@/components/Transaction/TransactionDialog';
import EditDialog from './_edit_dialog';
import { Tooltip } from '@material-ui/core';
export default function WalletList({ deleteHandler, fetchData }) {
    const state = useSelector((state) => state);

    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        {
            id: 'balance',
            label: 'Balance',
            minWidth: 170,
            format: (value) => formatMoneyValue(value)
        },
        {
            id: 'wallet_type',
            label: 'Wallet Type',
            minWidth: 170,
            format: (value) => {
                return value.name;
            }
        }
    ];

    const [editWalletDialog, setEditWalletDialog] = React.useState({
        status: false,
        id: 0
    });
    const [transactionDialogStatus, setTransactionDialogStatus] = React.useState(false);
    const [newTransaction, setNewTransaction] = React.useState({
        type: '',
        id: 0
    });
    const openTransactionDialog = ({ type, id }) => {
        setNewTransaction({ type, id });
        setTransactionDialogStatus(true);
    };

    const transactionsButton = (id) => {
        return (
            <>
                <Link to={`/wallet/transactions/${id}`}>
                    <Tooltip title="Transactions" aria-label="Transactions">
                        <IconButton className="px-4" edge="end" aria-label="delete">
                            <i className="fas fa-exchange-alt hover:text-green-400 "></i>
                        </IconButton>
                    </Tooltip>
                </Link>
                <Tooltip title="Receive Money" aria-label="Receive Money">
                    <IconButton
                        onClick={() => {
                            openTransactionDialog({ type: 'credit', id });
                        }}
                        className="px-4 hover:text-green-400"
                        edge="end"
                        aria-label="delete">
                        <i className="fas fa-arrow-alt-circle-down"></i>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Send Money" aria-label="Send Money">
                    <IconButton
                        onClick={() => {
                            openTransactionDialog({ type: 'debit', id });
                        }}
                        className="px-4 hover:text-red-500"
                        edge="end"
                        aria-label="delete">
                        <i className="fas fa-arrow-alt-circle-up"></i>
                    </IconButton>
                </Tooltip>
            </>
        );
    };
    return (
        <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6  shadow-lg">
            <div className="flex-auto shadow-2xl">
                <div className="w-full mt-90 px-4">
                    {state.wallet.wallets.length ? (
                        <DataTable
                            deleteHandler={(id) => {
                                deleteHandler(id);
                            }}
                            handleEdit={(id) => {
                                setEditWalletDialog({ id, status: true });
                            }}
                            rows={state.wallet.wallets}
                            columns={columns}
                            actionButtons={(id) => transactionsButton(id)}
                        />
                    ) : null}
                </div>
            </div>
            <EditDialog
                dialogStatus={editWalletDialog.status}
                closeDialog={() => {
                    setEditWalletDialog({ ...editWalletDialog, status: false });
                }}
                fetchData={() => {
                    fetchData();
                }}
                itemId={editWalletDialog.id}
            />

            <TransactionDialog
                walletId={newTransaction.id}
                dialogStatus={transactionDialogStatus}
                transactionType={newTransaction.type}
                closeDialog={() => {
                    setTransactionDialogStatus(false);
                }}
                fetchData={() => {
                    fetchData();
                }}
            />
        </div>
    );
}
