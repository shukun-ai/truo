import * as applicationData from "./application.test.json";
import { validateApplicationSchema } from "./validate";

describe("application", () => {
  it("validateApplicationSchema", () => {
    const result = validateApplicationSchema(applicationData);
    if (!result) {
      // Just convince for debug if validate gets errors
      console.log(validateApplicationSchema.errors);
    }
    expect(result).toEqual(true);
  });
});
