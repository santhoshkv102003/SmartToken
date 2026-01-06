import "../styles/cards.css";

const Cards = ({ completed, queue, wait }) => {
  return (
    <div className="card-wrapper">
      <div className="glass-card">
        <h3>Completed</h3>
        <p>{completed}</p>
      </div>

      <div className="glass-card">
        <h3>In Queue</h3>
        <p>{queue}</p>
      </div>

      <div className="glass-card">
        <h3>Waiting Time</h3>
        <p>{wait} min</p>
      </div>
    </div>
  );
};

export default Cards;
