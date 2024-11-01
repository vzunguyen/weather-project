import React from "react";
import { Users, Code, Layout } from "lucide-react";

const TeamMember = ({ name, role, description, link }) => {
  const getRoleIcon = (role) => {
    if (role.toLowerCase().includes("back-end")) {
      return <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
    }
    return <Layout className="w-6 h-6 text-purple-600 dark:text-purple-400" />;
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-500"></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl transform hover:-translate-y-1 transition duration-300">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
            {getRoleIcon(role)}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {name}
            </h3>
            <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
              {role}
            </p>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          {description}
        </p>

        <div className="mt-6 flex space-x-3">
          <button
            onClick={() => window.open(link, "_blank")}
            className="text-sm px-4 py-2 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors duration-200"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Van Du Nguyen",
      role: "Back-End Developer",
      description: "Builds secure, scalable server-side architectures.",
      link: "https://github.com/vzunguyen",
    },
    {
      name: "Savinya Punchihewa",
      role: "Front-End Developer",
      description:
        "Specializes in creating intuitive UIs and responsive layouts.",
      link: "https://github.com/Savinya03",
    },
  ];

  return (
    <div className="min-h-screen pt-32 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg mb-4">
            <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Meet Our Team
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our talented team of developers working together to create amazing
            experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              name={member.name}
              role={member.role}
              description={member.description}
              link={member.link} // Pass the unique link to each team member
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
