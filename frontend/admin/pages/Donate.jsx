import { React, useState, useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { FaArrowCircleUp, FaHeart, FaUniversity } from "react-icons/fa";
import axios from "axios";
import Loading from "../components/Loading";
import HeroSection from "../components/HeroSection";

export default function Donate() {
  const [showButton, setShowButton] = useState(false);
  const [bank, setBank] = useState(null);
  const [donatePage, setDonate] = useState();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State for edit mode
  const api = import.meta.env.VITE_URL;

  useEffect(() => {
    const fetchBank = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${api}/bank/`);
        const response = await axios.get(`${api}/pages/donate`);
        if (res.status === 200) {
          setDonate(response.data.data);
          setBank(res.data.data);
        } else {
          console.error("Error fetching bank: Status code", res.status);
        }
      } catch (error) {
        console.error("Error fetching bank:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBank();
  }, [api]);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBankChange = (field, value) => {
    setBank((prevBank) => ({
      ...prevBank,
      [field]: value,
    }));
  };

  const saveBankDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.patch(`${api}/bank/edit/${bank._id}`, {
        accName: bank.accName,
        accNum: bank.accNum,
        bank: bank.bank,
        swiftCode: bank.swiftCode,
      });

      if (response.status === 200) {
        console.log("Bank details updated successfully");
        setIsEditing(false);
      } else {
        console.error("Error updating bank details:", response.status);
      }
    } catch (error) {
      console.error("Error updating bank details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <Nav />

      {donatePage && (
        <HeroSection
          title={donatePage.heroSection.title}
          body={donatePage.heroSection.body}
          image={donatePage.heroSection.image}
          id={donatePage.heroSection._id}
        />
      )}

      {/* Main content section */}
      <div className="bg-primary py-8 sm:py-12 md:py-16 lg:py-24 px-4 sm:px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8 font-primary">
          {/* Donation message and details */}
          <div className="bg-white rounded-xl md:rounded-2xl p-5 sm:p-6 md:p-8 flex-1 space-y-3 sm:space-y-4 md:space-y-5">
            <div className="flex justify-center">
              <FaHeart className="text-red-600 text-2xl sm:text-3xl md:text-4xl" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-primary font-secondary text-center">
              Every Donation Brings Someone Closer to Sight.
            </h2>
            <h3 className="text-center font-semibold text-sm:text-base">
              You Have the Power to Restore Sight and Transform Lives.
            </h3>
            <p className="text-gray-700 text-sm:text-base">
              By supporting our mission, you're doing more than funding
              treatments — you're giving children the chance to learn, elders
              the dignity to live independently, and families the joy of seeing
              each other clearly again.
            </p>
            <p className="text-gray-700 text-sm:text-base">
              Across Nepal, thousands live in darkness caused by preventable
              blindness. With your help, we provide free eye exams,
              life-changing surgeries, and essential vision care to those who
              need it most.
            </p>
            <p className="text-gray-700 text-sm:text-base">
              Together, we can build a Nepal where no one is blind from
              avoidable causes, and everyone has the opportunity to live a full,
              healthy, and dignified life.
            </p>
            <p className="text-gray-700 text-sm:text-base">
              Your generosity brings light to those who need it most.
            </p>
            <p className="text-gray-700 text-sm:text-base">
              If you would like to talk to us about your donation, please
              contact Nepal Netra Jyoti Sangh central office by calling{" "}
              <strong>977-1-5361921 / 5361066</strong>. You can also send an
              email to{" "}
              <a
                className="text-primary underline"
                href="mailto:nnjs@mos.com.np"
              >
                nnjs@mos.com.np
              </a>
              .
            </p>
          </div>

          {/* Bank details */}
          <div className="bg-white rounded-xl md:rounded-2xl p-5 sm:p-6 md:p-8 w-full md:w-1/3 flex flex-col justify-center space-y-4 sm:space-y-5 md:space-y-6 mt-4 md:mt-0">
            <div className="flex items-center gap-2 sm:gap-3">
              <FaUniversity className="text-primary text-xl sm:text-2xl md:text-3xl" />
              <h2 className="text-xl sm:text-2xl font-bold text-primary font-secondary">
                Bank Details
              </h2>
            </div>
            <div className="space-y-3 sm:space-y-4 md:space-y-6 text-gray-700 text-sm:text-base">
              <div>
                <p className="font-semibold">Account Name:</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={bank?.accName || ""}
                    onChange={(e) =>
                      handleBankChange("accName", e.target.value)
                    }
                    className="w-full border rounded p-1 text-black"
                  />
                ) : (
                  <p>{bank?.accName || "Loading..."}</p>
                )}
              </div>
              <div>
                <p className="font-semibold">Account Number:</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={bank?.accNum || ""}
                    onChange={(e) => handleBankChange("accNum", e.target.value)}
                    className="w-full border rounded p-1 text-black"
                  />
                ) : (
                  <p className="break-words">{bank?.accNum || "Loading..."}</p>
                )}
              </div>
              <div>
                <p className="font-semibold">Bank:</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={bank?.bank || ""}
                    onChange={(e) => handleBankChange("bank", e.target.value)}
                    className="w-full border rounded p-1 text-black"
                  />
                ) : (
                  <p>{bank?.bank || "Loading..."}</p>
                )}
              </div>
              <div>
                <p className="font-semibold">SWIFT Code:</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={bank?.swiftCode || ""}
                    onChange={(e) =>
                      handleBankChange("swiftCode", e.target.value)
                    }
                    className="w-full border rounded p-1 text-black"
                  />
                ) : (
                  <p>{bank?.swiftCode || "Loading..."}</p>
                )}
              </div>
            </div>
            {/* Edit and Save buttons */}
            {isEditing ? (
              <button
                onClick={saveBankDetails}
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
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Scroll to top button */}
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-3 sm:bottom-4 md:bottom-5 right-3 sm:right-4 md:right-5 bg-accent text-white p-2 rounded-full z-50 hover:bg-support transition-colors duration-300 shadow-lg"
          aria-label="Scroll to top"
        >
          <FaArrowCircleUp
            size={20}
            className="sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
          />
        </button>
      )}
    </div>
  );
}
