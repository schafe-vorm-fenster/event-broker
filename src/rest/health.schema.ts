import { OkaySchema } from "./okay.schema";
import { ApiInfoSchema } from "./api-info.schema";

// merge OkaySchema and ApiInfoSchema
export const HealthSchema = OkaySchema.merge(ApiInfoSchema);
