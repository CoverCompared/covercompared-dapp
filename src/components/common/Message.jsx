const Msg = ({ text = '', meta }) => (
  <div>
    <p>{text}</p>
    <a href={meta.link} target="_blank" rel="noreferrer">
      View Explorer Site
    </a>
  </div>
);
export default Msg;
