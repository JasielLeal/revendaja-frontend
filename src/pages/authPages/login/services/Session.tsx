import { FieldValues } from "react-hook-form";
import { backend } from "@/api/backend";

export async function Session(data: FieldValues) {

    const response = await backend.post("/user/session", {
        email: data.email,
        password: data.password,
    });
    return response
}
