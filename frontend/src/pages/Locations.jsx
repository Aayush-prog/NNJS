import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import for_location_page from "../assets/Locations.png";
import eye_hospital from "../assets/eye_hospital.png";
import { motion } from "motion/react";
import Footer from "../components/Footer.jsx";
import DonateButton from "../components/DonateButton";

const hospitals = [
  {
    name: "Geta Eye Hospital",
    address: "Godawari Municipality - 5, Geta, Kailali, Nepal",
    phone: "+977-091-575112",
    email: "info@getaeyehospital.org.np",
    website: "https://getaeyehospital.org.np",
  },
  {
    name: "Fateh Bal Eye Hospital",
    address: "Nepalgunj -7 Fultekra",
    phone: "+977- 81 - 520598",
    email: "fbeh@ntc.net.np",
    website: "http://fbeh.org.np/",
  },
  {
    name: "Dr. Ram Prasad Pokhrel Eye Hospital",
    phone: "+977-26-521418",
    email: "rppeh.dhankuta@yahoo.com",
  },
  {
    name: "Dr.Binod Neeta Kandel Eye Hospital",
    phone: "+977-078-520146",
    website: "http://www.lei.org.np/Parasi.html",
  },
  {
    name: "Chhanda (Kale Babu) Narayani Eye Hospital",
    phone: "+977-076-530030",
  },
  {
    name: "Butwal Lion Eye Hospital",
    address: "Butwal Sub Metropolitan-2, Rupandehi",
    phone: "+977-071-45845",
    email: "butwallions@lei.org.np",
    website: "https://lei.org.np/secondary-hospital/butwal-lions-eye-hospital/",
  },
  {
    name: "Rapti Eye Hospital",
    address: "Tulsipur-4, Rakshyachaur, Dang",
    phone: "+977-082- (520165 / 520322)",
    email: "nabpdng@gmail.com",
    website: "http://raptieyehospital.org",
  },
  {
    name: "Lumbini Eye Institute",
    address: "Siddharthanagar-3, Rupandehi, Nepal",
    phone: "+977-071-523827",
    email: "info@lei.org.np",
    website: "http://www.lei.org.np",
  },
  {
    name: "Palpa Lions Lacoul Eye Hospital",
    address: "Tansen-,Palpa",
    phone: "+977-075-520783",
    email: "plleh@lei.org.np",
    website: "https://lei.org.np/secondary-hospital/palpa-lions-lacoul-eye-hospital/",
  },
  {
    name: "Himalaya Eye Hospital",
    address: "Gharipatan, Pokhara Nepa",
    phone: "+977-061-460352",
    email: "heh@ntc.net.np",
    website: "http://www.heh.org.np/",
  },
  {
    name: "Hiralal Santudevi Pradhan Institute of Ophthalmic Sciences",
    phone: "+977-056-520333,523333",
    email: "behchitwan@beh.org.np",
    website: "www.beh.com.np",
  },
  {
    name: "Kedia Eye Hospital",
    address: "Parwanipur-4, Birgunj, Nepal",
    phone: "+977-51-591112",
    email: "info@kediaeyes.org",
    website: "http://kediaeyes.org/",
  },
  {
    name: "Gaur Eye Hospital",
    address: "Purenwa, Gaur, Nepal",
    phone: "+977-055-520039",
    website: "https://geh.org.np/",
  },
  {
    name: "Biratnagar Eye Hospital",
    address: "Atithi Marg, Rani mills area, Biratnagar-17, Morang, Nepal.",
    phone: "+977-21-436360",
    email: "beh@erec-p.org",
    website: "http://www.erec-p.org",
  },
  {
    name: "Sagarmatha Choudhary Eye Hospital",
    phone: "+977-033-560402",
    website: "http://www.erec-p.org/index.php?option=com_content&view=article&id=57&Itemid=88",
  },
  {
    name: "Itahari Eye Hospital",
    address: "Itahari Sub Metropolitan-9, Sunsari Koshi Zone, Province-1; NEPAL.",
    phone: "025-583350, Cell: 9852065350",
    email: "itaharieyecare@ntc.net.np",
  },
  {
    name: "Thori Eye Hospital",
    address: "Bharatpur-10, Bypass Road, Chitwan, Nepal",
    phone: "+977-56-493633, 493833",
    email: "behchitwan@beh.org.np",
    website: "https://beh.com.np/",
  },
  {
    name: "Lamahi Eye Hospital",
    address: "Ratodada-Lamahi,Dang",
    phone: "977-82-417008",
    email: "nabpdng@ntc.net.np",
    website: "http://raptieyehospital.org",
  },
  {
    name: "Kirtipur Eye Hospital",
    address: "Tahalcha, Tinkune, kirtipur-10",
    phone: "01-4331823/4332089",
    email: "kirtipureyehospital@nnjs.org.np",
    website: "http://nnjs.org.np",
  },
  {
    name: "Mahendranagar Eye Hospital",
    phone: "+977-099-522119 , Fax: +977 - 81 522737",
    email: "gehnepal@gmail.com",
  },
  {
    name: "Bardiya Eye Hospital",
    address: "SanoShree, Madhuwan Municipality-6, Bardiya district",
    phone: "084-440313",
    email: "netrajotibardiya@gmail.com",
  },
  {
    name: "Madan Bhandari Eye Hospital",
    address: "Udayapur, Gaighat",
    email: "bhagabatraut448@gmail.com",
  },
  {
    name: "Tauliahawa Eye Hospital",
    address: "Kapilvastu",
    phone: "977 7656 0953",
    email: "pecckapilvastu@lei.org.np",
  },
];

export default function Locations() {
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const fadeInUp = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };
  return (
    <div>
      <Nav />
      <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-50">
       
      </div>
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative h-[75vh] w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: `url(${for_location_page})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-white text-center space-y-10">
          <h1 className="text-6xl font-bold font-secondary ">
            Hospitals and Eye Care Centers
          </h1>
        </div>
      </motion.div>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <img src={eye_hospital} alt="Eye Hospital" />
        <h2 className="text-3xl font-bold text-center my-8">
          List of Eye Hospitals in Nepal
        </h2>
        <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {hospitals.map((h, i) => (
            <div key={i} className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-2">
              <h2 className="text-xl font-bold text-blue-900">{h.name}</h2>
              {h.address && <p className="text-gray-700"><span className="font-semibold">Address:</span> {h.address}</p>}
              {h.phone && <p className="text-gray-700"><span className="font-semibold">Phone:</span> {h.phone}</p>}
              {h.email && <p className="text-gray-700"><span className="font-semibold">Email:</span> <a href={`mailto:${h.email}`} className="text-blue-600 underline">{h.email}</a></p>}
              {h.website && <p className="text-gray-700"><span className="font-semibold">Website:</span> <a href={h.website.startsWith('http') ? h.website : `http://${h.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{h.website}</a></p>}
            </div>
          ))}
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}
