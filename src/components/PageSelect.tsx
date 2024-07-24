import "./PageSelect.css";

interface Props {
  curPage: number;
  totalPages: number;
  nextPage: Function;
  prevPage: Function;
}

function PageSelect(props: Props) {
  return (
    <span className="oneLine center-vertical">
      <img
        className="arrow"
        src="/gfx-search/images/website/left_arrow.png"
        onClick={() => props.prevPage()}
        alt="prev"
      />
      <p className="pageDisplayP center-vertical font-small">
        {" "}
        {props.curPage} / {props.totalPages}{" "}
      </p>
      <img
        className="arrow"
        src="/gfx-search/images/website/right_arrow.png"
        onClick={() => props.nextPage()}
        alt="next"
      />
    </span>
  );
}

export default PageSelect;
