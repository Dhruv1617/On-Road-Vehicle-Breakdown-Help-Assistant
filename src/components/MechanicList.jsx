const MechanicList = ({ mechanics }) => {
    return (
      <div>
        <h3>Nearby Mechanics</h3>
        {mechanics.length === 0 ? (
          <p>No mechanics found.</p>
        ) : (
          mechanics.map((mechanic, index) => (
            <div key={index} className="mechanic-card">
              <h4>{mechanic.name}</h4>
              <p>Address: {mechanic.address}</p>
              <p>Phone: {mechanic.phone}</p>
            </div>
          ))
        )}
      </div>
    );
  };
  
  export default MechanicList;