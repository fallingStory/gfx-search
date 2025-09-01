import { useState, useEffect } from "react";
import "./IconPanel.css";
import Item from "../models/Item";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import PageSelect from "./PageSelect";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const itemsPerPage = 8 * 4;
interface Props {
  items: Item[];
  heading: string;
}

function IconPanel(props: Props) {
  const [page, setPage] = useState(1);
  const [buttonIcon, setButtonIcon] = useState(faXmark);
  const [isOpen, setIsOpen] = useState(true);

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
    setIsOpen(!isOpen);
    if (isOpen) {
      setButtonIcon(faChevronDown);
    } else {
      setButtonIcon(faXmark);
    }
  }

  return (
    props.items.length > 0 ? (
    <div className="mx-auto mb-4">
      <span className="iconPanel__header px-4 mb-2 regBorder">
        <h2 className="my-2 font-med">
          {props.heading} ({props.items.length} Total)
        </h2>
        <span className="d-flex my-auto">
          <PageSelect curPage={page} totalPages={totalPages} nextPage={goToNextPage} prevPage={goToPrevPage} />
          <FontAwesomeIcon icon={buttonIcon} onClick={collapse} className="my-auto ms-3 p-2 iP__widget"/>
        </span>
      </span>
      {isOpen && (
        <div className="iconPanel__imageRows">
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
                className="iconPanel__image"
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
    ) : (
      <></>
    )
  );
}

export default IconPanel;
