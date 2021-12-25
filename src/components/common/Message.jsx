const Msg = ({ text = '', meta }) => (
  <div>
    <p>{text}</p>
    <a href={meta.link}>View Explorer Site</a>
  </div>
);
export default Msg;
