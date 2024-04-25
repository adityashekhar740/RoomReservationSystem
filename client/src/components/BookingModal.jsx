import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function BookingModal({ data, setopenModal }) {
  const navigate = useNavigate();
  const [amenTemp, setamenTemp] = useState([]);
  const [formData, setformData] = useState({});
  const [roomData, setroomData] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  const [load, setload] = useState(false);
  const handleAminityChange = (e) => {
    if (e.target.checked) {
      amenTemp.push(e.target.id);
    } else if (!e.target.checked) {
      const temp = amenTemp.filter((item) => item !== e.target.id);
      setamenTemp(temp);
    }
  };
  
  
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (currentUser === null) {
      navigate("/signin");
    }
    await setformData({ ...formData, amenities: amenTemp });
    try {
      const res = await axios.post(
        `/api/reservations/updateBooking/${data._id}`,
        {
          message: formData.message,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          amenities: amenTemp,
        }
      );
      window.location.reload();
    } catch (e) {
      console.log(e);
      alert("UNABLE TO TAKE BOOKING");
    }
  };

  useEffect(() => {
    const fetch_data = async () => {
      try {
        const res = await axios.get(
          `api/reservations/getRoomDetails/${data.roomId}`
        );
        setroomData(res.data);
      } catch (e) {
        console.log("unable to get the data");
      }
    };
    fetch_data();
  }, []);

  return (
    <>
      <form className=" overflow-auto px-4 modal h-[60%] w-[70%] left-[15%] top-[20%] absolute md:top-[10%]  md:left-[25%] md:w-[50%]  md:h-[80%]  bg-white z-[10] rounded-sm ">
        <div className="flex justify-end text-[34px] px-3 ">
          <span
            onClick={() => {
              setopenModal(false);
            }}
            className="cursor-pointer"
          >
            &times;
          </span>
        </div>
        <div>
          <h1 className="text-gray-800 font-semibold text-2xl mb-3 ">
            AMENITIES
          </h1>
          {roomData
            ? roomData.amenities.map((amenity) => (
                <div className="flex gap-2">
                  <input
                    onChange={(e) => {
                      handleAminityChange(e);
                    }}
                    type="checkbox"
                    name=""
                    id={amenity}
                  />
                  <label htmlFor={amenity}>{amenity}</label>
                </div>
              ))
            : null}
        </div>
        <div className="  ">
          <h1 className="text-gray-800 font-semibold text-2xl mt-5">
            GUEST INFORMATION
          </h1>
          <div className="flex flex-col gap-3 mt-5 ">
            <div className="flex gap-4 justify-around ">
              <div className="flex flex-col gap-2 w-[40%] ">
                <label htmlFor="phone">Phone no.</label>
                <input
                  defaultValue={data.phone}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  className=" py-2 px-2 border-b-[0.5px] border-solid border-[#d11242]  "
                  type="number"
                  name=""
                  id="phone"
                />
              </div>
              <div className="flex flex-col gap-2 w-[40%] ">
                <label htmlFor="email">Email</label>
                <input
                  defaultValue={data.email}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  className=" py-2 px-2 border-b-[0.5px] border-solid border-[#d11242]"
                  type="email"
                  name=""
                  id="email"
                />
              </div>
            </div>
            <div className="flex gap-4 justify-around ">
              <div className="flex flex-col gap-2 w-[40%] ">
                <label htmlFor="address">Address</label>
                <textarea
                  defaultValue={data.address}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  className="py-2 px-2 border-b-[0.5px] border-solid border-[#d11242]"
                  name=""
                  id="address"
                  cols="30"
                  rows="2"
                ></textarea>
              </div>
              <div className="flex flex-col gap-2 w-[40%] ">
                <label htmlFor="message">Any Message</label>
                <textarea
                  defaultValue={data.message}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  className="py-2 px-2 border-b-[0.5px] border-solid border-[#d11242]"
                  name=""
                  id="message"
                  cols="30"
                  rows="2"
                ></textarea>
              </div>
            </div>
            <div className="mt-4 flex justify-between px-5 ">
              {/* <h1 className="text-2xl  " >Rs.<span className="text-[#d11242] font-semibold " >{Rooms.price}/-</span></h1> */}
              <button
                onClick={(e) => {
                  handleFormSubmit(e);
                }}
                className="bg-[#d11242] py-2 px-4 text-white rounded-sm "
              >
                UPDATE
              </button>
            </div>
          </div>
        </div>
      </form>
      <div
        onClick={() => {
          setopenModal(false);
        }}
        className="overlay absolute top-0 left-0 w-full h-full z-[8] bg-black opacity-70 "
      ></div>
    </>
  );
}

export default BookingModal;
