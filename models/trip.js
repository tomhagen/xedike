const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema({
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  locationFrom: { type: String, required: true },
  locationTo: { type: String, required: true },
  startTime: { type: Date, required: true },
  availableSeats: { type: Number, required: true },
  passengerIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  fee: { type: String, required: true },
  isFinished: { type: Boolean, default: false }
});
const Trip = mongoose.model("Trip", TripSchema);
module.exports = {
  Trip,
  TripSchema
};
