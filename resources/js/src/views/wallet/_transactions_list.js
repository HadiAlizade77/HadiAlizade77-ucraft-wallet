import React, { useEffect } from 'react';
import { formatMoneyValue } from '@/lib/Wallet';
import DataTable from '@/components/Table/DataTable';
import { useSelector } from 'react-redux';
import TransactionDialog from '../../components/Transaction/TransactionDialog';
export default function List({ match, deleteHandler, fetchWalletTransactions }) {
    const state = useSelector((state) => state);
    const walletId = match.params.walletId;

    useEffect(() => {
        fetchWalletTransactions(walletId);
    }, []);
    const [transactionDialog, setTransactionDialog] = React.useState({
        status: false,
        id: 0
    });
    const columns = [
        {
            id: 'wallet',
            label: 'Wallet',
            format: (value) => value.name
        },
        {
            id: 'amount',
            label: 'Amount',
            minWidth: 170,
            format: (value) => formatMoneyValue(value)
        },
        {
            id: 'transaction_type',
            label: 'Type',
            minWidth: 170,
            // eslint-disable-next-line react/display-name
            format: (value) => {
                if (value === 'credit') {
                    return (
                        <span className="text-green-400">
                            <i className="fas fa-arrow-alt-circle-up "></i>
                            {value.toUpperCase()}
                        </span>
                    );
                }
                return (
                    <span className="text-red-500">
                        <i className="fas fa-arrow-alt-circle-down "></i>
                        {value.toUpperCase()}
                    </span>
                );
            }
        },
        {
            id: 'comment',
            label: 'Comment',
            minWidth: 170
        }
    ];
    return (
        <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6  shadow-lg">
            <div className="flex-auto shadow-2xl">
                <div className="w-full mt-90 px-4">
                    {state.wallet.walletTransactions[walletId] ? (
                        <DataTable
                            deleteHandler={(id) => {
                                deleteHandler(id);
                            }}
                            handleEdit={(id) => {
                                setTransactionDialog({ status: true, id });
                            }}
                            rows={state.wallet.walletTransactions[walletId]}
                            columns={columns}
                        />
                    ) : null}
                </div>
            </div>
            <TransactionDialog
                walletId="0"
                dialogStatus={transactionDialog.status}
                itemId={transactionDialog.id}
                transactionType="0"
                isEdit
                closeDialog={() => {
                    setTransactionDialog({ ...transactionDialog, status: false });
                }}
                fetchData={() => {
                    fetchWalletTransactions(walletId);
                }}
            />
        </div>
    );
}
