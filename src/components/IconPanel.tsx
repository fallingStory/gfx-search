import { useState, useEffect } from "react";
import "./IconPanel.css";
import Item from "../models/Item";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import PageSelect from "./PageSelect";
import { Button } from "react-bootstrap";

const itemsPerPage = 8 * 4;
interface Props {
  items: Item[];
  heading: string;
}

function IconPanel(props: Props) {
  const [page, setPage] = useState(1);
  const [buttonSRC, setButtonSRC] = useState(
    "/gfx-search/images/website/down_arrow.png"
  );
  const [open, setOpen] = useState(true);

  const totalPages: number = Math.ceil(props.items.length / itemsPerPage);
  const pageItems = props.items.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
    if (page === 0 && totalPages > 0) {
      setPage(1);
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

  function collapse() {
    setOpen(!open);
    if (open) {
      setButtonSRC("/gfx-search/images/website/up_arrow.png");
    } else {
      setButtonSRC("/gfx-search/images/website/down_arrow.png");
    }
  }

  return (
    <div className="outerPanel">
      <span className="panelHeader">
        <h2 className="center-vertical font-med">
          {props.heading} ({props.items.length} Total)
        </h2>
        <span className="oneLine center-vertical">
          <PageSelect
            curPage={page}
            totalPages={totalPages}
            nextPage={goToNextPage}
            prevPage={goToPrevPage}
          />
          <Button onClick={collapse}>
            <img src={buttonSRC} alt="collapse"></img>
          </Button>
        </span>
      </span>
      {open && (
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
      )}
    </div>
  );
}

export default IconPanel;
