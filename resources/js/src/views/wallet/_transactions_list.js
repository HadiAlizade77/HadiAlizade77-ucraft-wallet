import React, { useEffect } from 'react';
import { formatMoneyValue } from '@/lib/Wallet';
import DataTable from '@/components/Table/DataTable';
import { useSelector } from 'react-redux';
export default function List({ match, deleteHandler, fetchWalletTransactions }) {
    const state = useSelector((state) => state);
    const walletId = match.params.walletId;

    useEffect(() => {
        fetchWalletTransactions(walletId);
    }, []);
    const columns = [
        {
            id: 'amount',
            label: 'Amount',
            minWidth: 170,
            format: (value) => formatMoneyValue(value)
        },
        {
            id: 'comment',
            label: 'Comment',
            minWidth: 170
        },
        {
            id: 'transaction_type',
            label: 'Type',
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
                            rows={state.wallet.walletTransactions[walletId]}
                            columns={columns}
                        />
                    ) : null}
                </div>
            </div>
        </div>
    );
}
