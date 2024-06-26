import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import topImage from './topimage.png';
import bottomImage from './bottomImage.jpg';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : { phone: '' };
  });

  const [stations, setStations] = useState(() => {
    const savedStations = localStorage.getItem('stations');
    return savedStations ? JSON.parse(savedStations) : {
      station1: false,
      station2: false,
      station3: false,
      station4: false,
      station5: false,
      station6: false,
      station32: false,
      station42: false,

     
    };
  });

  const STATION_NAMES = {
    station1: "Recycle Station",
    station2: "Beautiful Wounding Tooth",
    station3: "Visit the Grader",
    station4: "Check out the Excavator",
    station5: "Learn about TU Jobs",
    station6: "Have Lunch",
    station32: "Pipestone Creek",
    station42: "Family History",
  };

  const [isRegistered, setIsRegistered] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return !!savedUser;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const query = useQuery();


  useEffect(() => {
    const stationQuery = query.get('station');
    if (stationQuery && stations.hasOwnProperty(stationQuery) && !stations[stationQuery]) {
      setStations(prevStations => {
        const updatedStations = { ...prevStations, [stationQuery]: true };
        localStorage.setItem('stations', JSON.stringify(updatedStations));
        return updatedStations;
      });
    }
  }, [query]);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = () => {
    setIsModalOpen(true);

    console.log("Submitting:", user, stations);
    if (Math.random() <= 2) {
      fetch('https://studentinfoapi.countygp.ab.ca/api/studentinfo/'+user.phone, {
        method: 'POST',
        mode:'no-cors',
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        alert('Submission successful!');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    } else {
    }

    
    console.log("Submitting:", user, stations);
    setIsModalOpen(true);

    localStorage.removeItem('user');
    localStorage.removeItem('stations');
    setUser({ phone: '' });
    setStations({
      station1: false,
      station2: false,
      station3: false,
      station4: false,
      station5: false,
      station6: false,
      station32: false,
      station42: false,
      
      
    });

    setIsRegistered(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const style = {
    color: 'red',
  };

  return (
    <div className="App">
      <div className="image-container top-image-container">
        <img src={topImage} alt="Top Image" className="top-image" />
      </div>

      <button className="welcome-button">Welcome</button>

      <div className="image-container bottom-image-container">
        <img src={bottomImage} alt="Bottom Image" className="bottom-image" />
        <div className="content-overlay">
          {!isRegistered ? (
            <div className="form-container">
              <h2>Public Works Week Scavenger Hunt Registration</h2>
              <input
                className="inputC"
                type="text"
                name="phone"
                placeholder="Enter your phone number"
                value={user.phone}
                onChange={handleInputChange}
                required
              />
              <button type="button" className="register-button" onClick={() => {
                if (user.phone) {
                  localStorage.setItem('user', JSON.stringify(user));
                  setIsRegistered(true);
                }
              }}>
                Register
              </button>
              <text>Protection of Privacy - Personal information is collected in accordance with Section 33(c) of the Alberta Freedom of Information and Protection of Privacy Act (the FOIP Act) and will be protected under Part 2 of that Act. <text style={style}>Your phone number will only be used for the purpose of entering it into a draw and contacting the winner of the Dinosaur Museum Scavenger Hunt Activity. All phone numbers collected will be deleted following the closure of the contest</text>. Should you require further information about collection, use and disclosure of personal information, please contact the FOIP Coordinator at foip@countygp.ab.ca or call 780-532-9722. </text>
            </div>
          ) : (
            <div className="stations-container">
              <div className="header">Public Works Week Scavenger Hunt</div>
              <ul className="station-list">
                {Object.keys(stations).map(station => (
                  <li key={station} className={`station-item ${stations[station] ? 'checked-station checked-animation' : ''}`}>
                    {STATION_NAMES[station]}: {stations[station] ? "✅" : "❌"}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {!isRegistered ? (<span></span>) : (
          <button
            disabled={!Object.values(stations).every(Boolean)}
            onClick={handleSubmit}
            className="submit-button"
          >
            Submit
          </button>
        )}

        {isModalOpen && (
          <div>
            <div id="background-wrap">
    <div class="x1">
        <div class="cloud"></div>
    </div>

    <div class="x2">
        <div class="cloud"></div>
    </div>

    <div class="x3">
        <div class="cloud"></div>
    </div>

    <div class="x4">
        <div class="cloud"></div>
    </div>

    <div class="x5">
        <div class="cloud"></div>
    </div>
</div>
          <div id="myModal" className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <p>Awesome! Scavenger Hunt Completed</p>
            </div>
          </div>
          </div>
        )}
      </div>
    </div>
  );
}


export default App;
