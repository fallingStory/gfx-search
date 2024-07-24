import { useState, useEffect } from "react";
import "./IconPanel.css";
import Item from "../models/Item";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import PageSelect from "./PageSelect";

const itemsPerPage = 8 * 4;
interface Props {
  items: Item[];
  heading: string;
}

function IconPanel(props: Props) {
  const [page, setPage] = useState(1);
  const totalPages: number = Math.ceil(props.items.length / itemsPerPage);
  const pageItems = props.items.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  function goToNextPage() {
    let nextPage: number = 0;
    page < totalPages ? (nextPage = page + 1) : (nextPage = 1);
    setPage(nextPage);
  }

  function goToPrevPage() {
    let nextPage: number = 0;
    page > 1 ? (nextPage = page - 1) : (nextPage = totalPages);
    setPage(nextPage);
  }

  return (
    <div className="outerPanel">
      <span className="panelHeader">
        <h2 className="center-vertical font-med">
          {props.heading} ({props.items.length} Total)
        </h2>
        <PageSelect
          curPage={page}
          totalPages={totalPages}
          nextPage={goToNextPage}
          prevPage={goToPrevPage}
        />
      </span>
      <div className="innerPanel">
        {pageItems.map((item) => (
          <Tippy
            content={`Copied ${item.value}`}
            trigger="click"
            duration={300}
            onShow={(instance) => {
              setTimeout(() => instance.hide(), 1000);
            }}
            key={"tooltip_" + item.id}
          >
            <img
              className="moukou"
              src={"/gfx-search" + item.src}
              alt={item.src}
              key={item.id}
              onClick={() => {
                navigator.clipboard.writeText(item.value);
              }}
            />
          </Tippy>
        ))}
      </div>
    </div>
  );
}

export default IconPanel;
