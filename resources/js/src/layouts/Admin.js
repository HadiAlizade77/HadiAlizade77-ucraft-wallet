import React from 'react';
import { Switch, Route } from 'react-router-dom';

// components

import AdminNavbar from 'components/Navbars/AdminNavbar.js';
import Sidebar from 'components/Sidebar/Sidebar.js';

// views

import Dashboard from 'containers/DashboardContainer.js';
import Wallets from 'containers/WalletContainer.js';
import Transactions from 'containers/TransactionsContainer.js';

export default function Admin() {
    return (
        <>
            <Sidebar />
            <div className="relative min-h-screen md:ml-64 bg-blueGray-100">
                <div className="mx-auto w-full">
                    <AdminNavbar />
                </div>
                <Switch>
                    <Route path="/wallet/*" exact component={Wallets} />
                    <Route path="/transactions/:transactionId" exact component={Transactions} />
                    <Route path="/" exact component={Dashboard} />
                </Switch>
            </div>
        </>
    );
}
