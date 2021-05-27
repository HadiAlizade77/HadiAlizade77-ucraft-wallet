import React from 'react';
import PropTypes from 'prop-types';
import { formatMoneyValue } from '@/lib/Wallet';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import TransactionDialog from '@/components/Transaction/TransactionDialog';

const useStyles = makeStyles((theme) => ({
    fab: {
        margin: theme.spacing(2)
    },
    absolute: {
        position: 'relative',
        bottom: theme.spacing(2),
        right: theme.spacing(3)
    }
}));
export default function CardWallet({
    fetchData,
    statSubtitle,
    walletId,
    statTitle,
    statDescripiron
}) {
    const classes = useStyles();
    const [transactionDialogStatus, setTransactionDialogStatus] = React.useState(false);
    const [newTransactionType, setNewTransactionType] = React.useState('');
    const openTransactionDialog = (type) => {
        setNewTransactionType(type);
        setTransactionDialogStatus(true);
    };
    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6  shadow-lg">
                <div className="flex-auto shadow-2xl p-4">
                    <div className="flex  flex-wrap">
                        <div className="relative  w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                {statSubtitle}
                            </h5>
                            <span className="font-semibold text-xl text-blueGray-700">
                                {formatMoneyValue(statTitle)}
                            </span>
                        </div>
                        <div className=" w-auto mt-3 pl-4 flex-initial">
                            <Tooltip
                                onClick={() => {
                                    openTransactionDialog('debit');
                                }}
                                title="Send Money"
                                aria-label="Send Money">
                                <Fab color="secondary" className={classes.absolute}>
                                    <i className="fas fa-arrow-alt-circle-up "></i>
                                </Fab>
                            </Tooltip>
                        </div>
                        <div className=" w-auto mt-3 pl-4 flex-initial">
                            <Tooltip
                                onClick={() => {
                                    openTransactionDialog('credit');
                                }}
                                title="Receive Money"
                                aria-label="Receive Money">
                                <Fab color="primary" className={classes.absolute}>
                                    <i className="fas fa-arrow-alt-circle-down"></i>
                                </Fab>
                            </Tooltip>
                        </div>
                    </div>
                    <p className="text-sm text-blueGray-400 mt-4">
                        <span className="whitespace-nowrap">{statDescripiron}</span>
                    </p>
                </div>
            </div>
            <TransactionDialog
                walletId={walletId}
                dialogStatus={transactionDialogStatus}
                transactionType={newTransactionType}
                closeDialog={() => {
                    setTransactionDialogStatus(false);
                }}
                fetchData={() => {
                    fetchData();
                }}
            />
        </>
    );
}

CardWallet.defaultProps = {
    statSubtitle: 'Traffic',
    statTitle: 0,
    statArrow: 'up',
    statPercent: '3.48',
    statPercentColor: 'text-emerald-500',
    statDescripiron: 'Since last month'
};

CardWallet.propTypes = {
    statSubtitle: PropTypes.string,
    statTitle: PropTypes.number,
    statArrow: PropTypes.oneOf(['up', 'down']),
    statPercent: PropTypes.string,
    // can be any of the text color utilities
    // from tailwindcss
    statPercentColor: PropTypes.string,
    statDescripiron: PropTypes.string
};
