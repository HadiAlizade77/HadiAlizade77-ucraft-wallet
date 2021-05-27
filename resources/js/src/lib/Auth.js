export const getQueryParams = () => {
    const searchParams = new URLSearchParams(window.location.search);
    let params = {};
    for (const value of searchParams.keys()) {
        params[value] = searchParams.get(value);
    }
    return params;
};
