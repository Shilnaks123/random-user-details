import React, { useState } from "react";

function App() {
  const [userDetails, setUserDetails] = useState(null);
  const [boxColor, setBoxColor] = useState("#FFFFFF"); // Initial color white

  const fetchRandomUser = async () => {
    try {
      const response = await fetch("https://dummyjson.com/users");
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const userData = await response.json();
      const randomUserIndex = Math.floor(Math.random() * userData.users.length);
      const randomUser = userData.users[randomUserIndex];
      setUserDetails(randomUser);
      changeBoxColor();
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const changeBoxColor = () => {
    const randomColor = getRandomColor();
    setBoxColor(randomColor);
  };

  const getRandomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  const handleRandomUserClick = () => {
    fetchRandomUser();
  };


  return (
    <div className="container p-5">
      <h2 className="m-2" style={{ color: "blue", textAlign: "center" }}>
        Random User Details
      </h2>
      <div
        className="row  border rounded p-3 m-2 "
        style={{ backgroundColor: boxColor }}
      >
        {userDetails ? (
          <div className="row randomcontainer">
            <div className="col text-center">
              <img
                height={"200px"}
                width={"200px"}
                style={{ border: "1px solid" }}
                src={userDetails.image}
                alt="Random User"
              />
              <h4>
                {userDetails.firstName} {userDetails.maidenName}{" "}
                {userDetails.lastName}
              </h4>
              <p>{userDetails.gender}</p>
              <div className="d-flex  justify-content-evenly ">
                <div>
                  <h5>Date Of Birth</h5>
                  <span>
                    {new Date(userDetails.birthDate).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <h5>Age</h5>
                  <span>{userDetails.age}</span>
                </div>
              </div>

              <div className="d-flex  justify-content-evenly m-4">
                <div>
                  <h5>Weight</h5>
                  <span>{userDetails.weight}</span>
                </div>
                <div>
                  <h5>Height</h5>
                  <span>{userDetails.height}</span>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="m-4 ">
                <h5>Home Address</h5>
                <span>{userDetails.address.address}</span>
              </div>
              <div className="m-4">
                <h5>Mobile phone</h5>
                <span>{userDetails.phone}</span>
              </div>
              <div className="m-4">
                <h5>Company</h5>
                <span>{userDetails.company.name}</span>
              </div>
              <div className="m-4">
                <h5>Job Title</h5>
                <span>{userDetails.company.title}</span>
              </div>
              <div className="m-4">
                <h5>Email</h5>
                <span>{userDetails.email}</span>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading random user...</p>
        )}
      </div>
      <button onClick={handleRandomUserClick} >Random User</button>
    </div>
  );
}

export default App;