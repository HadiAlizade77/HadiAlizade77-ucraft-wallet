import React from 'react';

// components
import WalletCards from 'components/Wallets/WalletCards.js';

export default function Dashboard({ fetchData }) {
    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full px-4">
                    <WalletCards fetchData={fetchData} />
                </div>
            </div>
        </>
    );
}
