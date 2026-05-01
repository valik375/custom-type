import { z } from "zod";
import { ProfileDotSchema } from "./schema";

export type Profile = z.infer<typeof ProfileDotSchema>;
