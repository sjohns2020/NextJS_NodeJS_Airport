function SortButton({ column, sortByColumn, children }) {
    return (
        <div className={column}>
            <button className="button-sort" value={column} onClick={sortByColumn}>
                {children}
            </button>
        </div>
    );
}
export default SortButton;