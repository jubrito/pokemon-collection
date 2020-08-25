import React from 'react';

type Nullable<String> = String | null;

// function handlePagination(goto:) {
//     if (goto) return goto;
//     else return;
// }

interface Props {
    gotoPrevPage?: () => void,
    gotoNextPage?: () => void,
}


const Pagination: React.FC<Props> = ({ gotoPrevPage, gotoNextPage }) => {
    return (
        <div>
            {gotoPrevPage && <button onClick={gotoPrevPage}>Previous</button>}
            {gotoNextPage && <button onClick={gotoNextPage}>Next</button>}
        </div>
    )
}

export default Pagination;