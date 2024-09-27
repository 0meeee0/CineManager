const mongoose = require('mongoose');

const SeatSchema = mongoose.Schema({
    salle :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Salle',
        required: true
    },
    seatNumber: {
        type: Number,
        required: true
    },
    isReserved :{
        type: Boolean,
        default: false
    }
})

const Seat = mongoose.model('Seat', SeatSchema);

module.exports = Seat