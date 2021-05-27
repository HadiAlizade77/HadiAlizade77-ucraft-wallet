import React from 'react';
// import store from '@/store';
// components
import { useSelector } from 'react-redux';

import CardWallet from 'components/Wallets/CardWallet.js';
import CardCreateWallet from './CardCreateWallet';
export default function walletCards({ fetchData }) {
    const state = useSelector((state) => state);
    return (
        <>
            {/* Header */}
            <div className="relative md:pt-32 pb-32 pt-12">
                <div className="px-4 md:px-10 mx-auto w-full">
                    <div>
                        <div className="flex flex-wrap">
                            {state.wallet.wallets.length
                                ? state.wallet.wallets.map((wallet, index) => {
                                      return (
                                          <div
                                              key={`wallet-${index}`}
                                              className="w-full xl:w-6/12 px-4">
                                              <CardWallet
                                                  fetchData={() => {
                                                      fetchData();
                                                  }}
                                                  statSubtitle={wallet.name}
                                                  statTitle={wallet.balance}
                                                  statArrow="up"
                                                  walletId={wallet.id}
                                                  statPercent="3.48"
                                                  statPercentColor="text-emerald-500"
                                                  statDescripiron={wallet.wallet_type.name}
                                                  statIconName="fas fa-wallet"
                                                  statIconColor="bg-red-500"
                                              />
                                          </div>
                                      );
                                  })
                                : null}
                            <CardCreateWallet
                                fetchData={() => {
                                    fetchData();
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
