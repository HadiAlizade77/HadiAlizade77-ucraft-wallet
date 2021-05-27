import React from 'react';
import { getQueryParams } from 'lib/Auth.js';

export default function Login(props) {
    const queryParams = getQueryParams();
    props.verifyEmail(queryParams);
    return (
        <>
            <div className="container mx-auto px-4 h-full">
                <div className="container mx-auto px-4 h-full">
                    <div className="container mx-auto px-4 h-full">
                        <div className="flex content-center items-center justify-center h-full">
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                                    please wait,verifying your e-Mail
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
