// /api/v1/otpuser/update/[id]/route.js

import { DbConnect } from "@/database/database";
import { handelAsyncErrors } from "@/helpers/asyncErrors";
import OtpUserModel from "@/model/otpUser";
import { NextResponse } from "next/server";

DbConnect();

export async function PUT(req, { params }) {
    return handelAsyncErrors(async () => {
        const { id } = params;
        const { registerusername, email, phoneNumber, role } = await req.json();

        // Find the user by ID and update the details
        const updatedUser = await OtpUserModel.findByIdAndUpdate(
            id,
            { registerusername, email, phoneNumber, role },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ status: 404, message: "User not found" });
        }

        return NextResponse.json({ status: 200, message: "User updated successfully", user: updatedUser });
    });
}
