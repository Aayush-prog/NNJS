import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { FaFacebook, FaMap, FaYoutube } from "react-icons/fa";
import { FaArrowCircleUp } from "react-icons/fa";
import Loading from "../components/Loading";
import axios from "axios";
import HeroSection from "../components/HeroSection";

export default function Contact() {
  const [showButton, setShowButton] = useState(false);
  const [contact, setContact] = useState(null);
  const [page, setPage] = useState();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const api = import.meta.env.VITE_URL;

  useEffect(() => {
    const fetchValue = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${api}/pages/contact`);
        const res = await axios.get(`${api}/contact/`);
        if (res.status === 200) {
          console.log(res.data.data);
          setPage(response.data.data);
          setContact(res.data.data);
          setLoading(false);
        } else {
          console.error("Error fetching contact: Status code", res.status);
        }
      } catch (error) {
        console.error("Error fetching contact:", error);
      }
    };

    fetchValue();
  }, [api]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleContactChange = (field, index, value) => {
    setContact((prevContact) => {
      const updatedContact = { ...prevContact };
      updatedContact[field] = [...prevContact[field]];
      updatedContact[field][index] = value;
      return updatedContact;
    });
  };

  const saveContact = async () => {
    try {
      setLoading(true);
      const response = await axios.patch(`${api}/contact/edit/${contact._id}`, {
        mailingAddress: contact.mailingAddress,
        physicalAddress: contact.physicalAddress,
        reachUs: contact.reachUs,
      });

      if (response.status === 200) {
        console.log("Contact updated successfully");
        setIsEditing(false);
      } else {
        console.error("Error updating contact:", response.status);
      }
    } catch (error) {
      console.error("Error updating contact:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <Nav />
      {/* Hero Section */}
      {page && (
        <HeroSection
          title={page.heroSection.title}
          image={page.heroSection.image}
          body={page.heroSection.body}
          id={page.heroSection._id}
        />
      )}
      {/* Main content wrapper  */}
      <div className="min-h-screen bg-blue-50 p-4 sm:p-8 md:p-12 lg:p-20 flex items-center justify-center py-16">
        <div className="flex flex-col lg:flex-row bg-white rounded-2xl overflow-hidden shadow-lg w-full max-w-5xl">
          {/* Left Form Section */}
          <div className="flex flex-col justify-center items-left text-left w-full lg:w-1/2 space-y-4 md:space-y-5 text-white bg-primary p-6 sm:p-8 md:p-10">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-secondary">
                Get in touch
              </h1>
              <div className="border-2 border-accent w-[100px]"></div>
            </div>

            <form className="flex flex-col w-full space-y-4 md:space-y-5">
              <input
                className="border-b-2 bg-transparent text-white focus:outline-none focus:border-b-accent p-2"
                placeholder="Name"
              />
              <input
                className="border-b-2 bg-transparent text-white focus:outline-none focus:border-b-accent p-2"
                placeholder="Email"
              />
              <input
                className="border-b-2 bg-transparent text-white focus:outline-none focus:border-b-accent p-2"
                placeholder="Phone"
              />
              <input
                className="border-b-2 bg-transparent text-white focus:outline-none focus:border-b-accent p-2"
                placeholder="Message"
              />
              <button className="bg-accent p-2 rounded-sm mt-8 font-bold hover:bg-opacity-90 transition-colors">
                Submit
              </button>
            </form>
          </div>

          {/* Right Info Section */}
          <div className="w-full lg:w-1/2 p-6 sm:p-8 md:p-10 bg-white text-black flex flex-col justify-between">
            <div className="space-y-4 md:space-y-5">
              <p className="font-bold text-sm md:text-base">
                Feel free to reach out using the contact information
              </p>

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.8064616406664!2d85.3115335749225!3d27.69237602615263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19b2b6d87343%3A0x2d6c2814b031114b!2sNepal%20Netra%20Jyoti%20Sangh%2C%20Tripureshwor!5e0!3m2!1sen!2snp!4v1748617431017!5m2!1sen!2snp"
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>

              {/* Contact info */}
              <div className="flex flex-col sm:flex-row text-xs sm:text-sm gap-5 sm:gap-3">
                <div className="space-y-2 sm:w-1/3">
                  <p className="font-bold mb-1 md:mb-2">MAILING ADDRESS</p>
                  <div>
                    {contact?.mailingAddress?.map((item, i) => (
                      <div key={i}>
                        {isEditing ? (
                          <input
                            type="text"
                            value={item}
                            onChange={(e) =>
                              handleContactChange(
                                "mailingAddress",
                                i,
                                e.target.value
                              )
                            }
                            className="w-full border rounded p-1 text-black"
                          />
                        ) : (
                          <p>{item}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="font-bold mb-1 md:mb-2">PHYSICAL ADDRESS</p>
                  <div>
                    {contact?.physicalAddress?.map((item, i) => (
                      <div key={i}>
                        {isEditing ? (
                          <input
                            type="text"
                            value={item}
                            onChange={(e) =>
                              handleContactChange(
                                "physicalAddress",
                                i,
                                e.target.value
                              )
                            }
                            className="w-full border rounded p-1 text-black"
                          />
                        ) : (
                          <p>{item}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="font-bold mb-1 md:mb-2">REACH US</p>
                  <div>
                    {contact?.reachUs?.map((item, i) => (
                      <div key={i}>
                        {isEditing ? (
                          <input
                            type="text"
                            value={item}
                            onChange={(e) =>
                              handleContactChange("reachUs", i, e.target.value)
                            }
                            className="w-full border rounded p-1 text-black"
                          />
                        ) : (
                          <p>{item}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Edit and Save buttons */}
              {isEditing ? (
                <button
                  onClick={saveContact}
                  className="bg-green-500 text-white p-2 rounded-sm mt-4 font-bold hover:bg-green-700 transition-colors"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500 text-white p-2 rounded-sm mt-4 font-bold hover:bg-blue-700 transition-colors"
                >
                  Edit
                </button>
              )}
            </div>

            {/* Social icons */}
            <div className="flex space-x-5 text-xl md:text-2xl mt-5 text-primary items-center">
              <a
                href="https://www.facebook.com/profile.php?id=100064789866065#"
                className="hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.youtube.com/channel/UC4850z46i9u0mvs8SnWIEqQ/featured"
                className="hover:text-accent transition-colors text-2xl md:text-3xl"
                aria-label="Youtube"
              >
                <FaYoutube />
              </a>
              <a
                href="https://www.google.com/maps/contrib/105016702714475758470/place/ChIJQ3PYtrIZ6zkRSxExsBQobC0/@27.692357,85.314105,15z?entry=ttu&g_ep=EgoyMDI1MDYwNC4wIKXMDSoASAFQAw%3D%3D"
                className="hover:text-accent transition-colors"
                aria-label="Map"
              >
                <FaMap />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer  */}
      <Footer />

      {/* Scroll to top button */}
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-accent text-white p-2 rounded-full z-50 hover:bg-support transition-colors duration-300"
          aria-label="Scroll to top"
        >
          <FaArrowCircleUp size={24} className="md:text-3xl" />
        </button>
      )}
    </div>
  );
}
