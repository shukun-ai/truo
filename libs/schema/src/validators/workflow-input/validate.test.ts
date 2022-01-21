import { validateWorkflowInput } from "./validate";
import * as inputData from "./workflow-input.test.json";

describe("workflow-configurations", () => {
  it("validateWorkflowInput", () => {
    const result = validateWorkflowInput(inputData);
    if (!result) {
      // Just convince for debug if validate gets errors
      console.log(validateWorkflowInput.errors);
    }
    expect(result).toEqual(true);
  });
});
