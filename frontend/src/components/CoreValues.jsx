import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";

export default function CoreValues() {
  const [values, setValues] = useState(null);
  const [loading, setLoading] = useState(false);
  const api = import.meta.env.VITE_URL;

  useEffect(() => {
    const fetchValue = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${api}/values/`);
        if (res.status === 200) {
          setValues(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching value:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchValue();
  }, [api]);

  if (loading) return <Loading />;
  if (!values || values.length === 0)
    return <p className="text-center text-primary py-10">No values found.</p>;

  return (
    <section className="min-h-[80vh] pt-12  bg-blue-50 pb-12 px-6 sm:px-12 mx-auto">
      <h2 className="text-3xl font-bold text-primary font-secondary text-center mb-4">
        Our Core Values
      </h2>
      <p className="text-base sm:text-lg mx-auto font-secondary text-center mb-12 leading-relaxed">
        These principles guide everything we do at NNJS, shaping our culture and
        driving our success.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {values.slice(0, 4).map((value, index) => (
          <FlipCard key={index} value={value} api={api} />
        ))}
      </div>
    </section>
  );
}

function FlipCard({ value, api }) {
  return (
    <>
      <div
        className="relative w-full h-80 perspective"
        style={{ perspective: "1000px" }}
      >
        <div className="relative w-full h-full transition-transform duration-700 transform-style preserve-3d hover:rotate-y-180 rounded-xl shadow-lg cursor-pointer">
          <div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden">
            <img
              src={`${api}/images/${value.image}`}
              alt={value.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <h3 className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold font-secondary drop-shadow-lg px-4 text-center">
              {value.title}
            </h3>
          </div>

          <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-xl p-8 flex flex-col justify-center">
            <h3 className="text-primary text-3xl font-bold font-secondary mb-6 text-center">
              {value.title}
            </h3>
            <p className="text-gray-700 font-primary leading-relaxed text-base overflow-y-auto max-h-[280px]">
              {value.body}
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          pointer-events: none;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .transform-style {
          transform-style: preserve-3d;
        }
        .perspective {
          perspective: 1000px;
        }
        .transition-transform {
          transition-property: transform;
          transition-duration: 700ms;
          transition-timing-function: ease;
        }
        .hover\\:rotate-y-180:hover {
          transform: rotateY(180deg);
        }
      `}</style>
    </>
  );
}
