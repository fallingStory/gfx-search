import "./PageSelect.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface Props {
  curPage: number;
  totalPages: number;
  nextPage: Function;
  prevPage: Function;
}

function PageSelect(props: Props) {
  return (
    <span className="flex-left-right my-auto padding-right-small">
      <FontAwesomeIcon className="my-auto mx-1" icon={faArrowLeft} size="lg" onClick={() => props.prevPage()} />
      <p className="my-auto mx-2 text-center" style={{width: '4.8rem'}}>
        {props.curPage} / {props.totalPages}
      </p>
      <FontAwesomeIcon className="my-auto mx-1" icon={faArrowRight} size="lg" onClick={() => props.nextPage()} />
    </span>
  );
}

export default PageSelect;
