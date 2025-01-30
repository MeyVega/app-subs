const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  paymentDate: { type: Date, required: true },
  category: { type: String, enum: ["streaming", "música", "software", "otros"] },
});

module.exports = mongoose.model("Subscription", SubscriptionSchema);