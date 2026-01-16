import React, { useEffect, useState } from "react";
import { dummyBookingData } from "../assets/assets"; // adjust path if needed
import { Film } from "lucide-react";
import BlurCircle from "../components/BlurCircle.jsx";

const MyBooking = () => {
  const currency = import.meta.env.VITE_CURRENCY || "₹";
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setBookings(dummyBookingData);
      setIsLoading(false);
    }, 800);
    console.log(bookings.map((b) => b));
  }, []);

  const formatDateTime = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xl text-gray-400">Loading show details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-20 px-4 md:px-10 min-h-screen">
      <div className="w-full relative top-14 z-10">
        <BlurCircle top="-80px" left="20px" />
        <BlurCircle top="340px" right="380px" />
      </div>
      <div className="mb-8 md:mb-12 flex items-center gap-3 pl-10">
        <Film className="w-8 h-8 md:w-10 md:h-10 text-primary" />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
          Now Showing
        </h1>
      </div>

      <div className="flex flex-col gap-6 pl-10">
        {bookings.map((booking, index) => (
          <div
            key={index}
            className="bg-black rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden border border-gray-500 flex flex-col sm:flex-row w-full sm:w-2/3"
          >
            {/* Movie Image */}
            <img
              src={booking.show.movie.backdrop_path}
              alt={booking.show.movie.title}
              className="w-full sm:w-32 h-40 sm:h-auto object-cover flex-shrink-0"
            />

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                {/* Movie Title */}
                <h2 className="text-lg font-bold text-white">
                  {booking.show.movie.title}
                </h2>

                {/* Date & Time */}
                <p className="text-xs text-gray-500 mt-1">
                  📅 {formatDateTime(booking.show.showDateTime)}
                </p>

                {/* Status */}
                <span
                  className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full
                  ${
                    booking.isPaid
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {booking.isPaid ? "Paid" : "Pending"}
                </span>
              </div>

              {/* Right side - Seats, Price & Button */}
              <div className="mt-4 space-y-2">
                {/* Seats */}
                <p className="text-sm text-white text-right">
                  <span className="font-semibold">Seats:</span>{" "}
                  {booking.bookedSeats.join(", ")}
                </p>

                {/* Price */}
                <p className="text-lg font-bold text-white text-right">
                  {currency}
                  {booking.amount}
                </p>

                {/* Action */}
                {!booking.isPaid && (
                  <button className="w-full cursor-pointer bg-primary text-slate-100 font-bold py-2 px-4 rounded-xl transition-all duration-300 hover:bg-primary-dull hover:shadow-lg hover:shadow-primary/50 hover:scale-101 text-sm">
                    Complete Payment
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBooking;
