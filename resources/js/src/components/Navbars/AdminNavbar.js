import React from 'react';
import { connect } from 'react-redux';
import { formatMoneyValue } from '@/lib/Wallet';
import UserDropdown from 'components/Dropdowns/UserDropdown.js';
const mapStateToProps = (state) => ({
    authUser: state.auth.authUser
});
export function Navbar(props) {
    return (
        <>
            {/* Navbar */}
            <nav className="absolute top-0 left-0 w-full z-10 shadow-xl bg-white md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
                <span style={{ whiteSpace: 'nowrap' }}>
                    {props.authUser ? `Balance : ${formatMoneyValue(props.authUser.balance)}` : ''}
                </span>

                <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
                    {/* Brand */}
                    <a
                        className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}>
                        Dashboard
                    </a>
                    {/* Form */}
                    <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
                        <div className="relative flex w-full flex-wrap items-stretch">
                            <span className="text-sm text-blueGray-400 mt-2">
                                {props.authUser ? props.authUser.email : null}
                            </span>
                        </div>
                    </form>
                    {/* User */}
                    <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
                        <UserDropdown authUser={props.authUser} />
                    </ul>
                </div>
            </nav>
            {/* End Navbar */}
        </>
    );
}
export default connect(mapStateToProps)(Navbar);
