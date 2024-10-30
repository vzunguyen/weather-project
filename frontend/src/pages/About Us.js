import React from "react";
//import './App.css';

// Define a TeamMember component for each team member
const TeamMember = ({ name, role, description}) => {
  return (
    <div className="team-member">
      <h3>{name}</h3>
      <p>{role}</p>
      <p>{description}</p>
    </div>
  );
};

// Define the main Team component to hold the team members
const Team = () => {
  const teamMembers = [
    {
      name: "Van Du Nguyen",
      role: "Back-End Developer",
      description: "Builds secure, scalable server-side architectures.",
    },
    {
      name: "Savinya Punchihewa",
      role: "Front-End Developer",
      description: "Specializes in creating intuitive UIs and responsive layouts.",
    }
  ];

  return (
    <div className="team-container">
      <h2>Meet Our Team</h2>
      <div className="team-members">
        {teamMembers.map((member, index) => (
          <TeamMember
            key={index}
            name={member.name}
            role={member.role}
            description={member.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Team;
