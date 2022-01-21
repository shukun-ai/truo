import * as attachmentsData from "./attachments.test.json";
import { validateAttachmentsSchema } from "./validate";

describe("attachment", () => {
  it("validateAttachmentsSchema", () => {
    const result = validateAttachmentsSchema(attachmentsData);
    if (!result) {
      // Just convince for debug if validate gets errors
      console.log(validateAttachmentsSchema.errors);
    }
    expect(result).toEqual(true);
  });
});
