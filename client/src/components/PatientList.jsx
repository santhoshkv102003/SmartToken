import "../styles/patientlist.css";

const PatientList = ({ title, list }) => {
  return (
    <div className="list-wrapper">
      <h2>{title}</h2>

      <div className="list-container">
        {list.length === 0 ? (
          <p>No patients found</p>
        ) : (
          list.map((p, i) => (
            <div key={i} className="list-card">
              <h3>{p.name}</h3>
              <p>Age: {p.age}</p>
              <p>Phone: {p.phone}</p>
              <p>Treatment: {p.treatment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PatientList;
