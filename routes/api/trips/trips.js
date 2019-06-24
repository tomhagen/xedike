const { User } = require("../../../models/user");
const { Trip } = require("../../../models/trip");

const createTrip = (req, res, next) => {
  //   const { locationFrom, locationTo, startTime, availableSeats, fee } = req.body;
  //req.body
  const driverId = req.user.id;
  User.findById(driverId)
    .then(driver => {
      if (!driver) return Promise.reject({ errors: "Driver not exists" });
      //   const newTrip = new Trip({
      //     driverId,
      //     locationFrom,
      //     locationTo,
      //     startTime,
      //     availableSeats,
      //     fee
      //   });
      const trip = { ...req.body, driverId };
      const newTrip = new Trip(trip);
      return newTrip.save();
    })
    .then(trip => res.status(200).json(trip))
    .catch(err => res.status(400).json(err));
};

// const bookTrip = async (req, res, next) => {
//   const { tripId } = req.params;
//   const {numberOfBookingSeats} = req.body;
//   const passengerId = req.user.id;
//   console.log(req.user)
//   const passenger = await User.findById(passengerId);
//   const trip = await Trip.findById(tripId);
//     if(!passenger) return res.status(404).json({error: "Passenger Not found"})
//     if(!trip) return res.status(404).json({error: "Trip not found"})
//     if(numberOfBookingSeats > trip.availableSeats) return res.status(400).json({errors: "your bookingSeats is over"})

//     trip.availableSeats = trip.availableSeats - numberOfBookingSeats
//     trip.passengerIds.push(passengerId)
//     const saveTrip = await trip.save();
//     res.status(200).json(saveTrip);

// };

// Viết theo kiểu Promise all để dự phòng TH server không hỗ trợ phiên bản cao hơn asysnc await

const bookTrip = (req, res, next) => {
  const { tripId } = req.params;
  const { numberOfBookingSeats } = req.body;
  const passengerId = req.user.id;

  Promise.all([User.findById(passengerId), Trip.findById(tripId)])
    .then(result => {
      // trả về một mảng các tiến trình
      const passenger = result[0];
      const trip = result[1];

      if (!passenger) return Promise.reject({ error: "Passenger Not found" });
      if (!trip) return Promise.reject({ error: "Trip not found" });
      if (numberOfBookingSeats > trip.availableSeats)
        return Promise.reject({ errors: "your bookingSeats is over" });

      trip.availableSeats = trip.availableSeats - numberOfBookingSeats;
      trip.passengerIds.push(passengerId);
      return trip.save();
    })
    .then(trip => {
      res.status(200).json(trip);
    })
    .catch(error => 
      res.status(400).json(error));
}

module.exports = {
  createTrip,
  bookTrip
};
