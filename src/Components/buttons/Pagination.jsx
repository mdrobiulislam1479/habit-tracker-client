const Pagination = ({ page, setPage, totalPages }) => {
  return (
    <div className="mx-auto col-span-4">
      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="btn text-secondary disabled:text-secondary/50"
        >
          {"<"} Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`btn ${
              page === i + 1 ? "btn-secondary" : "text-secondary"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="btn text-secondary disabled:text-secondary/50"
        >
          Next {">"}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
