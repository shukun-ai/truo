import { ApplicationSchema } from "../../types/application";
import { SystemDataValidator } from "../../validators/application/dependency-check";
import { mergeDependencies } from "../../validators/application/dependency-merge";
import { validateApplicationSchema } from "../../validators/application/validate";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ApplicationData = require("../../validators/application/application.test.json");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const initialApplicationData = require("./initial-application.json");

describe("application", () => {
  it("merge initial application", () => {
    const result = validateApplicationSchema(initialApplicationData);
    if (!result) {
      // Just convince for debug if validate gets errors
      console.log(validateApplicationSchema.errors);
    }

    expect(result).toEqual(true);

    const merged = mergeDependencies(
      initialApplicationData as ApplicationSchema
    );

    const systemDataValidator = new SystemDataValidator();
    const checked = systemDataValidator.check(merged);

    expect(checked).toEqual(true);
  });

  it("merge real application", () => {
    const merged = mergeDependencies(ApplicationData as ApplicationSchema);

    const systemDataValidator = new SystemDataValidator();
    const checked = systemDataValidator.check(merged);

    if (!checked) {
      console.log(systemDataValidator.getErrors());
    }

    expect(checked).toEqual(true);
  });
});
