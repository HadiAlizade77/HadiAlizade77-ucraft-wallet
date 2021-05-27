import React from 'react';
import { createPopper } from '@popperjs/core';
import Fab from '@material-ui/core/Fab';

const UserDropdown = (props) => {
    // dropdown props
    const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
    const btnDropdownRef = React.createRef();
    const popoverDropdownRef = React.createRef();
    const openDropdownPopover = () => {
        createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
            placement: 'bottom-start'
        });
        setDropdownPopoverShow(true);
    };
    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false);
    };
    return (
        <>
            <a
                className="text-blueGray-500 block"
                href="#uc"
                ref={btnDropdownRef}
                onClick={(e) => {
                    e.preventDefault();
                    dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
                }}>
                {props.authUser ? (
                    <div className="items-center flex">
                        <span className=" text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
                            {props.authUser.avatar ? (
                                <img
                                    alt="..."
                                    className="w-12 h-12 rounded-full align-middle border-none shadow-lg"
                                    src={props.authUser ? props.authUser.avatar : null}
                                />
                            ) : (
                                <Fab className="w-ful" color="primary">
                                    {props.authUser.name[0]}
                                </Fab>
                            )}
                        </span>
                    </div>
                ) : null}
            </a>
            <div
                ref={popoverDropdownRef}
                className={
                    (dropdownPopoverShow ? 'block ' : 'hidden ') +
                    'bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48'
                }>
                <a
                    href=""
                    className={
                        'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700'
                    }
                    onClick={(e) => {
                        e.preventDefault();
                        localStorage.removeItem('token');
                        location.reload();
                    }}>
                    Logout
                </a>
            </div>
        </>
    );
};

export default UserDropdown;
