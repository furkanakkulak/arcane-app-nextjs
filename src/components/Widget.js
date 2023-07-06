import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const Widget = ({ icon, title, counter, url, percentage, text }) => {
  return (
    <div className="card">
      <div className="left">
        <span className="title">{title}</span>
        <span className="counter">{counter}</span>
        <span className="link">
          <Link href={url}>{text}</Link>
        </span>
      </div>
      <div className="right">
        <div className="percentage">
          <FontAwesomeIcon
            icon={faCaretUp}
            fontSize={25}
          />
          {percentage} %
        </div>
        <FontAwesomeIcon
          icon={icon}
          className="flex justify-end w-fit mr-0 ml-auto text-slate-500"
          fontSize={25}
        />
      </div>
    </div>
  );
};
export default Widget;
