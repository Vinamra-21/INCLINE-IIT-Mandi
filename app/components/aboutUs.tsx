import React, { useEffect, useState } from "react";
import {
  GraduationCap,
  Twitter,
  Linkedin,
  Github,
  Instagram,
  Sun,
  Moon,
  CheckCircle,
  Lightbulb,
  Target,
  Code,
  Map,
  BarChart,
  Clock,
  Droplet,
  FileText,
  ChevronRight,
  Users,
  Globe,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";

const AboutUs: React.FC = () => {
  // Team members data
  const teamMembers = [
    {
      name: "Dr. Vivek Gupta",
      role: "Mentor and Team Leader",
      description:
        "An Assistant Professor at IIT Mandi, leading the HIMPACT group and the Incline program.",
      image: "/vivek.jpg",
      socialLinks: [
        {
          icon: <GraduationCap size={20} />,
          url: "https://scholar.google.co.in/citations?user=bMLz1QgAAAAJ&hl=en",
        },
        { icon: <Twitter size={20} />, url: "https://x.com/VivekGuptaIIT" },
        {
          icon: <Linkedin size={20} />,
          url: "https://www.linkedin.com/in/dr-vivek-gupta/",
        },
      ],
    },
    {
      name: "Siddik Barbhuiya",
      role: "Mentor",
      description:
        "A PhD scholar in the HIMPACT Lab, overseeing the backend and data preparation.",
      image: "/siddik.jpeg",
      socialLinks: [
        {
          icon: <GraduationCap size={20} />,
          url: "https://scholar.google.com/citations?user=W1pyDYAAAAAJ&hl=en",
        },
        { icon: <Twitter size={20} />, url: "https://x.com/brbhsid" },
        {
          icon: <Linkedin size={20} />,
          url: "https://www.linkedin.com/in/barbhuiya12/",
        },
      ],
    },
    {
      name: "Kishan Kumar",
      role: "Team",
      description:
        "Final year BTech student at IIT Mandi, Lead Developer in the Incline program.",
      image: "/kishan.jpg",
      socialLinks: [
        { icon: <Github size={20} />, url: "https://github.com/Kishankp9990" },
        {
          icon: <Instagram size={20} />,
          url: "https://www.instagram.com/kishankashyap5688/",
        },
        {
          icon: <Linkedin size={20} />,
          url: "https://www.linkedin.com/in/kishan-kashyap-b17640245/",
        },
      ],
    },

    {
      name: "Vinamra Garg",
      role: "Developer",
      description:
        "2nd year student at IIT Mandi, Developer in the Incline program.",
      image: "/vinamra.jpg",
      socialLinks: [
        { icon: <Github size={20} />, url: "https://github.com/estside" },
        {
          icon: <Instagram size={20} />,
          url: "https://www.instagram.com/sauravk_singhh",
        },
        {
          icon: <Linkedin size={20} />,
          url: "https://www.linkedin.com/in/saurav-kumar-0bb364284/",
        },
      ],
    },
    {
      name: "Piyush Panpaliya",
      role: "Developer",
      description:
        "2nd year student at IIT Mandi, Lead Developer in the Incline program.",
      image: "/himpact.png",
      socialLinks: [
        { icon: <Github size={20} />, url: "https://github.com/Kishankp9990" },
        {
          icon: <Instagram size={20} />,
          url: "https://www.instagram.com/kishankashyap5688/",
        },
        {
          icon: <Linkedin size={20} />,
          url: "https://www.linkedin.com/in/kishan-kashyap-b17640245/",
        },
      ],
    },
  ];

  // Navigation for quick access to sections
  const navItems = [
    { name: "About", href: "#introduction", icon: <Globe size={18} /> },
    { name: "Mission", href: "#mission", icon: <Target size={18} /> },
    { name: "Vision", href: "#vision", icon: <Lightbulb size={18} /> },
    {
      name: "Objectives",
      href: "#key-objectives",
      icon: <CheckCircle size={18} />,
    },
    { name: "Technology", href: "#technology", icon: <Code size={18} /> },
    { name: "Team", href: "#team", icon: <Users size={18} /> },
  ];

  return (
    <div
      className={`mt-20 w-full transition-colors duration-300 
  bg-gradient-to-b from-gray-50 to-white text-gray-800 
  dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 dark:text-white`}>
      <div className="relative flex justify-center mt-5">
        <div
          className={`hidden md:flex px-14 py-2 rounded-full bg-white text-gray-800 border border-gray-300 shadow-lg text-sm font-medium transition-all
        dark:bg-gray-800 dark:text-white dark:border-gray-700
          `}>
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`mx-2 px-3 py-1 rounded-full transition-all
    dark:hover:bg-teal-800/50 dark:hover:text-teal-300"
                hover:bg-teal-50 hover:text-teal-700"
            `}>
              <span className="mr-1 flex gap-1">
                {item.icon}
                {item.name}
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <section id="introduction" className="mb-20">
          <div
            className={`relative overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-gray-800 
             `}>
            <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-teal-500 via-blue-500 to-green-600"></div>
            <div className="relative p-8 md:p-16">
              <div className="max-w-3xl mx-auto text-center">
                <h1
                  className={`text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r dark:from-teal-400 dark:via-blue-400 dark:to-teal-500
                      from-teal-600 via-blue-600 to-teal-700
                inline-block text-transparent bg-clip-text`}>
                  INCLINE
                </h1>
                <p className="text-lg md:text-xl mb-4 font-medium">
                  Indian Climate Information Explorer
                </p>
                <div
                  className={`w-24 h-1 mx-auto mb-8 
                     dark:bg-teal-500" bg-teal-600
                  `}></div>
                <p className="text-lg md:text-xl mb-6 leading-relaxed">
                  A comprehensive decision support platform designed to enhance
                  climate resilience across India. This state-of-the-art system
                  integrates climate data, advanced analytics, and user-friendly
                  tools to help both decision-makers and local communities
                  understand and respond to climate challenges effectively.
                </p>
                <p className="text-lg md:text-xl leading-relaxed">
                  Developed by the HIMPACT Lab at IIT Mandi, the platform serves
                  diverse users from local community members to government
                  officials, urban planners, disaster management authorities,
                  and sector experts - enabling informed climate-smart decisions
                  for a resilient India.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section - Side by Side */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Mission */}
          <div
            id="mission"
            className={`rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1 dark:bg-gray-800 bg-white
                     `}>
            <div className={`h-2 w-full bg-teal-600 dark:bg-teal-500`}></div>
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div
                  className={`p-3 rounded-full mr-4 dark:bg-teal-900/50 dark:text-teal-400 bg-teal-100 text-teal-600`}>
                  <Target size={28} />
                </div>
                <h2 className="text-3xl font-bold">Our Mission</h2>
              </div>

              <p className="text-lg mb-6 leading-relaxed">
                INCLINE's mission is to democratize climate information and
                empower informed decision-making at all levels of Indian
                society. We strive to bridge the gap between complex climate
                science and practical action by providing accessible,
                user-friendly tools and information.
              </p>

              <p className="text-lg leading-relaxed">
                Our goal is to enable both local communities and decision-makers
                to better understand, prepare for, and respond to climate
                challenges, ultimately contributing to a climate-resilient
                India.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div
            id="vision"
            className={`rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1 bg-white dark:bg-gray-800
                       `}>
            <div className={`h-2 w-full bg-green-600 dark:bg-green-500 `}></div>
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div
                  className={`p-3 rounded-full mr-4  dark:bg-green-900/50 dark:text-green-400  bg-green-100 text-green-600 `}>
                  <Lightbulb size={28} />
                </div>
                <h2 className="text-3xl font-bold">Our Vision</h2>
              </div>

              <p className="text-lg mb-6 leading-relaxed">
                To be India's leading platform for accessible climate
                information and decision support, fostering climate-resilient
                communities through knowledge-driven action.
              </p>

              <div
                className={`mt-8 p-4 rounded-lg dark :bg-gray-700/50  bg-gray-100 `}>
                <p className="italic text-lg">
                  "Empowering communities with the knowledge and tools they need
                  to face climate challenges and build a sustainable future for
                  generations to come."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Objectives Section */}
        <section id="key-objectives" className="mb-20">
          <div
            className={`rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 bg-white
                dark:bg-gray-800     `}>
            <div className={`h-2 w-full dark:bg-green-500 bg-green-600`}></div>
            <div className="p-8 md:p-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Key Objectives
                </h2>
                <p className="text-lg md:text-xl max-w-3xl mx-auto">
                  Our key objectives focus on enhancing climate resilience and
                  supporting sustainable practices across India.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Accessible Information",
                    description:
                      "Make climate information accessible and understandable for all users.",
                    icon: <Map size={24} />,
                  },
                  {
                    title: "Evidence-Based Decisions",
                    description:
                      "Support evidence-based decision-making for climate adaptation.",
                    icon: <BarChart size={24} />,
                  },
                  {
                    title: "Risk Management",
                    description:
                      "Enable better management of climate extremes and associated risks.",
                    icon: <Globe size={24} />,
                  },
                  {
                    title: "Local Action",
                    description:
                      "Facilitate local-level climate action and community resilience.",
                    icon: <Users size={24} />,
                  },
                  {
                    title: "Knowledge to Practice",
                    description:
                      "Bridge the gap between scientific knowledge and practical implementation.",
                    icon: <ChevronRight size={24} />,
                  },
                ].map((objective, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-xl transform transition-all duration-300 hover:-translate-y-1 dark:bg-gray-700/50 dark:hover:bg-gray-700 bg-gray-100 hover:bg-gray-200
                             `}>
                    <div
                      className={`p-3 rounded-full inline-flex mb-4 dark:bg-green-900/50 dark:text-green-400 bg-green-100 text-green-600`}>
                      {objective.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">
                      {objective.title}
                    </h3>
                    <p>{objective.description}</p>
                  </div>
                ))}

                <div
                  className={`p-6 rounded-xl flex items-center justify-center transform transition-all duration-300 hover:-translate-y-1 dark:bg-gradient-to-br dark:from-green-900/50 dark:to-teal-900/50 dark:hover:from-green-900/70 dark:hover:to-teal-900/70 bg-gradient-to-br from-green-100 to-teal-100 hover:from-green-200 hover:to-teal-200
                            `}>
                  <div className="text-center">
                    <p className="text-lg font-bold mb-2">Working toward</p>
                    <p className="text-2xl font-bold">
                      A Climate-Resilient India
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology & Innovation Section */}
        <section id="technology" className="mb-20">
          <div
            className={`rounded-2xl shadow-xl overflow-hidden bg-white dark:bg-gray-800
                      `}>
            <div
              className={`h-2 w-full bg-teal-600  dark:bg-teal-500
               `}></div>
            <div className="p-8 md:p-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Technology & Innovation
                </h2>
                <p className="text-lg md:text-xl max-w-3xl mx-auto">
                  INCLINE leverages cutting-edge technologies to process and
                  visualize complex climate data for informed decision-making.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                <div
                  className={`p-8 rounded-xl bg-gray-100 dark:bg-gray-700
                   `}>
                  <h3
                    className={`text-2xl font-bold mb-6 dark:text-teal-400  text-teal-600 
                      `}>
                    Key Features
                  </h3>

                  <ul className="space-y-6">
                    {[
                      {
                        title: "Location-specific Projections",
                        description:
                          "Generate climate projections for any location in India",
                        icon: <Map size={22} />,
                      },
                      {
                        title: "Intuitive Visualizations",
                        description:
                          "View easy-to-understand maps and graphs of climate data",
                        icon: <BarChart size={22} />,
                      },
                      {
                        title: "Temporal Comparison",
                        description:
                          "Compare climate conditions across different time periods",
                        icon: <Clock size={22} />,
                      },
                      {
                        title: "Watershed Analysis",
                        description:
                          "Get detailed watershed information for your region",
                        icon: <Droplet size={22} />,
                      },
                      {
                        title: "Comprehensive Reports",
                        description:
                          "Access detailed climate reports (coming soon)",
                        icon: <FileText size={22} />,
                      },
                    ].map((feature, index) => (
                      <li key={index} className="flex">
                        <div
                          className={`p-2 rounded-lg mr-4 dark:bg-teal-900/50 dark:text-teal-400 bg-teal-100 text-teal-600 `}>
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold">{feature.title}</h4>
                          <p className="text-sm md:text-base">
                            {feature.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="relative">
                    <div
                      className={`absolute inset-0 blur-xl opacity-20 rounded-xl bg-green-300 dark:bg-green-500`}></div>
                    <div
                      className={`relative p-8 rounded-xl mb-8 bg-gray-100 dark:bg-gray-700 `}>
                      <h3
                        className={`text-2xl font-bold mb-6 dark:text-green-400 text-green-600`}>
                        Data Sources
                      </h3>
                      <p className="mb-4">
                        Our platform integrates high-quality climate data from
                        multiple sources:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle
                            size={16}
                            className={`mr-2  text-green-600 dark:text-green-400`}
                          />
                          Global climate models (CMIP6)
                        </li>
                        <li className="flex items-center">
                          <CheckCircle
                            size={16}
                            className={`mr-2 dark:text-green-400 text-green-600`}
                          />
                          Regional climate modeling outputs
                        </li>
                        <li className="flex items-center">
                          <CheckCircle
                            size={16}
                            className={`mr-2 text-green-600 dark:text-green-400`}
                          />
                          Historical observed climate records
                        </li>
                        <li className="flex items-center">
                          <CheckCircle
                            size={16}
                            className={`mr-2 text-green-600 dark:text-green-400
                          `}
                          />
                          Satellite-derived environmental datasets
                        </li>
                      </ul>
                    </div>

                    <div
                      className={`relative p-8 rounded-xl bg-gray-100 dark:bg-gray-700`}>
                      <h3
                        className={`text-2xl font-bold mb-6 text-green-600 dark:text-green-400`}>
                        Future Developments
                      </h3>

                      <div className="space-y-4">
                        {[
                          "Drought early warning system",
                          "Additional climate variables and indicators",
                          "Enhanced visualization tools",
                        ].map((development, index) => (
                          <div
                            key={index}
                            className={`p-4 rounded-lg flex items-center transform transition-all duration-300 hover:-translate-y-1 bg-white hover:bg-gray-50 shadow-sm dark:bg-gray-600 dark:hover:bg-gray-600/80`}>
                            <ArrowRight
                              size={18}
                              className={`mr-3 text-green-600 dark:text-green-400`}
                            />
                            <span>{development}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="mb-12">
          <div
            className={`rounded-2xl shadow-xl overflow-hidden bg-white dark:bg-gray-800
                 `}>
            <div className={`h-2 w-full dark:bg-green-500 bg-green-600`}></div>
            <div className="p-8 md:p-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  INCLINE Leadership
                </h2>
                <p className="text-lg md:text-xl max-w-3xl mx-auto">
                  Meet the dedicated team behind our climate intelligence
                  platform.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className={`rounded-xl overflow-hidden transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2 bg-white shadow dark:bg-gray-700
                             `}>
                    <div
                      className={`h-2 w-full dark:bg-green-500 bg-green-600`}></div>
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6">
                        <div className="relative">
                          <div
                            className={`absolute inset-0 rounded-full blur-md opacity-20bg-green-300 dark:bg-green-400`}></div>
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-28 h-28 rounded-full object-cover relative border-4 border-white dark:border-gray-800"
                          />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold">{member.name}</h3>
                          <p
                            className={`mb-3 font-medium dark:text-green-400 text-green-600`}>
                            {member.role}
                          </p>
                          <p className="mb-4 text-sm md:text-base">
                            {member.description}
                          </p>
                          <div className="flex justify-center md:justify-start gap-3">
                            {member.socialLinks.map((link, linkIndex) => (
                              <a
                                key={linkIndex}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`p-2 rounded-full transition-colors dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white bg-gray-200 hover:bg-gray-300 text-gray-700`}>
                                {link.icon}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
