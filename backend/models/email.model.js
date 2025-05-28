import mongoose from "mongoose";

const emailSchema = new mongoose.Schema(
    {
        to: {
            type: String,
            required: [true, "Recipient email is required"]
        },
        subject: {
            type: String,
            required: [true, "Sender email is required"]
        },
        message: {
            type: String,
            required: [true, "Email body is required"]
        },
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    }, {timestamps: true}
);


export const Email = mongoose.model("Email", emailSchema);